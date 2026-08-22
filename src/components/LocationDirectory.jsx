import React, { useState } from 'react';
import { Search, MapPin, Building2, ChevronRight, Sparkles, Filter, Globe } from 'lucide-react';
import { LOCATION_STATES, searchLocations } from '../data/locationData';

export default function LocationDirectory({ onSelectLocation, theme }) {
  const isLight = theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStateTab, setActiveStateTab] = useState('all');

  const filteredLocations = searchLocations(searchQuery);

  return (
    <section className={`py-12 sm:py-16 border-t ${
      isLight ? 'bg-slate-100/70 border-slate-200 text-slate-900' : 'bg-slate-950/80 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>PAN India Setup Directory (North, Central, West, East & NE)</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Mineral Water Plant Manufacturers by <span className="text-cyan-600 dark:text-cyan-400">City & State</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Select your city or state to explore local turnkey plant options, BIS ISI licensing guidelines, and delivered projects.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your city or state (e.g. Lucknow, Varanasi, Agra, Jaipur, Indore, Patna...)"
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm font-medium transition-all outline-none ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500 focus:ring-2 ring-cyan-500/20 shadow-md' 
                  : 'bg-slate-900 border-slate-700 text-white focus:border-cyan-400 focus:ring-2 ring-cyan-400/20 shadow-2xl'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-bold text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* State Filter Chips */}
        {!searchQuery && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <button
              onClick={() => setActiveStateTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeStateTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : isLight 
                    ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              All Regions ({LOCATION_STATES.length} States)
            </button>

            {LOCATION_STATES.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStateTab(st.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeStateTab === st.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : isLight 
                      ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200' 
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid Display */}
        {searchQuery ? (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Found {filteredLocations.length} locations matching "{searchQuery}"
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredLocations.map((loc) => (
                <a
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectLocation(loc.slug);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {loc.displayName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Mineral Water Plant Setup
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATION_STATES
              .filter(st => activeStateTab === 'all' || activeStateTab === st.id)
              .map((st) => (
                <div
                  key={st.id}
                  className={`rounded-2xl border p-5 space-y-4 transition-all ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 font-bold text-xs">
                        {st.shortCode}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {st.name}
                        </h3>
                        <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">{st.region}</span>
                      </div>
                    </div>

                    <a
                      href={`/mineral-water-plant-manufacturer-in-${st.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectLocation(`mineral-water-plant-manufacturer-in-${st.id}`);
                      }}
                      className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center"
                    >
                      <span>State Page</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Top Industrial Cities:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {st.topCities.map((c, idx) => {
                        const slug = `mineral-water-plant-manufacturer-in-${c.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        return (
                          <a
                            key={idx}
                            href={`/${slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectLocation(slug);
                            }}
                            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors inline-block ${
                              isLight 
                                ? 'bg-slate-50 border-slate-200 hover:border-cyan-500 hover:text-cyan-600 text-slate-700' 
                                : 'bg-slate-950 border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-300'
                            }`}
                          >
                            {c}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

      </div>
    </section>
  );
}
