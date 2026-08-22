import React, { useState } from 'react';
import { Phone, MessageCircle, Droplet, Menu, X, Shield, Award, Sun, Moon } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function Navbar({ onOpenQuoteModal, currentTab, setCurrentTab, trackEvent, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePhoneClick = () => {
    trackEvent('Phone Call Initiated', 'conversion_phone_click');
    window.location.href = `tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent('WhatsApp Chat Initiated', 'conversion_whatsapp_click');
    const msg = encodeURIComponent("Hello Ion Recon Team! I am interested in setting up a Mineral Water Plant. Please send me product catalogue and price quotation.");
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: '40-bpm-mineral-water-plant', label: '40 BPM Plant' },
    { id: 'bottle-filling-machine', label: 'Filling Machine' },
    { id: 'ss-ro-plant', label: 'SS RO Plant' },
    { id: 'pet-blowing-machine', label: 'PET Blowing' },
    { id: 'jar-filling-machine', label: '20L Jar Plant' },
    { id: 'locations', label: 'Locations Served' },
    { id: 'blog', label: 'Blog & Setup Guides' },
    { id: 'roi-calculator', label: 'ROI Calculator' },
    { id: 'faqs', label: 'FAQs & Support' },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      theme === 'light' 
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
        : 'bg-slate-950/95 border-slate-800 text-white'
    }`}>
      {/* Top Banner Bar for GST Registration & Ion Recon Ghaziabad location */}
      <div className={`border-b py-1.5 px-4 text-xs font-medium transition-colors ${
        theme === 'light' 
          ? 'bg-slate-900 text-slate-200 border-slate-800' 
          : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-cyan-500/20 text-slate-300'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-cyan-400">
              <Shield className="w-3.5 h-3.5 mr-1" />
              Ion Recon • GST No: {PLANT_DATA.company.gstNo} (Reg: 09-07-2021)
            </span>
            <span className="hidden md:inline-flex items-center text-emerald-400">
              <Award className="w-3.5 h-3.5 mr-1" />
              Ghaziabad (UP) Sahibabad Factory • PAN India Setup
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline">Turnover: <strong className="text-amber-400">₹1.5 - 5 Cr</strong></span>
            <button 
              onClick={handlePhoneClick}
              className="hover:text-cyan-400 transition-colors font-semibold text-slate-200"
            >
              📞 {PLANT_DATA.company.phonePrimary}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href="/"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab('home');
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${theme === 'light' ? 'bg-slate-900' : 'bg-slate-950'}`}>
                <Droplet className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
              </div>
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight block leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                ION<span className="text-cyan-600 dark:text-cyan-400">RECON</span>
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest block mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Mineral Water Plants & Filling Machines
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id === 'home' ? '/' : `/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(link.id);
                  trackEvent(`Navigated to ${link.label}`, 'nav_click');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === link.id
                    ? theme === 'light'
                      ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-bold'
                      : 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 shadow-inner'
                    : theme === 'light'
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle & CTA Buttons Header */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* Light / Dark Mode Toggle Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => {
                trackEvent('Get Quotation Header CTA Clicked', 'conversion_quote_open');
                onOpenQuoteModal('Header Navbar CTA');
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105"
            >
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-300 dark:border-slate-700"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-slate-800" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl ${theme === 'light' ? 'bg-slate-100 text-slate-800' : 'bg-slate-800 text-slate-300'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id === 'home' ? '/' : `/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-lg text-xs font-semibold block ${
                  currentTab === link.id
                    ? 'text-cyan-600 bg-cyan-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal('Mobile Nav Drawer CTA');
              }}
              className="w-full py-3 rounded-xl bg-cyan-600 text-white font-bold text-xs"
            >
              Request Free Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
