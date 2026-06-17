import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRetrievedContext } from '../../../scripts/banks/_shared/advisor-retrieval.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(__dirname, '..', '..', '..', 'static', 'banks');

/** @type {{ index: object, banks: Record<string, object>, loadedAt: string } | null} */
let cache = null;

/**
 * @returns {Promise<{ index: object, banks: Record<string, object> }>}
 */
async function loadBankKnowledge() {
  if (cache) {
    return { index: cache.index, banks: cache.banks };
  }

  const indexPath = join(BANKS_DIR, 'knowledge.json');
  const indexRaw = await readFile(indexPath, 'utf8');
  /** @type {object} */
  const index = JSON.parse(indexRaw);

  const entries = await readdir(BANKS_DIR, { withFileTypes: true });
  /** @type {Record<string, object>} */
  const banks = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dataPath = join(BANKS_DIR, entry.name, 'data.json');
    try {
      const raw = await readFile(dataPath, 'utf8');
      banks[entry.name] = JSON.parse(raw);
    } catch {
      // skip banks without data.json
    }
  }

  cache = { index, banks, loadedAt: new Date().toISOString() };
  return { index, banks };
}

/**
 * Päringupõhine kontekst LLM süsteemiprompti jaoks.
 * @param {Array<{ role: string, content: string }>} messages
 * @returns {Promise<string>}
 */
export async function buildAdvisorContext(messages) {
  const knowledge = await loadBankKnowledge();
  return buildRetrievedContext(
    /** @type {Parameters<typeof buildRetrievedContext>[0]} */ (knowledge),
    messages
  );
}

/**
 * @returns {Promise<string>}
 */
export async function getKnowledgeGeneratedAt() {
  const { index } = await loadBankKnowledge();
  return index.generatedAt;
}
