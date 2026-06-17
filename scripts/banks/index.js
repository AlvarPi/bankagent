import { collect as collectCoop } from './coop/index.js';
import { collect as collectLhv } from './lhv/index.js';
import { collect as collectSeb } from './seb/index.js';
import { collect as collectSwedbank } from './swedbank/index.js';
import { collect as collectLuminor } from './luminor/index.js';
import { collect as collectCitadele } from './citadele/index.js';
import { collect as collectWise } from './wise/index.js';
import { collect as collectHolm } from './holm/index.js';
import { collect as collectBigbank } from './bigbank/index.js';
import { collect as collectIutecredit } from './iutecredit/index.js';
import { collect as collectMorganStanley } from './morgan-stanley/index.js';
import { collect as collectNordea } from './nordea/index.js';

/** @type {Record<string, () => Promise<import('./_shared/util.js').CollectResult>>} */
export const COLLECTORS = {
  coop: collectCoop,
  lhv: collectLhv,
  seb: collectSeb,
  swedbank: collectSwedbank,
  luminor: collectLuminor,
  citadele: collectCitadele,
  wise: collectWise,
  holm: collectHolm,
  bigbank: collectBigbank,
  iutecredit: collectIutecredit,
  'morgan-stanley': collectMorganStanley,
  nordea: collectNordea
};

const BANK_NAMES = {
  coop: 'Coop Pank',
  lhv: 'LHV',
  seb: 'SEB',
  swedbank: 'Swedbank',
  luminor: 'Luminor',
  citadele: 'Citadele',
  wise: 'Wise',
  holm: 'Holm Bank',
  bigbank: 'Bigbank',
  iutecredit: 'IuteCredit',
  'morgan-stanley': 'Morgan Stanley',
  nordea: 'Nordea'
};

/**
 * @param {string} [slug]
 */
export async function collectAll(slug) {
  const keys = slug ? [slug] : Object.keys(COLLECTORS);
  /** @type {import('./_shared/util.js').CollectResult[]} */
  const results = [];

  for (const key of keys) {
    const collector = COLLECTORS[key];
    if (!collector) throw new Error(`Unknown bank slug: ${key}`);
    try {
      results.push(await collector());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({
        slug: key,
        bankName: BANK_NAMES[key] || key,
        rows: [],
        sources: [],
        fetchedAt: new Date().toISOString(),
        warnings: [`Kogumine ebaõnnestus: ${message}`]
      });
    }
  }

  return results;
}
