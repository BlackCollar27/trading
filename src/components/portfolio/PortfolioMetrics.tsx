import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity } from 'lucide-react';
import type { PortfolioMetrics as Metrics } from '../../types/portfolio';

interface PortfolioMetricsProps {
  metrics: Metrics;
}

export default function PortfolioMetrics({ metrics }: PortfolioMetricsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-red-500" />
        Portfolio Overview
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Portfolio Value</span>
          </div>
          <span className="text-2xl font-bold text-gray-200">
            {formatCurrency(metrics.totalValue)}
          </span>
        </div>

        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Monthly Return</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-200">
              {metrics.monthlyReturn.toFixed(1)}%
            </span>
            {metrics.monthlyReturn > metrics.previousMonthReturn ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </div>
          <span className="text-sm text-gray-500">
            prev: {metrics.previousMonthReturn.toFixed(1)}%
          </span>
        </div>

        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Net Exposure</span>
          </div>
          <span className="text-2xl font-bold text-gray-200">
            {metrics.netExposure.toFixed(1)}%
          </span>
          <div className="text-sm text-gray-500">
            L: {metrics.longExposure.toFixed(1)}% | S: {metrics.shortExposure.toFixed(1)}%
          </div>
        </div>

        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Risk Metrics</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Beta:</span>
              <span className="text-sm font-medium text-gray-200">{metrics.beta.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Sharpe:</span>
              <span className="text-sm font-medium text-gray-200">{metrics.sharpeRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}