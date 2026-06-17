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
        rates: [
          'Kuni 3,00% aastas (veebileht, muutuv)',
          '12 kuu baromeeter: ~2,75% (min 100 €, minuraha)',
          'Perioodid: 3–60 kuud'
        ],
        details: [
          'Intress makstakse tähtaja lõpus või igakuiselt',
          'Ennetähtaegne lõpetamine võimalik tingimustel',
          'Avamine internetipangas või kontoris'
        ]
      },
      {
        name: 'Hoiustaja teabeleht',
        url: 'https://content.holmbank.ee/content/uploads/2026/01/15113155/Hoiustaja-teabeleht-EST_2026.pdf',
        summary: 'Hoiustaja infoleht tingimuste, riskide ja intresside kohta (PDF).',
        details: ['Kehtivad tingimused ja riskid', 'Tagatisfondi info']
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.holmbank.ee/et/eraklient/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine, refinantseerimine.',
        rates: ['Intressimarginaal sõltub profiilist (vaata holmbank.ee)'],
        details: ['Kuni 30 aastat', 'Kiire eelotsus', 'Kodukindlustus nõutav']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.holmbank.ee/et/eraklient/vaikelaen',
        summary: 'Tagatiseta isiklik laen.',
        details: ['Fikseeritud kuumakse', 'Taotlus internetis või kontoris']
      },
      {
        name: 'Autolaen',
        url: 'https://www.holmbank.ee/et/eraklient/autolaen',
        summary: 'Sõiduki soetamiseks uuele või kasutatud autole.',
        details: ['Sissemakse võimalik', 'Liising alternatiivina']
      },
      {
        name: 'Liising',
        url: 'https://www.holmbank.ee/et/eraklient/liising',
        summary: 'Finants- ja operatiivliising sõidukitele.',
        details: ['Kapitaliliising', 'Operatiivliising']
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.holmbank.ee/et/eraklient/krediidikonto',
        summary: 'Paindlik krediidikonto igapäevaseks kasutuseks.',
        details: ['Intress ainult kasutatud summalt']
      },
      {
        name: 'Refinantseerimine',
        url: 'https://www.holmbank.ee/et/eraklient',
        summary: 'Olemasolevate laenude ühendamine paremate tingimustega.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus',
    items: [
      {
        name: 'Arvelduskonto',
        url: 'https://www.holmbank.ee/et/eraklient/arvelduskonto',
        summary: 'Põhiarvelduskonto interneti- ja mobiilipangaga.',
        details: ['SEPA maksed', 'Püsikorraldused', 'Kuutasu: hinnakiri']
      },
      {
        name: 'Deebetkaart',
        url: 'https://www.holmbank.ee/et/eraklient/kaardid',
        summary: 'Deebetkaart igapäevasteks ostudeks.',
        details: ['Apple Pay, Google Pay', 'Kaardi tasud hinnakirjas']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.holmbank.ee/et/eraklient/kaardid',
        summary: 'Krediitkaart paindlikuks kasutuseks.',
        details: ['Krediidilimiit sõltub sissetulekust']
      },
      {
        name: 'Maksed',
        url: 'https://www.holmbank.ee/et/eraklient/maksed',
        summary: 'SEPA maksed ja ülekanded.',
        details: ['SEPA makse', 'Kiirmaksed võimalikud']
      },
      {
        name: 'Internetipank',
        url: 'https://www.holmbank.ee/et/eraklient',
        summary: 'Holm Bank internetipank ja mobiilipank.',
        details: ['Smart-ID, Mobile-ID', 'Tehingute ajalugu']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.holmbank.ee/et/eraklient/kindlustus',
        summary: 'Kodu ja koduvara kindlustus (partnerite kaudu).',
        details: ['Kodulaenu puhul nõutav']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.holmbank.ee/et/eraklient/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.',
        details: ['Liisingu puhul kasko nõutav']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.holmbank.ee/et/ariklient',
        summary: 'Ettevõtte arveldus ja pangateenused.',
        details: ['SEPA maksed', 'Mitme kasutaja ligipääs']
      },
      {
        name: 'Ärilaen',
        url: 'https://www.holmbank.ee/et/ariklient/arilaen',
        summary: 'Ettevõtte finantseerimine ja käibekapital.',
        details: ['Investeerimislaen', 'Kinnisvara tagatisel']
      },
      {
        name: 'Äriliising',
        url: 'https://www.holmbank.ee/et/ariklient/liising',
        summary: 'Ettevõtte liising sõidukitele ja seadmetele.',
        details: ['Finantsliising', 'Operatiivliising']
      },
      {
        name: 'Kaardimaksed',
        url: 'https://www.holmbank.ee/et/ariklient',
        summary: 'Kaardimaksete lahendused ettevõtetele.',
        details: ['POS terminalid', 'E-kaubandus']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://www.holmbank.ee/et/eraklient/hinnakiri',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri.',
        details: ['Kontode kuutasud', 'Kaartide tasud', 'Maksete hinnad']
      },
      {
        name: 'Tingimused ja dokumendid',
        url: 'https://www.holmbank.ee/et/eraklient/dokumendid',
        summary: 'Teenuste tingimused ja infolehed.'
      },
      {
        name: 'Kontakt ja pangakontorid',
        url: 'https://www.holmbank.ee/et/kontakt',
        summary: 'Kontaktinfo ja pangakontorid.',
        details: ['Tallinn, Tartu', 'Klienditugi']
      },
      {
        name: 'Karjäär ja meist',
        url: 'https://www.holmbank.ee/et/meist',
        summary: 'Holm Bank AS ülevaade — Eesti kapitalil põhinev pank.'
      }
    ]
  }
];
