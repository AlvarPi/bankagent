import { buildGenericKnowledge } from '../_shared/knowledge.js';
import { COOP_CATALOG } from './catalog.js';

/**
 * @param {import('../_shared/util.js').CollectResult} data
 */
export function buildCoopKnowledge(data) {
  return {
    ...buildGenericKnowledge(data),
    website: 'https://www.cooppank.ee',
    catalog: {
      sections: COOP_CATALOG
    }
  };
}
