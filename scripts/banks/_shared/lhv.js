import { readFile, writeFile, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// LHV.ai OAuth + REST. Üks kasutaja (Alvar): refresh-token hoitakse .lhv-token.json-is,
// backend värskendab access-tokenit ise (avalik PKCE-klient, secretit pole vaja).
// Vt mälu: [[lhv-mcp]]. Seemnendus: scripts/lhv-connect.js.

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..', '..');

export const TOKEN_FILE = process.env.LHV_TOKEN_FILE || join(PROJECT_ROOT, '.lhv-token.json');

export const LHV = {
  authBase: process.env.LHV_AUTH_BASE || 'https://auth.lhv.ai',
  apiBase: process.env.LHV_API_BASE || 'https://api.lhv.ai/api/v1',
  resource: process.env.LHV_RESOURCE || 'https://api.lhv.ai/api',
  scope: process.env.LHV_SCOPE || 'accounts:read transactions:read',
  redirectUri: process.env.LHV_REDIRECT_URI || 'http://localhost:7788/callback',
  clientId: process.env.LHV_CLIENT_ID || '4c381b59-9d25-4be5-86ee-2973ca70b58b'
};

/** @type {{ access_token: string, exp: number } | null} */
let accessCache = null;
/** @type {Promise<string> | null} */
let refreshInFlight = null;
/** @type {{ text: string, at: number } | null} */
let contextCache = null;
const CONTEXT_TTL_MS = Number(process.env.LHV_CONTEXT_TTL_MS || 5 * 60_000);

/**
 * @returns {Promise<null | { client_id: string, refresh_token: string, resource?: string, scope?: string, obtained_at?: string }>}
 */
export async function readTokenFile() {
  try {
    const raw = await readFile(TOKEN_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.refresh_token === 'string' && parsed.refresh_token) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * @param {object} data
 */
export async function writeTokenFile(data) {
  const tmp = `${TOKEN_FILE}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, { mode: 0o600 });
  await rename(tmp, TOKEN_FILE);
}

export async function isLhvConfigured() {
  return (await readTokenFile()) !== null;
}

/**
 * Vahetab authorization_code → tokenid (kasutab lhv-connect seemnendamisel).
 * @param {{ code: string, codeVerifier: string }} params
 */
export async function exchangeAuthCode({ code, codeVerifier }) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: LHV.redirectUri,
    client_id: LHV.clientId,
    code_verifier: codeVerifier,
    resource: LHV.resource
  });
  const res = await fetch(`${LHV.authBase}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Token exchange ${res.status}: ${JSON.stringify(json)}`);
  }
  return json;
}

/**
 * Vahetab refresh_token → uue access-tokeni. Kui server pöörab refresh-tokeni, salvestab uue.
 * @returns {Promise<string>} access_token
 */
async function refreshAccessToken() {
  const stored = await readTokenFile();
  if (!stored) throw new Error('LHV pole seadistatud (.lhv-token.json puudub). Jooksuta: node scripts/lhv-connect.js start');

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: stored.refresh_token,
    client_id: stored.client_id || LHV.clientId
  });
  if (stored.resource || LHV.resource) body.set('resource', stored.resource || LHV.resource);

  const res = await fetch(`${LHV.authBase}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    throw new Error(`LHV refresh ebaõnnestus ${res.status}: ${JSON.stringify(json)}`);
  }

  // Refresh-tokeni rotatsioon: salvesta uus, et vana ei aeguks.
  if (json.refresh_token && json.refresh_token !== stored.refresh_token) {
    await writeTokenFile({ ...stored, refresh_token: json.refresh_token, obtained_at: stored.obtained_at });
  }

  const expiresIn = Number(json.expires_in || 900);
  accessCache = { access_token: json.access_token, exp: Date.now() + expiresIn * 1000 };
  return json.access_token;
}

/**
 * @returns {Promise<string>}
 */
export async function getAccessToken() {
  if (accessCache && accessCache.exp - Date.now() > 60_000) {
    return accessCache.access_token;
  }
  if (!refreshInFlight) {
    refreshInFlight = refreshAccessToken().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

/**
 * @param {string} path
 */
async function apiGet(path) {
  const token = await getAccessToken();
  const res = await fetch(`${LHV.apiBase}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
  });
  if (res.status === 401) {
    // Token võib olla just aegunud — sunni üks värskendus ja proovi uuesti.
    accessCache = null;
    const retryToken = await getAccessToken();
    const retry = await fetch(`${LHV.apiBase}${path}`, {
      headers: { Authorization: `Bearer ${retryToken}`, Accept: 'application/json' }
    });
    if (!retry.ok) throw new Error(`LHV API ${path} → ${retry.status}`);
    return retry.json();
  }
  if (!res.ok) throw new Error(`LHV API ${path} → ${res.status}`);
  return res.json();
}

/**
 * @returns {Promise<Array<{ iban: string, currency: string, availableBalance: number, type: string, name: string }>>}
 */
export async function fetchAccounts() {
  return apiGet('/accounts');
}

/**
 * @param {string} iban
 * @param {string} dateFrom yyyy-MM-dd
 * @param {string} dateTo yyyy-MM-dd (max 31 päeva vahe)
 */
export async function fetchTransactions(iban, dateFrom, dateTo) {
  const qs = new URLSearchParams({ dateFrom, dateTo });
  const data = await apiGet(`/accounts/${encodeURIComponent(iban)}/transactions?${qs}`);
  return Array.isArray(data?.transactions) ? data.transactions : [];
}

/**
 * yyyy-MM-dd `days` päeva tagasi tänasest (UTC).
 * @param {number} days
 */
function isoDaysAgo(days) {
  const d = new Date(Date.now() - days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Ehitab kompaktse isikliku LHV-konteksti nõustaja süsteemi-prompti jaoks.
 * Tagastab '' kui pole seadistatud või päring ebaõnnestub (avalik nõustaja ei tohi katki minna).
 * @param {number} [days] mitu päeva tehinguid (vaikimisi 60)
 * @returns {Promise<string>}
 */
export async function buildLhvContext(days = 60) {
  if (contextCache && Date.now() - contextCache.at < CONTEXT_TTL_MS) {
    return contextCache.text;
  }
  if (!(await isLhvConfigured())) return '';

  try {
    const accounts = await fetchAccounts();
    const today = isoToday();

    // Tehingud kuni `days` päeva: LHV limiit 31 päeva/päring, seega tükelda.
    const windows = [];
    for (let start = days; start > 0; start -= 31) {
      const from = isoDaysAgo(Math.min(start, days));
      const to = start === days ? today : isoDaysAgo(start - 30);
      windows.push([from, to]);
    }

    const lines = [];
    lines.push(`minu_lhv_andmed (allikas: LHV pank, päritud ${today}):`);
    lines.push('Kontod:');
    for (const a of accounts) {
      lines.push(`- ${a.iban} | ${a.type} | ${a.currency} | saldo ${Number(a.availableBalance).toFixed(2)}`);
    }

    lines.push(`Tehingud (viimased ~${days} päeva):`);
    let any = false;
    for (const a of accounts) {
      const seen = new Set();
      /** @type {any[]} */
      const txs = [];
      for (const [from, to] of windows) {
        const part = await fetchTransactions(a.iban, from, to);
        for (const t of part) {
          const key = t.transactionId || `${t.bookingDate}|${t.amount}|${t.description}`;
          if (!seen.has(key)) {
            seen.add(key);
            txs.push(t);
          }
        }
      }
      if (txs.length === 0) continue;
      any = true;
      lines.push(`  ${a.iban} (${a.type}):`);
      txs
        .sort((x, y) => String(y.bookingDate).localeCompare(String(x.bookingDate)))
        .slice(0, 60)
        .forEach((t) => {
          const cp = t.counterpartyName ? ` | ${t.counterpartyName}` : '';
          const desc = t.description ? ` | ${t.description}` : '';
          lines.push(
            `  - ${t.bookingDate} | ${Number(t.amount).toFixed(2)} ${t.currency}${cp}${desc} [${t.transactionFamily || ''}/${t.transactionSubFamily || ''}]`
          );
        });
    }
    if (!any) lines.push('  (valitud perioodil tehinguid pole)');

    const text = lines.join('\n');
    contextCache = { text, at: Date.now() };
    return text;
  } catch (err) {
    console.error('[lhv] konteksti ehitus ebaõnnestus:', err instanceof Error ? err.message : err);
    return '';
  }
}

/**
 * Tühistab refresh-tokeni LHV-s (revoke) ja kustutab lokaalse vahemälu oleku.
 */
export async function revokeLhv() {
  const stored = await readTokenFile();
  if (!stored) return { ok: false, error: 'pole seadistatud' };
  const body = new URLSearchParams({ token: stored.refresh_token, client_id: stored.client_id || LHV.clientId });
  const res = await fetch(`${LHV.authBase}/oauth2/revoke`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  accessCache = null;
  contextCache = null;
  return { ok: res.ok, status: res.status };
}
