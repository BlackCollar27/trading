import React from 'react';
import { ChevronDown, ChevronUp, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import type { Indicator } from '../../types/indicators';
import { analyzeISM, analyzeNMI, getScoreColor, getBiasColor } from '../../utils/economicAnalysis';

interface IndicatorGroupProps {
  name: string;
  indicators: Indicator[];
  groupScore: number;
}

export default function IndicatorGroup({ name, indicators, groupScore }: IndicatorGroupProps) {
  const getIndicatorAnalysis = (indicator: Indicator) => {
    switch (indicator.code) {
      case 'ISM':
        return analyzeISM(indicator.value, indicator.previousValue || 0);
      case 'NMI':
        return analyzeNMI(indicator.value, indicator.previousValue || 0);
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'growing':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
      case 'slowing':
        return <TrendingDown className="w-4 h-4 text-blue-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
        <span className={`font-bold ${getScoreColor(groupScore)}`}>
          {groupScore.toFixed(1)}
        </span>
      </div>
      <div className="space-y-2">
        {indicators.map((indicator) => {
          const analysis = getIndicatorAnalysis(indicator);
          
          return (
            <div
              key={indicator.code}
              className="glass-panel p-3 hover:bg-dark-accent transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    {indicator.name}
                  </span>
                  <span className="text-xs text-gray-400">{indicator.code}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-200">
                      {indicator.value}
                    </span>
                    {indicator.previousValue && (
                      <span className="text-xs text-gray-400">
                        prev: {indicator.previousValue}
                      </span>
                    )}
                  </div>
                  {getTrendIcon(indicator.trend)}
                  <span className={`text-sm font-medium ${getScoreColor(indicator.score)}`}>
                    {indicator.score.toFixed(1)}
                  </span>
                </div>
              </div>

              {analysis && (
                <div className="mt-2 border-t border-[#ffffff08] pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`${getBiasColor(analysis.bias, analysis.biasStrength)}`}>
                      {analysis.bias.toUpperCase()} • {analysis.biasStrength.toUpperCase()}
                    </span>
                    {analysis.isFirstChange && (
                      <span className="text-yellow-500">SIGNAL CHANGE</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {analysis.interpretation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}