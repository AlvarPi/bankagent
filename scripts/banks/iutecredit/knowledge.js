import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { IUTECREDIT_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildIutecreditKnowledge(data) {
  return buildKnowledgeWithCatalog(data, IUTECREDIT_CATALOG, { website: 'https://iute.com/et' });
}
