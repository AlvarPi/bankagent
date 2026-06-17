import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildRetrievedContext, SKIP_CONTEXT_SLUGS } from './advisor-retrieval.js';
import { chatWithOpenAI, checkOpenAIHealth, getOpenAIApiKey } from './openai.js';

/** @type {Map<string, { index: object, banks: Record<string, unknown> }>} */
const knowledgeCache = new Map();

/**
 * @returns {'openai' | 'none'}
 */
export function getAdvisorBackend() {
  if (getOpenAIApiKey()) return 'openai';
  return 'none';
}

/**
 * @returns {Promise<{ ok: boolean, model: string, error?: string }>}
 */
export async function checkAdvisorHealth() {
  if (getAdvisorBackend() === 'openai') return checkOpenAIHealth();
  return { ok: false, model: '', error: 'Seadista OPENAI_API_KEY' };
}

/**
 * @param {string} staticBanksDir
 */
export async function loadBankKnowledge(staticBanksDir) {
  const cached = knowledgeCache.get(staticBanksDir);
  if (cached) return cached;

  const indexPath = join(staticBanksDir, 'knowledge.json');
  const indexRaw = await readFile(indexPath, 'utf8');
  /** @type {{ banks: Array<{ slug: string }>, generatedAt?: string }} */
  const index = JSON.parse(indexRaw);

  /** @type {Record<string, unknown>} */
  const banks = {};

  for (const entry of index.banks) {
    const dataPath = join(staticBanksDir, entry.slug, 'data.json');
    const dataRaw = await readFile(dataPath, 'utf8');
    banks[entry.slug] = JSON.parse(dataRaw);
  }

  const knowledge = { index, banks };
  knowledgeCache.set(staticBanksDir, knowledge);
  return knowledge;
}

/**
 * @deprecated Kasuta buildRetrievedContext — säilitatud testimiseks.
 * @param {{ index: { generatedAt?: string }, banks: Record<string, Record<string, unknown>> }} knowledge
 */
export function buildCompactContext(knowledge) {
  return buildRetrievedContext(knowledge, [
    { role: 'user', content: 'kõik pangad võrdlus intress hoius laen kataloog' }
  ]);
}

/**
 * @param {{ index: object, banks: Record<string, unknown> }} knowledge
 * @param {Array<{ role: string, content: string }>} messages
 */
export function buildAdvisorSystemPrompt(knowledge, messages) {
  const context = buildRetrievedContext(
    /** @type {{ index: { generatedAt?: string, banks?: Array<{ slug: string, name: string }> }, banks: Record<string, Record<string, unknown>> }} */ (
      knowledge
    ),
    messages
  );

  return `Eesti pangateenuste võrdlusabiline. Vasta eesti keeles, selgelt ja põhjalikult (võib olla kuni ~12 lauset keerukamate küsimuste puhul).

Kasuta AINULT bank_data infot. Kui infot pole: "Seda infot mul kogutud andmetes pole." Ära väljamõtle numbreid. Maini panganimi ja fetchedAt. Mitte finants- ega õigusnõu.

Iga panga andmetes on lisaks intressidele tootekataloog (catalog.sections: hoiused, paketid, laenud, kaardid jm) — kasuta seda toodete ja teenuste küsimustele. Kontekst on filtreeritud päringu järgi; kui vajalik info puudub, ütle seda.

bank_data:
${context}`;
}

/**
 * @param {Array<{ role: string, content: string }>} messages
 * @param {string} systemPrompt
 */
export async function chatWithAdvisor(messages, systemPrompt) {
  if (getAdvisorBackend() === 'openai') {
    return chatWithOpenAI({ messages, systemPrompt });
  }
  throw new Error('Nõustaja backend pole seadistatud (OPENAI_API_KEY)');
}

/**
 * @param {unknown} body
 * @returns {Array<{ role: string, content: string }>}
 */
export function parseAdvisorMessages(body) {
  if (!body || typeof body !== 'object') {
    throw new Error('Oodatud JSON: { "messages": [{ "role": "user"|"assistant", "content": "..." }] }');
  }

  if (!Array.isArray(body.messages)) {
    const single = typeof body.message === 'string' ? body.message.trim() : '';
    if (single) {
      body = { messages: [{ role: 'user', content: single }] };
    } else {
      throw new Error('Oodatud JSON: { "messages": [{ "role": "user"|"assistant", "content": "..." }] }');
    }
  }

  const messages = body.messages
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      role: String(item.role || ''),
      content: String(item.content || '').trim()
    }))
    .filter((item) => (item.role === 'user' || item.role === 'assistant') && item.content);

  if (messages.length === 0) {
    throw new Error('Vähemalt üks sõnum on kohustuslik.');
  }

  if (messages.at(-1)?.role !== 'user') {
    throw new Error('Viimane sõnum peab olema kasutajalt.');
  }

  return messages.slice(-12);
}

export { SKIP_CONTEXT_SLUGS };
