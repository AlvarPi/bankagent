/**
 * @typedef {Object} RateRow
 * @property {string} slug
 * @property {'deposit' | 'fee' | 'account'} product_type
 * @property {string} label
 * @property {number | null} [rate_percent]
 * @property {number | null} [fee_cents]
 * @property {string} source_url
 * @property {string} [raw_text]
 */

/**
 * @typedef {Object} CollectResult
 * @property {string} slug
 * @property {string} bankName
 * @property {RateRow[]} rows
 * @property {Array<{ kind: string, url: string, note: string }>} sources
 * @property {string} fetchedAt
 * @property {string[]} warnings
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export const USER_AGENT =
  'Mozilla/5.0 (compatible; pankade-teenused-collector/0.1; +https://localhost)';

/**
 * @param {string} url
 */
async function fetchHtmlWithCurl(url) {
  const { stdout } = await execFileAsync(
    'curl',
    ['-sL', '-A', USER_AGENT, '--max-time', '30', url],
    { maxBuffer: 12 * 1024 * 1024, encoding: 'utf8' }
  );
  return stdout;
}

/**
 * @param {string} url
 */
export async function fetchHtml(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'et' },
      signal: AbortSignal.timeout(30_000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response.text();
  } catch {
    const html = await fetchHtmlWithCurl(url);
    if (!html) throw new Error(`Failed to fetch ${url}`);
    return html;
  }
}

/**
 * @param {string} value
 */
export function parsePercent(value) {
  const normalized = value.replace('%', '').trim().replace(',', '.');
  const num = Number(normalized);
  return Number.isFinite(num) ? num : null;
}

/**
 * @param {string} value
 */
export function parseEuroFeeToCents(value) {
  const text = value.toLowerCase().replace('€', '').trim();
  if (!text || text.includes('tasuta')) return 0;
  const match = text.match(/([0-9]+(?:[,.][0-9]+)?)/);
  if (!match) return null;
  return Math.round(parsePercent(match[1]) * 100);
}

/**
 * @param {string} slug
 * @param {Partial<RateRow> & Pick<RateRow, 'product_type' | 'label' | 'source_url'>} row
 * @returns {RateRow}
 */
export function makeRow(slug, row) {
  return {
    slug,
    rate_percent: row.rate_percent ?? null,
    fee_cents: row.fee_cents ?? null,
    raw_text: row.raw_text ?? '',
    ...row
  };
}
