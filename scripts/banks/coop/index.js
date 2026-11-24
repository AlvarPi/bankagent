import { COOP_FEES_URL, COOP_RATES_URL, collectCoopRates } from './collect.js';
import { makeRow } from '../_shared/util.js';
import { collectMortgageTerms, MORTGAGE_SOURCES } from '../_shared/mortgage.js';

export { COOP_RATES_URL, COOP_FEES_URL, collectCoopRates };

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const { rows, validFrom, fetchedAt } = await collectCoopRates();
  const feeRow = makeRow('coop', {
    product_type: 'fee',
    label: 'Erakliendi hinnakiri (PDF lingid)',
    source_url: COOP_FEES_URL,
    raw_text: 'coop-collect: hinnakirja PDF-id, parse not implemented yet'
  });

  const mortgage = await collectMortgageTerms('coop');

  return {
    slug: 'coop',
    bankName: 'Coop Pank',
    rows: [...rows, ...mortgage.rows, feeRow],
    sources: [
      { kind: 'primary', url: COOP_RATES_URL, note: 'hoiuste intressid (parse)' },
      { kind: 'reference', url: COOP_FEES_URL, note: 'hinnakirja lingid' },
      { kind: 'primary', url: MORTGAGE_SOURCES.coop.url, note: 'kodulaenu tingimused (lehe tekst)' }
    ],
    fetchedAt,
    warnings: [...(validFrom ? [] : ['Kehtivuse kuupäeva ei leitud']), ...mortgage.warnings]
  };
}
