/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const IUTECREDIT_CATALOG = [
  {
    title: 'Võlakirjad ja investeerimine',
    items: [
      {
        name: 'Iute 12% tagatud eelisvõlakiri 2025/2030',
        url: 'https://iute.com/et/volakiri',
        summary:
          'Avalikult kaubeldav tagatud eelisvõlakiri (senior secured bond). Ei ole pangahoius — intress on võlakirja kupong, mitte hoiuseintress. Veebileht www.iute.ee suunab ümber sellele võlakirjalehele.',
        rates: [
          'Kupong (intress) 12% aastas (allikas: Iute prospekti kokkuvõte, juuni 2026)',
          'Nimiväärtus EUR 100.00 võlakirja kohta (allikas: prospekti kokkuvõte)'
        ],
        details: [
          'Liik: 12% tagatud eelisvõlakirjad (senior secured bonds), ISIN XS3047514446 (allikas: prospekti kokkuvõte)',
          'Lunastustähtaeg 6. detsember 2030 (allikas: prospekti kokkuvõte)',
          'Emitent: IuteCredit Finance S.à r.l. (Luksemburg); emaettevõte ja garantii: Iute Group AS (Eesti) (allikas: prospekti kokkuvõte)',
          'Uute võlakirjade emissioon EUR 140 000 000, konsolideeritakse olemasoleva EUR 160 000 000 seeriaga 2025/2030 (allikas: prospekti kokkuvõte)',
          'Intressi makstakse esimese 48 kuu jooksul poolaastati (6. juuni ja 6. detsember), seejärel kvartalite kaupa (allikas: prospekti kokkuvõte)',
          'Noteerimine Nasdaq Tallinna börsi Balti reguleeritud turul ja Frankfurdi börsil (General Standard); eeldatav noteerimine ~4. juuni 2026 (allikas: prospekti kokkuvõte)',
          'Valuuta: EUR (allikas: prospekti kokkuvõte)',
          'Miinimuminvesteering: ei õnnestunud lehelt täpselt tuvastada — vaata iute.com/et/volakiri ja prospekti'
        ]
      },
      {
        name: 'Võlakirja tagatis ja riskid',
        url: 'https://iute.com/et/volakiri',
        summary:
          'Tähtis: võlakiri EI OLE kaetud Tagatisfondi hoiusekaitsega. See on tagatud Grupi ettevõtete garantiide ja tehingutagatistega; investor võib investeeritud kapitali täielikult või osaliselt kaotada.',
        details: [
          'Tingimusteta ja tagasivõtmatult solidaarselt tagatud Grupi garantiiandjate poolt, lisaks kohaliku õiguse alusel antud tehingutagatised (allikas: prospekti kokkuvõte)',
          'Pari passu teiste tagatud kohustustega, kõrgemal allutatud võlast (allikas: prospekti kokkuvõte)',
          'Riskid: krediidirisk, kõrge võlakohustiste tase, likviidsusrisk, valuutarisk (Grupp tegutseb BGN, MDL, ALL, UAH, MKD valuutades) (allikas: prospekti kokkuvõte)',
          'Prospekti kinnitas Luksemburgi finantsjärelevalve CSSF (1. juuni 2026) (allikas: prospekti kokkuvõte)',
          'PARANDUS varasemale kirjele: väide "Tagatud Tagatisfondi poolt kuni 100 000 €" oli VÄÄR — võlakiri ei ole hoius ega kuulu hoiusekaitse alla'
        ]
      }
    ]
  },
  {
    title: 'Laenud (eraklient)',
    items: [
      {
        name: 'Tarbimislaenud — ei pakuta Eestis',
        url: 'https://iute.com/et/volakiri',
        summary:
          'IuteCredit on tarbimisfinantseerimise grupp, kuid laenutooteid (väikelaen, järelmaks) EI pakuta Eesti turul. Laenutegevus toimub Moldovas, Albaanias, Bulgaarias ja Põhja-Makedoonias.',
        details: [
          'Grupi laenuettevõtted: IuteCredit S.R.L. (Moldova), IuteCredit Albania SH.A (Albaania), IuteCredit Bulgaria EOOD (Bulgaaria), IuteCredit Macedonia DOOEL Skopje (Põhja-Makedoonia) (allikas: prospekti kokkuvõte)',
          'Eesti laenulehed iute.com/et/laenud, /autolaen, /kodulaen jne ei eksisteeri — leht /et/laenud/ tagastab HTTP 404 (kontrollitud 06/2026)',
          'www.iute.ee suunab ümber võlakirjalehele iute.com/et/volakiri (kontrollitud 06/2026)',
          'Konkreetsed laenusummad, intressimäärad ja krediidi kulukuse määr (KKM) Eesti kohta: ei leitud, sest toodet Eestis ei turustata',
          'MÄRKUS: varasemas kataloogis loetletud Autolaen, Kodulaen, Refinantseerimine ja "Laen kinnisvara tagatisel" olid spekulatiivsed — vastavad URL-id ei tööta'
        ]
      }
    ]
  },
  {
    title: 'Makseviisid ja kaardid',
    items: [
      {
        name: 'Järelmaks ja kaardid — ei pakuta Eestis',
        url: 'https://iute.com/et/volakiri',
        summary:
          'Järelmaks, krediitkaart ja mobiilirakendus on Grupi tooted välisturgudel (Moldova, Albaania, Bulgaaria, Põhja-Makedoonia), mitte Eesti tarbijatele.',
        details: [
          'Järelmaksu konkreetsed tingimused (summad, intress, KKM): ei leitud Eesti kohta',
          'Eesti-spetsiifilisi makse- ja kaarditooteid avalikust veebist ei tuvastatud (06/2026)'
        ]
      }
    ]
  },
  {
    title: 'Ettevõte ja info',
    items: [
      {
        name: 'Iute Group AS',
        url: 'https://iute.com/et/',
        summary:
          'Eestis registreeritud emaettevõte (aktsiaselts), tarbimisfinantseerimise grupp Kagu-Euroopas. Tegevus laenude alal toimub välisriikides; Eestis on avalik fookus võlakirjadel.',
        details: [
          'Tegutsemisriigid laenude alal: Moldova, Albaania, Bulgaaria, Põhja-Makedoonia (allikas: prospekti kokkuvõte)',
          'Emitent võlakirjade alal: IuteCredit Finance S.à r.l. (Luksemburg) (allikas: prospekti kokkuvõte)'
        ]
      },
      {
        name: 'Märkused võlakirja kohta',
        url: 'https://iute.com/et/volakiri',
        summary:
          'Ei ole minuraha.ee hoiuste baromeetris. Võlakirja intress (kupong) ≠ hoiuse intress. Kapital ei ole hoiusekaitsega tagatud.',
        details: [
          'IuteCredit ei ole hoiuseid kaasav universaalpank',
          'Võlakiri on võlakohustus, mitte hoius — investeeritud raha võib täielikult või osaliselt kaduda (allikas: prospekti kokkuvõte)'
        ]
      }
    ]
  }
];
