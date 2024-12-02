import type { Position, Exposure, PortfolioMetrics } from '../types/portfolio';

export const positions: Position[] = [
  {
    id: '1',
    type: 'Long',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    entryPrice: 175.25,
    currentPrice: 182.50,
    quantity: 100,
    entryDate: '2024-02-15',
    pnl: 725,
    pnlPercentage: 4.14
  },
  {
    id: '2',
    type: 'Short',
    symbol: 'XLU',
    name: 'Utilities Select Sector SPDR',
    sector: 'Utilities',
    entryPrice: 65.75,
    currentPrice: 63.25,
    quantity: 150,
    entryDate: '2024-02-20',
    pnl: 375,
    pnlPercentage: 3.80
  }
];

export const exposures: Exposure[] = [
  {
    sector: 'Technology',
    percentage: 15.2,
    long: 18.2,
    short: 3.0,
    net: 15.2
  },
  {
    sector: 'Utilities',
    percentage: -9.8,
    long: 0,
    short: 9.8,
    net: -9.8
  }
];

export const metrics: PortfolioMetrics = {
  totalValue: 1250000,
  monthlyReturn: 2.8,
  previousMonthReturn: 1.9,
  netExposure: 5.4,
  grossExposure: 28.0,
  longExposure: 18.2,
  shortExposure: 12.8,
  beta: 0.12,
  sharpeRatio: 2.4
};