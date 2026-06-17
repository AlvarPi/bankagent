import { fetchHtml, makeRow } from '../_shared/util.js';
import { IUTE_BOND_URL, IUTE_HOME_URL, parseIuteBondRates } from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(IUTE_BOND_URL);
  const parsed = parseIuteBondRates(html);
  const fetchedAt = new Date().toISOString();

  const rows = parsed.map((row) =>
    makeRow('iutecredit', {
      product_type: 'account',
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: IUTE_BOND_URL,
      raw_text: 'iutecredit-collect: võlakirja info (ei ole pangahoius)'
    })
  );

  return {
    slug: 'iutecredit',
    bankName: 'IuteCredit',
    rows,
    sources: [
      { kind: 'primary', url: IUTE_BOND_URL, note: 'võlakirja avalik info' },
      { kind: 'reference', url: IUTE_HOME_URL, note: 'IuteCredit koduleht' }
    ],
    fetchedAt,
    warnings: [
      'IuteCredit ei ole traditsiooniline hoiuspank — kogutud andmed on võlakirja intress, mitte hoiuse määr',
      'Ei ole minuraha.ee baromeetris',
      parsed.length === 0 ? 'Võlakirja lehelt intressi ei leitud' : ''
    ].filter(Boolean)
  };
}
