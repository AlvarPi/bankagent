import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { fetchHtml } from '../_shared/util.js';
import {
  parseSwedbankRates,
  SWED_DEPOSIT_RATES_URL,
  SWED_INTERESTS_URL
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(SWED_DEPOSIT_RATES_URL);
  const rows = parseSwedbankRates(html);
  const minurahaRows = await collectMinurahaForBank('swedbank');
  rows.push(...minurahaRows);

  const fetchedAt = new Date().toISOString();
  const warnings = [];

  if (!rows.some((row) => row.label === 'Arvelduskonto EUR')) {
    warnings.push('Swedbank arvelduskonto intressi ei leitud depositrates lehelt');
  }

  return {
    slug: 'swedbank',
    bankName: 'Swedbank',
    rows,
    sources: [
      { kind: 'primary', url: SWED_DEPOSIT_RATES_URL, note: 'deposits & paketid' },
      { kind: 'reference', url: SWED_INTERESTS_URL, note: 'intressimäärad (JS leht)' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' }
    ],
    fetchedAt,
    warnings
  };
}
