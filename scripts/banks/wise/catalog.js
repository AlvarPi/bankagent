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
          'Mitme valuutaga konto, mis hoiab ja vahetab raha 40+ valuutas (kasutatav 160+ riigis). Ei ole klassikaline Eesti hoiusepank — see on rahaülekande- ja multivaluuta-kontoteenus.',
        details: [
          'Konto avamine ja kuuhaldus: tasuta (wise.com/ee/pricing)',
          'Kuutasu puudub — makstakse ainult kasutamise eest',
          'Kohalikud kontorekvisiidid (IBAN/account details) 22 valuutas tasuta, sh EUR, USD, GBP (wise.com/ee/pricing/receive)',
          'SEPA (EUR) ja SWIFT maksed',
          'Raha hoitakse eraldi partnerinstitutsioonides'
        ]
      },
      {
        name: 'Wise Interest (EUR)',
        url: 'https://wise.com/ee/interest/',
        summary:
          'Tootlus EUR kontojäägilt valitsuse tagatud varadega fondi kaudu (mitte pangahoiusena). Muutuv määr, jälgib keskpanga intressi; tootlus arvutatakse fondi viimase 7 päeva tootluse põhjal.',
        rates: [
          'EUR: 2,32% aastas (pärast 0,26% aastatasu) — seisuga 24.11.2026 (wise.com/ee/interest)',
          'Fond: BlackRock ICS Euro Government Liquidity, järgib EKP hoiustamise määra',
          '5 a keskmine tootlus 1,57% (enne Wise tasusid)'
        ],
        details: [
          'Raha investeeritakse intressi teenivasse fondi (valitsuse tagatud varad)',
          'Tootlus lisatakse iga tööpäev; raha saab igal ajal kulutada/üle kanda',
          'Kapital on riskis, tootlus ei ole garanteeritud',
          'Wise andmetel kaitstud Tagatisfondi investorikaitse osafondi kaudu kuni 20 000 EUR ulatuses (wise.com/ee/interest)'
        ]
      },
      {
        name: 'Wise Interest (GBP, USD jt)',
        url: 'https://wise.com/ee/interest/',
        summary: 'Tootlus ka teistes valuutades, iga valuuta oma muutuva määraga.',
        rates: [
          'GBP: 3,47% aastas (pärast 0,55% tasu) — 24.11.2026',
          'USD: 3,66% aastas (pärast 0,28% tasu) — 24.11.2026'
        ],
        details: [
          'Iga valuuta oma määr',
          'Määr on muutuv ja sõltub turutingimustest',
          'Saadaval valitud riikides'
        ]
      },
      {
        name: 'Wise Debit Card',
        url: 'https://wise.com/ee/card/',
        summary:
          'Mitme valuutaga deebetkaart, mis kulutab automaatselt õiges valuutas (40+ valuutat, 160+ riiki) ilma peidetud kursimarginaalita.',
        rates: [
          'Füüsilise kaardi tellimise tasu: 7 EUR (ühekordne) (wise.com/ee/pricing)',
          'Sularaha väljavõtt: tasuta kuni 250 EUR kuus konto kohta (wise.com/ee/pricing)',
          'Sularaha väljavõtt üle 250 EUR kuus: 2,69% ületavalt summalt (wise.com/ee/pricing)',
          'Kaardimaksed: tasuta (wise.com/ee/pricing)'
        ],
        details: [
          'Virtuaalkaart kohe peale konto loomist',
          'Apple Pay ja Google Pay',
          'Kaardi külmutamine/avamine ja mitu digitaalset kaarti',
          'Makseteated'
        ]
      },
      {
        name: 'Wise Business konto',
        url: 'https://wise.com/ee/business/',
        summary: 'Ettevõtte mitme valuutaga konto rahvusvahelisteks makseteks.',
        details: ['Massmaksed', 'API integratsioon', 'Arvete haldus', 'Rahvusvahelised kontorekvisiidid']
      }
    ]
  },
  {
    title: 'Maksed ja ülekanded',
    items: [
      {
        name: 'Rahvusvahelised ülekanded',
        url: 'https://wise.com/ee/send-money/',
        summary:
          'Ülekanded keskmise turukursiga (mid-market rate) + läbipaistev teenustasu. Lõpphind sõltub summast, valuutapaarist ja maksemeetodist.',
        rates: [
          'Saatmistasu: alates 0,47%, sõltub valuutast (wise.com/ee/pricing)',
          'Valuutavahetus: alates 0,47%, sõltub valuutast (wise.com/ee/pricing)'
        ],
        details: [
          'Reaalne vahetuskurss (keskmine turukurss) ilma peidetud marginaalita',
          'Tasu = väike fikseeritud osa + protsent summast',
          'Pangaülekanne maksmismeetodina on odavaim; kaardiga maksmine kallim',
          'SEPA EUR ja SWIFT teistes valuutades',
          'Täpne hind veebikalkulaatoris enne kinnitamist'
        ]
      },
      {
        name: 'Wise Receive (raha vastuvõtt)',
        url: 'https://wise.com/ee/pricing/receive',
        summary:
          'Raha vastuvõtt Wise kontole on üldjuhul tasuta; mõnel kiirel SWIFT/wire meetodil on fikseeritud tasu, kuid alati on olemas tasuta alternatiiv.',
        rates: [
          'Kohalikud (mitte-SWIFT) maksed EUR, GBP, USD jt: tasuta (wise.com/ee/pricing/receive)',
          'USD wire vastuvõtt: 6,11 USD makse kohta (wise.com/ee/pricing/receive)',
          'GBP SWIFT vastuvõtt: 2,16 GBP makse kohta (wise.com/ee/pricing/receive)',
          'EUR SWIFT vastuvõtt: 2,39 EUR makse kohta (wise.com/ee/pricing/receive)'
        ],
        details: ['Kontorekvisiidid 22 valuutas tasuta', 'EE/GB/US ja teised IBAN-id/account details']
      },
      {
        name: 'Wise API',
        url: 'https://docs.wise.com/',
        summary:
          'Wise Platform API (docs.wise.com). Avalik ilma võtmeta hinnapäring: POST https://api.wise.com/v3/quotes (näidiskurss ja tasu, ei sobi tehinguks) ning võrdlus GET https://api.wise.com/v4/comparisons/ (teised teenusepakkujad; Eesti panku ei sisalda). Bankagendi öine skann kasutab hinnapäringut. (Allikas: docs.wise.com, kontrollitud 24.11.2026)',
        rates: [
          'Näide 24.11.2026: 1000 EUR → USD pangaülekandega tasu 6,21 €, kurss 1,0965',
          '1000 EUR → GBP tasu 5,76 €; → SEK 6,02 €; → PLN 6,20 €'
        ],
        details: ['Automatiseeritud maksed', 'Webhookid', 'Arendajadokumentatsioon']
      },
      {
        name: 'Wise Assets / Stocks (investeerimine)',
        url: 'https://wise.com/ee/interest/',
        summary:
          'Wise Assets Europe AS: Interest (rahaturufond) ja Stocks (indeksfond); kapital on riskis, investorikaitse kuni 20 000 €. (Allikas: wise.com/ee/interest, wise.com/ee/pricing)',
        rates: ['Aktsiate aastatasu: alates 0,59% (wise.com/ee/pricing)'],
        details: ['Ei ole kõigis riikides saadaval', 'Eraldi teenus', 'Kapital on riskis']
      }
    ]
  },
  {
    title: 'Tasud',
    items: [
      {
        name: 'Isiklik konto tasud',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Konto avamine ja haldamine on tasuta, kuutasu puudub.',
        details: [
          'Konto avamine: tasuta',
          'Kuutasu: puudub (pay-per-use mudel)',
          'Kontojäägi hoidmine: tasuta',
          'Kontorekvisiidid (IBAN/account details): tasuta'
        ]
      },
      {
        name: 'Kaardi tasud',
        url: 'https://wise.com/ee/pricing/card-fees',
        summary: 'Deebetkaardi tellimise ja kasutamise tasud.',
        rates: [
          'Digitaalne kaart tasuta; füüsiline kaart 7 EUR (ühekordne)',
          'Kuutasu puudub',
          'Olemasoleva valuutaga maksmine tasuta; konverteerimine alates 0,47%',
          'Sularaha tasuta kuni 250 EUR/kuus, edasi 2,69% ületavalt summalt',
          'E-rahakoti/krüpto/kasiino top-up 2%'
        ],
        details: ['Virtuaalkaart tasuta', 'Kuutasu puudub']
      },
      {
        name: 'Ülekannete tasud',
        url: 'https://wise.com/ee/pricing/',
        summary: 'Ülekande tasu sõltub valuutast, summast ja maksemeetodist.',
        rates: [
          'Saatmine: alates 0,47% (wise.com/ee/pricing)',
          'E-rahakoti laadimine (top-up): 2% (wise.com/ee/pricing)'
        ],
        details: [
          'Tasu = fikseeritud osa + protsent',
          'SEPA odavam, SWIFT fikseeritud + protsent',
          'Kalkulaator veebis'
        ]
      },
      {
        name: 'Vahetuskursi marginaal',
        url: 'https://wise.com/ee/pricing/',
        summary:
          'Wise kasutab keskmist turukurssi (mid-market) ilma peidetud marginaalita; vahetustasu on eraldi ja läbipaistev.',
        rates: ['Valuutavahetus: alates 0,47%, sõltub valuutapaarist (wise.com/ee/pricing)'],
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
          'Wise ei ole traditsiooniline Eesti hoiusepank',
          'Tavaline kontojääk hoitakse eraldi (safeguarded) kontodel litsentseeritud institutsioonides',
          'Intress/tootlus tuleb fondi kaudu, mitte hoiusena',
          'Wise andmetel on Interest-fondi rahale investorikaitse Tagatisfondi osafondi kaudu kuni 20 000 EUR (wise.com/ee/interest)'
        ]
      },
      {
        name: 'Wise vs traditsiooniline pank',
        url: 'https://wise.com/ee/',
        summary: 'Wise sobib eelkõige rahvusvahelisteks makseteks ja mitme valuutaga haldamiseks.',
        details: ['Ei paku kodulaene ega täispangateenuseid Eestis', 'Hoiuse asemel fondi-põhine tootlus']
      }
    ]
  }
];
