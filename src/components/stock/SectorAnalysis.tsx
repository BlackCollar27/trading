import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { SectorData } from '../../types/stock';

interface SectorAnalysisProps {
  sector: SectorData;
}

export default function SectorAnalysis({ sector }: SectorAnalysisProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{sector.name}</h3>
          <span className="text-sm px-2 py-1 rounded-full bg-gray-100">
            {sector.type}
          </span>
        </div>
        <span className={`text-lg font-bold ${getScoreColor(sector.score)}`}>
          {sector.score.toFixed(1)}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">P/E Ratio</span>
          <p className="text-lg font-semibold">{sector.peRatio.toFixed(1)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">PEG Ratio</span>
          <p className="text-lg font-semibold">{sector.pegRatio.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">Rel. Strength</span>
          <p className="text-lg font-semibold">{sector.relativeStrength.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Top Constituents</h4>
        {sector.topStocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{stock.symbol}</span>
              <span className="text-xs text-gray-500">{stock.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">P/E: {stock.peRatio.toFixed(1)}</span>
              <span className="text-sm">PEG: {stock.pegRatio.toFixed(2)}</span>
              <span className={`text-sm font-medium ${getScoreColor(stock.score)}`}>
                {stock.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}