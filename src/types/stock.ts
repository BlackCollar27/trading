export interface StockMetric {
  name: string;
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'neutral';
  score: number;
}

export interface SectorData {
  name: string;
  type: 'Cyclical' | 'Defensive';
  score: number;
  peRatio: number;
  pegRatio: number;
  relativeStrength: number;
  topStocks: {
    symbol: string;
    name: string;
    peRatio: number;
    pegRatio: number;
    score: number;
  }[];
}

export interface SpreadTrade {
  id: string;
  type: 'Cross-Sector' | 'Cross-Sector-Constituent' | 'Intra-Sector';
  longPosition: {
    name: string;
    sector: string;
    metrics: StockMetric[];
  };
  shortPosition: {
    name: string;
    sector: string;
    metrics: StockMetric[];
  };
  riskScore: number;
  expectedReturn: number;
  sharpeRatio: number;
}

export interface StockViewData {
  totalScore: number;
  sectors: SectorData[];
  recommendedTrades: SpreadTrade[];
}