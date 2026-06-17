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
        rates: [
          'Kuni 2,75% aastas (veebileht, muutuv)',
          '12 kuu baromeeter: ~2,75% (min 500 €, minuraha)',
          'Perioodid: 3–60 kuud'
        ],
        details: [
          'Intress makstakse tähtaja lõpus või igakuiselt',
          'Avamine internetis',
          'Ennetähtaegne lõpetamine võimalik'
        ]
      },
      {
        name: 'Säästuhoius',
        url: 'https://www.bigbank.ee/saastuhoius/',
        summary: 'Paindlik säästuhoius igakuise sissemaksega. Intress kantakse kord kvartalis.',
        rates: ['2,20% aastane intress (veebileht, muutuv)'],
        details: [
          'Minimaalne sissemakse 10 €/kuus',
          'Paindlik väljavõtt',
          'Sobib pikaajaliseks säästmiseks'
        ]
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.bigbank.ee/kodulaen/',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.',
        rates: ['Intressimarginaal sõltub profiilist'],
        details: ['Kuni 30 aastat', 'Kiire eelotsus internetis']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.bigbank.ee/vaikelaen/',
        summary: 'Tagatiseta isiklik laen 500–15 000 €.',
        details: ['Fikseeritud kuumakse', 'Taotlus veebis']
      },
      {
        name: 'Autolaen',
        url: 'https://www.bigbank.ee/autolaen/',
        summary: 'Sõiduki soetamiseks.',
        details: ['Uus ja kasutatud auto', 'Liising alternatiivina']
      },
      {
        name: 'Liising',
        url: 'https://www.bigbank.ee/liising/',
        summary: 'Finants- ja operatiivliising.',
        details: ['Kapitaliliising', 'Sissemakse võimalik']
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.bigbank.ee/krediidikonto/',
        summary: 'Paindlik krediidikonto.',
        details: ['Intress kasutatud summalt']
      },
      {
        name: 'Refinantseerimine',
        url: 'https://www.bigbank.ee/refinantseerimine/',
        summary: 'Olemasolevate laenude ühendamine paremate tingimustega.',
        details: ['Vähendab kogukulu', 'Üks kuumakse']
      },
      {
        name: 'Remondilaen',
        url: 'https://www.bigbank.ee/remondilaen/',
        summary: 'Kodu remondiks ja parendusteks.',
        details: ['Tagatiseta või tagatisel']
      }
    ]
  },
  {
    title: 'Igapäevapangandus',
    items: [
      {
        name: 'Arvelduskonto',
        url: 'https://www.bigbank.ee/arvelduskonto/',
        summary: 'Põhiarvelduskonto internetipangaga.',
        details: ['SEPA maksed', 'Baromeeter: intress alates 1 € jäägilt', 'Kuutasu: dokumendid']
      },
      {
        name: 'Deebetkaart',
        url: 'https://www.bigbank.ee/kaardid/',
        summary: 'Deebetkaart igapäevasteks ostudeks.',
        details: ['Apple Pay, Google Pay', 'Kaardi tasud hinnakirjas']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.bigbank.ee/kaardid/',
        summary: 'Krediitkaart paindlikuks kasutuseks.',
        details: ['Krediidilimiit sõltub sissetulekust']
      },
      {
        name: 'Internetipank',
        url: 'https://www.bigbank.ee/',
        summary: 'Bigbank internetipank ja mobiililahendus.',
        details: ['Smart-ID, Mobile-ID']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.bigbank.ee/kindlustus/',
        summary: 'Kodu ja koduvara kindlustus (partnerite kaudu).',
        details: ['Kodulaenu puhul nõutav']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.bigbank.ee/kindlustus/',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärilaen',
        url: 'https://www.bigbank.ee/arilaen/',
        summary: 'Ettevõtte finantseerimine.',
        details: ['Investeerimislaen', 'Käibekapital']
      },
      {
        name: 'Äriliising',
        url: 'https://www.bigbank.ee/ariliising/',
        summary: 'Ettevõtte liising sõidukitele ja seadmetele.',
        details: ['Finantsliising', 'Operatiivliising']
      },
      {
        name: 'Ärikonto',
        url: 'https://www.bigbank.ee/arvelduskonto/',
        summary: 'Ettevõtte arvelduskonto.',
        details: ['SEPA maksed']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Dokumendid ja hinnakiri',
        url: 'https://www.bigbank.ee/dokumendid/',
        summary: 'Teenuste tingimused, hinnakirjad ja infolehed.',
        details: ['PDF dokumendid', 'Kehtivad tingimused']
      },
      {
        name: 'Kontakt',
        url: 'https://www.bigbank.ee/kontakt/',
        summary: 'Kontaktinfo ja klienditugi.',
        details: ['Telefon ja e-post', 'Kontorid Eestis ja Baltikumis']
      },
      {
        name: 'Meist',
        url: 'https://www.bigbank.ee/meist/',
        summary: 'Bigbank AS — Baltikumi finantsettevõte, tugev hoiuste valik.'
      }
    ]
  }
];
