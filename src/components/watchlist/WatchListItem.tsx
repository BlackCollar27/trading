import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle } from 'lucide-react';
import type { WatchlistItem } from '../../types/watchlist';

interface WatchListItemProps {
  item: WatchlistItem;
}

export default function WatchListItem({ item }: WatchListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-900/20 text-green-400';
      case 'Hold':
        return 'bg-yellow-900/20 text-yellow-400';
      default:
        return 'bg-blue-900/20 text-blue-400';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 3) return 'text-green-400';
    if (risk <= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className={`status-badge ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
          <span className="text-sm text-gray-500">{new Date(item.dateAdded).toLocaleDateString()}</span>
        </div>
        <span className="status-badge bg-dark-accent">
          {item.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            <span className="text-sm uppercase tracking-wider">Long Position</span>
          </div>
          <div className="bg-dark-accent p-3">
            <p className="font-bold text-green-400">{item.longPosition.name}</p>
            <p className="text-sm text-green-600">{item.longPosition.sector}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ArrowDownRight className="w-4 h-4 text-red-500" />
            <span className="text-sm uppercase tracking-wider">Short Position</span>
          </div>
          <div className="bg-dark-accent p-3">
            <p className="font-bold text-red-400">{item.shortPosition.name}</p>
            <p className="text-sm text-red-600">{item.shortPosition.sector}</p>
          </div>
        </div>
      </div>

      <div className="bg-dark-accent p-3 mb-4">
        <p className="text-sm text-gray-400">{item.rationale}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400">Risk Score:</span>
          <span className={`font-bold ${getRiskColor(item.riskScore)}`}>
            {item.riskScore.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400">Expected Return:</span>
          <span className="font-bold text-gray-200">{item.expectedReturn.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}