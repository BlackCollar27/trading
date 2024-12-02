import React, { useRef } from 'react';
import { Globe2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Country } from '../types/country';
import { calculateCountryScore } from '../utils/scoring';
import CountryCard from './country/CountryCard';

interface CountrySelectorProps {
  countries: Country[];
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  countryData: Record<string, any>;
}

export default function CountrySelector({ countries, selectedCountry, onSelect, countryData }: CountrySelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="glass-panel">
      <div className="flex items-center justify-between p-4 border-b border-[#ffffff15]">
        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-red-400" />
          <h2 className="text-lg font-bold gradient-text">Select Market</h2>
        </div>
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-1 hover:bg-dark-accent rounded-full"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1 hover:bg-dark-accent rounded-full"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile View - Horizontal Scroll */}
      <div className="sm:hidden">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {countries.map((country) => {
            const data = countryData[country.id];
            const score = data ? calculateCountryScore(data.worldViewData) : null;
            
            return (
              <div key={country.id} className="w-full flex-none snap-center px-4">
                <CountryCard
                  country={country}
                  score={score}
                  isSelected={selectedCountry.id === country.id}
                  onSelect={onSelect}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden sm:grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => {
          const data = countryData[country.id];
          const score = data ? calculateCountryScore(data.worldViewData) : null;
          
          return (
            <CountryCard
              key={country.id}
              country={country}
              score={score}
              isSelected={selectedCountry.id === country.id}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}