import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { analyzeUMCSI } from '../../utils/umcsiAnalysis';
import { getScoreColor, getBiasColor } from '../../utils/economicAnalysis';

interface UMCSIIndicatorProps {
  currentValue: number;
  previousValue: number;
  gdpGrowth: number;
  historicalValues?: number[];
}

export default function UMCSIIndicator({
  currentValue,
  previousValue,
  gdpGrowth,
  historicalValues = []
}: UMCSIIndicatorProps) {
  const analysis = analyzeUMCSI(currentValue, previousValue, gdpGrowth, historicalValues);
  const trend = currentValue > previousValue ? 'up' : 'down';

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Consumer Sentiment</h3>
          <p className="text-sm text-gray-400">University of Michigan Index</p>
        </div>
        <div className="flex items-center gap-2">
          {trend === 'up' ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-xl font-bold ${getScoreColor(analysis.bias.score)}`}>
            {analysis.bias.score.toFixed(1)}
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
          <span className="text-sm text-gray-400">GDP Growth</span>
          <p className="text-lg font-semibold text-gray-200">{gdpGrowth.toFixed(1)}%</p>
          <span className="text-xs text-gray-500">YoY</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Economic Bias</span>
          <span className={`text-sm font-medium ${getBiasColor(analysis.bias.type, analysis.bias.strength)}`}>
            {analysis.bias.type.toUpperCase()} • {analysis.bias.strength.toUpperCase()}
          </span>
        </div>

        {Math.abs(gdpGrowth - (currentValue - 50) / 5) > 2 && (
          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <AlertTriangle className="w-4 h-4" />
            <span>GDP-Sentiment Divergence Detected</span>
          </div>
        )}

        <div className="bg-dark-accent p-3">
          <p className="text-sm text-gray-300">{analysis.interpretation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Percentile</span>
            <p className="font-medium text-gray-200">
              {analysis.distribution.percentile.toFixed(1)}%
            </p>
          </div>
          <div>
            <span className="text-gray-400">Z-Score</span>
            <p className="font-medium text-gray-200">
              {analysis.distribution.zScore.toFixed(2)}σ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}