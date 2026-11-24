import { fetchHtml, makeRow, parsePercent } from './util.js';

/**
 * Kodulaenu tingimused panga avalikult tootelehelt (öine skann).
 *
 * Pankade kodulaenu kalkulaatoritel ei ole hoiuste-sarnast avalikku päringut, seega loeme
 * tootelehe teksti ja võtame välja reklaamitud marginaali, krediidi kulukuse määra näite,
 * lepingutasu jms. Iga muster, mis enam ei klapi, annab hoiatuse — nii on lehe muutus näha.
 *
 * Read on product_type 'loan'; percent-väärtus läheb rate_percent'i, muu tekst sildi sisse.
 */

/**
 * @typedef {Object} MortgagePattern
 * @property {string} label    rea silt (väärtus lisatakse lõppu)
 * @property {RegExp} re       1. grupp = väärtus
 * @property {'percent' | 'text'} [kind]  percent → rate_percent (vaikimisi), text → sildis
 * @property {string} [url]    kui muster on teisel lehel kui panga põhileht
 * @property {boolean} [optional]  kampaania vms — puudumine ei ole hoiatus
 */

/** @type {Record<string, { url: string, patterns: MortgagePattern[] }>} */
export const MORTGAGE_SOURCES = {
  coop: {
    url: 'https://www.cooppank.ee/eraklient/kodu/kodulaen',
    patterns: [
      { label: 'Kodulaen A-energiaklass: intress alates', re: /A-energiaklassiga intress alates (\d+[,.]\d+)\s*%/i },
      { label: 'Kodulaen: laenusumma alates', re: /Laenusumma alates ([\d\s]+\s*€)/i, kind: 'text' },
      { label: 'Kodulaen: tagasimakse tähtaeg kuni', re: /Tagasimakse tähtaeg kuni (\d+ aastat)/i, kind: 'text' },
      { label: 'Kodulaen: omafinantseering alates', re: /omafinantseering alates (\d+)\s*%/i },
      { label: 'Kodulaen KKM näide', re: /Kodulaenu krediidi kulukuse esialgne määr on (\d+[,.]\d+)\s*%/i },
      { label: 'Kodulaen KKM näite marginaal (+ 6 kuu EURIBOR)', re: /EURIBOR \+ marginaal (\d+[,.]\d+)\s*% aastas/i },
      { label: 'Kodulaen KKM näite lepingutasu', re: /näidistingimustel:[^.]{0,120}?lepingutasu ([\d\s]+,\d+ €)/i, kind: 'text' },
      {
        label: 'Kodukaitsja kodulaen: marginaal alates (+ 6 kuu EURIBOR)',
        re: /Marginaal alates (\d+[,.]\d+)\s*%/i,
        url: 'https://www.cooppank.ee/eraklient/kodu/kodukaitsja-kodulaen',
        optional: true
      },
      {
        label: 'Coop Panga baasintress (KPB, vanad laenud)',
        re: /Hetkel on baasintressimäär (\d+[,.]\d+)\s*%/i,
        optional: true
      }
    ]
  },
  lhv: {
    url: 'https://www.lhv.ee/et/kodulaen',
    patterns: [
      {
        label: 'Kodulaen uus A/B-energiaklassi kodu: alates (+ 6 kuu EURIBOR)',
        re: /A- ja B-energiaklassi kodu ostmiseks intress alates (\d+[,.]\d+)\s*%/i
      },
      { label: 'Üürikodu laen: alates (+ 6 kuu EURIBOR)', re: /Üürikodu laen eriintressiga alates (\d+[,.]\d+)\s*%/i },
      { label: 'Laen kinnisvara tagatisel: alates (+ EURIBOR)', re: /Intress on alates (\d+[,.]\d+)\s*% \+ euribor/i, optional: true },
      { label: 'Kodulaen: lepingutasu', re: /Lepingutasu\s+(0,\d+[–-]0,\d+% laenusummast \(minimaalselt \d+ €\))/i, kind: 'text' },
      { label: 'Kodulaen: minimaalne omafinantseering', re: /Minimaalne nõutav omafinantseering on ([\d\s]+ €)/i, kind: 'text' },
      { label: 'Kodulaen: laenusumma', re: /(Alates [\d\s]+ eurost, kuni \d+% tagatise turuväärtusest)/i, kind: 'text' }
    ]
  },
  seb: {
    url: 'https://www.seb.ee/eraklient/laenud/kodulaen',
    patterns: [
      {
        label: 'Kodulaen A/B-energiaklass (kampaania 01.10–31.12.2026): alates (+ EURIBOR)',
        re: /A ja B-energiaklassi objekti ostmiseks[^.]{0,80}?intress alates (\d+[,.]\d+)\s*%/i,
        optional: true
      },
      { label: 'Kodulaen KKM näide', re: /Kodulaenu krediidi kulukuse esialgne määr on (\d+[,.]\d+)\s*%/i },
      { label: 'Kodulaen KKM näite marginaal (+ 6 kuu EURIBOR)', re: /intressimäär aastas\*?\s*(\d+[,.]\d+)\s*% \+ 6 kuu euribor/i },
      { label: 'Kodulaen: omafinantseering alates', re: /Omafinantseering alates (\d+)\s*%/i },
      {
        label: 'Kodulaen: lepingutasu',
        re: /Kodulaen, hüpoteeklaen\s*-\s*lepingu sõlmimine\s*(0,\d+% laenusummast, min \d+ eurot)/i,
        kind: 'text'
      },
      { label: 'Kodulaen: laenusumma', re: /(Alates [\d\s]+ eurot)\./i, kind: 'text' }
    ]
  },
  swedbank: {
    url: 'https://www.swedbank.ee/private/credit/loans/home?language=EST',
    patterns: [
      { label: 'Kodulaen KKM näide', re: /Krediidi kulukuse esialgne määr on (\d+[,.]\d+)\s*% aastas/i },
      { label: 'Kodulaen KKM näite marginaal (+ 6 kuu EURIBOR)', re: /sh marginaal (\d+[,.]\d+)\s*% aastas/i },
      { label: 'Kodulaen: lepingutasu', re: /Lepingutasu\s+(0,\d+% laenusummast, vähemalt \d+ €)/i, kind: 'text' },
      { label: 'Kodulaen: laenusumma alates', re: /Laenusumma alates ([\d\s]+ €)/i, kind: 'text' },
      { label: 'Kodulaen: minimaalne omafinantseering', re: /Minimaalne omafinantseering on (\d+)\s*%/i },
      { label: 'Kodulaen: min netosissetulek', re: /Regulaarne sissetulek vähemalt ([\d\s]+ €) kuus/i, kind: 'text' },
      {
        label: 'Kampaania: laenujääk > 100 000 €',
        re: /(laenujääk on üle 100 000 €, kanname notarikulud Sinu eest ja lepingutasu on 0 €)/i,
        kind: 'text',
        optional: true
      },
      { label: 'EURIBOR 6 kuud (Swedbanki leht)', re: /EURIBOR 6 kuud \((\d+[.,]\d+)%\)/i, optional: true }
    ]
  }
};

