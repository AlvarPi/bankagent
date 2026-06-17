/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const IUTECREDIT_CATALOG = [
  {
    title: 'Võlakirjad ja investeerimine',
    items: [
      {
        name: 'IuteCredit võlakiri',
        url: 'https://iute.com/et/volakiri/',
        summary:
          'Avalik võlakirja emissioon. Ei ole traditsiooniline hoiuspank — intress on võlakirja tootlus, mitte pangahoius.',
        rates: ['12% aastas (kogutud andmed, muutuv)', 'Täpne määr: vaata iute.com/et/volakiri'],
        details: [
          'Tagatud Tagatisfondi poolt kuni 100 000 €',
          'Minimaalne investeering: vaata veebilehte',
          'Periood ja tingimused emissiooni kaupa',
          'Ei ole minuraha.ee baromeetris'
        ]
      },
      {
        name: 'Võlakirja tingimused',
        url: 'https://iute.com/et/volakiri/',
        summary: 'Võlakirja emissiooni tingimused, riskid ja infolehed.',
        details: ['PDF dokumendid veebis', 'Riskid: krediidirisk, likviidsusrisk']
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Tarbimislaen',
        url: 'https://iute.com/et/laenud/',
        summary: 'Kiire tarbimislaen veebist või mobiilis.',
        details: ['Taotlus veebis', 'Kiire otsus', 'Summa ja tähtaeg sõltuvad profiilist']
      },
      {
        name: 'Autolaen',
        url: 'https://iute.com/et/autolaen/',
        summary: 'Sõiduki soetamiseks.',
        details: ['Uus ja kasutatud auto', 'Tagatis sõidukil']
      },
      {
        name: 'Kodulaen',
        url: 'https://iute.com/et/kodulaen/',
        summary: 'Kinnisvara tagatisel laen.',
        details: ['Kinnisvara hüpoteek', 'Renoveerimine ja ostmine']
      },
      {
        name: 'Refinantseerimine',
        url: 'https://iute.com/et/refinantseerimine/',
        summary: 'Olemasolevate laenude ühendamine.',
        details: ['Vähendab kogukulu', 'Üks kuumakse']
      },
      {
        name: 'Laen kinnisvara tagatisel',
        url: 'https://iute.com/et/laenud/',
        summary: 'Laen kinnisvara tagatisel ilma ostuta.',
        details: ['Käibekapital', 'Investeeringud']
      }
    ]
  },
  {
    title: 'Makseviisid ja kaardid',
    items: [
      {
        name: 'Järelmaks',
        url: 'https://iute.com/et/jarelmaks/',
        summary: 'Järelmaks kauplustes ja e-poodides.',
        details: [
          'Partnerkaupluste võrgustik',
          'Osta nüüd, maksa hiljem',
          'Tingimused sõltuvad kauplusest'
        ]
      },
      {
        name: 'Krediitkaart',
        url: 'https://iute.com/et/krediitkaart/',
        summary: 'IuteCredit krediitkaart.',
        details: ['Krediidilimiit', 'Grace period', 'Partnerpakkumised']
      },
      {
        name: 'Mobiilirakendus',
        url: 'https://iute.com/et/',
        summary: 'IuteCredit mobiilirakendus laenude ja maksete haldamiseks.',
        details: ['Laenu taotlus', 'Maksete jälgimine']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärilaenud',
        url: 'https://iute.com/et/ariklient/',
        summary: 'Ettevõtte finantseerimine ja käibekapital.',
        details: ['Väikeettevõtetele', 'Kiire otsus']
      },
      {
        name: 'Järelmaks kaupmeestele',
        url: 'https://iute.com/et/ariklient/',
        summary: 'Järelmaksulahendus e-poodidele ja kauplustele.',
        details: ['Suurendab müüki', 'IuteCredit võtab krediidiriski']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'IuteCredit koduleht',
        url: 'https://iute.com/et/',
        summary: 'Pealeht ja teenuste ülevaade.',
        details: ['Eesti, Läti, Leedu teenused']
      },
      {
        name: 'Kontakt',
        url: 'https://iute.com/et/kontakt/',
        summary: 'Klienditugi ja kontaktinfo.'
      },
      {
        name: 'Märkused võlakirja kohta',
        url: 'https://iute.com/et/volakiri/',
        summary: 'Ei ole minuraha.ee baromeetris. Võlakirja intress ≠ hoiuse intress.',
        details: ['Krediidiasutus, mitte täispank', 'Võlakiri on võlakohustus, mitte hoius']
      }
    ]
  }
];
