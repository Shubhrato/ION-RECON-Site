import React from 'react';
import { Award, CheckCircle2, ArrowRight, ShieldCheck, Factory, Building2, TrendingUp, Clock, FileText } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function CaseStudiesSection({ onOpenQuoteModal, trackEvent, theme }) {
  const isLight = theme === 'light';
  const caseStudies = PLANT_DATA.caseStudies || [];

  return (
    <section id="case-studies-section" className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-slate-100/80 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Industrial Proof & Installation Case Studies</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Real Plant <span className="text-gradient-cyan">Installation Case Studies</span>
          </h2>

          <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Explore how Ion Recon engineers solved complex space, water hardness, and high-speed bottling challenges for industrial buyers across India.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${
                isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Image & Header Banner */}
              <div className="space-y-4">
                <div className="h-52 overflow-hidden relative bg-slate-950">
                  <img
                    src={study.image}
                    alt={`${study.client} - ${study.plantInstalled}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[11px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
                    📍 {study.location}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] text-cyan-300 uppercase font-bold tracking-widest block">Client Case Study</span>
                    <h3 className="text-white font-extrabold text-base line-clamp-1">{study.client}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Capacity Pill */}
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center justify-between">
                    <span>Installed Capacity:</span>
                    <strong className="text-slate-900 dark:text-white font-extrabold">{study.plantInstalled}</strong>
                  </div>

                  {/* Challenge Statement */}
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase text-amber-600 dark:text-amber-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" />
                      Client Challenge:
                    </span>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution Statement */}
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase text-cyan-600 dark:text-cyan-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                      Ion Recon Engineering Solution:
                    </span>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {study.solution}
                    </p>
                  </div>

                  {/* Measurable Results Box */}
                  <div className={`p-4 rounded-2xl border space-y-2.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <span className="text-[11px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider block">
                      ⚡ Measurable Project Results:
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Daily Output:</span>
                        <strong className="text-slate-900 dark:text-white font-bold">{study.results.dailyOutput}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Certification:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{study.results.bisTimeframe}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Full ROI Payback:</span>
                        <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{study.results.roiTimeframe}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Line Reliability:</span>
                        <strong className="text-slate-900 dark:text-white font-bold">{study.results.uptime}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    trackEvent(`Case Study Quote Request: ${study.client}`, 'conversion_quote_open');
                    onOpenQuoteModal(`Case Study CTA - ${study.client}`);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Similar Project Proposal</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
