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
 * Nagu chatWithAnthropic, aga tööriistadega (tool use). Käib silmust, kuni mudel
 * lõpetab tööriistade kutsumise (või iteratsioonide limiit).
 * @param {{ messages: Array<{ role: string, content: any }>, systemPrompt?: string, tools: any[], runTool: (name: string, input: any) => Promise<string>, model?: string, maxTokens?: number, maxIters?: number }} options
 * @returns {Promise<{ reply: string, model: string }>}
 */
export async function chatWithAnthropicTools({ messages, systemPrompt, tools, runTool, model, maxTokens, maxIters = 4 }) {
  const apiKey = getAnthropicApiKey();
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY pole seadistatud');

  const modelName = model || getAnthropicModel();
  const timeoutMs = Number(process.env.ANTHROPIC_TIMEOUT_MS || 90_000);
  const client = new Anthropic({ apiKey, timeout: timeoutMs });

  /** @type {Array<{ role: 'user' | 'assistant', content: any }>} */
  const convo = normalizeMessages(messages);
  let lastModel = modelName;

  for (let iter = 0; iter <= maxIters; iter++) {
    let response;
    try {
      response = await client.messages.create({
        model: modelName,
        max_tokens: maxTokens ?? Number(process.env.ANTHROPIC_MAX_TOKENS || 1400),
        ...(systemPrompt ? { system: systemPrompt } : {}),
        tools,
        messages: convo
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
    lastModel = response.model || modelName;

    if (response.stop_reason === 'refusal') {
      throw new Error('Anthropic keeldus päringule vastamast (refusal).');
    }

    const toolUses = response.content.filter((b) => b.type === 'tool_use');
    if (toolUses.length === 0 || iter === maxIters) {
      const reply = response.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim();
      return { reply, model: lastModel };
    }

    // Käivita tööriistad ja lisa tulemused vestlusse.
    convo.push({ role: 'assistant', content: response.content });
    const toolResults = [];
    for (const tu of toolUses) {
      const out = await runTool(tu.name, tu.input);
      toolResults.push({ type: 'tool_result', tool_use_id: tu.id, content: String(out).slice(0, 40_000) });
    }
    convo.push({ role: 'user', content: toolResults });
  }

  return { reply: '', model: lastModel };
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
