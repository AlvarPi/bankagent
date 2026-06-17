#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAll } from './banks/index.js';
import { buildBankPreviewHtml, buildBanksIndexHtml } from './banks/_shared/preview.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_BANKS = join(__dirname, '..', 'static', 'banks');
const slug = process.argv[2];

async function main() {
  const results = await collectAll(slug);
  await mkdir(STATIC_BANKS, { recursive: true });

  for (const data of results) {
    const bankDir = join(STATIC_BANKS, data.slug);
    await mkdir(bankDir, { recursive: true });
    const html = buildBankPreviewHtml(data);
    await writeFile(join(bankDir, 'index.html'), html, 'utf8');
    console.log(`written static/banks/${data.slug}/index.html (${data.rows.length} rows)`);
  }

  if (!slug) {
    const indexHtml = buildBanksIndexHtml(results);
    await writeFile(join(STATIC_BANKS, 'index.html'), indexHtml, 'utf8');
    console.log('written static/banks/index.html');
  }

  console.log('käivita: npm run show-banks');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
