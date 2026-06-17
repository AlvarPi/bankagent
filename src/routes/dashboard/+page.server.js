import { query } from '$lib/server/db.js';

/** @returns {Promise<{ overview: import('./$types').PageServerData['overview'] }>} */
export async function load() {
  try {
    const [accountsRes, txRes] = await Promise.all([
      query(
        `SELECT a.id, a.label, a.balance_cents, a.currency, b.name AS bank_name
         FROM accounts a
         LEFT JOIN banks b ON b.slug = a.bank_slug
         ORDER BY a.id`
      ),
      query(
        `SELECT t.id, t.booked_at, t.amount_cents, t.currency, t.description, a.label AS account_label
         FROM transactions t
         JOIN accounts a ON a.id = t.account_id
         ORDER BY t.booked_at DESC, t.id DESC
         LIMIT 10`
      )
    ]);

    const totalBalanceCents = accountsRes.rows.reduce(
      (sum, row) => sum + Number(row.balance_cents),
      0
    );

    return {
      overview: {
        accounts: accountsRes.rows,
        transactions: txRes.rows,
        totalBalanceCents
      }
    };
  } catch (err) {
    return {
      overview: {
        accounts: [],
        transactions: [],
        totalBalanceCents: 0,
        dbError: err instanceof Error ? err.message : 'DB error'
      }
    };
  }
}
