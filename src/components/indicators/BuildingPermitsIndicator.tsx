import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Home } from 'lucide-react';
import { analyzeBuildingPermits } from '../../utils/buildingPermitsAnalysis';
import { getScoreColor, getBiasColor } from '../../utils/economicAnalysis';
import IndicatorDetails from './IndicatorDetails';

interface BuildingPermitsIndicatorProps {
  currentValue: number;
  previousValue: number;
  gdpGrowth: number;
  historicalValues?: number[];
}

export default function BuildingPermitsIndicator({
  currentValue,
  previousValue,
  gdpGrowth,
  historicalValues = []
}: BuildingPermitsIndicatorProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const analysis = analyzeBuildingPermits(currentValue, previousValue, gdpGrowth, historicalValues);
  const trend = currentValue > previousValue ? 'up' : 'down';

  const signals = [
    {
      type: trend === 'up' ? 'positive' : 'negative' as const,
      message: `Building permits ${trend === 'up' ? 'increased' : 'decreased'} by ${Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1)}% from previous period`
    },
    {
      type: analysis.bias.type === 'inflation' ? 'positive' : 'negative' as const,
      message: `${analysis.bias.strength.charAt(0).toUpperCase() + analysis.bias.strength.slice(1)} ${analysis.bias.type}ary pressure detected`
    }
  ];

  if (Math.abs(gdpGrowth - (currentValue / 200)) > 2) {
    signals.push({
      type: 'neutral',
      message: `Significant divergence from GDP growth trend detected (${gdpGrowth.toFixed(1)}% vs expected)`
    });
  }

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">Building Permits</h3>
          <p className="text-sm text-gray-400">Housing Market Indicator</p>
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
          <span className="text-sm text-gray-400">Current (K)</span>
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

        {Math.abs(gdpGrowth - (currentValue / 200)) > 2 && (
          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <AlertTriangle className="w-4 h-4" />
            <span>GDP-Permits Divergence Detected</span>
          </div>
        )}

        <div className="bg-dark-accent p-3">
          <p className="text-sm text-gray-300">{analysis.interpretation}</p>
        </div>

        <IndicatorDetails
          isOpen={isDetailsOpen}
          onToggle={() => setIsDetailsOpen(!isDetailsOpen)}
          name="Building Permits"
          code="PERMITS"
          currentValue={currentValue}
          previousValue={previousValue}
          score={analysis.bias.score}
          distribution={analysis.distribution}
          interpretation={analysis.interpretation}
          historicalContext="Building permits are a leading indicator of future construction activity and economic growth."
          signals={signals}
        />
      </div>
    </div>
  );
}