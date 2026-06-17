import { fetchHtml, makeRow } from '../_shared/util.js';
import { parseWiseRates, WISE_FEES_URL, WISE_INTEREST_URL } from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(WISE_INTEREST_URL);
  const parsed = parseWiseRates(html);
  const fetchedAt = new Date().toISOString();

  const rows = parsed.map((row) =>
    makeRow('wise', {
      product_type: row.product_type,
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: WISE_INTEREST_URL,
      raw_text: 'wise-collect: Interest leht (ei ole Eesti pank)'
    })
  );

  rows.push(
    makeRow('wise', {
      product_type: 'fee',
      label: 'Wise tasude info',
      source_url: WISE_FEES_URL,
      raw_text: 'wise-collect: pricing leht'
    })
  );

  return {
    slug: 'wise',
    bankName: 'Wise',
    rows,
    sources: [
      { kind: 'primary', url: WISE_INTEREST_URL, note: 'Wise Interest (fintech)' },
      { kind: 'reference', url: WISE_FEES_URL, note: 'tasud' }
    ],
    fetchedAt,
    warnings: [
      'Wise ei ole Eesti litsentseeritud pank — intress tuleb fondi kaudu, mitte pangahoiusena',
      'Ei ole minuraha.ee baromeetris'
    ]
  };
}
