#!/usr/bin/env node
/**
 * AI-failide kontroll: /llms.txt, /llms-full.txt, /.well-known/llms.txt, /robots.txt
 * iga panga saidil. Öine skann (refresh-banks-preview.sh) käivitab pärast
 * generate-bank-previews.js-i.
 *
 * Kirjutab static/banks/ai-files.json ja logib muutused võrreldes eelmise
 * jooksuga (nt „coop llms.txt: 404-sisuga → ok").
 *
 * Miks: Coopi llms.txt on olemas, aga server vastab HTTP 404 (sisu tuleb kaasa);
 * brauseris on fail näha, robotid peavad puuduvaks. Pelk staatus või pelk sisu
 * eksitab — vaatame mõlemat. Vt vault reference/2026-11-24-coop-kodulaen-ai-nahtavus.md
 *
 *   node scripts/check-ai-files.js            # kõik pangad
 *   node scripts/check-ai-files.js coop       # üks pank
 *
 * Ajatemplit hoiame ainult `generatedAt`-is (öise commiti filter loeb selle
 * ajatempliks); Last-Modified/Age päiseid ei salvesta — Vercel ehitab igal ööl
 * uuesti ja see oleks iga päev näiline muutus. Sisu muutust näitab sha256.
 */
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const execFileAsync = promisify(execFile);
const OUT = join(__dirname, '..', 'static', 'banks', 'ai-files.json');

/** Panga põhisait (sama, mida kogujad kasutavad). */
const SITES = {
  coop: 'https://www.cooppank.ee',
  lhv: 'https://www.lhv.ee',
  seb: 'https://www.seb.ee',
  swedbank: 'https://www.swedbank.ee',
  luminor: 'https://luminor.ee',
  citadele: 'https://www.citadele.ee',
  wise: 'https://wise.com',
  holm: 'https://www.holmbank.ee',
  bigbank: 'https://www.bigbank.ee',
  iutecredit: 'https://iute.com',
  nordea: 'https://www.nordea.fi',
  lightyear: 'https://lightyear.com'
};

const FILES = ['llms.txt', 'llms-full.txt', '.well-known/llms.txt', 'robots.txt'];

const BROWSER_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
/** Robot, kelle silmis llms.txt-i staatust eraldi vaatame (WAF võib roboteid blokeerida). */
const BOT_UA = 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)';

const TIMEOUT_MS = 20_000;
const LINK_CONCURRENCY = 8;
const MAX_LINKS = 400;

/**
 * @param {string} url
 * @param {{ ua?: string, method?: string }} [opts]
 */
