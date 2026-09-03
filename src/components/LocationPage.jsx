import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, ShieldCheck, Award, CheckCircle2, Phone, MessageCircle, ArrowRight, Factory, Droplet, FileText, Settings, Sparkles, Building2, TrendingUp, HelpCircle } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';
import { LOCATION_STATES, searchLocations } from '../data/locationData';
import SocialShare from './SocialShare';

export default function LocationPage({ location, onBack, onOpenQuoteModal, trackEvent, theme, onSelectLocation }) {
  const isLight = theme === 'light';

  const [selectedCategory, setSelectedCategory] = React.useState(
    location.activeCategory || 'Mineral Water Plant'
  );

  const plantCategories = [
    { id: 'Mineral Water Plant', label: 'Mineral Water Plant' },
    { id: 'Packaged Drinking Water Plant', label: 'Packaged Drinking Water (ISI)' },
    { id: 'CSD Bottling Plant', label: 'CSD / Soda Plant' },
    { id: 'STP Plant', label: 'Sewage Treatment (STP)' },
    { id: 'ETP Plant', label: 'Effluent Treatment (ETP)' }
  ];

  // Get current state info if available
  const stateObj = LOCATION_STATES.find(s => s.id === location.stateId) || LOCATION_STATES[0];
  const siblingCities = stateObj ? stateObj.cities.filter(c => c !== location.name).slice(0, 12) : [];

  const handlePhoneClick = () => {
    trackEvent(`Location Page Phone Click - ${selectedCategory} in ${location.displayName}`, 'conversion_phone_location');
    window.location.href = `tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent(`Location Page WhatsApp Click - ${selectedCategory} in ${location.displayName}`, 'conversion_whatsapp_location');
    const msg = encodeURIComponent(`Hello Ion Recon! I am looking for a ${selectedCategory} setup in ${location.displayName}. Please share price quotation and turnkey setup details.`);
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-12 py-6 sm:py-10 animate-fadeIn">
      {/* Helmet SEO Meta Tags */}
      <Helmet>
        <title>{location.seoTitle}</title>
        <meta name="description" content={location.seoDescription} />
        <meta name="keywords" content={location.keywords} />
        <link rel="canonical" href={`https://ionrecon.info/${location.slug}`} />

        {/* OpenGraph */}
        <meta property="og:title" content={location.seoTitle} />
        <meta property="og:description" content={location.seoDescription} />
        <meta property="og:url" content={`https://ionrecon.info/${location.slug}`} />

        {/* Structured Schema for Local Manufacturing in this location */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ManufacturingBusiness",
            "name": `Ion Recon - Mineral Water Plant Manufacturer in ${location.displayName}`,
            "description": location.seoDescription,
            "url": `https://ionrecon.info/${location.slug}`,
            "telephone": PLANT_DATA.company.phonePrimary,
            "areaServed": location.displayName,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": location.name,
              "addressRegion": location.stateName,
              "addressCountry": "IN"
            },
            "brand": {
              "@type": "Brand",
              "name": "Ion Recon"
            }
          })}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <button onClick={onBack} className="hover:text-cyan-500 transition-colors">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-cyan-500 transition-colors">Locations</button>
          <span>/</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{location.displayName}</span>
        </div>
      </div>

      {/* Location Hero Banner */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-6 sm:p-12 border relative overflow-hidden shadow-2xl transition-all ${
          isLight 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white border-slate-700' 
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white border-cyan-500/30'
        }`}>
          {/* Subtle Glow backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span>Direct Factory Supply to {location.displayName}</span>
            </div>

            {/* Plant Category Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {plantCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {selectedCategory} Manufacturer in <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">{location.displayName}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Setup a high-capacity <strong>{selectedCategory}</strong> in <strong>{location.displayName}</strong>. Ion Recon Industries manufactures fully automatic turnkey plants, industrial RO systems, carbonators, and STP/ETP waste water treatment lines with doorstep delivery, commissioning, and BIS/PCB compliance in {location.displayName}.
            </p>

            {/* Key USPs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-cyan-400 font-extrabold text-lg">15+ Years</div>
                <div className="text-xs text-slate-300">Manufacturing Trust</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-emerald-400 font-extrabold text-lg">BIS / ISI</div>
                <div className="text-xs text-slate-300">Approval Guidance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-amber-400 font-extrabold text-lg">40-120 BPM</div>
                <div className="text-xs text-slate-300">High Capacity Lines</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <div className="text-cyan-300 font-extrabold text-lg">1 Year</div>
                <div className="text-xs text-slate-300">Free Onsite Warranty</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onOpenQuoteModal(`Location Hero - ${location.displayName}`)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Free Quote for {location.name}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Share Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SocialShare
          variant="card"
          theme={theme}
          title={`${selectedCategory} Manufacturer in ${location.displayName} - Ion Recon`}
          description={location.metaDescription || `Ion Recon turnkey ${selectedCategory} setup in ${location.displayName}.`}
        />
      </section>

      {/* Regional Business Opportunity Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Why Setup Mineral Water Plant in {location.displayName}?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Packaged drinking water is one of the highest margin businesses with growing demand across commercial, residential, and event sectors in {location.stateName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              High Daily Demand in {location.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Surging demand for 200ml, 500ml, 1 Liter mineral water bottles and 20L jars across hotels, offices, marriage halls, and retail outlets in {location.name}.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ISI (BIS) & FSSAI Compliant
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We design plant layouts and supply machines conforming strictly to IS 14543 standards required by BIS officers during factory inspection in {location.stateName}.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border transition-all ${
            isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Direct Sahibabad Factory Supply
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Manufactured in our state-of-the-art Sahibabad Industrial Area Ghaziabad facility, delivered and commissioned directly at your site in {location.displayName}.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Plant Machinery Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div>
            <h2 className={`text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Recommended Turnkey Machinery for {location.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Complete equipment required for setting up a commercial mineral water plant
            </p>
          </div>
          <button
            onClick={() => onOpenQuoteModal(`Catalog Request - ${location.displayName}`)}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>Download Detailed Project Report (DPR)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANT_DATA.products.slice(0, 6).map((prod) => (
            <div
              key={prod.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:scale-[1.02] ${
                isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={prod.image}
                    alt={`${prod.title} setup in ${location.displayName} by Ion Recon`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-slate-950/80 text-cyan-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-cyan-500/30">
                    {prod.capacity}
                  </div>
                </div>

                <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {prod.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {prod.subtitle}
                </p>

                <div className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400">
                  {prod.price}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Available for {location.name}</span>
                <button
                  onClick={() => onOpenQuoteModal(`Quote for ${prod.title} in ${location.displayName}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Get Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Step Process to Setup Water Plant in Location */}
      <section className={`py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/50 border-slate-800'
      }`}>
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            How to Setup Mineral Water Plant in {location.displayName}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ion Recon handles end-to-end execution so you can launch your water brand hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Raw Water Test', desc: `Send water sample from ${location.name} site for TDS & hardness analysis.` },
            { step: '02', title: 'Plant Layout & CAD', desc: `Custom engineering drawing matching your building space in ${location.name}.` },
            { step: '03', title: 'Factory Fabrication', desc: 'SS 304/316 machine manufacturing at Sahibabad plant.' },
            { step: '04', title: 'Onsite Installation', desc: `Doorstep delivery, piping, electrification & commissioning in ${location.name}.` },
            { step: '05', title: 'BIS ISI Licensing', desc: 'Complete lab setup assistance & inspector audit guidance.' }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border relative ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="text-2xl font-black text-cyan-500 mb-1">{item.step}</div>
              <h3 className={`font-bold text-sm mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sibling Cities / Nearby Locations Links for Internal SEO Hierarchy */}
      {siblingCities.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Mineral Water Plant Manufacturers in Other Areas of {location.stateName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {siblingCities.map((cityName, idx) => {
              const citySlug = `mineral-water-plant-manufacturer-in-${cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectLocation(citySlug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-cyan-500 hover:text-cyan-600 text-slate-700' 
                      : 'bg-slate-900 border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-300'
                  }`}
                >
                  Mineral Water Plant in {cityName}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Start Your Bottled Water Plant in {location.displayName}?
          </h2>
          <p className="text-sm sm:text-base text-cyan-100 max-w-2xl mx-auto">
            Contact Ion Recon's Senior Plant Engineers today for project estimation, quotation, and custom factory layout.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuoteModal(`Location Bottom Banner - ${location.displayName}`)}
              className="px-8 py-3.5 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-cyan-50 transition-colors shadow-lg"
            >
              Request Call Back
            </button>
            <button
              onClick={handlePhoneClick}
              className="px-6 py-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/60 border border-white/20 text-white font-bold text-sm transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call +91 98109 20792</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
