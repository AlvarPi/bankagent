import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { MORGAN_STANLEY_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildMorganStanleyKnowledge(data) {
  return buildKnowledgeWithCatalog(data, MORGAN_STANLEY_CATALOG, {
    website: 'https://www.morganstanley.com'
  });
}
