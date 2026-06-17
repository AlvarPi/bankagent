/** @typedef {{ name: string, summary: string, url?: string, details?: string[], rates?: string[] }} CatalogItem */
/** @typedef {{ title: string, items: CatalogItem[] }} CatalogSection */

/** @type {CatalogSection[]} */
export const MORGAN_STANLEY_CATALOG = [
  {
    title: 'Cash management programs',
    items: [
      {
        name: 'Morgan Stanley CashPlus',
        url: 'https://www.morganstanley.com/wealth-relationshipwithyou/cash',
        summary: 'Tiered savings program for wealth management clients. Rates vary by asset level.',
        rates: ['Tiered rates — see Savings Program Rate Monitor']
      },
      {
        name: 'Morgan Stanley Private Bank',
        url: 'https://www.morganstanley.com/wealth-relationshipwithyou/cash',
        summary: 'FDIC-insured deposit accounts for eligible clients.'
      },
      {
        name: 'Savings Program Rate Monitor',
        url: 'https://www.morganstanley.com/wealth/online/cash/ratemonitor',
        summary: 'Current tiered savings rates by total assets under management.',
        details: ['Rates quoted as of effective date on website', 'Not available to general public without relationship']
      }
    ]
  },
  {
    title: 'E*TRADE banking',
    items: [
      {
        name: 'E*TRADE Max-Rate Checking',
        url: 'https://us.etrade.com/l/bank/products/checking/max-rate-checking',
        summary: 'High-yield checking account (US).',
        rates: ['Variable APY — see atwork banking page']
      },
      {
        name: 'E*TRADE Premium Savings',
        url: 'https://us.etrade.com/l/bank/products/savings/premium-savings',
        summary: 'High-yield savings account (US).',
        rates: ['Variable APY — tiered by balance']
      },
      {
        name: 'E*TRADE Standard Bank Rates',
        url: 'https://us.etrade.com/l/bank/rates',
        summary: 'Published rate sheet for E*TRADE bank products.'
      }
    ]
  },
  {
    title: 'Disclosures and documents',
    items: [
      {
        name: 'Savings Program Disclosure (PDF)',
        url: 'https://www.morganstanley.com/wealth/online/cash/disclosure',
        summary: 'Tiered savings program terms and rate methodology.'
      },
      {
        name: 'E*TRADE At Work Banking',
        url: 'https://us.etrade.com/l/bank/atwork',
        summary: 'Workplace banking solutions via E*TRADE.'
      }
    ]
  },
  {
    title: 'Notes',
    items: [
      {
        name: 'Scope limitations',
        summary:
          'Morgan Stanley is a US wealth manager, not an Estonian bank. Rates depend on account type and asset tiers.',
        details: [
          'Not in minuraha.ee barometer',
          'Excluded from compact advisor context by default (low relevance for EE retail)',
          'Collected data is for reference only'
        ]
      }
    ]
  }
];
