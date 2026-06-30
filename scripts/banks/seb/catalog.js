/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const SEB_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine/kogumine/tahtajalise-hoiuse-intressimaarad',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Intress fikseeritud kogu hoiuperioodiks. Valuutad EUR, USD, SEK, GBP. Tagatud Tagatisfondi poolt kuni 100 000 €.',
        rates: [
          'Kuni 2,00% aastas (seb.ee tähtajalise hoiuse intressimäärade leht, 06.2026)',
          '12 kuu baromeeter: 2,30%, min 500 € (minuraha.ee intressibaromeeter)',
          'Avalikes otsingusnippetides nähtud perioodimäärad (mitte ametlikult kinnitatud lehel): ~3 kuud 3,5%, 6 kuud 3,25%, 9 kuud 3,5%, 12 kuud 4,0%, 24 kuud 3,25%, 36 kuud 3,0% — täpne määr sõltub kampaaniast ja lepingust'
        ],
        details: [
          'Intressimäärad lehel on informatiivsed; lepingu sõlmimisel kehtivad määrad võivad erineda (seb.ee)',
          'Intress makstakse tähtaja lõpus või kokkuleppel igakuiselt',
          'Intressikalkulaator saadaval seb.ee lehel'
        ]
      },
      {
        name: 'Kogumishoius',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine/kogumine',
        summary: 'Paindlik kogumishoius (sh Digikassa) vabade vahendite kasvatamiseks igakuise sissemaksega.',
        rates: ['1,65% aastas (seb.ee hoiuste intressimäärade leht, 06.2026; varem 1,55%)'],
        details: ['Paindlik sissemakse', 'Digikassa raha kogutakse automaatselt kogumishoiusesse']
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://www.seb.ee/intressimaarad',
        summary: 'Intress EUR arvelduskonto vabalt jäägilt.',
        rates: [
          '0,01% aastas (seb.ee hoiuste intressimäärade leht, 06.2026)',
          'Baromeeter: 0,20% summalt 1–5000 €; üle 5000 € 0,01% (minuraha.ee intressibaromeeter)'
        ],
        details: ['Intress arvutatakse vabalt jäägilt', 'Tingimused võivad kontotüübiti erineda']
      },
      {
        name: 'Digikassa',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/digikassa',
        summary: 'Digitaalne rahakott ja makselahendus. Seotud kogumishoiusega (intress 1,65% aastas).',
        details: ['Ostudest kogumishoiusesse kogumine', 'Mobiilirakendus']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine',
        summary: 'Fondid, aktsiad, ETF-id, obligatsioonid. SEB investeerimisplatvorm ja nõustamine.',
        details: ['SEB fondid ja kolmandate osapoolte fondid', 'Investeerimiskonto ja väärtpaberikonto']
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine',
        summary: 'II samba pensionifondid ja III samba vabatahtlik pension.',
        details: ['SEB pensionifondide valik', 'III samba sissemaksetelt tulumaksusoodustus kuni 15% tulust (max 6000 €/a, riiklik reegel)']
      },
      {
        name: 'Lapsele kogumine',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine',
        summary: 'Lapse tuleviku jaoks säästmine kogumishoiuse või investeerimise kaudu.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – arvelduspaketid',
    items: [
      {
        name: 'Noortepakett (Youth)',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Tasuta pakett lastele ja noortele kuni 26. eluaastani.',
        rates: ['Kuutasu: 0 € (seb.ee hinnakiri, 06.2026)'],
        details: [
          '1 tasuta deebetkaart',
          'Piiramatud Euroopa maksed e-kanalites',
          'Sularaha väljavõtt kuni 600 €/kuus',
          'Traumakindlustus 50 € (seb.ee teenuspakettide võrdlus)'
        ]
      },
      {
        name: 'Igapäevane pakett (Daily)',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Põhiline igapäevapangandus arvelduseks.',
        rates: [
          'Kuutasu: 1,45 €/kuus (seb.ee hinnakiri, 06.2026)',
          '18–25-aastastele tasuta; 65+ klientidele 0,32 €/kuus'
        ],
        details: [
          '1 tasuta deebetkaart',
          'Piiramatud maksed',
          'Sularaha väljavõtt kuni 1000 €/kuus',
          'Traumakindlustus 100 €',
          'Võimalik krediitkaart'
        ]
      },
      {
        name: 'Mitmekesine pakett (Diverse)',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Laiendatud pakett lisahüvede ja kindlustusega, kuni 2 lisaliiget.',
        rates: ['Kuutasu: 2,95 €/kuus (seb.ee hinnakiri, 06.2026)'],
        details: [
          '1 tasuta Mastercard Gold deebetkaart',
          'Sularaha väljavõtt kuni 1200 €/kuus',
          'Traumakindlustus 100 €',
          '1 krediitkaart ostukindlustusega',
          'Kuni 2 lisaliiget (liikme kuutasu 1 €/inimene; SEB gold-klientide liikmetele tasuta)'
        ]
      },
      {
        name: 'Esmaklassiline pakett (Exclusive)',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Kõrgema taseme pakett laiema kindlustuskaitse ja lisahüvedega, kuni 4 lisaliiget.',
        rates: ['Kuutasu: 10 €/kuus (seb.ee hinnakiri, 06.2026)'],
        details: [
          '1 tasuta Mastercard Gold deebetkaart',
          'Sularaha väljavõtt kuni 2000 €/kuus',
          'Traumakindlustus 200 €',
          '1 krediitkaart ostukindlustusega',
          'Kuni 4 lisaliiget liikme kuutasuta'
        ]
      },
      {
        name: 'Eliit pakett (Elite)',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Kõrgeima taseme premium-pakett, Premium Mastercard ja personaalsed hüved, kuni 4 lisaliiget.',
        rates: ['Kuutasu: 33 €/kuus (seb.ee hinnakiri, 06.2026)'],
        details: [
          'Premium Mastercard',
          'Sularaha väljavõtt kuni 3000 €/kuus',
          'Traumakindlustus 200 €',
          'Eksklusiivsed krediitkaardihüved',
          'Kuni 4 lisaliiget liikme kuutasuta'
        ]
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/kaardid',
        summary: 'Visa/Mastercard deebetkaardid, Apple Pay, Google Pay, Garmin Pay.',
        rates: [
          'Mastercard deebetkaart: 1 €/kuus (seb.ee hinnakiri, 06.2026)',
          'Mastercard Gold deebetkaart: 1,50 €/kuus',
          'Mastercard Business deebetkaart: 2 €/kuus',
          'Pildikaart eraklient: 1 €/kuus; juriidiline isik: 2 €/kuus'
        ],
        details: ['Kuutasu sõltub pakettist (paketis sageli kaasas)', 'Ostukaitse ja pettusekaitse']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/kaardid',
        summary: 'Krediitkaart ostukindlustuse ja reisikindlustusega.',
        rates: [
          'Standard / pildi-krediitkaart: tasuta (seb.ee hinnakiri, 06.2026)',
          'Mastercard krediitkaart: 1,60 €/kuus',
          'Gold / Premium: 7,50 €/kuus',
          'Platinum: 10 €/kuus',
          'World Elite: 30 €/kuus'
        ],
        details: ['Intressivaba periood (grace period) ostudele', 'Intressimäär sõltub lepingust']
      },
      {
        name: 'SEB Maksed',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/maksed',
        summary: 'SEPA maksed, kiirmaksed, välismaksed, püsikorraldused.',
        rates: [
          'SEPA/Euroopa makse e-kanalis: 0,25 € (seb.ee hinnakiri, 06.2026)',
          'Euroopa kiirmakse (instant): sisaldub tavalise Euroopa makse hinnas (0,25 €)',
          'Eurooa ekspressmakse: 30 €',
          'Väljaspool EL-i tavamakse: 6–26 €; kiir: 14–34 €; ekspress: 30–59 €'
        ],
        details: ['Pakettides sageli piiramatud Euroopa maksed e-kanalites']
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/kaardid',
        summary: 'Apple Pay, Google Pay, Samsung Pay, Garmin Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.seb.ee/eraklient/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine, refinantseerimine. Muutuv intress = individuaalne marginaal + Euribor (3, 6 või 12 kuud).',
        rates: [
          'Euribor (seb.ee, 25.06.2026): 3 kuud 2,2930%; 6 kuud 2,6060%; 12 kuud 2,7850%',
          'Näidislepingu KKM ~3,66% (näide: 150 000 €, 26 a, marginaal 1,40% + 6 kuu Euribor 2,114%; seb.ee)',
          'Lepingu sõlmimise tasu: 0,4% laenusummast, min 190 €',
          'Lepingu muutmise tasu: kuni 0,4% jääksummast, min 190 €'
        ],
        details: [
          'Minimaalne laenusumma 15 000 €',
          'Kuni 30 aastat',
          'Omafinantseering alates 15% (KredEx/EIS käendusega võimalik vähem)',
          'Tagatis peab olema kindlustatud vähemalt taastamisväärtuses kogu laenuperioodi vältel'
        ]
      },
      {
        name: 'Kodulaen noortele / KredEx',
        url: 'https://www.seb.ee/eraklient/laenud/kodulaen',
        summary: 'Eritingimused noortele ja peredele KredEx/EIS käendusega.',
        details: ['KredEx/EIS käendusega omafinantseering alla 15%', 'Tingimused sõltuvad käenduse reeglitest']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.seb.ee/eraklient/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen erinevateks vajadusteks. Fikseeritud intress kogu perioodiks.',
        rates: [
          'Intress alates 6,9% aastas (seb.ee, 06.2026)',
          'Kampaania 01.04–30.06.2026: 7,5% laenukindlustusega / 8,5% ilma kindlustuseta; lepingutasu 0 €',
          'Lepingutasu (tavaolukord): 1,5% laenusummast, min 35 € (auto puhul min 75 €; kinnisvara/päikesepaneelid 1%, min 75 €; kodu energiatõhusus 1%, min 50 €)'
        ],
        details: [
          'Summa kuni 25 000 € (üksiktaotleja); kuni 40 000 € kaaslaenajaga',
          'Periood kuni 7 aastat',
          'Taotlus internetipangas või mobiilis'
        ]
      },
      {
        name: 'Autolaen',
        url: 'https://www.seb.ee/eraklient/laenud/autolaen',
        summary: 'Tarbimislaen sõiduki soetamiseks. Fikseeritud intress kogu perioodiks.',
        rates: [
          'Intress alates 7,5% aastas (seb.ee, 06.2026); laenukindlustusega madalam',
          'Lepingutasu: 1,5% laenusummast, min 75 €'
        ],
        details: [
          'Summa 2000–40 000 €',
          'Periood kuni 7 aastat',
          'Omafinantseering ei ole nõutav (erinevalt liisingust)'
        ]
      },
      {
        name: 'Liising',
        url: 'https://www.seb.ee/eraklient/laenud/liising',
        summary: 'Liisingufinantseering sõidukitele ja seadmetele.',
        rates: ['Omafinantseering alates 10% sõiduki hinnast (seb.ee)'],
        details: ['Kapitali- ja kasutusrent', 'Kaskokindlustus tavaliselt nõutav']
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.seb.ee/eraklient/laenud',
        summary: 'Paindlik krediidikonto igapäevaseks kasutuseks.',
        details: ['Kasutad ainult vajadusel', 'Intress ainult kasutatud summalt']
      },
      {
        name: 'Õppelaen',
        url: 'https://www.seb.ee/eraklient/laenud',
        summary: 'Õpingute finantseerimine (riiklikult reguleeritud õppelaen).',
        details: ['Tingimused riiklike reeglite alusel']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus',
        summary: 'Kodu, koduvara ja vastutuskindlustus. Kodulaenu tagatis peab olema kindlustatud vähemalt taastamisväärtuses.',
        details: ['Erinevad kaitsetasemed']
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus',
        summary: 'Reisi tühistamine, meditsiin, pagas. Traumakindlustus kaasas pakettides (50–200 € sõltuvalt pakettist).',
        details: ['Ühekordne reis või aastapoliis']
      },
      {
        name: 'Laenukindlustus',
        url: 'https://www.seb.ee/eraklient/laenud',
        summary: 'Väike- ja autolaenu kaitse; vähendab laenu intressimäära (nt väikelaenul 7,5% vs 8,5%).',
        details: ['Vabatahtlik, soodustab madalamat intressi']
      },
      {
        name: 'Liikluskindlustus ja kasko',
        url: 'https://www.seb.ee/eraklient/kindlustus',
        summary: 'Kohustuslik liikluskindlustus ja kaskokindlustus.',
        details: ['Liisingu/autolaenu puhul kasko sageli nõutav']
      },
      {
        name: 'Õnnetusjuhtumi- ja elukindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus',
        summary: 'Õnnetusjuhtumi- ja elukindlustus pere kaitsmiseks.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'Väikelaenu kampaania (kevad 2026)',
        url: 'https://www.seb.ee/eraklient/laenud/vaikelaen',
        summary: 'Kampaania 01.04–30.06.2026: väikelaen 7,5% laenukindlustusega (8,5% ilma), lepingutasu 0 €.',
        details: ['Tingimused kehtivad kampaaniaperioodil (seb.ee)']
      },
      {
        name: 'Kliendihüvitusprogramm',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/arvelduspaketid',
        summary: 'Partnerite soodustused SEB kaardi või paketiga (Customer Benefit Programme).',
        details: ['Muutuvad kampaaniad ja partnerpakkumised']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto ja äripaketid',
        url: 'https://www.seb.ee/ariklient/igapaevapangandus',
        summary: 'Ettevõtte arvelduskonto ja igapäevapangandus erineva mahuga pakettides.',
        rates: [
          'Baas: 1 €/kuus (seb.ee hinnakiri, 06.2026)',
          'Standard: 2 €/kuus',
          'Standard+: 4 €/kuus',
          'Premium: 6 €/kuus',
          'Premium+: 15 €/kuus'
        ],
        details: ['SEPA maksed', 'Mitme kasutajaga ligipääs', 'Integratsioonid raamatupidamisega']
      },
      {
        name: 'Ärilaen',
        url: 'https://www.seb.ee/ariklient/laenud',
        summary: 'Investeerimislaen, käibekapitali laen, kinnisvara tagatisel.',
        details: ['MES ja KredEx/EIS kaasfinantseerimine', 'Liising äriklientidele']
      },
      {
        name: 'Tähtajaline hoius ärikliendile',
        url: 'https://www.seb.ee/ariklient/hoiuste-intressimaarad-arikliendile',
        summary: 'Ettevõtte vabade vahendite paigutamine tähtajalisse hoiusesse.',
        details: ['Intressimäärad ärikliendi lehel', 'Sobib inflatsiooniga võitlemiseks (SEB pressiteated)']
      },
      {
        name: 'Kaardimaksed (POS ja e-kaubandus)',
        url: 'https://www.seb.ee/ariklient/kaardimaksed',
        summary: 'Kaupluse terminalid, e-kaubanduse makselahendused.',
        rates: ['Mastercard Business deebetkaart: 2 €/kuus (seb.ee hinnakiri)'],
        details: ['Visa/Mastercard', 'Apple Pay ja Google Pay kaupmehele']
      },
      {
        name: 'Faktooring ja arvelduskrediit',
        url: 'https://www.seb.ee/ariklient/laenud',
        summary: 'Raha laekumise kiirendamine ja käibekapital.',
        details: ['Arvete ost', 'Arvelduskrediidi limiit']
      },
      {
        name: 'Investeerimispangandus (äri)',
        url: 'https://www.seb.ee/ariklient',
        summary: 'Suuremate ettevõtete finantseerimine ja nõustamine.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Pangateenuste hinnakiri',
        url: 'https://www.seb.ee/en/price-list',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri (veeb ja PDF). Kehtiv alates 01.06.2026.',
        details: ['Pakettide kuutasud', 'Kaartide tasud', 'Maksete hinnad']
      },
      {
        name: 'Hoiuste intressimäärad',
        url: 'https://www.seb.ee/eraklient/kogumine-ja-investeerimine/kogumine/tahtajalise-hoiuse-intressimaarad',
        summary: 'Hoiuste, kontode ja laenude intressimäärad. Tähtajaline hoius kuni 2%, kogumishoius 1,65%, arvelduskonto 0,01%.',
        details: ['Uuendatakse regulaarselt', 'Lehel toodud määrad on informatiivsed']
      },
      {
        name: 'Tingimused ja infolehed',
        url: 'https://www.seb.ee/et/tingimused',
        summary: 'Üldtingimused, infolehed ja privaatsuspoliitika.'
      },
      {
        name: 'Pangakontorid ja klienditugi',
        url: 'https://www.seb.ee/et/kontakt',
        summary: 'Kontorite asukohad, lahtiolekuajad, klienditugi.',
        details: ['24/7 klienditugi kaartide ja pettuste jaoks', 'Videokohtumine võimalik']
      },
      {
        name: 'Open Banking',
        url: 'https://developer.sebgroup.com',
        summary: 'SEB avatud panganduse API arendajatele.'
      }
    ]
  }
];
