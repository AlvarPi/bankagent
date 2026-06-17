/** @typedef {import('./util.js').CollectResult} CollectResult */

export const KNOWLEDGE_SCHEMA = 'pankade-teenused/bank-knowledge/1';
export const KNOWLEDGE_INDEX_SCHEMA = 'pankade-teenused/knowledge-index/1';

/**
 * @param {import('./util.js').RateRow} row
 */
function serializeRate(row) {
  return {
    product_type: row.product_type,
    label: row.label,
    rate_percent: row.rate_percent ?? null,
    fee_cents: row.fee_cents ?? null,
    source_url: row.source_url,
    raw_text: row.raw_text ?? null
  };
}

/**
 * @param {CollectResult} data
 */
export function buildGenericKnowledge(data) {
  return {
    schema: KNOWLEDGE_SCHEMA,
    slug: data.slug,
    name: data.bankName,
    fetchedAt: data.fetchedAt,
    generatedAt: new Date().toISOString(),
    sources: data.sources,
    warnings: data.warnings,
    rates: data.rows.map(serializeRate),
    links: {
      html: `/banks/${data.slug}/`,
      json: `/banks/${data.slug}/data.json`
    }
  };
}
