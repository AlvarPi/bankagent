import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { makeRow } from '../_shared/util.js';
import {
  MS_ATWORK_BANKING_URL,
  MS_CASH_URL,
  MS_DISCLOSURE_URL,
  MS_MONITOR_URL,
  MS_ETRADE_RATES_URL,
  parseMsComparisonCards,
  parseMsEffectiveDate
} from './collect.js';

const execFileAsync = promisify(execFile);

const MS_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * @param {string} url
 */
async function fetchMsHtml(url) {
  const { stdout } = await execFileAsync(
    'curl',
    ['-sL', '-A', MS_USER_AGENT, '--max-time', '30', url],
    { maxBuffer: 12 * 1024 * 1024, encoding: 'utf8' }
  );
  if (!stdout) throw new Error(`Failed to fetch ${url}`);
  return stdout;
}

export { MS_CASH_URL, MS_MONITOR_URL, MS_DISCLOSURE_URL, MS_ETRADE_RATES_URL, MS_ATWORK_BANKING_URL };

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const [cashHtml, atworkHtml] = await Promise.all([
    fetchMsHtml(MS_CASH_URL),
    fetchMsHtml(MS_ATWORK_BANKING_URL)
  ]);

  const fetchedAt = new Date().toISOString();
  const effective = parseMsEffectiveDate(cashHtml) || parseMsEffectiveDate(atworkHtml);
  const note = effective ? `quoted as of ${effective}` : 'public website';

  /** @type {import('../_shared/util.js').RateRow[]} */
  const rows = [];

  for (const row of parseMsComparisonCards(cashHtml)) {
    rows.push(
      makeRow('morgan-stanley', {
        product_type: 'deposit',
        label: row.label,
        rate_percent: row.rate_percent,
        source_url: MS_CASH_URL,
        raw_text: `ms-collect: ${note}`
      })
    );
  }

  for (const row of parseMsComparisonCards(atworkHtml)) {
    rows.push(
      makeRow('morgan-stanley', {
        product_type: 'deposit',
        label: `E*TRADE ${row.label}`,
        rate_percent: row.rate_percent,
        source_url: MS_ATWORK_BANKING_URL,
        raw_text: `ms-collect: atwork banking, ${note}`
      })
    );
  }

  rows.push(
    makeRow('morgan-stanley', {
      product_type: 'fee',
      label: 'Savings Program Disclosure (PDF)',
      source_url: MS_DISCLOSURE_URL,
      raw_text: 'ms-collect: tiered savings disclosure'
    }),
    makeRow('morgan-stanley', {
      product_type: 'fee',
      label: 'Savings Program Rate Monitor',
      source_url: MS_MONITOR_URL,
      raw_text: 'ms-collect: tiered rates by asset level'
    }),
    makeRow('morgan-stanley', {
      product_type: 'fee',
      label: 'E*TRADE bank rates',
      source_url: MS_ETRADE_RATES_URL,
      raw_text: 'ms-collect: standard bank account rates'
    })
  );

  return {
    slug: 'morgan-stanley',
    bankName: 'Morgan Stanley',
    rows,
    sources: [
      { kind: 'primary', url: MS_CASH_URL, note: 'wealth management cash programs' },
      { kind: 'primary', url: MS_ATWORK_BANKING_URL, note: 'E*TRADE bank accounts' },
      { kind: 'reference', url: MS_MONITOR_URL, note: 'tiered savings monitor' },
      { kind: 'reference', url: MS_DISCLOSURE_URL, note: 'disclosure PDF' },
      { kind: 'reference', url: MS_ETRADE_RATES_URL, note: 'E*TRADE ratesheet' }
    ],
    fetchedAt,
    warnings: [
      'Morgan Stanley intressid sõltuvad kontotüübist ja varade mahust (tiered rates)',
      'Ei ole Eesti pank ega minuraha.ee baromeetris',
      rows.filter((row) => row.rate_percent != null).length === 0
        ? 'Morgan Stanley lehelt intresse ei leitud'
        : ''
    ].filter(Boolean)
  };
}
