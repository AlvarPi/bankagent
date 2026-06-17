import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { CITADELE_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildCitadeleKnowledge(data) {
  return buildKnowledgeWithCatalog(data, CITADELE_CATALOG, { website: 'https://www.citadele.ee' });
}
