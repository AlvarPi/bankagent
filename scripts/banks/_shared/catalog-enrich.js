/** @typedef {{ name: string, summary?: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/**
 * @param {number | null | undefined} cents
 */
function formatFee(cents) {
  if (cents == null) return null;
  if (cents === 0) return 'tasuta';
  return `${(cents / 100).toFixed(2)} €`;
}

/**
 * @param {import('./util.js').RateRow} row
 */
function formatRateLine(row) {
  const parts = [];
  if (row.rate_percent != null) parts.push(`${row.rate_percent}%`);
  const fee = formatFee(row.fee_cents);
  if (fee) parts.push(`tasu ${fee}`);
  const value = parts.length ? parts.join(', ') : 'vaata allikat';
  return `${row.label}: ${value} (${row.source_url})`;
}

/**
 * @param {string} text
 * @param {string[]} keywords
 */
function textMatches(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

/**
 * @param {CatalogItem} item
 * @param {import('./util.js').RateRow} row
 */
function rateMatchesItem(item, row) {
  const haystack = `${item.name} ${item.summary ?? ''}`.toLowerCase();
  const needle = row.label.toLowerCase();

  const rules = [
    {
      itemKeys: ['tähtajaline'],
      rowKeys: ['tähtajaline', '12 kuu', 'kuni']
    },
    {
      itemKeys: ['kogumi', 'kogumis', 'digikassa'],
      rowKeys: ['kogumi', 'digikassa']
    },
    {
      itemKeys: ['säästu', 'rahasahtel', 'lastehoius'],
      rowKeys: ['säästu', 'rahasahtel', 'lastehoius']
    },
    {
      itemKeys: ['arveldus', 'konto intress', 'nõudmiseni'],
      rowKeys: ['arveldus', 'eur', 'nõudmiseni']
    },
    {
      itemKeys: ['baromeeter'],
      rowKeys: ['baromeeter']
    },
    {
      itemKeys: ['pakett', 'põhipakett', 'optimaalne', 'premium', 'kasulik', 'piirideta', 'lihtne'],
      rowKeys: ['pakett', 'kuutasu', 'hinnakiri']
    },
    {
      itemKeys: ['võlakiri'],
      rowKeys: ['võlakiri']
    },
    {
      itemKeys: ['interest', 'intress'],
      rowKeys: ['interest', 'intress']
    },
    {
      itemKeys: ['hinnakiri', 'tingimused', 'tasud'],
      rowKeys: ['hinnakiri', 'dokumendid', 'tasude']
    }
  ];

  for (const { itemKeys, rowKeys } of rules) {
    if (textMatches(haystack, itemKeys) && textMatches(needle, rowKeys)) {
      return true;
    }
  }

  const itemWords = item.name
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 5 && !['hoius', 'konto', 'laen', 'kindlustus'].includes(w));
  return itemWords.some((word) => needle.includes(word));
}

/**
 * Ühenda kogutud intressi/tasude read kataloogi üksustega.
 * @param {CatalogSection[]} sections
 * @param {import('./util.js').RateRow[]} rows
 * @returns {CatalogSection[]}
 */
export function enrichCatalogWithRates(sections, rows) {
  if (!rows.length) return sections;

  return sections.map((section) => ({
    ...section,
    items: (section.items ?? []).map((item) => {
      const existing = new Set(item.rates ?? []);
      /** @type {string[]} */
      const added = [];

      for (const row of rows) {
        if (!rateMatchesItem(item, row)) continue;
        const line = formatRateLine(row);
        if (!existing.has(line) && !added.includes(line)) {
          added.push(line);
        }
      }

      if (!added.length) return item;
      return { ...item, rates: [...(item.rates ?? []), ...added] };
    })
  }));
}
