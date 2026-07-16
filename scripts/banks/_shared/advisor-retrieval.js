/**
 * Per-päringu konteksti koostamine: alati kompaktne indeks + intressid,
 * tootekataloog ainult asjakohastele pankadele/üksustele (märksõnade skoor).
 */

/** Pangad, mida kontekstist vaikimisi välja jätta. */
export const SKIP_CONTEXT_SLUGS = new Set(['morgan-stanley']);

/** @type {Record<string, string[]>} */
const BANK_ALIASES = {
  swedbank: ['swedbank', 'swed', 'swed bank'],
  seb: ['seb'],
  lhv: ['lhv'],
  luminor: ['luminor'],
  coop: ['coop', 'coop pank', 'cooppank'],
  citadele: ['citadele'],
  wise: ['wise', 'transferwise'],
  holm: ['holm', 'holm bank'],
  bigbank: ['bigbank', 'big bank'],
  iutecredit: ['iutecredit', 'iute credit', 'iute'],
  nordea: ['nordea'],
  'morgan-stanley': ['morgan stanley', 'morgan']
};

/** @type {Record<string, string[]>} */
const TOPIC_KEYWORDS = {
  deposit: ['hoius', 'hoiused', 'hoiust', 'säästm', 'intress', 'rahasahtel', 'deposit', 'päevajääk'],
  loan: ['laen', 'laenu', 'kodulaen', 'väikelaen', 'liising', 'krediit', 'laenumakse', 'intressimäär'],
  card: ['kaart', 'kaardi', 'deebet', 'krediitkaart', 'maksekaart'],
  account: ['konto', 'kontod', 'pakett', 'pangakonto', 'arveldus', 'igapäev'],
  insurance: ['kindlustus', 'kindlust'],
  pension: ['pension', 'iii sammas', 'ii sammas', 'tuleva'],
  transfer: ['ülekanne', 'valuuta', 'välis', 'swift', 'sepa', 'vahetuskurss'],
  compare: ['võrdle', 'võrdlus', 'parim', 'odavaim', 'kõrgeim', 'kõik', 'kõiki', 'pangad', 'erinev']
};

const STOPWORDS = new Set([
  'ja', 'või', 'on', 'mis', 'kas', 'kui', 'see', 'mul', 'minu', 'teie', 'palun', 'aitäh',
  'the', 'and', 'or', 'is', 'are', 'what', 'how', 'for', 'with', 'from', 'that', 'this'
]);

const MAX_FULL_BANKS = 3;
const MAX_CATALOG_ITEMS = 18;
const MIN_ITEM_SCORE = 1;

/** Teemad, mille puhul tootekataloog on asjakohane (hoiuste intressid on rates massiivis). */
const CATALOG_TOPICS = new Set(['loan', 'card', 'account', 'insurance', 'pension', 'transfer']);

/**
 * @param {number | null | undefined} cents
 */
export function formatFee(cents) {
  if (cents == null) return '—';
  if (cents === 0) return 'tasuta';
  return `${(cents / 100).toFixed(2)} €`;
}

/**
 * @param {Array<{ role: string, content: string }>} messages
 */
export function extractQueryText(messages) {
  const userTexts = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.trim())
    .filter(Boolean);

  if (!userTexts.length) return '';
  // Viimane küsimus + eelmine kasutaja sõnum (järelküsimuste jaoks).
  return userTexts.slice(-2).join(' ');
}

/**
 * @param {string} text
 * @returns {string[]}
 */
export function tokenize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9äöüõ]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

/**
 * @param {string} query
 * @param {Record<string, { slug: string, name: string }>} banks
 * @returns {Set<string>}
 */
export function detectMentionedBanks(query, banks) {
  const normalized = query.toLowerCase();
  /** @type {Set<string>} */
  const mentioned = new Set();

  for (const bank of Object.values(banks)) {
    const slug = String(bank.slug);
    const aliases = BANK_ALIASES[slug] ?? [slug.replace(/-/g, ' '), String(bank.name).toLowerCase()];
    for (const alias of aliases) {
      if (alias.length >= 3 && normalized.includes(alias)) {
        mentioned.add(slug);
        break;
      }
    }
  }

  return mentioned;
}

/**
 * @param {string[]} tokens
 * @returns {Set<string>}
 */
export function detectTopics(tokens) {
  /** @type {Set<string>} */
  const topics = new Set();
  const joined = tokens.join(' ');

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (
      keywords.some(
        (kw) =>
          joined.includes(kw) ||
          tokens.some((t) => t === kw || (t.length >= kw.length && t.includes(kw)))
      )
    ) {
      topics.add(topic);
    }
  }

  if (tokens.includes('vs')) topics.add('compare');

  return topics;
}

/**
 * @param {string} query
 * @param {Set<string>} topics
 */
