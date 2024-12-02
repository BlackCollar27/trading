import type { EconomicBias, BiasStrength } from './common';

export interface EconomicScore {
  category: string;
  driver: string;
  code: string;
  rate: number;
  score: number;
  weight: number;
  total: number;
  state: string;
  comment: string;
}

export interface CategoryScore {
  name: string;
  totalScore: number;
  maxScore: number;
  indicators: EconomicScore[];
}

export interface CountryScore {
  totalScore: number;
  bias: {
    type: EconomicBias;
    strength: BiasStrength;
    outlook: string;
  };
  categories: CategoryScore[];
}

export interface DistributionStats {
  mean: number;
  standardDeviation: number;
  zScore: number;
  percentile: number;
}

export interface ISMAnalysis {
  score: number;
  bias: EconomicBias;
  biasStrength: BiasStrength;
  interpretation: string;
  previousValue: number;
  trend: 'growing' | 'slowing';
  isFirstChange: boolean;
}