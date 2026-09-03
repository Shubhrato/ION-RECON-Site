import React from 'react';
import { Factory, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import SocialShare from './SocialShare';

export default function SeoContent({ theme }) {
  const isLight = theme === 'light';

  const keywordCategories = [
    {
      category: "Brand & Direct Search",
      keywords: ["Ion Recon", "Ion Recon Ghaziabad", "Ion Recon Industries", "Ion Recon Mineral Water Plant", "ionrecon.info"]
    },
    {
      category: "Mineral Water Plants & Turnkey Projects",
      keywords: [
        "automatic mineral water bottling plant price",
        "turnkey packaged drinking water project",
        "commercial RO plant manufacturer",
        "40 BPM Mineral Water Plant",
        "30 BPM Mineral Water Plant",
        "60 BPM Mineral Water Plant",
        "90 BPM Bottling Line",
        "120 BPM Automatic Water Plant",
        "2,400 Bottles Per Hour Plant"
      ]
    },
    {
      category: "Carbonated Soft Drink (CSD) Plants",
      keywords: [
        "automatic CSD filling machine manufacturer",
        "carbonated beverage processing plant",
        "high-capacity CSD bottling line",
        "Turnkey CSD Carbonated Soft Drink Plant",
        "Soda Bottling Plant Manufacturer",
        "Isobaric Counter-Pressure Monoblock PET Bottle Filler"
      ]
    },
    {
      category: "Sewage & Effluent Treatment Plants (STP & ETP)",
      keywords: [
        "industrial STP plant setup cost",
        "effluent and sewage treatment plant manufacturer",
        "MBBR STP plant design",
        "MBR Sewage Treatment Plant",
        "Zero Liquid Discharge ETP Plant",
        "Industrial Waste Water Purification Unit"
      ]
    },
    {
      category: "Fruit Juice & Dairy Processing Plants",
      keywords: [
        "fruit pulp processing machinery",
        "turnkey juice bottling plant",
        "pasteurizer manufacturer for juice",
        "RTS Fruit Juice Line & Dairy Plant",
        "Hot Fill Juice Bottling Line",
        "PHE Pasteurizer for Juice Bottling"
      ]
    },
    {
      category: "Bottling & Packaging Machinery",
      keywords: [
        "RFC Monoblock Bottle Filling Machine",
        "3 in 1 Automatic Bottle Filling Machine",
        "Rinser Filler Capper Monoblock",
        "20 Litre Jar Filling Machine",
        "Automatic 20L Jar Washer Filler Capper",
        "PET Bottle Making Machine",
        "PET Stretch Blow Molding Machine",
        "BOPP Hot Melt Bottle Labeling Machine",
        "Automatic Web Sealer Shrink Wrapping Machine"
      ]
    },
    {
      category: "Location & Coverage",
      keywords: [
        "Mineral Water Plant Manufacturer in Ghaziabad",
        "Bottling Machine Supplier Sahibabad Industrial Area",
        "Mineral Water Plant Manufacturer Delhi NCR",
        "Water Plant Machinery Supplier Uttar Pradesh (UP)",
        "Packaged Drinking Water Plant Manufacturer Haryana / Punjab",
        "Mineral Water Plant Setup Rajasthan / Jaipur",
        "Industrial RO Plant Supplier Bihar / MP / PAN India"
      ]
    }
  ];

  return (
    <section className={`py-14 border-t transition-colors ${
      isLight ? 'bg-slate-100/80 border-slate-200 text-slate-800' : 'bg-slate-900/60 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Award className="w-4 h-4" />
            <span>SEO & Manufacturing Overview</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Leading Turnkey Plant &amp; Bottling Machine Manufacturer in Ghaziabad, Delhi NCR &amp; PAN India
          </h2>

          <p className="leading-relaxed text-sm sm:text-base">
            Welcome to <strong>Ion Recon Industries</strong>, your premier <strong>commercial RO plant manufacturer</strong>, <strong>automatic CSD filling machine manufacturer</strong>, <strong>effluent and sewage treatment plant manufacturer</strong>, and <strong>pasteurizer manufacturer for juice</strong>. Located in Sahibabad Industrial Area Site 4, Ghaziabad (UP), we provide complete engineering solutions for <strong>turnkey packaged drinking water project</strong> setups, <strong>carbonated beverage processing plant</strong> installations, <strong>MBBR STP plant design</strong>, and <strong>fruit pulp processing machinery</strong>.
          </p>

          <p className="leading-relaxed text-sm sm:text-base">
            Whether you are looking for an <strong>automatic mineral water bottling plant price</strong> breakdown, <strong>high-capacity CSD bottling line</strong> details, <strong>industrial STP plant setup cost</strong> reports, or a <strong>turnkey juice bottling plant</strong> blueprint with BIS (ISI IS 14543) certification guidance, Ion Recon delivers top-tier food-grade SS 304/316 stainless steel machinery with doorstep PAN India commissioning.
          </p>

          <div className="pt-2">
            <SocialShare
              variant="card"
              theme={theme}
              title="Ion Recon | Turnkey Mineral Water Plant & Bottling Machine Manufacturer"
              description="Check out Ion Recon's turnkey mineral water plant setups, 3-in-1 RFC monoblocks, commercial RO plants & PET blowing machines."
            />
          </div>

          <div className="pt-6">
            <h3 className={`text-lg font-bold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Target Search Index &amp; Technical Keywords Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {keywordCategories.map((cat, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-slate-800'
                }`}>
                  <h4 className="font-bold text-cyan-500 mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keywords.map((kw, kIdx) => (
                      <span key={kIdx} className={`px-2 py-0.5 rounded text-[11px] ${
                        isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

