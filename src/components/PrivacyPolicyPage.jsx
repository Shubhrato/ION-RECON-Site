import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function PrivacyPolicyPage({ theme }) {
  const isLight = theme === 'light';

  return (
    <div className={`py-12 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <Helmet>
        <title>Privacy Policy | Ion Recon Industries Ghaziabad</title>
        <meta name="description" content="Official Privacy Policy of Ion Recon Industries. Learn how we handle lead information, quotation requests, cookies, and data security." />
        <link rel="canonical" href="https://ionrecon.info/privacy-policy" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | Ion Recon Industries Ghaziabad" />
        <meta property="og:description" content="Official Privacy Policy of Ion Recon Industries." />
        <meta property="og:url" content="https://ionrecon.info/privacy-policy" />
        <meta property="og:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Privacy Policy | Ion Recon Industries" />
        <meta property="twitter:description" content="Official Privacy Policy of Ion Recon Industries." />

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
                "name": "Privacy Policy",
                "item": "https://ionrecon.info/privacy-policy"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b pb-6 border-slate-200 dark:border-slate-800 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy Terms</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026 • Ion Recon Industries</p>
        </div>

        <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>1. Information We Collect</h2>
            <p>
              When you submit a price quote request or inquiry form on <strong>Ion Recon Industries</strong> (ionrecon.info), we collect your name, phone number, email address, city/state location, and requested machinery specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>2. How We Use Your Information</h2>
            <p>
              Your contact details are strictly used by Ion Recon senior engineering staff to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-xs sm:text-sm">
              <li>Send requested quotation PDFs, CAD floor plan layouts, and technical machinery catalogues.</li>
              <li>Contact you via phone call or WhatsApp to discuss mineral water plant specifications and site feasibility.</li>
              <li>Assist with BIS (ISI IS 14543) certification guidance and factory dispatch scheduling.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>3. Data Security & Third-Party Non-Disclosure</h2>
            <p>
              Ion Recon Industries does <strong>NOT sell, rent, or trade</strong> your personal contact information to third-party telemarketers or advertisers. Lead information is safely stored in our secure database and official Google Sheet integration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>4. Cookies & Analytics</h2>
            <p>
              Our website uses cookies and standard Google Analytics tags to understand traffic patterns and optimize landing page load speed. You can disable cookies in your browser settings if preferred.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>5. Contact Officer</h2>
            <p>
              If you have any questions regarding our privacy practices, please contact:<br />
              <strong>Ion Recon Industries</strong><br />
              57/1/9, Sahibabad Industrial Area Site 4, Ghaziabad - 201010, Uttar Pradesh, India<br />
              Email: <a href="mailto:info@ionrecon.info" className="text-cyan-500 underline">info@ionrecon.info</a> | Phone: +91 98109 20792
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
