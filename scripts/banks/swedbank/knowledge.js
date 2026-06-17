import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { SWEDBANK_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildSwedbankKnowledge(data) {
  return buildKnowledgeWithCatalog(data, SWEDBANK_CATALOG, { website: 'https://www.swedbank.ee' });
}
