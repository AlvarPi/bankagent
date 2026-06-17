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
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €.',
        rates: ['Kuni 2,00% (kalkulaator)', '12 kuu baromeeter: ~2,30% (min 100 €, minuraha)'],
        details: ['Periood 3–60 kuud', 'Minimaalne summa 100 €', 'Intress tähtaja lõpus või igakuiselt']
      },
      {
        name: 'Kogumiskonto',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Paindlik kogumiskonto igapäevaseks säästmiseks.',
        rates: ['Kuni 1,50% (kalkulaator)'],
        details: ['Igakuine sissemakse', 'Väljavõtt võimalik']
      },
      {
        name: 'Roheline kogumiskonto',
        url: 'https://www.citadele.ee/et/private/savings/green-savings',
        summary: 'Roheline säästmislahendus keskkonnasõbralike projektide toetamiseks.',
        rates: ['Kuni 1,00% (kalkulaator)'],
        details: ['Raha suunatakse rohelistesse projektidesse', 'Säästmine + keskkonnahüve']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.citadele.ee/et/private/investments',
        summary: 'Fondid, aktsiad, obligatsioonid. Citadele investeerimisplatvorm.',
        details: ['Citadele fondid', 'Väärtpaberikonto', 'Nõustamine']
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://www.citadele.ee/et/private/pension',
        summary: 'II samba pensionifondid ja III samba vabatahtlik pension.',
        details: ['Citadele pensionifondid', 'III samba maksusoodustus']
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Põhiline pangapakett.',
        details: ['Arvelduskonto, internetipank', 'Deebetkaart', 'Kuutasu: hinnakiri']
      },
      {
        name: 'Premium pakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Laiendatud teenuste pakett.',
        details: ['Reisikindlustus', 'Ostukaitse']
      },
      {
        name: 'X pakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/packages',
        summary: 'Kõrgeima taseme pangapakett.',
        details: ['Laiem kindlustuskaitse', 'Concierge', 'Premium hüved']
      },
      {
        name: 'Noortepakett',
        url: 'https://www.citadele.ee/et/private/daily-banking/for-young-people',
        summary: 'Eritingimused noortele.',
        rates: ['Soodushinnaga teenused'],
        details: ['Tasuta või soodushinnaga arveldus']
      },
      {
        name: 'Citadele 360',
        url: 'https://www.citadele.ee/et/private/daily-banking',
        summary: 'Citadele digitaalne panganduskeskkond.',
        details: ['Mobiilipank', 'Videotuvastus konto avamisel']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.citadele.ee/et/private/daily-banking/cards',
        summary: 'Visa/Mastercard deebetkaardid, nutimaksed.',
        details: ['Apple Pay, Google Pay', 'Ostukaitse']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.citadele.ee/et/private/daily-banking/cards/credit-card',
        summary: 'Krediitkaart ostukindlustusega.',
        details: ['Krediidilimiit', 'Grace period']
      },
      {
        name: 'Maksed',
        url: 'https://www.citadele.ee/et/private/daily-banking/payments',
        summary: 'SEPA, kiirmaksed, välismaa maksed.',
        details: ['SEPA Instant', 'Püsikorraldused']
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.citadele.ee/et/private/daily-banking/cards',
        summary: 'Apple Pay, Google Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.citadele.ee/et/private/loans/mortgage',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.',
        rates: ['Intressimarginaal sõltub profiilist'],
        details: ['Kuni 30 aastat', 'Eelotsus internetis']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.citadele.ee/et/private/loans/consumer-loan',
        summary: 'Tagatiseta isiklik laen.',
        details: ['Fikseeritud kuumakse']
      },
      {
        name: 'Autolaen',
        url: 'https://www.citadele.ee/et/private/loans/car-loan',
        summary: 'Sõiduki soetamiseks.',
        details: ['Uus ja kasutatud auto']
      },
      {
        name: 'Liising',
        url: 'https://www.citadele.ee/et/private/loans/leasing',
        summary: 'Finants- ja operatiivliising.',
        details: ['Kapitaliliising']
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.citadele.ee/et/private/loans/credit-line',
        summary: 'Paindlik krediidikonto.',
        details: ['Intress kasutatud summalt']
      },
      {
        name: 'Õppelaen',
        url: 'https://www.citadele.ee/et/private/loans',
        summary: 'Õpingute finantseerimine.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.citadele.ee/et/private/insurance/home',
        summary: 'Kodu ja koduvara kindlustus.',
        details: ['Erinevad kaitsetasemed']
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.citadele.ee/et/private/insurance/travel',
        summary: 'Reisi- ja tervisekindlustus.',
        details: ['Pakettides kaasas']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.citadele.ee/et/private/insurance',
        summary: 'Sõiduki kindlustuslahendused.',
        details: ['Võrdle pakkumisi']
      },
      {
        name: 'Õnnetusjuhtumi kindlustus',
        url: 'https://www.citadele.ee/et/private/insurance',
        summary: 'Trahvide kaitse.'
      },
      {
        name: 'Elukindlustus',
        url: 'https://www.citadele.ee/et/private/insurance',
        summary: 'Elukindlustus.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'Citadele pakkumised',
        url: 'https://www.citadele.ee/et/private/offers',
        summary: 'Partnerite soodustused ja kampaaniad.',
        details: ['Muutuvad pakkumised']
      },
      {
        name: 'Konto avamine kodust',
        url: 'https://www.citadele.ee/et/private/daily-banking/open-account',
        summary: 'Pangakonto avamine videotuvastusega kodust lahkumata.',
        details: ['Smart-ID või Mobile-ID', 'Kiire protsess']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.citadele.ee/et/business',
        summary: 'Ettevõtte arveldus ja teenused.',
        details: ['SEPA maksed', 'Mitme kasutaja ligipääs']
      },
      {
        name: 'Äripaketid',
        url: 'https://www.citadele.ee/et/business/daily-banking',
        summary: 'Erineva mahuga äripaketid.',
        details: ['Kuutasu sõltub mahust']
      },
      {
        name: 'Ärilaen',
        url: 'https://www.citadele.ee/et/business/financing',
        summary: 'Ettevõtte finantseerimine.',
        details: ['Investeerimislaen', 'Leasing', 'Faktooring']
      },
      {
        name: 'Kaardimaksed',
        url: 'https://www.citadele.ee/et/business/card-payments',
        summary: 'POS, e-kaubandus.',
        details: ['Visa/Mastercard kaupmehele']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Teenuste hinnakiri',
        url: 'https://www.citadele.ee/et/private/fees/',
        summary: 'Erakliendi teenuste hinnakiri.',
        details: ['Pakettide kuutasud', 'Kaartide tasud', 'Maksete hinnad']
      },
      {
        name: 'Pangakonto avamine',
        url: 'https://www.citadele.ee/et/private/daily-banking/open-account',
        summary: 'Konto avamine kodust lahkumata (videotuvastus).',
        details: ['Smart-ID', 'Mobile-ID']
      },
      {
        name: 'Tingimused',
        url: 'https://www.citadele.ee/et/terms',
        summary: 'Üldtingimused ja infolehed.'
      },
      {
        name: 'Pangakontorid',
        url: 'https://www.citadele.ee/et/contact',
        summary: 'Kontorite asukohad ja klienditugi.'
      }
    ]
  }
];
