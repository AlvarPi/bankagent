/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */

/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const COOP_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.cooppank.ee/eraklient/raha-kasvatamine/hoiuste-intressid',
        summary:
          'Tähtajaline hoius alates 100 €, periood 1 kuu – 10 aastat (1–120 kuud), ainult EUR. Hoius tagatud Tagatisfondi poolt kuni 100 000 € hoiustaja kohta. Lisamakseid perioodi jooksul teha ei saa; võimalik automaatne pikenemine. (Allikas: cooppank.ee/eraklient/raha-kasvatamine/hoiuste-intressid, kehtivad alates 27.05.2026)',
        rates: [
          '1–2 kuud: 1,80% (kehtiv alates 27.05.2026)',
          '3–5 kuud: 2,05%',
          '6–8 kuud: 2,10%',
          '9–11 kuud: 2,10%',
          '12+ kuud (12–120 kuud): 2,15%',
          'Igakuise intressimakse korral on intressimäärad −0,05% võrra väiksemad',
          'Hoiuseintressid on eraisikule tulumaksuga maksustatavad (alates 01.01.2018)'
        ]
      },
      {
        name: 'Rahasahtel',
        url: 'https://www.cooppank.ee/eraklient/raha-kasvatamine/rahasahtel',
        summary:
          'Automatiseeritud säästmine: tehingute ümardamine järgmise euroni või kindla summa kogumine igalt tehingult, püsikorraldus (päevane/nädalane/kuine/kvartalne) ja ühekordsed sissemaksed. Kogutud raha saab teenustasuta kontole kanda järgmiseks päevaks; kohe kasutamiseks teenustasu hinnakirja alusel. Tagatud kuni 100 000 € hoiustaja kohta. (Allikas: cooppank.ee/eraklient/raha-kasvatamine/rahasahtel)',
        rates: ['2,0% aastas (kehtiv alates 30.10.2023, päevajäägilt)']
      },
      {
        name: 'Lastehoius',
        url: 'https://www.cooppank.ee/eraklient/raha-kasvatamine/lastehoius',
        summary:
          'Lapsele raha kogumine kuni 18 aastaks. Pank lisab 50 € stardikapitali. Haldustasud puuduvad. (Allikas: cooppank.ee/eraklient/raha-kasvatamine/hoiuste-intressid)',
        rates: ['2,0% aastas (kehtiv alates 01.06.2025, päevajäägilt)', '50 € stardiboonus']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.cooppank.ee/eraklient/raha-kasvatamine/investeerimine',
        summary: 'Investeerimislahendused ja elustiilile sobiv kogumine.'
      },
      {
        name: 'Tuleva pensionifondid',
        url: 'https://www.cooppank.ee/eraklient/raha-kasvatamine/tuleva-ii-samba-pensionifondid',
        summary: 'II ja III samba pensionifondid (Tuleva).'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Lihtne',
        url: 'https://www.cooppank.ee/info/kkk/paketid',
        summary:
          'Tasuta pakett (0 €/kuus) kõigile: kontohaldus, Eesti- ja Euroopa-sisesed maksed (sh välkmaksed) internetipangas, püsikorraldus, e-arve püsimakse ja virtuaalkaart. Plastikust deebetkaardi lisamine 1 €/kuus. (Allikas: cooppank.ee/info/kkk/paketid)',
        rates: ['Kuutasu 0 €', 'Plastikust deebetkaart +1 €/kuus'],
        details: ['Sobib igapäevaseks arvelduseks minimaalse hüvepaketiga.']
      },
      {
        name: 'Kasulik',
        url: 'https://www.cooppank.ee/info/kkk/paketid',
        summary:
          'Kuutasu 1,49 €/kuus (sõltumata teenuste kasutamisest). Sisaldab kõike Lihtne paketist, lisaks 1% ostupreemia Coopi kauplustes selle kaardiga ostes ning laia sularahavõrgustiku. Tasuta kuni 26-aastastele (k.a) ja üle 65-aastastele (k.a). (Allikas: cooppank.ee/info/kkk/paketid)',
        rates: [
          'Kuutasu 1,49 €/kuus',
          '1% ostupreemia Coopi ostudelt (kaardiga makstes)',
          'Tasuta kuni 26-aastastele ja üle 65-aastastele'
        ]
      },
      {
        name: 'Piirideta',
        url: 'https://www.cooppank.ee/info/kkk/paketid',
        summary:
          'Reisikindlustust sisaldav pakett kuutasuga 6,99 €/kuus kõigile. Sisaldab isiklikku reisikindlustust maailmas (v.a kindlustatu elukoht, Venemaa, Ukraina, Valgevene), ostupreemiat ja kõiki Kasulik paketi hüvesid. (Allikas: cooppank.ee/info/kkk/paketid)',
        rates: ['Kuutasu 6,99 €/kuus', 'Isiklik reisikindlustus maailmas (v.a elukoht, RU/UA/BY)']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.cooppank.ee/eraklient/igapaevapangandus/kaardid/deebetkaart',
        summary:
          'Ostukindlustusega deebetkaart; ühtlasi Coopi ja Alexela kliendikaart. Virtuaalkaart tasuta, plastikkaart 1 €/kuus. Sularaha välja- ja sissemakse Coopi kauplustes tasuta; sularaha väljavõtt teiste pankade automaatidest üle Eesti tasuta. (Allikas: coop.ee/coop-panga-eraisiku-deebetkaart-ja-krediitkaart)',
        rates: ['Virtuaalkaart 0 €', 'Plastikkaart 1 €/kuus', 'Sularaha Coopi kassast ja Eesti automaatidest tasuta']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.cooppank.ee/eraklient/igapaevapangandus/kaardid/krediitkaart',
        summary:
          'Paindlik krediitkaart krediidilimiidiga kuni 5000 €, intressivaba periood kuni 40 päeva. Virtuaalkaart tasuta, plastikkaart 1 €/kuus; kaardi saatmine, blokeerimine ja sulgemine tasuta. (Allikas: cooppank.ee/eraklient/igapaevapangandus/kaardid/krediitkaart)',
        rates: [
          'Intress alates 18% aastas (kasutatud krediidilimiidilt)',
          'Krediidilimiit kuni 5000 €',
          'Kuutasu 1 € (plastikkaart), virtuaalkaart 0 €',
          'Intressivaba periood kuni 40 päeva',
          'KKM 22,21% (näide: limiit 1000 €, intress 18%, kuutasu 1 €)'
        ]
      },
      {
        name: 'Coop Pluss',
        url: 'https://www.cooppank.ee/eraklient/igapaevapangandus/kaardid/coop-pluss',
        summary: 'Coop Pluss kaarditoode.'
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.cooppank.ee/eraklient/igapaevapangandus/nutikad-makseviisid',
        summary: 'Apple Pay ja Google Pay.'
      },
      {
        name: 'Maksed',
        url: 'https://www.cooppank.ee/eraklient/igapaevapangandus/maksed',
        summary: 'Maksed, välkmaksed ja Euroopa maksed mobiilipangast.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.cooppank.ee/eraklient/kodu/kodulaen',
        summary:
          'Kodu ostmine, ehitus, renoveerimine. Laenusumma alates 10 000 €, periood kuni 30 aastat, omafinantseering vähemalt 15% (EIS/KredEx käendusega kuni 5%-ni). Intress = individuaalne marginaal + 6 kuu EURIBOR. Lisanduvad eksperthinnangu kulu, lepingutasu, hüpoteegi riigilõiv ja notaritasu; ennetähtaegsel tagastamisel kuni 3 kuu intress. (Allikas: cooppank.ee/eraklient/kodu/kodulaen; uudis 26.02.2024)',
        rates: [
          'Marginaal alates 1,6% + 6 kuu EURIBOR (alates 26.02.2024)',
          'A-energiaklassi intress alates 1,49%',
          'Omafinantseering vähemalt 15% (EIS käendusega kuni 5%)',
          'Periood kuni 30 aastat, summa alates 10 000 €'
        ]
      },
      {
        name: 'Õpetaja kodulaen',
        url: 'https://www.cooppank.ee/eraklient/kodu/opetaja-kodulaen',
        summary: 'Eritingimused õpetajatele.',
        rates: [
          'Intressimarginaal alates 1,49%',
          'Lepingutasu 0 €',
          'Hüvitatakse eksperthinnang ja 1 aasta kodukindlustus'
        ]
      },
      {
        name: 'Kodukaitsja kodulaen',
        url: 'https://www.cooppank.ee/eraklient/kodu/kodukaitsja-kodulaen',
        summary: 'Spetsiaalne kodulaen Kodukaitsja programmi raames.'
      },
      {
        name: 'Remondilaen',
        url: 'https://www.cooppank.ee/eraklient/kodu/remondilaen',
        summary: 'Kodu remondiks.'
      },
      {
        name: 'Kinnisvara tagatisel laen',
        url: 'https://www.cooppank.ee/eraklient/kodu/kinnisvara-tagatisel-laen',
        summary: 'Laen kinnisvara tagatisel.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.cooppank.ee/eraklient/vaikelaen',
        summary:
          'Tagatiseta laen 300–25 000 €, periood 6 kuud – 10 aastat, fikseeritud kuumakse. Taotleja sissetulek alates 400 €/kuus, vanus laenuperioodi lõpus kuni 75 aastat. (Allikas: cooppank.ee/eraklient/vaikelaen)',
        rates: [
          'Intress alates 7,9% aastas (laenujäägilt)',
          'Lepingutasu 2% laenusummast, min 35 €',
          'Igakuine haldustasu 1,5 €',
          'KKM 22,78% (näide: 2250 €, 36 kuud, intress 17,9%)',
          'Ennetähtaegne tagastamine tasuta'
        ]
      },
      {
        name: 'Reisilaen',
        url: 'https://www.cooppank.ee/eraklient/vaikelaen/reisilaen',
        summary: 'Väikelaenu erivariant reisiks.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.cooppank.ee/eraklient/auto/autolaen',
        summary:
          'Tagatiseta autolaen 300–25 000 €, periood 6 kuud – 10 aastat. Sissemakset ja kaskot pole vaja, sõiduk kohe sinu oma. Sissetulek alates 400 €/kuus, vanus laenuperioodi lõpus kuni 75 aastat. (Allikas: cooppank.ee/eraklient/auto/autolaen)',
        rates: [
          'Intress alates 6,9% aastas',
          'Lepingutasu 2% laenusummast, min 35 €',
          'Igakuine haldustasu 1,5 €',
          'KKM 10,68% (näide: 5000 €, 72 kuud, intress 8,9%)',
          'Ennetähtaegne tagastamine tasuta'
        ]
      },
      {
        name: 'Autoliising',
        url: 'https://www.cooppank.ee/eraklient/auto/liising',
        summary:
          'Auto, kaubik, mootorratas, ATV. Kapitali- ja kasutusrent, periood kuni 6 aastat. Lepingutasu 1% sõiduki hinnast, min 190 €. (Allikas: cooppank.ee/eraklient/auto/liising; EURIBOR 23.01.2026 oli 2,156%)',
        rates: [
          'Kapitalirent: 6 kuu EURIBOR + marginaal 3,70%, jääkväärtus 20%, KKM näide 6,43%',
          'Kasutusrent: 6 kuu EURIBOR + marginaal 3,10%, jääkväärtus 30%, KKM näide 8,78%',
          'Sissemakse alates 0% (kuni 25 000 € sõidukile)',
          'Lepingutasu 1% sõiduki hinnast, min 190 €'
        ]
      },
      {
        name: 'Kasutatud auto liising',
        url: 'https://www.cooppank.ee/eraklient/auto/kasutatud-auto-liising',
        summary: 'Kasutatud sõiduki liising.'
      },
      {
        name: 'Autoportaal',
        url: 'https://www.cooppank.ee/eraklient/auto/autoportaal',
        summary: 'Uute ja kasutatud autode müügiportaal.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Liikluskindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/liikluskindlustus/kalkulaator',
        summary: 'Kuni 8 pakkumist, võrdlus kalkulaatoris.'
      },
      {
        name: 'Kaskokindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/kaskokindlustus/kalkulaator',
        summary: 'Kaskokindlustuse kalkulaator ja ost.'
      },
      {
        name: 'Kodukindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/kodukindlustus',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/reisikindlustus',
        summary: 'Reisikindlustus üksikule reisile.'
      },
      {
        name: 'Kuumaksega reisikindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/reisikindlustus-kuumaksega',
        summary: 'Perele terveks aastaks.',
        rates: ['8,90 €/kuus (kampaanialeht)']
      },
      {
        name: 'Õnnetusjuhtumi kindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/onnetusjuhtumi-kindlustus',
        summary: 'Õnnetusjuhtumi kindlustus.'
      },
      {
        name: 'Ostukindlustus',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/ostukindlustus',
        summary: 'Kaardiga seotud ostukaitse.'
      },
      {
        name: 'Coop Kindlustusmaakler',
        url: 'https://www.cooppank.ee/eraklient/kindlustamine/coop-kindlustusmaakler',
        summary: 'Kindlustusmaakleri teenus ja ärikliendi kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja partnerpakkumised',
    items: [
      {
        name: 'Sissetuleku kampaania 500 €',
        url: 'https://www.cooppank.ee/kampaania',
        summary: 'Too palga sissetulek Coop Panka ja osale loosimistes.',
        rates: [
          'Periood: 20.04.2026 – 10.07.2026',
          'Iganädalaselt 5 × 500 €',
          'Peaauhind 5000 €'
        ]
      },
      {
        name: 'Kasulik ostupreemia',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/kasulik-ostupreemia',
        summary: '1% ostupreemia Coopi ostudelt (Kasulik/Piirideta pakett).',
        rates: ['1% kuus kontole']
      },
      {
        name: '65+ tasuta teenused',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/alates-65-eluaastast-on-sulle-pangateenused-tasuta',
        summary: 'Alates 65. eluaastast pangateenused tasuta Kasulik paketis.'
      },
      {
        name: 'Coopi kliendiprogramm',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/coopi-kliendiprogramm',
        summary: 'Panga kaart on Coopi kaupluste kliendikaart.'
      },
      {
        name: 'Alexela programm',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/alexela-0',
        summary: 'Panga kaart on Alexela kliendikaart (liitu äpis või internetipangas).'
      },
      {
        name: 'Kaardivägi',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/panustame-koos-eesti-kaitsevoimesse',
        summary: 'Iga kaardimaksega 1 sent reservväelastele (+ pank lisab 1 sendi).'
      },
      {
        name: 'AT Sport −10%',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/spordis-nuud-coop-panga-kaardiga-makstes-10-soodustus',
        summary: '10% soodustus AT Sport poedes kaardiga.'
      },
      {
        name: 'Jazz Pesulad −5%',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/jazz-pesulad-soodustus-coop-panga-kaardiga',
        summary: '5% soodustus Jazz autopesulates (füüsilise kaardiga).'
      },
      {
        name: 'Lastehoius 50 €',
        url: 'https://www.cooppank.ee/eraklient/pakkumised/parim-intress-eestis',
        summary: '50 € stardikapital lastehoiuse avamisel.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Äripakett',
        url: 'https://www.cooppank.ee/ariklient/igapaevapangandus/arikliendi-paketid',
        summary:
          'Kuutasuta (0 €/kuus) arveldus registreeritud äriühingule: deebet- ja virtuaalkaart, tasuta Eesti- ja Euroopa-sisesed maksed (sh välkmaksed), pangalingi maksete vastuvõtmine, püsikorraldus, e-arve püsimakse ja tasuta kontohaldus. Sularaha sissemakse Coopi kauplustes kuni 4000 €/kuus tasuta. Sularaha väljamakse 0,69 €/tehing; pangasisene makse kontoris 3 €. (Allikas: cooppank.ee/ariklient/igapaevapangandus/arikliendi-paketid)',
        rates: ['Kuutasu 0 €', 'Sularaha sissemakse Coopis kuni 4000 €/kuus tasuta', 'Sularaha väljamakse 0,69 €/tehing']
      },
      {
        name: 'Korteriühistu pakett',
        url: 'https://www.cooppank.ee/ariklient/igapaevapangandus/arikliendi-paketid',
        summary:
          'Korteriühistutele 2 €/kuus: deebet- ja virtuaalkaart, tasuta Eesti-sisesed maksed, püsikorraldus ja e-arve püsimakse, tasuta sularaha väljamakse Coopi kauplustes ja sissemakse kuni 4000 €/kuus. Euroopa makse 0,20 €, pangalingi makse 0,25 €, pangasisene makse kontoris 0,40 €. (Allikas: cooppank.ee/ariklient/igapaevapangandus/arikliendi-paketid)',
        rates: ['Kuutasu 2 €/kuus', 'Euroopa makse 0,20 €', 'Pangalingi makse 0,25 €']
      },
      {
        name: 'Ärilaen',
        url: 'https://www.cooppank.ee/ariklient/finantseerimine/arilaen',
        summary: 'Ettevõtte laen.'
      },
      {
        name: 'Arvelduskrediit',
        url: 'https://www.cooppank.ee/ariklient/finantseerimine/arvelduskrediit',
        summary: 'Arvelduskrediit.'
      },
      {
        name: 'Faktooring',
        url: 'https://www.cooppank.ee/ariklient/finantseerimine/faktooring',
        summary: 'Arvete faktooring.'
      },
      {
        name: 'Liising (äri)',
        url: 'https://www.cooppank.ee/ariklient/finantseerimine/liising',
        summary: 'Ettevõtte liising.'
      },
      {
        name: 'Alustava ettevõtja väikelaen',
        url: 'https://www.cooppank.ee/ariklient/finantseerimine/alustava-ettevotja-vaikelaen',
        summary: 'Stardiettevõttele.'
      },
      {
        name: 'Partnerpakkumised',
        url: 'https://www.cooppank.ee/ariklient/pakkumised',
        summary:
          'SimplBooks (4 kuud tasuta), Merit (6 kuud), Envoice (90 päeva, COOP90), Directo (−20% 12 kuud), Shoproller, SmartPost (−30%), VeeRa, Fondia jt.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Tingimused ja hinnakirjad',
        url: 'https://www.cooppank.ee/info/tingimused-ja-hinnakirjad',
        summary: 'Erakliendi ja ärikliendi hinnakirjad, kaartide ja arvelduse tüüptingimused (uuendused alates 01.08.2026).'
      },
      {
        name: 'Pangakontorid',
        url: 'https://www.cooppank.ee/info/pangakontorid',
        summary: 'Kontorite asukohad ja lahtiolekuajad.'
      },
      {
        name: 'Open Banking',
        url: 'https://openbanking.cooppank.ee',
        summary: 'Coop Panga avatud panganduse portaal.'
      }
    ]
  }
];
