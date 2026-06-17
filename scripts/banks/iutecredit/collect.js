import { parsePercent } from '../_shared/util.js';

export const IUTE_BOND_URL = 'https://iute.com/et/volakiri/';
export const IUTE_HOME_URL = 'https://iute.com/et/';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number }>}
 */
export function parseIuteBondRates(html) {
  /** @type {Array<{ label: string, rate_percent: number }>} */
  const rows = [];
  const seen = new Set();

  for (const match of html.matchAll(/([0-9]+)\s*%\s*aastas/g)) {
    const rate = parsePercent(`${match[1]}%`);
    if (rate == null || rate < 5 || seen.has(rate)) continue;
    seen.add(rate);
    rows.push({
      label: `Võlakiri (${match[1]}% aastas)`,
      rate_percent: rate
    });
  }

  return rows;
}
