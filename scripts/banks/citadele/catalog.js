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
          'Fikseeritud intressiga tähtajaline hoius, fikseeritud tähtaeg ja valitav valuuta (EUR või USD). Hoiused tagatud kuni 100 000 € (Läti tagatisskeem).',
        rates: [
          'EUR 1 kuu: 1,75% (min 100 €) — citadele.ee/en/private/savings/rates (kehtiv 15.05.2026)',
          'EUR 3 kuud: 1,95% (min 100 €) — citadele.ee rates',
          'EUR 6 kuud: 2,00% (min 100 €) — citadele.ee rates',
          'EUR 1 aasta: 2,00% (min 100 €) — citadele.ee rates; minuraha baromeeter 12 kuud: 2,0%',
          'EUR 2 aastat: 2,20% (min 100 €) — citadele.ee rates',
          'EUR 5 aastat: 2,50% (min 100 €) — citadele.ee rates',
          'USD 6 kuud: 1,75%; USD 1 aasta+: 2,50% (min 200 USD) — citadele.ee rates'
        ],
        details: [
          'Periood 1 kuu kuni 5 aastat',
          'Minimaalne summa 100 € (EUR) / 200 USD',
          'Intress tähtaja lõpus või igakuiselt',
          'Ennetähtaegsel lõpetamisel arvestatud intressi ei maksta (citadele.ee rates)'
        ]
      },
      {
        name: 'Kogumiskonto (Säästukonto)',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Paindlik kogumiskonto igapäevaseks säästmiseks, raha kättesaadav igal ajal ilma etteteatamiseta.',
        rates: ['EUR 1,00%, USD 1,00% (kehtiv 01.01.2025) — citadele.ee/en/private/savings/rates'],
        details: [
          'Alates 1 €, ülempiir puudub',
          'Väljavõtt tasuta ja ilma etteteatamiseta',
          'Toetab regulaarseid igakuiseid sissemakseid'
        ]
      },
      {
        name: 'Roheline kogumiskonto',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Roheline säästmislahendus — raha suunatakse jätkusuutlikesse (energiatõhusatesse) projektidesse.',
        rates: ['1,50% aastas, jäägile kuni 100 000 € (kehtiv 01.05.2025) — citadele.ee rates'],
        details: [
          'Üks konto kliendi kohta, jääk kuni 100 000 €',
          'Väljavõtt tuleb ette teatada 60 päeva',
          'Kiirväljavõtte tasu = 60 päeva arvestatud intress (citadele.ee rates)'
        ]
      },
      {
        name: 'Kasvukonto (Piggybank)',
        url: 'https://www.citadele.ee/et/private/savings/',
        summary: 'Kõrge intressiga säästukonto väiksemale jäägile.',
        rates: ['3,00% aastas, jäägile kuni 10 000 € (kehtiv 14.05.2025) — citadele.ee rates'],
        details: ['Üks konto kliendi kohta', 'Intress jäägile kuni 10 000 €']
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
    title: 'Igapäevapangandus – C kaardid / paketid',
    items: [
      {
        name: 'C lite (virtuaalkaart)',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Täisdigitaalne pangakaart telefonis, ilma plastikuta.',
        rates: ['Kuutasu: 0 € (kuutasuta) — citadele.ee/en/private/c-cards'],
        details: ['Ilma plastikkaardita', 'Alati telefonis kättesaadav']
      },
      {
        name: 'C smart',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Madala kuutasuga igapäevakaart; 7–21-aastastele lastele ja noortele kuutasuta.',
        rates: ['Kuutasu: 1,99 €/kuus; 7–21-aastastele 0 € — citadele.ee/en/private/c-cards'],
        details: [
          'Sularaha väljavõtt kuni 1000 €/kuus',
          'C REWARDS: 2 € ostu = 1 punkt',
          'Tasuta SEPA-maksed ja kiirmaksed Euroopas'
        ]
      },
      {
        name: 'C supreme',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Keskmise taseme kaart krediidilimiidi ja põhikindlustusega.',
        rates: ['Kuutasu: 3,99 €/kuus (esimesed kuud tasuta) — citadele.ee/en/private/c-cards'],
        details: [
          'Sularaha väljavõtt kuni 1500 €/kuus',
          'Krediidilimiit kuni 5000 €',
          'Põhikindlustus, C REWARDS: 1 € = 1 punkt',
          'Aktiivse kasutaja soodustus kuutasule kuni 50%'
        ]
      },
      {
        name: 'C prime',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Kõrgeima taseme kaart laiendatud hüvede ja reisikindlustusega.',
        rates: ['Kuutasu: 6,99 €/kuus (esimesed kuud tasuta) — citadele.ee/en/private/c-cards'],
        details: [
          'Sularaha väljavõtt kuni 2000 €/kuus',
          'Krediidilimiit kuni 15 000 €',
          'Reisikindlustus, Priority Pass lennujaama ootesaalid',
          'C REWARDS: 1 € = 1 punkt',
          'Aktiivse kasutaja soodustus kuutasule kuni 50%'
        ]
      },
      {
        name: 'Citadele 360 / digitaalpank',
        url: 'https://www.citadele.ee/en/private/digital-bank/',
        summary: 'Citadele digitaalne panganduskeskkond.',
        details: ['Mobiilipank', 'Videotuvastus konto avamisel']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart (C kaardid)',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Visa/Mastercard C-kaardid, nutimaksed. Tasuta SEPA-maksed ja kiirmaksed Euroopas.',
        details: ['Apple Pay, Google Pay', 'C REWARDS punktiprogramm']
      },
      {
        name: 'Krediitkaart (C supreme / C prime)',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'C-kaartide krediidilimiit intressivaba perioodiga.',
        rates: [
          'Fikseeritud intress 18% aastas; C supreme näidis KKM (APR) 27,11% — citadele.ee blogi/c-cards',
          'Intressivaba periood kuni 45 päeva (täies mahus tasumisel järgmise kuu 15. kuupäevaks)',
          'Minimaalne kuumakse 5% kasutatud limiidist'
        ],
        details: ['Krediidilimiit C supreme kuni 5000 €, C prime kuni 15 000 €']
      },
      {
        name: 'Maksed',
        url: 'https://www.citadele.ee/et/private/fees/main/payments/',
        summary: 'SEPA, kiirmaksed, välismaa maksed. C-kaartidega tasuta SEPA- ja kiirmaksed Euroopas.',
        rates: ['Täpsed maksetasud erakliendi hinnakirjas (PDF, alates 16.02.2026) — citadele.ee/et/private/fees'],
        details: ['SEPA Instant', 'Püsikorraldused']
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Apple Pay, Google Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.citadele.ee/et/private/mortgage/',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine. Muutuv või fikseeritud intress.',
        rates: [
          'Marginaal alates 1,8% + 6 kuu Euribor — citadele.ee/et/private/mortgage',
          'Näidis kogu intress ~3,956% (6 kuu Euribor 2,156%, seis 26.01.2026)',
          'Lepingutasu kuni 1% laenusummast, min 200 € — citadele.ee'
        ],
        details: [
          'Tähtaeg kuni 30 aastat',
          'Minimaalne laenusumma 10 000 €',
          'Finantseerimine kuni 75% tagatise väärtusest (KredEx käendusega kuni 95%)',
          'Uue arenduse korral lepingutasu 0% (kuni 31.12.2026)',
          'Energiatõhus (A/B klass) kinnisvara — soodusintress',
          'Hindamiskulu kuni 450 € panga kanda 3+ lapsega peredele'
        ]
      },
      {
        name: 'Väikelaen',
        url: 'https://www.citadele.ee/et/private/consumer/',
        summary: 'Tagatiseta isiklik laen, otsus 20 minutiga, ka mitte-kliendile.',
        rates: [
          'Summa 1000–25 000 € — citadele.ee/et/private/consumer',
          'Intress alates 6,5% aastas; näidis KKM (APR) 10,80% — citadele.ee',
          'Lepingutasu 2% laenusummast, min 50 €'
        ],
        details: [
          'Periood kuni 84 kuud',
          'Tagatist ei nõuta',
          'Ennetähtaegne tagasimakse ilma trahvita',
          'Näidis: 5000 € / 60 kuud / 6,5% → kuumakse ~97,83 €'
        ]
      },
      {
        name: 'Autolaen / liising',
        url: 'https://www.citadele.ee/et/private/leasing/',
        summary: 'Sõiduki soetamiseks kapitali- või kasutusrent (operatiivliising).',
        rates: [
          'Intress: fikseeritud marginaal + 3 või 6 kuu Euribor; vahemik 1,40%–7,00% aastas — citadele.ee/et/private/leasing',
          'Lepingutasu 1% sõiduki hinnast, min 190 €',
          'Operatiivliisingu (fikseeritud) ennetähtaegse lõpetamise tasu 1,5%, min 275 €'
        ],
        details: [
          'Omafinantseering alates 10% sõiduki hinnast',
          'Tähtaeg kuni 7 aastat',
          'Minimaalne finantseeritav summa 10 000 €, sõiduki hind 11 500–999 999 €',
          'Sõiduki vanus lepingu lõpus kuni 15 aastat',
          'Nõutav kasko- ja liikluskindlustus'
        ]
      },
      {
        name: 'Krediidikonto / krediidilimiit',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Paindlik krediidilimiit C-kaardil, intress kasutatud summalt.',
        details: ['Intressivaba periood kuni 45 päeva', 'Minimaalne kuumakse 5% kasutatud limiidist']
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Reisikindlustus',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Reisikindlustus, mis on kaasas C prime kaardiga.',
        details: ['C prime: reisikindlustus', 'C supreme: põhikindlustus']
      },
      {
        name: 'Ostukaitse / kaardikindlustus',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'C-kaartidega kaasnev kindlustuskaitse.',
        details: ['Sõltub kaardi tasemest']
      },
      {
        name: 'Liising-kindlustus (kasko + liiklus)',
        url: 'https://www.citadele.ee/et/private/leasing/',
        summary: 'Liisinglepingu kestel nõutav kasko- ja kohustuslik liikluskindlustus.',
        details: ['Kohustuslik kogu lepingu vältel']
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'C prime / C supreme tasuta kuud',
        url: 'https://www.citadele.ee/et/private/c-cards/',
        summary: 'Uue C-kaardi taotlemisel esimesed kuud kuutasuta.',
        details: ['C prime: esimesed kuud tasuta', 'C supreme: esimesed kuud tasuta']
      },
      {
        name: 'Kodulaenu lepingutasu 0% uuele kinnisvarale',
        url: 'https://www.citadele.ee/et/private/mortgage/',
        summary: 'Arendajalt otse uue kinnisvara ostmisel lepingutasu 0% (kuni 31.12.2026).',
        details: ['Kehtib uusarendustele']
      },
      {
        name: 'Konto avamine kodust',
        url: 'https://www.citadele.ee/et/private/customer/',
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
        name: 'Äriklientide hoius / säästukonto',
        url: 'https://www.citadele.ee/en/business/savings/',
        summary: 'Juriidilise isiku säästu- ja hoiuselahendused.',
        rates: ['Säästukonto juriidilisele isikule: EUR 1,00%, USD 1,00% (kehtiv 01.01.2025) — citadele.ee rates'],
        details: ['Tähtajaline hoius', 'Säästukonto']
      },
      {
        name: 'Ärilaen ja finantseerimine',
        url: 'https://www.citadele.ee/et/business/financing',
        summary: 'Ettevõtte finantseerimine.',
        details: ['Investeerimislaen', 'Liising', 'Faktooring']
      },
      {
        name: 'Kaardimaksed (kaupmehele)',
        url: 'https://www.citadele.ee/et/business/card-payments',
        summary: 'POS, e-kaubandus.',
        details: ['Visa/Mastercard kaupmehele']
      },
      {
        name: 'Ärikliendi hinnakiri',
        url: 'https://www.citadele.ee/et/business/fees/',
        summary: 'Juriidilise isiku teenuste hinnakiri (PDF).',
        details: ['Pakettide kuutasud', 'Maksetasud']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Teenuste hinnakiri (eraklient)',
        url: 'https://www.citadele.ee/et/private/fees/',
        summary: 'Erakliendi teenuste hinnakiri. Täpsed tasud PDF-dokumendis "Hinnakiri erakliendile alates 16.02.2026".',
        details: ['Kaartide kuutasud', 'Maksete hinnad', 'Uus versioon jõustub 01.08.2026']
      },
      {
        name: 'Hoiuste intressimäärad',
        url: 'https://www.citadele.ee/et/private/savings/rates/',
        summary: 'Hoiuste ja kogumiskontode intressimäärade ametlik leht.',
        details: ['Tähtajaline hoius kehtiv 15.05.2026', 'Kehtib kuni 5 000 000 €, üle selle individuaalselt']
      },
      {
        name: 'Pangakonto avamine',
        url: 'https://www.citadele.ee/et/private/customer/',
        summary: 'Konto avamine kodust lahkumata (videotuvastus).',
        details: ['Smart-ID', 'Mobile-ID']
      },
      {
        name: 'Pangakontorid ja klienditugi',
        url: 'https://www.citadele.ee/et/contact',
        summary: 'Kontorite asukohad ja klienditugi.'
      }
    ]
  }
];
