import type { CountryScore, CategoryScore, EconomicScore } from '../types/analysis';
import type { WorldViewData, IndicatorGroup } from '../types/indicators';

const SCALE = {
  HIGH: 160,
  LOW: -150,
  FULL: 310,
  HALF: 5
};

export function calculateCountryScore(data: WorldViewData): CountryScore {
  const categories: CategoryScore[] = [
    {
      name: 'Leading Indicators Surveys',
      totalScore: 0,
      maxScore: 40,
      indicators: []
    },
    {
      name: 'Money Supply',
      totalScore: 0,
      maxScore: 10,
      indicators: []
    },
    {
      name: 'Interest Rates',
      totalScore: 0,
      maxScore: 10,
      indicators: []
    },
    {
      name: 'Inflation',
      totalScore: 0,
      maxScore: 40,
      indicators: []
    },
    {
      name: 'Employment',
      totalScore: 0,
      maxScore: 10,
      indicators: []
    },
    {
      name: 'Balance Sheets and Sovereign Risk',
      totalScore: 0,
      maxScore: 50,
      indicators: []
    }
  ];

  // Transform indicator groups into economic scores
  data.groups.forEach(group => {
    const category = categories.find(c => c.name === group.name);
    if (category) {
      group.indicators.forEach(indicator => {
        const economicScore: EconomicScore = {
          category: group.name,
          driver: indicator.name,
          code: indicator.code,
          rate: indicator.value,
          score: indicator.score,
          weight: 1, // Default weight
          total: indicator.score,
          state: indicator.trend === 'up' ? 'Growing' : 'Slowing',
          comment: `${indicator.trend === 'up' ? 'Positive' : 'Negative'} momentum`
        };
        category.indicators.push(economicScore);
        category.totalScore += economicScore.total;
      });
    }
  });

  // Calculate total score
  const totalScore = categories.reduce((sum, cat) => sum + cat.totalScore, 0);

  // Determine bias based on total score
  const bias = determineBias(totalScore, categories);

  return {
    totalScore,
    bias,
    categories
  };
}

function determineBias(totalScore: number, categories: CategoryScore[]): {
  type: 'inflation' | 'deflation' | 'neutral';
  strength: 'strong' | 'moderate' | 'weak';
  outlook: string;
} {
  // Convert total score to normalized scale (-10 to +10)
  const normalizedScore = ((totalScore - SCALE.LOW) / SCALE.FULL) * 20 - 10;

  let type: 'inflation' | 'deflation' | 'neutral';
  let strength: 'strong' | 'moderate' | 'weak';

  if (normalizedScore > 2) {
    type = 'inflation';
  } else if (normalizedScore < -2) {
    type = 'deflation';
  } else {
    type = 'neutral';
  }

  const absScore = Math.abs(normalizedScore);
  if (absScore >= 7) {
    strength = 'strong';
  } else if (absScore >= 4) {
    strength = 'moderate';
  } else {
    strength = 'weak';
  }

  // Generate outlook based on leading indicators
  const leadingIndicators = categories.find(c => c.name === 'Leading Indicators Surveys');
  const inflationCategory = categories.find(c => c.name === 'Inflation');
  
  let outlook = `${strength} ${type}ary bias over next 3-6 months. `;
  
  if (leadingIndicators && inflationCategory) {
    outlook += `Leading indicators suggest ${
      leadingIndicators.totalScore > 0 ? 'strengthening' : 'weakening'
    } momentum with ${
      inflationCategory.totalScore > 0 ? 'upward' : 'downward'
    } price pressure.`;
  }

  return { type, strength, outlook };
}