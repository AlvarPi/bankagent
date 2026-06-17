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
        summary: 'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt.',
        rates: ['Vaata luminor.ee intressimäärasid või minuraha baromeetrit']
      },
      {
        name: 'Kogumishoius',
        url: 'https://luminor.ee/eraklient/hoiused/kogumishoius',
        summary: 'Paindlik kogumishoius igakuise sissemaksega.'
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://luminor.ee/intressi-ja-viivisemaarad',
        summary: 'Intress arvelduskonto jäägilt (JS leht).'
      },
      {
        name: 'Investeerimine',
        url: 'https://luminor.ee/eraklient/investeerimine',
        summary: 'Fondid, aktsiad, obligatsioonid.'
      },
      {
        name: 'Pension',
        url: 'https://luminor.ee/eraklient/pension',
        summary: 'II ja III samba pensionifondid.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Põhiline pangapakett igapäevaseks kasutuseks.'
      },
      {
        name: 'Aktiivne pakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Laiendatud teenuste pakett.'
      },
      {
        name: 'Premium pakett',
        url: 'https://luminor.ee/eraklient/pangapaketid',
        summary: 'Kõrgeima taseme pangapakett koos lisahüvedega.'
      },
      {
        name: 'Noortepakett',
        url: 'https://luminor.ee/eraklient/noortele',
        summary: 'Eritingimused noortele.'
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://luminor.ee/eraklient/kaardid',
        summary: 'Visa/Mastercard deebetkaardid, nutimaksed.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://luminor.ee/eraklient/kaardid/krediitkaart',
        summary: 'Krediitkaart ostukindlustusega.'
      },
      {
        name: 'Maksed',
        url: 'https://luminor.ee/eraklient/maksed',
        summary: 'SEPA, kiirmaksed, välismaa maksed.'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://luminor.ee/eraklient/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://luminor.ee/eraklient/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://luminor.ee/eraklient/laenud/autolaen',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://luminor.ee/eraklient/laenud/liising',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://luminor.ee/eraklient/laenud/krediidikonto',
        summary: 'Paindlik krediidikonto.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus/kodukindlustus',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus/reisikindlustus',
        summary: 'Reisi- ja tervisekindlustus.'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://luminor.ee/eraklient/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://luminor.ee/ariklient',
        summary: 'Ettevõtte arveldus ja teenused.'
      },
      {
        name: 'Ärilaen',
        url: 'https://luminor.ee/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine.'
      },
      {
        name: 'Kaardimaksed',
        url: 'https://luminor.ee/ariklient/kaardimaksed',
        summary: 'POS, e-kaubandus.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Hinnakiri',
        url: 'https://luminor.ee/hinnakiri',
        summary: 'Erakliendi ja ärikliendi teenuste hinnakiri.'
      },
      {
        name: 'Intressi- ja viivistemäärad',
        url: 'https://luminor.ee/intressi-ja-viivisemaarad',
        summary: 'Hoiuste ja laenude intressimäärad (SPA/JS leht).'
      }
    ]
  }
];
