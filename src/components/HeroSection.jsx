import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Star, Factory } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

const sliderImages = [
  { url: '/water_plant_real_1785748019896.png', title: 'Mineral Water Plant' },
  { url: '/stp_plant_real_1785748052700.png', title: 'STP Plant' },
  { url: '/etp_plant_real_1785748072952.png', title: 'ETP Plant' },
  { url: '/csd_plant_real_1785748095649.png', title: 'CSD Plant' },
  { url: '/ro_plant_real_1785748121941.png', title: 'Commercial RO Plant' }
];

export default function HeroSection({ onOpenQuoteModal, onOpenVideoModal, trackEvent, theme }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppHero = () => {
    trackEvent('Hero WhatsApp Clicked', 'conversion_whatsapp_click');
    const msg = encodeURIComponent("Hi Ion Recon Team! I want to start a Mineral Water Plant. Please share 40 BPM / 60 BPM plant quotation and catalog.");
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  const isLight = theme === 'light';

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden flex items-center min-h-[65vh]">
      {/* Full Width Background Slider */}
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Heavy Gradient Overlay to ensure text readability */}
          <div className={`absolute inset-0 ${
            isLight 
              ? 'bg-gradient-to-r from-white/95 via-white/80 to-transparent' 
              : 'bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent'
          }`}></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Premium ION RECON Branding Watermark on Slider */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-10 flex items-center space-x-4 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform transition-all hover:scale-105">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-inner border border-white/20">
              <Factory className="w-5 h-5 text-white drop-shadow-md" />
            </div>
            <div className="flex flex-col justify-center pr-2">
              <span className="text-white font-black text-xl tracking-[0.25em] uppercase leading-none drop-shadow-md">ION RECON</span>
              <span className="text-cyan-400 font-bold text-[10px] tracking-[0.2em] uppercase mt-1.5 opacity-90">{slide.title}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-8 lg:mt-0">
        <div className="max-w-3xl space-y-6">
          
          {/* Top Badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm border backdrop-blur-md ${
            isLight 
              ? 'bg-white/70 border-cyan-300 text-cyan-900' 
              : 'bg-slate-900/70 border-cyan-500/30 text-cyan-300'
          }`}>
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-500 animate-ping" />
            <span>Ion Recon • Ghaziabad Manufacturer • GST 09AFSPV0532M1ZQ</span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Build Your Own <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Packaged Drinking Water</span> Business
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-xl font-medium leading-relaxed max-w-2xl ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            Complete Mineral Water Plant Manufacturer & Bottling Machinery Retailer by Ion Recon, Ghaziabad (UP). PAN India Turnkey Setup, 40 BPM Bestseller Lines & BIS Approval Guidance.
          </p>

          {/* Key USPs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {PLANT_DATA.hero.usps.map((usp, idx) => (
              <div key={idx} className={`flex items-center space-x-3 text-base font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <CheckCircle2 className="w-6 h-6 text-cyan-500 flex-shrink-0 drop-shadow-md" />
                <span>{usp}</span>
              </div>
            ))}
          </div>

          {/* Dual CTAs & Video Modal Trigger */}
          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                trackEvent('Hero Free Quotation Button Clicked', 'conversion_quote_open');
                onOpenQuoteModal('Hero Primary CTA');
              }}
              className="flex items-center justify-center space-x-3 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-lg shadow-2xl shadow-cyan-600/40 hover:shadow-cyan-600/60 transition-all transform hover:-translate-y-1"
            >
              <span>Get Free Quotation</span>
              <ArrowRight className="w-6 h-6" />
            </button>

            <button
              onClick={handleWhatsAppHero}
              className="flex items-center justify-center space-x-2.5 px-7 py-4.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
              <span>Talk on WhatsApp</span>
            </button>
          </div>
          
          <div className="pt-2">
            <button
              onClick={() => {
                trackEvent('Factory Video Preview Clicked', 'video_modal_opened');
                onOpenVideoModal();
              }}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border-2 font-bold transition-all backdrop-blur-md ${
                isLight 
                  ? 'bg-white/50 border-slate-300 text-slate-800 hover:border-cyan-600 hover:text-cyan-700 hover:bg-white' 
                  : 'bg-slate-900/50 border-slate-600 text-white hover:border-cyan-500 hover:bg-slate-900'
              }`}
            >
              <Factory className="w-5 h-5 text-cyan-500" />
              <span>Watch Factory Video</span>
            </button>
          </div>

          {/* Rating & Trust Rating */}
          <div className="pt-6 flex items-center space-x-4">
            <div className="flex text-amber-400 drop-shadow-md">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
            <span className={`text-base font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <span className={isLight ? 'text-slate-900 font-black' : 'text-white font-black'}>500+ Projects Delivered</span> Across UP, NCR & India
            </span>
          </div>

        </div>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-10 bg-cyan-500' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
