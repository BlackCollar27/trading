export interface Indicator {
  name: string;
  code: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  score: number;
  previousValue?: number;
}

export interface IndicatorGroup {
  name: string;
  indicators: Indicator[];
  groupScore: number;
}

export interface WorldViewData {
  totalScore: number;
  groups: IndicatorGroup[];
}