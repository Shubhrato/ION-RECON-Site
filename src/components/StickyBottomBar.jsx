import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function StickyBottomBar({ onOpenQuoteModal, trackEvent, theme }) {
  const isLight = theme === 'light';

  const handleCall = () => {
    trackEvent('Sticky Call Clicked', 'conversion_phone_click');
    window.location.href = `tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = () => {
    trackEvent('Sticky WhatsApp Clicked', 'conversion_whatsapp_click');
    const msg = encodeURIComponent("Hello Ion Recon! I want details on Mineral Water Plant machinery.");
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 border-t p-2.5 sm:px-6 shadow-2xl backdrop-blur-md transition-colors ${
      isLight ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-slate-950/95 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Call Now Button */}
        <button
          onClick={handleCall}
          className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all ${
            isLight
              ? 'bg-slate-100 border-slate-300 hover:border-cyan-600 text-slate-800 hover:text-cyan-700'
              : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-400'
          }`}
        >
          <Phone className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Call Now</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-600/20 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        {/* Get Quote Button */}
        <button
          onClick={() => {
            trackEvent('Sticky Get Quote Clicked', 'conversion_quote_open');
            onOpenQuoteModal('Sticky Mobile/Desktop Bottom Bar');
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-600/25 transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Get Quote</span>
        </button>

      </div>
    </div>
  );
}
