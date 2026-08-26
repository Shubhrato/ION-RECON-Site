import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, CheckCircle2, Shield, Wrench, Zap, FileText, Phone, MessageCircle, 
  Play, Check, ExternalLink, Factory, Cpu, DollarSign, Clock, Layers, ChevronRight, Award
} from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

// Image galleries map for rich product photography
const PRODUCT_GALLERIES = {
  "40-bpm-mineral-water-plant": [
    { url: "/images/40-bpm-mineral-water-plant-1.jpg", title: "40 BPM Turnkey Plant Overview" },
    { url: "/images/40-bpm-mineral-water-plant-2.jpg.png", title: "40 BPM Bottling Line Layout" },
    { url: "/images/40-bpm-mineral-water-plant-3.jpg.png", title: "40 BPM Equipment Detail View" }
  ],
  "60-bpm-mineral-water-plant": [
    { url: "/images/60-bpm-mineral-water-plant-1.jpg", title: "60 BPM High Speed Bottling Line" },
    { url: "/images/60-bpm-mineral-water-plant-2.jpg", title: "60 BPM Monoblock Filler & Setup" },
    { url: "/images/60-bpm-mineral-water-plant-3.jpg", title: "60 BPM Packaging Line" }
  ],
  "bottle-filling-machine": [
    { url: "/images/bottle-filling-machine-1.jpg", title: "3-in-1 RFC Monoblock Bottle Filler" },
    { url: "/images/bottle-filling-machine-2.jpg", title: "Rinser Filler Capper Monoblock Unit" },
    { url: "/images/bottle-filling-machine-3.jpg", title: "Monoblock Bottling Line Connection" }
  ],
  "ss-ro-plant": [
    { url: "/images/ss-ro-plant-1.jpg", title: "Industrial Stainless Steel RO Plant" },
    { url: "/images/ss-ro-plant-2.jpg", title: "SS RO Plant Skid & High Pressure Pump Setup" },
    { url: "/images/ss-ro-plant-3.jpg", title: "SS 304 RO Membrane Housing & Control Panel" },
    { url: "/images/industrial_ss_ro_plant_1784961982054.png", title: "Commercial SS RO Purification Plant" },
    { url: "/ro_plant_real_1785748121941.png", title: "Turnkey RO Water Plant Installation" }
  ],
  "jar-filling-machine": [
    { url: "/images/jar-filling-machine-1.jpg", title: "Automatic 20 Litre Jar Filling Machine" },
    { url: "/images/jar-filling-machine-2.jpg", title: "20L Jar Internal Washer, Filler & Capper" },
    { url: "/images/jar-filling-machine-3.jpg", title: "20 Litre Water Jar Washing & Capping Line" },
    { url: "/images/jar-filling-machine-demo.mp4", title: "Live Demo Video - 20L Jar Filling Machine in Action", type: "video" },
    { url: "/images/jar_filling_machine_20l_1784961999613.png", title: "Automatic 20 Litre Jar Plant Setup" }
  ],
  "pet-blowing-machine": [
    { url: "/images/pet_blow_molding_machine.png", title: "PET Bottle Stretch Blow Molding Machine" },
    { url: "/images/mineral_water_plant_40bpm_1784961952136.png", title: "PET Bottle Production & Conveyor" },
    { url: "/images/rfc_monoblock_filling_machine_1784961966884.png", title: "Automatic Bottle Air Conveyor Connection" }
  ],
  "bopp-labeling-machine": [
    { url: "/images/bopp-labeling-machine-1.jpg", title: "BOPP Hot-Melt Bottle Labeling Machine" },
    { url: "/images/bopp-labeling-machine-2.jpg", title: "Rotary BOPP Roll-Fed Labeler Assembly" },
    { url: "/images/bopp-labeling-machine-3.jpg", title: "Wraparound BOPP Labeling Station" },
    { url: "/images/bopp_labeling_machine.png", title: "BOPP Labeler Setup" }
  ],
  "shrink-wrapping-machine": [
    { url: "/images/shrink-wrapping-machine-1.jpg", title: "Automatic Shrink Wrapping Heating Tunnel" },
    { url: "/images/shrink-wrapping-machine-2.jpg", title: "Web Sealer Shrink Tunnel Pusher Station" },
    { url: "/images/shrink-wrapping-machine-3.jpg", title: "Matrix Bundling Heating Chamber Unit" },
    { url: "/images/shrink_wrapping_machine.png", title: "Fully Auto Web Sealer Shrink Tunnel" }
  ],
  "sticker-labeling-machine": [
    { url: "/images/sticker-labeling-machine-1.jpg", title: "Automatic Sticker Labeling Machine" },
    { url: "/images/sticker-labeling-machine-2.jpg", title: "Self-Adhesive Bottle Sticker Labeler" },
    { url: "/images/sticker-labeling-machine-3.jpg", title: "High Speed Bottle Labeling Conveyor Unit" }
  ],
  "semi-auto-shrink-wrapping-machine": [
    { url: "/images/semi-auto-shrink-wrapping-machine-1.jpg", title: "Semi-Automatic Shrink Wrapping Machine" },
    { url: "/images/semi-auto-shrink-wrapping-machine-2.jpg", title: "Manual Tray & Web Sealer Station" },
    { url: "/images/semi-auto-shrink-wrapping-machine-3.jpg", title: "Shrink Heating Tunnel Unit" }
  ],
  "csd-project": [
    { url: "/csd_plant_real_1785748095649.png", title: "Carbonated Soft Drink (CSD) Plant" },
    { url: "/images/csd_bottle_plant.png", title: "Soda & Beverage Isobaric Filling Line" }
  ],
  "rts-juice-dairy-plant": [
    { url: "/images/fruit_juice_bottle_line.png", title: "RTS Fruit Juice & Dairy Bottling Line" },
    { url: "/csd_plant_real_1785748095649.png", title: "PHE Pasteurizer & Hot Filling Monoblock" }
  ],
  "water-pouch-packing-machine": [
    { url: "/images/water_pouch_packing_machine.png", title: "Automatic Water Pouch Packing Machine" },
    { url: "/images/industrial_ss_ro_plant.png", title: "Vertical FFS Pouch Packaging Unit" }
  ]
};

