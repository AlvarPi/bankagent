/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const IUTECREDIT_CATALOG = [
  {
    title: 'Võlakirjad',
    items: [
      {
        name: 'IuteCredit võlakiri',
        url: 'https://iute.com/et/volakiri/',
        summary:
          'Avalik võlakirja emissioon. Ei ole traditsiooniline hoiuspank — intress on võlakirja tootlus, mitte pangahoius.',
        rates: ['Intress: vaata iute.com/et/volakiri (muutuv)'],
        details: ['Tagatud Tagatisfondi poolt kuni 100 000 €', 'Minimaalne investeering: vaata veebilehte']
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Tarbimislaen',
        url: 'https://iute.com/et/laenud/',
        summary: 'Kiire tarbimislaen veebist.'
      },
      {
        name: 'Autolaen',
        url: 'https://iute.com/et/autolaen/',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Kodulaen',
        url: 'https://iute.com/et/kodulaen/',
        summary: 'Kinnisvara tagatisel laen.'
      },
      {
        name: 'Refinantseerimine',
        url: 'https://iute.com/et/refinantseerimine/',
        summary: 'Olemasolevate laenude ühendamine.'
      }
    ]
  },
  {
    title: 'Makseviisid',
    items: [
      {
        name: 'Järelmaks',
        url: 'https://iute.com/et/jarelmaks/',
        summary: 'Järelmaks kauplustes ja e-poodides.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://iute.com/et/krediitkaart/',
        summary: 'IuteCredit krediitkaart.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'IuteCredit koduleht',
        url: 'https://iute.com/et/',
        summary: 'Pealeht ja teenuste ülevaade.'
      },
      {
        name: 'Märkused',
        url: 'https://iute.com/et/volakiri/',
        summary: 'Ei ole minuraha.ee baromeetris. Võlakirja intress ≠ hoiuse intress.'
      }
    ]
  }
];