function refineTopicsForDeposit(query, topics) {
  if (!topics.has('deposit') || !topics.has('loan')) return;
  const q = query.toLowerCase();
  const depositMarkers = ['hoius', 'hoiused', 'hoiust', 'säästm', 'rahasahtel', 'päevajääk'];
  const hasDepositContext =
    depositMarkers.some((m) => q.includes(m)) ||
    tokenize(query).some((t) => t.includes('hoius') || t.startsWith('hoiust'));
  if (hasDepositContext) topics.delete('loan');
}

/** @type {string[]} */
const DEPOSIT_PRODUCT_MARKERS = ['deposit', 'hoius', 'savings'];

/**
 * @param {{ product_type?: string, label?: string, raw_text?: string }} rate
 */
function isDepositRelatedRate(rate) {
  const type = String(rate.product_type ?? '').toLowerCase();
  if (DEPOSIT_PRODUCT_MARKERS.some((m) => type.includes(m))) return true;
  const text = `${rate.label ?? ''} ${rate.raw_text ?? ''}`.toLowerCase();
  for (const kw of TOPIC_KEYWORDS.deposit) {
    if (kw.length >= 4 && text.includes(kw)) return true;
  }
  return false;
}

/**
 * @param {Array<{ product_type?: string, label?: string, raw_text?: string }>} rates
 * @param {boolean} depositOnly
 */
function selectRatesForDisplay(rates, depositOnly) {
  if (!depositOnly) return rates;
  const filtered = rates.filter(isDepositRelatedRate);
  return filtered.length ? filtered : rates;
}

/**
 * @param {string} text
 * @param {string[]} tokens
 * @param {Set<string>} topics
 */
function scoreText(text, tokens, topics) {
  const lower = text.toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (lower.includes(token)) score += 2;
  }

  for (const topic of topics) {
    if (topic === 'compare') continue;
    for (const kw of TOPIC_KEYWORDS[topic] ?? []) {
      if (lower.includes(kw)) score += 1;
    }
  }

  return score;
}

/**
 * @param {{ name: string, summary?: string, details?: string[], rates?: string[] }} item
 * @param {{ title: string }} section
 * @param {string[]} tokens
 * @param {Set<string>} topics
 */
function scoreCatalogItem(item, section, tokens, topics) {
  const parts = [
    section.title,
    item.name,
    item.summary ?? '',
    ...(item.details ?? []),
    ...(item.rates ?? [])
  ];
  return scoreText(parts.join(' '), tokens, topics);
}

/**
 * @param {{ sections?: Array<{ title: string, items?: Array<unknown> }> }} catalog
 * @param {string[]} tokens
 * @param {Set<string>} topics
 */
function scoreBankCatalog(catalog, tokens, topics) {
  let total = 0;
  for (const section of catalog.sections ?? []) {
    for (const item of section.items ?? []) {
      total += scoreCatalogItem(
        /** @type {Parameters<typeof scoreCatalogItem>[0]} */ (item),
        section,
        tokens,
        topics
      );
    }
  }
  return total;
}

/**
 * @param {Record<string, unknown>} data
 * @param {string[]} tokens
 * @param {Set<string>} topics
 * @param {Set<string>} mentioned
 */
function scoreBank(data, tokens, topics, mentioned) {
  const slug = String(data.slug);
  let score = 0;

  if (mentioned.has(slug)) score += 100;

  const rateText = (Array.isArray(data.rates) ? data.rates : [])
    .map((r) => `${r.product_type} ${r.label} ${r.raw_text ?? ''}`)
    .join(' ');
  score += scoreText(`${data.name} ${rateText}`, tokens, topics);

  const catalog = /** @type {{ sections?: unknown[] } | undefined} */ (data.catalog);
  if (catalog?.sections?.length) {
    score += scoreBankCatalog(
      /** @type {Parameters<typeof scoreBankCatalog>[0]} */ (catalog),
      tokens,
      topics
    );
  }

  return score;
}

/**
 * @param {{ sections?: Array<{ title: string, items?: Array<{ name: string, summary?: string, url?: string, details?: string[], rates?: string[] }> }> }} catalog
 * @param {string[]} tokens
 * @param {Set<string>} topics
 * @param {boolean} includeAll
 */
