import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { makeRow } from '../_shared/util.js';
import {
  fetchLuminorPage,
  findPercent,
  LUMINOR_PAGE_API,
  parseLuminorDepositTable
} from './collect.js';

export const LUMINOR_RATES_URL = 'https://luminor.ee/intressi-ja-viivisemaarad#hoiused';
export const LUMINOR_FEES_URL = 'https://luminor.ee/hinnakiri';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const fetchedAt = new Date().toISOString();
  /** @type {string[]} */
  const warnings = [];
  /** @type {import('../_shared/util.js').RateRow[]} */
  let rows = [];
  const apiUrl = `${LUMINOR_PAGE_API}?alias=%2Fintressi-ja-viivisemaarad&language=et`;

  try {
    const page = await fetchLuminorPage('/intressi-ja-viivisemaarad');
    const table = parseLuminorDepositTable(page);
    if (table) {
      for (const r of table.rows) {
        for (const [cur, rate] of Object.entries(r.rates)) {
          if (cur !== 'EUR' && cur !== 'USD') continue;
          if (!rate) continue;
          rows.push(
            makeRow('luminor', {
              product_type: 'deposit',
              label: `Tähtajaline hoius ${cur} ${r.months} kuud (internetipank)`,
              rate_percent: rate,
              source_url: LUMINOR_RATES_URL,
              raw_text: 'luminor-collect: sisu-API /dc/render/v1/ee/page'
            })
          );
        }
      }
    } else {
      warnings.push('Luminori hoiusetabelit ei leitud sisu-API vastusest');
    }
    const reserve = findPercent(page, /Reservhoiuse intressimäära[\s\S]{0,60}?intressimäär (\d+[,.]\d+)\s*%/i);
    if (reserve != null) {
      rows.push(
        makeRow('luminor', {
          product_type: 'deposit',
          label: 'Reservhoius (nõudmiseni)',
          rate_percent: reserve,
          source_url: LUMINOR_RATES_URL,
          raw_text: 'luminor-collect: sisu-API'
        })
      );
    }
    const bloom = findPercent(page, /Bloom\s+säästukonto intressimäära[\s\S]{0,80}?intressimäär on (\d+[,.]\d+)\s*%/i);
    if (bloom != null) {
      rows.push(
        makeRow('luminor', {
          product_type: 'deposit',
          label: 'Luminor Bloom säästukonto',
          rate_percent: bloom,
          source_url: LUMINOR_RATES_URL,
          raw_text: 'luminor-collect: sisu-API'
        })
      );
    }
  } catch (err) {
    warnings.push(
      `Luminori sisu-API ebaõnnestus (${err instanceof Error ? err.message : err}) — kasutatud minuraha.ee baromeetrit`
    );
  }

  if (!rows.length) rows = await collectMinurahaForBank('luminor');

  rows.push(
    makeRow('luminor', {
      product_type: 'fee',
      label: 'Hinnakiri',
      source_url: LUMINOR_FEES_URL,
      raw_text: 'luminor-collect: hinnakiri link'
    })
  );

  return {
    slug: 'luminor',
    bankName: 'Luminor',
    rows,
    sources: [
      { kind: 'api', url: apiUrl, note: 'Luminori avalik sisu-API (SPA taust)' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: LUMINOR_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings
  };
}
