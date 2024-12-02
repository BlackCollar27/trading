export interface WatchlistItem {
  id: string;
  type: 'Cross-Sector' | 'Cross-Sector-Constituent' | 'Intra-Sector';
  longPosition: {
    name: string;
    sector: string;
  };
  shortPosition: {
    name: string;
    sector: string;
  };
  rationale: string;
  expectedReturn: number;
  riskScore: number;
  dateAdded: string;
  status: 'Watching' | 'Ready' | 'Hold';
}