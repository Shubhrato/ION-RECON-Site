import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Layers, Zap, Maximize, ArrowRight } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function CapacityRoiCalculator({ onOpenQuoteModal, trackEvent, theme }) {
  const [selectedBpm, setSelectedBpm] = useState('40 BPM');
  const [shiftHours, setShiftHours] = useState(8);

  const isLight = theme === 'light';

  const selectedData = PLANT_DATA.capacities.find(c => c.bpm === selectedBpm) || PLANT_DATA.capacities[1];
  const hourlySpeed = parseInt(selectedData.bottlesPerHour.replace(/[^0-9]/g, '')) || 2400;
  const calculatedDailyOutput = (hourlySpeed * shiftHours).toLocaleString('en-IN');

  return (
    <section id="roi-calculator-section" className={`py-16 lg:py-24 relative overflow-hidden transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Ion Recon Capacity & ROI Simulator
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Select Your Production Line <span className="text-gradient-cyan">BPM Speed</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Compare bottle filling capacities, power requirements, floor space, and project profit potential.
          </p>
        </div>

        {/* BPM Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {PLANT_DATA.capacities.map((item) => (
            <button
              key={item.bpm}
              onClick={() => {
                setSelectedBpm(item.bpm);
                trackEvent(`Selected Plant Capacity: ${item.bpm}`, 'capacity_tab_click');
              }}
              className={`px-5 py-3 rounded-xl text-sm font-extrabold transition-all ${
                selectedBpm === item.bpm
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-600/30 scale-105 border border-cyan-300/30'
                  : isLight
                    ? 'bg-white text-slate-700 border border-slate-300 hover:border-cyan-500 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {item.bpm}
            </button>
          ))}
        </div>

        {/* Dynamic ROI Card Showcase */}
        <div className={`p-6 sm:p-8 lg:p-10 rounded-3xl border shadow-xl transition-all ${
          isLight ? 'bg-white border-slate-200' : 'glass-panel border-cyan-500/30'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Specs & Machine List */}
            <div className="lg:col-span-7 space-y-6 w-full">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedData.bpm} Turnkey Line
                  </span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400 text-xs font-bold rounded-full border border-cyan-300 dark:border-cyan-500/30">
                    {selectedData.suitableFor}
                  </span>
                </div>
                <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Rated Production Output: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{selectedData.bottlesPerHour}</strong>
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-1">
                    <Maximize className="w-3.5 h-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
                    <span>Factory Area</span>
                  </div>
                  <span className={`text-sm font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedData.areaReq}</span>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-1">
                    <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
                    <span>Power Connected</span>
                  </div>
                  <span className={`text-sm font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedData.powerReq}</span>
                </div>

                <div className={`p-3.5 rounded-2xl border col-span-2 sm:col-span-1 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-1">
                    <TrendingUp className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    <span>Expected ROI</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">{selectedData.roiMonths}</span>
                </div>
              </div>

              {/* Shift Interactive Slider */}
              <div className={`p-4.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'}`}>
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                    Shift Duration Simulator: <strong className="text-cyan-600 dark:text-cyan-400">{shiftHours} Hours / Day</strong>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{calculatedDailyOutput} Bottles / Day</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="16"
                  step="2"
                  value={shiftHours}
                  onChange={(e) => setShiftHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>

              {/* Machines Included List */}
              <div>
                <h4 className={`text-sm font-bold mb-3 flex items-center ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                  <Layers className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                  Ion Recon Turnkey Machinery Package:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedData.machinesIncluded.map((m, mIdx) => (
                    <div key={mIdx} className={`flex items-start text-xs p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/40 border-slate-800/60 text-slate-300'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Estimated Revenue & Quote Box */}
            <div className={`lg:col-span-5 w-full p-6 sm:p-8 rounded-3xl border flex flex-col justify-between space-y-6 ${
              isLight 
                ? 'bg-gradient-to-b from-cyan-50 via-white to-blue-50 border-cyan-200 shadow-md' 
                : 'bg-gradient-to-b from-slate-900 to-cyan-950/40 border-cyan-500/30'
            }`}>
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-extrabold block mb-1">Financial Analysis</span>
                <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Estimated Profit Summary</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Calculated for {selectedData.bpm} line running @ 1 Litre packaged bottle standard.
                </p>
              </div>

              <div className="space-y-4">
                <div className={`p-4 sm:p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/80 border-slate-800'}`}>
                  <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Estimated Setup Cost</span>
                  <span className="text-lg sm:text-2xl font-black text-cyan-700 dark:text-cyan-300 block tracking-tight">
                    {selectedData.estimatedPrice}
                  </span>
                </div>



                <div className={`p-4 sm:p-5 rounded-2xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-950/80 border-slate-800'}`}>
                  <span className={`text-xs block mb-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Monthly Production Target ({shiftHours}h shift)</span>
                  <span className="text-base sm:text-lg font-bold text-cyan-700 dark:text-cyan-300 block">
                    {(hourlySpeed * shiftHours * 26).toLocaleString('en-IN')} Bottles / Month
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    trackEvent(`Requested Quote for ${selectedData.bpm}`, 'conversion_quote_open');
                    onOpenQuoteModal(`ROI Calculator (${selectedData.bpm})`);
                  }}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Quotation for {selectedData.bpm}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className={`text-[11px] text-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  ⚡ Custom plant capacities up to 240 BPM available on request.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
