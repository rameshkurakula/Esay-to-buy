import React, { useState } from 'react';
import { Filters, UserLocation } from '../types';
import { MapPinIcon } from './icons/Icons';

interface FilterPanelProps {
  filters: Filters;
  maxPrice: number;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onResetFilters: () => void;
  userLocation: UserLocation | null;
  onGetUserLocation: () => void;
}

const DIETARY_OPTIONS = ['vegetarian', 'vegan', 'gluten-free', 'nut-free'];
const RATING_OPTIONS = [
    { label: '4 Stars & Up', value: 4 },
    { label: '3 Stars & Up', value: 3 },
    { label: '2 Stars & Up', value: 2 },
    { label: 'Any Rating', value: 0 },
];
const DISTANCE_OPTIONS = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '25 km', value: 25 },
    { label: 'Any Distance', value: 50 },
];

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, maxPrice, onFilterChange, onResetFilters, userLocation, onGetUserLocation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDietaryChange = (tag: string) => {
    const newDietary = filters.dietary.includes(tag)
      ? filters.dietary.filter(t => t !== tag)
      : [...filters.dietary, tag];
    onFilterChange({ dietary: newDietary });
  };

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left font-semibold text-lg text-dark">
        <div className="flex justify-between items-center">
          <span>Filters</span>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </button>
      {isOpen && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dietary Needs */}
            <div>
              <h4 className="font-semibold mb-2">Dietary Needs</h4>
              <div className="space-y-2">
                {DIETARY_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={filters.dietary.includes(opt)}
                      onChange={() => handleDietaryChange(opt)}
                    />
                    <span className="ml-2 text-sm capitalize">{opt.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div>
                <h4 className="font-semibold mb-2">Max Price</h4>
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={filters.maxPrice}
                    onChange={e => onFilterChange({ maxPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-1 text-sm">${filters.maxPrice.toFixed(2)}</div>
            </div>

            {/* Seller Rating */}
            <div>
                <h4 className="font-semibold mb-2">Seller Rating</h4>
                 <select
                    value={filters.minRating}
                    onChange={e => onFilterChange({ minRating: Number(e.target.value) })}
                    className="w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                    {RATING_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            </div>
            
            {/* Proximity */}
            <div>
                <h4 className="font-semibold mb-2">Proximity</h4>
                {userLocation ? (
                     <select
                        value={filters.maxDistance}
                        onChange={e => onFilterChange({ maxDistance: Number(e.target.value) })}
                        className="w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                        {DISTANCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>Within {opt.label}</option>)}
                    </select>
                ) : (
                    <button onClick={onGetUserLocation} className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        Use My Location
                    </button>
                )}
            </div>
          </div>
          <div className="mt-6 text-right">
             <button onClick={onResetFilters} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">Reset Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
