import { parsePercent } from '../_shared/util.js';

export const NORDEA_HOME_URL = 'https://www.nordea.com/en';
export const NORDEA_FI_JOUSTOTALLETUS_URL =
  'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/saastamisen-tilit/joustotalletus.html';
export const NORDEA_FI_SAVINGS_URL =
  'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/saastamisen-tilit/';
export const NORDEA_SE_SPARKONTON_URL = 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/';

/**
 * @param {string} html
 * @returns {Array<{ label: string; rate_percent: number }>}
 */
export function parseNordeaFiJoustotalletusRates(html) {
  /** @type {Array<{ label: string; rate_percent: number }>} */
  const rows = [];
  const seen = new Set();

  const patterns = [
    /<tr><td>([^<]+)<\/td><td><p>([0-9]+[,.][0-9]+)\s*%/g,
    /<tr><td class=""><p>([^<]+)<\/p><\/td><td class=""><p>([0-9]+[,.][0-9]+)\s*%/g,
    /<td[^>]*>([^<]{5,120})<\/td><td[^>]*><p>([0-9]+[,.][0-9]+)\s*%/g
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const label = `FI JoustoTalletus: ${match[1].replace(/\s+/g, ' ').trim()}`;
      const rate = parsePercent(`${match[2]}%`);
      if (rate == null || seen.has(label)) continue;
      seen.add(label);
      rows.push({ label, rate_percent: rate });
    }
  }

  return rows;
}

/**
 * @param {string} html
 * @returns {Array<{ label: string; rate_percent: number }>}
 */
export function parseNordeaSeSparkontonRates(html) {
  /** @type {Array<{ label: string; rate_percent: number }>} */
  const rows = [];

  const extraMatch = html.match(/Sparkonto Extra<\/a> är räntan\s*([0-9]+[,.][0-9]+)/i);
  if (extraMatch) {
    const rate = parsePercent(`${extraMatch[1]}%`);
    if (rate != null) {
      rows.push({ label: 'SE Sparkonto Extra', rate_percent: rate });
    }
  }

  const fixedMatch = html.match(
    /Fasträntekonto<\/a> är räntan\s*([0-9]+[,.][0-9]+)\s*(?:&nbsp;)?%[–-]([0-9]+[,.][0-9]+)/i
  );
  if (fixedMatch) {
    const minRate = parsePercent(`${fixedMatch[1]}%`);
    const maxRate = parsePercent(`${fixedMatch[2]}%`);
    if (minRate != null) {
      rows.push({ label: 'SE Fasträntekonto (min)', rate_percent: minRate });
    }
    if (maxRate != null) {
      rows.push({ label: 'SE Fasträntekonto (max)', rate_percent: maxRate });
    }
  }

  return rows;
}
