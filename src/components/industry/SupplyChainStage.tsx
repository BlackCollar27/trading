import React from 'react';
import { ChevronDown, ChevronUp, Minus } from 'lucide-react';
import type { SupplyChainStage as StageType } from '../../types/industry';
import TradeStats from './TradeStats';
import TopStocks from './TopStocks';

interface SupplyChainStageProps {
  stage: StageType;
}

export default function SupplyChainStage({ stage }: SupplyChainStageProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ChevronUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ChevronDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{stage.name}</h3>
          <p className="text-sm text-gray-400">{stage.description}</p>
        </div>
        <span className={`text-lg font-bold ${getScoreColor(stage.score)}`}>
          {stage.score.toFixed(1)}
        </span>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          {stage.metrics.map((metric) => (
            <div
              key={metric.code}
              className="flex items-center justify-between p-3 bg-dark-accent rounded-xl"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">
                  {metric.name}
                </span>
                <span className="text-xs text-gray-400">{metric.code}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-200">{metric.value}</span>
                  <span className="text-xs text-gray-500">
                    prev: {metric.previousValue}
                  </span>
                </div>
                {getTrendIcon(metric.trend)}
                <span className={`text-sm font-medium ${getScoreColor(metric.score)}`}>
                  {metric.score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <TradeStats stats={stage.tradeStats} />
        <TopStocks stocks={stage.topStocks} />
      </div>
    </div>
  );
}