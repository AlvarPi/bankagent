import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { makeRow } from '../_shared/util.js';
import { fetchHtml } from '../_shared/util.js';
import {
  fetchSebDepositRates,
  parseSebRates,
  SEB_DEPOSIT_CSV_BASE,
  SEB_DEPOSIT_PAGE_URL,
  SEB_FEES_URL,
  SEB_RATES_URL
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(SEB_RATES_URL);
  const parsed = parseSebRates(html);
  const fetchedAt = new Date().toISOString();

  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = parsed.map((row) =>
    makeRow('seb', {
      product_type: row.product_type,
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: SEB_RATES_URL,
      raw_text: 'seb-collect: intressimaarad leht'
    })
  );

  /** @type {string[]} */
  const warnings = [];
  let liveDeposits = 0;
  try {
    for (const d of await fetchSebDepositRates()) {
      rows.push(
        makeRow('seb', {
          product_type: 'deposit',
          label: `Tähtajaline hoius ${d.currency} ${d.term}${d.amountRange ? ` (${d.amountRange} ${d.currency})` : ''}`,
          rate_percent: d.rate,
          source_url: SEB_DEPOSIT_PAGE_URL,
          raw_text: `seb-collect: kalkulaatori CSV ${SEB_DEPOSIT_CSV_BASE}/${d.currency.toLowerCase()}-privi.csv (${d.days} päeva)`
        })
      );
      liveDeposits++;
    }
  } catch (err) {
    warnings.push(`SEB hoiuse CSV ebaõnnestus (${err instanceof Error ? err.message : err})`);
  }
  if (!liveDeposits) {
    warnings.push('SEB tähtajalise hoiuse määrad minuraha.ee baromeetrist');
    rows.push(...(await collectMinurahaForBank('seb')));
  }

  rows.push(
    makeRow('seb', {
      product_type: 'fee',
      label: 'Pangateenuste hinnakiri',
      source_url: SEB_FEES_URL,
      raw_text: 'seb-collect: hinnakiri link'
    })
  );

  return {
    slug: 'seb',
    bankName: 'SEB',
    rows,
    sources: [
      { kind: 'api', url: `${SEB_DEPOSIT_CSV_BASE}/eur-privi.csv`, note: 'tähtajalise hoiuse kalkulaatori CSV (EUR, USD)' },
      { kind: 'primary', url: SEB_RATES_URL, note: 'kogumishoius, arvelduskonto' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: SEB_FEES_URL, note: 'hinnakiri' }
    ],
    fetchedAt,
    warnings: parsed.length === 0 ? [...warnings, 'SEB lehelt intresse ei õnnestunud parsida'] : warnings
  };
}
