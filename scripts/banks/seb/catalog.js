/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const SEB_CATALOG = [
  {
    title: 'Hoiused ja säästmine',
    items: [
      {
        name: 'Tähtajaline hoius',
        url: 'https://www.seb.ee/eraklient/raha-kasvatamine/hoiused/tahtajaline-hoius',
        summary: 'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt.',
        rates: ['Kuni 1,65% (intressimaarad leht)']
      },
      {
        name: 'Kogumishoius',
        url: 'https://www.seb.ee/eraklient/raha-kasvatamine/hoiused/kogumishoius',
        summary: 'Paindlik kogumishoius, sh Digikassa integratsioon.',
        rates: ['Muutuv intress (vaata intressimaarad)']
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://www.seb.ee/intressimaarad',
        summary: 'Intress arvelduskonto jäägilt.',
        rates: ['Vaata intressimaarad lehte']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.seb.ee/eraklient/raha-kasvatamine/investeerimine',
        summary: 'Fondid, aktsiad, obligatsioonid. SEB investeerimisplatvorm.'
      },
      {
        name: 'Pension',
        url: 'https://www.seb.ee/eraklient/raha-kasvatamine/pension',
        summary: 'II ja III samba pensionifondid.'
      }
    ]
  },
  {
    title: 'Igapäevapangandus – paketid',
    items: [
      {
        name: 'Põhipakett',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/pangapaketid',
        summary: 'Põhiline pangapakett igapäevaseks kasutuseks.'
      },
      {
        name: 'Optimaalne pakett',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/pangapaketid',
        summary: 'Laiendatud teenuste pakett.'
      },
      {
        name: 'Premium pakett',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/pangapaketid',
        summary: 'Kõrgeima taseme pangapakett koos lisahüvedega.'
      },
      {
        name: 'Noortepakett',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/noortepakett',
        summary: 'Eritingimused noortele.'
      },
      {
        name: 'Digikassa',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/digikassa',
        summary: 'Digitaalne rahakott ja makselahendused.'
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/kaardid',
        summary: 'Visa/Mastercard deebetkaardid, nutimaksed.'
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/kaardid/krediitkaart',
        summary: 'Krediitkaart ostukindlustusega.'
      },
      {
        name: 'Maksed',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/maksed',
        summary: 'SEPA, kiirmaksed, välismaa maksed.'
      }
    ]
  },
  {
    title: 'Laenud',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.seb.ee/eraklient/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine.'
      },
      {
        name: 'Väikelaen',
        url: 'https://www.seb.ee/eraklient/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen.'
      },
      {
        name: 'Autolaen',
        url: 'https://www.seb.ee/eraklient/laenud/autolaen',
        summary: 'Sõiduki soetamiseks.'
      },
      {
        name: 'Liising',
        url: 'https://www.seb.ee/eraklient/laenud/liising',
        summary: 'Finants- ja operatiivliising.'
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.seb.ee/eraklient/laenud/krediidikonto',
        summary: 'Paindlik krediidikonto.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Kodukindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus/kodukindlustus',
        summary: 'Kodu ja koduvara kindlustus.'
      },
      {
        name: 'Reisikindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus/reisikindlustus',
        summary: 'Reisi- ja tervisekindlustus.'
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.seb.ee/eraklient/kindlustus',
        summary: 'Sõiduki kindlustuslahendused.'
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.seb.ee/ariklient',
        summary: 'Ettevõtte arveldus ja teenused.'
      },
      {
        name: 'Ärilaen',
        url: 'https://www.seb.ee/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine.'
      },
      {
        name: 'Kaardimaksed',
        url: 'https://www.seb.ee/ariklient/kaardimaksed',
        summary: 'POS, e-kaubandus, makselahendused.'
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Pangateenuste hinnakiri',
        url: 'https://www.seb.ee/eraklient/igapaevapangandus/pangateenuste-hinnakiri',
        summary: 'Erakliendi teenuste hinnakiri.'
      },
      {
        name: 'Intressimäärad',
        url: 'https://www.seb.ee/intressimaarad',
        summary: 'Hoiuste ja kontode intressimäärad.'
      }
    ]
  }
];
