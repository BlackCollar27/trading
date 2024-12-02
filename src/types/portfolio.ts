export interface Position {
  id: string;
  type: 'Long' | 'Short';
  symbol: string;
  name: string;
  sector: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  entryDate: string;
  pnl: number;
  pnlPercentage: number;
}

export interface Exposure {
  sector: string;
  percentage: number;
  long: number;
  short: number;
  net: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  monthlyReturn: number;
  previousMonthReturn: number;
  netExposure: number;
  grossExposure: number;
  longExposure: number;
  shortExposure: number;
  beta: number;
  sharpeRatio: number;
}