/** @param {string} html */
export function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|svg)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;| | /g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&euro;/g, '€')
    .replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ');
}

/**
 * @param {string} slug
 * @returns {Promise<{ rows: import('./util.js').RateRow[], warnings: string[] }>}
 */
export async function collectMortgageTerms(slug) {
  const src = MORTGAGE_SOURCES[slug];
  /** @type {import('./util.js').RateRow[]} */
  const rows = [];
  /** @type {string[]} */
  const warnings = [];
  if (!src) return { rows, warnings };

  /** @type {Map<string, string>} */
  const texts = new Map();
  const getText = async (/** @type {string} */ url) => {
    if (!texts.has(url)) texts.set(url, htmlToText(await fetchHtml(url)));
    return /** @type {string} */ (texts.get(url));
  };

  for (const p of src.patterns) {
    const url = p.url || src.url;
    let text;
    try {
      text = await getText(url);
    } catch (err) {
      warnings.push(`Kodulaen: leht ${url} ebaõnnestus (${err instanceof Error ? err.message : err})`);
      texts.set(url, '');
      continue;
    }
    const m = text.match(p.re);
    if (!m) {
      if (!p.optional) warnings.push(`Kodulaen: „${p.label}” ei leitud lehelt ${url} (leht muutunud?)`);
      continue;
    }
    const value = m[1].replace(/\s+/g, ' ').trim();
    const isPercent = (p.kind ?? 'percent') === 'percent';
    rows.push(
      makeRow(slug, {
        product_type: 'loan',
        label: isPercent ? p.label : `${p.label}: ${value}`,
        rate_percent: isPercent ? parsePercent(value) : null,
        source_url: url,
        raw_text: `mortgage-collect: ${m[0].slice(0, 200)}`
      })
    );
  }
  return { rows, warnings };
}
