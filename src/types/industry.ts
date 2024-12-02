import type { Stock } from './stock';

export interface TradeStats {
  imports: {
    yoy: number;
    mom: number;
    value: number;
  };
  exports: {
    yoy: number;
    mom: number;
    value: number;
  };
}

export interface IndustryMetric {
  name: string;
  code: string;
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'neutral';
  score: number;
}

export interface SupplyChainStage {
  name: string;
  description: string;
  score: number;
  metrics: IndustryMetric[];
  tradeStats: TradeStats;
  topStocks: Stock[];
}

export interface IndustryViewData {
  totalScore: number;
  stages: SupplyChainStage[];
}