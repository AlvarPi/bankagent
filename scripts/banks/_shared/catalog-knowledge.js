import { buildGenericKnowledge } from './knowledge.js';

/** @typedef {{ title: string, items: Array<{ name: string, summary?: string, url?: string, details?: string[], rates?: string[] }> }} CatalogSection */

/**
 * @param {import('./util.js').CollectResult} data
 * @param {CatalogSection[]} sections
 * @param {Record<string, unknown>} [extras]
 */
export function buildKnowledgeWithCatalog(data, sections, extras = {}) {
  return {
    ...buildGenericKnowledge(data),
    ...extras,
    catalog: {
      sections
    }
  };
}
