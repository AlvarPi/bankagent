import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { LHV_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildLhvKnowledge(data) {
  return buildKnowledgeWithCatalog(data, LHV_CATALOG, { website: 'https://www.lhv.ee' });
}
