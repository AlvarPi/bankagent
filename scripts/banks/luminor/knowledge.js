import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { LUMINOR_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildLuminorKnowledge(data) {
  return buildKnowledgeWithCatalog(data, LUMINOR_CATALOG, { website: 'https://luminor.ee' });
}
