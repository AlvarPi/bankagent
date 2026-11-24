import { fetchHtml, makeRow, parseEuroFeeToCents, parsePercent, USER_AGENT } from '../_shared/util.js';

export const SWED_DEPOSIT_RATES_URL =
  'https://www.swedbank.ee/private/home/more/pricesrates/depositrates';
export const SWED_INTERESTS_URL =
  'https://www.swedbank.ee/private/home/more/pricesrates/interests';

/**
 * @param {string} html
 * @returns {import('../_shared/util.js').RateRow[]}
 */
export function parseSwedbankRates(html) {
  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = [];

  const accountMatch = html.match(/<th>EUR<\/th>\s*<td[^>]*>([0-9]+(?:[.,][0-9]+)?)\s*%<\/td>/i);
  if (accountMatch) {
    rows.push(
      makeRow('swedbank', {
        product_type: 'account',
        label: 'Arvelduskonto EUR',
        rate_percent: parsePercent(accountMatch[1]),
        source_url: SWED_DEPOSIT_RATES_URL,
        raw_text: 'swedbank-collect: depositrates leht'
      })
    );
  }

  const packagePatterns = [
    { re: /Põhipaketi kuutasu[\s\S]*?<td[^>]*>([^<]+)<\/td>/i, label: 'Põhipaketi kuutasu (täishind)' },
    {
      re: /Põhipaketi kuutasu[\s\S]*?kuni 25-aastastele[\s\S]*?<td[^>]*>([^<]+)<\/td>/i,
      label: 'Põhipakett kuni 25 a.'
    },
    {
      re: /Põhipaketi kuutasu[\s\S]*?alates 65-aastastele[\s\S]*?<td[^>]*>([^<]+)<\/td>/i,
      label: 'Põhipakett alates 65 a.'
    },
    { re: /Ostupakett[\s\S]*?<td[^>]*col[^>]*>([^<]+)<\/td>/i, label: 'Ostupaketi kuutasu' },
    { re: /Premium[\s\S]*?kuutasu[\s\S]*?<td[^>]*>([^<]+)<\/td>/i, label: 'Premium paketi kuutasu' }
  ];

  for (const { re, label } of packagePatterns) {
    const match = html.match(re);
    if (!match) continue;
    const fee = parseEuroFeeToCents(match[1]);
    if (fee == null && !/tasuta/i.test(match[1])) continue;
    if (rows.some((row) => row.label === label)) continue;
    rows.push(
      makeRow('swedbank', {
        product_type: 'fee',
        label,
        fee_cents: fee ?? 0,
        source_url: SWED_DEPOSIT_RATES_URL,
        raw_text: 'swedbank-collect: depositrates leht'
      })
    );
  }

  const termMatch = html.match(/Tähtajaline hoius[\s\S]*?<td[^>]*>([0-9]+(?:[.,][0-9]+)?)\s*%<\/td>/i);
  if (termMatch) {
    rows.push(
      makeRow('swedbank', {
        product_type: 'deposit',
        label: 'Tähtajaline hoius (depositsrates leht)',
        rate_percent: parsePercent(termMatch[1]),
        source_url: SWED_DEPOSIT_RATES_URL,
        raw_text: 'swedbank-collect: depositrates leht'
      })
    );
  }

  return rows;
}

/**
 * Swedbanki hoiusekalkulaatori JSON-päring (avalik, autentimata). Leitud 24.11.2026
 * brauseri võrguliiklusest: POST vormiga → {"interest":2.6,"interestSum":…,"grandTotal":…}.
 * depositType 20 = tähtajaline hoius (intress perioodi lõpus). Määr 0 = perioodi ei pakuta.
 */
export const SWED_DEPOSIT_CALC_URL = 'https://www.swedbank.ee/private/home/more/calculator/calc/deposit';
export const SWED_DEPOSIT_PAGE_URL = `${SWED_DEPOSIT_CALC_URL}?language=EST`;
export const SWED_TERM_MONTHS = [1, 3, 6, 9, 12, 18, 24, 36, 60];

/**
 * @param {{ currency: string, months: number, amount?: number, depositType?: string }} q
 * @returns {Promise<number | null>}
 */
export async function querySwedbankDepositRate({ currency, months, amount = 1000, depositType = '20' }) {
  const body = new URLSearchParams({
    pageId: 'private.home.more.calculator.calc.deposit',
    language: 'EST',
    calculate: 'true',
    currency,
    amount: String(amount),
    period: String(months),
    periodType: 'M',
    depositType,
    contributionType: '0',
    margin: '0.01'
  });
  const res = await fetch(SWED_DEPOSIT_CALC_URL, {
    method: 'POST',
    headers: {
      'User-Agent': USER_AGENT,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body,
    signal: AbortSignal.timeout(30_000)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${SWED_DEPOSIT_CALC_URL}`);
  const json = await res.json();
  if (json.exception || json.error) return null;
  return typeof json.interest === 'number' ? json.interest : null;
}

/**
 * @returns {Promise<Array<{ currency: string, months: number, rate: number }>>}
 */
export async function fetchSwedbankDepositRates() {
  const out = [];
  for (const currency of ['EUR', 'USD']) {
    for (const months of SWED_TERM_MONTHS) {
      const rate = await querySwedbankDepositRate({ currency, months });
      if (rate) out.push({ currency, months, rate });
    }
  }
  return out;
}
