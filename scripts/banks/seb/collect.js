import { fetchHtml, makeRow, parsePercent } from '../_shared/util.js';

export const SEB_RATES_URL = 'https://www.seb.ee/intressimaarad';
export const SEB_FEES_URL =
  'https://www.seb.ee/eraklient/igapaevapangandus/pangateenuste-hinnakiri';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number, product_type: 'deposit' | 'account' }>}
 */
export function parseSebRates(html) {
  /** @type {Array<{ label: string, rate_percent: number, product_type: 'deposit' | 'account' }>} */
  const rows = [];

  const patterns = [
    {
      re: /Tähtajaline hoius[\s\S]*?<strong>\s*kuni\s*([0-9]+)\s*%/i,
      label: 'Tähtajaline hoius (kuni)',
      product_type: 'deposit'
    },
    {
      re: /Kogumishoius[\s\S]*?aastas\s*<strong>\s*([0-9]+(?:[.,][0-9]+)?)\s*%/i,
      label: 'Kogumishoius (sh Digikassa)',
      product_type: 'deposit'
    },
    {
      re: /Arvelduskonto[\s\S]*?aastas<strong>\s*([0-9]+(?:[.,][0-9]+)?)\s*%/i,
      label: 'Arvelduskonto',
      product_type: 'account'
    }
  ];

  for (const { re, label, product_type } of patterns) {
    const match = html.match(re);
    if (match) {
      rows.push({
        label,
        rate_percent: parsePercent(match[1]),
        product_type
      });
    }
  }

  return rows;
}

/**
 * SEB tähtajalise hoiuse kalkulaator (seb.ee/eraklient/hoiuste-intressimaarad) loeb määrad
 * avalikest CSV-failidest. Formaat: esimene rida "0; 500-100000" (summavahemik),
 * edasi "päevad; määr" (koma kümnenderaldajana). Leitud 24.11.2026 brauseri võrguliiklusest.
 */
export const SEB_DEPOSIT_CSV_BASE = 'https://www.seb.ee/sites/default/files/calc/intress';
export const SEB_DEPOSIT_PAGE_URL = 'https://www.seb.ee/eraklient/hoiuste-intressimaarad';

/** Päevad → silt; muud read jäetakse vahele (kalkulaatori vahepunktid). */
const SEB_TERMS = new Map([
  [30, '1 kuu'],
  [90, '3 kuud'],
  [180, '6 kuud'],
  [270, '9 kuud'],
  [365, '12 kuud'],
  [730, '24 kuud'],
  [1095, '36 kuud']
]);

/**
 * @param {string} csv
 * @returns {{ amountRange: string | null, rows: Array<{ days: number, rate: number }> }}
 */
export function parseSebDepositCsv(csv) {
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let amountRange = null;
  /** @type {Array<{ days: number, rate: number }>} */
  const rows = [];
  for (const line of lines) {
    const [a, b] = line.split(';').map((x) => (x ?? '').trim());
    const days = Number(a);
    if (!Number.isFinite(days)) continue;
    if (days === 0) {
      amountRange = b || null;
      continue;
    }
    const rate = parsePercent(b ?? '');
    if (rate == null) continue;
    rows.push({ days, rate });
  }
  return { amountRange, rows };
}

/**
 * @returns {Promise<Array<{ currency: string, term: string, days: number, rate: number, amountRange: string | null }>>}
 */
export async function fetchSebDepositRates() {
  const out = [];
  for (const cur of ['eur', 'usd']) {
    const csv = await fetchHtml(`${SEB_DEPOSIT_CSV_BASE}/${cur}-privi.csv`);
    const { amountRange, rows } = parseSebDepositCsv(csv);
    for (const r of rows) {
      const term = SEB_TERMS.get(r.days);
      if (!term || !r.rate) continue;
      out.push({ currency: cur.toUpperCase(), term, days: r.days, rate: r.rate, amountRange });
    }
  }
  return out;
}
