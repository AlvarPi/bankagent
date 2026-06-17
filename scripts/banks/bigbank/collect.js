import { parsePercent } from '../_shared/util.js';

export const BIGBANK_TERM_URL = 'https://www.bigbank.ee/hoiused/';
export const BIGBANK_SAVINGS_URL = 'https://www.bigbank.ee/saastuhoius/';
export const BIGBANK_FEES_URL = 'https://www.bigbank.ee/dokumendid/?main=549&sec&doc';

/**
 * @param {string} html
 * @returns {{ label: string, rate_percent: number } | null}
 */
export function parseBigbankTermDeposit(html) {
  const match =
    html.match(/kuni\s+([0-9]+,[0-9]+)\s*%/) ||
    html.match(/([0-9]+,[0-9]+)\s*%\s*aastas/);

  if (!match) return null;

  const rate = parsePercent(`${match[1]}%`);
  if (rate == null) return null;

  return {
    label: 'Tähtajaline hoius (kuni, veebileht)',
    rate_percent: rate
  };
}

/**
 * @param {string} html
 * @returns {{ label: string, rate_percent: number } | null}
 */
export function parseBigbankSavings(html) {
  const match = html.match(/Aastane intress\s*<strong>([0-9]+,[0-9]+)\s*%/);
  if (match) {
    const rate = parsePercent(`${match[1]}%`);
    if (rate != null) {
      return {
        label: 'Säästuhoius (aastane intress, veebileht)',
        rate_percent: rate
      };
    }
  }

  const sectionIndex = html.indexOf('Säästuhoius');
  if (sectionIndex >= 0) {
    const section = html.slice(sectionIndex, sectionIndex + 120000);
    const tableMatch = section.match(
      /bb-table__cell"><!--\[-->([0-9]+,[0-9]+)%<!--\]--><\/td>/
    );
    if (tableMatch) {
      const rate = parsePercent(`${tableMatch[1]}%`);
      if (rate != null) {
        return {
          label: 'Säästuhoius (veebileht)',
          rate_percent: rate
        };
      }
    }
  }

  return null;
}
