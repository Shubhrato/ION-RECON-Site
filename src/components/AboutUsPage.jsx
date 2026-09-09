import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Factory, Award, ShieldCheck, CheckCircle2, Users, MapPin, Phone, Mail, ArrowRight, Building2, Droplet, Sparkles } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';
import SocialShare from './SocialShare';

export default function AboutUsPage({ onOpenQuoteModal, trackEvent, theme }) {
  const isLight = theme === 'light';

  return (
    <div className={`py-10 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <Helmet>
        <title>About Ion Recon Industries | Mineral Water Plant Manufacturer Ghaziabad</title>
        <meta name="description" content="Learn about Ion Recon Industries: Premier turnkey mineral water plant manufacturer & bottling machinery supplier in Sahibabad Industrial Area Site 4, Ghaziabad. 15+ years experience & 500+ projects installed." />
        <meta name="keywords" content="About Ion Recon, Ion Recon Ghaziabad, Ion Recon Sahibabad, Mineral Water Plant Manufacturer Ghaziabad, Ion Recon Industries" />
        <link rel="canonical" href="https://ionrecon.info/about-us" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Ion Recon Industries | Mineral Water Plant Manufacturer Ghaziabad" />
        <meta property="og:description" content="Learn about Ion Recon Industries: Premier turnkey mineral water plant manufacturer & bottling machinery supplier in Ghaziabad. 15+ years experience & 500+ projects installed." />
        <meta property="og:url" content="https://ionrecon.info/about-us" />
        <meta property="og:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="About Ion Recon Industries | Mineral Water Plant Manufacturer Ghaziabad" />
        <meta property="twitter:description" content="Learn about Ion Recon Industries: Premier turnkey mineral water plant manufacturer & bottling machinery supplier in Ghaziabad." />
        <meta property="twitter:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* Organization & AboutPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Ion Recon Industries",
            "description": "Ion Recon Industries is a premier manufacturer, trader, and retailer of mineral water bottling plants, commercial RO systems, and packaging machinery based in Ghaziabad, UP.",
            "url": "https://ionrecon.info/about-us",
            "mainEntity": {
              "@type": "ManufacturingBusiness",
              "name": "Ion Recon Industries",
              "url": "https://ionrecon.info/",
              "telephone": "+919810920792",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "57/1/9, Sahibabad Industrial Area Site 4",
                "addressLocality": "Ghaziabad",
                "postalCode": "201010",
                "addressRegion": "UP",
                "addressCountry": "IN"
              }
            }
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ionrecon.info/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About Us",
                "item": "https://ionrecon.info/about-us"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Company Profile & Manufacturing Excellence</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Pioneering <span className="text-cyan-600 dark:text-cyan-400">Pure Water Bottling Machinery</span> Since 2010
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            <strong>Ion Recon Industries</strong> is a leading manufacturer, trader, and retailer of fully automatic mineral water bottling plants, commercial RO water treatment systems, 3-in-1 RFC monoblock filling machines, and PET stretch blow molding equipment based in Sahibabad Industrial Area Site 4, Ghaziabad (Uttar Pradesh).
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className={`p-6 rounded-3xl border text-center space-y-2 ${isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">15+</span>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Years Industry Trust</p>
          </div>

          <div className={`p-6 rounded-3xl border text-center space-y-2 ${isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">500+</span>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Projects Installed</p>
          </div>

          <div className={`p-6 rounded-3xl border text-center space-y-2 ${isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">PAN India</span>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Doorstep Engineering</p>
          </div>

          <div className={`p-6 rounded-3xl border text-center space-y-2 ${isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-3xl sm:text-4xl font-black text-cyan-600 dark:text-cyan-400">100%</span>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">BIS & FSSAI Compliant</p>
          </div>
        </div>

        {/* Detailed Story & Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              State-of-the-Art <span className="text-gradient-cyan">Sahibabad Manufacturing Plant</span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Located strategically in Sahibabad Industrial Area Site 4, Ghaziabad (Delhi NCR), our factory houses advanced CNC machining, precision TIG welding stations, and specialized assembly bays for SS 304/316 food-grade bottling equipment.
            </p>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Every bottling machine, RO skid, and blow molder undergoes strict 72-hour factory testing before dispatch. We provide end-to-end support including civil floor layout planning, electrical load sizing, lab testing package setup, and BIS (ISI IS 14543) certification guidance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>GST Registered: <strong>{PLANT_DATA.company.gstNo}</strong></span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>Verified Trade Profile on IndiaMART & Direct Factory Pricing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>12 Months Comprehensive On-Site Warranty & Lifetime Technical Support</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  trackEvent('About Us Quote CTA Clicked', 'conversion_quote_open');
                  onOpenQuoteModal('About Us Page');
                }}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-cyan-500/20"
              >
                <span>Request Factory Quotation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
              <img
                src="/water_plant_real_1785748019896.png"
                alt="Ion Recon Mineral Water Plant Factory Setup in Ghaziabad"
                className="w-full h-[400px] object-cover"
              />
              <div className="p-6 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 space-y-1">
                <h3 className="text-white font-bold text-base">Ion Recon Assembly Bay & Testing Center</h3>
                <p className="text-xs text-slate-400">57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad, UP 201010</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share & Contact Strip */}
        <div className={`p-8 rounded-3xl border text-center space-y-4 ${isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'}`}>
          <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Connect with Ion Recon Official Channels
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Stay updated with live machine commissioning videos, installation photos, and client case studies.
          </p>
          <div className="flex justify-center pt-2">
            <SocialShare variant="inline" theme={theme} />
          </div>
        </div>

      </div>
    </div>
  );
}
