import { KNOWLEDGE_INDEX_SCHEMA, buildGenericKnowledge } from './_shared/knowledge.js';
import { buildCoopKnowledge } from './coop/knowledge.js';
import { buildLhvKnowledge } from './lhv/knowledge.js';
import { buildSebKnowledge } from './seb/knowledge.js';
import { buildSwedbankKnowledge } from './swedbank/knowledge.js';
import { buildLuminorKnowledge } from './luminor/knowledge.js';
import { buildCitadeleKnowledge } from './citadele/knowledge.js';
import { buildWiseKnowledge } from './wise/knowledge.js';
import { buildHolmKnowledge } from './holm/knowledge.js';
import { buildBigbankKnowledge } from './bigbank/knowledge.js';
import { buildIutecreditKnowledge } from './iutecredit/knowledge.js';
import { buildMorganStanleyKnowledge } from './morgan-stanley/knowledge.js';
import { buildNordeaKnowledge } from './nordea/knowledge.js';
import { buildLightyearKnowledge } from './lightyear/knowledge.js';

/** @typedef {import('./_shared/util.js').CollectResult} CollectResult */

/** @type {Record<string, (data: CollectResult) => object>} */
const BUILDERS = {
  coop: buildCoopKnowledge,
  lhv: buildLhvKnowledge,
  seb: buildSebKnowledge,
  swedbank: buildSwedbankKnowledge,
  luminor: buildLuminorKnowledge,
  citadele: buildCitadeleKnowledge,
  wise: buildWiseKnowledge,
  holm: buildHolmKnowledge,
  bigbank: buildBigbankKnowledge,
  iutecredit: buildIutecreditKnowledge,
  'morgan-stanley': buildMorganStanleyKnowledge,
  nordea: buildNordeaKnowledge,
  lightyear: buildLightyearKnowledge
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
        'Lae /banks/knowledge.json, seejärel iga panga /banks/{slug}/data.json. Igal pangal on tootekataloog (catalog.sections) koos intressidega.',
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
