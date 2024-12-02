import React from 'react';
import { LineChart } from 'lucide-react';
import type { Stock } from '../../types/stock';

interface TopStocksProps {
  stocks: Stock[];
}

export default function TopStocks({ stocks }: TopStocksProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChart className="w-4 h-4 text-red-500" />
        <h4 className="text-sm font-medium text-gray-300">Top Stocks</h4>
      </div>

      <div className="space-y-2">
        {stocks.slice(0, 3).map((stock) => (
          <div key={stock.symbol} className="bg-dark-accent p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-gray-200">{stock.symbol}</span>
                <p className="text-xs text-gray-400">{stock.name}</p>
              </div>
              <span className={`text-sm font-medium ${
                stock.score >= 7 ? 'text-green-500' :
                stock.score >= 4 ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {stock.score.toFixed(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500">P/E Ratio</span>
                <p className="text-sm font-medium text-gray-200">{stock.peRatio.toFixed(1)}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">PEG Ratio</span>
                <p className="text-sm font-medium text-gray-200">{stock.pegRatio.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}