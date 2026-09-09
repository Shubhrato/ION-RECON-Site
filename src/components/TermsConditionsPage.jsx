import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function TermsConditionsPage({ theme }) {
  const isLight = theme === 'light';

  return (
    <div className={`py-12 min-h-screen transition-colors ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <Helmet>
        <title>Terms & Conditions | Ion Recon Industries Ghaziabad</title>
        <meta name="description" content="Official Terms & Conditions for machinery supply, installation, 12-month warranty, and sales policies by Ion Recon Industries." />
        <link rel="canonical" href="https://ionrecon.info/terms-and-conditions" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms & Conditions | Ion Recon Industries Ghaziabad" />
        <meta property="og:description" content="Official Terms & Conditions of Ion Recon Industries." />
        <meta property="og:url" content="https://ionrecon.info/terms-and-conditions" />
        <meta property="og:image" content="https://ionrecon.info/images/mineral_water_plant_40bpm.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Terms & Conditions | Ion Recon Industries" />
        <meta property="twitter:description" content="Official Terms & Conditions of Ion Recon Industries." />

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
                "name": "Terms & Conditions",
                "item": "https://ionrecon.info/terms-and-conditions"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b pb-6 border-slate-200 dark:border-slate-800 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial Machinery & Supply Terms</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026 • Ion Recon Industries (GST: {PLANT_DATA.company.gstNo})</p>
        </div>

        <div className={`space-y-6 text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>1. Quotation & Price Validity</h2>
            <p>
              Price quotations issued by <strong>Ion Recon Industries</strong> are valid for 30 days from the date of issue. Prices quoted are exclusive or inclusive of GST (as stated in official proforma invoice). Freight & insurance charges are extra at actuals unless explicitly included.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>2. Warranty Terms (12 Months On-Site)</h2>
            <p>
              Ion Recon machinery carries a <strong>12-month comprehensive warranty</strong> against manufacturing defects in SS 304/316 fabrication, pumps, motors, and PLC controllers starting from the date of dispatch or commissioning.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              *Warranty excludes consumable items such as RO membranes, filter cartridges, seals, or damage caused by electrical voltage fluctuations/improper operation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>3. Installation & Commissioning Guidelines</h2>
            <p>
              Ion Recon deputes factory engineers for doorstep installation, piping assembly, and operator training across India. The client is responsible for preparing civil floor leveling, 3-phase electrical power supply connections, and raw water feed line prior to engineer arrival.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>4. BIS (ISI) Certification Assistance</h2>
            <p>
              Ion Recon provides complete plant layout drawings and testing lab equipment packages required for BIS IS 14543 certification. Final ISI license issuance is subject to Bureau of Indian Standards inspection guidelines and water sample testing compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>5. Jurisdiction</h2>
            <p>
              All legal transactions and disputes are subject to the exclusive jurisdiction of Ghaziabad (Uttar Pradesh) courts only.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
