import React from 'react';
import { ArrowUpRight, ArrowDownRight, Ship } from 'lucide-react';
import type { TradeStats as TradeStatsType } from '../../types/industry';

interface TradeStatsProps {
  stats: TradeStatsType;
}

export default function TradeStats({ stats }: TradeStatsProps) {
  const formatChange = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Ship className="w-4 h-4 text-red-500" />
        <h4 className="text-sm font-medium text-gray-300">Trade Statistics</h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-accent p-3 rounded-xl">
          <span className="text-sm text-gray-400">Imports</span>
          <div className="mt-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">YoY Change</span>
              <div className="flex items-center gap-1">
                {stats.imports.yoy >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stats.imports.yoy >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatChange(stats.imports.yoy)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">MoM Change</span>
              <div className="flex items-center gap-1">
                {stats.imports.mom >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stats.imports.mom >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatChange(stats.imports.mom)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-700 pt-2">
              <span className="text-xs text-gray-500">Value</span>
              <span className="text-sm font-medium text-gray-200">
                {formatValue(stats.imports.value)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-dark-accent p-3 rounded-xl">
          <span className="text-sm text-gray-400">Exports</span>
          <div className="mt-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">YoY Change</span>
              <div className="flex items-center gap-1">
                {stats.exports.yoy >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stats.exports.yoy >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatChange(stats.exports.yoy)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">MoM Change</span>
              <div className="flex items-center gap-1">
                {stats.exports.mom >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  stats.exports.mom >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatChange(stats.exports.mom)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-700 pt-2">
              <span className="text-xs text-gray-500">Value</span>
              <span className="text-sm font-medium text-gray-200">
                {formatValue(stats.exports.value)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}