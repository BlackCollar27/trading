import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Building2, Globe, Gauge } from 'lucide-react';

interface ScoreCardProps {
  category: 'World' | 'Industry' | 'Sector';
  score: number;
  metrics: {
    name: string;
    value: number;
    trend: 'up' | 'down';
  }[];
}

export default function ScoreCard({ category, score, metrics }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'World':
        return <Globe className="w-6 h-6" />;
      case 'Industry':
        return <Building2 className="w-6 h-6" />;
      case 'Sector':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <h2 className="text-xl font-bold text-gray-800">{category} View</h2>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">{metric.name}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{metric.value}</span>
              {metric.trend === 'up' ? (
                <ArrowUpCircle className="w-5 h-5 text-red-500" />
              ) : (
                <ArrowDownCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}