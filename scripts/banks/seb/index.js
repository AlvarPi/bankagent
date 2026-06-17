import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { makeRow } from '../_shared/util.js';
import { fetchHtml } from '../_shared/util.js';
import { parseSebRates, SEB_FEES_URL, SEB_RATES_URL } from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(SEB_RATES_URL);
  const parsed = parseSebRates(html);
  const fetchedAt = new Date().toISOString();

  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = parsed.map((row) =>
    makeRow('seb', {
      product_type: row.product_type,
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: SEB_RATES_URL,
      raw_text: 'seb-collect: intressimaarad leht'
    })
  );

  const minurahaRows = await collectMinurahaForBank('seb');
  rows.push(...minurahaRows);

  rows.push(
    makeRow('seb', {
      product_type: 'fee',
      label: 'Pangateenuste hinnakiri',
      source_url: SEB_FEES_URL,
      raw_text: 'seb-collect: hinnakiri link'
    })
  );

  return {
    slug: 'seb',
    bankName: 'SEB',
    rows,
    sources: [
      { kind: 'primary', url: SEB_RATES_URL, note: 'hoiuste intressimäärad' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: SEB_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings: parsed.length === 0 ? ['SEB lehelt intresse ei õnnestunud parsida'] : []
  };
}
