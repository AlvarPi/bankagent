import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { WISE_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildWiseKnowledge(data) {
  return buildKnowledgeWithCatalog(data, WISE_CATALOG, { website: 'https://wise.com/ee' });
}
