/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const HOLM_CATALOG = [
  {
    title: 'Hoiused',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.holmbank.ee/et/eraklient/hoius',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €. Minimaalne summa 100 €.',
        rates: ['Intress kuni ~2,75% (veebileht, muutuv)', 'Perioodid: 3–60 kuud']
      },
      {
        name: 'Hoiustaja teabeleht',
        url: 'https://content.holmbank.ee/content/uploads/2026/01/15113155/Hoiustaja-teabeleht-EST_2026.pdf',
        summary: 'Hoiustaja infoleht tingimuste ja riskide kohta (PDF).'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.holmbank.ee/et/eraklient/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.holmbank.ee/et/eraklient/vaikelaen',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.holmbank.ee/et/eraklient/autolaen',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.holmbank.ee/et/eraklient/liising',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.holmbank.ee/et/eraklient/krediidikonto',
        summary: 'Paindlik krediidikonto.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus',
    items: [
      {
        name: 'Arvelduskonto',
        url: 'https://www.holmbank.ee/et/eraklient/arvelduskonto',
        summary: 'Põhiarvelduskonto interneti- ja mobiilipangaga.'
      },
      {
        name: 'Kaardid',
        url: 'https://www.holmbank.ee/et/eraklient/kaardid',
        summary: 'Deebet- ja krediitkaardid.'
      },
      {
        name: 'Maksed',
        url: 'https://www.holmbank.ee/et/eraklient/maksed',
        summary: 'SEPA maksed ja ülekanded.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.holmbank.ee/et/ariklient',
        summary: 'Ettevõtte arveldus ja teenused.'
      },
      {
        name: 'Ärilaen',
        url: 'https://www.holmbank.ee/et/ariklient/arilaen',
        summary: 'Ettevõtte finantseerimine.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://www.holmbank.ee/et/eraklient/hinnakiri',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri.'
      },
      {
        name: 'Kontakt',
        url: 'https://www.holmbank.ee/et/kontakt',
        summary: 'Kontaktinfo ja pangakontorid.'
      }
    ]
  }
];
