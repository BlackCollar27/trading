import React from 'react';
import { Shield, AlertTriangle, Briefcase, Target, Clock } from 'lucide-react';

interface RiskMetric {
  name: string;
  status: 'good' | 'warning' | 'danger';
  value: string;
  target: string;
}

export default function DisciplinePanel() {
  const portfolioMetrics = {
    currentPositions: 8,
    targetPositions: '11-15',
    averageHolding: '45 days',
    currentDrawdown: -2.8,
    maxDrawdown: -5.0,
    sectorExposure: 15.2,
  };

  const riskMetrics: RiskMetric[] = [
    { 
      name: 'Position Size', 
      status: 'good', 
      value: '2.5% per trade',
      target: 'Max 5%'
    },
    { 
      name: 'Portfolio Beta', 
      status: 'good', 
      value: '0.12',
      target: '< 0.2'
    },
    { 
      name: 'Sector Exposure', 
      status: 'warning', 
      value: '15.2% Tech',
      target: 'Max 20%'
    },
    { 
      name: 'Current Drawdown', 
      status: portfolioMetrics.currentDrawdown > portfolioMetrics.maxDrawdown ? 'danger' : 'good',
      value: `${portfolioMetrics.currentDrawdown}%`,
      target: `Max ${portfolioMetrics.maxDrawdown}%`
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-900/20 text-green-400';
      case 'warning':
        return 'bg-yellow-900/20 text-yellow-400';
      case 'danger':
        return 'bg-red-900/20 text-red-400';
      default:
        return 'bg-gray-900/20 text-gray-400';
    }
  };

  return (
    <div className="bg-dark-surface border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-red-500" />
        <h2 className="text-xl font-bold uppercase tracking-wider">Portfolio Discipline</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span className="text-sm uppercase tracking-wider text-gray-400">Portfolio Size</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{portfolioMetrics.currentPositions}</span>
            <span className="text-sm text-gray-500">Target: {portfolioMetrics.targetPositions}</span>
          </div>
        </div>

        <div className="bg-dark-accent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm uppercase tracking-wider text-gray-400">Avg Holding</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{portfolioMetrics.averageHolding}</span>
            <span className="text-sm text-gray-500">Target: 1-3m</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-dark-accent">
            <div className="flex items-center gap-2">
              {metric.status === 'danger' && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-medium text-gray-300">{metric.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Target: {metric.target}</span>
              <span className={`status-badge ${getStatusColor(metric.status)}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark-accent p-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-red-500" />
          <h3 className="font-semibold uppercase tracking-wider">Portfolio Rules</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Maintain 11-15 active positions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Target 1-3 month holding period
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Maximum sector exposure 20%
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Portfolio beta target &lt; 0.2
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Stop loss at -5% portfolio drawdown
          </li>
        </ul>
      </div>
    </div>
  );
}