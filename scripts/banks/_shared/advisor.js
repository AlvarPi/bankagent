import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chatWithOpenAI, checkOpenAIHealth, getOpenAIApiKey } from './openai.js';

/** @type {Map<string, { index: object, banks: Record<string, unknown> }>} */
const knowledgeCache = new Map();

/** @type {string | null} */
let cachedCompactContext = null;

/** @type {string | null} */
let cachedCompactContextKey = null;

/** Pangad, mida kontekstist välja jätta (vähe andmeid, suur müra). */
const SKIP_CONTEXT_SLUGS = new Set(['morgan-stanley']);

/**
 * @returns {'openai' | 'none'}
 */
export function getAdvisorBackend() {
  if (getOpenAIApiKey()) return 'openai';
  return 'none';
}

/**
 * @returns {Promise<{ ok: boolean, model: string, error?: string }>}
 */
export async function checkAdvisorHealth() {
  if (getAdvisorBackend() === 'openai') return checkOpenAIHealth();
  return { ok: false, model: '', error: 'Seadista OPENAI_API_KEY' };
}

/**
 * @param {string} staticBanksDir
 */
export async function loadBankKnowledge(staticBanksDir) {
  const cached = knowledgeCache.get(staticBanksDir);
  if (cached) return cached;

  const indexPath = join(staticBanksDir, 'knowledge.json');
  const indexRaw = await readFile(indexPath, 'utf8');
  /** @type {{ banks: Array<{ slug: string }>, generatedAt?: string }} */
  const index = JSON.parse(indexRaw);

  /** @type {Record<string, unknown>} */
  const banks = {};

  for (const entry of index.banks) {
    const dataPath = join(staticBanksDir, entry.slug, 'data.json');
    const dataRaw = await readFile(dataPath, 'utf8');
    banks[entry.slug] = JSON.parse(dataRaw);
  }

  const knowledge = { index, banks };
  knowledgeCache.set(staticBanksDir, knowledge);
  return knowledge;
}

/**
 * @param {number | null | undefined} cents
 */
function formatFee(cents) {
  if (cents == null) return '—';
  if (cents === 0) return 'tasuta';
  return `${(cents / 100).toFixed(2)} €`;
}

/**
 * @param {{ sections?: Array<{ title: string, items?: Array<{ name: string, summary?: string, rates?: string[] }> }> }} catalog
 * @returns {string[]}
 */
function formatCoopCatalogLines(catalog) {
  const lines = ['Tootekataloog (tooted, laenud, liising, paketid, kindlustus):'];
  for (const section of catalog.sections ?? []) {
    lines.push(`  ### ${section.title}`);
    for (const item of section.items ?? []) {
      let line = `  - ${item.name}`;
      if (item.summary) line += `: ${item.summary}`;
      if (item.rates?.length) line += ` [${item.rates.join('; ')}]`;
      lines.push(line);
    }
  }
  return lines;
}

/**
 * @param {Record<string, unknown>} data
 */
function formatBankBlock(data) {
  const rates = Array.isArray(data.rates) ? data.rates : [];
  if (!rates.length) {
    const warn = Array.isArray(data.warnings) && data.warnings.length ? data.warnings[0] : 'andmed puuduvad';
    return `## ${data.name} (${data.slug}) — ${warn}`;
  }

  const lines = [];
  lines.push(`## ${data.name} (${data.slug}), kogutud ${data.fetchedAt}`);

  if (Array.isArray(data.warnings) && data.warnings.length) {
    lines.push(`Märkus: ${data.warnings[0]}`);
  }

  const primaryUrl = Array.isArray(data.sources) && data.sources[0]?.url ? data.sources[0].url : null;
  if (primaryUrl) {
    lines.push(`Allikas: ${primaryUrl}`);
  }

  const usefulRates = rates
    .filter((rate) => rate.product_type === 'deposit' || rate.product_type === 'account')
    .slice(0, 10);
  const shown = usefulRates.length ? usefulRates : rates.slice(0, 6);
  lines.push('Intressid/tasud:');
  for (const rate of shown) {
    const rateStr = rate.rate_percent != null ? `${rate.rate_percent}%` : '—';
    lines.push(`  - [${rate.product_type}] ${rate.label}: ${rateStr}, tasu ${formatFee(rate.fee_cents)}`);
  }

  if (data.slug === 'coop') {
    const catalog = /** @type {{ sections?: unknown[] } | undefined} */ (data.catalog);
    if (catalog?.sections?.length) {
      lines.push(...formatCoopCatalogLines(/** @type {Parameters<typeof formatCoopCatalogLines>[0]} */ (catalog)));
    }
  }

  return lines.join('\n');
}

