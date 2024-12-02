import type { ISMAnalysis, EconomicBias, BiasStrength } from '../types/analysis';

interface ISMTrendAnalysis {
  isConfirmedTrend: boolean;
  consecutiveReadings: number;
  trendDirection: 'up' | 'down' | 'neutral';
}

interface NewOrdersAnalysis {
  value: number;
  trend: 'leading' | 'lagging' | 'neutral';
  divergence: number;
}

export function analyzeISM(
  currentValue: number,
  previousValue: number,
  historicalValues: number[] = [],
  newOrders?: { current: number; previous: number }
): ISMAnalysis {
  const trend = currentValue > previousValue ? 'growing' : 'slowing';
  const trendAnalysis = analyzeTrend(currentValue, historicalValues);
  const newOrdersAnalysis = analyzeNewOrders(currentValue, newOrders);
  const gdpImplications = analyzeGDPImplications(currentValue, trendAnalysis);
  
  let score = calculateBaseScore(currentValue, previousValue);
  
  // Adjust score based on trend confirmation
  if (trendAnalysis.isConfirmedTrend) {
    score *= 1.2; // Increase confidence when trend is confirmed
  }
  
  // Adjust for new orders leading/lagging
  if (newOrdersAnalysis) {
    score = adjustScoreForNewOrders(score, newOrdersAnalysis);
  }

  // Determine bias and strength
  const { bias, biasStrength } = determineBiasAndStrength(score, trendAnalysis, newOrdersAnalysis);

  return {
    score: normalizeScore(score),
    bias,
    biasStrength,
    interpretation: generateInterpretation(currentValue, trend, trendAnalysis, newOrdersAnalysis, gdpImplications),
    previousValue,
    trend,
    isFirstChange: trendAnalysis.consecutiveReadings === 1
  };
}

function analyzeTrend(current: number, historical: number[]): ISMTrendAnalysis {
  if (historical.length < 3) {
    return {
      isConfirmedTrend: false,
      consecutiveReadings: 1,
      trendDirection: 'neutral'
    };
  }

  let consecutiveReadings = 1;
  const direction = current > historical[0] ? 'up' : 'down';

  for (let i = 0; i < Math.min(historical.length - 1, 3); i++) {
    if ((historical[i] > historical[i + 1]) === (direction === 'up')) {
      consecutiveReadings++;
    } else {
      break;
    }
  }

  return {
    isConfirmedTrend: consecutiveReadings >= 3,
    consecutiveReadings,
    trendDirection: direction
  };
}

function analyzeNewOrders(
  ismValue: number,
  newOrders?: { current: number; previous: number }
): NewOrdersAnalysis | null {
  if (!newOrders) return null;

  const divergence = newOrders.current - ismValue;
  
  return {
    value: newOrders.current,
    trend: divergence > 2 ? 'leading' : divergence < -2 ? 'lagging' : 'neutral',
    divergence
  };
}

function analyzeGDPImplications(value: number, trend: ISMTrendAnalysis): string {
  // ISM has 85% correlation with GDP (12-month lag)
  const impliedGDPGrowth = (value - 50) * 0.3; // Rough conversion factor
  
  let implication = `Implies GDP growth of approximately ${impliedGDPGrowth.toFixed(1)}% `;
  
  if (trend.isConfirmedTrend) {
    implication += trend.trendDirection === 'up' 
      ? 'with strengthening momentum'
      : 'with weakening momentum';
  } else {
    implication += '(trend not yet confirmed)';
  }
  
  return implication;
}

function calculateBaseScore(current: number, previous: number): number {
  const baseScore = current > 50 ? 5 : -5;
  const momentum = ((current - previous) / previous) * 100;
  
  return baseScore + (momentum * 0.5);
}

function adjustScoreForNewOrders(score: number, newOrders: NewOrdersAnalysis): number {
  switch (newOrders.trend) {
    case 'leading':
      return score * 1.15; // Increase confidence when new orders lead
    case 'lagging':
      return score * 0.85; // Decrease confidence when new orders lag
    default:
      return score;
  }
}

function determineBiasAndStrength(
  score: number,
  trend: ISMTrendAnalysis,
  newOrders: NewOrdersAnalysis | null
): { bias: EconomicBias; biasStrength: BiasStrength } {
  const absScore = Math.abs(score);
  
  // Determine base bias
  let bias: EconomicBias = score > 0 ? 'inflation' : score < 0 ? 'deflation' : 'neutral';
  
  // Determine strength based on multiple factors
  let strengthScore = 0;
  
  // Factor 1: Absolute score
  if (absScore >= 7) strengthScore += 3;
  else if (absScore >= 4) strengthScore += 2;
  else strengthScore += 1;
  
  // Factor 2: Trend confirmation
  if (trend.isConfirmedTrend) strengthScore += 2;
  
  // Factor 3: New orders alignment
  if (newOrders && newOrders.trend === 'leading') strengthScore += 1;
  
  let strength: BiasStrength;
  if (strengthScore >= 5) strength = 'strong';
  else if (strengthScore >= 3) strength = 'moderate';
  else strength = 'weak';
  
  return { bias, biasStrength: strength };
}

function normalizeScore(score: number): number {
  return Math.max(Math.min(score, 10), -10);
}

function generateInterpretation(
  value: number,
  trend: 'growing' | 'slowing',
  trendAnalysis: ISMTrendAnalysis,
  newOrders: NewOrdersAnalysis | null,
  gdpImplications: string
): string {
  let interpretation = `Manufacturing ${value > 50 ? 'expansion' : 'contraction'} `;

  if (trendAnalysis.isConfirmedTrend) {
    interpretation += `showing confirmed ${trend} trend over ${trendAnalysis.consecutiveReadings} readings. `;
  } else {
    interpretation += `${trend}, but trend not yet confirmed. `;
  }

  if (newOrders) {
    interpretation += `New orders ${newOrders.trend === 'leading' ? 'leading' : 'lagging'} ISM by ${Math.abs(newOrders.divergence).toFixed(1)} points. `;
  }

  interpretation += gdpImplications;

  return interpretation;
}