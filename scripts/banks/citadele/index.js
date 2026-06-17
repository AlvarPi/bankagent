import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { fetchHtml, makeRow } from '../_shared/util.js';
import {
  CITADELE_FEES_URL,
  CITADELE_RATES_URL,
  parseCitadeleRates
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(CITADELE_RATES_URL);
  const parsed = parseCitadeleRates(html);
  const fetchedAt = new Date().toISOString();

  const rows = parsed.map((row) =>
    makeRow('citadele', {
      product_type: 'deposit',
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: CITADELE_RATES_URL,
      raw_text: 'citadele-collect: savings lehe kalkulaator'
    })
  );

  rows.push(...(await collectMinurahaForBank('citadele')));

  rows.push(
    makeRow('citadele', {
      product_type: 'fee',
      label: 'Teenuste hinnakiri',
      source_url: CITADELE_FEES_URL,
      raw_text: 'citadele-collect: hinnakiri link'
    })
  );

  return {
    slug: 'citadele',
    bankName: 'Citadele',
    rows,
    sources: [
      { kind: 'primary', url: CITADELE_RATES_URL, note: 'hoiused / kalkulaator' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: CITADELE_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings: parsed.length === 0 ? ['Citadele lehelt intresse ei leitud'] : []
  };
}
