import { KNOWLEDGE_INDEX_SCHEMA, buildGenericKnowledge } from './_shared/knowledge.js';
import { buildCoopKnowledge } from './coop/knowledge.js';

/** @typedef {import('./_shared/util.js').CollectResult} CollectResult */

/** @type {Record<string, (data: CollectResult) => object>} */
const BUILDERS = {
  coop: buildCoopKnowledge
};

/**
 * @param {CollectResult} data
 */
export function buildBankKnowledge(data) {
  const builder = BUILDERS[data.slug] ?? buildGenericKnowledge;
  return builder(data);
}

/**
 * @param {CollectResult[]} results
 */
export function buildKnowledgeIndex(results) {
  return {
    schema: KNOWLEDGE_INDEX_SCHEMA,
    generatedAt: new Date().toISOString(),
    agent: {
      usage:
        'Lae /banks/knowledge.json, seejärel iga panga /banks/{slug}/data.json. Coop sisaldab täielikku tootekataloogi (catalog.sections).',
      indexUrl: '/banks/knowledge.json',
      dataUrlPattern: '/banks/{slug}/data.json'
    },
    banks: results.map((data) => {
      const knowledge = buildBankKnowledge(data);
      return {
        slug: data.slug,
        name: data.bankName,
        fetchedAt: data.fetchedAt,
        json: `/banks/${data.slug}/data.json`,
        html: `/banks/${data.slug}/`,
        hasCatalog: Boolean(knowledge.catalog),
        rateCount: data.rows.length
      };
    })
  };
}
