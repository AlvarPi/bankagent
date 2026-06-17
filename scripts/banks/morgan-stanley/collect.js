/**
 * @param {string} html
 * @returns {Array<{ label: string; rate_percent: number }>}
 */
export const MS_CASH_URL =
  'https://www.morganstanley.com/what-we-do/wealth-management/cash-management-solutions';
export const MS_ATWORK_BANKING_URL =
  'https://www.morganstanley.com/atwork/employees/explore-more/banking';
export const MS_MONITOR_URL = 'https://www.morganstanley.com/wealth-general/savingsratemonitor';
export const MS_DISCLOSURE_URL =
  'https://www.morganstanley.com/wealth-investmentstrategies/pdf/Morgan-Stanley-Savings-Program-Disclosure-Statement.pdf';
export const MS_ETRADE_RATES_URL = 'https://us.etrade.com/bank/bank-rates?vanity=ratesheet';

/**
 * @param {string} html
 * @returns {Array<{ label: string; rate_percent: number }>}
 */
export function parseMsComparisonCards(html) {
  /** @type {Array<{ label: string; rate_percent: number }>} */
  const rows = [];
  const seen = new Set();

  for (const match of html.matchAll(
    /comparisoncard__title[^>]*>([^<]+)<\/div>([\s\S]*?)(?=comparisoncard__title|<\/section>|$)/gi
  )) {
    const title = match[1].replace(/\s+/g, ' ').trim();
    const body = match[2];
    const rateMatch = body.match(/([0-9]+\.[0-9]+)\s*%\s*(?:APY|Annual Percentage Yield)/i);
    if (!title || !rateMatch) continue;

    const rate = Number(rateMatch[1]);
    if (!Number.isFinite(rate)) continue;

    const upTo = /up to/i.test(body);
    const label = upTo ? `${title} (kuni)` : title;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    rows.push({ label, rate_percent: rate });
  }

  return rows;
}

/**
 * @param {string} html
 */
export function parseMsEffectiveDate(html) {
  return html.match(/quoted as of\s*([0-9/]+)/i)?.[1]?.trim() || null;
}
