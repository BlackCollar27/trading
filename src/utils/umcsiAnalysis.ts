import type { EconomicIndicatorAnalysis, DistributionStats } from '../types/analysis';

interface UMCSIBand {
  min: number;
  max: number;
  baseScore: number;
  gdpMultiplier: number;
}

const UMCSI_BANDS: UMCSIBand[] = [
  { min: 100, max: 105, baseScore: 10, gdpMultiplier: 1.5 },
  { min: 95, max: 99.9, baseScore: 9, gdpMultiplier: 1.4 },
  { min: 90, max: 94.9, baseScore: 8, gdpMultiplier: 1.3 },
  { min: 85, max: 89.9, baseScore: 7, gdpMultiplier: 1.2 },
  { min: 80, max: 84.9, baseScore: 6, gdpMultiplier: 1.1 },
  { min: 75, max: 79.9, baseScore: 5, gdpMultiplier: 1.0 },
  { min: 70, max: 74.9, baseScore: 4, gdpMultiplier: 0.9 },
  { min: 65, max: 69.9, baseScore: 3, gdpMultiplier: 0.8 },
  { min: 60, max: 64.9, baseScore: 2, gdpMultiplier: 0.7 },
  { min: 55, max: 59.9, baseScore: 1, gdpMultiplier: 0.6 },
  { min: 0, max: 54.9, baseScore: 0, gdpMultiplier: 0.5 }
];

export function analyzeUMCSI(
  currentValue: number,
  previousValue: number,
  gdpGrowth: number,
  historicalValues: number[] = []
): EconomicIndicatorAnalysis {
  const distribution = calculateDistributionStats(currentValue, historicalValues);
  const band = findUMCSIBand(currentValue);
  
  // Calculate base score from UMCSI value
  let score = band.baseScore;
  
  // Adjust score based on GDP growth relationship
  const gdpAdjustment = calculateGDPAdjustment(gdpGrowth, band.gdpMultiplier);
  score += gdpAdjustment;

  // Calculate momentum effect
  const momentumAdjustment = calculateMomentumAdjustment(currentValue, previousValue);
  score += momentumAdjustment;

  // Normalize final score to -10 to +10 range
  score = normalizeScore(score);

  const { bias, strength } = determineBiasAndStrength(score, gdpGrowth, currentValue);
  
  return {
    currentValue,
    previousValue,
    distribution,
    bias: {
      type: bias,
      strength,
      score
    },
    interpretation: generateInterpretation(currentValue, gdpGrowth, score, bias, strength)
  };
}

function findUMCSIBand(value: number): UMCSIBand {
  return UMCSI_BANDS.find(band => value >= band.min && value <= band.max) || UMCSI_BANDS[UMCSI_BANDS.length - 1];
}

function calculateGDPAdjustment(gdpGrowth: number, multiplier: number): number {
  // GDP growth contribution
  if (gdpGrowth >= 3) return 2 * multiplier;
  if (gdpGrowth >= 2) return 1.5 * multiplier;
  if (gdpGrowth >= 1) return 1 * multiplier;
  if (gdpGrowth >= 0) return 0.5 * multiplier;
  if (gdpGrowth >= -1) return -0.5 * multiplier;
  if (gdpGrowth >= -2) return -1 * multiplier;
  return -2 * multiplier;
}

function calculateMomentumAdjustment(current: number, previous: number): number {
  const change = ((current - previous) / previous) * 100;
  
  if (change >= 5) return 2;  // Strong positive momentum
  if (change >= 2) return 1;  // Moderate positive momentum
  if (change <= -5) return -2; // Strong negative momentum
  if (change <= -2) return -1; // Moderate negative momentum
  return 0; // Neutral momentum
}

function normalizeScore(score: number): number {
  // Convert 0-20 scale to -10 to +10 scale
  return Math.max(Math.min((score - 10) * 1.5, 10), -10);
}

function determineBiasAndStrength(
  score: number,
  gdpGrowth: number,
  umcsi: number
): { bias: 'inflation' | 'deflation' | 'neutral', strength: 'strong' | 'moderate' | 'weak' } {
  const absScore = Math.abs(score);
  
  // Determine bias
  let bias: 'inflation' | 'deflation' | 'neutral';
  if (score > 0) {
    bias = 'inflation';
  } else if (score < 0) {
    bias = 'deflation';
  } else {
    bias = 'neutral';
  }

  // Determine strength
  let strength: 'strong' | 'moderate' | 'weak';
  if (absScore >= 7) {
    strength = 'strong';
  } else if (absScore >= 4) {
    strength = 'moderate';
  } else {
    strength = 'weak';
  }

  // Special case: GDP and UMCSI divergence
  if (gdpGrowth >= 2 && umcsi < 65) {
    bias = 'inflation';
    strength = 'moderate';
  } else if (gdpGrowth <= -1 && umcsi > 85) {
    bias = 'deflation';
    strength = 'moderate';
  }

  return { bias, strength };
}

function generateInterpretation(
  umcsi: number,
  gdpGrowth: number,
  score: number,
  bias: 'inflation' | 'deflation' | 'neutral',
  strength: 'strong' | 'moderate' | 'weak'
): string {
  let interpretation = '';

  // Base sentiment description
  if (umcsi >= 90) {
    interpretation = 'Consumer sentiment is exceptionally strong';
  } else if (umcsi >= 80) {
    interpretation = 'Consumer sentiment is robust';
  } else if (umcsi >= 70) {
    interpretation = 'Consumer sentiment is moderate';
  } else if (umcsi >= 60) {
    interpretation = 'Consumer sentiment is weak';
  } else {
    interpretation = 'Consumer sentiment is very weak';
  }

  // GDP relationship
  if (Math.abs(gdpGrowth - (umcsi - 50) / 5) > 2) {
    interpretation += ', showing significant divergence from GDP growth';
  }

  // Bias implication
  interpretation += `. This suggests ${strength} ${bias}ary pressure`;

  // Additional context based on score
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