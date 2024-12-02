import type { ISMAnalysis } from '../types/analysis';
import { analyzeISM } from './ismAnalysis';

export function analyzeNMI(
  currentValue: number,
  previousValue: number,
  historicalValues: number[] = []
): ISMAnalysis {
  // NMI follows similar analysis patterns to ISM
  return analyzeISM(currentValue, previousValue, historicalValues);
}