/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/**
 * Nordea kataloog.
 *
 * OLULINE: Nordeal EI OLE enam Eestis iseseisvat jaepangandust. Nordea Eesti äri
 * ühines 2017. aastal DNB Baltikumi äriga ja moodustas LUMINORI. Eesti erakliendi
 * teenuseid pakub nüüd Luminor, mitte Nordea. Nordea tegutseb jaepangana
 * Põhjamaades (Soome, Rootsi, Taani, Norra). Allpool toodud tooted ja hinnad
 * kehtivad Põhjamaade turgudel ning on siin viiteks/võrdluseks — need EI OLE
 * Eestis kättesaadavad.
 *
 * Peamised allikad:
 *  - https://www.nordea.com/en (Nordea grupp)
 *  - https://en.wikipedia.org/wiki/Nordea (ajalugu, ühinemised)
 *  - https://www.nordea.fi/en (Soome erakliendi tooted)
 *  - https://www.nordea.se (Rootsi erakliendi tooted)
 *  - https://news.err.ee/611090 ja https://en.wikipedia.org/wiki/Luminor_Bank (Eesti / Luminori ühinemine)
 * Andmed kogutud 2026-06.
 */

/** @type {CatalogSection[]} */
export const NORDEA_CATALOG = [
  {
    title: 'Nordea grupp',
    items: [
      {
        name: 'Nordea — Põhjamaade suurim pank',
        url: 'https://www.nordea.com/en',
        summary:
          'Nordea Bank Abp on Põhjamaade suurim finantsteenuste grupp. Tegutseb Soomes, Rootsis, Taanis ja Norras. Eestis jaepangandust ei paku — siinsed teenused läksid üle Luminorile (vt allpool).',
        details: [
          'Peakontor Helsingis (peakontor viidi Stockholmist Helsingisse 2018)',
          'Ligikaudu 9,3 miljonit erakliendi ja u 530 000 ärikliendi suhet',
          'Tegutseb peamiselt neljas Põhjamaa riigis: Soome, Rootsi, Taani, Norra',
          'Allikas: nordea.com, Wikipedia (Nordea)'
        ]
      },
      {
        name: 'Ärisuunad (Business Areas)',
        url: 'https://www.nordea.com/en/our-services/personal-customers',
        summary: 'Nordea grupp jaguneb nelja peamise ärisuuna vahel.',
        details: [
          'Personal Banking (erakliendid)',
          'Business Banking (väikese ja keskmise suurusega ettevõtted)',
          'Large Corporates & Institutions (suurkliendid ja institutsioonid)',
          'Asset & Wealth Management (vara- ja varahaldus)',
          'Allikas: nordea.com'
        ]
      },
      {
        name: 'Private Banking',
        url: 'https://www.nordea.com/en/our-services/personal-customers',
        summary: 'Private banking ja varahaldus jõukamatele klientidele Põhjamaades.',
        details: ['Investeerimisnõustamine', 'Varahaldus', 'Pakutakse Põhjamaade turgudel, mitte Eestis']
      }
    ]
  },
  {
    title: 'Ajalugu',
    items: [
      {
        name: 'Nordea teke (1990. aastate ühinemised)',
        url: 'https://en.wikipedia.org/wiki/Nordea',
        summary:
          'Nordea sündis 1990. aastate lõpu ja 2000. aasta Põhjamaade pankade ühinemiste ahelast.',
        details: [
          '1997: Soome Merita ja Rootsi Nordbanken moodustasid MeritaNordbankeni',
          '2000: omandati Taani Unidanmark ja ühineti Norra Christiania Bankiga; sündis nimi Nordea',
          '2018: peakontor viidi Stockholmist Helsingisse',
          'Allikas: Wikipedia (Nordea)'
        ]
      }
    ]
  },
  {
    title: 'Soome (FI) — säästmine ja hoiused',
    items: [
      {
        name: 'PerkAccount (Säästötili)',
        url: 'https://www.nordea.fi/en/personal/our-services/savings-investments/savings-accounts/',
        summary:
          'Paindlik säästukonto puhvri kogumiseks või lühiajaliseks säästmiseks. Vaba sissemakse ja väljavõtt.',
        details: [
          'Fikseeritud, astmeline (tiered) aastaintress',
          'Miinimumsissemakset ei ole',
          'Allikas: nordea.fi'
        ]
      },
      {
        name: 'FlexiDeposit Account (JoustoTalletus)',
        url: 'https://www.nordea.fi/en/personal/our-services/savings-investments/savings-accounts/flexideposit-account.html',
        summary:
          'Automaatselt uuenev säästukonto. Intress sõltub talletusperioodi pikkusest ja uueneb perioodi lõppedes.',
        details: [
          'Sissemakse vahemik 500–500 000 €',
          'Väljavõtt võimalik',
          'Intress muutub perioodi järgi — täpne määr nordea.fi lehel',
          'Allikas: nordea.fi'
        ]
      },
      {
        name: 'Time Deposit Account (Määräaikaistalletus)',
        url: 'https://www.nordea.fi/en/personal/our-services/savings-investments/savings-accounts/',
        summary: 'Fikseeritud intressiga tähtajaline hoius distsiplineeritud säästjale.',
        details: [
          'Miinimumsumma 500 €',
          'Tähtaeg 1–36 kuud',
          'Intress lepitakse kokku konto avamisel',
          'Allikas: nordea.fi'
        ]
      },
      {
        name: 'ASP-konto (kodusäästukonto, esmaostja)',
        url: 'https://www.nordea.fi/en/personal/our-services/savings-investments/savings-accounts/',
        summary:
          'Riiklikult toetatud kodusäästuskeem esmakordsele kodu ostjale (Soome ASP-süsteem).',
        rates: ['1% sissemakseintress + boonusintress tagantjärele tingimuste täitmisel (nordea.fi)'],
        details: [
          'Suunatud noortele esmaostjatele (alates 15. eluaastast)',
          'Igakuine sissemakse vahemikus 50–1500 €',
          'Säästuperioode vähemalt ~20 kuud',
          'Allikas: nordea.fi'
        ]
      },
      {
        name: 'Equity savings account (Osakesäästötili)',
        url: 'https://www.nordea.fi/en/personal/our-services/savings-investments/investments/equity-savings-account.html',
        summary: 'Soome aktsiasäästukonto investeerimiseks maksusoodustusega.',
        details: ['Aktsiatesse investeerimine', 'Soome maksuraamistik', 'Allikas: nordea.fi']
      }
    ]
  },
  {
    title: 'Rootsi (SE) — säästmine (sparkonton)',
    items: [
      {
        name: 'Sparkonto med fria uttag (endine Förmånskonto)',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/formanskonto.html',
        summary: 'Vabade väljavõtetega säästukonto Rootsis.',
        rates: ['Kuni ~0,10% (sõltub summast) — vaata nordea.se aktuaalseid määrasid'],
        details: ['Vabad väljavõtted', 'Muutuv intress', 'Allikas: nordea.se']
      },
      {
        name: 'Sparkonto Extra',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/',
        summary: 'Kõrgema intressiga säästukonto, väljavõtul väike viivitus.',
        rates: ['~0,50% (kogutud nordea.se ülevaatest, võib muutuda)'],
        details: ['Vabad väljavõtted 3-päevase viivitusega', 'Allikas: nordea.se']
      },
      {
        name: 'Fasträntekonto (tähtajaline hoius)',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/',
        summary: 'Fikseeritud intressiga tähtajaline hoius (3 kk, 6 kk, 1 a, 2 a).',
        rates: ['Intressivahemik ~1,75–2,05% sõltuvalt tähtajast (kogutud nordea.se, kontrolli aktuaalset)'],
        details: ['Vahendid lukus seotusperioodiks', 'Kindel intress kogu perioodiks', 'Allikas: nordea.se']
      }
    ]
  },
  {
    title: 'Laenud ja igapäevapangandus (Põhjamaad)',
    items: [
      {
        name: 'Soome laenud',
        url: 'https://www.nordea.fi/en/personal/our-services/loans/',
        summary: 'Asuntolaina (kodulaen), kulutusluotto (tarbimislaen), autolaina Soomes.',
        details: ['Kodulaen', 'Tarbimislaen', 'Autolaen', 'Allikas: nordea.fi']
      },
      {
        name: 'Rootsi laenud (bolån)',
        url: 'https://www.nordea.se/privat/produkter/lan/',
        summary: 'Bolån (kodulaen), privatlån, billån Rootsis.',
        details: [
          'Kodulaen kuni 85% kinnisvara väärtusest',
          'Tagasimakse tähtaeg ~5–50 aastat',
          'Allikas: nordea.se'
        ]
      },
      {
        name: 'Kontod, kaardid ja kliendiprogrammid',
        url: 'https://www.nordea.se/privat/produkter/kundprogram/premium.html',
        summary: 'Pangakontod, deebet- ja krediitkaardid ning kliendiprogrammid (nt Nordea Premium) Põhjamaades.',
        details: ['Visa/Mastercard kaardid', 'Kliendiprogrammid jõukamatele klientidele', 'Allikas: nordea.se, nordea.fi']
      }
    ]
  },
  {
    title: 'Hoiuste tagamine',
    items: [
      {
        name: 'Hoiuste tagatisskeem',
        url: 'https://www.nordea.fi/en/personal/prices/prices.html',
        summary:
          'Nordea Bank Abp hoiused on kaitstud Soome hoiuste tagatisskeemiga kuni 100 000 € hoiustaja kohta.',
        details: [
          'Soome tagatisskeem kuni 100 000 € hoiustaja kohta',
          'Rootsi säästukontode puhul nimetatakse nii Rootsi kui Soome hoiusekaitset',
          'Allikas: nordea.fi, nordea.se'
        ]
      }
    ]
  },
  {
    title: 'Äriklient (Põhjamaad)',
    items: [
      {
        name: 'Soome äriklient',
        url: 'https://www.nordea.fi/en/business/',
        summary: 'Ettevõtte pangateenused Soomes.',
        details: ['Ärikonto', 'Ärilaen', 'Makseteenused', 'Allikas: nordea.fi']
      },
      {
        name: 'Rootsi äriklient',
        url: 'https://www.nordea.se/foretag/',
        summary: 'Ettevõtte pangateenused Rootsis.',
        details: ['Ärikonto', 'Faktooring', 'Kaardimaksed', 'Allikas: nordea.se']
      }
    ]
  },
  {
    title: 'Märkused Eesti kontekstis',
    items: [
      {
        name: 'Eesti = Luminor, mitte Nordea',
        url: 'https://en.wikipedia.org/wiki/Luminor_Bank',
        summary:
          'Nordea ei ole Eesti erakliendi pank. 2017. aastal ühines Nordea Baltikumi äri DNB Baltikumi äriga ja moodustus Luminor — Eesti kliendid teenindatakse nüüd Luminoris.',
        details: [
          'Ühinemine teatati augustis 2016, Luminor alustas tegevust 1. oktoobril 2017',
          'Ühendati Nordea ja DNB tegevus Eestis, Lätis ja Leedus',
          'Nordea omas algselt enamust majanduslikest õigustest; Nordea väljus täielikult 2019 (osalus müüdi Blackstone juhitud konsortsiumile)',
          'Eesti klient ei saa avada Nordea EE kontot — pöörduda tuleb Luminori poole',
          'Allikas: news.err.ee/611090, Wikipedia (Luminor Bank)'
        ]
      },
      {
        name: 'Andmete kasutus',
        summary:
          'Selles kataloogis olevad tooted ja intressid kehtivad Põhjamaade turgudel (FI/SE) ning on toodud viiteks ja võrdluseks. Need EI OLE Eestis kättesaadavad.',
        details: [
          'Ei kuulu minuraha.ee Eesti baromeetrisse',
          'Intressid ja tingimused erinevad riigiti (FI vs SE)',
          'Aktuaalseid määrasid kontrolli vastava riigi Nordea lehel',
          'Eesti pangateenuste jaoks vaata Luminor'
        ]
      }
    ]
  }
];
