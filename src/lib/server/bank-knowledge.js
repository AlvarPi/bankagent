import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(__dirname, '..', '..', '..', 'static', 'banks');

/** @type {{ index: object, banks: object[], loadedAt: string } | null} */
let cache = null;

/** @type {string | null} */
let cachedAdvisorContext = null;

/** @type {string | null} */
let cachedAdvisorContextKey = null;

const SKIP_CONTEXT_SLUGS = new Set(['morgan-stanley']);

/**
 * @returns {Promise<{ index: object, banks: object[] }>}
 */
async function loadBankKnowledge() {
  if (cache) {
    return { index: cache.index, banks: cache.banks };
  }

  const indexPath = join(BANKS_DIR, 'knowledge.json');
  const indexRaw = await readFile(indexPath, 'utf8');
  /** @type {object} */
  const index = JSON.parse(indexRaw);

  const entries = await readdir(BANKS_DIR, { withFileTypes: true });
  /** @type {object[]} */
  const banks = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dataPath = join(BANKS_DIR, entry.name, 'data.json');
    try {
      const raw = await readFile(dataPath, 'utf8');
      banks.push(JSON.parse(raw));
    } catch {
      // skip banks without data.json
    }
  }

  banks.sort((a, b) => String(a.name).localeCompare(String(b.name), 'et'));

  cache = { index, banks, loadedAt: new Date().toISOString() };
  return { index, banks };
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
 * @param {object} data
 */
function formatBankBlock(data) {
  const lines = [];
  lines.push(`## ${data.name} (${data.slug})`);
  lines.push(`Kogutud: ${data.fetchedAt}`);

  if (data.warnings?.length) {
    lines.push(`Märkused: ${data.warnings.join('; ')}`);
  }

  if (data.sources?.length) {
    lines.push('Allikad:');
    for (const source of data.sources) {
      lines.push(`  - [${source.kind}] ${source.url} — ${source.note}`);
    }
  }

  if (data.rates?.length) {
    const primaryUrl = data.sources?.[0]?.url;
    if (primaryUrl) {
      lines.push(`Allikas: ${primaryUrl}`);
    }
    const usefulRates = data.rates
      .filter((rate) => rate.product_type === 'deposit' || rate.product_type === 'account')
      .slice(0, 10);
    const shown = usefulRates.length ? usefulRates : data.rates.slice(0, 6);
    lines.push('Intressid/tasud:');
    for (const rate of shown) {
      const rateStr = rate.rate_percent != null ? `${rate.rate_percent}%` : '—';
      lines.push(
        `  - [${rate.product_type}] ${rate.label}: ${rateStr}, tasu ${formatFee(rate.fee_cents)}`
      );
    }
  }

  if (data.slug === 'coop' && data.catalog?.sections?.length) {
    lines.push(...formatCoopCatalogLines(data.catalog));
  }

  return lines.join('\n');
}

/**
 * Kompaktne kontekst LLM süsteemiprompti jaoks.
 * @returns {Promise<string>}
 */
export async function buildAdvisorContext() {
  const { index, banks } = await loadBankKnowledge();
  const cacheKey = String(index.generatedAt ?? '');
  if (cachedAdvisorContext && cachedAdvisorContextKey === cacheKey) {
    return cachedAdvisorContext;
  }

  const lines = [
    `Indeks: ${index.generatedAt}`,
    `Pangad (${banks.length}): ${banks.map((b) => b.name).join(', ')}`,
    ''
  ];

  for (const bank of banks) {
    if (SKIP_CONTEXT_SLUGS.has(String(bank.slug))) continue;
    lines.push(formatBankBlock(bank));
    lines.push('');
  }

  cachedAdvisorContext = lines.join('\n').trim();
  cachedAdvisorContextKey = cacheKey;
  return cachedAdvisorContext;
}

/**
 * @returns {Promise<string>}
 */
export async function getKnowledgeGeneratedAt() {
  const { index } = await loadBankKnowledge();
  return index.generatedAt;
}
