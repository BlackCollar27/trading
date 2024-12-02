export { analyzeISM } from './ismAnalysis';
export { analyzeNMI } from './nmiAnalysis';

export function getScoreColor(score: number): string {
  if (score >= 7) return 'text-neutral-50';
  if (score >= 4) return 'text-neutral-100';
  if (score >= 0) return 'text-neutral-200';
  if (score >= -4) return 'text-neutral-300';
  if (score >= -7) return 'text-neutral-400';
  return 'text-neutral-500';
}

export function getBiasColor(bias: 'inflation' | 'deflation' | 'neutral', strength: 'strong' | 'moderate' | 'weak'): string {
  if (bias === 'inflation') {
    return strength === 'strong' ? 'text-neutral-50' :
           strength === 'moderate' ? 'text-neutral-100' : 'text-neutral-200';
  }
  if (bias === 'deflation') {
    return strength === 'strong' ? 'text-neutral-50' :
           strength === 'moderate' ? 'text-neutral-100' : 'text-neutral-200';
  }
  return 'text-neutral-300';
}