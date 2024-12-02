import type { IndustryViewData } from '../types/industry';

export const industryViewData: IndustryViewData = {
  totalScore: 6.8,
  stages: [
    {
      name: 'Commodity',
      description: 'Raw materials and basic resources',
      score: 7.2,
      metrics: [
        {
          name: 'CRB Index',
          code: 'CRB',
          value: 552.8,
          previousValue: 548.2,
          trend: 'up',
          score: 7.4
        },
        {
          name: 'Baltic Dry Index',
          code: 'BDI',
          value: 1425,
          previousValue: 1380,
          trend: 'up',
          score: 7.1
        },
        {
          name: 'Inventory Levels',
          code: 'INV_COM',
          value: -5.2,
          previousValue: -4.8,
          trend: 'down',
          score: 7.0
        }
      ],
      tradeStats: {
        imports: {
          yoy: 8.5,
          mom: 2.1,
          value: 125000000000
        },
        exports: {
          yoy: 6.2,
          mom: 1.8,
          value: 98000000000
        }
      },
      topStocks: [
        {
          symbol: 'BHP',
          name: 'BHP Group Ltd',
          peRatio: 15.2,
          pegRatio: 1.2,
          score: 7.4
        },
        {
          symbol: 'RIO',
          name: 'Rio Tinto plc',
          peRatio: 12.8,
          pegRatio: 1.1,
          score: 7.2
        },
        {
          symbol: 'VALE',
          name: 'Vale SA',
          peRatio: 10.5,
          pegRatio: 0.9,
          score: 6.9
        }
      ]
    },
    {
      name: 'Manufacturing',
      description: 'Production and processing',
      score: 6.9,
      metrics: [
        {
          name: 'PMI Manufacturing',
          code: 'PMI_MAN',
          value: 52.4,
          previousValue: 51.8,
          trend: 'up',
          score: 6.8
        },
        {
          name: 'Capacity Utilization',
          code: 'CAP_UTIL',
          value: 78.2,
          previousValue: 77.8,
          trend: 'up',
          score: 7.0
        },
        {
          name: 'Order Backlog',
          code: 'ORD_BACK',
          value: 48.5,
          previousValue: 49.2,
          trend: 'down',
          score: 6.8
        }
      ],
      tradeStats: {
        imports: {
          yoy: 5.8,
          mom: 1.5,
          value: 185000000000
        },
        exports: {
          yoy: 7.2,
          mom: 2.2,
          value: 210000000000
        }
      },
      topStocks: [
        {
          symbol: 'CAT',
          name: 'Caterpillar Inc.',
          peRatio: 18.5,
          pegRatio: 1.4,
          score: 7.6
        },
        {
          symbol: 'HON',
          name: 'Honeywell International',
          peRatio: 22.1,
          pegRatio: 1.8,
          score: 7.2
        },
        {
          symbol: 'MMM',
          name: '3M Company',
          peRatio: 16.8,
          pegRatio: 1.5,
          score: 6.8
        }
      ]
    },
    {
      name: 'Wholesaler',
      description: 'Distribution and inventory',
      score: 6.7,
      metrics: [
        {
          name: 'Wholesale Inventories',
          code: 'WHL_INV',
          value: 1.2,
          previousValue: 1.4,
          trend: 'down',
          score: 6.5
        },
        {
          name: 'Wholesale Sales',
          code: 'WHL_SALES',
          value: 2.8,
          previousValue: 2.5,
          trend: 'up',
          score: 6.9
        },
        {
          name: 'Inventory/Sales Ratio',
          code: 'INV_SALES',
          value: 1.32,
          previousValue: 1.35,
          trend: 'down',
          score: 6.7
        }
      ],
      tradeStats: {
        imports: {
          yoy: 4.2,
          mom: 1.1,
          value: 145000000000
        },
        exports: {
          yoy: 5.5,
          mom: 1.8,
          value: 155000000000
        }
      },
      topStocks: [
        {
          symbol: 'WMT',
          name: 'Walmart Inc.',
          peRatio: 24.5,
          pegRatio: 2.1,
          score: 7.2
        },
        {
          symbol: 'COST',
          name: 'Costco Wholesale',
          peRatio: 28.2,
          pegRatio: 2.4,
          score: 7.0
        },
        {
          symbol: 'HD',
          name: 'Home Depot Inc.',
          peRatio: 22.8,
          pegRatio: 1.9,
          score: 6.8
        }
      ]
    },
    {
      name: 'Retailer',
      description: 'Consumer-facing sales',
      score: 6.5,
      metrics: [
        {
          name: 'Retail Sales YoY',
          code: 'RET_SALES',
          value: 3.8,
          previousValue: 3.5,
          trend: 'up',
          score: 6.7
        },
        {
          name: 'Store Inventory',
          code: 'RET_INV',
          value: -2.1,
          previousValue: -1.8,
          trend: 'down',
          score: 6.4
        },
        {
          name: 'Same Store Sales',
          code: 'SAME_STORE',
          value: 2.4,
          previousValue: 2.2,
          trend: 'up',
          score: 6.5
        }
      ],
      tradeStats: {
        imports: {
          yoy: 3.8,
          mom: 0.9,
          value: 95000000000
        },
        exports: {
          yoy: 4.2,
          mom: 1.2,
          value: 85000000000
        }
      },
      topStocks: [
        {
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          peRatio: 42.5,
          pegRatio: 2.8,
          score: 7.8
        },
        {
          symbol: 'TGT',
          name: 'Target Corporation',
          peRatio: 18.2,
          pegRatio: 1.6,
          score: 6.9
        },
        {
          symbol: 'LOW',
          name: 'Lowe\'s Companies',
          peRatio: 20.5,
          pegRatio: 1.8,
          score: 6.7
        }
      ]
    },
    {
      name: 'Consumer',
      description: 'End-user demand',
      score: 6.7,
      metrics: [
        {
          name: 'Consumer Confidence',
          code: 'CONS_CONF',
          value: 102.5,
          previousValue: 101.8,
          trend: 'up',
          score: 6.8
        },
        {
          name: 'Personal Spending',
          code: 'PERS_SPEND',
          value: 0.7,
          previousValue: 0.6,
          trend: 'up',
          score: 6.9
        },
        {
          name: 'Credit Card Spending',
          code: 'CC_SPEND',
          value: 4.2,
          previousValue: 4.0,
          trend: 'up',
          score: 6.5
        }
      ],
      tradeStats: {
        imports: {
          yoy: 4.5,
          mom: 1.2,
          value: 75000000000
        },
        exports: {
          yoy: 3.8,
          mom: 0.9,
          value: 65000000000
        }
      },
      topStocks: [
        {
          symbol: 'PG',
          name: 'Procter & Gamble',
          peRatio: 25.8,
          pegRatio: 2.2,
          score: 7.1
        },
        {
          symbol: 'KO',
          name: 'Coca-Cola Company',
          peRatio: 24.2,
          pegRatio: 2.1,
          score: 6.9
        },
        {
          symbol: 'PEP',
          name: 'PepsiCo Inc.',
          peRatio: 23.5,
          pegRatio: 2.0,
          score: 6.8
        }
      ]
    }
  ]
};