import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function CTASection({ onOpenQuoteModal, trackEvent, theme }) {
  const isLight = theme === 'light';

  const handleWhatsApp = () => {
    trackEvent('CTA Banner WhatsApp Clicked', 'conversion_whatsapp_click');
    const msg = encodeURIComponent("Hello Ion Recon! I am ready to start my Mineral Water Plant business. Please share quotation details.");
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <section className={`py-16 lg:py-20 relative overflow-hidden border-t transition-colors ${
      isLight 
        ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700 text-white border-cyan-500' 
        : 'bg-gradient-to-r from-cyan-950 via-slate-950 to-blue-950 text-white border-cyan-500/30'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Project Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Ready to Start Your Mineral Water Business?
        </h2>

        <p className="text-cyan-50 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Request your free customized project quotation, machinery specification sheet, and factory civil layout plan from Ion Recon today.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              trackEvent('CTA Bottom Quote Clicked', 'conversion_quote_open');
              onOpenQuoteModal('Bottom CTA Banner');
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <span>Get Free Quote</span>
            <ArrowRight className="w-5 h-5 text-cyan-600" />
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        <div className="pt-2 text-xs text-cyan-100">
          <span>☎ Instant Phone Support: </span>
          <a href={`tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`} className="font-bold underline text-white">
            {PLANT_DATA.company.phonePrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
