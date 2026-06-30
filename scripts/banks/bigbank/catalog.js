/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

// Andmed kogutud Bigbanki avalikelt lehtedelt 2026-06-27. Intressid on muutuvad —
// allikaviited iga arvu juures. Kontrollitud: bigbank.ee tooteleheküljed ja minuraha.ee baromeeter.

/** @type {CatalogSection[]} */
export const BIGBANK_CATALOG = [
  {
    title: 'Hoiused',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.bigbank.ee/hoiused/',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Minimaalne summa 500 €. Tagatud Tagatisfondi poolt kuni 100 000 €. Periood 1 kuu kuni 10 aastat (120 kuud). Tehingu- ja haldustasud puuduvad.',
        rates: [
          // Allikas: https://www.bigbank.ee/hoiused/ (kontrollitud 2026-06-27), väljamakse perioodi lõpus:
          '1–2 kuud: 2,15% aastas (bigbank.ee/hoiused)',
          '3–5 kuud: 2,20% aastas (bigbank.ee/hoiused)',
          '6 kuud: 2,30% aastas (bigbank.ee/hoiused)',
          '7–11 kuud: 2,50% aastas (bigbank.ee/hoiused)',
          '12–47 kuud: 2,60% aastas (bigbank.ee/hoiused)',
          '48–119 kuud: 2,70% aastas (bigbank.ee/hoiused)',
          '120 kuud: 2,75% aastas (bigbank.ee/hoiused)',
          '12 kuu baromeeter: 2,55% (min 500 €, minuraha.ee, seisuga 06.02.2026)'
        ],
        details: [
          'Minimaalne summa 500 € (bigbank.ee/hoiused)',
          'Intressi väljamakse: perioodi lõpus (1–120 kuud), igakuiselt (1–60 kuud) või kord aastas (2–10 aastat)',
          'Tagatisfondi kaitse kuni 100 000 €',
          'Tehingu- ja haldustasusid ei ole',
          'Avamine internetipangas',
          'NB! Alates 1. märtsist 2026 muutusid tähtajalise hoiuse ja säästuhoiuse lepingu tingimused'
        ]
      },
      {
        name: 'Säästuhoius (kogumishoius)',
        url: 'https://www.bigbank.ee/saastuhoius/',
        summary:
          'Paindlik kogumishoius vaba sissemakse ja väljavõtmisega. Intress arvestatakse igapäevaselt kontojäägilt ja makstakse kord kuus.',
        rates: [
          '2,20% aastane intress (bigbank.ee/saastuhoius, muutuv, kontrollitud 2026-06-27)'
        ],
        details: [
          'Miinimumsummat sissemaksele ei ole (bigbank.ee/saastuhoius)',
          'Minimaalne väljavõtt 10 €',
          'Intress arvestatakse igapäevaselt, makstakse kord kalendrikuus kuu viimasel päeval',
          'Väljamakse laekub kuni 3 tööpäeva jooksul',
          'Intressi teenib kontojääk kuni 100 000 €',
          'Haldus- ja lepingutasud puuduvad',
          'Muutuv intress (mitte fikseeritud)'
        ]
      },
      {
        name: 'Tähtajaline hoius ettevõtjale',
        url: 'https://www.bigbank.ee/ettevotja-hoius/',
        summary: 'Fikseeritud tootlusega tähtajaline hoius ettevõttele.',
        details: ['Tingimused sarnased eraisiku tähtajalisele hoiusele', 'Vt bigbank.ee/ettevotja-hoius']
      },
      {
        name: 'Kogumishoius ettevõtjale',
        url: 'https://www.bigbank.ee/kogumishoius/',
        summary: 'Paindlik kogumishoius ettevõttele.',
        details: ['Vaba sissemakse ja väljavõtt', 'Vt bigbank.ee/kogumishoius']
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.bigbank.ee/kodulaen/',
        summary:
          'Kinnisvara ostmine, ehitus, renoveerimine. Laenusumma alates 30 000 € (kalkulaatoris kuni 500 000 €), tähtaeg kuni 30 aastat.',
        rates: [
          'Personaalne intress alates 1,95% + Euribor (annuiteetgraafik, bigbank.ee/kodulaen)',
          'Alates 1,98% + Euribor (eripärane graafik, bigbank.ee/kodulaen)'
        ],
        details: [
          'Laenusumma alates 30 000 € (bigbank.ee/kodulaen)',
          'Tähtaeg kuni 30 aastat',
          'Omafinantseering tavaliselt vähemalt 15%; EIS (endine KredEx) käendusega 10%; lisatagatisega võimalik 0%',
          'Lepingutasu näidiskalkulatsioonis 400 €',
          'Näidis: 100 000 € laen, koguintress 4,60% (marginaal + 6 kuu Euribor), kuumakse ~770,32 €',
          'Kiire eelotsus internetis'
        ]
      },
      {
        name: 'Laen kinnisvara tagatisel',
        url: 'https://www.bigbank.ee/kinnisvaralaen/',
        summary: 'Suurem laen kinnisvara tagatisel vabaks kasutuseks. Summa 30 000 – 250 000 €, tähtaeg kuni 360 kuud (30 aastat).',
        rates: [
          'Alates 3,5% + Euribor (bigbank.ee/kinnisvaralaen)',
          'Välismaa kinnisvara ostuks alates 2,5% + Euribor'
        ],
        details: [
          'Laenusumma 30 000 – 250 000 € (bigbank.ee/kinnisvaralaen)',
          'Tähtaeg kuni 360 kuud (30 aastat)',
          'Näidis KKM: 52 500 € laen 263 kuuks, fikseeritud 7,808%, lepingutasu 525 € → krediidi kulukuse määr 8,35%'
        ]
      },
      {
        name: 'Väikelaen',
        url: 'https://www.bigbank.ee/vaikelaen/',
        summary: 'Tagatiseta isiklik laen 500 – 30 000 €, periood 6–120 kuud.',
        rates: ['Intress alates 7,9% aastas laenujäägilt (bigbank.ee/vaikelaen)'],
        details: [
          'Laenusumma 500 – 30 000 € (bigbank.ee/vaikelaen)',
          'Periood 6–120 kuud',
          'Lepingutasu 2% krediidisummast (min 45 €); kampaaniakoodiga "lepingutasuta" 0 € kuni 31.07.2026',
          'Halduskulu ~3,99 €/kuus (näidiskalkulatsioonist)',
          'Näidis KKM: 6 000 € laen 78 kuuks, fikseeritud 14,90% → krediidi kulukuse määr 18,45%',
          'Fikseeritud kuumakse, taotlus veebis'
        ]
      },
      {
        name: 'Autolaen',
        url: 'https://www.bigbank.ee/autolaen/',
        summary: 'Sõiduki soetamiseks. Summa 500 – 30 000 €, periood 6–120 kuud.',
        rates: ['Intress alates 6,9% aastas laenujäägilt (bigbank.ee/autolaen)'],
        details: [
          'Laenusumma 500 – 30 000 € (bigbank.ee/autolaen)',
          'Periood 6–120 kuud',
          'Lepingutasu 2% krediidisummast (min 45 €)',
          'Halduskulu ~3,99 €/kuus (näidiskalkulatsioonist)',
          'Näidis KKM: 12 800 € laen 86 kuuks, fikseeritud 11% → krediidi kulukuse määr 13,12%',
          'Uus ja kasutatud auto; liising alternatiivina'
        ]
      },
      {
        name: 'Liising',
        url: 'https://www.bigbank.ee/liising/',
        summary: 'Finants- ja operatiivliising sõidukitele.',
        details: ['Kapitaliliising', 'Sissemakse võimalik']
      },
      {
        name: 'Refinantseerimine',
        url: 'https://www.bigbank.ee/refinantseerimine/',
        summary: 'Olemasolevate laenude ühendamine ühe kuumaksega. Summa 500 – 30 000 €, periood 6–120 kuud.',
        rates: ['Intress alates 7,9% aastas laenujäägilt (bigbank.ee/refinantseerimine)'],
        details: [
          'Laenusumma 500 – 30 000 € (bigbank.ee/refinantseerimine)',
          'Periood 6–120 kuud',
          'Halduskulu ~3,99 €/kuus (näidiskalkulatsioonist)',
          'Näidis: 13 800 € laen 90 kuuks, fikseeritud 15,60%, lepingutasu 276 € → kuumakse 266,94 €',
          'Vähendab kogukulu, üks kuumakse'
        ]
      },
      {
        name: 'Remondilaen',
        url: 'https://www.bigbank.ee/remondilaen/',
        summary: 'Kodu remondiks ja parendusteks.',
        details: ['Tagatiseta või tagatisel', 'Tingimused sarnased väikelaenuga']
      }
    ]
  },
  {
    title: 'Igapäevapangandus',
    items: [
      {
        name: 'Pangakonto (arvelduskonto)',
        url: 'https://www.bigbank.ee/arvelduskonto/',
        summary:
          'Tasuta arvelduskonto internetipangaga. Eesti esimene pank, mis maksab 2% tootlust kogu kontojäägilt ilma miinimumjäägi nõudeta.',
        rates: ['2% tootlus aastas kogu kontojäägilt, miinimumjäägi nõuet ei ole (bigbank.ee/arvelduskonto)'],
        details: [
          'Kuu- ja haldustasu puudub (bigbank.ee/arvelduskonto)',
          'SEPA ülekanded tasuta',
          'Tasuta esmane deebetkaart konto avamisel',
          'Tervitusboonus 10 € konto avamisel',
          'Soovitusboonus 5 €, kui sõber avab konto sinu koodiga'
        ]
      },
      {
        name: 'Deebetkaart',
        url: 'https://www.bigbank.ee/arvelduskonto/',
        summary: 'Deebetkaart igapäevasteks ostudeks. Esmane kaart tasuta.',
        details: [
          'Esmase deebetkaardiga lisatasusid ei kaasne (bigbank.ee/arvelduskonto)',
          'Apple Pay, Google Pay'
        ]
      },
      {
        name: 'Internetipank',
        url: 'https://www.bigbank.ee/',
        summary: 'Bigbank internetipank ja mobiililahendus.',
        details: ['Smart-ID, Mobile-ID']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärilaen',
        url: 'https://www.bigbank.ee/arilaen/',
        summary: 'Ettevõtte finantseerimine.',
        details: ['Investeerimislaen', 'Käibekapital']
      },
      {
        name: 'Krediidiliin',
        url: 'https://www.bigbank.ee/krediidiliin/',
        summary: 'Paindlik krediidiliin ettevõttele — intress arvestatakse ainult kasutatud summalt.',
        details: [
          'Intress ainult kasutatud summalt (bigbank.ee/krediidiliin)',
          'Laenatud summa saab igal ajal tasuta tagasi maksta'
        ]
      },
      {
        name: 'Äriliising',
        url: 'https://www.bigbank.ee/ariliising/',
        summary: 'Ettevõtte liising sõidukitele ja seadmetele.',
        details: ['Finantsliising', 'Operatiivliising']
      },
      {
        name: 'Ärikliendi arvelduskonto',
        url: 'https://www.bigbank.ee/arikliendi-arvelduskonto/',
        summary: 'Ettevõtte arvelduskonto.',
        details: ['SEPA maksed']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Dokumendid ja hinnakiri',
        url: 'https://www.bigbank.ee/dokumendid/',
        summary: 'Teenuste tingimused, hinnakirjad ja infolehed.',
        details: ['PDF dokumendid', 'Kehtivad tingimused']
      },
      {
        name: 'Korduma kippuvad küsimused',
        url: 'https://www.bigbank.ee/kkk/',
        summary: 'Vastused sagedasematele küsimustele.'
      },
      {
        name: 'Kontakt',
        url: 'https://www.bigbank.ee/kontakt/',
        summary: 'Kontaktinfo ja klienditugi.',
        details: ['Telefon ja e-post', 'Kontorid Eestis ja Baltikumis']
      },
      {
        name: 'Meist',
        url: 'https://www.bigbank.ee/meist/',
        summary: 'Bigbank AS — Baltikumi finantsettevõte, spetsialiseerunud laenudele ja hoiustele.'
      }
    ]
  }
];
