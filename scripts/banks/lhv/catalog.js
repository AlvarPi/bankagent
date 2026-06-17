/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const LHV_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.lhv.ee/et/hoiused',
        summary: 'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 €.',
        rates: ['Intressid: vaata lhv.ee/hoiused või minuraha baromeetrit']
      },
      {
        name: 'Kogumishoius',
        url: 'https://www.lhv.ee/et/hoiused',
        summary: 'Paindlik kogumishoius igakuise sissemaksega.'
      },
      {
        name: 'Investeerimine',
        url: 'https://www.lhv.ee/et/investeerimine',
        summary: 'Aktsiad, ETF-id, fondid, obligatsioonid. LHV Trader platvorm.'
      },
      {
        name: 'Pension',
        url: 'https://www.lhv.ee/et/pension',
        summary: 'II ja III samba pensionifondid ja pensionikontod.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Basic',
        url: 'https://www.lhv.ee/et/era/pangapaketid',
        summary: 'Põhipakett igapäevaseks panganduseks.',
        details: ['Deebetkaart, internetipank, mobiilipank']
      },
      {
        name: 'Premium',
        url: 'https://www.lhv.ee/et/era/pangapaketid',
        summary: 'Laiendatud teenuste pakett reisikindlustuse ja lisahüvedega.'
      },
      {
        name: 'Platinum',
        url: 'https://www.lhv.ee/et/era/pangapaketid',
        summary: 'Premium+ pakett kõrgeima teenustaseme jaoks.'
      },
      {
        name: 'Noorte pakett',
        url: 'https://www.lhv.ee/et/era/noortele',
        summary: 'Eritingimused noortele (kuni 26 a.).'
      },
      {
        name: 'Lapsele konto',
        url: 'https://www.lhv.ee/et/era/lapsele-konto',
        summary: 'Lapsele arvelduskonto ja säästmine.'
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.lhv.ee/et/era/kaardid',
        summary: 'Visa deebetkaart, Apple Pay ja Google Pay.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.lhv.ee/et/era/kaardid/krediitkaart',
        summary: 'Visa krediitkaart koos ostukindlustusega.'
      },
      {
        name: 'Maksed',
        url: 'https://www.lhv.ee/et/era/maksed',
        summary: 'SEPA maksed, välkmaksed, standing order.'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.lhv.ee/et/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.',
        rates: ['Intressimarginaal alates ~1,5% (muutuv, sõltub profiilist)']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.lhv.ee/et/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.lhv.ee/et/laenud/autolaen',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.lhv.ee/et/laenud/liising',
        summary: 'Finants- ja kapitaliliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.lhv.ee/et/laenud/krediidikonto',
        summary: 'Paindlik krediidikonto igapäevaseks kasutuseks.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Reisikindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/reisikindlustus',
        summary: 'Reisikindlustus Premium/Platinum pakettides.'
      },
      {
        name: 'Kodukindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/kodukindlustus',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'Ettevõtte arveldus ja pangateenused.'
      },
      {
        name: 'Ärilaen ja liising',
        url: 'https://www.lhv.ee/et/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine.'
      },
      {
        name: 'Makseteenused',
        url: 'https://www.lhv.ee/et/ariklient/makseteenused',
        summary: 'Kaardimaksed, e-kaubandus, POS.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Pangateenuste hinnakiri',
        url: 'https://www.lhv.ee/et/era/pangateenuste-hinnakiri',
        summary: 'Erakliendi teenuste hinnakiri (PDF).'
      },
      {
        name: 'Tingimused',
        url: 'https://www.lhv.ee/et/tingimused',
        summary: 'Üldtingimused ja infolehed.'
      }
    ]
  }
];
