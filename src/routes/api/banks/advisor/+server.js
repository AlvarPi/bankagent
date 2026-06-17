import { json, error } from '@sveltejs/kit';
import { buildAdvisorContext, getKnowledgeGeneratedAt } from '$lib/server/bank-knowledge.js';
import { chatWithOpenAI } from '$lib/server/openai.js';

const SYSTEM_PROMPT = `Sa oled Eesti finantsvõrdluse assistent pankade-teenused.ee kontekstis. Vasta alati eesti keeles.

REEGLID:
- Kasuta AINULT allpool toodud pangandmeid — need on saidi kogutud andmed.
- ÄRA kasuta üldteadmisi, maailmateadmisi ega muid allikaid (sh oma treeningandmeid).
- Kui vastust andmetest ei leia, ütle täpselt: "Seda infot mul kogutud andmetes pole."
- Ära väljamõtle intresse, tasusid, tooteid ega tingimusi.
- Maini alati panganimi; viita võimalusel allikate URL-idele (sources) ja andmete uuenemise ajale (fetchedAt).
- Võrdle pangaid objektiivselt, kui kasutaja küsib võrdlust.
- Ära anna juriidilist ega isiklikku finantsnõu — ainult avalike tingimuste võrdlus.
- Ole lühike ja selge.
- Iga panga andmetes on lisaks intressidele tootekataloog (hoiused, paketid, laenud, kaardid jm) — kasuta seda toodete ja teenuste küsimustele. Kontekst on filtreeritud päringu järgi; kui vajalik info puudub, ütle seda.`;

const VALID_ROLES = new Set(['user', 'assistant']);

/**
 * @param {unknown} messages
 * @returns {messages is { role: string, content: string }[]}
 */
function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > 40) return false;

  return messages.every(
    (msg) =>
      msg &&
      typeof msg === 'object' &&
      VALID_ROLES.has(msg.role) &&
      typeof msg.content === 'string' &&
      msg.content.trim().length > 0 &&
      msg.content.length <= 4000
  );
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return error(400, { message: 'Vigane JSON' });
  }

  const { messages } = body ?? {};
  if (!validateMessages(messages)) {
    return error(400, {
      message: 'messages peab olema 1–40 elemendiga massiiv {role: user|assistant, content: string}'
    });
  }

  let context;
  let knowledgeGeneratedAt;
  try {
    [context, knowledgeGeneratedAt] = await Promise.all([
      buildAdvisorContext(messages),
      getKnowledgeGeneratedAt()
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return error(500, { message: `Pangaandmete laadimine ebaõnnestus: ${message}` });
  }

  const systemContent = `${SYSTEM_PROMPT}

---
PANGAANDMED (indeks: ${knowledgeGeneratedAt}):

${context}`;

  const advisorMessages = [{ role: 'system', content: systemContent }, ...messages];

  try {
    const result = await chatWithOpenAI({ messages: advisorMessages });
    return json({
      reply: result.reply,
      model: result.model,
      fetchedAt: knowledgeGeneratedAt
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return error(503, { message });
  }
}
