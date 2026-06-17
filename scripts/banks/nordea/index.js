import { fetchHtml, makeRow } from '../_shared/util.js';
import {
  NORDEA_FI_JOUSTOTALLETUS_URL,
  NORDEA_FI_SAVINGS_URL,
  NORDEA_HOME_URL,
  NORDEA_SE_SPARKONTON_URL,
  parseNordeaFiJoustotalletusRates,
  parseNordeaSeSparkontonRates
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const [fiHtml, seHtml] = await Promise.all([
    fetchHtml(NORDEA_FI_JOUSTOTALLETUS_URL),
    fetchHtml(NORDEA_SE_SPARKONTON_URL)
  ]);

  const fetchedAt = new Date().toISOString();
  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = [];

  for (const row of parseNordeaFiJoustotalletusRates(fiHtml)) {
    rows.push(
      makeRow('nordea', {
        product_type: 'deposit',
        label: row.label,
        rate_percent: row.rate_percent,
        source_url: NORDEA_FI_JOUSTOTALLETUS_URL,
        raw_text: 'nordea-collect: Suomi JoustoTalletus'
      })
    );
  }

  for (const row of parseNordeaSeSparkontonRates(seHtml)) {
    rows.push(
      makeRow('nordea', {
        product_type: 'deposit',
        label: row.label,
        rate_percent: row.rate_percent,
        source_url: NORDEA_SE_SPARKONTON_URL,
        raw_text: 'nordea-collect: Ruotsi sparkonton'
      })
    );
  }

  rows.push(
    makeRow('nordea', {
      product_type: 'fee',
      label: 'Nordea.com (grupi koduleht)',
      source_url: NORDEA_HOME_URL,
      raw_text: 'nordea-collect: põhileht'
    }),
    makeRow('nordea', {
      product_type: 'fee',
      label: 'Suomi säästötilit',
      source_url: NORDEA_FI_SAVINGS_URL,
      raw_text: 'nordea-collect: FI tooted'
    })
  );

  return {
    slug: 'nordea',
    bankName: 'Nordea',
    rows,
    sources: [
      { kind: 'primary', url: NORDEA_HOME_URL, note: 'Nordea grupi koduleht' },
      { kind: 'primary', url: NORDEA_FI_JOUSTOTALLETUS_URL, note: 'Suomi JoustoTalletus' },
      { kind: 'primary', url: NORDEA_SE_SPARKONTON_URL, note: 'Ruotsi sparkonton' },
      { kind: 'reference', url: NORDEA_FI_SAVINGS_URL, note: 'Suomi säästötilid' }
    ],
    fetchedAt,
    warnings: [
      'Nordea.com/en ei avalda ühtseid intressimäärasid — kogutud riiklikud näited (FI, SE)',
      'Ei ole Eesti pank ega minuraha.ee baromeetris'
    ]
  };
}
