export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia' | 'Oceania' | 'Africa';
  marketType: 'Developed' | 'Emerging' | 'Frontier';
  score: number;
}

export interface CountryData {
  id: string;
  countryCode: string;
  worldViewData: import('./indicators').WorldViewData;
  industryViewData: import('./industry').IndustryViewData;
  stockViewData: import('./stock').StockViewData;
}