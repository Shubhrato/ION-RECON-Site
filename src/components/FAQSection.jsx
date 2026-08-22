import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function FAQSection({ onOpenQuoteModal, trackEvent, theme }) {
  const [openIdx, setOpenIdx] = useState(0);

  const isLight = theme === 'light';

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
    trackEvent(`Toggled FAQ #${idx + 1}`, 'faq_click');
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": PLANT_DATA.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section id="faqs-section" className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Frequently Asked Questions
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Got Questions About <span className="text-gradient-cyan">Setting Up a Water Plant?</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Clear, transparent answers regarding machinery cost, BIS approval, space requirements, and after-sales support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {PLANT_DATA.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? isLight 
                      ? 'bg-slate-50 border-cyan-500 shadow-md' 
                      : 'bg-slate-950/90 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : isLight 
                      ? 'bg-white border-slate-200 hover:border-slate-300' 
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span className={`text-base sm:text-lg font-bold flex items-center ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mr-3 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform ${
                    isOpen ? 'rotate-180 text-cyan-600' : 'text-slate-400'
                  } ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-5 pb-6 sm:px-6 text-sm leading-relaxed border-t pt-4 ${
                    isLight ? 'border-slate-200 text-slate-700' : 'border-slate-800 text-slate-300'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help CTA Box */}
        <div className={`mt-12 p-6 rounded-3xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight ? 'bg-cyan-50 border-cyan-200' : 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-500/30'
        }`}>
          <div className="text-left">
            <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Have a specific question not answered here?</h4>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Talk directly with our Senior Engineering Consultant for personalized guidance.</p>
          </div>
          <button
            onClick={() => {
              trackEvent('FAQ Assistance Clicked', 'conversion_quote_open');
              onOpenQuoteModal('FAQ Section CTA');
            }}
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs whitespace-nowrap shadow-lg shadow-cyan-600/20"
          >
            Ask An Engineer
          </button>
        </div>

      </div>
    </section>
  );
}
