import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { fetchHtml, makeRow } from '../_shared/util.js';
import { collectMortgageTerms, MORTGAGE_SOURCES } from '../_shared/mortgage.js';
import {
  fetchSwedbankDepositRates,
  parseSwedbankRates,
  SWED_DEPOSIT_CALC_URL,
  SWED_DEPOSIT_PAGE_URL,
  SWED_DEPOSIT_RATES_URL,
  SWED_INTERESTS_URL
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(SWED_DEPOSIT_RATES_URL);
  const rows = parseSwedbankRates(html);
  /** @type {string[]} */
  const warnings = [];

  let liveDeposits = 0;
  try {
    for (const d of await fetchSwedbankDepositRates()) {
      rows.push(
        makeRow('swedbank', {
          product_type: 'deposit',
          label: `Tähtajaline hoius ${d.currency} ${d.months} ${d.months === 1 ? 'kuu' : 'kuud'}`,
          rate_percent: d.rate,
          source_url: SWED_DEPOSIT_PAGE_URL,
          raw_text: 'swedbank-collect: hoiusekalkulaatori JSON (depositType 20, intress perioodi lõpus, 1000)'
        })
      );
      liveDeposits++;
    }
  } catch (err) {
    warnings.push(`Swedbanki hoiusekalkulaator ebaõnnestus (${err instanceof Error ? err.message : err})`);
  }
  if (!liveDeposits) {
    warnings.push('Swedbanki tähtajalise hoiuse määrad minuraha.ee baromeetrist');
    rows.push(...(await collectMinurahaForBank('swedbank')));
  }

  const mortgage = await collectMortgageTerms('swedbank');
  rows.push(...mortgage.rows);
  warnings.push(...mortgage.warnings);

  const fetchedAt = new Date().toISOString();

  if (!rows.some((row) => row.label === 'Arvelduskonto EUR')) {
    warnings.push('Swedbank arvelduskonto intressi ei leitud depositrates lehelt');
  }

  return {
    slug: 'swedbank',
    bankName: 'Swedbank',
    rows,
    sources: [
      { kind: 'api', url: SWED_DEPOSIT_CALC_URL, note: 'hoiusekalkulaatori JSON (EUR, USD)' },
      { kind: 'primary', url: SWED_DEPOSIT_RATES_URL, note: 'arvelduskonto & paketid' },
      { kind: 'primary', url: MORTGAGE_SOURCES.swedbank.url, note: 'kodulaenu tingimused (lehe tekst)' },
      { kind: 'reference', url: SWED_INTERESTS_URL, note: 'intressimäärad (JS leht)' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' }
    ],
    fetchedAt,
    warnings
  };
}
