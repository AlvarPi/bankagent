#!/usr/bin/env node
/**
 * Kogub kõigilt pankadelt avaliku info ja salvestab andmebaasi.
 */
import 'dotenv/config';
import { query, getPool } from '../src/lib/server/db.js';
import { collectAll } from './banks/index.js';

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
    for (const warning of bank.warnings) {
      console.warn(`warn ${bank.slug}: ${warning}`);
    }
  }

  console.log(`done, inserted=${inserted}`);
  await getPool().end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
