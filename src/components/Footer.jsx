import React from 'react';
import { Droplet, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function Footer({ setCurrentTab, onOpenQuoteModal, theme }) {
  const isLight = theme === 'light';

  return (
    <footer className={`border-t pt-16 pb-28 sm:pb-16 text-xs transition-colors ${
      isLight ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-950 text-slate-400 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                <Droplet className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                ION<span className="text-cyan-400">RECON</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              Ion Recon - Trader, Manufacturer & Retailer of Mineral Water Plants, Filling Machines, Industrial RO Plants, and Bottling Packaging Machinery from Ghaziabad, Uttar Pradesh.
            </p>
            <div className="pt-2 text-emerald-400 font-semibold flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              <span>GST No: {PLANT_DATA.company.gstNo} (Reg: 09-07-2021)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Turnkey Solutions</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentTab('40-bpm-mineral-water-plant')} className="hover:text-cyan-400 transition-colors">
                  40 BPM Mineral Water Plant (Bestseller)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('bottle-filling-machine')} className="hover:text-cyan-400 transition-colors">
                  RFC Monoblock Filling Machine
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('ss-ro-plant')} className="hover:text-cyan-400 transition-colors">
                  Industrial SS RO Water Plant
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('jar-filling-machine')} className="hover:text-cyan-400 transition-colors">
                  Automatic 20 Litre Jar Plant
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pet-blowing-machine')} className="hover:text-cyan-400 transition-colors">
                  PET Blow Molding Machine
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('roi-calculator')} className="hover:text-cyan-400 transition-colors">
                  Plant Capacity & ROI Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Factory & Sales Contact</h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{PLANT_DATA.company.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-cyan-400 font-bold">
                  {PLANT_DATA.company.phonePrimary}
                </a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${PLANT_DATA.company.email}`} className="hover:text-cyan-400">
                  {PLANT_DATA.company.email}
                </a>
              </p>
            </div>
            <div className="pt-2">
              <a 
                href="https://maps.google.com?q=28.66630000,77.34887000" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-xs font-semibold text-cyan-400 hover:underline"
              >
                <span>Google Map Directions (Sahibabad Factory)</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Col 4: High Intent Google Ads Keywords */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ion Recon Google Ads Targets</h4>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {[
                "Mineral Water Plant Manufacturer Ghaziabad",
                "40 BPM Package Water Plant",
                "Ion Recon Bottling Line",
                "Packaged Drinking Water Machine",
                "Bottle Filling Machine Ghaziabad",
                "SS RO Plant Manufacturer UP",
                "20L Jar Filling Plant",
                "Turnkey Water Plant Sahibabad"
              ].map((kw, i) => (
                <span key={i} className="bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">
                  {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-[11px] gap-4">
          <p>© 2026 {PLANT_DATA.company.fullName}. All Rights Reserved. Turnkey Mineral Water Plants & Bottling Machinery.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
