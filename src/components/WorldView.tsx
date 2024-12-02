import React from 'react';
import { Globe, Gauge, AlertTriangle } from 'lucide-react';
import ISMIndicator from './indicators/ISMIndicator';
import NMIIndicator from './indicators/NMIIndicator';
import UMCSIIndicator from './indicators/UMCSIIndicator';
import BuildingPermitsIndicator from './indicators/BuildingPermitsIndicator';
import type { WorldViewData } from '../types/indicators';
import { calculateCountryScore } from '../utils/scoring';

interface WorldViewProps {
  data: WorldViewData;
}

export default function WorldView({ data }: WorldViewProps) {
  const countryScore = calculateCountryScore(data);

  // Find specific indicators
  const ismIndicator = data.groups
    .find(g => g.name === 'Leading Indicators Surveys')
    ?.indicators.find(i => i.code === 'ISM');

  const nmiIndicator = data.groups
    .find(g => g.name === 'Leading Indicators Surveys')
    ?.indicators.find(i => i.code === 'NMI');

  const umcsiIndicator = data.groups
    .find(g => g.name === 'Leading Indicators Surveys')
    ?.indicators.find(i => i.code === 'UMCSI');

  const permitsIndicator = data.groups
    .find(g => g.name === 'Leading Indicators Surveys')
    ?.indicators.find(i => i.code === 'BP');

  const gdpIndicator = data.groups
    .find(g => g.name === 'Economic Growth')
    ?.indicators.find(i => i.code === 'GDP');

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-200">World View</h2>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            <span className="text-2xl font-bold px-3 py-1 rounded-full bg-dark-accent">
              {countryScore.totalScore.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="glass-panel p-4 bg-dark-accent rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-gray-300">Economic Outlook</h3>
          </div>
          <p className="text-sm text-gray-400">{countryScore.bias.outlook}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {ismIndicator && (
          <ISMIndicator
            currentValue={ismIndicator.value}
            previousValue={ismIndicator.previousValue || 0}
          />
        )}

        {nmiIndicator && (
          <NMIIndicator
            currentValue={nmiIndicator.value}
            previousValue={nmiIndicator.previousValue || 0}
          />
        )}

        {umcsiIndicator && gdpIndicator && (
          <UMCSIIndicator
            currentValue={umcsiIndicator.value}
            previousValue={umcsiIndicator.previousValue || 0}
            gdpGrowth={gdpIndicator.value}
          />
        )}

        {permitsIndicator && gdpIndicator && (
          <BuildingPermitsIndicator
            currentValue={permitsIndicator.value}
            previousValue={permitsIndicator.previousValue || 0}
            gdpGrowth={gdpIndicator.value}
          />
        )}
      </div>
    </div>
  );
}