import type { TradeIdea } from '../types/trade';

export const tradeIdeas: TradeIdea[] = [
  {
    id: '1',
    type: 'Currency',
    subType: 'Macro',
    name: 'USD/JPY Divergence',
    description: 'Monetary policy divergence between Fed and BoJ',
    longPosition: {
      name: 'USD',
      score: 7.2,
      metrics: [
        {
          name: 'Interest Rate',
          value: 5.25,
          trend: 'up'
        },
        {
          name: 'CPI',
          value: 3.7,
          trend: 'up'
        }
      ]
    },
    shortPosition: {
      name: 'JPY',
      score: 5.8,
      metrics: [
        {
          name: 'Interest Rate',
          value: -0.1,
          trend: 'neutral'
        },
        {
          name: 'CPI',
          value: 2.8,
          trend: 'down'
        }
      ]
    },
    conviction: 8,
    expectedReturn: 12.5,
    riskScore: 3.2,
    timeframe: '3-6 months',
    catalysts: [
      'Fed maintains higher rates for longer',
      'BoJ continues ultra-loose policy',
      'Yield differential widens'
    ],
    signals: [
      {
        name: 'Monetary Policy',
        type: 'bullish',
        description: 'Growing policy divergence between Fed and BoJ'
      },
      {
        name: 'Yield Spread',
        type: 'bullish',
        description: '10Y yield differential at multi-year highs'
      }
    ]
  },
  {
    id: '2',
    type: 'Industry',
    subType: 'Supply-Chain',
    name: 'Commodity-Retail Spread',
    description: 'Supply chain normalization play',
    longPosition: {
      name: 'Commodity Producers',
      sector: 'Materials',
      score: 7.2,
      metrics: [
        {
          name: 'Inventory Levels',
          value: -5.2,
          trend: 'down'
        },
        {
          name: 'Price Index',
          value: 552.8,
          trend: 'up'
        }
      ]
    },
    shortPosition: {
      name: 'Retailers',
      sector: 'Consumer Discretionary',
      score: 5.4,
      metrics: [
        {
          name: 'Inventory/Sales',
          value: 1.32,
          trend: 'up'
        },
        {
          name: 'Same Store Sales',
          value: 2.4,
          trend: 'down'
        }
      ]
    },
    conviction: 7,
    expectedReturn: 15.0,
    riskScore: 4.5,
    timeframe: '2-3 months',
    catalysts: [
      'Supply chain bottlenecks',
      'Rising input costs',
      'Inventory destocking cycle'
    ],
    signals: [
      {
        name: 'Inventory Cycle',
        type: 'bullish',
        description: 'Producer inventories low, retail inventories high'
      },
      {
        name: 'Pricing Power',
        type: 'bearish',
        description: 'Retailers struggling to pass through costs'
      }
    ]
  },
  {
    id: '3',
    type: 'Stock',
    subType: 'Cross-Sector',
    name: 'Tech-Utilities Rotation',
    description: 'Sector rotation based on rate sensitivity',
    longPosition: {
      name: 'Technology Sector',
      sector: 'Technology',
      score: 7.4,
      metrics: [
        {
          name: 'Relative Strength',
          value: 1.15,
          trend: 'up'
        },
        {
          name: 'Earnings Growth',
          value: 12.5,
          trend: 'up'
        }
      ]
    },
    shortPosition: {
      name: 'Utilities Sector',
      sector: 'Utilities',
      score: 5.2,
      metrics: [
        {
          name: 'Relative Strength',
          value: 0.85,
          trend: 'down'
        },
        {
          name: 'Earnings Growth',
          value: 3.2,
          trend: 'down'
        }
      ]
    },
    conviction: 8,
    expectedReturn: 18.5,
    riskScore: 3.8,
    timeframe: '1-3 months',
    catalysts: [
      'Higher rates environment',
      'Strong tech earnings',
      'Utilities cost pressures'
    ],
    signals: [
      {
        name: 'Technical',
        type: 'bullish',
        description: 'Tech showing relative strength vs utilities'
      },
      {
        name: 'Fundamental',
        type: 'bullish',
        description: 'Superior earnings growth in tech sector'
      }
    ]
  }
];