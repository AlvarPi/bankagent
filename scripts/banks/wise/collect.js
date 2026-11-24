import { fetchHtml, makeRow, parsePercent } from '../_shared/util.js';

export const WISE_INTEREST_URL = 'https://wise.com/ee/interest/';
export const WISE_FEES_URL = 'https://wise.com/ee/pricing/';

/**
 * @param {string} html
 * @returns {Array<{ label: string, rate_percent: number | null, product_type: 'account' | 'fee' }>}
 */
export function parseWiseRates(html) {
  /** @type {Array<{ label: string; rate_percent: number | null; product_type: 'account' | 'fee' }>} */
  const rows = [];
  const text = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|\u00a0/g, ' ')
    .replace(/\s+/g, ' ');

  // Uus vorm (2026): "2,32% on EUR After 0,26% annual fee"
  for (const cur of ['EUR', 'USD', 'GBP']) {
    const m = text.match(new RegExp(`([0-9]+[,.][0-9]+)\\s*%\\s*on\\s*${cur}\\s*After\\s*([0-9]+[,.][0-9]+)\\s*%\\s*annual fee`, 'i'));
    if (m) {
      rows.push({ label: `Wise Interest ${cur} (muutuv, pärast tasu)`, rate_percent: parsePercent(m[1]), product_type: 'account' });
      rows.push({ label: `Wise Interest ${cur} aastatasu`, rate_percent: parsePercent(m[2]), product_type: 'fee' });
    }
  }
  if (rows.length) return rows;

  // Vana vorm
  const eurRate = html.match(/EUR<\/span>[\s\S]{0,200}?>\s*([0-9]+[,.][0-9]+)\s*%/i);
  if (eurRate) {
    rows.push({ label: 'Wise Interest EUR (muutuv määr)', rate_percent: parsePercent(eurRate[1]), product_type: 'account' });
  }
  if (/0[,.]26\s*%/.test(html)) {
    rows.push({ label: 'Wise Interest aastatasu (ligikaudu)', rate_percent: 0.26, product_type: 'fee' });
  }
  return rows;
}

export const WISE_QUOTE_API = 'https://api.wise.com/v3/quotes';
export const WISE_QUOTE_TARGETS = ['USD', 'GBP', 'SEK', 'PLN', 'NOK'];

/**
 * Wise avalik (autentimata) hinnapäring — näidiskurss ja tasu, mitte tehingu pakkumine.
 * Dokumentatsioon: https://docs.wise.com/guides/product/send-money/quotes/unauthenticated-quote
 * @param {number} [amount]
 * @returns {Promise<Array<{ target: string, rate: number, fee: number, received: number, delivery: string }>>}
 */
export async function fetchWiseQuotes(amount = 1000) {
  const out = [];
  for (const target of WISE_QUOTE_TARGETS) {
    try {
      const res = await fetch(WISE_QUOTE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCurrency: 'EUR', targetCurrency: target, sourceAmount: amount }),
        signal: AbortSignal.timeout(20_000)
      });
      if (!res.ok) continue;
      const d = await res.json();
      const opt = (d.paymentOptions || []).find(
        (o) => !o.disabled && o.payIn === 'BANK_TRANSFER' && o.payOut === 'BANK_TRANSFER'
      );
      if (!opt) continue;
      out.push({
        target,
        rate: d.rate,
        fee: opt.fee?.total,
        received: opt.targetAmount,
        delivery: opt.formattedEstimatedDelivery || ''
      });
    } catch {
      /* üksik valuuta võib ebaõnnestuda — jätame vahele */
    }
  }
  return out;
}
