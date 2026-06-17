import { query } from '$lib/server/db.js';

export async function load() {
  try {
    const res = await query(
      `SELECT a.id, a.label, a.iban, a.balance_cents, a.currency, a.source, b.name AS bank_name
       FROM accounts a
       LEFT JOIN banks b ON b.slug = a.bank_slug
       ORDER BY b.name NULLS LAST, a.label`
    );
    return { accounts: res.rows };
  } catch (err) {
    return { accounts: [], dbError: err instanceof Error ? err.message : 'DB error' };
  }
}
