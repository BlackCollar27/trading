import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import type { Country } from '../../types/country';
import { getBiasColor } from '../../utils/economicAnalysis';
import { CountryScore } from '../../types/analysis';

interface CountryCardProps {
  country: Country;
  score: CountryScore | null;
  isSelected: boolean;
  onSelect: (country: Country) => void;
}

export default function CountryCard({ country, score, isSelected, onSelect }: CountryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMarketTypeColor = (type: Country['marketType']) => {
    switch (type) {
      case 'Developed':
        return 'from-blue-400 to-blue-600';
      case 'Emerging':
        return 'from-yellow-400 to-yellow-600';
      case 'Frontier':
        return 'from-red-400 to-red-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 7) return 'Strong';
    if (score >= 4) return 'Moderate';
    return 'Weak';
  };

  return (
    <div 
      className={`glass-panel p-4 transition-all ${
        isSelected ? 'border-red-500/50 bg-[#ffffff12]' : ''
      }`}
    >
      <button 
        onClick={() => onSelect(country)}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <h3 className="font-medium text-gray-200">{country.name}</h3>
              <span className="text-xs text-gray-400">{country.region}</span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 bg-gradient-to-r ${getMarketTypeColor(country.marketType)} text-white rounded-full`}>
            {country.marketType}
          </span>
        </div>

        {score && (
          <div className="mb-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Economic Score</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-2 py-0.5 rounded ${getScoreColor(score.totalScore)} text-white`}>
                    {score.totalScore.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({getScoreLabel(score.totalScore)})
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-dark-accent rounded-full h-1.5">
                <div 
                  className={`h-full rounded-full ${getScoreColor(score.totalScore)}`}
                  style={{ width: `${(score.totalScore / 10) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <AlertTriangle className="w-3 h-3 text-yellow-500" />
              <span className={`text-xs font-medium ${getBiasColor(score.bias.type, score.bias.strength)}`}>
                {score.bias.type.toUpperCase()} • {score.bias.strength.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
              {score.bias.outlook}
            </p>
          </div>
        )}
      </button>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors pt-2 border-t border-gray-800"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show Details
          </>
        )}
      </button>

      {isExpanded && score && (
        <div className="mt-4 space-y-4 animate-fadeIn">
          {score.categories.map((category) => (
            <div key={category.name} className="bg-dark-accent p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {category.totalScore.toFixed(1)} / {category.maxScore}
                  </span>
                  <div className="w-16 bg-dark-surface rounded-full h-1">
                    <div 
                      className={`h-full rounded-full ${getScoreColor(category.totalScore)}`}
                      style={{ width: `${(category.totalScore / category.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {category.indicators.map((indicator) => (
                  <div key={indicator.code} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{indicator.driver}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300">{indicator.rate}</span>
                      <span className={`${
                        indicator.state === 'Growing' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {indicator.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}