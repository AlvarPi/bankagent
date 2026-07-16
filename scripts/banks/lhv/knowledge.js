import { buildKnowledgeWithCatalog } from '../_shared/catalog-knowledge.js';
import { LHV_CATALOG } from './catalog.js';

/**
 * Asendab kataloogi hoiuse-määrad lhv.ee-lt tõmmatud värsketega (kui olemas).
 * @param {typeof LHV_CATALOG} sections
 * @param {{ terms: Array<{ months: number, eur: string, usd: string | null }>, savings: string | null } | null | undefined} live
 */
function applyLiveRates(sections, live) {
  if (!live || !live.terms?.length) return sections;

  const termRates = live.terms.map(
    (t) => `EUR ${t.months} ${t.months === 1 ? 'kuu' : 'kuud'} ${t.eur}% (lhv.ee/tahtajaline-hoius)`
  );
  const usd12 = live.terms.find((t) => t.months === 12)?.usd;
  if (usd12) termRates.push(`USD 12 kuud ${usd12}% (lhv.ee/tahtajaline-hoius)`);

  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (/tähtajaline/i.test(item.name)) {
        return { ...item, rates: termRates };
      }
      if (/kogumiskonto/i.test(item.name) && live.savings) {
        return { ...item, rates: [`Intress ${live.savings}% aastas (lhv.ee/kogumiskonto)`] };
      }
      return item;
    })
  }));
}

/**
 * @param {import('../_shared/util.js').CollectResult & { lhvRates?: object }} data
 */
export function buildLhvKnowledge(data) {
  const sections = applyLiveRates(LHV_CATALOG, /** @type {any} */ (data).lhvRates);
  return buildKnowledgeWithCatalog(data, sections, { website: 'https://www.lhv.ee' });
}
