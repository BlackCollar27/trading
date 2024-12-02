import type { Country } from '../types/country';

export const countries: Country[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    region: 'Americas',
    marketType: 'Developed',
    score: 7.2
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    region: 'Europe',
    marketType: 'Developed',
    score: 6.8
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    region: 'Asia',
    marketType: 'Developed',
    score: 6.5
  }
];