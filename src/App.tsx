import React, { useState } from 'react';
import { Eye, Briefcase, Menu, X } from 'lucide-react';
import WorldView from './components/WorldView';
import IndustryView from './components/IndustryView';
import StockView from './components/StockView';
import WatchList from './components/watchlist/WatchList';
import Portfolio from './components/portfolio/Portfolio';
import CountrySelector from './components/CountrySelector';
import TradeIdeas from './components/trade/TradeIdeas';
import { countries } from './data/countries';
import { countryData } from './data/countryData';
import { tradeIdeas } from './data/tradeIdeas';
import DisciplinePanel from './components/DisciplinePanel';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'watchlist' | 'portfolio'>('dashboard');
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.id === 'us') || countries[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Get current country data
  const currentCountryData = countryData[selectedCountry.id];

  // If no data is available for the selected country, show a loading state
  if (!currentCountryData) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-200 mb-2">Loading Data...</h2>
          <p className="text-gray-400">Please wait while we fetch the market data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="bg-[#00000080] backdrop-blur-sm border-b border-[#ffffff08] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <img src="/ninja-sword.svg" alt="Chart Ninja Logo" className="h-8 sm:h-12 w-auto" />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase gradient-text">
                    CHART
                  </span>
                  <span className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-white">
                    NINJA
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`nav-link ${
                  activeTab === 'dashboard'
                    ? 'text-white'
                    : 'text-gray-400'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`nav-link ${
                  activeTab === 'portfolio'
                    ? 'text-white'
                    : 'text-gray-400'
                }`}
              >
                <Briefcase className="w-5 h-5 inline-block mr-2" />
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`nav-link ${
                  activeTab === 'watchlist'
                    ? 'text-white'
                    : 'text-gray-400'
                }`}
              >
                <Eye className="w-5 h-5 inline-block mr-2" />
                Watch List
              </button>
              <div className="text-sm text-gray-500 font-mono">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 space-y-2 pb-3">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeTab === 'dashboard' ? 'text-white bg-[#ffffff08]' : 'text-gray-400'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeTab === 'portfolio' ? 'text-white bg-[#ffffff08]' : 'text-gray-400'
                }`}
              >
                <Briefcase className="w-5 h-5 inline-block mr-2" />
                Portfolio
              </button>
              <button
                onClick={() => {
                  setActiveTab('watchlist');
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeTab === 'watchlist' ? 'text-white bg-[#ffffff08]' : 'text-gray-400'
                }`}
              >
                <Eye className="w-5 h-5 inline-block mr-2" />
                Watch List
              </button>
              <div className="px-4 py-2 text-sm text-gray-500 font-mono">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'dashboard' ? (
          <>
            <div className="mb-6">
              <CountrySelector
                countries={countries}
                selectedCountry={selectedCountry}
                onSelect={setSelectedCountry}
                countryData={countryData}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <WorldView data={currentCountryData.worldViewData} />
                <IndustryView data={currentCountryData.industryViewData} />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <StockView data={currentCountryData.stockViewData} />
                <TradeIdeas ideas={tradeIdeas} />
                <DisciplinePanel />
              </div>
            </div>
          </>
        ) : activeTab === 'portfolio' ? (
          <Portfolio />
        ) : (
          <WatchList />
        )}
      </main>
    </div>
  );
}

export default App;