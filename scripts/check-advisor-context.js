#!/usr/bin/env node
// Nõustaja konteksti kontroll: kas päringule valitud bank_data sisaldab oodatud fakte.
// Kasutus: node scripts/check-advisor-context.js ["küsimus" ...]   (vaikimisi näidisküsimused)
// NB: mustrid on seotud 24.11.2026 numbritega — numbrite muutudes uuenda mustreid.
import { loadBankKnowledge } from './banks/_shared/advisor.js';
import { buildRetrievedContext } from './banks/_shared/advisor-retrieval.js';
const k = await loadBankKnowledge(new URL('../static/banks', import.meta.url).pathname);
// fakt -> mustrid, mida kontekstis peaks näha olema
const blk = (slug, re) => (ctx) => { const m = ctx.match(new RegExp(`## [^\n]*\\(${slug}\\)[\\s\\S]*?(?=\n## |$)`)); return Boolean(m && re.test(m[0])); };
const checks = {
  'LHV hoius 12k': blk('lhv', /hoius EUR 12 kuud: 2\.6%|EUR 12 kuud 2,60%/),
  'Luminor hoius 12k': blk('luminor', /EUR 12 kuud[^\n]*3\.5%/),
  'SEB hoius 12k': blk('seb', /EUR 12 kuud[^\n]*2\.5%/),
  'Swed hoius 12k': blk('swedbank', /EUR 12 kuud: 2\.6%/),
  'Citadele hoius': blk('citadele', /hoius|Hoius/),
  'Bigbank hoius': blk('bigbank', /\[deposit\]/),
  'Holm hoius': blk('holm', /\[deposit\]/),
  'Coop hoius 12k': blk('coop', /12-17 kuud: 2\.7%/),
  'Coop kodulaen': blk('coop', /A-energiaklass[^\n]*1\.49%/),
  'LHV kodulaen': blk('lhv', /A\/B-energiaklassi kodu[^\n]*1\.49%/),
  'SEB kodulaen': blk('seb', /KKM näide: 3\.66%/),
  'Swed kodulaen': blk('swedbank', /KKM näite marginaal[^\n]*1\.5%/),
  'Luminor kodulaen': blk('luminor', /1,30% \+ EURIBOR/),
  'Citadele kodulaen': blk('citadele', /1,8% \+ 6 kuu EURIBOR/),
  'Bigbank kodulaen': blk('bigbank', /1,95% \+ 6 kuu EURIBOR/),
  'Holm kodulaen': blk('holm', /Kodulaen/),
  'Wise ülekanne': (c) => /Ülekanne 1000 EUR → USD/.test(c),
  'LHV MCP': (c) => /mcp\.lhv\.ai/.test(c),
};
const DEFAULT_QUERIES = [
  'Milline pank annab parima tähtajalise hoiuse intressi 12 kuuks?',
  'Kus on kõige soodsam kodulaen?',
  'Mis on LHV hoiuse intress?',
  "Kui palju maksab 1000 eurot USA-sse saata Wise'iga?",
  'Kas mõnel pangal on MCP server?'
];
const queries = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_QUERIES;
for (const q of queries) {
  const ctx = buildRetrievedContext(k, [{ role: 'user', content: q }]);
  const head = ctx.split('\n').filter(l => /^(Tuvastatud|Teemad|Täielik)/.test(l)).join(' | ');
  console.log(`\n### "${q}"  (${ctx.length} märki)\n  ${head}`);
  const ok = [], miss = [];
  for (const [n, re] of Object.entries(checks)) (re(ctx) ? ok : miss).push(n);
  console.log('  OLEMAS:', ok.join(', ') || '—');
  console.log('  PUUDU :', miss.join(', ') || '—');
}
