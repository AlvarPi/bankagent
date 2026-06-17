/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const NORDEA_CATALOG = [
  {
    title: 'Nordea grupp',
    items: [
      {
        name: 'Nordea.com',
        url: 'https://www.nordea.com/en',
        summary:
          'Põhjamaade suurim pank (Soome, Rootsi, Taani, Norra). Ei paku Eesti erakliendi pangateenuseid — kogutud riiklikud näited (FI, SE).',
        details: ['Eesti filiaal suletud', 'Andmed viiteks Põhjamaade toodetele']
      },
      {
        name: 'Private Banking',
        url: 'https://www.nordea.com/en/our-services/private-banking',
        summary: 'Private banking teenused Põhjamaades.',
        details: ['Kõrge netoväärtusega klientidele', 'Investeerimisnõustamine']
      },
      {
        name: 'Nordea Investor',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/',
        summary: 'Investeerimisplatvorm Põhjamaades.',
        details: ['Aktsiad, fondid, ETF-id', 'Ei ole Eesti turul']
      }
    ]
  },
  {
    title: 'Soome (FI) — säästmine',
    items: [
      {
        name: 'JoustoTalletus',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/saastamisen-tilit/joustotalletus.html',
        summary: 'Paindlik säästukonto Soomes. Muutuv intress perioodi järgi.',
        rates: [
          '1 kk talletusjärk: kogutud parse (nordea.fi)',
          '3 kk talletusjärk: kogutud parse',
          '12 kk talletusjärk: kogutud parse'
        ],
        details: ['Paindlik sissemakse ja väljavõtt', 'Intress sõltub perioodist']
      },
      {
        name: 'Säästötilit ülevaade',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/saastamisen-tilit/',
        summary: 'Kõik Soome säästukontod ja hoiused.',
        details: ['Erinevad säästukontod', 'Pensionisäästmine']
      },
      {
        name: 'Talletustodistus',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/saastamisen-tilit/talletustodistus.html',
        summary: 'Fikseeritud intressiga talletustodistus Soomes.',
        details: ['Fikseeritud periood', 'Kindel intress']
      },
      {
        name: 'Nordea Rahasto (fondid)',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/saastaminen-sijoittaminen/rahastot/',
        summary: 'Nordea investeerimisfondid Soomes.',
        details: ['Aktsia- ja võlakirjafondid', 'Indeksifondid']
      }
    ]
  },
  {
    title: 'Rootsi (SE) — sparkonton',
    items: [
      {
        name: 'Sparkonto Extra',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/',
        summary: 'Kõrge intressiga säästukonto Rootsis.',
        rates: ['Kogutud parse: nordea.se sparkonton leht'],
        details: ['Muutuv intress', 'Pangakonto Rootsis']
      },
      {
        name: 'Fasträntekonto',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/',
        summary: 'Fikseeritud intressiga hoius Rootsis.',
        rates: ['Intressivahemik: vaata nordea.se (min/max kogutud)'],
        details: ['Fikseeritud periood', 'Kindel intress']
      },
      {
        name: 'Sparkonton ülevaade',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/sparkonton/',
        summary: 'Kõik Rootsi säästukontod.',
        details: ['Erinevad säästukontod', 'Barnsparkonto (laste konto)']
      },
      {
        name: 'Nordea Fonder (Rootsi)',
        url: 'https://www.nordea.se/privat/produkter/spara-investera/fonder/',
        summary: 'Nordea fondid Rootsis.',
        details: ['Lai valik fonde', 'Pensionisäästmine']
      }
    ]
  },
  {
    title: 'Laenud ja pangandus',
    items: [
      {
        name: 'Soome laenud (asuntolaina)',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/lainat/',
        summary: 'Asuntolaina (kodulaen), kulutusluotto, autolaina Soomes.',
        details: ['Kodulaen', 'Tarbimislaen', 'Autolaen']
      },
      {
        name: 'Rootsi laenud (bolån)',
        url: 'https://www.nordea.se/privat/produkter/lan/',
        summary: 'Bolån (kodulaen), privatlån, billån Rootsis.',
        details: ['Kodulaen', 'Isiklik laen', 'Autolaen']
      },
      {
        name: 'Soome pangapaketid',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/pankkipalvelut/',
        summary: 'Soome pangapaketid ja igapäevapangandus.',
        details: ['Nordea Flex', 'Nordea Gold', 'Kuutasud erinevad']
      },
      {
        name: 'Rootsi pangapaketid',
        url: 'https://www.nordea.se/privat/produkter/konton-kort/',
        summary: 'Rootsi pangakontod ja kaardid.',
        details: ['Nordea Gold', 'Nordea Premium']
      },
      {
        name: 'Krediitkaardid',
        url: 'https://www.nordea.fi/henkiloasiakkaat/palvelumme/kortit/',
        summary: 'Nordea krediit- ja deebetkaardid Põhjamaades.',
        details: ['Visa/Mastercard', 'Reisikindlustus premium kaartidel']
      }
    ]
  },
  {
    title: 'Äriklient (Põhjamaad)',
    items: [
      {
        name: 'Soome äriklient',
        url: 'https://www.nordea.fi/yrittajat/',
        summary: 'Ettevõtte pangateenused Soomes.',
        details: ['Ärikonto', 'Ärilaen', 'Makseteenused']
      },
      {
        name: 'Rootsi äriklient',
        url: 'https://www.nordea.se/foretag/',
        summary: 'Ettevõtte pangateenused Rootsis.',
        details: ['Ärikonto', 'Faktooring', 'Kaardimaksed']
      }
    ]
  },
  {
    title: 'Märkused Eesti kontekstis',
    items: [
      {
        name: 'Eesti kontekst',
        summary: 'Nordea ei ole Eesti erakliendi pank. Andmed on viiteks Põhjamaade toodetele.',
        details: [
          'Ei ole minuraha.ee baromeetris',
          'Intressid riigiti erinevad (FI vs SE)',
          'Eesti klient ei saa Nordea EE kontot avada',
          'Kogutud andmed aitavad võrrelda Põhjamaade hindu'
        ]
      },
      {
        name: 'Nordea ajalugu Eestis',
        url: 'https://www.nordea.com/en/about-us/history',
        summary: 'Nordea tegutses varem Eestis, kuid erakliendi teenused on lõpetatud.',
        details: ['Klientide üleminek teistele pankadele', 'Grupi teenused jätkuvad Põhjamaades']
      }
    ]
  }
];
