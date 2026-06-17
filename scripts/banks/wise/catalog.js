/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const WISE_CATALOG = [
  {
    title: 'Kontod ja intress',
    items: [
      {
        name: 'Wise konto (mitme valuutaga)',
        url: 'https://wise.com/ee/',
        summary:
          'Mitme valuutaga konto 40+ valuutas. Ei ole Eesti litsentseeritud pank — raha hoitakse partnerpankides.',
        details: [
          'SEPA ja SWIFT maksed',
          'IBAN mitmes riigis (sh EE, GB, US)',
          'Tasuta konto avamine',
          'Raha eraldi kontodel partnerpankides'
        ]
      },
      {
        name: 'Wise Interest (EUR)',
        url: 'https://wise.com/ee/interest/',
        summary:
          'Intress EUR kontojäägilt fondi kaudu (mitte pangahoiusena). Muutuv määr, sõltub valuutast ja turutingimustest.',
        rates: ['EUR: muutuv määr (vaata wise.com/ee/interest)', 'Aastatasu ~0,26% bruto tootluselt'],
        details: [
          'Raha investeeritakse likiidsesse fondi',
          'Ei ole Tagatisfondi kaitstud hoius',
          'Saadaval valitud riikides'
        ]
      },
      {
        name: 'Wise Interest (GBP, USD jt)',
        url: 'https://wise.com/ee/interest/',
        summary: 'Intress ka teistes valuutades (GBP, USD jne).',
        details: ['Iga valuuta oma määr', 'Tingimused erinevad riigiti']
      },
      {
        name: 'Wise Debit Card',
        url: 'https://wise.com/ee/card/',
        summary: 'Mitme valuutaga deebetkaart välismaa ostudeks.',
        details: [
          'Maksad kohalikus valuutas ilma peidetud tasudeta',
          'Ühekordne kaardi tellimise tasu',
          'Võimalik virtuaalkaart',
          'Apple Pay ja Google Pay'
        ]
      },
      {
        name: 'Wise Business konto',
        url: 'https://wise.com/ee/business/',
        summary: 'Ettevõtte mitme valuutaga konto.',
        details: ['Massmaksed', 'API integratsioon', 'Arvete haldus']
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
        details: [
          'Reaalne vahetuskurss (keskmine turukurss)',
          'Läbipaistev tasustruktuur',
          'SEPA ülekanded EUR-s',
          'SWIFT ülekanded teistes valuutades'
        ]
      },
      {
        name: 'Wise Receive (IBAN)',
        url: 'https://wise.com/ee/',
        summary: 'Saa raha otse Wise kontole IBAN-ile.',
        details: ['EE IBAN võimalik', 'GB, US ja teised IBAN-id']
      },
      {
        name: 'Wise API',
        url: 'https://wise.com/ee/business/api',
        summary: 'API integratsioon ettevõtetele.',
        details: ['Automatiseeritud maksed', 'Webhookid', 'Arendajadokumentatsioon']
      },
      {
        name: 'Wise Assets',
        url: 'https://wise.com/ee/invest/',
        summary: 'Aktsiate ja ETF-ide ostmine Wise rakenduses (valitud turgudel).',
        details: ['Ei ole kõigis riikides saadaval', 'Eraldi teenus']
      }
    ]
  },
  {
    title: 'Tasud',
    items: [
      {
        name: 'Isiklik konto tasud',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Konto avamine ja haldamine.',
        details: ['Konto avamine: tasuta', 'Kuutasu: puudub', 'Kontojäägi hoidmine: tasuta']
      },
      {
        name: 'Kaardi tasud',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Deebetkaardi tellimise ja kasutamise tasud.',
        details: ['Ühekordne kaardi tellimise tasu', 'Kuutasu võib puududa', 'Sularaha väljavõtu tasu']
      },
      {
        name: 'Ülekannete tasud',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Ülekannete tasustruktuur valuuta ja summast sõltuvalt.',
        details: ['SEPA: sageli tasuta või madal tasu', 'SWIFT: fikseeritud + protsent', 'Kalkulaator veebis']
      },
      {
        name: 'Vahetuskursi marginaal',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Wise kasutab keskmist turukurssi ilma peidetud marginaalita.',
        details: ['Läbipaistev hind', 'Võrdle enne ülekannet']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Wise Eesti abi',
        url: 'https://wise.com/ee/help/',
        summary: 'Abi, KKK ja klienditugi.',
        details: ['Eestikeelne tugi', 'Veebipõhine klienditeenindus']
      },
      {
        name: 'Regulatsioon ja kaitse',
        url: 'https://wise.com/ee/safety-and-security/',
        summary: 'Wise regulatiivne staatus ja turvalisus.',
        details: [
          'Wise ei ole traditsiooniline Eesti pank',
          'Raha hoitakse eraldi kontodel litsentseeritud institutsioonides',
          'Intress tuleb fondi kaudu, mitte hoiusena',
          'Ei ole minuraha.ee baromeetris'
        ]
      },
      {
        name: 'Wise vs traditsiooniline pank',
        url: 'https://wise.com/ee/',
        summary: 'Wise sobib eelkõige rahvusvahelisteks makseteks ja mitme valuutaga haldamiseks.',
        details: ['Ei paku kodulaene ega täispangateenuseid Eestis', 'Hoiuse asemel fondi-põhine intress']
      }
    ]
  }
];
