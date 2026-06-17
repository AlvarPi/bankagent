import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

/** @type {pg.Pool | null} */
let pool = null;

/**
 * @returns {pg.Pool}
 */
export function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL puudub (.env)');
  }
  if (!pool) {
    pool = new Pool({ connectionString: url });
  }
  return pool;
}

/**
 * @template T
 * @param {string} text
 * @param {unknown[]} [params]
 * @returns {Promise<pg.QueryResult<T>>}
 */
export async function query(text, params = []) {
  return getPool().query(text, params);
}
