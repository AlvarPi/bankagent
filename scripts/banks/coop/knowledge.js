import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { COOP_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildCoopKnowledge(data) {
  return buildKnowledgeWithCatalog(data, COOP_CATALOG, { website: 'https://www.cooppank.ee' });
}
