import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { makeRow } from '../_shared/util.js';

export const LUMINOR_RATES_URL = 'https://luminor.ee/intressi-ja-viivisemaarad#hoiused';
export const LUMINOR_FEES_URL = 'https://luminor.ee/hinnakiri';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const fetchedAt = new Date().toISOString();
  const warnings = [
    'Luminor leht on SPA (andmed laaditakse JS-iga) — kasutatud minuraha.ee baromeetrit'
  ];

  const rows = await collectMinurahaForBank('luminor');
  rows.push(
    makeRow('luminor', {
      product_type: 'fee',
      label: 'Hinnakiri',
      source_url: LUMINOR_FEES_URL,
      raw_text: 'luminor-collect: hinnakiri link'
    })
  );

  return {
    slug: 'luminor',
    bankName: 'Luminor',
    rows,
    sources: [
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: LUMINOR_RATES_URL, note: 'intressimäärad (JS leht)' },
      { kind: 'reference', url: LUMINOR_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings
  };
}
