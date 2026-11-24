/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const LIGHTYEAR_CATALOG = [
  {
    title: 'Kasvukonto ja intress',
    items: [
      {
        name: 'Kasvukonto (raha kasvatamine)',
        url: 'https://lightyear.com/et-ee/vaults',
        summary:
          'Kasutamata raha teenib intressi AAA-reitinguga rahaturufondi kaudu (mitte pangahoiusena). Raha saab igal ajal välja võtta; intress arvestatakse iga päev. Tegemist on investeeringuga fondi, mitte hoiusega — kapital on riskis.',
        rates: [
          'EUR Kasvufond: 2,50% APY neto (2,67% − 0,20% tasu) — seisuga 24.11.2026 (lightyear.com/et-ee/vaults)',
          'GBP / USD: vt lightyear.com/et-ee/vaults (eelmine seis 01.07.2026: GBP 3,83%, USD 3,68%)',
          'Miinimum 1 €, maksimumi pole'
        ],
        details: [
          'Fond: BlackRock ICS Euro Liquidity Fund (Premier), ~66 mld €',
          'Järgib EKP baasintressi',
          'Näide: 1000 € → oktoobris tootlus ~67,50 € (kogusumma põhjal)'
        ]
      }
    ]
  },
  {
    title: 'Investeerimine',
    items: [
      {
        name: 'Aktsiad',
        url: 'https://lightyear.com/et-ee',
        summary:
          '4000+ USA aktsiat, Euroopa aktsiad 20+ riigist, UK aktsiad ning Balti aktsiad (Eesti, Läti, Leedu).',
        details: [
          'USA aktsiad: kuni 1 $ tehingu kohta',
          'Balti aktsiad: 3 kuud tasuta, seejärel 1 €',
          'Murdosa-aktsiad (fractional) toetatud'
        ]
      },
      {
        name: 'ETF-id ja fondid',
        url: 'https://lightyear.com/et-ee',
        summary:
          'ETF-id suurematelt pakkujatelt (Vanguard, iShares, VanEck, SPDR, Amundi, Invesco) ning AAA-reitinguga rahaturufondid.',
        details: ['ETF-ide kauplemine: tasuta', 'Investeerimisplaanid ja valmisportfellid']
      },
      {
        name: 'Balti võlakirjad ja krüpto',
        url: 'https://lightyear.com/et-ee',
        summary: 'Balti võlakirjad ning 12 suuremat krüptovara.',
        details: ['Krüptoteenus eraldi Finantsinspektsiooni loa alusel (4.1-1/147)']
      }
    ]
  },
  {
    title: 'Tasud ja kaitse',
    items: [
      {
        name: 'Tasud',
        url: 'https://lightyear.com/et-ee/pricing',
        summary:
          'Lightyeari hinnakiri (Allikas: lightyear.com/et-ee/pricing, 24.11.2026). Täpsed tasud sõltuvad turust.',
        rates: [
          'USA aktsiad: 0,1%, max 1 USD tehingu kohta',
          'Eurodes kaubeldavad aktsiad, võlakirjad, ETN/ETC: 1 EUR',
          'Muud Euroopa aktsiad: 0,1%',
          'Valuutavahetus 0,35%',
          'Konto ja hoiustamine tasuta; Kasvufondi tasud tootlusest juba maha arvatud',
          'LEI-kood 48 € + km'
        ],
        details: [
          'Konto avamine ja haldus: tasuta',
          'ETF-ide kauplemine: tasuta',
          'Valuutavahetus (FX): 0,35%',
          'USA aktsiad: kuni 1 $ tehingu kohta',
          'Balti aktsiad: 3 kuud tasuta, siis 1 €'
        ]
      },
      {
        name: 'Litsents ja investorikaitse',
        summary:
          'Lightyear Europe AS on Eesti Finantsinspektsiooni litsentseeritud investeerimisühing (mitte pank).',
        details: [
          'Litsentsid: 4.1-1/31 (investeerimisteenused), 4.1-1/147 (krüpto)',
          'EL investorikaitse: kuni 20 000 €',
          'USA väärtpaberid: kuni 500 000 $ SIPC (partner Alpaca kaudu)',
          'Kliendivara hoitakse eraldatuna AAA-fondides ja litsentseeritud pankades'
        ]
      }
    ]
  },
  {
    title: 'API ja andmeühendused',
    items: [
      {
        name: 'API, Open Banking ja MCP',
        url: 'https://lightyear.com/et-ee/help',
        summary:
          'Lightyearil avalikku API-t ega MCP serverit ei ole (24.11.2026); andmed ainult rakenduses / väljavõtetena.'
      }
    ]
  }
];
