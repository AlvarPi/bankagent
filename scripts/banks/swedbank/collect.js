import { fetchHtml, makeRow, parseEuroFeeToCents, parsePercent } from '../_shared/util.js';

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
