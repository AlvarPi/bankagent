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
          'EUR: 2,16% APY — seisuga 01.07.2026 (lightyear.com/et-ee/vaults)',
          'GBP: 3,83% APY — seisuga 01.07.2026',
          'USD: 3,68% APY — seisuga 01.07.2026'
        ],
        details: [
          'Tootlus tuleb rahaturufondi (AAA) kaudu, mitte pangahoiusena',
          'Muutuv määr, jälgib keskpankade intresse',
          'Raha saab igal ajal kulutada/üle kanda',
          'Kapital on riskis, tootlus ei ole garanteeritud'
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
        summary: 'Kontotasu puudub; makstakse ainult kasutamise eest.',
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
  }
];
