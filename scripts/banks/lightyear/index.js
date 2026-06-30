import { fetchHtml, makeRow } from '../_shared/util.js';
import {
  parseLightyearRates,
  LIGHTYEAR_URL,
  LIGHTYEAR_VAULTS_URL,
  LIGHTYEAR_PRICING_URL
} from './collect.js';

/**
 * @returns {Promise<import('../_shared/util.js').CollectResult>}
 */
export async function collect() {
  const html = await fetchHtml(LIGHTYEAR_URL);
  const parsed = parseLightyearRates(html);
  const fetchedAt = new Date().toISOString();

  const rows = parsed.map((row) =>
    makeRow('lightyear', {
      product_type: row.product_type,
      label: row.label,
      rate_percent: row.rate_percent,
      source_url: LIGHTYEAR_VAULTS_URL,
      raw_text: 'lightyear-collect: Kasvukonto intress (rahaturufondi kaudu, mitte pangahoius)'
    })
  );

  rows.push(
    makeRow('lightyear', {
      product_type: 'fee',
      label: 'Valuutavahetus (FX)',
      rate_percent: 0.35,
      source_url: LIGHTYEAR_PRICING_URL,
      raw_text: 'lightyear-collect: FX 0,35% (pricing leht)'
    })
  );

  return {
    slug: 'lightyear',
    bankName: 'Lightyear',
    rows,
    sources: [
      { kind: 'primary', url: LIGHTYEAR_VAULTS_URL, note: 'Kasvukonto / intress' },
      { kind: 'reference', url: LIGHTYEAR_PRICING_URL, note: 'tasud' },
      { kind: 'reference', url: LIGHTYEAR_URL, note: 'avaleht' }
    ],
    fetchedAt,
    warnings: [
      'Lightyear (Lightyear Europe AS) on investeerimisühing, MITTE pank — intress tuleb rahaturufondi (AAA) kaudu, mitte pangahoiusena',
      'Eesti Finantsinspektsiooni litsents (4.1-1/31 investeerimisteenused, 4.1-1/147 krüpto)',
      'Investorikaitse kuni 20 000 € (EL skeem); kapital on riskis, tootlus ei ole garanteeritud',
      'Ei ole minuraha.ee hoiusebaromeetris'
    ]
  };
}
