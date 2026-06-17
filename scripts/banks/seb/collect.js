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
