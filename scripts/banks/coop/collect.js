export const COOP_RATES_URL =
  'https://www.cooppank.ee/eraklient/raha-kasvatamine/hoiuste-intressid';

export const COOP_FEES_URL = 'https://www.cooppank.ee/info/tingimused-ja-hinnakirjad';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number }>}
 */
export function parseCoopDepositRates(html) {
  /** @type {Array<{ label: string, rate_percent: number }>} */
  const rows = [];

  const termRe =
    /table-cell--align-start">([^<]+(?:<!-- -->[^<]+)*)<\/td><td[^>]*>([0-9]+),([0-9]+)<!-- -->%/g;
  let match;
  while ((match = termRe.exec(html)) !== null) {
    const period = match[1].replace(/<!-- -->/g, '').replace(/\s+/g, ' ').trim();
    rows.push({
      label: `Tähtajaline hoius ${period}`,
      rate_percent: Number(`${match[2]}.${match[3]}`)
    });
  }

  for (const product of ['Rahasahtel', 'Lastehoius']) {
    const sectionRe = new RegExp(
      `<h1[^>]*>${product}</h1>[\\s\\S]*?<span>([0-9]+),([0-9]+)%</span>\\s*päevajäägilt`,
      'i'
    );
    const section = html.match(sectionRe);
    if (section) {
      rows.push({
        label: `${product} (päevajääk)`,
        rate_percent: Number(`${section[1]}.${section[2]}`)
      });
    }
  }

  return rows;
}

/**
 * @returns {Promise<{
 *   rows: import('../_shared/util.js').RateRow[],
 *   validFrom: string | null,
 *   fetchedAt: string
 * }>}
 */
export async function collectCoopRates() {
  const { fetchHtml, makeRow } = await import('../_shared/util.js');
  const html = await fetchHtml(COOP_RATES_URL);
  const parsed = parseCoopDepositRates(html);

  if (parsed.length === 0) {
    throw new Error('Coop parse returned no rates — page structure may have changed');
  }

  const validFromMatch = html.match(/kehtivad alates\s+([0-9.]+)/i);
  const validFrom = validFromMatch ? validFromMatch[1] : null;
  const note = validFrom ? `kehtivad alates ${validFrom}` : 'parsed from public page';

  return {
    rows: parsed.map((row) =>
      makeRow('coop', {
        product_type: 'deposit',
        label: row.label,
        rate_percent: row.rate_percent,
        source_url: COOP_RATES_URL,
        raw_text: `coop-collect: ${note}`
      })
    ),
    validFrom,
    fetchedAt: new Date().toISOString()
  };
}
