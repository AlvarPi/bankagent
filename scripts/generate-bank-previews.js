#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAll } from './banks/index.js';
import { buildBankPreviewHtml, buildBanksIndexHtml } from './banks/_shared/preview.js';
import { writeKnowledgeFile, saveKnowledgeSnapshots } from './banks/_shared/knowledge-store.js';
import { buildBankKnowledge, buildKnowledgeIndex } from './banks/knowledge.js';
import { buildCoopPreviewHtml } from './banks/coop/overview.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_BANKS = join(__dirname, '..', 'static', 'banks');
const slug = process.argv[2];

async function main() {
  const results = await collectAll(slug);
  await mkdir(STATIC_BANKS, { recursive: true });

  /** @type {object[]} */
  const knowledgeList = [];

  for (const data of results) {
    const bankDir = join(STATIC_BANKS, data.slug);
    await mkdir(bankDir, { recursive: true });
    const knowledge = buildBankKnowledge(data);
    const html =
      data.slug === 'coop'
        ? buildCoopPreviewHtml(data)
        : buildBankPreviewHtml(data, /** @type {any} */ (knowledge).catalog);
    await writeFile(join(bankDir, 'index.html'), html, 'utf8');

    await writeKnowledgeFile(bankDir, knowledge);
    knowledgeList.push(knowledge);

    console.log(
      `written static/banks/${data.slug}/index.html + data.json (${data.rows.length} rows)`
    );
  }

  if (!slug) {
    const indexHtml = buildBanksIndexHtml(results);
    await writeFile(join(STATIC_BANKS, 'index.html'), indexHtml, 'utf8');
    console.log('written static/banks/index.html');

    const knowledgeIndex = buildKnowledgeIndex(results);
    await writeFile(
      join(STATIC_BANKS, 'knowledge.json'),
      `${JSON.stringify(knowledgeIndex, null, 2)}\n`,
      'utf8'
    );
    console.log('written static/banks/knowledge.json');
  }

  const savedKnowledge = await saveKnowledgeSnapshots(knowledgeList);
  if (savedKnowledge > 0) {
    console.log(`saved ${savedKnowledge} knowledge snapshot(s) to DB`);
  }

  console.log('käivita: npm run show-banks');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
