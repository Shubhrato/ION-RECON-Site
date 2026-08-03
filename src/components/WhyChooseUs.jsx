import React from 'react';
import { ShieldCheck, Cpu, Wrench, GraduationCap, Headphones, Zap } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

const iconMap = {
  ShieldCheck,
  Cpu,
  Wrench,
  GraduationCap,
  Headphones,
  Zap
};

export default function WhyChooseUs({ onOpenQuoteModal, trackEvent, theme }) {
  const isLight = theme === 'light';

  return (
    <section className={`py-16 lg:py-24 relative overflow-hidden transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Why Choose Ion Recon
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Engineered for High Efficiency & <span className="text-gradient-cyan">Zero Bottlenecking</span>
          </h2>
          <p className={`text-sm sm:text-base mt-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            We don't just sell machinery; we manufacture complete high-margin packaged drinking water businesses from ground zero in Ghaziabad.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANT_DATA.whyChooseUs.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || ShieldCheck;
            return (
              <div 
                key={idx}
                className={`p-6 rounded-3xl border relative group overflow-hidden transition-all ${
                  isLight 
                    ? 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-cyan-500' 
                    : 'glass-card border-slate-800'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                  isLight ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold mb-2 group-hover:text-cyan-600 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {card.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {card.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn Technical Details →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner inside Why Choose Us */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              trackEvent('Why Choose Us CTA Clicked', 'conversion_quote_open');
              onOpenQuoteModal('Why Choose Us Banner');
            }}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/25 hover:scale-105 transition-all"
          >
            <span>Consult Senior Ion Recon Engineer</span>
          </button>
        </div>

      </div>
    </section>
  );
}