function formatFilteredCatalog(catalog, tokens, topics, includeAll) {
  /** @type {Array<{ section: { title: string }, item: { name: string, summary?: string, url?: string, details?: string[], rates?: string[] }, score: number }>} */
  const ranked = [];

  for (const section of catalog.sections ?? []) {
    for (const item of section.items ?? []) {
      const score = includeAll ? 1 : scoreCatalogItem(item, section, tokens, topics);
      if (includeAll || score >= MIN_ITEM_SCORE) {
        ranked.push({ section, item, score });
      }
    }
  }

  ranked.sort((a, b) => b.score - a.score);
  const selected = includeAll ? ranked : ranked.slice(0, MAX_CATALOG_ITEMS);

  if (!selected.length) return [];

  const lines = ['Tootekataloog (asjakohased üksused):'];
  let currentSection = '';

  for (const { section, item } of selected) {
    if (section.title !== currentSection) {
      currentSection = section.title;
      lines.push(`  ### ${section.title}`);
    }
    let line = `  - ${item.name}`;
    if (item.summary) line += `: ${item.summary}`;
    if (item.url) line += ` (${item.url})`;
    if (item.rates?.length) line += ` [${item.rates.join('; ')}]`;
    lines.push(line);
    for (const detail of item.details ?? []) {
      lines.push(`      · ${detail}`);
    }
  }

  return lines;
}

/**
 * @param {Record<string, unknown>} data
 * @param {{ includeCatalog: boolean, depositRatesOnly?: boolean, tokens: string[], topics: Set<string>, catalogAll: boolean }} opts
 */
export function formatBankBlock(data, opts) {
  const allRates = Array.isArray(data.rates) ? data.rates : [];
  const rates = selectRatesForDisplay(allRates, Boolean(opts.depositRatesOnly));
  const catalog = /** @type {{ sections?: unknown[] } | undefined} */ (data.catalog);
  const hasCatalog = Boolean(opts.includeCatalog && catalog?.sections?.length);

  // "Andmed puuduvad" ainult siis, kui pole EGA ridu EGA kataloogi
  // (nt LHV hoiab kõik andmed kataloogis, rows on tühi).
  if (!rates.length && !hasCatalog) {
    const warn = Array.isArray(data.warnings) && data.warnings.length ? data.warnings[0] : 'andmed puuduvad';
    return `## ${data.name} (${data.slug}) — ${warn}`;
  }

  const lines = [];
  lines.push(`## ${data.name} (${data.slug}), kogutud ${data.fetchedAt}`);

  if (Array.isArray(data.warnings) && data.warnings.length) {
    lines.push(`Märkus: ${data.warnings[0]}`);
  }

  const primaryUrl = Array.isArray(data.sources) && data.sources[0]?.url ? data.sources[0].url : null;
  if (primaryUrl) {
    lines.push(`Allikas: ${primaryUrl}`);
  }

  if (rates.length) {
    const ratesHeader =
      opts.depositRatesOnly && rates.length < allRates.length
        ? 'Intressid/tasud (hoiused):'
        : 'Intressid/tasud (kõik kogutud read):';
    lines.push(ratesHeader);
    for (const rate of rates) {
      const rateStr = rate.rate_percent != null ? `${rate.rate_percent}%` : '—';
      const raw = rate.raw_text ? ` | ${rate.raw_text}` : '';
      lines.push(
        `  - [${rate.product_type}] ${rate.label}: ${rateStr}, tasu ${formatFee(rate.fee_cents)} | ${rate.source_url}${raw}`
      );
    }
  }

  if (hasCatalog) {
    lines.push(
      ...formatFilteredCatalog(
        /** @type {Parameters<typeof formatFilteredCatalog>[0]} */ (catalog),
        opts.tokens,
        opts.topics,
        opts.catalogAll
      )
    );
  }

  return lines.join('\n');
}

/**
 * @param {{ index: { generatedAt?: string, banks?: Array<{ slug: string, name: string, fetchedAt?: string, rateCount?: number }> }, banks: Record<string, Record<string, unknown>> }} knowledge
 * @param {Array<{ role: string, content: string }>} messages
 */
