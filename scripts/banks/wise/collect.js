import { fetchHtml, makeRow, parsePercent } from '../_shared/util.js';

export const WISE_INTEREST_URL = 'https://wise.com/ee/interest/';
export const WISE_FEES_URL = 'https://wise.com/ee/pricing/';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number | null, product_type: 'account' | 'fee' }>}
 */
export function parseWiseRates(html) {
  /** @type {Array<{ label: string; rate_percent: number | null; product_type: 'account' | 'fee' }>} */
  const rows = [];

  const eurRate = html.match(
    /EUR<\/span>[\s\S]{0,200}?>\s*([0-9]+[,.][0-9]+)\s*%/i
  );
  if (eurRate) {
    rows.push({
      label: 'Wise Interest EUR (muutuv määr)',
      rate_percent: parsePercent(eurRate[1]),
      product_type: 'account'
    });
  }

  if (/0[,.]26\s*%/.test(html)) {
    rows.push({
      label: 'Wise Interest aastatasu (ligikaudu)',
      rate_percent: 0.26,
      product_type: 'fee'
    });
  }

  return rows;
}
