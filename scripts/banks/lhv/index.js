import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { makeRow } from '../_shared/util.js';

export const LHV_RATES_URL = 'https://www.lhv.ee/et/hoiused';
export const LHV_FEES_URL = 'https://www.lhv.ee/et/era/pangateenuste-hinnakiri';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const fetchedAt = new Date().toISOString();
  /** @type {string[]} */
  const warnings = ['LHV veebileht blokeerib automaatse päringu (403) — kasutatud minuraha.ee baromeetrit'];

  const rows = await collectMinurahaForBank('lhv');
  rows.push(
    makeRow('lhv', {
      product_type: 'fee',
      label: 'Pangateenuste hinnakiri',
      source_url: LHV_FEES_URL,
      raw_text: 'lhv-collect: hinnakiri link'
    })
  );

  return {
    slug: 'lhv',
    bankName: 'LHV',
    rows,
    sources: [
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: LHV_RATES_URL, note: 'panga hoiuste leht' },
      { kind: 'reference', url: LHV_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings
  };
}
