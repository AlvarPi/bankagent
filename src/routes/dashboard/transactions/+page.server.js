import { query } from '$lib/server/db.js';

export async function load() {
  try {
    const res = await query(
      `SELECT t.booked_at, t.amount_cents, t.currency, t.description, t.counterparty,
              a.label AS account_label, b.name AS bank_name
       FROM transactions t
       JOIN accounts a ON a.id = t.account_id
       LEFT JOIN banks b ON b.slug = a.bank_slug
       ORDER BY t.booked_at DESC, t.id DESC
       LIMIT 200`
    );
    return { transactions: res.rows };
  } catch (err) {
    return { transactions: [], dbError: err instanceof Error ? err.message : 'DB error' };
  }
}
