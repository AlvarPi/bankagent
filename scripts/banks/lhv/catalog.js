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
        summary:
          'Fikseeritud intressiga tähtajaline hoius. Tagatud Tagatisfondi poolt kuni 100 000 € hoiustaja kohta.',
        rates: ['12 kuu baromeeter: ~2,30% (min 100 €, minuraha)', 'Täpsed määrad: lhv.ee/hoiused (403 automaatpäringule)'],
        details: ['Periood 3–60 kuud', 'Minimaalne summa 100 €', 'Intress makstakse tähtaja lõpus või igakuiselt']
      },
      {
        name: 'Kogumishoius',
        url: 'https://www.lhv.ee/et/hoiused',
        summary: 'Paindlik kogumishoius igakuise sissemaksega. Sobib eesmärgipõhiseks säästmiseks.',
        details: ['Sissemakse igakuiselt', 'Väljavõtt võimalik', 'Intress koguneb igakuiselt']
      },
      {
        name: 'Arvelduskonto intress',
        url: 'https://www.lhv.ee/et/hoiused',
        summary: 'Intress arvelduskonto jäägilt (tingimustel).',
        rates: ['Baromeeter: intress alates 18 000 € jäägilt (minuraha)'],
        details: ['Sõltub kontotüübist ja paketist', 'Premium/Platinum pakettides paremad tingimused']
      },
      {
        name: 'Investeerimine',
        url: 'https://www.lhv.ee/et/investeerimine',
        summary: 'Aktsiad, ETF-id, fondid, obligatsioonid. LHV Trader platvorm.',
        details: [
          'LHV Trader veeb ja mobiil',
          'LHV pensionifondid ja kolmandate osapoolte fondid',
          'Väärtpaberikonto ja investeerimiskonto'
        ]
      },
      {
        name: 'Pension (II ja III sammas)',
        url: 'https://www.lhv.ee/et/pension',
        summary: 'II samba pensionifondid ja III samba vabatahtlik pension.',
        details: ['LHV pensionifondide valik', 'III samba maksusoodustus', 'Pensionikalkulaator veebis']
      },
      {
        name: 'Lapsele konto ja säästmine',
        url: 'https://www.lhv.ee/et/era/lapsele-konto',
        summary: 'Lapsele arvelduskonto ja säästmislahendused.',
        details: ['Vanemate kontroll', 'Säästmine lapse tulevikuks']
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
        details: ['Deebetkaart', 'Internetipank ja mobiilipank', 'Kuutasu: vaata hinnakirja'],
        rates: ['Pangateenuste hinnakiri (PDF)']
      },
      {
        name: 'Premium',
        url: 'https://www.lhv.ee/et/era/pangapaketid',
        summary: 'Laiendatud teenuste pakett reisikindlustuse ja lisahüvedega.',
        details: ['Reisikindlustus', 'Ostukaitse', 'Soodustused partnerite juures']
      },
      {
        name: 'Platinum',
        url: 'https://www.lhv.ee/et/era/pangapaketid',
        summary: 'Premium+ pakett kõrgeima teenustaseme jaoks.',
        details: ['Laiem reisikindlustus', 'Concierge-teenus', 'Airport lounge (tingimustel)']
      },
      {
        name: 'Noorte pakett',
        url: 'https://www.lhv.ee/et/era/noortele',
        summary: 'Eritingimused noortele (kuni 26 a.).',
        rates: ['Soodushinnaga teenused'],
        details: ['Tasuta või soodushinnaga arveldus', 'LHV noortepakett']
      },
      {
        name: 'Lapsele konto',
        url: 'https://www.lhv.ee/et/era/lapsele-konto',
        summary: 'Lapsele arvelduskonto taskuraha ja säästmiseks.',
        details: ['Vanem saab jälgida tehinguid', 'Kaart lapsele võimalik']
      }
    ]
  },
  {
    title: 'Kaardid ja maksed',
    items: [
      {
        name: 'Deebetkaart',
        url: 'https://www.lhv.ee/et/era/kaardid',
        summary: 'Visa deebetkaart, Apple Pay, Google Pay, Garmin Pay.',
        details: ['Virtuaalkaart võimalik', 'Ostukaitse', 'Pettusekaitse 24/7']
      },
      {
        name: 'Krediitkaart',
        url: 'https://www.lhv.ee/et/era/kaardid/krediitkaart',
        summary: 'Visa krediitkaart koos ostukindlustuse ja reisikindlustusega.',
        details: ['Krediidilimiit sõltub sissetulekust', 'Grace period']
      },
      {
        name: 'Maksed',
        url: 'https://www.lhv.ee/et/era/maksed',
        summary: 'SEPA maksed, kiirmaksed, standing order, välismaa maksed.',
        details: ['SEPA Instant', 'Püsikorraldused', 'Välismaa maksed SWIFT']
      },
      {
        name: 'Nutimaksed',
        url: 'https://www.lhv.ee/et/era/kaardid',
        summary: 'Apple Pay, Google Pay, Garmin Pay, Fitbit Pay.'
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Kodulaen',
        url: 'https://www.lhv.ee/et/laenud/kodulaen',
        summary: 'Kinnisvara ostmine, ehitus, renoveerimine, refinantseerimine.',
        rates: ['Intressimarginaal alates ~1,5% (muutuv, sõltub profiilist)'],
        details: ['Kuni 30 aastat', 'Kiire eelotsus internetis', 'KredEx toetused võimalikud']
      },
      {
        name: 'Väikelaen',
        url: 'https://www.lhv.ee/et/laenud/vaikelaen',
        summary: 'Tagatiseta isiklik laen 500–30 000 €.',
        details: ['Fikseeritud kuumakse', 'Taotlus internetipangas']
      },
      {
        name: 'Autolaen',
        url: 'https://www.lhv.ee/et/laenud/autolaen',
        summary: 'Sõiduki soetamiseks uuele või kasutatud autole.',
        details: ['Sissemakse alates 10%', 'Liising alternatiivina']
      },
      {
        name: 'Liising',
        url: 'https://www.lhv.ee/et/laenud/liising',
        summary: 'Finants- ja kapitaliliising sõidukitele.',
        details: ['Kapitaliliising', 'Operatiivliising ettevõtetele']
      },
      {
        name: 'Krediidikonto',
        url: 'https://www.lhv.ee/et/laenud/krediidikonto',
        summary: 'Paindlik krediidikonto igapäevaseks kasutuseks.',
        details: ['Intress ainult kasutatud summalt', 'Limiit sõltub sissetulekust']
      },
      {
        name: 'Õppelaen',
        url: 'https://www.lhv.ee/et/laenud',
        summary: 'Õpingute finantseerimine.'
      }
    ]
  },
  {
    title: 'Kindlustus',
    items: [
      {
        name: 'Reisikindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/reisikindlustus',
        summary: 'Reisikindlustus Premium/Platinum pakettides või eraldi.',
        details: ['Meditsiin, pagas, reisi tühistamine', 'Perekond kaetud pakettides']
      },
      {
        name: 'Kodukindlustus',
        url: 'https://www.lhv.ee/et/kindlustus/kodukindlustus',
        summary: 'Kodu, koduvara ja vastutuskindlustus.',
        details: ['Erinevad kaitsetasemed', 'Kodulaenu puhul nõutav']
      },
      {
        name: 'Liiklus- ja kaskokindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Sõiduki kindlustuslahendused LHV keskkonnas.',
        details: ['Võrdle pakkumisi', 'Liisingu puhul kasko']
      },
      {
        name: 'Õnnetusjuhtumi kindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Trahvide ja invaliidsuse kaitse.'
      },
      {
        name: 'Elukindlustus',
        url: 'https://www.lhv.ee/et/kindlustus',
        summary: 'Elukindlustus pere kaitsmiseks.'
      }
    ]
  },
  {
    title: 'Kampaaniad ja pakkumised',
    items: [
      {
        name: 'LHV pakkumised',
        url: 'https://www.lhv.ee/et/era/pakkumised',
        summary: 'Aeg-ajalt kampaaniad uutele ja olemasolevatele klientidele.',
        details: ['Muutuvad tingimused', 'Jälgi lhv.ee pakkumiste lehte']
      },
      {
        name: 'Investeerimiskampaaniad',
        url: 'https://www.lhv.ee/et/investeerimine',
        summary: 'Soodustused tehingutasudel või uutele investoritele.',
        details: ['LHV Trader kampaaniad']
      }
    ]
  },
  {
    title: 'Äriklient',
    items: [
      {
        name: 'Ärikonto',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'Ettevõtte arveldus ja igapäevapangandus.',
        details: ['SEPA maksed', 'Mitme kasutaja ligipääs', 'API integratsioonid']
      },
      {
        name: 'Äripaketid',
        url: 'https://www.lhv.ee/et/ariklient/pangateenused',
        summary: 'Erineva mahuga äripaketid.',
        details: ['Kuutasu sõltub mahust', 'Tasuta maksed teatud mahus']
      },
      {
        name: 'Ärilaen ja liising',
        url: 'https://www.lhv.ee/et/ariklient/laenud',
        summary: 'Ettevõtte finantseerimine, käibekapital, investeeringud.',
        details: ['MES kaasfinantseerimine', 'Kinnisvara tagatisel laenud']
      },
      {
        name: 'Makseteenused',
        url: 'https://www.lhv.ee/et/ariklient/makseteenused',
        summary: 'Kaardimaksed, e-kaubandus, POS terminalid.',
        details: ['Visa/Mastercard kaupmehele', 'E-arved ja arvemaksed']
      },
      {
        name: 'Investeerimispangandus',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'Ettevõtte väärtpaberite haldus ja finantseerimine.',
        details: ['IPO ja võlakirjad', 'Suuremate ettevõtete nõustamine']
      },
      {
        name: 'Fintech ja startup',
        url: 'https://www.lhv.ee/et/ariklient',
        summary: 'LHV on tuntud fintech- ja startup-kliendid.',
        details: ['Kiire konto avamine', 'API ja Open Banking']
      }
    ]
  },
  {
    title: 'Tingimused ja info',
    items: [
      {
        name: 'Pangateenuste hinnakiri',
        url: 'https://www.lhv.ee/et/era/pangateenuste-hinnakiri',
        summary: 'Erakliendi teenuste hinnakiri (PDF).',
        details: ['Pakettide kuutasud', 'Kaartide tasud', 'Maksete hinnad']
      },
      {
        name: 'Tingimused',
        url: 'https://www.lhv.ee/et/tingimused',
        summary: 'Üldtingimused ja infolehed.',
        details: ['Privaatsuspoliitika', 'Teenuse tingimused']
      },
      {
        name: 'Pangakontorid',
        url: 'https://www.lhv.ee/et/kontakt',
        summary: 'Kontorite asukohad ja lahtiolekuajad.',
        details: ['Tallinn, Tartu', 'Videokohtumine võimalik']
      },
      {
        name: 'Open Banking',
        url: 'https://developers.lhv.ee',
        summary: 'LHV avatud panganduse API arendajatele.'
      }
    ]
  }
];
