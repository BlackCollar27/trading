import React from 'react';
import { LineChart, Gauge } from 'lucide-react';
import type { StockViewData } from '../types/stock';
import SectorAnalysis from './stock/SectorAnalysis';
import SpreadTrade from './stock/SpreadTrade';

interface StockViewProps {
  data: StockViewData;
}

export default function StockView({ data }: StockViewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LineChart className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-200">Stock View</h2>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          <span className="text-2xl font-bold px-3 py-1 rounded-full bg-dark-accent">
            {data.totalScore.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Sector Analysis</h3>
          <div className="grid gap-4">
            {data.sectors.map((sector) => (
              <SectorAnalysis key={sector.name} sector={sector} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Recommended Spread Trades</h3>
          <div className="grid gap-4">
            {data.recommendedTrades.map((trade) => (
              <SpreadTrade key={trade.id} trade={trade} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}