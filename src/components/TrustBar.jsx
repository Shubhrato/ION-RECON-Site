import React from 'react';
import { Award, ShieldCheck, MapPin, Wrench, Sparkles } from 'lucide-react';

export default function TrustBar({ theme }) {
  const stats = [
    { number: "500+", label: "Turnkey Projects Installed", icon: Award, color: "text-cyan-600 dark:text-cyan-400" },
    { number: "15+ Yrs", label: "Ion Recon Manufacturing", icon: ShieldCheck, color: "text-blue-600 dark:text-blue-400" },
    { number: "PAN India", label: "On-Site Installation Setup", icon: MapPin, color: "text-emerald-600 dark:text-emerald-400" },
    { number: "24/7", label: "After Sales & AMC Support", icon: Wrench, color: "text-amber-600 dark:text-amber-400" },
    { number: "SS 304", label: "Food Grade Steel Quality", icon: Sparkles, color: "text-cyan-700 dark:text-cyan-300" }
  ];

  const isLight = theme === 'light';

  return (
    <section className={`py-8 relative border-y transition-colors ${
      isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-200/80 hover:border-cyan-400 hover:shadow-md' 
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/30'
                }`}
              >
                <IconComponent className={`w-6 h-6 mb-2 ${stat.color}`} />
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {stat.number}
                </span>
                <span className={`text-xs font-semibold mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
