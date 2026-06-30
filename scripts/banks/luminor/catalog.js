/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/*
 * ALLIKAD (kontrollitud 27.06.2026):
 * - Luminori erakliendi hinnakiri (avalik PDF, kehtib alates 30.11.2020):
 *   https://luminor.ee/s3fs-public/documents/pricelist_22_private_et-ee_0.pdf
 *   NB! See on kõige hilisem AVALIKULT PDF-ina kättesaadav erakliendi hinnakiri; uuemad
 *   tasud on luminor.ee dünaamilisel (SPA/JS) lehel, mida automaatne scrape ei loe.
 *   Kõik selle PDF-i numbrid on allpool märkega "(hinnakiri 30.11.2020)".
 * - Hoiuste intressibaromeeter (Minuraha, jooksev 2026):
 *   https://minuraha.ee/et/pangandus/hoiused/hoiuste-intressibaromeeter
 * - Liising/laen: https://www.maksetingimused.ee/financers/luminor-liising
 * - Omafinantseeringu reeglid: Eesti Pank / EIS (KredEx) käendus.
 * BLOKEERITUD/LEIDMATA: luminor.ee tootelehed (kodulaen, hoiused jms) renderdavad
 * vaid sõna "Luminor" (JS-leht) -> täpsed jooksvad intressid/marginaalid leidmata.
 */

