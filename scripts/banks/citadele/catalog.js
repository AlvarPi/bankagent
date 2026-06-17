/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const CITADELE_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt.',
        rates: ['Kuni 2,00% (kalkulaator, muutuv)']
      },
      {
        name: 'Kogumiskonto',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Paindlik kogumiskonto igapäevaseks säästmiseks.',
        rates: ['Kuni 1,50% (kalkulaator)']
      },
      {
        name: 'Roheline kogumiskonto',
        url: 'https://www.citadele.ee/et/private/savings/green-savings',
        summary: 'Roheline säästmislahendus keskkonnasõbralike projektide toetamiseks.',
        rates: ['Kuni 1,00% (kalkulaator)']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.citadele.ee/et/private/investments',
        summary: 'Fondid, aktsiad, obligatsioonid. Citadele investeerimisplatvorm.'
      },
      {
        name: 'Pension',
        url: 'https://www.citadele.ee/et/private/pension',
        summary: 'II ja III samba pensionifondid.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Põhiline pangapakett.'
      },
      {
        name: 'Premium pakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Laiendatud teenuste pakett.'
      },
      {
        name: 'X pakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Kõrgeima taseme pangapakett.'
      },
      {
        name: 'Noortepakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/for-young-people',
        summary: 'Eritingimused noortele.'
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.citadele.ee/et/private/daily-banking/cards',
        summary: 'Visa/Mastercard deebetkaardid, nutimaksed.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.citadele.ee/et/private/daily-banking/cards/credit-card',
        summary: 'Krediitkaart ostukindlustusega.'
      },
      {
        name: 'Maksed',
        url: 'https://www.citadele.ee/et/private/daily-banking/payments',
        summary: 'SEPA, kiirmaksed, välismaa maksed.'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.citadele.ee/et/private/loans/mortgage',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.citadele.ee/et/private/loans/consumer-loan',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.citadele.ee/et/private/loans/car-loan',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.citadele.ee/et/private/loans/leasing',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.citadele.ee/et/private/loans/credit-line',
        summary: 'Paindlik krediidikonto.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.citadele.ee/et/private/insurance/home',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.citadele.ee/et/private/insurance/travel',
        summary: 'Reisi- ja tervisekindlustus.'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.citadele.ee/et/private/insurance',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.citadele.ee/et/business',
        summary: 'Ettevõtte arveldus ja teenused.'
      },
      {
        name: 'Ärilaen',
        url: 'https://www.citadele.ee/et/business/financing',
        summary: 'Ettevõtte finantseerimine.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Teenuste hinnakiri',
        url: 'https://www.citadele.ee/et/private/fees/',
        summary: 'Erakliendi teenuste hinnakiri.'
      },
      {
        name: 'Pangakonto avamine',
        url: 'https://www.citadele.ee/et/private/daily-banking/open-account',
        summary: 'Konto avamine kodust lahkumata (videotuvastus).'
      }
    ]
  }
];
