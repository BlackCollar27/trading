import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Zap, ChevronDown, ChevronUp, Bell, Eye, Target } from 'lucide-react';
import type { SpreadTrade as SpreadTradeType } from '../../types/stock';

interface SpreadTradeProps {
  trade: SpreadTradeType;
}

export default function SpreadTrade({ trade }: SpreadTradeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return 'text-green-500';
    if (risk <= 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSetupDetails = () => {
    const setupTypes = {
      'Cross-Sector': {
        setup: 'Sector rotation play capitalizing on relative strength divergence',
        entry: 'Enter when relative strength spread reaches 2 standard deviations',
        exit: 'Exit when spread normalizes or hits target return',
        timeframe: '1-3 months holding period',
        risk: 'Limited market and stock-specific risk due to sector hedge'
      },
      'Cross-Sector-Constituent': {
        setup: 'Individual stock vs sector arbitrage opportunity',
        entry: 'Enter on significant stock-sector performance deviation',
        exit: 'Exit on convergence or fundamental catalyst',
        timeframe: '1-2 months holding period',
        risk: 'Moderate stock-specific risk with sector hedge'
      },
      'Intra-Sector': {
        setup: 'Pair trade between sector constituents',
        entry: 'Enter on relative valuation disparity',
        exit: 'Exit on valuation convergence',
        timeframe: '2-4 weeks holding period',
        risk: 'Higher stock-specific risk, minimal sector/market risk'
      }
    }[trade.type];

    return setupTypes || setupTypes['Cross-Sector'];
  };

  return (
    <div className="bg-dark-surface border border-gray-800 hover:border-red-900 transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="font-medium text-gray-200">{trade.type}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Sharpe:</span>
            <span className="font-medium text-gray-200">{trade.sharpeRatio.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-300">Long Position</span>
            </div>
            <div className="bg-dark-accent p-3">
              <p className="font-medium text-green-500">{trade.longPosition.name}</p>
              <p className="text-sm text-green-600/70">{trade.longPosition.sector}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-300">Short Position</span>
            </div>
            <div className="bg-dark-accent p-3">
              <p className="font-medium text-red-500">{trade.shortPosition.name}</p>
              <p className="text-sm text-red-600/70">{trade.shortPosition.sector}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-dark-accent p-2">
            <span className="text-xs text-gray-400">Risk Score</span>
            <p className={`text-lg font-semibold ${getRiskColor(trade.riskScore)}`}>
              {trade.riskScore.toFixed(1)}
            </p>
          </div>
          <div className="bg-dark-accent p-2">
            <span className="text-xs text-gray-400">Exp. Return</span>
            <p className="text-lg font-semibold text-gray-200">
              {trade.expectedReturn.toFixed(1)}%
            </p>
          </div>
          <div className="bg-dark-accent p-2">
            <span className="text-xs text-gray-400">Sharpe Ratio</span>
            <p className="text-lg font-semibold text-gray-200">
              {trade.sharpeRatio.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Details
              </>
            )}
          </button>
          <div className="flex gap-2">
            <button className="btn-secondary px-3 py-1.5 text-sm flex items-center gap-1">
              <Bell className="w-4 h-4" />
              Set Alert
            </button>
            <button className="btn-primary px-3 py-1.5 text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" />
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-800 p-4 bg-dark-accent space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              Trade Setup
            </h4>
            <p className="text-sm text-gray-300">{getSetupDetails().setup}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Entry Strategy</h4>
              <p className="text-sm text-gray-300">{getSetupDetails().entry}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Exit Strategy</h4>
              <p className="text-sm text-gray-300">{getSetupDetails().exit}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Time Horizon</h4>
              <p className="text-sm text-gray-300">{getSetupDetails().timeframe}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Risk Profile</h4>
              <p className="text-sm text-gray-300">{getSetupDetails().risk}</p>
            </div>
          </div>

          {trade.longPosition.metrics && (
            <div>
              <h4 className="text-xs font-medium text-gray-400 mb-2">Key Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-xs text-gray-400">Long Position</h5>
                  {trade.longPosition.metrics.map((metric, index) => (
                    <div key={index} className="flex justify-between text-sm bg-dark-surface p-2">
                      <span className="text-gray-400">{metric.name}</span>
                      <span className="text-gray-200">{metric.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h5 className="text-xs text-gray-400">Short Position</h5>
                  {trade.shortPosition.metrics.map((metric, index) => (
                    <div key={index} className="flex justify-between text-sm bg-dark-surface p-2">
                      <span className="text-gray-400">{metric.name}</span>
                      <span className="text-gray-200">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}