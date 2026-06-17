import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { HOLM_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildHolmKnowledge(data) {
  return buildKnowledgeWithCatalog(data, HOLM_CATALOG, { website: 'https://www.holmbank.ee' });
}