export function buildRetrievedContext(knowledge, messages) {
  const query = extractQueryText(messages);
  const tokens = tokenize(query);
  const topics = detectTopics(tokens);
  refineTopicsForDeposit(query, topics);
  const mentioned = detectMentionedBanks(query, knowledge.banks);

  const wantsCompare = topics.has('compare');
  const wantsCatalogTopic = [...topics].some((t) => CATALOG_TOPICS.has(t));
  const isVague =
    mentioned.size === 0 && !wantsCatalogTopic && !wantsCompare && !topics.has('deposit');

  const singleBankDepositOnly =
    mentioned.size === 1 && topics.has('deposit') && !wantsCompare;

  const bankList = Object.values(knowledge.banks)
    .filter((b) => !SKIP_CONTEXT_SLUGS.has(String(b.slug)))
    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'et'));

  const bankScores = bankList.map((bank) => ({
    bank,
    score: scoreBank(bank, tokens, topics, mentioned)
  }));
  bankScores.sort((a, b) => b.score - a.score);

  /** @type {Set<string>} */
  const fullCatalogSlugs = new Set(singleBankDepositOnly ? [] : mentioned);

  if (!fullCatalogSlugs.size && wantsCatalogTopic && !wantsCompare && !singleBankDepositOnly) {
    for (const { bank, score } of bankScores.slice(0, MAX_FULL_BANKS)) {
      if (score > 0) fullCatalogSlugs.add(String(bank.slug));
    }
  }

  if (!fullCatalogSlugs.size && mentioned.size && !singleBankDepositOnly) {
    for (const slug of mentioned) fullCatalogSlugs.add(slug);
  }

  if (wantsCompare && wantsCatalogTopic && !mentioned.size) {
    for (const { bank, score } of bankScores.slice(0, MAX_FULL_BANKS)) {
      if (score > 0) fullCatalogSlugs.add(String(bank.slug));
    }
    if (!fullCatalogSlugs.size) {
      for (const { bank } of bankScores.slice(0, MAX_FULL_BANKS)) {
        fullCatalogSlugs.add(String(bank.slug));
      }
    }
  }

  // Ühe panga küsimus → kogu kataloog; muidu filtreeritud üksused.
  const catalogAll = fullCatalogSlugs.size === 1 && mentioned.size === 1;

  let indexBanks = knowledge.index.banks ?? bankList.map((b) => ({
    slug: b.slug,
    name: b.name,
    fetchedAt: b.fetchedAt,
    rateCount: Array.isArray(b.rates) ? b.rates.length : 0
  }));

  if (singleBankDepositOnly) {
    indexBanks = indexBanks.filter((b) => mentioned.has(b.slug));
  }

  const lines = [
    `Indeks: ${knowledge.index.generatedAt ?? 'teadmata'}`,
    `Pangad (${indexBanks.length}): ${indexBanks.map((b) => `${b.name} (${b.slug})`).join(', ')}`,
    ''
  ];

  if (query.trim()) {
    if (singleBankDepositOnly) {
      lines.push(`Päring: "${query.trim().slice(0, 200)}"`, '');
    } else {
      lines.push(
        `Päringu kontekst: "${query.trim().slice(0, 200)}"`,
        `Tuvastatud pangad: ${mentioned.size ? [...mentioned].join(', ') : '—'}`,
        `Teemad: ${topics.size ? [...topics].join(', ') : 'üldine'}`,
        `Täielik kataloog: ${fullCatalogSlugs.size ? [...fullCatalogSlugs].join(', ') : 'ainult intressid/tasud'}`,
        ''
      );
    }
  }

  /** @type {typeof bankList} */
  let banksToShow;

  if (mentioned.size > 0 && (!wantsCompare || mentioned.size <= MAX_FULL_BANKS)) {
    banksToShow = bankList.filter((b) => mentioned.has(String(b.slug)));
  } else if (wantsCompare && wantsCatalogTopic) {
    banksToShow = bankScores
      .filter(({ bank }) => fullCatalogSlugs.has(String(bank.slug)))
      .map(({ bank }) => bank);
    if (!banksToShow.length) {
      banksToShow = bankScores.slice(0, MAX_FULL_BANKS).map(({ bank }) => bank);
    }
  } else if (wantsCompare || topics.has('deposit') || isVague) {
    banksToShow = bankList;
  } else if (fullCatalogSlugs.size) {
    banksToShow = bankList.filter((b) => fullCatalogSlugs.has(String(b.slug)));
  } else {
    banksToShow = bankScores.slice(0, MAX_FULL_BANKS).map(({ bank }) => bank);
  }

  if (!banksToShow.length) {
    for (const bank of bankList) banksToShow.push(bank);
  }

  const includeAllRates = banksToShow.length >= bankList.length;

  for (const bank of banksToShow) {
    const slug = String(bank.slug);
    const bankRates = Array.isArray(bank.rates) ? bank.rates : [];
    const bankHasCatalog = Boolean(/** @type {any} */ (bank).catalog?.sections?.length);
    // Tavaloogika + varuvariant: kui pangal pole ridu, kuid on kataloog
    // (nt LHV), näita kataloogi ikka (muidu jääks "andmed puuduvad").
    const includeCatalog =
      (!singleBankDepositOnly && fullCatalogSlugs.has(slug) && wantsCatalogTopic) ||
      (bankRates.length === 0 && bankHasCatalog);
    lines.push(
      formatBankBlock(bank, {
        includeCatalog,
        depositRatesOnly: singleBankDepositOnly,
        tokens,
        topics,
        catalogAll: includeCatalog && catalogAll
      })
    );
    lines.push('');
  }

  if (!singleBankDepositOnly && !includeAllRates && bankList.length > banksToShow.length) {
    const omitted = bankList
      .filter((b) => !banksToShow.some((shown) => shown.slug === b.slug))
      .map((b) => b.name);
    lines.push(`(Teised pangad indeksis, kuid päringuga vähe seotud: ${omitted.join(', ')})`);
  }

  return lines.join('\n').trim();
}