/** @type {CatalogSection[]} */
export const LUMINOR_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://luminor.ee/era/tahtajaline-hoius',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 € hoiustaja kohta.',
        rates: [
          '12 kuud: ~2,0% aastas (Minuraha intressibaromeeter, jooksev 2026)',
          'Min summa 100 € (Minuraha intressibaromeeter)',
          'Hoiuse avamine ja sularaha sissemakse avamiseks: tasuta (hinnakiri 30.11.2020)',
          'Täpsed jooksvad määrad: luminor.ee/intressi-ja-viivisemaarad (JS-leht, scrape ebausaldusväärne)'
        ],
        details: [
          'Intress fikseeritud kogu hoiuperioodiks',
          'Ülekanne hoiusekontolt arvelduskontole: 1. kord kuus tasuta, järgmised 0,30% summast, min 1,60 € (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Reservhoius (kogumishoius)',
        url: 'https://luminor.ee/era/reservhoius',
        summary: 'Paindlik kogumishoius, kuhu saab raha lisada ja sealt välja võtta.',
        rates: ['Intress ~1,65% aastas (360-päevase aasta baasil, allikas: 2026 võrdlus/otsingutulemus)'],
        details: [
          'Sularaha sissemakse oma reservhoiuse kontole kontoris: tasuta (hinnakiri 30.11.2020)',
          'Esimene väljamakse kuus tasuta, järgmised 0,30% summast, min 1,60 € (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Kogumishoius (vana toode)',
        url: 'https://luminor.ee/era/kogumishoius',
        summary: 'Igakuise sissemaksega kogumishoius.',
        details: [
          'Uusi lepinguid ei sõlmita alates 01.03.2020 (otsingutulemus 2026)',
          'Olemasolevad lepingud kehtivad edasi'
        ]
      },
      {
        name: 'Säästmine ja lapsele säästmine',
        url: 'https://luminor.ee/era/saastmine',
        summary: 'Säästmislahendused, sh lapse tuleviku jaoks (Lastehoius).',
        details: [
          'Sularaha sissemakse Lastehoiuse kontole kontoris: tasuta (hinnakiri 30.11.2020)',
          'Tagatud Tagatisfondi poolt kuni 100 000 €'
        ]
      },
      {
        name: 'Investeerimine (Luminor Investor)',
        url: 'https://luminor.ee/era/investor',
        summary: 'Aktsiad, ETF-id, fondid ja võlakirjad Luminor Investori platvormil.',
        rates: [
          'Eesti aktsiatehingud: 0,20%, min 3,20 € (hinnakiri 30.11.2020)',
          'Lääne-Euroopa/USA aktsiad: 0,20%, min 20 € (hinnakiri 30.11.2020)',
          'Investeerimine fondidesse: vahendustasu 1% investeeritud summalt (hinnakiri 30.11.2020)',
          'Investeerimine võlakirjadesse: 0,20% tehingu summalt, min 15 € (hinnakiri 30.11.2020)',
          'Väärtpaberite hoidmistasu: 0,01% summast, min 0,50 €/kuu (hinnakiri 30.11.2020)'
        ],
        details: [
          'Luminor Bank väärtpaberikonto avamine: tasuta; Nasdaq CSD konto avamine: 4 € (hinnakiri 30.11.2020)',
          'Väärtpaberite ülekanne teise panka: 30 € ISIN kohta (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://luminor.ee/era/pension',
        summary: 'II samba kohustuslik kogumispension ja III samba vabatahtlik pension.',
        rates: [
          'III sammas: osakute müük 3,20 €, osakute vahetamine 3,20 € (hinnakiri 30.11.2020)',
          'II sammas: ühekordse väljamakse avaldus 4 €, fondipensioni avaldus 6 € (hinnakiri 30.11.2020)',
          'II sammas: valikuavaldus ja osakute vahetamise avaldus tasuta (hinnakiri 30.11.2020)'
        ],
        details: ['Fonditehingutele lisanduvad fondiprospektis kehtestatud väljalaske- ja tagasivõtmistasud']
      }
    ]
  },
  {
    title: 'Igapäevapangandus – arvelduspaketid',
    items: [
      {
        name: 'Arvelduspakett',
        url: 'https://luminor.ee/era/erakliendi-arvelduspakett',
        summary: 'Põhipakett igapäevaseks pangateenuseks koos Visa Debit kaardiga.',
        rates: [
          'Kuutasu: 2,20 € (hinnakiri 30.11.2020)',
          'Seenioridele (alates 60. eluaastast): tasuta (hinnakiri 30.11.2020)',
          'Noortele (kuni 21. eluaastani): tasuta (hinnakiri 30.11.2020)'
        ],
        details: [
          'Sisaldab: 1 Visa Debit kaart, internetipank (tasuta), piiramatu arv makseid internetipangas',
          'Sularaha väljamakse Luminori automaadist: kuni 600 € kuus tasuta, üle selle 0,20% (min 3,50 €) (hinnakiri 30.11.2020)',
          'Sularaha väljamakse teiste automaatidest Baltikumis/välismaal: 2% (min 3,50 €) (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Arvelduspakett Black',
        url: 'https://luminor.ee/era/erakliendi-arvelduspakett',
        summary: 'Laiendatud pakett koos Luminor Black krediitkaardiga.',
        rates: ['Kuutasu: 5,50 € (sisaldab Luminor Black kaardi ja arvelduspaketi standardse kuutasu) (hinnakiri 30.11.2020)'],
        details: [
          'Sisaldab: 1 Visa Debit kaart + 1 Luminor Black kaart, internetipank',
          'Luminor Black sularaha väljamakse: kuni 400 € kuus tasuta Baltikumis/välismaal, üle selle 2% (min 3,50 €) (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Arvelduspakett Gold (vana, ei väljastata)',
        url: 'https://luminor.ee/era/erakliendi-arvelduspakett',
        summary: 'Visa Debit + Visa Gold krediitkaart.',
        rates: ['Kuutasu: 6,50 € (hinnakiri 30.11.2020)'],
        details: ['Uusi pakette ei väljastata (hinnakiri 30.11.2020)', 'Sisaldab 1 Visa Debit ja 1 Visa Gold kaart']
      },
      {
        name: 'Arvelduskonto avamine ja sulgemine',
        url: 'https://luminor.ee/era/hinnakiri',
        summary: 'Konto avamine ja sulgemine.',
        rates: [
          'Konto avamine EMP residentidele: tasuta (hinnakiri 30.11.2020)',
          'Väljaspoolt EMP riike taotluse/dokumentide kontroll: 250 € (hinnakiri 30.11.2020)',
          'Konto sulgemine kliendi soovil: tasuta; panga algatusel kuni 100 € (hinnakiri 30.11.2020)'
        ],
        details: ['Internetipank: igakuine haldustasu tasuta; alla 20-aastastele tasuta (hinnakiri 30.11.2020)']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Mastercard / Visa Debit (deebetkaart)',
        url: 'https://luminor.ee/era/kaardid',
        summary: 'Deebetkaart koos nutimaksetega (Apple Pay, Google Pay).',
        rates: [
          'Kuutasu: 1,50 € (hinnakiri 30.11.2020)',
          'Tasuta alla 20-aastasele ja üle 60-aastasele (põhikaart) (hinnakiri 30.11.2020)',
          'Kuutasu ei võeta, kui kaardiga ostud vähemalt 600 €/kuus (hinnakiri 30.11.2020)',
          'Konverteerimistasu välisvaluuta tehingult: 2% summast (hinnakiri 30.11.2020)',
          'Kaardi asendamistasu: 4 €; kiirkorras tellimine: 35 € (hinnakiri 30.11.2020)'
        ],
        details: ['Sularaha väljavõtt teiste pankade automaatidest Eestis: 1,30 € (hinnakiri 30.11.2020)']
      },
      {
        name: 'Mastercard Gold (krediitkaart)',
        url: 'https://luminor.ee/era/kaardid',
        summary: 'Krediitkaart koos reisikindlustusega.',
        rates: ['Kuutasu: 5 € (hinnakiri 30.11.2020)', 'Konverteerimistasu välisvaluutas: 2% (hinnakiri 30.11.2020)'],
        details: ['Mastercardi abiteenus välismaal (ajutine kaart): tegelikud kulud, max 129 € (hinnakiri 30.11.2020)']
      },
      {
        name: 'Mastercard Platinum',
        url: 'https://luminor.ee/era/kaardid',
        summary: 'Tippkrediitkaart lisahüvedega (Priority Pass).',
        rates: [
          'Aastatasu: 150 € (hinnakiri 30.11.2020)',
          'Priority Pass salongikülastus alates 5. korrast aastas: 27 € (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Mastercard Credit (krediitkaart)',
        url: 'https://luminor.ee/era/kaardid',
        summary: 'Tavakrediitkaart.',
        rates: [
          'Kuutasu: 1,40 € (hinnakiri 30.11.2020)',
          'Kuutasu ei võeta, kui krediitkaardiga ostud vähemalt 400 €/kuus (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Maksed',
        url: 'https://luminor.ee/era/maksed',
        summary: 'SEPA euromaksed, kiirmaksed, välismaksed, püsikorraldused.',
        rates: [
          'Euromakse Eestisse/EU-EEA internetipangas: 0,38 €; kontoris/telefonipangas: 3 € (hinnakiri 30.11.2020)',
          'Euromakse kiirmaksena teise panka Eestis: 10 € (internetipank) / 20 € (kontor) (hinnakiri 30.11.2020)',
          'Pangasisene makse Luminori kontode vahel: tasuta (internetipank) / 2 € (kontor) (hinnakiri 30.11.2020)',
          'Välismakse (väljapoole EU-EEA / välisvaluutas): 5 € internetipangas, 11,50 € kontoris (hinnakiri 30.11.2020)',
          'Välismakse kiirmaksena: 11 € internetipangas, 17,50 € kontoris (hinnakiri 30.11.2020)',
          'Laekuv euromakse Eestist/EU-EEA-st: tasuta; muu välismakse laekumine: 5,75 € (hinnakiri 30.11.2020)',
          'Euromakse püsikorralduse alusel: 0,38 € (hinnakiri 30.11.2020)'
        ],
        details: ['SWIFT/XML koopia ja maksejuhise kinnitus: 10 € (hinnakiri 30.11.2020)']
      },
      {
        name: 'Nutimaksed',
        url: 'https://luminor.ee/era/kaardid',
        summary: 'Apple Pay, Google Pay, Garmin Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen (eluasemelaen)',
        url: 'https://luminor.ee/era/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine. Ujuv intress (Euribor + marginaal).',
        rates: [
          'Lepingutasu: 1% laenusummast (või täiendavast summast), min 300 € (hinnakiri 30.11.2020)',
          'Laenulepingu tingimuste muutmine: 200 € (hinnakiri 30.11.2020)',
          'Marginaal: individuaalne, sõltub kliendiprofiilist (täpne määr leidmata — JS-leht)'
        ],
        details: [
          'Omafinantseering tavaliselt min 15% (Eesti Panga nõue)',
          'EIS (KredEx) käendusega noortele peredele/spetsialistidele alates 10% (otsingutulemus)',
          'Paljulapselistele peredele võib omafinantseering olla kuni 5% (otsingutulemus)',
          'Ennetähtaegne tagastamine: vähemalt 3-kuulise etteteatamise korral tasuta (hinnakiri 30.11.2020)'
        ]
      },
      {
        name: 'Väikelaen (tarbimislaen)',
        url: 'https://luminor.ee/era/vaikelaen',
        summary: 'Tagatiseta isiklik laen fikseeritud kuumaksega.',
        rates: ['Lepingutasu: 1,50% laenusummast, min 60 € (hinnakiri 30.11.2020)'],
        details: ['Igakuise maksetähtpäeva või seotud konto muutmine: 50 € (hinnakiri 30.11.2020)']
      },
      {
        name: 'Autolaen',
        url: 'https://luminor.ee/era/autolaen',
        summary: 'Uue ja kasutatud sõiduki soetamiseks.',
        rates: ['Lepingutasu: 1,50% laenusummast, min 60 € (hinnakiri 30.11.2020)']
      },
      {
        name: 'Liising',
        url: 'https://luminor.ee/era/liising',
        summary: 'Sõiduki finants- (kapitalirent) ja kasutusrent (operatiivliising).',
        rates: [
          'Summa 8 000 – 100 000 € (maksetingimused.ee)',
          'Intress alates 6,2% (maksetingimused.ee)',
          'Periood kuni 84 kuud (maksetingimused.ee)',
          'Lepingu sõlmimise tasu: 1% soetamishinnast, min 200 € (hinnakiri 30.11.2020 / maksetingimused.ee)',
          'Omafinantseering (sissemakse): 10% (maksetingimused.ee)'
        ],
        details: ['Sõiduki vanus kuni 13 aastat liisinguperioodi lõpuks; kindlustus kohustuslik (maksetingimused.ee)']
      },
      {
        name: 'Õppelaen (vana, ei väljastata)',
        url: 'https://luminor.ee/era/hinnakiri',
        summary: 'Vana õppelaen (uusi lepinguid ei sõlmita).',
        rates: ['Intressimäär 5% aastas (hinnakiri 30.11.2020)', 'Lepingu tingimuste muutmine: 5 € (hinnakiri 30.11.2020)']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://luminor.ee/era/kindlustus',
        summary: 'Kodu ja koduvara kindlustus erinevate kaitsetasemetega.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://luminor.ee/era/kindlustus',
        summary: 'Reisi- ja tervisekindlustus; sisaldub osades kaardipakettides (nt Mastercard Gold).'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://luminor.ee/era/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.'
      },
      {
        name: 'Õnnetusjuhtumi- ja elukindlustus',
        url: 'https://luminor.ee/era/kindlustus',
        summary: 'Õnnetusjuhtumi- ja elukindlustuse lahendused.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'Luminor pakkumised',
        url: 'https://luminor.ee/era',
        summary: 'Partnerite soodustused ja muutuvad kampaaniad (täpsed tingimused JS-lehel).'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto ja äripaketid',
        url: 'https://luminor.ee/ari',
        summary: 'Ettevõtte arveldus, mitme kasutaja ligipääs, SEPA maksed.',
        details: [
          'Ärikliendi hinnakiri avaldatakse eraldi PDF-ina (pricelist_*_business_et-ee.pdf)',
          'Täpsed paketi kuutasud sõltuvad mahust (JS-leht / hinnakirja PDF)'
        ]
      },
      {
        name: 'Ärilaen ja liising',
        url: 'https://luminor.ee/ari',
        summary: 'Ettevõtte finantseerimine: investeerimislaen, käibekapital, liising, faktooring.'
      },
      {
        name: 'Kaardimaksed (kaupmehele)',
        url: 'https://luminor.ee/ari',
        summary: 'POS-terminalid ja e-kaubanduse kaardimaksed (Visa/Mastercard).'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://luminor.ee/era/hinnakiri',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri.',
        details: [
          'Avalik erakliendi hinnakiri PDF (kehtib alates 30.11.2020): luminor.ee/s3fs-public/documents/pricelist_22_private_et-ee_0.pdf',
          'Jooksvad tasud luminor.ee dünaamilisel lehel (SPA/JS — automaatne scrape ebausaldusväärne)'
        ]
      },
      {
        name: 'Intressi- ja viivistemäärad',
        url: 'https://luminor.ee/intressi-ja-viivisemaarad',
        summary: 'Hoiuste ja laenude jooksvad intressimäärad (SPA/JS leht).',
        rates: [
          'Viivise määr: 0,20% päevas (hinnakiri 30.11.2020)',
          'Hoiuste määrad jooksvalt: Minuraha intressibaromeeter'
        ],
        details: ['Dünaamiline leht — sisu ei renderdu automaatsele scrape-le']
      },
      {
        name: 'Pangakontorid ja klienditugi',
        url: 'https://luminor.ee/era/kontakt',
        summary: 'Kontorite asukohad ja klienditugi. Telefon +372 628 3300.'
      }
    ]
  }
];
