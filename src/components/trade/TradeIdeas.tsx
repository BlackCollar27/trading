import React, { useState } from 'react';
import { Lightbulb, Filter, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import type { TradeIdea } from '../../types/trade';

interface TradeIdeasProps {
  ideas: TradeIdea[];
}

export default function TradeIdeas({ ideas }: TradeIdeasProps) {
  const [filter, setFilter] = useState<TradeIdea['type']>('Currency');

  const filteredIdeas = ideas.filter(idea => idea.type === filter);

  const getConvictionColor = (conviction: number) => {
    if (conviction >= 8) return 'text-green-500';
    if (conviction >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return 'text-green-500';
    if (risk <= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold">Trade Ideas</h2>
        </div>
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as TradeIdea['type'])}
            className="bg-dark-accent border-gray-800 text-gray-200 rounded-none focus:border-red-900 focus:ring-red-900"
          >
            <option value="Currency">Currency</option>
            <option value="Industry">Industry</option>
            <option value="Stock">Stock</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="bg-dark-accent p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="font-bold text-gray-200">{idea.name}</h3>
                  <p className="text-sm text-gray-400">{idea.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                <span className={`text-sm font-bold ${getConvictionColor(idea.conviction)}`}>
                  Conviction: {idea.conviction}/10
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-300">Long {idea.longPosition.name}</span>
                </div>
                <div className="space-y-2">
                  {idea.longPosition.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-dark-surface p-2">
                      <span className="text-sm text-gray-400">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-200">{metric.value}</span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-300">Short {idea.shortPosition.name}</span>
                </div>
                <div className="space-y-2">
                  {idea.shortPosition.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-dark-surface p-2">
                      <span className="text-sm text-gray-400">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-200">{metric.value}</span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-dark-surface p-2">
                <span className="text-xs text-gray-400">Expected Return</span>
                <p className="text-lg font-semibold text-gray-200">
                  {idea.expectedReturn.toFixed(1)}%
                </p>
              </div>
              <div className="bg-dark-surface p-2">
                <span className="text-xs text-gray-400">Risk Score</span>
                <p className={`text-lg font-semibold ${getRiskColor(idea.riskScore)}`}>
                  {idea.riskScore.toFixed(1)}
                </p>
              </div>
              <div className="bg-dark-surface p-2">
                <span className="text-xs text-gray-400">Timeframe</span>
                <p className="text-lg font-semibold text-gray-200">{idea.timeframe}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Catalysts</h4>
                <div className="flex flex-wrap gap-2">
                  {idea.catalysts.map((catalyst, idx) => (
                    <span key={idx} className="text-xs bg-dark-surface px-2 py-1 text-gray-300">
                      {catalyst}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Signals</h4>
                <div className="space-y-2">
                  {idea.signals.map((signal, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-dark-surface p-2">
                      <span className={`text-xs px-2 py-1 ${
                        signal.type === 'bullish' ? 'bg-green-900/20 text-green-500' :
                        signal.type === 'bearish' ? 'bg-red-900/20 text-red-500' :
                        'bg-gray-900/20 text-gray-500'
                      }`}>
                        {signal.name}
                      </span>
                      <p className="text-sm text-gray-300">{signal.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}