import type { CountryData } from '../types/country';
import { worldViewData } from './worldViewData';
import { industryViewData } from './industryViewData';
import { stockViewData } from './stockViewData';

export const countryData: Record<string, CountryData> = {
  us: {
    id: 'us',
    countryCode: 'US',
    worldViewData: {
      ...worldViewData,
      totalScore: 7.2,
      groups: worldViewData.groups.map(group => ({
        ...group,
        groupScore: group.groupScore + 0.2,
        indicators: group.indicators.map(indicator => ({
          ...indicator,
          score: indicator.score + 0.2
        }))
      }))
    },
    industryViewData: {
      ...industryViewData,
      totalScore: 7.4,
      stages: industryViewData.stages.map(stage => ({
        ...stage,
        score: stage.score + 0.4
      }))
    },
    stockViewData: {
      ...stockViewData,
      totalScore: 7.5,
      sectors: stockViewData.sectors.map(sector => ({
        ...sector,
        score: sector.score + 0.3
      }))
    }
  },
  gb: {
    id: 'gb',
    countryCode: 'GB',
    worldViewData: {
      ...worldViewData,
      totalScore: 6.8,
      groups: worldViewData.groups.map(group => ({
        ...group,
        groupScore: group.groupScore - 0.2,
        indicators: group.indicators.map(indicator => ({
          ...indicator,
          score: indicator.score - 0.2
        }))
      }))
    },
    industryViewData: {
      ...industryViewData,
      totalScore: 6.5,
      stages: industryViewData.stages.map(stage => ({
        ...stage,
        score: stage.score - 0.3
      }))
    },
    stockViewData: {
      ...stockViewData,
      totalScore: 6.7,
      sectors: stockViewData.sectors.map(sector => ({
        ...sector,
        score: sector.score - 0.2
      }))
    }
  },
  jp: {
    id: 'jp',
    countryCode: 'JP',
    worldViewData: {
      ...worldViewData,
      totalScore: 6.5,
      groups: worldViewData.groups.map(group => ({
        ...group,
        groupScore: group.groupScore - 0.4,
        indicators: group.indicators.map(indicator => ({
          ...indicator,
          score: indicator.score - 0.4
        }))
      }))
    },
    industryViewData: {
      ...industryViewData,
      totalScore: 6.2,
      stages: industryViewData.stages.map(stage => ({
        ...stage,
        score: stage.score - 0.5
      }))
    },
    stockViewData: {
      ...stockViewData,
      totalScore: 6.4,
      sectors: stockViewData.sectors.map(sector => ({
        ...sector,
        score: sector.score - 0.4
      }))
    }
  }
  // Add more countries as needed
};