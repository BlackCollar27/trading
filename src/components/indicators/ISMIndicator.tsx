import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, LineChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { analyzeISM } from '../../utils/ismAnalysis';
import { getScoreColor, getBiasColor } from '../../utils/economicAnalysis';
import IndicatorDetails from './IndicatorDetails';

interface ISMIndicatorProps {
  currentValue: number;
  previousValue: number;
  historicalValues?: number[];
  newOrders?: {
    current: number;
    previous: number;
  };
}

export default function ISMIndicator({
  currentValue,
  previousValue,
  historicalValues = [],
  newOrders
}: ISMIndicatorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const analysis = analyzeISM(currentValue, previousValue, historicalValues, newOrders);
  const trend = currentValue > previousValue ? 'growing' : 'slowing';

  const signals = [
    {
      type: trend === 'growing' ? 'positive' : 'negative' as const,
      message: `Manufacturing sector ${trend} - ${Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1)}% change`
    },
    {
      type: analysis.bias === 'inflation' ? 'positive' : 'negative' as const,
      message: `${analysis.biasStrength.charAt(0).toUpperCase() + analysis.biasStrength.slice(1)} ${analysis.bias}ary pressure detected`
    }
  ];

  if (newOrders) {
    const newOrdersTrend = newOrders.current > newOrders.previous ? 'increasing' : 'decreasing';
    signals.push({
      type: newOrdersTrend === 'increasing' ? 'positive' : 'negative' as const,
      message: `New orders ${newOrdersTrend} - leading indicator for future ISM readings`
    });
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">ISM Manufacturing</h3>
          <p className="text-sm text-gray-400">Manufacturing Sector Activity</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-dark-accent p-3 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Current</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-200">{currentValue.toFixed(1)}</span>
              {trend === 'growing' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500">prev: {previousValue.toFixed(1)}</span>
        </div>

        {newOrders && (
          <div className="bg-dark-accent p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">New Orders</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-200">{newOrders.current.toFixed(1)}</span>
                {newOrders.current > newOrders.previous ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500">prev: {newOrders.previous.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Economic Bias</span>
          <span className={`text-sm font-medium ${getBiasColor(analysis.bias, analysis.biasStrength)}`}>
            {analysis.bias.toUpperCase()} • {analysis.biasStrength.toUpperCase()}
          </span>
        </div>

        {!analysis.isFirstChange && historicalValues.length >= 3 && (
          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <AlertTriangle className="w-4 h-4" />
            <span>Trend Confirmation Required</span>
          </div>
        )}

        <div className="bg-dark-accent p-3 rounded-xl">
          <p className="text-sm text-gray-300">{analysis.interpretation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-dark-accent p-3 rounded-xl">
            <LineChart className="w-4 h-4 text-gray-400 mb-1" />
            <span className="text-gray-400">GDP Correlation</span>
            <p className="font-medium text-gray-200">85%</p>
            <span className="text-xs text-gray-500">12-month lag</span>
          </div>
          <div className="bg-dark-accent p-3 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-gray-400 mb-1" />
            <span className="text-gray-400">Trend Status</span>
            <p className="font-medium text-gray-200">
              {historicalValues.length >= 3 ? `${historicalValues.length} readings` : 'Insufficient data'}
            </p>
          </div>
        </div>

        <IndicatorDetails
          isOpen={isDetailsOpen}
          onToggle={() => setIsDetailsOpen(!isDetailsOpen)}
          name="ISM Manufacturing"
          code="ISM"
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
          historicalContext="ISM Manufacturing Index above 50 indicates expansion, below 50 indicates contraction. Changes in momentum provide important signals for economic cycles."
          signals={signals}
        />
      </div>
    </div>
  );
}