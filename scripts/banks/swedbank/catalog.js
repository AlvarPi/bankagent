/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const SWEDBANK_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.swedbank.ee/private/savings/deposit',
        summary: 'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €.',
        rates: ['Vaata swedbank.ee hoiuste intresse']
      },
      {
        name: 'Kogumishoius',
        url: 'https://www.swedbank.ee/private/savings/savings-account',
        summary: 'Paindlik kogumiskonto igapäevaseks säästmiseks.'
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://www.swedbank.ee/private/home/more/pricesrates/depositrates',
        summary: 'Intress EUR arvelduskonto jäägilt.',
        rates: ['0,2% (depositsrates leht, muutuv)']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.swedbank.ee/private/savings/invest',
        summary: 'Fondid, aktsiad, pension. Swedbank investeerimisplatvorm.'
      },
      {
        name: 'Pension',
        url: 'https://www.swedbank.ee/private/savings/pension',
        summary: 'II ja III samba pensionifondid.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://www.swedbank.ee/private/dailybanking/packages',
        summary: 'Põhiline pangapakett.',
        rates: ['Kuutasu: vaata depositrates lehte']
      },
      {
        name: 'Ostupakett',
        url: 'https://www.swedbank.ee/private/dailybanking/packages',
        summary: 'Pakett ostuhüvede ja lisateenustega.',
        rates: ['Kuutasu: vaata depositrates lehte']
      },
      {
        name: 'Premium pakett',
        url: 'https://www.swedbank.ee/private/dailybanking/packages',
        summary: 'Kõrgeima taseme pangapakett.'
      },
      {
        name: 'Noortepakett',
        url: 'https://www.swedbank.ee/private/dailybanking/for-young-people',
        summary: 'Eritingimused noortele (kuni 26 a.).'
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.swedbank.ee/private/dailybanking/cards',
        summary: 'Visa/Mastercard deebetkaardid, Apple Pay, Google Pay.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.swedbank.ee/private/dailybanking/cards/credit-card',
        summary: 'Krediitkaart ostukindlustusega.'
      },
      {
        name: 'Maksed',
        url: 'https://www.swedbank.ee/private/dailybanking/payments',
        summary: 'SEPA, kiirmaksed, välismaa maksed.'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.swedbank.ee/private/loans/home-loan',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.swedbank.ee/private/loans/consumer-loan',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.swedbank.ee/private/loans/car-loan',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.swedbank.ee/private/loans/leasing',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.swedbank.ee/private/loans/credit-line',
        summary: 'Paindlik krediidikonto.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.swedbank.ee/private/insurance/home',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.swedbank.ee/private/insurance/travel',
        summary: 'Reisi- ja tervisekindlustus.'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.swedbank.ee/private/insurance',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.swedbank.ee/business',
        summary: 'Ettevõtte arveldus ja teenused.'
      },
      {
        name: 'Ärilaen',
        url: 'https://www.swedbank.ee/business/financing',
        summary: 'Ettevõtte finantseerimine.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri ja intressid',
        url: 'https://www.swedbank.ee/private/home/more/pricesrates/depositrates',
        summary: 'Hoiuste intressid, pakettide tasud, arvelduskonto intress.'
      },
      {
        name: 'Intressimäärad',
        url: 'https://www.swedbank.ee/private/home/more/pricesrates/interests',
        summary: 'Laenu- ja hoiuseintresside detailid (JS leht).'
      }
    ]
  }
];
