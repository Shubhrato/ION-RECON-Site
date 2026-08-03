import React from 'react';
import { ArrowLeft, CheckCircle2, Shield, Wrench, Zap, FileText } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function ProductDetailPage({ product, onBack, onOpenQuoteModal, trackEvent, theme }) {
  if (!product) return null;

  const isLight = theme === 'light';

  return (
    <div className={`py-12 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-semibold mb-8 transition-all ${
            isLight 
              ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500' 
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Machinery Showcase</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Product Image Showcase & Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`relative rounded-3xl overflow-hidden border shadow-2xl h-80 sm:h-96 ${
              isLight ? 'border-slate-200 bg-white' : 'border-cyan-500/30 bg-slate-900'
            }`}>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                {product.badge}
              </div>
            </div>

            <div className={`p-6 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-slate-200 shadow-lg' : 'glass-panel border-slate-800'
            }`}>
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Full Machinery Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <span className={`block text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Production Speed</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.capacityRange}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <span className={`block text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Automation Grade</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.automation}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <span className={`block text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Material Grade</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.material}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <span className={`block text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Power Consumption</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.powerConsumption}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Description, Key USPs, Quote CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-cyan-500 dark:text-cyan-400 tracking-wider">Direct Factory Supply</span>
              <h1 className={`text-3xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{product.title}</h1>
              <p className={`text-sm mt-3 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{product.shortDesc}</p>
            </div>

            <div className="space-y-3">
              <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Engineering Highlights & Features:</h4>
              <ul className="space-y-2">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx} className={`flex items-start text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 mr-2.5 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-2xl border space-y-4 ${
              isLight ? 'bg-cyan-50 border-cyan-200' : 'bg-gradient-to-b from-slate-900 to-cyan-950/60 border-cyan-500/30'
            }`}>
              <h4 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Get Technical Data Sheet & Price Proposal</h4>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Includes engineering layout drawing, motor specifications, and shipping timeline.</p>
              
              <button
                onClick={() => {
                  trackEvent(`Detail Quote Request: ${product.title}`, 'conversion_quote_open');
                  onOpenQuoteModal(`Product Spec Page: ${product.title}`);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Request Custom Quote & Specs</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