/**
 * @param {{ index: { generatedAt?: string }, banks: Record<string, Record<string, unknown>> }} knowledge
 */
export function buildCompactContext(knowledge) {
  const cacheKey = String(knowledge.index.generatedAt ?? '');
  if (cachedCompactContext && cachedCompactContextKey === cacheKey) {
    return cachedCompactContext;
  }

  const banks = Object.values(knowledge.banks).sort((a, b) =>
    String(a.name).localeCompare(String(b.name), 'et')
  );

  const lines = [
    `Indeks: ${knowledge.index.generatedAt ?? 'teadmata'}`,
    `Pangad (${banks.length}): ${banks.map((bank) => bank.name).join(', ')}`,
    ''
  ];

  for (const bank of banks) {
    if (SKIP_CONTEXT_SLUGS.has(String(bank.slug))) continue;
    lines.push(formatBankBlock(bank));
    lines.push('');
  }

  cachedCompactContext = lines.join('\n').trim();
  cachedCompactContextKey = cacheKey;
  return cachedCompactContext;
}

/**
 * @param {{ index: object, banks: Record<string, unknown> }} knowledge
 */
export function buildAdvisorSystemPrompt(knowledge) {
  const context = buildCompactContext(
    /** @type {{ index: { generatedAt?: string }, banks: Record<string, Record<string, unknown>> }} */ (
      knowledge
    )
  );

  return `Eesti pangateenuste võrdlusabiline. Vasta eesti keeles, lühidalt (max ~8 lauset).

Kasuta AINULT bank_data infot. Kui infot pole: "Seda infot mul kogutud andmetes pole." Ära väljamõtle numbreid. Maini panganimi ja fetchedAt. Mitte finants- ega õigusnõu.

Coop Panga andmetes on lisaks intressidele täielik tootekataloog (hoiused, paketid, laenud, liising, kindlustus jm) — kasuta seda Coop toodete ja teenuste küsimustele.

bank_data:
${context}`;
}

/**
 * @param {Array<{ role: string, content: string }>} messages
 * @param {string} systemPrompt
 */
export async function chatWithAdvisor(messages, systemPrompt) {
  if (getAdvisorBackend() === 'openai') {
    return chatWithOpenAI({ messages, systemPrompt });
  }
  throw new Error('Nõustaja backend pole seadistatud (OPENAI_API_KEY)');
}

/**
 * @param {unknown} body
 * @returns {Array<{ role: string, content: string }>}
 */
export function parseAdvisorMessages(body) {
  if (!body || typeof body !== 'object' || !Array.isArray(body.messages)) {
    throw new Error('Oodatud JSON: { "messages": [{ "role": "user"|"assistant", "content": "..." }] }');
  }

  const messages = body.messages
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      role: String(item.role || ''),
      content: String(item.content || '').trim()
    }))
    .filter((item) => (item.role === 'user' || item.role === 'assistant') && item.content);

  if (messages.length === 0) {
    throw new Error('Vähemalt üks sõnum on kohustuslik.');
  }

  if (messages.at(-1)?.role !== 'user') {
    throw new Error('Viimane sõnum peab olema kasutajalt.');
  }

  return messages.slice(-12);
}
