import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { NORDEA_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildNordeaKnowledge(data) {
  return buildKnowledgeWithCatalog(data, NORDEA_CATALOG, { website: 'https://www.nordea.com' });
}
