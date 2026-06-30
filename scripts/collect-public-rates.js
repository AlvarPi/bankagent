#!/usr/bin/env node
/**
 * Kogub kõigilt pankadelt avaliku info ja salvestab andmebaasi.
 */
import 'dotenv/config';
import { query, getPool } from '../src/lib/server/db.js';
import { collectAll } from './banks/index.js';
import { buildBankKnowledge } from './banks/knowledge.js';
import { saveKnowledgeSnapshot } from './banks/_shared/knowledge-store.js';

/**
 * @param {import('./banks/_shared/util.js').RateRow} row
 */
async function saveRate(row) {
  await query(
    `INSERT INTO public_rate_snapshots
      (bank_slug, product_type, label, rate_percent, fee_cents, source_url, raw_text)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      row.slug,
      row.product_type,
      row.label,
      row.rate_percent ?? null,
      row.fee_cents ?? null,
      row.source_url,
      row.raw_text ?? ''
    ]
  );
}

async function main() {
  let inserted = 0;
  const results = await collectAll();

  let knowledgeSaved = 0;

  for (const bank of results) {
    for (const row of bank.rows) {
      await saveRate(row);
      inserted += 1;
      const value =
        row.rate_percent != null
          ? `${row.rate_percent}%`
          : row.fee_cents != null
            ? `${row.fee_cents}¢`
            : 'link';
      console.log(`saved ${row.slug} ${row.label} → ${value}`);
    }

    const knowledge = buildBankKnowledge(bank);
    await saveKnowledgeSnapshot(knowledge);
    knowledgeSaved += 1;
    console.log(`saved ${bank.slug} knowledge snapshot`);

    for (const warning of bank.warnings) {
      console.warn(`warn ${bank.slug}: ${warning}`);
    }
  }

  console.log(`done, inserted=${inserted}, knowledge=${knowledgeSaved}`);
  await getPool().end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