export default function ProductDetailPage({ product, onBack, onOpenQuoteModal, trackEvent, theme, onSelectProduct }) {
  if (!product) return null;

  const isLight = theme === 'light';

  // Get photo gallery for this product or fallback
  const gallery = PRODUCT_GALLERIES[product.id] || [
    { url: product.image, title: product.title },
    { url: "/images/mineral_water_plant_40bpm_1784961952136.png", title: "Ion Recon Machinery Line" },
    { url: "/water_plant_real_1785748019896.png", title: "Factory Commissioning" }
  ];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Sync active image when product changes
  useEffect(() => {
    setActiveImgIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Match capacity financial metrics if available (e.g. for 40 BPM / 60 BPM)
  const matchingCapacity = PLANT_DATA.capacities.find(c => 
    (product.id === '40-bpm-mineral-water-plant' && c.bpm === '40 BPM') ||
    (product.id === '60-bpm-mineral-water-plant' && c.bpm === '60 BPM')
  );

  const handleWhatsAppClick = () => {
    trackEvent(`Product Page WhatsApp Click: ${product.title}`, 'conversion_whatsapp_click');
    const msg = encodeURIComponent(`Hi Ion Recon Team! I am interested in ${product.title}. Please send technical catalogue, CAD layout drawing and price quotation.`);
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  const handlePhoneClick = () => {
    trackEvent(`Product Page Phone Click: ${product.title}`, 'conversion_phone_click');
    window.location.href = `tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`;
  };

  // Filter and prioritize related machinery (same category or complementary bottling line units)
  const relatedProducts = (() => {
    const others = PLANT_DATA.products.filter(p => p.id !== product.id);
    const sameCat = others.filter(p => p.category === product.category);
    const otherCat = others.filter(p => p.category !== product.category);
    return [...sameCat, ...otherCat].slice(0, 4);
  })();

  return (
    <div className={`py-10 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <Helmet>
        <title>{product.metaTitle || `${product.title} Manufacturer | Ion Recon Ghaziabad`}</title>
        <meta name="description" content={product.seoContent || product.shortDesc} />
        <link rel="canonical" href={`https://ionrecon.info/${product.id}`} />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              isLight 
                ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:border-cyan-500 shadow-sm' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-cyan-500" />
            <span>Back to All Machinery Showcase</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-500 dark:text-cyan-400 font-semibold">{product.title}</span>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Multi-Photo Gallery Showcase */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Featured Active High-Res Photo / Video Display */}
            <div className={`relative rounded-3xl overflow-hidden border shadow-2xl h-80 sm:h-[420px] transition-all group ${
              isLight ? 'border-slate-200 bg-white' : 'border-cyan-500/30 bg-slate-900'
            }`}>
              {gallery[activeImgIndex]?.type === 'video' || gallery[activeImgIndex]?.url?.endsWith('.mp4') ? (
                <video 
                  key={gallery[activeImgIndex].url}
                  src={gallery[activeImgIndex].url} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <img 
                  src={gallery[activeImgIndex]?.url || product.image} 
                  alt={`${(gallery[activeImgIndex]?.title || product.title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-machine-view-ion-recon`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              )}
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 text-xs font-extrabold shadow-lg backdrop-blur-md">
                  {product.badge || "Ion Recon Machinery"}
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
                  Food Grade SS 304/316
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 sm:p-6 flex justify-between items-end pointer-events-none">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest block">
                    {gallery[activeImgIndex]?.type === 'video' || gallery[activeImgIndex]?.url?.endsWith('.mp4') ? '🎥 Video Demo' : `Photo ${activeImgIndex + 1} of ${gallery.length}`}
                  </span>
                  <h4 className="text-white text-sm sm:text-base font-extrabold">{gallery[activeImgIndex]?.title || product.title}</h4>
                </div>
              </div>
            </div>

            {/* Clickable Photo/Video Thumbnails Carousel Row */}
            <div className="space-y-2">
              <span className={`text-xs font-extrabold uppercase tracking-wider block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                📷 Click Media to Inspect Machinery & Setup:
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {gallery.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 h-16 sm:h-20 transition-all ${
                      activeImgIndex === idx
                        ? 'border-cyan-500 scale-105 shadow-md shadow-cyan-500/30'
                        : isLight
                          ? 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                          : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                    }`}
                  >
                    {item.type === 'video' || item.url?.endsWith('.mp4') ? (
                      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center text-cyan-400 relative">
                        <Play className="w-6 h-6 fill-cyan-400" />
                        <span className="text-[9px] font-extrabold uppercase mt-0.5 text-white">Video</span>
                      </div>
                    ) : (
                      <img src={item.url} alt={`${item.title} - Ion Recon Machinery Photo ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Financial & Operating Specs Breakdown (If 40 BPM / 60 BPM) */}
            {matchingCapacity && (
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isLight ? 'bg-cyan-50/70 border-cyan-200' : 'bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-base font-extrabold flex items-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <DollarSign className="w-5 h-5 text-cyan-500 mr-2" />
                    Commercial & Financial Profit Summary ({matchingCapacity.bpm})
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    High Margin ROI
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-cyan-100' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="block text-[11px] text-slate-500 font-medium">Estimated Plant Cost</span>
                    <strong className="text-cyan-600 dark:text-cyan-400 font-extrabold text-sm sm:text-base">{matchingCapacity.estimatedPrice}</strong>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-cyan-100' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="block text-[11px] text-slate-500 font-medium">Daily Production Output</span>
                    <strong className="text-slate-900 dark:text-white font-extrabold text-sm">{matchingCapacity.dailyOutput}</strong>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-cyan-100' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="block text-[11px] text-slate-500 font-medium">Estimated Daily Profit</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm sm:text-base">{matchingCapacity.estimatedDailyProfit}</strong>
                  </div>
                  <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-cyan-100' : 'bg-slate-900 border-slate-800'}`}>
                    <span className="block text-[11px] text-slate-500 font-medium">Full Payback Period</span>
                    <strong className="text-amber-600 dark:text-amber-400 font-extrabold text-sm sm:text-base">{matchingCapacity.roiMonths}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Equipment Included in Turnkey Package */}
            {matchingCapacity?.machinesIncluded && (
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'
              }`}>
                <h4 className={`text-base font-extrabold flex items-center ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <Layers className="w-5 h-5 text-cyan-500 mr-2" />
                  Turnkey Package Equipment Included ({matchingCapacity.bpm})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matchingCapacity.machinesIncluded.map((unit, uIdx) => (
                    <div 
                      key={uIdx} 
                      className={`p-3 rounded-xl border flex items-center space-x-3 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-extrabold text-xs flex-shrink-0">
                        ✓
                      </div>
                      <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Machinery Specs, Engineering Highlights & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header Title & Short Description */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
                  Ion Recon Factory Direct
                </span>
                <span className="text-xs font-bold text-slate-400">• Ghaziabad UP</span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {product.title}
              </h1>
              <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {product.shortDesc}
              </p>
            </div>

            {/* Quick Specs Cards Grid */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'
            }`}>
              <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Technical Parameters & Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <span className="block text-[11px] text-slate-500">Output Capacity</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.capacityRange}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <span className="block text-[11px] text-slate-500">Automation Control</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.automation}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <span className="block text-[11px] text-slate-500">Material Grade</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.material}</strong>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                  <span className="block text-[11px] text-slate-500">Power Rating</span>
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{product.powerConsumption}</strong>
                </div>
              </div>
            </div>

            {/* Engineering Highlights & Features Checklist */}
            <div className="space-y-3">
              <h4 className={`text-sm font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Engineering Highlights & Key Features:
              </h4>
              <ul className="space-y-2.5">
                {product.keyFeatures.map((feat, idx) => (
                  <li key={idx} className={`flex items-start text-xs sm:text-sm ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 font-extrabold text-xs">
                      ✓
                    </div>
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons Box */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isLight ? 'bg-cyan-50 border-cyan-200 shadow-md' : 'bg-gradient-to-b from-slate-900 to-cyan-950/60 border-cyan-500/30'
            }`}>
              <div>
                <h4 className={`text-base font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Get Direct Factory Quote & CAD Layout
                </h4>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Includes complete quotation, motor power diagram, space requirement & warranty terms.
                </p>
              </div>

              <button
                onClick={() => {
                  trackEvent(`Detail Quote Request: ${product.title}`, 'conversion_quote_open');
                  onOpenQuoteModal(`Product Spec Page: ${product.title}`);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Request Detailed Quote & Technical Proposal</span>
              </button>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleWhatsAppClick}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Specs</span>
                </button>

                <button
                  onClick={handlePhoneClick}
                  className={`py-3 px-3 rounded-xl border font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                    isLight 
                      ? 'bg-white border-slate-300 text-slate-800 hover:border-slate-400' 
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call Engineer</span>
                </button>
              </div>
            </div>

            {/* Direct Factory Guarantee Note */}
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                <Shield className="w-4 h-4 mr-1.5" />
                <span>1-Year Complete Warranty & On-Site Engineer Support</span>
              </div>
              <p className="leading-relaxed">
                Ion Recon Sahibabad Ghaziabad plant engineers provide doorstep installation, piping, testing & local operator training across India.
              </p>
            </div>

          </div>

        </div>

        {/* SEO Long Form Content for Product */}
        {product.seoContent && (
          <div className={`mt-12 p-8 rounded-3xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'}`}>
            <h3 className={`text-xl font-bold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Complete Technical & Operational Overview
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {product.seoContent}
            </p>
          </div>
        )}

        {/* Full B2B Technical Specification Table */}
        {product.techSpecsTable && (
          <div className={`mt-12 p-6 sm:p-8 rounded-3xl border shadow-xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase font-extrabold text-cyan-500 tracking-wider">Industrial Engineering Data</span>
                <h3 className={`text-xl sm:text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Full Technical Specifications Table ({product.title})
                </h3>
              </div>
              <button
                onClick={() => {
                  trackEvent(`Downloaded Spec Sheet: ${product.title}`, 'spec_download');
                  onOpenQuoteModal(`Technical Spec Data Sheet - ${product.title}`);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all flex items-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Request PDF Spec Datasheet</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className={isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-950 text-slate-300'}>
                    <th className="p-3.5 font-extrabold border-b border-slate-200 dark:border-slate-800 rounded-l-xl">Technical Parameter</th>
                    <th className="p-3.5 font-extrabold border-b border-slate-200 dark:border-slate-800 rounded-r-xl">Engineering Standard & Value</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Output Capacity (BPH)</td>
                    <td className="p-3.5 font-extrabold text-cyan-600 dark:text-cyan-400">{product.techSpecsTable.outputBPH}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Power Consumption (HP/kW)</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.powerRequirement}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Material Grade & Construction</td>
                    <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">{product.techSpecsTable.materialGrade}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Automation Grade</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.automationGrade}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Filling / Processing Precision</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.fillingAccuracy}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Compressed Air Consumption</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.airConsumption}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Overall Footprint Dimensions</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.dimensions}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Compatible Bottle / Pack Sizes</td>
                    <td className="p-3.5 font-bold">{product.techSpecsTable.bottleSizes}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-500">Manufacturer Warranty</td>
                    <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">{product.techSpecsTable.warranty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Treatment & Bottling Process Flowchart Diagram */}
        <div className={`mt-12 p-6 sm:p-8 rounded-3xl border shadow-xl ${
          isLight ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-900 border-cyan-500/30 text-white'
        }`}>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider">Process Flow & Engineering Schematic</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Treatment & Packaging Flowchart Diagram
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Step-by-step visual sequence of how raw fluid passes through filtration, RO desalination, sterilization, and automated monoblock bottling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {(PLANT_DATA.processFlows?.water || []).slice(0, 4).map((flowItem, fIdx) => (
              <div key={fIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative group hover:border-cyan-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-xs">
                    {flowItem.step}
                  </span>
                  {fIdx < 3 && (
                    <ChevronRight className="hidden md:block w-5 h-5 text-cyan-500/50 absolute -right-3.5 top-1/2 -translate-y-1/2 z-10" />
                  )}
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white pt-1">{flowItem.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{flowItem.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(PLANT_DATA.processFlows?.water || []).slice(4, 7).map((flowItem, fIdx) => (
              <div key={fIdx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative group hover:border-cyan-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs">
                    {flowItem.step}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white pt-1">{flowItem.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{flowItem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Machinery & Recommended Products Showcase */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider mb-1.5">
                <span>💡 You May Also Like / Complementary Machinery</span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Recommended Bottling Line Upgrades & Machinery
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Clients inspecting <strong className={isLight ? 'text-slate-900' : 'text-white'}>{product.title}</strong> also frequently explore these turnkey units:
              </p>
            </div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="inline-flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex-shrink-0"
            >
              <span>View Full Machinery Catalog</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <a
                key={relProduct.id}
                href={`/${relProduct.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectProduct) {
                    onSelectProduct(relProduct);
                  }
                }}
                className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 block ${
                  isLight 
                    ? 'bg-white border-slate-200 hover:border-cyan-400 shadow-md hover:shadow-xl' 
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 shadow-md'
                }`}
              >
                <div className="h-44 overflow-hidden relative bg-slate-950">
                  <img 
                    src={relProduct.image} 
                    alt={`${relProduct.title} - Ion Recon Mineral Water Plant Manufacturer`} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-bold text-cyan-400">
                    {relProduct.capacityRange}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-cyan-600 text-white text-[10px] font-extrabold uppercase shadow">
                    {relProduct.badge}
                  </div>
                </div>
                <div className="p-5 space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className={`text-sm font-extrabold line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {relProduct.title}
                    </h4>
                    <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {relProduct.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect Specs & Price</span>
                    <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
