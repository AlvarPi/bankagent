/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const WISE_CATALOG = [
  {
    title: 'Kontod ja intress',
    items: [
      {
        name: 'Wise konto',
        url: 'https://wise.com/ee/',
        summary:
          'Mitme valuutaga konto. Ei ole Eesti litsentseeritud pank — raha hoitakse partnerpankades.',
        details: ['SEPA ja SWIFT maksed', '40+ valuutat']
      },
      {
        name: 'Wise Interest',
        url: 'https://wise.com/ee/interest/',
        summary:
          'Intress kontojäägilt fondi kaudu (mitte pangahoiusena). Muutuv määr, sõltub valuutast.',
        rates: ['EUR: muutuv määr (vaata wise.com/ee/interest)', 'Aastatasu ~0,26%']
      },
      {
        name: 'Wise Debit Card',
        url: 'https://wise.com/ee/card/',
        summary: 'Mitme valuutaga deebetkaart välismaa ostudeks.'
      }
    ]
  },
  {
    title: 'Maksed ja ülekanded',
    items: [
      {
        name: 'Rahvusvahelised ülekanded',
        url: 'https://wise.com/ee/send-money/',
        summary: 'Odavamad välismaa ülekanded võrreldes traditsiooniliste pankadega.',
        details: ['Reaalne vahetuskurss', 'Läbipaistev tasustruktuur']
      },
      {
        name: 'Wise Business',
        url: 'https://wise.com/ee/business/',
        summary: 'Ettevõtte kontod ja massmaksed.'
      },
      {
        name: 'Wise API',
        url: 'https://wise.com/ee/business/api',
        summary: 'API integratsioon ettevõtetele.'
      }
    ]
  },
  {
    title: 'Tasud',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Konto, kaardi ja ülekannete tasud.',
        details: ['Isiklik konto: tasuta avamine', 'Kaart: ühekordne ja kuutasu', 'Ülekanded: sõltuvad valuutast ja summast']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Wise Eesti',
        url: 'https://wise.com/ee/help/',
        summary: 'Abi ja KKK.',
        details: [
          'Wise ei ole traditsiooniline Eesti pank',
          'Intress tuleb fondi kaudu, mitte hoiusena',
          'Ei ole minuraha.ee baromeetris'
        ]
      }
    ]
  }
];