async function get(url, { ua = BROWSER_UA, method = 'GET' } = {}) {
  try {
    const res = await fetch(url, {
      method,
      redirect: 'manual',
      headers: { 'User-Agent': ua, Accept: 'text/plain,text/markdown,*/*;q=0.5' },
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    const body = method === 'GET' ? await res.text() : '';
    return {
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      location: res.headers.get('location') || null,
      body
    };
  } catch (err) {
    // Mõni WAF (nt SEB) katkestab Node'i fetch-i (ECONNRESET), curl läheb läbi
    const viaCurl = await getCurl(url, { ua, method });
    if (viaCurl) return viaCurl;
    return { status: 0, contentType: '', location: null, body: '', error: String(err?.cause?.code || err?.name || err) };
  }
}

/** curl-varu: sama kuju mis get(); null kui ka curl ei saa vastust. */
async function getCurl(url, { ua, method }) {
  const SEP = '\n__AIFILES__';
  const args = ['-s', '-A', ua, '--max-time', String(TIMEOUT_MS / 1000),
    '-H', 'Accept: text/plain,text/markdown,*/*;q=0.5',
    '-w', `${SEP}%{http_code}\t%{content_type}\t%{redirect_url}`];
  if (method === 'HEAD') args.push('-I');
  args.push(url);
  try {
    const { stdout } = await execFileAsync('curl', args, { maxBuffer: 16 * 1024 * 1024, encoding: 'utf8' });
    const at = stdout.lastIndexOf(SEP);
    const [code, ct, loc] = stdout.slice(at + SEP.length).split('\t');
    const status = Number(code) || 0;
    if (!status) return null;
    return { status, contentType: ct || '', location: loc || null, body: method === 'GET' ? stdout.slice(0, at) : '' };
  } catch {
    return null;
  }
}

/** Järgi suunamisi (max 5), et näha lõppstaatust; suunamise ahel jääb kirja. */
async function getFollow(url, opts) {
  const chain = [];
  let cur = url;
  for (let i = 0; i < 5; i++) {
    const r = await get(cur, opts);
    if (r.status >= 300 && r.status < 400 && r.location) {
      chain.push(`${r.status} ${cur}`);
      cur = new URL(r.location, cur).href;
      continue;
    }
    return { ...r, finalUrl: cur, redirects: chain };
  }
  return { status: 0, contentType: '', body: '', finalUrl: cur, redirects: chain, error: 'liiga palju suunamisi' };
}

/** @param {string} body @param {string} contentType */
function looksLikeHtml(body, contentType) {
  return /html/i.test(contentType) || /^\s*(<!doctype html|<html)/i.test(body);
}

/** @param {string} body */
function isJson(body) {
  if (!/^\s*[{[]/.test(body)) return false;
  try {
    JSON.parse(body);
    return true;
  } catch {
    return false;
  }
}

/**
 * ok          — 200 ja tekst
 * 404-sisuga  — staatus ≥400, aga tuleb päris tekstifail (Coopi juhtum)
 * soft-404    — 200, aga HTML-leht (nt „Lehte ei leitud")
 * puudub      — ≥400 ja HTML/tühi
 * viga        — võrgu-/ajalõpu viga
 */
function verdict(r) {
  if (r.status === 0) return 'viga';
  const html = looksLikeHtml(r.body, r.contentType);
  // JSON-veateade (nt Bigbanki 404) ei ole llms.txt/robots.txt
  // Sisu järgi, mitte päise järgi: Nordea robots.txt on tekst, aga content-type json
  const json = isJson(r.body);
  const text = r.body.trim().length > 0 && !html && !json;
  if (r.status === 200) return text ? 'ok' : 'soft-404';
  if (r.status >= 400 && text) return '404-sisuga';
  return 'puudub';
}

/** @param {string} body */
function extractLinks(body) {
  const links = new Set();
  for (const m of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) links.add(m[1]);
  return [...links].slice(0, MAX_LINKS);
}

/** @param {string[]} urls */
async function checkLinks(urls) {
  const broken = [];
  const redirected = [];
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      let r = await get(url, { method: 'HEAD' });
      // Osad serverid ei toeta HEAD-i korralikult
      if (r.status === 0 || r.status === 405 || r.status === 403) r = await get(url);
      if (r.status >= 300 && r.status < 400) {
        redirected.push({ url, status: r.status, to: r.location ? new URL(r.location, url).href : null });
      } else if (r.status !== 200) {
        broken.push({ url, status: r.status, ...(r.error ? { error: r.error } : {}) });
      }
    }
  }
  await Promise.all(Array.from({ length: LINK_CONCURRENCY }, worker));
  const byUrl = (a, b) => a.url.localeCompare(b.url);
  return { total: urls.length, broken: broken.sort(byUrl), redirected: redirected.sort(byUrl) };
}

/** @param {string} slug @param {string} origin */
async function checkSite(slug, origin) {
  /** @type {Record<string, any>} */
  const files = {};
  for (const name of FILES) {
    const url = `${origin}/${name}`;
    const r = await getFollow(url);
    const v = verdict(r);
    const entry = {
      url,
      status: r.status,
      verdict: v,
      contentType: r.contentType.split(';')[0] || null,
      ...(r.redirects.length ? { redirects: r.redirects, finalUrl: r.finalUrl } : {}),
      ...(r.error ? { error: r.error } : {})
    };
    if (v === 'ok' || v === '404-sisuga') {
      entry.bytes = Buffer.byteLength(r.body);
      entry.lines = r.body.split('\n').length;
      entry.sha256 = createHash('sha256').update(r.body).digest('hex').slice(0, 16);
      if (name.includes('llms')) {
        entry.title = (r.body.match(/^#\s+(.+)$/m) || [])[1] || null;
        entry.sections = [...r.body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
        entry.hasNumbers = /\d+([.,]\d+)?\s?%|\d\s?€|EUR\b/.test(r.body);
        if (name === 'llms.txt') {
          const bot = await get(url, { ua: BOT_UA });
          entry.botStatus = bot.status;
          entry.links = await checkLinks(extractLinks(r.body));
        }
      }
    }
    files[name] = entry;
  }
  return { slug, origin, files };
}

/** Lühike inimloetav kokkuvõte ühe panga kohta. */
function summary(site) {
  const f = site.files;
  const l = f['llms.txt'];
  let s = `${site.slug.padEnd(11)} llms.txt=${l.verdict}(${l.status})`;
  if (l.links) s += ` linke ${l.links.total}, katki ${l.links.broken.length}`;
  if (l.botStatus && l.botStatus !== l.status) s += ` [ClaudeBot: ${l.botStatus}]`;
  s += `  robots.txt=${f['robots.txt'].verdict}(${f['robots.txt'].status})`;
  return s;
}

/** Muutused eelmise jooksuga võrreldes. */
function diff(prev, site) {
  const out = [];
  const p = prev?.sites?.[site.slug];
  if (!p) return out;
  for (const name of FILES) {
    const a = p.files?.[name];
    const b = site.files[name];
    if (!a) continue;
    if (a.verdict !== b.verdict || a.status !== b.status) {
      out.push(`${site.slug} ${name}: ${a.verdict}(${a.status}) → ${b.verdict}(${b.status})`);
    } else if (a.sha256 && b.sha256 && a.sha256 !== b.sha256) {
      out.push(`${site.slug} ${name}: sisu muutus (${a.lines} → ${b.lines} rida)`);
    }
    const ab = a.links?.broken?.length ?? null;
    const bb = b.links?.broken?.length ?? null;
    if (ab !== null && bb !== null && ab !== bb) {
      out.push(`${site.slug} ${name}: katkisi linke ${ab} → ${bb}`);
    }
  }
  return out;
}

async function main() {
  const only = process.argv[2];
  const slugs = only ? [only] : Object.keys(SITES);
  if (only && !SITES[only]) throw new Error(`tundmatu pank: ${only}`);

  let prev = null;
  try {
    prev = JSON.parse(await readFile(OUT, 'utf8'));
  } catch {
    /* esimene jooks */
  }

  const results = await Promise.all(slugs.map((s) => checkSite(s, SITES[s])));

  /** @type {Record<string, any>} */
  const sites = only && prev?.sites ? { ...prev.sites } : {};
  const changes = [];
  for (const site of results) {
    changes.push(...diff(prev, site));
    sites[site.slug] = site;
    console.log(`ai-files: ${summary(site)}`);
  }
  for (const c of changes) console.log(`ai-files: MUUTUS ${c}`);
  if (prev && !changes.length) console.log('ai-files: muutusi pole');

  const out = { generatedAt: new Date().toISOString(), files: FILES, sites };
  await writeFile(OUT, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log('written static/banks/ai-files.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
