import { parsePercent } from '../_shared/util.js';

export const LIGHTYEAR_URL = 'https://lightyear.com/et-ee';
export const LIGHTYEAR_VAULTS_URL = 'https://lightyear.com/et-ee/vaults';
export const LIGHTYEAR_PRICING_URL = 'https://lightyear.com/et-ee/pricing';

/**
 * Lightyear avaldab Kasvukonto (money market fund) intressid lehel ühe lausena:
 * "Praegused Kasvukonto intressimäärad on euro puhul 2,16%, Suurbritannia naela
 *  puhul 3,83% ja USA dollari puhul 3,68% (APY)."
 *
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number | null, product_type: 'account' }>}
 */
export function parseLightyearRates(html) {
  /** @type {Array<{ label: string; rate_percent: number | null; product_type: 'account' }>} */
  const rows = [];

  const sentence = html.match(
    /Kasvukonto intressimäärad on euro puhul\s*([0-9]+[,.][0-9]+)\s*%[\s\S]{0,80}?naela puhul\s*([0-9]+[,.][0-9]+)\s*%[\s\S]{0,80}?dollari puhul\s*([0-9]+[,.][0-9]+)\s*%/i
  );

  if (sentence) {
    rows.push({
      label: 'Kasvukonto EUR (APY)',
      rate_percent: parsePercent(sentence[1]),
      product_type: 'account'
    });
    rows.push({
      label: 'Kasvukonto GBP (APY)',
      rate_percent: parsePercent(sentence[2]),
      product_type: 'account'
    });
    rows.push({
      label: 'Kasvukonto USD (APY)',
      rate_percent: parsePercent(sentence[3]),
      product_type: 'account'
    });
    return rows;
  }

  // Varuvariant: vähemalt EUR-i "kuni X% APY"
  const eur = html.match(/kuni\s*([0-9]+[,.][0-9]+)\s*%\s*APY/i);
  if (eur) {
    rows.push({
      label: 'Kasvukonto EUR (APY)',
      rate_percent: parsePercent(eur[1]),
      product_type: 'account'
    });
  }

  return rows;
}
