import type { EconomicIndicatorAnalysis, DistributionStats } from '../types/analysis';

interface PermitGDPBand {
  permits: number;
  gdp: number;
  score: number;
}

// Scorecard mapping based on the provided table
const PERMIT_GDP_BANDS: PermitGDPBand[] = [
  { permits: 2400, gdp: 9.5, score: -9 },
  { permits: 2300, gdp: 9.0, score: -10 },
  { permits: 2200, gdp: 8.0, score: -10 },
  { permits: 2100, gdp: 7.0, score: -10 },
  { permits: 2000, gdp: 6.5, score: -9 },
  { permits: 1900, gdp: 6.0, score: -8 },
  { permits: 1800, gdp: 5.0, score: -7 },
  { permits: 1700, gdp: 4.5, score: 8 },
  { permits: 1600, gdp: 4.0, score: 8 },
  { permits: 1500, gdp: 3.0, score: 3 },
  { permits: 1400, gdp: 2.5, score: 2 },
  { permits: 1300, gdp: 2.0, score: 0 },
  { permits: 1200, gdp: 1.5, score: -3 },
  { permits: 1100, gdp: 1.0, score: -5 },
  { permits: 1000, gdp: 0.0, score: -8 },
  { permits: 900, gdp: -0.5, score: 7 },
  { permits: 800, gdp: -1.0, score: 8 },
  { permits: 700, gdp: -2.0, score: 10 },
  { permits: 600, gdp: -3.0, score: 10 },
  { permits: 500, gdp: -3.0, score: 10 },
  { permits: 400, gdp: -4.0, score: 10 }
];

export function analyzeBuildingPermits(
  currentPermits: number,
  previousPermits: number,
  gdpGrowth: number,
  historicalPermits: number[] = []
): EconomicIndicatorAnalysis {
  const distribution = calculateDistributionStats(currentPermits, historicalPermits);
  
  // Find the closest band for both permits and GDP
  const { score, bias } = calculateScoreAndBias(currentPermits, gdpGrowth);
  
  // Calculate momentum effect
  const momentum = calculateMomentum(currentPermits, previousPermits);
  
  // Adjust score based on momentum
  const adjustedScore = adjustScoreForMomentum(score, momentum);
  
  // Determine bias strength based on score and GDP divergence
  const strength = determineBiasStrength(adjustedScore, gdpGrowth, currentPermits);

  return {
    currentValue: currentPermits,
    previousValue: previousPermits,
    distribution,
    bias: {
      type: bias,
      strength,
      score: adjustedScore
    },
    interpretation: generateInterpretation(currentPermits, gdpGrowth, adjustedScore, bias, strength, momentum)
  };
}

function calculateScoreAndBias(permits: number, gdpGrowth: number): { score: number; bias: 'inflation' | 'deflation' | 'neutral' } {
  // Find the closest permit band
  let closestBand = PERMIT_GDP_BANDS[0];
  let minDiff = Math.abs(permits - PERMIT_GDP_BANDS[0].permits);

  for (const band of PERMIT_GDP_BANDS) {
    const diff = Math.abs(permits - band.permits);
    if (diff < minDiff) {
      minDiff = diff;
      closestBand = band;
    }
  }

  // Calculate GDP divergence
  const gdpDivergence = gdpGrowth - closestBand.gdp;
  
  // Base score from the band
  let score = closestBand.score;
  
  // Adjust score based on GDP divergence
  if (Math.abs(gdpDivergence) > 1) {
    score += Math.sign(gdpDivergence) * 2;
  }

  // Determine bias based on score
  let bias: 'inflation' | 'deflation' | 'neutral';
  if (score > 0) {
    bias = 'inflation';
  } else if (score < 0) {
    bias = 'deflation';
  } else {
    bias = 'neutral';
  }

  // Ensure score stays within bounds
  score = Math.max(Math.min(score, 10), -10);

  return { score, bias };
}

