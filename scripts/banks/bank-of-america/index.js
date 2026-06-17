import { execFile } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { makeRow, USER_AGENT } from '../_shared/util.js';
import {
  parseBoaEffectiveDate,
  parseBoaPdfText,
  parseBoaRegionLabel
} from './collect.js';

const execFileAsync = promisify(execFile);

export const BOA_RATES_URL = 'https://www.bankofamerica.com/deposits/bank-account-interest-rates/';
export const BOA_FEES_URL =
  'https://www.bankofamerica.com/deposits/resources/personal-schedule-fees.go?request_locale=en_US';

const DEFAULT_REGION = process.env.BOA_RATE_REGION || 'NY_NY_Tri_State_Area';

/**
 * @param {string} region
 */
export function boaRateSheetUrl(region = DEFAULT_REGION) {
  return `https://media.bac-assets.com/DigitalDeposit_${region}.pdf`;
}

/**
 * @param {string} url
 */
async function fetchPdfText(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const tmpPath = join(tmpdir(), `boa-rates-${Date.now()}.pdf`);
  await writeFile(tmpPath, buffer);

  try {
    const { stdout } = await execFileAsync('pdftotext', [tmpPath, '-'], {
      maxBuffer: 12 * 1024 * 1024,
      encoding: 'utf8'
    });
    return stdout;
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const region = DEFAULT_REGION;
  const sheetUrl = boaRateSheetUrl(region);
  const text = await fetchPdfText(sheetUrl);
  const regionLabel = parseBoaRegionLabel(text) || region.replaceAll('_', ' ');
  const effective = parseBoaEffectiveDate(text);
  const parsed = parseBoaPdfText(text, regionLabel);
  const fetchedAt = new Date().toISOString();

  if (parsed.length === 0) {
    throw new Error('Bank of America PDF parse returned no rates');
  }

  const note = effective ? `effective ${effective}, region ${regionLabel}` : `region ${regionLabel}`;

  const rows = parsed.map((row) =>
    makeRow('bank-of-america', {
      product_type: 'deposit',
      label: row.tier ? `${row.label}, ${row.tier}` : row.label,
      rate_percent: row.rate_percent,
      source_url: sheetUrl,
      raw_text: `boa-collect: ${note}`
    })
  );

  rows.push(
    makeRow('bank-of-america', {
      product_type: 'fee',
      label: 'Personal Schedule of Fees (PDF)',
      source_url: BOA_FEES_URL,
      raw_text: 'boa-collect: fees PDF link'
    })
  );

  return {
    slug: 'bank-of-america',
    bankName: 'Bank of America',
    rows,
    sources: [
      { kind: 'primary', url: sheetUrl, note: `regional rate sheet (${region})` },
      { kind: 'reference', url: BOA_RATES_URL, note: 'ZIP-based rates portal' },
      { kind: 'reference', url: BOA_FEES_URL, note: 'fees PDF' }
    ],
    fetchedAt,
    warnings: [
      'Intressid sõltuvad USA piirkonnast (vaikimisi NY Tri-State). Määra BOA_RATE_REGION env muu piirkonna jaoks.',
      'Ei ole Eesti pank ega minuraha.ee baromeetris'
    ]
  };
}
