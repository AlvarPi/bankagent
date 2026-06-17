import 'dotenv/config';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { query, getPool } from '../../../src/lib/server/db.js';

/**
 * @param {string} bankDir
 * @param {object} knowledge
 */
export async function writeKnowledgeFile(bankDir, knowledge) {
  await writeFile(join(bankDir, 'data.json'), `${JSON.stringify(knowledge, null, 2)}\n`, 'utf8');
}

/**
 * @param {object} knowledge
 */
export async function saveKnowledgeSnapshot(knowledge) {
  await query(
    `INSERT INTO bank_knowledge_snapshots (bank_slug, data)
     VALUES ($1, $2::jsonb)`,
    [knowledge.slug, JSON.stringify(knowledge)]
  );
}

/**
 * @param {object[]} knowledgeList
 * @returns {Promise<number>}
 */
export async function saveKnowledgeSnapshots(knowledgeList) {
  if (!process.env.DATABASE_URL || knowledgeList.length === 0) {
    return 0;
  }

  let saved = 0;
  try {
    for (const knowledge of knowledgeList) {
      await saveKnowledgeSnapshot(knowledge);
      saved += 1;
    }
  } catch (err) {
    console.warn(`warn knowledge DB save failed — ${err.message}`);
  } finally {
    try {
      await getPool().end();
    } catch {
      /* pool may not exist */
    }
  }

  return saved;
}
