/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/**
 * Morgan Stanley (slug: morgan-stanley)
 *
 * Morgan Stanley on USA rahvusvaheline investeerimispank ja varahaldusettevõte
 * (asutatud 1935, peakorter New Yorgis, börsisümbol NYSE: MS). See EI ole Eesti
 * erakliendi jaepank: ettevõte ei paku Eestis arvelduskontosid, hoiuseid ega
 * kodulaene tavakliendile. Allpool on kirjeldatud ettevõtte tegelikke
 * ärisegmente ja teenuseid üldiselt, peamiselt USA ja institutsionaalse turu
 * kontekstis. Numbrilisi intresse/hindu pole esitatud, kuna need ei ole
 * Eesti erakliendi jaoks kohaldatavad ega avalikult fikseeritud.
 *
 * Allikad:
 *  - https://www.morganstanley.com
 *  - https://en.wikipedia.org/wiki/Morgan_Stanley
 *  - https://us.etrade.com
 */

/** @type {CatalogSection[]} */
export const MORGAN_STANLEY_CATALOG = [
  {
    title: 'Ärisegmendid (ülevaade)',
    items: [
      {
        name: 'Institutional Securities (institutsionaalsed väärtpaberiteenused)',
        url: 'https://www.morganstanley.com/about-us/business-segments',
        summary:
          'Morgan Stanley investeerimispanganduse põhisegment, mis teenindab ettevõtteid, institutsioone ja valitsusi — mitte erakliente.',
        details: [
          'Kapitali kaasamine (aktsia- ja võlakirjaemissioonid)',
          'Finantsnõustamine: ühinemised ja ülevõtmised (M&A), restruktureerimised',
          'Kinnisvara- ja projektifinantseerimine, ettevõtete laenud',
          'Aktsiate ja fikseeritud tuluga instrumentide kauplemine ja turutegemine, valuuta ja toorained',
          'Investeerimisanalüüs ja riskijuhtimise analüütika'
        ]
      },
      {
        name: 'Wealth Management (varahaldus)',
        url: 'https://www.morganstanley.com/what-we-do/wealth-management',
        summary:
          'Varahaldus jõukatele eraklientidele ja perekondadele, samuti ettevõtetele ja sihtasutustele. Teenust pakutakse peamiselt USA-s; ei ole Eesti jaepanganduse teenus.',
        details: [
          'Maaklerlus ja investeerimisnõustamine (brokerage ja investment advisory)',
          'Finants- ja varaplaneerimine, pärandiplaneerimine',
          'Pensioni- ja annuiteedi- ning kindlustustooted',
          'Krediidi- ja laenutooted Morgan Stanley Private Bank kaudu (USA-s)',
          'Pangandus- ja rahahaldusteenused olemasolevatele varahaldusklientidele'
        ]
      },
      {
        name: 'Investment Management (varahalduse fondid)',
        url: 'https://www.morganstanley.com/im',
        summary:
          'Morgan Stanley Investment Management (MSIM) — globaalne varahalduse divisjon institutsionaalsetele ja jaeklientidele.',
        details: [
          'Aktsia-, fikseeritud tuluga ja alternatiivinvesteeringute strateegiad',
          'Erakapital (private equity), infrastruktuur, kinnisvara, hedge-fondid',
          'Kliendid: korporatsioonid, pensionifondid, sihtasutused, riiklikud investeerimisfondid',
          'Jaotus toimub nii oma kui kolmandate osapoolte kanalite kaudu'
        ]
      }
    ]
  },
  {
    title: 'E*TRADE (jaeinvesteerimine USA-s)',
    items: [
      {
        name: 'E*TRADE from Morgan Stanley',
        url: 'https://us.etrade.com/home',
        summary:
          'E*TRADE on Morgan Stanley tütarettevõte (omandatud 2020, ca 13 mld USD tehing), mis pakub jaeinvesteerimise ja kauplemise platvormi USA turul.',
        details: [
          'Omandamine viidi lõpule oktoobris 2020',
          'Eesmärk: laiendada jaeinvesteerimise haaret massiturule',
          'Teenuste sihtgrupp on USA jaeinvestorid — mitte Eesti kliendid'
        ]
      },
      {
        name: 'Iseseisev investeerimine (self-directed)',
        url: 'https://us.etrade.com/what-we-offer/investment-choices',
        summary:
          'Maaklerikonto, mille kaudu saab USA-s kaubelda aktsiate, ETFide, investeerimisfondide, optsioonide, futuuride ja võlakirjadega.',
        details: [
          '0 USD komisjonitasu USA börsil noteeritud aktsiate, ETFide ja optsioonide veebikauplemisel (kehtivad lepingupõhised optsioonitasud)',
          'Üle 5000 transaktsioonitasuta investeerimisfondi',
          'Kontomiinimum puudub'
        ]
      },
      {
        name: 'Kauplemisplatvormid',
        url: 'https://us.etrade.com/home',
        summary:
          'Mitu kauplemisplatvormi nii alustajatele kui aktiivsetele kauplejatele.',
        details: [
          'Power E*TRADE veebi- ja töölauaplatvorm aktiivsetele kauplejatele',
          'Mobiili- ja veebirakendused',
          'Juurdepääs Morgan Stanley analüüsile ja turuülevaadetele'
        ]
      },
      {
        name: 'Core Portfolios (robo-nõustamine)',
        url: 'https://us.etrade.com/what-we-offer/our-accounts/core-portfolios',
        summary:
          'Automaatne hallatav investeerimisportfell (robo-advisory) USA klientidele.',
        details: ['Automatiseeritud portfellihaldus', 'Madalam sisenemiskünnis kui traditsioonilisel varahaldusel']
      }
    ]
  },
  {
    title: 'Pangandus- ja rahahaldusteenused (USA, seotud klientidele)',
    items: [
      {
        name: 'Morgan Stanley Private Bank',
        url: 'https://www.morganstanley.com/what-we-do/wealth-management',
        summary:
          'FDIC-kindlustatud pangateenused, mida pakutakse varahaldussuhtega klientidele USA-s. Ei ole avalikult kättesaadav Eesti tavakliendile.',
        details: [
          'Krediidi- ja laenulahendused varahaldusklientidele',
          'FDIC-kindlustus on USA hoiusekindlustus (ei laiene Eestile)',
          'Nõuab tavaliselt olemasolevat wealth management suhet'
        ]
      },
      {
        name: 'E*TRADE pangatooted (USA)',
        url: 'https://us.etrade.com/what-we-offer/pricing-and-rates',
        summary:
          'E*TRADE pakub USA turul ka pangatooteid (nt arveldus- ja hoiusekontosid). Tingimused ja intressid avaldatakse E*TRADE veebis ning kehtivad ainult USA-s.',
        details: [
          'FDIC-kindlustatud (USA)',
          'Konkreetsed intressid muutuvad ja avaldatakse jooksvalt E*TRADE hinnalehel',
          'Ei ole suunatud Eesti klientidele'
        ]
      }
    ]
  },
  {
    title: 'Märkused Eesti kontekstis',
    items: [
      {
        name: 'Eesti jaepanganduse tooteid ei pakuta',
        summary:
          'Morgan Stanley on USA investeerimispank ja varahaldur. See EI ole Eesti erakliendi pank — ei paku Eestis arvelduskontot (IBAN/SEPA), tavahoiust ega kodulaenu.',
        details: [
          'Ei osale minuraha.ee hinnabaromeetris',
          'Ei paku Eesti kodulaene ega SEPA arvelduskontot tavakliendile',
          'FDIC-kindlustus on USA-spetsiifiline, mitte Eesti Tagatisfond',
          'Kõik allpool kogutud tooteinfo viitab USA / institutsionaalsele turule'
        ]
      },
      {
        name: 'E*TRADE vs Morgan Stanley',
        url: 'https://us.etrade.com/l/morganstanley/investing-and-banking',
        summary:
          'E*TRADE on Morgan Stanley tütarettevõte, mis teenindab USA jaeinvestoreid; Morgan Stanley keskendub investeerimispangandusele ja jõukate klientide varahaldusele.',
        details: [
          'E*TRADE: iseseisev investeerimine ja pangandus USA jaeklientidele',
          'Morgan Stanley: investeerimispangandus, varahaldus, fondihaldus'
        ]
      },
      {
        name: 'Intresside ja hindade kohta',
        summary:
          'Käesolevasse kataloogi ei ole lisatud konkreetseid Eesti-spetsiifilisi intresse ega hindu, kuna Morgan Stanley ei paku Eestis erakliendi tooteid. USA hinnad ja intressid on muutuvad ning avaldatakse ettevõtte enda veebis.',
        details: [
          'USA E*TRADE hinnad: https://us.etrade.com/what-we-offer/pricing-and-rates',
          'Andmed on viiteks, mitte Eesti pakkumiseks'
        ]
      }
    ]
  }
];
