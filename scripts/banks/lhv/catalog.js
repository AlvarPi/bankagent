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
        summary:
          'Paindlik kogumiskonto eesmärgipõhiseks säästmiseks, väljavõtt igal ajal ilma teenustasuta.',
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
        url: 'https://www.lhv.ee/et/teine-sammas',
        summary:
          'LHV pensionifondid II ja III sambas (sh passiivsed indeksfondid) ning pensioni investeerimiskonto. (Allikas: lhv.ee/teine-sammas, lhv.ee/pension, 24.11.2026)',
        details: [
          'II sammas: 2%, 4% või 6% brutopalgast + riik 4%',
          'III sammas: tulumaksuvaba kuni 15% brutotulust, max 6000 €/aastas',
          'Pensioni investeerimiskonto (oma valitud väärtpaberid)',
          'Pensionikalkulaator veebis'
        ]
      },
      {
        name: 'Lapsele konto ja säästmine',
        url: 'https://www.lhv.ee/et/lapsekonto',
        summary:
          'Lapsekonto + Kasvukonto lapsele: investeerimine alates 1 €, ostutehingud kuni 26. eluaastani tasuta; väärtpaberite kinkekaart. (Allikas: lhv.ee/lapsekonto, lhv.ee/kasvukonto, 24.11.2026)',
        rates: ['Kogumiskonto 2,00% aastas', 'Kasvukonto alla 26-a: ostu- ja haldustasu 0 €'],
        details: [
          'Pikaaegsete Kasvukonto klientide keskmine tootlus ~8% aastas (ajalooline, ei ole garantii)',
          'Balti väärtpaberikonto lapsele tasuta',
          'USA aktsiate jaoks W8 vorm lapse nimel'
        ]
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
        name: 'Noortepank / Noortekaart',
        url: 'https://www.lhv.ee/et/noortepank',
        summary:
          '6–25-aastastele teenustasudeta Noortekaart (taastöödeldud plast), tasuta maksed, Kasvukonto ostu- ja haldustasuta, mikroinvesteerimine, virtuaalne ISIC. (Allikas: lhv.ee/noortepank, 24.11.2026)',
        rates: [
          'Kuutasu alla 26-a 0 €, alates 26 a 1 €',
          'LHV automaadist sularaha tasuta (+0,3% üle 2000 €/kuus)',
          'Teise panga automaat EMP-s 1 €; mujal 2 € + 2,5%',
          'Konverteerimistasu välisvaluutas 1%',
          'Alates 65 a deebetkaart tasuta'
        ],
        details: [
          'Ostukindlustus 180 päeva, ostud 100–5000 €, omavastutus 30 €, aastas kuni 10 000 €',
          'Kampaania „Sajaga edasi” 2026: ≥15 kaardimakset kuus → loos 100 € + 100 € Kasvukontole',
          'Partnersoodustused: Bangbang −20%, kinopiletid 5 €, VLND −15%, MyFitness+ 54 €'
        ]
      },
      {
        name: 'Lapse konto',
        url: 'https://www.lhv.ee/et/lapsekonto',
        summary:
          'Tasuta lapsekonto kuni 17-aastasele (k.a), avab esindusõigusega vanem. Noortekaart alates 6. eluaastast, tasuta kuni 26. eluaastani. (Allikas: lhv.ee/lapsekonto, 24.11.2026)',
        rates: ['Konto avamine ja kasutamine tasuta', 'Noortekaart 0 €/kuus (alla 26-a)'],
        details: [
          'Alates 7. eluaastast saab vanem lubada lapsel ise makseid teha',
          'Vanemal ülevaade kuni lapse täisealisuseni',
          'Kaart saadetakse postiga koju'
        ]
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
        url: 'https://www.lhv.ee/et/apple-pay',
        summary:
          'LHV kaardid Apple Pay ja Google Pay rakendustes; LHV tõi esimesena Eestis klientideni Click to Pay. (Allikas: lhv.ee/apple-pay, lhv.ee/google-pay, lhv.ee/click-to-pay)',
        details: [
          'Apple Pay alates 13. eluaastast',
          'Click to Pay e-poodides',
          'Mikroannetus ja mikroinvesteerimine kaardimaksetega'
        ]
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
        rates: ['Intress 18% aastas (lhv.ee/hinnakiri, otsingutulemus)', 'Limiit kuni ~2 kuu palk'],
        details: ['Intress ainult kasutatud summalt', 'Intressivaba periood 22–40 päeva']
      },
      {
        name: 'Õppelaen',
        url: 'https://www.lhv.ee/et/oppelaen',
        summary:
          'Riigi tagatud õppelaen — väljamaksed 15.09–31.05, laenuotsus 3 tööpäevaga. Tingimused muutusid 01.09.2026 (intress soodsam). (Allikas: lhv.ee/oppelaen, 24.11.2026)',
        rates: [
          'Intress 1,45% + 6 kuu EURIBOR',
          'Kuni 6000 € õppeaastas (alla 9 kuu õpe: 3000 €)',
          'Lepingu sõlmimine ja muutmine tasuta',
          'KKM näide 5,14% aastas'
        ],
        details: [
          'Põhiosa tagasimaksmine 12–18 kuud pärast lõpetamist',
          'Õpingute ajal makstakse 1. novembril ainult intressi',
          'Peatamine lapsehoolduspuhkuse, ajateenistuse, residentuuri ajal',
          'oppelaen@lhv.ee, 699 9118'
        ]
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Reisikindlustus',
        url: 'https://www.lhv.ee/et/reisikindlustus',
        summary: 'Reisikindlustus Premium-paketis või eraldi.',
        rates: ['Premium-kliendile kindlustustooted 20% soodsamalt (lhv.ee/premium)'],
        details: ['Meditsiin, pagas, reisi tühistamine', 'Premium-paketis pere reisikindlustus']
      },
      {
        name: 'Kodukindlustus',
        url: 'https://www.lhv.ee/et/kodukindlustus',
        summary:
          'LHV Kindlustuse kodukindlustus — paketid Start Kodu (valitud riskid), Standard Kodu (sh seadmerike) ja Premium Kodu; uued tingimused alates 16.12.2024. (Allikas: lhv.ee/kodukindlustus, 24.11.2026)',
        rates: ['Premium-kliendile 20% soodsam'],
        details: [
          'Kaasaskantav vara vähemalt 3000 € ulatuses kogu maailmas',
          'Sademevee läbijooks kuni 10 000 € (Premium Kodu)',
          'Asenduselukoht, kodulaenu maksed, üüritulu kuni 6000/10 000 €',
          'Ehitustöö kahjul omavastutus 1000 €',
          'Koduabi ööpäev läbi 680 1122'
        ]
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.lhv.ee/et/kaskokindlustus',
        summary:
          'LHV Kindlustuse liikluskindlustus (kohustuslik) ja kaskokindlustus. (Allikas: lhv.ee/liikluskindlustus, lhv.ee/kaskokindlustus, 24.11.2026)',
        details: [
          'Kasko: tasuta autoabi ja puksiirabi',
          '2 kahjuvaba aastat → esimese kahju omavastutus 50% soodsam',
          'Rohelised kaardid ei kehti RU ja BY alates 01.06.2023',
          'Premium-kliendile kindlustus 20% soodsam'
        ]
      },
      {
        name: 'Tervise- ja õnnetusjuhtumikindlustus',
        url: 'https://www.lhv.ee/et/tervisekindlustus',
        summary:
          'LHV Kindlustuse tervisekindlustus (sh Confido terviselahendus) ning lisaks seadme-, küber- ja laenumaksekindlustus. (Allikas: lhv.ee sitemap: tervisekindlustus, seadmekindlustus, kyberkindlustus, laenumaksekindlustus)'
      },
      {
        name: 'Laenumaksekindlustus',
        url: 'https://www.lhv.ee/et/laenumaksekindlustus',
        summary:
          'Laenumaksekindlustus kodulaenu ja teiste laenude maksete kaitseks (LHV Kindlustus). (Allikas: lhv.ee/laenumaksekindlustus)'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'LHV pakkumised',
        url: 'https://www.lhv.ee/et/palgakampaania-2026',
        summary:
          'Palgakampaania 2026: valitud erakliendid, kelle palk/pension/vanemahüvitis hakkab laekuma LHV-sse 60 päeva jooksul eripakkumise saamisest, saavad auhinna; väljamaksed 05.02.2026–05.01.2027. (Allikas: lhv.ee/palgakampaania-2026)',
        details: [
          'Arvesse lähevad palk, pension, vanemahüvitis (selgitusega)',
          'Auhinna maksud tasub LHV',
          'Lisaks soovituskampaania (lhv.ee/soovita) ja Noortepanga kampaania'
        ]
      },
      {
        name: 'Kasvukonto',
        url: 'https://www.lhv.ee/et/kasvukonto',
        summary:
          'Lihtsaim viis pikaajaliseks investeerimiseks: fondid või üksikaktsiad alates 1 €, LHV teeb tehingud; mikroinvesteerimine ümardab iga kaardimakse. (Allikas: lhv.ee/kasvukonto, 24.11.2026)',
        rates: [
          'Ostutehingu tasu 0,5% (LHV fondid tasuta, alla 26-a tasuta)',
          'Müügitasu 0,14%, min 5 € (kodulaenu sissemakseks 0 €)',
          'Haldustasu 0,01% kuus + km; 1. aasta tasuta; alla 26-a 0 €'
        ],
        details: [
          'Mikroinvesteerimine: keskmiselt 1,1 €/päevas',
          'Valik laienes 2026: AI, kaitsetööstus, kosmos'
        ]
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.lhv.ee/et/ariklient',
        summary:
          'Ettevõtte arvelduskonto: tasuta Euroopa-sisesed ülekanded, LHV Connect (API) tasuta, LinkPay makselingid. Kontojäägilt üle 20 000 € automaatne nõudmiseni hoiuse intress. (Allikas: lhv.ee/ariklient, 24.11.2026)',
        rates: ['Konto kuutasu 0 €', 'Ärikaart 2,00 €/kuus', 'Jäägilt üle 20 000 €: 0,8% aastas'],
        details: [
          'Euroopa maksed tasuta',
          'LHV Connect ärikliendile tasuta',
          'Ettevõtluskonto (FIE / ettevõtlik eraisik)',
          'Mikrolaenul omafinantseering 0%'
        ]
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
        url: 'https://www.lhv.ee/et/arilaen',
        summary:
          'Ärilaen, käibekapitalilaen, arvelduslaen, investeerimislaen, mikrolaen, faktooring, garantiid, liising ja ettevõtete omandamise rahastamine; EIS/EIF käendused. (Allikas: lhv.ee sitemap — arilaen, kaibekapitalilaen, arvelduslaen, faktooring, garantiid, mikrolaen)',
        details: [
          'Mikrolaen omafinantseeringuta',
          'Akreditiiv ja dokumentaalinkasso',
          'Intressi- ja valuutariski maandamine'
        ]
      },
      {
        name: 'Makseteenused',
        url: 'https://www.lhv.ee/et/maksekaartide-teenindamise-tasud',
        summary:
          'Kaupmehele kaardimaksete vastuvõtt (terminal, e-kaubandus), LinkPay makselingid, pangalink, maksete kogumine, sularahavedu. (Allikas: lhv.ee/maksekaartide-teenindamise-tasud, lhv.ee/maksete-kogumine)',
        details: [
          'Makseterminal ka hooajaks',
          'Google Pay ja Apple Pay e-poes',
          'Kaardimaksete kogukulu kalkulaator'
        ]
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
        url: 'https://www.lhv.ee/et/uldtingimused',
        summary:
          'LHV üldtingimused ja teenuste tingimused; hinnakirja viimane versioon 05.11.2026. (Allikas: lhv.ee/uldtingimused, lhv.ee/hinnakiri-05-11-2026)',
        details: ['Privaatsuspoliitika', 'Teenuse tingimused']
      },
      {
        name: 'Pangakontorid',
        url: 'https://www.lhv.ee/et/kus-asub',
        summary:
          'LHV peakontor Tartu mnt 2, Tallinn. Klienditugi 6 800 400, info@lhv.ee; kindlustuse/reisiabi ööpäev läbi 680 1122. (Allikas: lhv.ee/kontakt)',
        details: ['Kohtumise broneerimine veebis (lhv.ee/broneeri-kohtumine)', 'Õppelaen 699 9118']
      },
      {
        name: 'LHV.ai — pangaandmed AI-assistendis',
        url: 'https://lhv.ai',
        summary:
          'Ühenda oma LHV konto AI-assistendiga (MCP või REST API) — kontod, saldod ja tehingud loetavad otse tehisintellekti tööriistas.',
        details: [
          'Read-only: assistent EI saa makseid teha ega andmeid muuta',
          'Autentimine OAuth2 + Smart-ID; õigused valid ise (accounts:read ja/või transactions:read)',
          'REST API https://api.lhv.ai/api/v1 (GET /accounts, /accounts/{iban}/transactions); MCP https://mcp.lhv.ai/mcp',
          'Ligipääs kehtib 30 päeva; saab igal ajal tühistada internetipangas (Seaded → Aktiivsed sessioonid)',
          'Tokenid saab https://api.lhv.ai/api-access (Smart-ID login)'
        ]
      }
    ]
  },
  {
    title: 'API ja andmeühendused',
    items: [
      {
        name: 'API, Open Banking ja MCP',
        url: 'https://www.lhv.ee/et/open-banking',
        summary:
          'LHV-l on ainsana Eesti pankadest ametlik MCP server (mcp.lhv.ai/mcp, OAuth; list_accounts, get_balances, get_account_statement) ja REST API (lhv.ai) — Claude/Cursori jaoks oma kontoandmetele. Lisaks PSD2 Open Banking API ja LHV Connect ärikliendile. Avalikku hinna-API-t ei ole. (Allikas: lhv.ee/en/news/2026/36, lhv.ee/et/open-banking, 24.11.2026)',
        details: [
          'MCP: https://mcp.lhv.ai/mcp (vastab 401 ilma tokenita — töötab)',
          'Token 1 h, refresh 30 päeva',
          'Sandbox olemas (Enable Banking)'
        ]
      }
    ]
  }
];
