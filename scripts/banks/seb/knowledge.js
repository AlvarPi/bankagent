import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { SEB_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildSebKnowledge(data) {
  return buildKnowledgeWithCatalog(data, SEB_CATALOG, { website: 'https://www.seb.ee' });
}
