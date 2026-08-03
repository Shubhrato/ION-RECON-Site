import React from 'react';
import { DollarSign, Shield, Activity, Sparkles, Wrench, BarChart3 } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

const iconList = [Sparkles, DollarSign, BarChart3, Activity, Shield, Wrench];

export default function BusinessBenefits({ theme }) {
  const isLight = theme === 'light';

  return (
    <section className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Business Potential & Advantage
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Key Financial & <span className="text-gradient-cyan">Operational Benefits</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Why investing in an automated packaged drinking water plant is one of the highest ROI manufacturing businesses in India today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANT_DATA.businessBenefits.map((item, idx) => {
            const IconComp = iconList[idx] || Sparkles;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border relative overflow-hidden transition-all ${
                  isLight ? 'bg-slate-50 border-slate-200 shadow-sm hover:shadow-md' : 'glass-card border-slate-800'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isLight ? 'bg-cyan-100 text-cyan-700' : 'bg-cyan-950/90 text-cyan-400 border border-cyan-500/30'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
