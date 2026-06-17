import { query } from '$lib/server/db.js';

export async function load() {
  try {
    const res = await query(
      `SELECT DISTINCT ON (bank_slug, product_type, label)
              bank_slug, product_type, label, rate_percent, fee_cents, source_url, scraped_at
       FROM public_rate_snapshots
       ORDER BY bank_slug, product_type, label, scraped_at DESC`
    );
    return { rates: res.rows };
  } catch (err) {
    return { rates: [], dbError: err instanceof Error ? err.message : 'DB error' };
  }
}
