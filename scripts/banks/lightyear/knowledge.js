import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { LIGHTYEAR_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildLightyearKnowledge(data) {
  return buildKnowledgeWithCatalog(data, LIGHTYEAR_CATALOG, {
    website: 'https://lightyear.com/et-ee'
  });
}
