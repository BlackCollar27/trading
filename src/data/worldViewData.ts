import type { WorldViewData } from '../types/indicators';

export const worldViewData: WorldViewData = {
  totalScore: 7.2,
  groups: [
    {
      name: 'Leading Indicators Surveys',
      groupScore: 7.5,
      indicators: [
        {
          name: 'ISM Manufacturing',
          code: 'ISM',
          value: 54.2,
          previousValue: 52.8,
          trend: 'up',
          score: 7.2
        },
        {
          name: 'NMI Services',
          code: 'NMI',
          value: 55.1,
          previousValue: 53.9,
          trend: 'up',
          score: 7.4
        },
        {
          name: 'Consumer Sentiment',
          code: 'UMCSI',
          value: 78.8,
          previousValue: 76.9,
          trend: 'up',
          score: 7.8
        },
        {
          name: 'Building Permits',
          code: 'BP',
          value: 1.45,
          previousValue: 1.42,
          trend: 'up',
          score: 7.6
        }
      ]
    },
    {
      name: 'Money and Interest',
      groupScore: 7.8,
      indicators: [
        {
          name: 'M2 Money Supply',
          code: 'M2',
          value: 21.7,
          previousValue: 21.2,
          trend: 'up',
          score: 8.2
        },
        {
          name: 'Federal Reserve Rate',
          code: 'IR%',
          value: 5.25,
          previousValue: 5.0,
          trend: 'up',
          score: 7.4
        }
      ]
    },
    {
      name: 'Inflation Metrics',
      groupScore: 7.4,
      indicators: [
        {
          name: 'CPI All Items',
          code: 'CPIAUCSL',
          value: 3.7,
          previousValue: 3.2,
          trend: 'up',
          score: 7.6
        },
        {
          name: 'Core CPI',
          code: 'CPILFESL',
          value: 4.1,
          previousValue: 4.0,
          trend: 'up',
          score: 7.8
        },
        {
          name: 'PPI All Items',
          code: 'PPI All',
          value: 2.2,
          previousValue: 1.9,
          trend: 'up',
          score: 7.0
        },
        {
          name: 'PPI Core',
          code: 'PPI Core',
          value: 2.8,
          previousValue: 2.6,
          trend: 'up',
          score: 7.2
        }
      ]
    },
    {
      name: 'Employment',
      groupScore: 6.8,
      indicators: [
        {
          name: 'Non-Farm Payrolls',
          code: 'NFP',
          value: 216,
          previousValue: 187,
          trend: 'up',
          score: 6.8
        }
      ]
    },
    {
      name: 'Sovereign Risk Metrics',
      groupScore: 6.9,
      indicators: [
        {
          name: 'Govt Debt to GDP',
          code: 'DEBT_GDP',
          value: 133.4,
          previousValue: 132.8,
          trend: 'up',
          score: 7.2
        },
        {
          name: 'Interest/GDP',
          code: 'INT_GDP',
          value: 2.8,
          previousValue: 2.6,
          trend: 'up',
          score: 6.8
        },
        {
          name: '10Y Treasury',
          code: 'UST10Y',
          value: 4.62,
          previousValue: 4.48,
          trend: 'up',
          score: 6.9
        },
        {
          name: 'CB Balance Sheet/GDP',
          code: 'CBBS',
          value: 29.8,
          previousValue: 29.2,
          trend: 'up',
          score: 6.7
        }
      ]
    },
    {
      name: 'Economic Growth',
      groupScore: 6.8,
      indicators: [
        {
          name: 'Real GDP Growth',
          code: 'GDP',
          value: 2.9,
          previousValue: 2.6,
          trend: 'up',
          score: 6.8
        }
      ]
    }
  ]
};