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
        rates: ['Tiered rates — see Savings Program Rate Monitor'],
        details: [
          'Available to Morgan Stanley wealth management clients',
          'Rates increase with assets under management',
          'FDIC insurance through program banks'
        ]
      },
      {
        name: 'Morgan Stanley Private Bank',
        url: 'https://www.morganstanley.com/wealth-relationshipwithyou/cash',
        summary: 'FDIC-insured deposit accounts for eligible clients.',
        details: ['Checking and savings accounts', 'Requires wealth management relationship']
      },
      {
        name: 'Preferred Savings Program',
        url: 'https://www.morganstanley.com/wealth/online/cash/ratemonitor',
        summary: 'Tiered savings rates for preferred clients.',
        rates: ['Variable tiered APY — collected from rate monitor'],
        details: ['Rates quoted as of effective date on website']
      },
      {
        name: 'Preferred Certificate of Deposit (CD)',
        url: 'https://www.morganstanley.com/wealth/online/cash/ratemonitor',
        summary: 'Certificates of deposit with tiered rates.',
        rates: ['Variable APY by term and tier'],
        details: ['FDIC insured', 'Early withdrawal penalties apply']
      },
      {
        name: 'Savings Program Rate Monitor',
        url: 'https://www.morganstanley.com/wealth/online/cash/ratemonitor',
        summary: 'Current tiered savings rates by total assets under management.',
        details: [
          'Rates quoted as of effective date on website',
          'Not available to general public without relationship',
          'Primary source for collected rate data'
        ]
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
        rates: ['Variable APY — see atwork banking page'],
        details: ['No monthly fee with conditions', 'FDIC insured']
      },
      {
        name: 'E*TRADE Premium Savings',
        url: 'https://us.etrade.com/l/bank/products/savings/premium-savings',
        summary: 'High-yield savings account (US).',
        rates: ['Variable APY — tiered by balance'],
        details: ['Competitive rates for US market', 'FDIC insured']
      },
      {
        name: 'E*TRADE Certificates of Deposit (CD)',
        url: 'https://us.etrade.com/l/bank/products/savings/cds',
        summary: 'Fixed-rate CDs with various terms.',
        rates: ['Variable APY by term'],
        details: ['FDIC insured', 'Early withdrawal penalties']
      },
      {
        name: 'E*TRADE Standard Bank Rates',
        url: 'https://us.etrade.com/l/bank/rates',
        summary: 'Published rate sheet for E*TRADE bank products.',
        details: ['Checking, savings, CD rates', 'Updated periodically']
      },
      {
        name: 'E*TRADE At Work Banking',
        url: 'https://us.etrade.com/l/bank/atwork',
        summary: 'Workplace banking solutions via E*TRADE.',
        details: ['Employee banking programs', 'Stock plan services']
      }
    ]
  },
  {
    title: 'Wealth management and investing',
    items: [
      {
        name: 'Morgan Stanley Wealth Management',
        url: 'https://www.morganstanley.com/what-we-do/wealth-management',
        summary: 'Full-service wealth management for high-net-worth clients.',
        details: ['Financial advisors', 'Portfolio management', 'Estate planning']
      },
      {
        name: 'E*TRADE Self-Directed Investing',
        url: 'https://us.etrade.com/what-we-offer/investment-choices',
        summary: 'Self-directed brokerage for stocks, ETFs, options.',
        details: ['Commission-free ETFs and stocks (US)', 'Options trading']
      },
      {
        name: 'Morgan Stanley Access Investing',
        url: 'https://www.morganstanley.com/what-we-do/wealth-management/access-investing',
        summary: 'Robo-advisory and managed portfolios.',
        details: ['Lower minimums than traditional wealth management']
      }
    ]
  },
  {
    title: 'Disclosures and documents',
    items: [
      {
        name: 'Savings Program Disclosure (PDF)',
        url: 'https://www.morganstanley.com/wealth/online/cash/disclosure',
        summary: 'Tiered savings program terms and rate methodology.',
        details: ['Rate calculation methodology', 'FDIC coverage details']
      },
      {
        name: 'E*TRADE Bank disclosures',
        url: 'https://us.etrade.com/l/bank/disclosures',
        summary: 'Bank product disclosures and terms.',
        details: ['FDIC membership', 'Account agreements']
      }
    ]
  },
  {
    title: 'Märkused Eesti kontekstis',
    items: [
      {
        name: 'Scope limitations',
        summary:
          'Morgan Stanley on USA finantsteenuste ettevõte, mitte Eesti erakliendi pank. Intressid sõltuvad kontotüübist ja varade mahust.',
        details: [
          'Ei ole minuraha.ee baromeetris',
          'Ei paku Eesti kodulaene ega SEPA arvelduskontot',
          'Kogutud andmed on viiteks USA toodetele',
          'Nõuab tavaliselt wealth management suhet'
        ]
      },
      {
        name: 'E*TRADE vs Morgan Stanley',
        url: 'https://www.morganstanley.com',
        summary: 'E*TRADE on Morgan Stanley tütarettevõte — iseseisvad pangatooted USA turul.',
        details: ['E*TRADE: self-directed ja banking', 'Morgan Stanley: wealth management']
      }
    ]
  }
];
