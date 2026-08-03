import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function ProductsGrid({ onOpenQuoteModal, onSelectProduct, trackEvent, theme }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const isLight = theme === 'light';

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'plant', name: 'Turnkey Plants' },
    { id: 'filling', name: 'Filling & Capping' },
    { id: 'blowing', name: 'PET Blow Molders' },
    { id: 'packaging', name: 'Labeling & Wrapping' },
  ];

  const filteredProducts = PLANT_DATA.products.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'plant') return p.category === 'plant';
    if (activeCategory === 'filling') return p.category === 'filling';
    if (activeCategory === 'blowing') return p.category === 'blowing';
    if (activeCategory === 'packaging') return p.category === 'packaging';
    return true;
  });

  return (
    <section id="products-section" className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Ion Recon Machinery Catalog
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Heavy-Duty Stainless Steel <span className="text-gradient-cyan">Bottling Machinery</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Engineered to BIS & FSSAI standards in Ghaziabad. High speed, zero downtime, and SS 304/316 grade food security.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                trackEvent(`Filtered Products by ${cat.name}`, 'product_filter');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105'
                  : isLight
                    ? 'bg-slate-100 text-slate-700 border border-slate-300 hover:border-cyan-500'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className={`rounded-3xl overflow-hidden border flex flex-col group transition-all ${
                isLight 
                  ? 'bg-white border-slate-200 shadow-lg hover:shadow-2xl hover:border-cyan-500' 
                  : 'glass-card border-slate-800'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-cyan-600 text-white text-xs font-bold shadow-md">
                  {product.badge}
                </div>

                <div className="absolute bottom-3 right-3 text-xs font-mono bg-slate-900/90 text-white px-2.5 py-1 rounded border border-slate-700">
                  {product.capacityRange}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl font-bold group-hover:text-cyan-600 transition-colors ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {product.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {product.shortDesc}
                  </p>

                  {/* Specs Pill Box */}
                  <div className={`my-4 grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
                  }`}>
                    <div>
                      <span className={isLight ? 'text-slate-500 block' : 'text-slate-400 block'}>Automation:</span>
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{product.automation}</span>
                    </div>
                    <div>
                      <span className={isLight ? 'text-slate-500 block' : 'text-slate-400 block'}>Power Req:</span>
                      <span className="font-bold text-cyan-600 dark:text-cyan-400">{product.powerConsumption}</span>
                    </div>
                  </div>

                  {/* Key Features List */}
                  <ul className="space-y-1.5 mb-6">
                    {product.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className={`flex items-start text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      onSelectProduct(product);
                      trackEvent(`Product Learn More: ${product.title}`, 'product_click');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => {
                      trackEvent(`Product Quote Requested: ${product.title}`, 'conversion_quote_open');
                      onOpenQuoteModal(`Product Card: ${product.title}`);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all text-center shadow-lg shadow-cyan-600/20"
                  >
                    Request Quote
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
