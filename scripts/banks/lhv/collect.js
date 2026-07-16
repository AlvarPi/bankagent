// LHV avaliku info koguja. Hoiuseintressid tõmmatakse OTSE lhv.ee-lt (mitte
// minuraha baromeetrist) → uuenevad igapäevaselt öise regeni käigus.
// Kui lhv.ee päring ebaõnnestub, kasutatakse catalog.js staatilisi määrasid (fallback).

export const LHV_DEPOSIT_URL = 'https://www.lhv.ee/et/tahtajaline-hoius';
export const LHV_SAVINGS_URL = 'https://www.lhv.ee/et/kogumiskonto';
export const LHV_FEES_URL = 'https://www.lhv.ee/et/hinnakiri';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

/**
 * Tõmbab lehe ja tagastab puhta tekstisisu (sildid eemaldatud).
 * @param {string} url
 * @returns {Promise<string>}
 */
async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'et-EE,et;q=0.9' },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ');
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Parsib tähtajalise hoiuse intressid. Iga "N kuu(d)" järel on kaks protsenti:
 * esimene EUR, teine USD.
 * @param {string} text
 * @returns {Array<{ months: number, eur: string, usd: string | null }>}
 */
export function parseTermDeposits(text) {
  /** @type {Array<{ months: number, eur: string, usd: string | null }>} */
  const out = [];
  const re = /(\d{1,2})\s*kuud?\b/gi;
  let m;
  while ((m = re.exec(text))) {
    const window = text.slice(m.index, m.index + 40);
    const pcts = [...window.matchAll(/(\d{1,2},\d{1,2})\s*%/g)].map((x) => x[1]);
    if (pcts.length) {
      out.push({ months: Number(m[1]), eur: pcts[0], usd: pcts[1] ?? null });
    }
  }
  return out;
}

/**
 * @param {string} text
 * @returns {string | null} kogumiskonto aastaintress (nt "1,65")
 */
export function parseSavings(text) {
  const m = text.match(/Intress\s*(\d{1,2},\d{1,2})\s*%\s*aastas/i);
  return m ? m[1] : null;
}

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult & { lhvRates?: object }>}
 */
export async function collect() {
  const fetchedAt = new Date().toISOString();
  /** @type {string[]} */
  const warnings = [];
  /** @type {{ terms: Array<{ months: number, eur: string, usd: string | null }>, savings: string | null } | null} */
  let lhvRates = null;

  try {
    const [depText, savText] = await Promise.all([
      fetchText(LHV_DEPOSIT_URL),
      fetchText(LHV_SAVINGS_URL).catch(() => '')
    ]);
    const terms = parseTermDeposits(depText);
    const savings = savText ? parseSavings(savText) : null;
    if (terms.length) {
      lhvRates = { terms, savings };
    } else {
      warnings.push('lhv.ee hoiuseintresse ei suudetud parsida — kuvatud kataloogi staatilised määrad');
    }
  } catch (err) {
    warnings.push(
      `lhv.ee hoiuselehe päring ebaõnnestus (${err instanceof Error ? err.message : err}) — kataloogi staatilised määrad`
    );
  }

  return {
    slug: 'lhv',
    bankName: 'LHV',
    rows: [],
    sources: [
      { kind: 'reference', url: LHV_DEPOSIT_URL, note: 'tähtajaline hoius' },
      { kind: 'reference', url: LHV_SAVINGS_URL, note: 'kogumiskonto' },
      { kind: 'reference', url: LHV_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings,
    lhvRates
  };
}