function calculateMomentum(current: number, previous: number): 'accelerating' | 'decelerating' | 'stable' {
  const percentChange = ((current - previous) / previous) * 100;
  
  if (percentChange > 5) return 'accelerating';
  if (percentChange < -5) return 'decelerating';
  return 'stable';
}

function adjustScoreForMomentum(score: number, momentum: 'accelerating' | 'decelerating' | 'stable'): number {
  switch (momentum) {
    case 'accelerating':
      return Math.min(score + 1, 10);
    case 'decelerating':
      return Math.max(score - 1, -10);
    default:
      return score;
  }
}

function determineBiasStrength(
  score: number,
  gdpGrowth: number,
  permits: number
): 'strong' | 'moderate' | 'weak' {
  const absScore = Math.abs(score);
  
  // Strong signals
  if (absScore >= 8) return 'strong';
  
  // Check for GDP divergence
  const expectedGDP = PERMIT_GDP_BANDS.find(band => 
    Math.abs(band.permits - permits) < 100
  )?.gdp ?? gdpGrowth;
  
  const gdpDivergence = Math.abs(gdpGrowth - expectedGDP);
  
  if (gdpDivergence > 2) return 'strong';
  if (absScore >= 5) return 'moderate';
  return 'weak';
}

function generateInterpretation(
  permits: number,
  gdpGrowth: number,
  score: number,
  bias: 'inflation' | 'deflation' | 'neutral',
  strength: 'strong' | 'moderate' | 'weak',
  momentum: 'accelerating' | 'decelerating' | 'stable'
): string {
  let interpretation = `Building permits at ${permits.toFixed(1)}K `;

  // Add momentum description
  switch (momentum) {
    case 'accelerating':
      interpretation += 'showing strong growth ';
      break;
    case 'decelerating':
      interpretation += 'showing significant decline ';
      break;
    case 'stable':
      interpretation += 'remaining stable ';
      break;
  }

  // Add GDP relationship
  const expectedGDP = PERMIT_GDP_BANDS.find(band => 
    Math.abs(band.permits - permits) < 100
  )?.gdp ?? gdpGrowth;

  const gdpDivergence = Math.abs(gdpGrowth - expectedGDP);
  
  if (gdpDivergence > 2) {
    interpretation += `with notable divergence from GDP growth (${gdpGrowth.toFixed(1)}% vs expected ${expectedGDP.toFixed(1)}%). `;
  } else {
    interpretation += `aligning with current GDP growth of ${gdpGrowth.toFixed(1)}%. `;
  }

  // Add bias implication
  interpretation += `This suggests ${strength} ${bias}ary pressure`;

  // Add additional context for extreme scores
  if (Math.abs(score) >= 8) {
    interpretation += ' with potential for significant economic impact';
  }

  return interpretation;
}

function calculateDistributionStats(
  value: number,
  historicalValues: number[]
): DistributionStats {
  if (historicalValues.length === 0) {
    return {
      mean: value,
      standardDeviation: 0,
      zScore: 0,
      percentile: 50
    };
  }

  const mean = historicalValues.reduce((a, b) => a + b, 0) / historicalValues.length;
  const variance = historicalValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / historicalValues.length;
  const standardDeviation = Math.sqrt(variance);
  const zScore = (value - mean) / standardDeviation;
  const percentile = calculatePercentile(zScore);

  return {
    mean,
    standardDeviation,
    zScore,
    percentile
  };
}

function calculatePercentile(zScore: number): number {
  // Using error function approximation for normal distribution
  const erf = (x: number): number => {
    const t = 1.0 / (1.0 + 0.5 * Math.abs(x));
    const tau = t * Math.exp(-x * x - 1.26551223 +
                            t * (1.00002368 +
                            t * (0.37409196 +
                            t * (0.09678418 +
                            t * (-0.18628806 +
                            t * (0.27886807 +
                            t * (-1.13520398 +
                            t * (1.48851587 +
                            t * (-0.82215223 +
                            t * 0.17087277)))))))))
    return x >= 0 ? 1 - tau : tau - 1;
  };

  return (1 + erf(zScore / Math.sqrt(2))) * 50;
}