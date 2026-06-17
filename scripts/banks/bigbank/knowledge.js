import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { BIGBANK_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildBigbankKnowledge(data) {
  return buildKnowledgeWithCatalog(data, BIGBANK_CATALOG, { website: 'https://www.bigbank.ee' });
}
