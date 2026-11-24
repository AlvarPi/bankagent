import { USER_AGENT } from '../_shared/util.js';

/**
 * Luminor.ee on SPA, kuid sisu tuleb avalikust (autentimata) sisu-API-st:
 *   GET https://luminor.ee/dc/render/v1/ee/page?alias=/<leht>&language=et
 * Leitud 24.11.2026 brauseri võrguliiklusest. API tagastab lehe vidinad JSON-ina (HTML stringidena).
 * Aeg-ajalt tuleb HTTP 500 — seepärast korduskatse.
 */
export const LUMINOR_PAGE_API = 'https://luminor.ee/dc/render/v1/ee/page';

/**
 * @param {string} alias nt '/intressi-ja-viivisemaarad'
 * @returns {Promise<any>}
 */
export async function fetchLuminorPage(alias) {
  const url = `${LUMINOR_PAGE_API}?alias=${encodeURIComponent(alias)}&language=et`;
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
        signal: AbortSignal.timeout(30_000)
      });
      if (res.ok) return await res.json();
      lastErr = new Error(`HTTP ${res.status} for ${url}`);
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  throw lastErr;
}

/** @param {any} node @param {string[]} out */
function collectStrings(node, out) {
  if (typeof node === 'string') out.push(node);
  else if (Array.isArray(node)) node.forEach((n) => collectStrings(n, out));
  else if (node && typeof node === 'object') Object.values(node).forEach((n) => collectStrings(n, out));
}

/** @param {string} s */
const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;| | /g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Parsib "Internetipangas kehtivad intressimäärad" tabeli (periood kuudes × valuuta).
 * @param {any} pageJson
 * @returns {{ currencies: string[], rows: Array<{ months: number, rates: Record<string, number> }> } | null}
 */
export function parseLuminorDepositTable(pageJson) {
  /** @type {string[]} */
  const strings = [];
  collectStrings(pageJson, strings);
  const html = strings.join('\n');
  const start = html.indexOf('Internetipangas kehtivad');
  if (start < 0) return null;
  const tableStart = html.indexOf('<table', start);
  const tableEnd = html.indexOf('</table>', tableStart);
  if (tableStart < 0 || tableEnd < 0) return null;
  const table = html.slice(tableStart, tableEnd);
  const trs = table.split(/<\/tr>/i).map((tr) =>
    [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => stripTags(m[1]))
  );
  const header = trs.find((cells) => cells.some((c) => /periood/i.test(c)));
  if (!header) return null;
  const currencies = header.slice(1).filter(Boolean);
  const rows = [];
  for (const cells of trs) {
    const months = Number(cells[0]);
    if (!Number.isFinite(months) || months <= 0) continue;
    /** @type {Record<string, number>} */
    const rates = {};
    currencies.forEach((cur, i) => {
      const v = Number(String(cells[i + 1] ?? '').replace(',', '.'));
      if (Number.isFinite(v)) rates[cur] = v;
    });
    rows.push({ months, rates });
  }
  return rows.length ? { currencies, rows } : null;
}

/**
 * Lihtne "Hetkel on intressimäär X%" tüüpi lausete lugeja.
 * @param {any} pageJson
 * @param {RegExp} re peab sisaldama ühte gruppi protsendi jaoks
 */
export function findPercent(pageJson, re) {
  /** @type {string[]} */
  const strings = [];
  collectStrings(pageJson, strings);
  const text = stripTags(strings.join(' '));
  const m = text.match(re);
  return m ? Number(m[1].replace(',', '.')) : null;
}
