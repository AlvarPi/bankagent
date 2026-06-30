import Anthropic from '@anthropic-ai/sdk';

const DEFAULT_MODEL = 'claude-opus-4-8';

/**
 * @returns {string}
 */
export function getAnthropicApiKey() {
  return (process.env.ANTHROPIC_API_KEY || '').trim();
}

/**
 * @returns {string}
 */
export function getAnthropicModel() {
  return process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
}

/**
 * Anthropic API nõuab, et esimene sõnum oleks kasutajalt. Eemalda
 * juhuslikud algusesse sattunud assistendi sõnumid.
 * @param {Array<{ role: string, content: string }>} messages
 * @returns {Array<{ role: 'user' | 'assistant', content: string }>}
 */
function normalizeMessages(messages) {
  const trimmed = [...messages];
  while (trimmed.length && trimmed[0].role !== 'user') {
    trimmed.shift();
  }
  return /** @type {Array<{ role: 'user' | 'assistant', content: string }>} */ (trimmed);
}

/**
 * @param {{ messages: Array<{ role: string, content: string }>, systemPrompt?: string, model?: string, maxTokens?: number }} options
 * @returns {Promise<{ reply: string, model: string }>}
 */
export async function chatWithAnthropic({ messages, systemPrompt, model, maxTokens }) {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY pole seadistatud');
  }

  const modelName = model || getAnthropicModel();
  const timeoutMs = Number(process.env.ANTHROPIC_TIMEOUT_MS || 90_000);
  const client = new Anthropic({ apiKey, timeout: timeoutMs });

  const requestMessages = normalizeMessages(messages);
  if (requestMessages.length === 0) {
    throw new Error('Vähemalt üks kasutaja sõnum on kohustuslik.');
  }

  let response;
  try {
    response = await client.messages.create({
      model: modelName,
      max_tokens: maxTokens ?? Number(process.env.ANTHROPIC_MAX_TOKENS || 1024),
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: requestMessages
    });
  } catch (err) {
    if (err instanceof Anthropic.APIConnectionTimeoutError) {
      throw new Error(`Anthropic päring ületas ${Math.round(timeoutMs / 1000)} s ajalõpu`);
    }
    if (err instanceof Anthropic.APIError) {
      throw new Error(`Anthropic vastas ${err.status ?? '?'}: ${String(err.message).slice(0, 300)}`);
    }
    throw err;
  }

  if (response.stop_reason === 'refusal') {
    throw new Error('Anthropic keeldus päringule vastamast (refusal).');
  }

  const reply = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim();

  if (!reply) {
    throw new Error('Anthropic vastuses puudub tekstisisu.');
  }

  return { reply, model: response.model || modelName };
}

/**
 * @returns {{ ok: boolean, model: string, error?: string }}
 */
export function checkAnthropicHealth() {
  const model = getAnthropicModel();
  const apiKey = getAnthropicApiKey();

  if (!apiKey) {
    return { ok: false, model, error: 'ANTHROPIC_API_KEY pole seadistatud' };
  }

  return { ok: true, model };
}
