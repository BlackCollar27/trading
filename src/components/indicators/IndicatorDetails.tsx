import React from 'react';
import { ChevronDown, ChevronUp, Info, AlertTriangle, TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import type { DistributionStats } from '../../types/analysis';

interface IndicatorDetailsProps {
  isOpen: boolean;
  onToggle: () => void;
  name: string;
  code: string;
  currentValue: number;
  previousValue: number;
  score: number;
  distribution: DistributionStats;
  interpretation: string;
  historicalContext?: string;
  signals: {
    type: 'positive' | 'negative' | 'neutral';
    message: string;
  }[];
}

export default function IndicatorDetails({
  isOpen,
  onToggle,
  name,
  code,
  currentValue,
  previousValue,
  score,
  distribution,
  interpretation,
  historicalContext,
  signals
}: IndicatorDetailsProps) {
  // Calculate changes
  const momChange = ((currentValue - previousValue) / previousValue) * 100;
  const yoyChange = ((currentValue - distribution.mean) / distribution.mean) * 100;
  const avgMomChange = distribution.standardDeviation;
  const avgYoyChange = Math.abs(yoyChange / 12); // Approximate average yearly change

  return (
    <div className="mt-4 space-y-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-dark-accent transition-colors rounded-xl"
        aria-expanded={isOpen}
        aria-controls={`${code}-details`}
      >
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Info className="w-4 h-4" />
          <span className="font-medium">View Detailed Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{isOpen ? 'Hide' : 'Show'}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div 
          id={`${code}-details`}
          className="space-y-4 p-4 glass-panel animate-fadeIn rounded-xl"
        >
          {/* Statistical Analysis */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-red-500" />
              Statistical Analysis
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-xs text-gray-400">YoY Change</span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-200">
                    {yoyChange.toFixed(1)}%
                  </p>
                  {yoyChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-xs text-gray-400">MoM Change</span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-200">
                    {momChange.toFixed(1)}%
                  </p>
                  {momChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-xs text-gray-400">Avg MoM Change</span>
                <p className="text-sm font-medium text-gray-200">
                  {avgMomChange.toFixed(1)}%
                </p>
              </div>
              <div className="glass-panel p-3 rounded-xl">
                <span className="text-xs text-gray-400">Avg YoY Change</span>
                <p className="text-sm font-medium text-gray-200">
                  {avgYoyChange.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Interpretation */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Interpretation</h4>
            <div className="glass-panel p-3 rounded-xl">
              <p className="text-sm text-gray-300">{interpretation}</p>
              {historicalContext && (
                <p className="text-sm text-gray-400 mt-2">{historicalContext}</p>
              )}
            </div>
          </div>

          {/* Signals */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Key Signals</h4>
            <div className="space-y-2">
              {signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 glass-panel p-3 rounded-xl"
                >
                  {signal.type === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : signal.type === 'negative' ? (
                    <TrendingDown className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm text-gray-300">{signal.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}