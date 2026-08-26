import { useState, useRef, useEffect } from 'react';
import { Award, Droplet, Menu, MessageCircle, Moon, Shield, Sun, X, ChevronDown, Package } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function Navbar({ onOpenQuoteModal, currentTab, setCurrentTab, trackEvent, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLight = theme === 'light';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhoneClick = () => {
    trackEvent('Phone Call Initiated', 'conversion_phone_click');
    window.location.href = `tel:${PLANT_DATA.company.phonePrimary.replace(/\s+/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    trackEvent('WhatsApp Chat Initiated', 'conversion_whatsapp_click');
    const msg = encodeURIComponent("Hello Ion Recon Team! I am interested in setting up a Mineral Water Plant. Please send me product catalogue and price quotation.");
    window.open(`https://wa.me/${PLANT_DATA.company.whatsapp}?text=${msg}`, '_blank');
  };

  const mainNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'locations', label: 'Locations Served' },
    { id: 'blog', label: 'Blog & Setup Guides' },
    { id: 'roi-calculator', label: 'ROI Calculator' },
    { id: 'faqs', label: 'FAQs & Support' },
  ];

  const productsList = PLANT_DATA.products || [];
  const isProductActive = productsList.some(p => p.id === currentTab);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      isLight 
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' 
        : 'bg-slate-950/95 border-slate-800 text-white'
    }`}>
      {/* Top Banner Bar for GST Registration & Ion Recon Ghaziabad location */}
      <div className={`border-b py-1.5 px-4 text-xs font-medium transition-colors ${
        isLight 
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
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLight ? 'bg-slate-900' : 'bg-slate-950'}`}>
                <Droplet className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
              </div>
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight block leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
                ION<span className="text-cyan-600 dark:text-cyan-400">RECON</span>
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest block mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Mineral Water Plants & Filling Machines
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('home');
                trackEvent('Navigated to Home', 'nav_click');
              }}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'home'
                  ? isLight
                    ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-bold'
                    : 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 shadow-inner'
                  : isLight
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </a>

            {/* Our Products Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isProductActive || productsDropdownOpen
                    ? isLight
                      ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-bold'
                      : 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 shadow-inner'
                    : isLight
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-cyan-500" />
                <span>Our Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Floating Dropdown Menu */}
              {productsDropdownOpen && (
                <div className={`absolute top-full left-0 mt-1 w-80 p-2.5 rounded-2xl border shadow-2xl z-50 transition-all ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60'
                    : 'bg-slate-900 border-slate-700/80 text-white shadow-slate-950/90'
                }`}>
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-extrabold text-cyan-500 tracking-wider">All Machinery & Plants</span>
                    <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded">
                      {productsList.length} Items
                    </span>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto space-y-1 pr-1">
                    {productsList.map((prod) => (
                      <a
                        key={prod.id}
                        href={`/${prod.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentTab(prod.id);
                          setProductsDropdownOpen(false);
                          trackEvent(`Navigated to Product: ${prod.title}`, 'nav_click');
                        }}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-3 transition-all group ${
                          currentTab === prod.id
                            ? isLight
                              ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-200'
                              : 'bg-cyan-950/70 text-cyan-400 font-bold border border-cyan-500/30'
                            : isLight
                              ? 'hover:bg-slate-100 text-slate-800'
                              : 'hover:bg-slate-800/80 text-slate-200'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block truncate font-bold text-xs group-hover:text-cyan-500 transition-colors">{prod.title}</span>
                          <span className="block text-[10px] text-slate-400 truncate mt-0.5">{prod.capacityRange}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Remaining Main Nav Links */}
            {mainNavLinks.slice(1).map((link) => (
              <a
                key={link.id}
                href={`/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(link.id);
                  trackEvent(`Navigated to ${link.label}`, 'nav_click');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  currentTab === link.id
                    ? isLight
                      ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 font-bold'
                      : 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 shadow-inner'
                    : isLight
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
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isLight ? (
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
              {isLight ? <Moon className="w-5 h-5 text-slate-800" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl ${isLight ? 'bg-slate-100 text-slate-800' : 'bg-slate-800 text-slate-300'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="grid grid-cols-1 gap-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-3 rounded-lg text-xs font-semibold block ${
                currentTab === 'home' ? 'text-cyan-600 bg-cyan-50 font-bold' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </a>

            {/* Mobile Products Accordion */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`w-full text-left px-4 py-3 text-xs font-semibold flex items-center justify-between ${
                  isProductActive ? 'text-cyan-600 font-bold bg-cyan-50 dark:bg-cyan-950/50' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-cyan-500" />
                  <span>Our Products ({productsList.length})</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileProductsOpen && (
                <div className="bg-slate-50 dark:bg-slate-950 p-2 space-y-1 max-h-64 overflow-y-auto border-t border-slate-200 dark:border-slate-800">
                  {productsList.map((prod) => (
                    <a
                      key={prod.id}
                      href={`/${prod.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTab(prod.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-lg text-xs font-medium flex items-center space-x-3 ${
                        currentTab === prod.id 
                          ? 'bg-cyan-600 text-white font-bold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <img src={prod.image} alt={prod.title} className="w-7 h-7 rounded object-cover flex-shrink-0" />
                      <span className="truncate">{prod.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {mainNavLinks.slice(1).map((link) => (
              <a
                key={link.id}
                href={`/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-lg text-xs font-semibold block ${
                  currentTab === link.id ? 'text-cyan-600 bg-cyan-50 font-bold' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
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
