import React from 'react';
import { PieChart, Target } from 'lucide-react';
import type { Exposure } from '../../types/portfolio';

interface ExposureChartProps {
  exposures: Exposure[];
}

export default function ExposureChart({ exposures }: ExposureChartProps) {
  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold">Sector Exposure</h2>
        </div>
        <Target className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {exposures.map((exposure) => (
          <div key={exposure.sector} className="bg-dark-accent p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-200">{exposure.sector}</span>
              <span className={`font-bold ${exposure.net >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {exposure.net >= 0 ? '+' : ''}{exposure.net.toFixed(1)}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Long Exposure</span>
                <p className="font-medium text-green-500">+{exposure.long.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-gray-400">Short Exposure</span>
                <p className="font-medium text-red-500">-{exposure.short.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}