import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Home, PhoneCall, HelpCircle, Layers, Droplets, Gauge } from 'lucide-react';

export default function NotFoundPage({ onNavigateHome, onSelectProduct, onOpenQuoteModal, theme }) {
  const isLight = theme === 'light';

  const quickLinks = [
    { id: '40-bpm-mineral-water-plant', title: '40 BPM Mineral Water Plant', desc: 'Complete 2,400 BPH turnkey automatic bottling line', icon: Droplets },
    { id: 'bottle-filling-machine', title: '3-in-1 RFC Monoblock Machine', desc: 'Automatic Rinser-Filler-Capper 24-24-8 system', icon: Layers },
    { id: 'ss-ro-plant', title: 'Industrial SS RO Water Plant', desc: 'Commercial reverse osmosis with SS 304/316 skids', icon: Gauge },
    { id: 'jar-filling-machine', title: 'Automatic 20L Water Jar Line', desc: 'Jar washer, filler & capper (100 to 600 JPH)', icon: Droplets },
  ];

  return (
    <div className={`min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      <Helmet>
        <title>404 - Page Not Found | Ion Recon Machinery</title>
        <meta name="description" content="The mineral water bottling machinery page you are looking for does not exist. Explore Ion Recon automatic filling machines, SS RO plants, and turnkey setups." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-2xl w-full text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <HelpCircle className="w-4 h-4" />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Looking for <span className="text-cyan-500">Water Plant Machinery?</span>
        </h1>

        <p className={`text-base md:text-lg mb-8 max-w-lg mx-auto ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}>
          The specific model page, URL path, or documentation link you entered does not exist or has been relocated.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onNavigateHome()}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onOpenQuoteModal && onOpenQuoteModal('404 Page Helper')}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold border transition-all cursor-pointer ${
              isLight
                ? 'border-slate-300 hover:bg-slate-200 text-slate-800'
                : 'border-slate-800 hover:bg-slate-900 text-slate-200'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <span>Speak to Plant Engineer</span>
          </button>
        </div>

        {/* Quick Machinery Shortcuts */}
        <div className={`p-6 rounded-2xl border text-left ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800'
        }`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-500 mb-4">
            Popular Turnkey Machinery Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onSelectProduct) {
                      onSelectProduct(item.id);
                    } else if (onNavigateHome) {
                      window.location.href = `/${item.id}`;
                    }
                  }}
                  className={`flex items-start space-x-3 p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isLight
                      ? 'bg-slate-50 hover:bg-cyan-50/50 border-slate-200 hover:border-cyan-300'
                      : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-100">{item.title}</div>
                    <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
