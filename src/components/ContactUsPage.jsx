import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ShieldCheck, Building2, ExternalLink } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';
import ContactFormSection from './ContactFormSection';
import SocialShare from './SocialShare';

export default function ContactUsPage({ trackEvent, theme, onFormSuccess }) {
  const isLight = theme === 'light';

  return (
    <div className={`py-10 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <Helmet>
        <title>Contact Ion Recon Industries | Factory Address & Sales Phone Ghaziabad</title>
        <meta name="description" content="Contact Ion Recon Industries in Sahibabad Industrial Area Site 4, Ghaziabad. Phone: +91 98109 20792. Get free quotation, machinery catalog & factory location map directions." />
        <meta name="keywords" content="Contact Ion Recon, Ion Recon Phone Number, Ion Recon Address, Ion Recon Ghaziabad Factory, Mineral Water Plant Quote" />
        <link rel="canonical" href="https://ionrecon.info/contact-us" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Ion Recon Industries | Factory Address & Sales Phone Ghaziabad" />
        <meta property="og:description" content="Contact Ion Recon Industries in Sahibabad Industrial Area Site 4, Ghaziabad. Phone: +91 98109 20792. Get free quotation & factory directions." />
        <meta property="og:url" content="https://ionrecon.info/contact-us" />
        <meta property="og:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Contact Ion Recon Industries | Factory Address & Sales Phone Ghaziabad" />
        <meta property="twitter:description" content="Contact Ion Recon Industries in Ghaziabad. Get free quotation & factory directions." />
        <meta property="twitter:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* ContactPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Ion Recon Industries",
            "description": "Factory contact page for Ion Recon Industries in Sahibabad Industrial Area Site 4, Ghaziabad.",
            "url": "https://ionrecon.info/contact-us",
            "mainEntity": {
              "@type": "ManufacturingBusiness",
              "name": "Ion Recon Industries",
              "telephone": "+919810920792",
              "email": "info@ionrecon.info",
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
                "name": "Contact Us",
                "item": "https://ionrecon.info/contact-us"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-4 h-4" />
            <span>Factory Direct Support & Consultation</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Get in Touch with <span className="text-cyan-600 dark:text-cyan-400">Ion Recon Engineers</span>
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Whether you want a turnkey project quote, plant layout drawing, machinery catalogue, or visit our factory in Sahibabad Ghaziabad, our team is ready 24/7 to assist you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Factory Address */}
          <div className={`p-8 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'}`}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Factory Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Ion Recon Industries</strong><br />
              57/1/9, Sahibabad Industrial Area Site 4,<br />
              Ghaziabad - 201010, Uttar Pradesh, India
            </p>
            <a
              href="https://maps.google.com?q=28.66630000,77.34887000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline pt-2"
            >
              <span>Open Google Maps Directions</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className={`p-8 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'}`}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Phone & WhatsApp</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-slate-600 dark:text-slate-300">
                Primary Sales: <a href="tel:+919810920792" className="font-extrabold text-cyan-600 dark:text-cyan-400 hover:underline">+91 98109 20792</a>
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Secondary Helpline: <a href="tel:+919811447271" className="font-extrabold text-cyan-600 dark:text-cyan-400 hover:underline">+91 98114 47271</a>
              </p>
              <p className="text-slate-600 dark:text-slate-300 pt-2">
                <a
                  href={`https://wa.me/${PLANT_DATA.company.whatsapp}?text=Hi%20Ion%20Recon!%20I%20want%20to%20get%20a%20quotation%20for%20mineral%20water%20plant.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-emerald-500 font-bold hover:underline"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-500 text-slate-950" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </p>
            </div>
          </div>

          {/* Card 3: Email & Business Hours */}
          <div className={`p-8 rounded-3xl border space-y-4 ${isLight ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-900 border-slate-800'}`}>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Email & Hours</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p>Email: <a href="mailto:info@ionrecon.info" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline">info@ionrecon.info</a></p>
              <p>Sales: <a href="mailto:sales@ionrecon.info" className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline">sales@ionrecon.info</a></p>
              <div className="pt-2 flex items-center space-x-2 text-slate-500 text-xs">
                <Clock className="w-4 h-4 text-cyan-500" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Embedded Interactive Map */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Factory Location Map</h2>
              <p className="text-xs text-slate-500">Sahibabad Industrial Area Site 4, Ghaziabad</p>
            </div>
            <a
              href="https://maps.google.com?q=28.66630000,77.34887000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Get Directions
            </a>
          </div>
          <div className="h-[350px] w-full bg-slate-900">
            <iframe
              title="Ion Recon Factory Google Maps Directions"
              src="https://maps.google.com/maps?q=28.66630000,77.34887000&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* End of Page Lead Form */}
        <ContactFormSection
          trackEvent={trackEvent}
          onFormSuccess={onFormSuccess}
          theme={theme}
        />

      </div>
    </div>
  );
}
