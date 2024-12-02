import type { StockViewData } from '../types/stock';

export const stockViewData: StockViewData = {
  totalScore: 6.8,
  sectors: [
    {
      name: 'Technology',
      type: 'Cyclical',
      score: 7.2,
      peRatio: 25.4,
      pegRatio: 1.8,
      relativeStrength: 1.15,
      topStocks: [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          peRatio: 28.5,
          pegRatio: 2.1,
          score: 7.4
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corp.',
          peRatio: 32.1,
          pegRatio: 2.3,
          score: 7.2
        }
      ]
    },
    {
      name: 'Healthcare',
      type: 'Defensive',
      score: 6.5,
      peRatio: 18.2,
      pegRatio: 1.5,
      relativeStrength: 0.92,
      topStocks: [
        {
          symbol: 'JNJ',
          name: 'Johnson & Johnson',
          peRatio: 16.8,
          pegRatio: 1.4,
          score: 6.8
        },
        {
          symbol: 'PFE',
          name: 'Pfizer Inc.',
          peRatio: 12.4,
          pegRatio: 1.2,
          score: 6.3
        }
      ]
    }
  ],
  recommendedTrades: [
    {
      id: 'CST001',
      type: 'Cross-Sector',
      longPosition: {
        name: 'Technology Sector ETF',
        sector: 'Technology',
        metrics: [
          {
            name: 'Relative Strength',
            value: 1.15,
            previousValue: 1.12,
            trend: 'up',
            score: 7.2
          },
          {
            name: 'Momentum',
            value: 0.82,
            previousValue: 0.78,
            trend: 'up',
            score: 7.4
          }
        ]
      },
      shortPosition: {
        name: 'Utilities Sector ETF',
        sector: 'Utilities',
        metrics: [
          {
            name: 'Relative Strength',
            value: 0.85,
            previousValue: 0.88,
            trend: 'down',
            score: 6.1
          },
          {
            name: 'Momentum',
            value: -0.32,
            previousValue: -0.28,
            trend: 'down',
            score: 5.8
          }
        ]
      },
      riskScore: 3.2,
      expectedReturn: 8.5,
      sharpeRatio: 2.65
    }
  ]
};