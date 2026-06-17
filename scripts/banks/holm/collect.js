import { parsePercent } from '../_shared/util.js';

export const HOLM_RATES_URL = 'https://www.holmbank.ee/et/eraklient/hoius';
export const HOLM_FEES_URL = 'https://www.holmbank.ee/et/eraklient/hinnakiri';
export const HOLM_DEPOSIT_INFO_PDF =
  'https://content.holmbank.ee/content/uploads/2026/01/15113155/Hoiustaja-teabeleht-EST_2026.pdf';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number }>}
 */
export function parseHolmRates(html) {
  /** @type {Array<{ label: string, rate_percent: number }>} */
  const rows = [];

  const blockMatch = html.match(
    /"title":"Intress kuni"[^}]*"text":"([0-9]+[,.]?[0-9]*)% aastas"/
  );
  if (blockMatch) {
    const rate = parsePercent(`${blockMatch[1]}%`);
    if (rate != null) {
      rows.push({ label: 'Tähtajaline hoius (kuni, veebileht)', rate_percent: rate });
    }
  }

  if (!rows.length) {
    const spanMatch = html.match(/>([0-9]+[,.]?[0-9]*)% aastas<\/span>/);
    if (spanMatch) {
      const rate = parsePercent(`${spanMatch[1]}%`);
      if (rate != null) {
        rows.push({ label: 'Tähtajaline hoius (kuni, veebileht)', rate_percent: rate });
      }
    }
  }

  return rows;
}
