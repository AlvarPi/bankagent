/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const BIGBANK_CATALOG = [
  {
    title: 'Hoiused',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.bigbank.ee/hoiused/',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €. Minimaalne summa 100 €.',
        rates: ['Kuni 2,75% (veebileht, muutuv)', 'Perioodid: 3–60 kuud']
      },
      {
        name: 'Säästuhoius',
        url: 'https://www.bigbank.ee/saastuhoius/',
        summary: 'Paindlik säästuhoius igakuise sissemaksega. Intress kantakse kord kvartalis.',
        rates: ['Aastane intress: vaata bigbank.ee/saastuhoius']
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.bigbank.ee/kodulaen/',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.bigbank.ee/vaikelaen/',
        summary: 'Tagatiseta isiklik laen 500–15 000 €.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.bigbank.ee/autolaen/',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.bigbank.ee/liising/',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.bigbank.ee/krediidikonto/',
        summary: 'Paindlik krediidikonto.'
      },
      {
        name: 'Refinantseerimine',
        url: 'https://www.bigbank.ee/refinantseerimine/',
        summary: 'Olemasolevate laenude ühendamine.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus',
    items: [
      {
        name: 'Arvelduskonto',
        url: 'https://www.bigbank.ee/arvelduskonto/',
        summary: 'Põhiarvelduskonto internetipangaga.'
      },
      {
        name: 'Kaardid',
        url: 'https://www.bigbank.ee/kaardid/',
        summary: 'Deebet- ja krediitkaardid.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärilaen',
        url: 'https://www.bigbank.ee/arilaen/',
        summary: 'Ettevõtte finantseerimine.'
      },
      {
        name: 'Äriliising',
        url: 'https://www.bigbank.ee/ariliising/',
        summary: 'Ettevõtte liising.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Dokumendid ja hinnakiri',
        url: 'https://www.bigbank.ee/dokumendid/',
        summary: 'Teenuste tingimused, hinnakirjad ja infolehed.'
      },
      {
        name: 'Kontakt',
        url: 'https://www.bigbank.ee/kontakt/',
        summary: 'Kontaktinfo.'
      }
    ]
  }
];
