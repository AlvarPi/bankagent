import { fetchHtml, makeRow, parsePercent } from '../_shared/util.js';

export const CITADELE_RATES_URL = 'https://www.citadele.ee/et/private/savings/';
export const CITADELE_FEES_URL = 'https://www.citadele.ee/et/private/fees/';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number }>}
 */
export function parseCitadeleRates(html) {
  /** @type {Array<{ label: string, rate_percent: number }>} */
  const rows = [];
  const seen = new Set();

  for (const match of html.matchAll(/calculator-result-value">\s*([0-9]+,[0-9]+)\s*%/g)) {
    const rate = parsePercent(match[1]);
    if (rate == null || seen.has(rate)) continue;
    seen.add(rate);

    const before = html.slice(Math.max(0, match.index - 12000), match.index);
    const heading = [...before.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].pop();
    const section = heading ? heading[1].replace(/\s+/g, ' ').trim() : 'Hoius';
    rows.push({
      label: `${section} (kalkulaator)`,
      rate_percent: rate
    });
  }

  return rows;
}
