export interface TradeIdea {
  id: string;
  type: 'Currency' | 'Industry' | 'Stock';
  subType: 'Cross-Sector' | 'Cross-Sector-Constituent' | 'Intra-Sector' | 'Supply-Chain' | 'Macro';
  name: string;
  description: string;
  longPosition: {
    name: string;
    sector?: string;
    score: number;
    metrics: {
      name: string;
      value: number;
      trend: 'up' | 'down' | 'neutral';
    }[];
  };
  shortPosition: {
    name: string;
    sector?: string;
    score: number;
    metrics: {
      name: string;
      value: number;
      trend: 'up' | 'down' | 'neutral';
    }[];
  };
  conviction: number;
  expectedReturn: number;
  riskScore: number;
  timeframe: string;
  catalysts: string[];
  signals: {
    name: string;
    type: 'bullish' | 'bearish' | 'neutral';
    description: string;
  }[];
}