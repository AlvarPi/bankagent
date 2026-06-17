import { fetchHtml, makeRow, parsePercent } from './util.js';

export const MINURAHA_URL =
  'https://www.minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter';

/** @type {Record<string, string>} */
const BANK_MATCH = {
  lhv: 'AS LHV Pank',
  seb: 'AS SEB Pank',
  coop: 'Coop Pank AS',
  luminor: 'Luminor Bank AS',
  citadele: 'AS Citadele banka Eesti filiaal',
  swedbank: 'Swedbank AS',
  holm: 'Holm Bank AS',
  bigbank: 'Bigbank AS'
};

/**
 * @param {string} html
 * @returns {Array<{ title: string, body: string }>}
 */
function parseSections(html) {
  /** @type {Array<{ title: string, body: string }>} */
  const sections = [];

  for (const match of html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>([\s\S]*?)(?=<h4|$)/g)) {
    sections.push({
      title: match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      body: match[2]
    });
  }

  return sections;
}

/**
 * @param {string} html
 */
function cleanCell(html) {
  return html
    .replace(/<\/p>\s*<p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

/**
 * @param {string} body
 * @returns {Array<string[]>}
 */
function parseTableRows(body) {
  /** @type {Array<string[]>} */
  const rows = [];

  for (const match of body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
    const cells = [...match[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) =>
      cleanCell(cell[1])
    );
    if (cells.length) rows.push(cells);
  }

  return rows;
}

/**
 * @param {string} slug
 * @param {string} html
 * @returns {import('./util.js').RateRow[]}
 */
export function parseMinurahaForBank(slug, html) {
  const bankName = BANK_MATCH[slug];
  if (!bankName) return [];

  /** @type {import('./util.js').RateRow[]} */
  const rows = [];

  for (const [sectionPrefix, productType, labelPrefix] of [
    ['Tähtajaline hoius', 'deposit', 'Tähtajaline hoius 12 kuu (baromeeter)'],
    ['Nõudmiseni hoius', 'account', 'Arvelduskonto (baromeeter)']
  ]) {
    const section = parseSections(html).find((item) => item.title.startsWith(sectionPrefix));
    if (!section) continue;

    const bankRow = parseTableRows(section.body).find((cells) => cells[0]?.includes(bankName));
    if (!bankRow) continue;

    const rates = bankRow[1]
      .split('\n')
      .map((part) => part.trim())
      .filter((part) => part.includes('%'));
    const tiers = bankRow[2]
      .split('\n')
      .map((part) => part.trim())
      .filter(Boolean);
    const minAmount = tiers[0] || bankRow[2]?.replace(/\s+/g, ' ').trim();
    const updated = bankRow[4] || '';

    if (rates.length === 1) {
      rows.push(
        makeRow(slug, {
          product_type: /** @type {'deposit' | 'account'} */ (productType),
          label: `${labelPrefix}, min ${minAmount} €`,
          rate_percent: parsePercent(rates[0]),
          source_url: MINURAHA_URL,
          raw_text: `minuraha: uuendatud ${updated}`
        })
      );
      continue;
    }

    rates.forEach((rate, index) => {
      const tier = tiers[index] || `tier ${index + 1}`;
      rows.push(
        makeRow(slug, {
          product_type: /** @type {'deposit' | 'account'} */ (productType),
          label: `${labelPrefix} (${tier})`,
          rate_percent: parsePercent(rate),
          source_url: MINURAHA_URL,
          raw_text: `minuraha: uuendatud ${updated}`
        })
      );
    });
  }

  return rows;
}

let cachedHtml = null;

/**
 * @param {string} slug
 */
export async function collectMinurahaForBank(slug) {
  if (!cachedHtml) {
    cachedHtml = await fetchHtml(MINURAHA_URL);
  }
  return parseMinurahaForBank(slug, cachedHtml);
}
