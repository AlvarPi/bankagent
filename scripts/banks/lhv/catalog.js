/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const LHV_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.lhv.ee/et/tahtajaline-hoius',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 € hoiustaja kohta.',
        rates: [
          'EUR 1 kuu 1,80% (lhv.ee/tahtajaline-hoius)',
          'EUR 3 kuud 2,05% (lhv.ee/tahtajaline-hoius)',
          'EUR 6 kuud 2,15% (lhv.ee/tahtajaline-hoius)',
          'EUR 9 kuud 2,15% (lhv.ee/tahtajaline-hoius)',
          'EUR 12 kuud 2,20% (lhv.ee/tahtajaline-hoius)',
          'EUR 15–24 kuud 2,20% (lhv.ee/tahtajaline-hoius)',
          'USD 12 kuud 1,50% (lhv.ee/tahtajaline-hoius)'
        ],
        details: [
          'Min summa EUR 100 €, USD 500 $ (lhv.ee/tahtajaline-hoius)',
          'Intress makstakse tähtaja lõpus või igakuiselt',
          'Pikemad perioodid (36/60 kuud) ei olnud lehel kuvatud — täpne määr: lhv.ee/tahtajaline-hoius'
        ]
      },
      {
        name: 'Kogumiskonto',
        url: 'https://www.lhv.ee/et/kogumiskonto',
        summary: 'Paindlik kogumiskonto eesmärgipõhiseks säästmiseks, väljavõtt igal ajal ilma teenustasuta.',
        rates: ['Intress 1,65% aastas (lhv.ee/kogumiskonto)'],
        details: [
          'Intressi teenitakse alates 109,10 € jäägist (lhv.ee/kogumiskonto)',
          'Intress arvestatakse päevapõhiselt, makstakse igakuiselt',
          'Ühekordsed sissemaksed, püsikorraldused või mikrosäästmine',
          'Väljavõtt igal ajal ilma teenustasuta'
        ]
      },
      {
        name: 'Nõudmiseni hoius / arvelduskonto intress',
        url: 'https://www.lhv.ee/et/noudmiseni-hoius',
        summary: 'Intress arvelduskonto jäägilt nõudmiseni hoiuse tingimustel.',
        rates: [
          'Eraisik 0,01% aastas (lhv.ee/noudmiseni-hoius)',
          'Juriidiline isik 0,8% aastas summalt üle 20 000 € (lhv.ee/noudmiseni-hoius)'
        ],
        details: [
          'Eraisikul intress alates 18 000 € jäägilt arvelduskontol (lhv.ee/noudmiseni-hoius)',
          'Ettevõttel intress jäägilt üle 20 000 €',
          'Intress makstakse järgmise kuu 5. kuupäeval',
          'Premium-kliendil arvelduskonto intress 1% kuni 100 000 € jäägilt (lhv.ee/premium)'
        ]
      },
      {
        name: 'Investeerimine',
        url: 'https://www.lhv.ee/et/vaartpaberikonto',
        summary: 'Aktsiad, ETF-id, fondid, obligatsioonid. LHV Trader platvorm.',
        rates: [
          'Balti väärtpaberid: kuni 100 tehingut kuus tasuta, edasi 0,2% tehingu summast (lhv.ee/hinnakiri)',
          'Välisaktsiad (nt USA, Saksa): teenustasu 0,14% tehingu summast, min 9 € (lhv.ee/hinnakiri)',
          'Balti väärtpaberite hoidmine tasuta'
        ],
        details: [
          'LHV Trader veeb ja mobiil',
          'LHV pensionifondid ja kolmandate osapoolte fondid',
          'Väärtpaberikonto ja investeerimiskonto',
          'USA aktsiate dividend maksustatakse 15% (lubatud madalam määr)',
          'Mõnel turul lisandub tehingumaks (nt Prantsusmaa 0,4%, UK 0,5%)'
        ]
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://www.lhv.ee/et/pension',
        summary: 'II samba pensionifondid ja III samba vabatahtlik pension.',
        details: ['LHV pensionifondide valik', 'III samba maksusoodustus', 'Pensionikalkulaator veebis']
      },
      {
        name: 'Lapsele konto ja säästmine',
        url: 'https://www.lhv.ee/et/era/lapsele-konto',
        summary: 'Lapsele arvelduskonto ja säästmislahendused.',
        details: ['Vanemate kontroll', 'Säästmine lapse tulevikuks']
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Tavakliendi konto',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'Põhipakett igapäevaseks panganduseks. Konto avamine ja haldamine tasuta.',
        rates: [
          'Konto avamine ja haldamine tasuta (lhv.ee/hinnakiri)',
          'Deebet- või krediitkaart 1 €/kuu (lhv.ee/hinnakiri)',
          'SEPA makse internetis tasuta'
        ],
        details: ['Deebetkaart', 'Internetipank ja mobiilipank']
      },
      {
        name: 'Premium',
        url: 'https://www.lhv.ee/et/premium',
        summary: 'Laiendatud teenuste pakett reisikindlustuse ja lisahüvedega.',
        rates: [
          'Kuutasu 20 €/kuu (lhv.ee/premium)',
          'Üks Premium deebet- või krediitkaart tasuta',
          'Kindlustustooted 20% soodsamalt (kodu, kasko, reis)',
          'Arvelduskonto intress 1% kuni 100 000 € jäägilt',
          'Säästukonto määr 0,5% kõrgem standardhinnast'
        ],
        details: [
          'Pere reisikindlustus',
          'Priority Pass lennujaama ootesaal (kaaslane 35 €/in)',
          'Fast Track turvakontroll (kaardiomanikule tasuta)',
          'Rendiauto kindlustus',
          'Kodulaen ja liising lepingutasuta',
          'Balti väärtpaberite hoidmine tasuta'
        ]
      },
      {
        name: 'Privaatpangandus',
        url: 'https://www.lhv.ee/et/privaatpangandus',
        summary: 'Personaalne privaatpanganduse teenus kõrgeima teenustaseme jaoks.',
        rates: ['Kuutasu 100 €/kuu (lhv.ee/hinnakiri)'],
        details: [
          'Eeldab vähemalt 100 000 € likviidseid varasid (lhv.ee/hinnakiri)',
          'Personaalne kliendihaldur',
          'Premium-paketi hüved'
        ]
      },
      {
        name: 'Noorte pakett',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'Eritingimused noortele (kuni 26 a.).',
        rates: [
          'Deebetkaart alla 26-aastasele tasuta (lhv.ee/hinnakiri)',
          'Alates 65-aastasel deebetkaart tasuta'
        ],
        details: ['Tasuta arveldus', 'LHV noortepakett']
      },
      {
        name: 'Lapse konto',
        url: 'https://www.lhv.ee/et/lapse-konto',
        summary: 'Lapsele arvelduskonto taskuraha ja säästmiseks.',
        details: ['Vanem saab jälgida tehinguid', 'Kaart lapsele võimalik', '(täpsed tasud: lhv.ee/hinnakiri — leht andis 403)']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'Visa deebetkaart, Apple Pay, Google Pay, Garmin Pay.',
        rates: [
          'Standardne deebetkaart 1 €/kuu (lhv.ee/hinnakiri)',
          'Kuldkaart 7 €/kuu',
          'Premium-kaart 15 €/kuu (Premium-lepinguga tasuta)',
          'Alla 26-a ja alates 65-a tasuta'
        ],
        details: ['Virtuaalkaart võimalik', 'Ostukaitse', 'Pettusekaitse 24/7']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.lhv.ee/et/era-krediitkaart',
        summary: 'Visa krediitkaart koos ostukindlustuse ja reisikindlustusega.',
        rates: [
          'Intress 18% aastas (lhv.ee/era-krediitkaart)',
          'Krediidi kulukuse määr (KKM) 19,15% aastas (lhv.ee/era-krediitkaart)',
          'Erakliendi krediitkaart 1 €/kuu, kuldkaart 7 €/kuu',
          'Intressivaba periood: erakliendi kaart 22 päeva, kuld-/partnerkaart kuni 40 päeva'
        ],
        details: ['Krediidilimiit sõltub sissetulekust (kuni ~2 kuu palk)', 'Intressivaba periood']
      },
      {
        name: 'Maksed',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'SEPA maksed, kiirmaksed, püsikorraldused, välismaa maksed.',
        rates: [
          'SEPA makse internetis tasuta (väljuv ja laekuv) (lhv.ee/hinnakiri)',
          'Pangasisene makse tasuta',
          'Välismaksed (SWIFT) ~7–32 € sõltuvalt kulutüübist',
          'Sularaha LHV automaadist tasuta, üle 2000 €/kuus 0,3%',
          'Teise panga automaadist (Eesti) 1 € + 0,3% üle 2000 €/kuus',
          'Sularaha välismaal 2 € + 2,5%'
        ],
        details: ['SEPA Instant', 'Püsikorraldused', 'Välismaa maksed SWIFT']
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.lhv.ee/et/era/kaardid',
        summary: 'Apple Pay, Google Pay, Garmin Pay, Fitbit Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.lhv.ee/et/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine, refinantseerimine.',
        rates: [
          'Intress = individuaalne marginaal + 6 kuu euribor (lhv.ee/kodulaen)',
          'Uue A-/B-energiaklassi kodu (rohelaen) alates 1,49% + 6 kuu euribor (lhv.ee/kodulaen)',
          'Üürikodu (üürikinnisvara) laen alates 1,89% + 6 kuu euribor (lhv.ee/kodulaen)',
          'Lepingutasu 0,5–0,9% laenusummast, min 300 € (lhv.ee/kodulaen)'
        ],
        details: [
          'Laenusumma alates 20 000 €, kuni 85% vara turuväärtusest (lhv.ee/kodulaen)',
          'Periood kuni 30 aastat',
          'Omafinantseering vähemalt 15% (KredEx käendusega alates 10%)',
          'Lasterikkale perele (3+ last alla 19 a) omafinantseering alates 5% KredEx käendusega (2% tasu)',
          'Esimene pakkumine 24 tunni jooksul',
          'Maksepuhkus kuni 12 kuud, ennetähtaegne tagastus tasuta'
        ]
      },
      {
        name: 'Väikelaen',
        url: 'https://www.lhv.ee/et/vaikelaen',
        summary: 'Tagatiseta isiklik laen.',
        rates: [
          'Laenusumma 200–15 000 € (lhv.ee/vaikelaen)',
          'Intress personaalne (lhv.ee/vaikelaen)',
          'Krediidi kulukuse määr (KKM) näidis ~19,67% aastas (lhv.ee/vaikelaen)',
          'Lepingutasu 2% laenusummast, min 29,90 €',
          'Haldustasu 3,99 €/kuus'
        ],
        details: [
          'Periood: kuni 7500 € puhul 6 kuud – 6 aastat; 7500–15 000 € kuni 10 aastat (lhv.ee/vaikelaen)',
          'Fikseeritud kuumakse',
          'Taotlus internetipangas'
        ]
      },
      {
        name: 'Autolaen',
        url: 'https://www.lhv.ee/et/autolaen',
        summary: 'Sõiduki soetamiseks uuele või kasutatud autole.',
        rates: [
          'Laenusumma 200–25 000 € (lhv.ee/autolaen)',
          'Intress personaalne',
          'Lepingutasu 2% laenusummast, min 29,90 €',
          'Haldustasu 3,99 €/kuus'
        ],
        details: ['Sissemakse ei ole kohustuslik', 'Periood 6 kuud – 10 aastat', 'Liising alternatiivina']
      },
      {
        name: 'Liising',
        url: 'https://www.lhv.ee/et/autolaen',
        summary: 'Finants- ja kapitaliliising sõidukitele.',
        rates: [
          'Liisingusumma alates 5000 € (lhv.ee/autolaen)',
          'Intress = personaalne marginaal + 6 kuu euribor',
          'Sissemakse vähemalt 10% vara hinnast',
          'Lepingutasu 1% vara hinnast, min 150 €'
        ],
        details: ['Periood 6 kuud – 7 aastat', 'Kapitali- ja operatiivliising']
      },
      {
        name: 'Krediidikonto / krediitkaardi limiit',
        url: 'https://www.lhv.ee/et/era-krediitkaart',
        summary: 'Paindlik krediit igapäevaseks kasutuseks.',
        rates: [
          'Intress 18% aastas (lhv.ee/hinnakiri, otsingutulemus)',
          'Limiit kuni ~2 kuu palk'
        ],
        details: ['Intress ainult kasutatud summalt', 'Intressivaba periood 22–40 päeva']
      },
      {
        name: 'Õppelaen',
        url: 'https://www.lhv.ee/et/laenud',
        summary: 'Õpingute finantseerimine.',
        details: ['(täpsed tingimused: lhv.ee — leht/info piiratud)']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Reisikindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/reisikindlustus',
        summary: 'Reisikindlustus Premium-paketis või eraldi.',
        rates: ['Premium-kliendile kindlustustooted 20% soodsamalt (lhv.ee/premium)'],
        details: ['Meditsiin, pagas, reisi tühistamine', 'Premium-paketis pere reisikindlustus']
      },
      {
        name: 'Kodukindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/kodukindlustus',
        summary: 'Kodu, koduvara ja vastutuskindlustus.',
        details: ['Erinevad kaitsetasemed', 'Kodulaenu puhul nõutav']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Sõiduki kindlustuslahendused LHV keskkonnas.',
        details: ['Võrdle pakkumisi', 'Liisingu puhul kasko']
      },
      {
        name: 'Õnnetusjuhtumi kindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Trahvide ja invaliidsuse kaitse.'
      },
      {
        name: 'Elukindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Elukindlustus pere kaitsmiseks.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'LHV pakkumised',
        url: 'https://www.lhv.ee/et/era/pakkumised',
        summary: 'Aeg-ajalt kampaaniad uutele ja olemasolevatele klientidele.',
        details: ['Muutuvad tingimused', 'Jälgi lhv.ee pakkumiste lehte']
      },
      {
        name: 'Investeerimiskampaaniad',
        url: 'https://www.lhv.ee/et/investeerimine',
        summary: 'Soodustused tehingutasudel või uutele investoritele.',
        details: ['LHV Trader kampaaniad']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'Ettevõtte arveldus ja igapäevapangandus.',
        details: ['SEPA maksed', 'Mitme kasutaja ligipääs', 'API integratsioonid']
      },
      {
        name: 'Äripaketid',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'Erineva mahuga äripaketid.',
        rates: [
          'Juriidilise isiku arvelduskonto intress 0,8% aastas summalt üle 20 000 € (lhv.ee/noudmiseni-hoius)',
          '(täpsed kuutasud: lhv.ee/hinnakiri — ärikliendi paketihinnad ei olnud automaatpäringule kättesaadavad)'
        ],
        details: ['Kuutasu sõltub mahust', 'Tasuta maksed teatud mahus']
      },
      {
        name: 'Ärilaen ja liising',
        url: 'https://www.lhv.ee/et/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine, käibekapital, investeeringud.',
        details: ['MES kaasfinantseerimine', 'Kinnisvara tagatisel laenud']
      },
      {
        name: 'Makseteenused',
        url: 'https://www.lhv.ee/et/ariklient/makseteenused',
        summary: 'Kaardimaksed, e-kaubandus, POS terminalid.',
        details: ['Visa/Mastercard kaupmehele', 'E-arved ja arvemaksed']
      },
      {
        name: 'Investeerimispangandus',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'Ettevõtte väärtpaberite haldus ja finantseerimine.',
        details: ['IPO ja võlakirjad', 'Suuremate ettevõtete nõustamine']
      },
      {
        name: 'Fintech ja startup',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'LHV on tuntud fintech- ja startup-kliendid.',
        details: ['Kiire konto avamine', 'API ja Open Banking']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Pangateenuste hinnakiri',
        url: 'https://www.lhv.ee/et/hinnakiri',
        summary: 'Erakliendi teenuste hinnakiri.',
        details: ['Pakettide kuutasud', 'Kaartide tasud', 'Maksete hinnad']
      },
      {
        name: 'Tingimused',
        url: 'https://www.lhv.ee/et/tingimused',
        summary: 'Üldtingimused ja infolehed.',
        details: ['Privaatsuspoliitika', 'Teenuse tingimused']
      },
      {
        name: 'Pangakontorid',
        url: 'https://www.lhv.ee/et/kontakt',
        summary: 'Kontorite asukohad ja lahtiolekuajad.',
        details: ['Tallinn, Tartu', 'Videokohtumine võimalik']
      },
      {
        name: 'Open Banking',
        url: 'https://developers.lhv.ee',
        summary: 'LHV avatud panganduse (PSD2) API arendajatele — Berliini grupi standard, nõuab litsentseeritud TPP-d ja eIDAS QWAC serte.'
      },
      {
        name: 'LHV.ai — pangaandmed AI-assistendis',
        url: 'https://lhv.ai',
        summary: 'Ühenda oma LHV konto AI-assistendiga (MCP või REST API) — kontod, saldod ja tehingud loetavad otse tehisintellekti tööriistas.',
        details: [
          'Read-only: assistent EI saa makseid teha ega andmeid muuta',
          'Autentimine OAuth2 + Smart-ID; õigused valid ise (accounts:read ja/või transactions:read)',
          'REST API https://api.lhv.ai/api/v1 (GET /accounts, /accounts/{iban}/transactions); MCP https://mcp.lhv.ai/mcp',
          'Ligipääs kehtib 30 päeva; saab igal ajal tühistada internetipangas (Seaded → Aktiivsed sessioonid)',
          'Tokenid saab https://api.lhv.ai/api-access (Smart-ID login)'
        ]
      }
    ]
  }
];
