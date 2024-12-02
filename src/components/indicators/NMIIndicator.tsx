import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { analyzeNMI } from '../../utils/economicAnalysis';
import { getScoreColor, getBiasColor } from '../../utils/economicAnalysis';
import IndicatorDetails from './IndicatorDetails';

interface NMIIndicatorProps {
  currentValue: number;
  previousValue: number;
  historicalValues?: number[];
}

export default function NMIIndicator({
  currentValue,
  previousValue,
  historicalValues = []
}: NMIIndicatorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const analysis = analyzeNMI(currentValue, previousValue, historicalValues);
  const trend = currentValue > previousValue ? 'growing' : 'slowing';

  const signals = [
    {
      type: trend === 'growing' ? 'positive' : 'negative' as const,
      message: `Services sector ${trend} - ${Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1)}% change`
    },
    {
      type: analysis.bias === 'inflation' ? 'positive' : 'negative' as const,
      message: `${analysis.biasStrength.charAt(0).toUpperCase() + analysis.biasStrength.slice(1)} ${analysis.bias}ary pressure detected`
    }
  ];

  if (analysis.isFirstChange) {
    signals.push({
      type: 'neutral',
      message: `First ${trend} period detected - potential trend reversal signal`
    });
  }

  if (Math.abs(currentValue - 50) > 5) {
    signals.push({
      type: currentValue > 50 ? 'positive' : 'negative' as const,
      message: `Strong ${currentValue > 50 ? 'expansion' : 'contraction'} signal (${Math.abs(currentValue - 50).toFixed(1)} points from neutral)`
    });
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">NMI Services</h3>
          <p className="text-sm text-gray-400">Services Sector Activity</p>
        </div>
        <div className="flex items-center gap-2">
          {trend === 'growing' ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-xl font-bold ${getScoreColor(analysis.score)}`}>
            {analysis.score.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-dark-accent p-3">
          <span className="text-sm text-gray-400">Current</span>
          <p className="text-lg font-semibold text-gray-200">{currentValue.toFixed(1)}</p>
          <span className="text-xs text-gray-500">prev: {previousValue.toFixed(1)}</span>
        </div>
        <div className="bg-dark-accent p-3">
          <span className="text-sm text-gray-400">Status</span>
          <p className="text-lg font-semibold text-gray-200">
            {currentValue >= 50 ? 'Expanding' : 'Contracting'}
          </p>
          <span className="text-xs text-gray-500">
            {Math.abs(currentValue - 50).toFixed(1)} points from neutral
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Economic Bias</span>
          <span className={`text-sm font-medium ${getBiasColor(analysis.bias, analysis.biasStrength)}`}>
            {analysis.bias.toUpperCase()} • {analysis.biasStrength.toUpperCase()}
          </span>
        </div>

        {analysis.isFirstChange && (
          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <AlertTriangle className="w-4 h-4" />
            <span>Trend Reversal Signal</span>
          </div>
        )}

        <div className="bg-dark-accent p-3">
          <p className="text-sm text-gray-300">{analysis.interpretation}</p>
        </div>

        <IndicatorDetails
          isOpen={isDetailsOpen}
          onToggle={() => setIsDetailsOpen(!isDetailsOpen)}
          name="NMI Services"
          code="NMI"
          currentValue={currentValue}
          previousValue={previousValue}
          score={analysis.score}
          distribution={{
            mean: 50,
            standardDeviation: 5,
            zScore: (currentValue - 50) / 5,
            percentile: ((currentValue - 30) / 40) * 100
          }}
          interpretation={analysis.interpretation}
          historicalContext="NMI Services Index above 50 indicates expansion, below 50 indicates contraction. Services sector typically has higher weight in developed economies."
          signals={signals}
        />
      </div>
    </div>
  );
}