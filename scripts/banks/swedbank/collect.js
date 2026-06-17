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

  const packageMatch = html.match(
    /Põhipaketi kuutasu[\s\S]*?<td[^>]*>([^<]+)<\/td>/i
  );
  if (packageMatch) {
    rows.push(
      makeRow('swedbank', {
        product_type: 'fee',
        label: 'Põhipaketi kuutasu',
        fee_cents: parseEuroFeeToCents(packageMatch[1]),
        source_url: SWED_DEPOSIT_RATES_URL,
        raw_text: 'swedbank-collect: depositrates leht'
      })
    );
  }

  const paymentPackageMatch = html.match(
    /Ostupakett[\s\S]*?<td[^>]*col[^>]*>([^<]+)<\/td>/i
  );
  if (paymentPackageMatch && paymentPackageMatch[1].includes('€')) {
    rows.push(
      makeRow('swedbank', {
        product_type: 'fee',
        label: 'Ostupakett kuutasu',
        fee_cents: parseEuroFeeToCents(paymentPackageMatch[1]),
        source_url: SWED_DEPOSIT_RATES_URL,
        raw_text: 'swedbank-collect: depositrates leht'
      })
    );
  }

  return rows;
}
