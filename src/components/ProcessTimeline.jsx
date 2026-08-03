import React from 'react';
import { ArrowDown } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function ProcessTimeline({ theme }) {
  const isLight = theme === 'light';

  return (
    <section className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            End-To-End Turnkey Roadmap
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            7-Step Seamless <span className="text-gradient-cyan">Execution Process</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            From initial site consultation to full commercial bottling production in 30 days.
          </p>
        </div>

        {/* Timeline Grid / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
          {PLANT_DATA.processTimeline.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              
              {/* Step Badge */}
              <div className={`w-12 h-12 rounded-2xl border-2 font-black text-lg shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all ${
                isLight 
                  ? 'bg-white border-cyan-500 text-cyan-700' 
                  : 'bg-slate-900 border-cyan-500/40 text-cyan-400'
              }`}>
                {item.step}
              </div>

              {/* Title & Desc */}
              <h3 className={`text-sm font-bold mb-1 group-hover:text-cyan-600 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {item.title}
              </h3>
              <p className={`text-[11px] leading-snug ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {item.desc}
              </p>

              {/* Mobile / Desktop Arrow */}
              {idx < PLANT_DATA.processTimeline.length - 1 && (
                <div className="my-3 md:hidden text-cyan-600">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
