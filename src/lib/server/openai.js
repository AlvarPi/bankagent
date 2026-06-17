import 'dotenv/config';

const DEFAULT_MODEL = 'gpt-4o-mini';
const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * @returns {string}
 */
export function getOpenAIApiKey() {
  return (process.env.OPENAI_API_KEY || '').trim();
}

/**
 * @returns {string}
 */
export function getOpenAIModel() {
  return process.env.OPENAI_MODEL || DEFAULT_MODEL;
}

/**
 * @param {string} modelName
 * @returns {boolean}
 */
function usesMaxCompletionTokens(modelName) {
  return /^(gpt-5|o\d)/i.test(modelName);
}

/**
 * @param {string} modelName
 * @param {number} limit
 * @returns {{ max_tokens?: number, max_completion_tokens?: number }}
 */
function buildTokenLimitParam(modelName, limit) {
  return usesMaxCompletionTokens(modelName)
    ? { max_completion_tokens: limit }
    : { max_tokens: limit };
}

/**
 * @param {string} modelName
 * @returns {{ temperature?: number }}
 */
function buildTemperatureParam(modelName) {
  return usesMaxCompletionTokens(modelName) ? {} : { temperature: 0.2 };
}

/**
 * @param {{ messages: Array<{ role: string, content: string }>, model?: string, maxTokens?: number }} options
 * @returns {Promise<{ reply: string, model: string }>}
 */
export async function chatWithOpenAI({ messages, model, maxTokens }) {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY pole seadistatud');
  }

  const modelName = model || getOpenAIModel();

  let response;
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        ...buildTokenLimitParam(modelName, maxTokens ?? Number(process.env.OPENAI_MAX_TOKENS || 700)),
        ...buildTemperatureParam(modelName)
      }),
      signal: AbortSignal.timeout(Number(process.env.OPENAI_TIMEOUT_MS || 60_000))
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`OpenAI ühendus ebaõnnestus: ${message}`);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`OpenAI vastas veaga ${response.status}: ${body.slice(0, 300) || response.statusText}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (typeof reply !== 'string') {
    throw new Error('OpenAI vastus puudub või on vigane');
  }

  return { reply, model: data.model || modelName };
}
