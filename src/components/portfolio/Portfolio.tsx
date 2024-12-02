import React from 'react';
import PortfolioMetrics from './PortfolioMetrics';
import PortfolioPositions from './PortfolioPositions';
import ExposureChart from './ExposureChart';
import WatchList from '../watchlist/WatchList';
import { positions, exposures, metrics } from '../../data/portfolioData';

export default function Portfolio() {
  return (
    <div className="space-y-6">
      <PortfolioMetrics metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PortfolioPositions positions={positions} />
          <ExposureChart exposures={exposures} />
        </div>
        <div>
          <WatchList />
        </div>
      </div>
    </div>
  );
}