import React from 'react';
import { Briefcase, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import type { Position } from '../../types/portfolio';

interface PortfolioPositionsProps {
  positions: Position[];
}

export default function PortfolioPositions({ positions }: PortfolioPositionsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold">Current Positions</h2>
        </div>
        <span className="text-sm text-gray-400">
          {positions.length} Active Positions
        </span>
      </div>

      <div className="space-y-4">
        {positions.map((position) => (
          <div key={position.id} className="bg-dark-accent p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {position.type === 'Long' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-200">{position.symbol}</span>
                    <span className="text-sm text-gray-400">{position.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{position.sector}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  {position.pnl >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`font-bold ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {position.pnlPercentage.toFixed(2)}%
                  </span>
                </div>
                <span className={`text-sm ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(position.pnl)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Entry Price</span>
                <p className="font-medium text-gray-200">{formatCurrency(position.entryPrice)}</p>
              </div>
              <div>
                <span className="text-gray-400">Current Price</span>
                <p className="font-medium text-gray-200">{formatCurrency(position.currentPrice)}</p>
              </div>
              <div>
                <span className="text-gray-400">Quantity</span>
                <p className="font-medium text-gray-200">{position.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}