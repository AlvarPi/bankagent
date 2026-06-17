/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const LUMINOR_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://luminor.ee/eraklient/hoiused',
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €.',
        rates: ['12 kuu baromeeter: ~2,30% (min 100 €, minuraha)', 'Täpsed määrad: luminor.ee (SPA/JS leht)'],
        details: ['Periood 3–60 kuud', 'Minimaalne summa 100 €']
      },
      {
        name: 'Kogumishoius',
        url: 'https://luminor.ee/eraklient/hoiused/kogumishoius',
        summary: 'Paindlik kogumishoius igakuise sissemaksega.',
        details: ['Igakuine sissemakse', 'Väljavõtt võimalik']
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://luminor.ee/intressi-ja-viivisemaarad',
        summary: 'Intress arvelduskonto jäägilt (JS leht).',
        rates: ['Baromeeter: intress alates 18 000 € jäägilt (minuraha)'],
        details: ['Sõltub paketist', 'Intressi- ja viivistemäärad lehel']
      },
      {
        name: 'Investeerimine',
        url: 'https://luminor.ee/eraklient/investeerimine',
        summary: 'Fondid, aktsiad, obligatsioonid.',
        details: ['Luminor investeerimisplatvorm', 'Pensionifondid']
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://luminor.ee/eraklient/pension',
        summary: 'II samba pensionifondid ja III samba vabatahtlik pension.',
        details: ['Luminor pensionifondid', 'III samba maksusoodustus']
      },
      {
        name: 'Lapsele säästmine',
        url: 'https://luminor.ee/eraklient/hoiused',
        summary: 'Lapse tuleviku jaoks säästmine.',
        details: ['Kogumishoius lapsele', 'Vanemate kontroll']
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Põhiline pangapakett igapäevaseks kasutuseks.',
        details: ['Arvelduskonto, internetipank', 'Deebetkaart', 'Kuutasu: hinnakiri']
      },
      {
        name: 'Aktiivne pakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Laiendatud teenuste pakett aktiivsele kasutajale.',
        details: ['Reisikindlustus', 'Ostukaitse', 'Soodustused']
      },
      {
        name: 'Premium pakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Kõrgeima taseme pangapakett koos lisahüvedega.',
        details: ['Laiem kindlustuskaitse', 'Concierge', 'Airport lounge (tingimustel)']
      },
      {
        name: 'Noortepakett',
        url: 'https://luminor.ee/eraklient/noortele',
        summary: 'Eritingimused noortele.',
        rates: ['Soodushinnaga või tasuta teenused'],
        details: ['Noortele suunatud pakkumised']
      },
      {
        name: 'Pensionäride pakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Soodustingimused pensioniealistele.',
        details: ['Võimalik tasuta arveldus']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://luminor.ee/eraklient/kaardid',
        summary: 'Visa/Mastercard deebetkaardid, nutimaksed.',
        details: ['Apple Pay, Google Pay', 'Ostukaitse']
      },
      {
        name: 'Krediitkaart',
        url: 'https://luminor.ee/eraklient/kaardid/krediitkaart',
        summary: 'Krediitkaart ostukindlustusega.',
        details: ['Krediidilimiit', 'Grace period']
      },
      {
        name: 'Maksed',
        url: 'https://luminor.ee/eraklient/maksed',
        summary: 'SEPA, kiirmaksed, välismaa maksed.',
        details: ['SEPA Instant', 'Püsikorraldused']
      },
      {
        name: 'Nutimaksed',
        url: 'https://luminor.ee/eraklient/kaardid',
        summary: 'Apple Pay, Google Pay, Garmin Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://luminor.ee/eraklient/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.',
        rates: ['Intressimarginaal sõltub profiilist'],
        details: ['Kuni 30 aastat', 'Eelotsus internetis']
      },
      {
        name: 'Väikelaen',
        url: 'https://luminor.ee/eraklient/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen.',
        details: ['Fikseeritud kuumakse']
      },
      {
        name: 'Autolaen',
        url: 'https://luminor.ee/eraklient/laenud/autolaen',
        summary: 'Sõiduki soetamiseks.',
        details: ['Uus ja kasutatud auto']
      },
      {
        name: 'Liising',
        url: 'https://luminor.ee/eraklient/laenud/liising',
        summary: 'Finants- ja operatiivliising.',
        details: ['Kapitaliliising', 'Operatiivliising']
      },
      {
        name: 'Krediidikonto',
        url: 'https://luminor.ee/eraklient/laenud/krediidikonto',
        summary: 'Paindlik krediidikonto.',
        details: ['Intress kasutatud summalt']
      },
      {
        name: 'Õppelaen',
        url: 'https://luminor.ee/eraklient/laenud',
        summary: 'Õpingute finantseerimine.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus/kodukindlustus',
        summary: 'Kodu ja koduvara kindlustus.',
        details: ['Erinevad kaitsetasemed']
      },
      {
        name: 'Reisikindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus/reisikindlustus',
        summary: 'Reisi- ja tervisekindlustus.',
        details: ['Pakettides kaasas']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.',
        details: ['Võrdle pakkumisi']
      },
      {
        name: 'Õnnetusjuhtumi kindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus',
        summary: 'Trahvide kaitse.'
      },
      {
        name: 'Elukindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus',
        summary: 'Elukindlustus.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'Luminor pakkumised',
        url: 'https://luminor.ee/eraklient/pakkumised',
        summary: 'Partnerite soodustused ja kampaaniad.',
        details: ['Muutuvad pakkumised']
      },
      {
        name: 'Uue kliendi kampaaniad',
        url: 'https://luminor.ee/eraklient',
        summary: 'Aeg-ajalt kampaaniad uutele klientidele.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://luminor.ee/ariklient',
        summary: 'Ettevõtte arveldus ja teenused.',
        details: ['SEPA maksed', 'Mitme kasutaja ligipääs']
      },
      {
        name: 'Äripaketid',
        url: 'https://luminor.ee/ariklient/pangateenused',
        summary: 'Erineva mahuga äripaketid.',
        details: ['Kuutasu sõltub mahust']
      },
      {
        name: 'Ärilaen',
        url: 'https://luminor.ee/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine.',
        details: ['Investeerimislaen', 'Leasing']
      },
      {
        name: 'Kaardimaksed',
        url: 'https://luminor.ee/ariklient/kaardimaksed',
        summary: 'POS, e-kaubandus.',
        details: ['Visa/Mastercard kaupmehele']
      },
      {
        name: 'Faktooring',
        url: 'https://luminor.ee/ariklient/laenud',
        summary: 'Arvete faktooring.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://luminor.ee/hinnakiri',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri.',
        details: ['Pakettide kuutasud', 'Kaartide tasud']
      },
      {
        name: 'Intressi- ja viivistemäärad',
        url: 'https://luminor.ee/intressi-ja-viivisemaarad',
        summary: 'Hoiuste ja laenude intressimäärad (SPA/JS leht).',
        details: ['Dünaamiline leht — automaatne scrape ebausaldusväärne']
      },
      {
        name: 'Tingimused',
        url: 'https://luminor.ee/tingimused',
        summary: 'Üldtingimused ja infolehed.'
      },
      {
        name: 'Pangakontorid',
        url: 'https://luminor.ee/kontakt',
        summary: 'Kontorite asukohad ja klienditugi.'
      }
    ]
  }
];
