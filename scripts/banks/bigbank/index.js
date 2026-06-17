import { collectMinurahaForBank } from '../_shared/minuraha.js';
import { fetchHtml, makeRow } from '../_shared/util.js';
import {
  BIGBANK_FEES_URL,
  BIGBANK_SAVINGS_URL,
  BIGBANK_TERM_URL,
  parseBigbankSavings,
  parseBigbankTermDeposit
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const [termHtml, savingsHtml] = await Promise.all([
    fetchHtml(BIGBANK_TERM_URL),
    fetchHtml(BIGBANK_SAVINGS_URL)
  ]);

  const fetchedAt = new Date().toISOString();
  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = [];

  const term = parseBigbankTermDeposit(termHtml);
  if (term) {
    rows.push(
      makeRow('bigbank', {
        product_type: 'deposit',
        label: term.label,
        rate_percent: term.rate_percent,
        source_url: BIGBANK_TERM_URL,
        raw_text: 'bigbank-collect: tähtajaline hoius leht'
      })
    );
  }

  const savings = parseBigbankSavings(savingsHtml);
  if (savings) {
    rows.push(
      makeRow('bigbank', {
        product_type: 'deposit',
        label: savings.label,
        rate_percent: savings.rate_percent,
        source_url: BIGBANK_SAVINGS_URL,
        raw_text: 'bigbank-collect: säästuhoius leht'
      })
    );
  }

  rows.push(...(await collectMinurahaForBank('bigbank')));

  rows.push(
    makeRow('bigbank', {
      product_type: 'fee',
      label: 'Teenuste hinnakiri / dokumendid',
      source_url: BIGBANK_FEES_URL,
      raw_text: 'bigbank-collect: dokumendid leht'
    })
  );

  return {
    slug: 'bigbank',
    bankName: 'Bigbank',
    rows,
    sources: [
      { kind: 'primary', url: BIGBANK_TERM_URL, note: 'tähtajaline hoius' },
      { kind: 'primary', url: BIGBANK_SAVINGS_URL, note: 'säästuhoius' },
      { kind: 'fallback', url: 'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter', note: 'FI baromeeter' },
      { kind: 'reference', url: BIGBANK_FEES_URL, note: 'hinnakiri / dokumendid' }
    ],
    fetchedAt,
    warnings: rows.filter((row) => row.rate_percent != null).length === 0
      ? ['Bigbank lehelt intresse ei leitud']
      : []
  };
}
