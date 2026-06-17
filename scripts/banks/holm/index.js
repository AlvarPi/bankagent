import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { fetchHtml, makeRow } from '../_shared/util.js';
import {
  HOLM_DEPOSIT_INFO_PDF,
  HOLM_FEES_URL,
  HOLM_RATES_URL,
  parseHolmRates
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(HOLM_RATES_URL);
  const parsed = parseHolmRates(html);
  const fetchedAt = new Date().toISOString();

  const rows = parsed.map((row) =>
    makeRow('holm', {
      product_type: 'deposit',
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: HOLM_RATES_URL,
      raw_text: 'holm-collect: hoius leht (Next.js SSR)'
    })
  );

  rows.push(...(await collectMinurahaForBank('holm')));

  rows.push(
    makeRow('holm', {
      product_type: 'fee',
      label: 'Hinnakiri',
      source_url: HOLM_FEES_URL,
      raw_text: 'holm-collect: hinnakiri leht'
    }),
    makeRow('holm', {
      product_type: 'fee',
      label: 'Hoiustaja teabeleht (PDF)',
      source_url: HOLM_DEPOSIT_INFO_PDF,
      raw_text: 'holm-collect: hoiustaja teabeleht link'
    })
  );

  return {
    slug: 'holm',
    bankName: 'Holm Bank',
    rows,
    sources: [
      { kind: 'primary', url: HOLM_RATES_URL, note: 'hoius leht' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: HOLM_FEES_URL, note: 'hinnakiri' },
      { kind: 'reference', url: HOLM_DEPOSIT_INFO_PDF, note: 'hoiustaja teabeleht' }
    ],
    fetchedAt,
    warnings: parsed.length === 0 ? ['Holm lehelt intressi ei leitud — kasutatud minuraha baromeetrit'] : []
  };
}
