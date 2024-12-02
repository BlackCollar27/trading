import React from 'react';
import { Factory, TrendingUp } from 'lucide-react';
import type { IndustryViewData } from '../types/industry';
import SupplyChainStage from './industry/SupplyChainStage';

interface IndustryViewProps {
  data: IndustryViewData;
}

export default function IndustryView({ data }: IndustryViewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Factory className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-200">Industry View</h2>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <span className="text-2xl font-bold px-3 py-1 rounded-full bg-dark-accent">
            {data.totalScore.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {data.stages.map((stage) => (
          <SupplyChainStage
            key={stage.name}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}