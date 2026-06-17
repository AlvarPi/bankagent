/** @type {Record<'et' | 'en', Record<string, string>>} */
export const nav = {
  et: {
    appTitle: 'Pankade teenused',
    overview: 'Ülevaade',
    accounts: 'Kontod',
    transactions: 'Tehingud',
    compare: 'Tingimuste võrdlus',
    totalBalance: 'Kogusaldo',
    recentTx: 'Viimased tehingud',
    noAccounts: 'Kontosid pole. Lisa konto või impordi CSV.',
    noTransactions: 'Tehinguid pole.',
    noRates: 'Avalikke intresse pole veel kogutud. Käivita: npm run collect-rates',
    langToggle: 'EN'
  },
  en: {
    appTitle: 'Bank services',
    overview: 'Overview',
    accounts: 'Accounts',
    transactions: 'Transactions',
    compare: 'Rate comparison',
    totalBalance: 'Total balance',
    recentTx: 'Recent transactions',
    noAccounts: 'No accounts yet. Add an account or import CSV.',
    noTransactions: 'No transactions yet.',
    noRates: 'No public rates collected yet. Run: npm run collect-rates',
    langToggle: 'ET'
  }
};

/**
 * @param {'et' | 'en'} lang
 * @param {number} cents
 * @param {string} [currency]
 */
export function formatMoney(lang, cents, currency = 'EUR') {
  return new Intl.NumberFormat(lang === 'et' ? 'et-EE' : 'en-GB', {
    style: 'currency',
    currency
  }).format(cents / 100);
}
