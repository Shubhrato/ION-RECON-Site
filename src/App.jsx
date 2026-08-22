import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SeoContent from './components/SeoContent';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import WhyChooseUs from './components/WhyChooseUs';
import ProductsGrid from './components/ProductsGrid';
import CapacityRoiCalculator from './components/CapacityRoiCalculator';
import BusinessBenefits from './components/BusinessBenefits';
import ProcessTimeline from './components/ProcessTimeline';
import GallerySection from './components/GallerySection';
import TestimonialsSlider from './components/TestimonialsSlider';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import StickyBottomBar from './components/StickyBottomBar';
import LeadModal from './components/LeadModal';
import VideoModal from './components/VideoModal';
import ContactFormSection from './components/ContactFormSection';

import ProductDetailPage from './components/ProductDetailPage';
import LocationPage from './components/LocationPage';
import LocationDirectory from './components/LocationDirectory';
import BlogSection from './components/BlogSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import Footer from './components/Footer';
import { PLANT_DATA } from './data/plantData';
import { getLocationBySlug } from './data/locationData';
import { GOOGLE_APPS_SCRIPT_CODE, getSheetUrl, setCustomSheetUrl } from './utils/googleSheets';
import { CheckCircle2, FileSpreadsheet, Copy, Check, Link } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Theme state: DEFAULT IS LIGHT MODE ('light')
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Check URL on initial mount for SEO location slug (e.g. /mineral-water-plant-manufacturer-in-uttar-pradesh)
  useEffect(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const searchParams = new URLSearchParams(window.location.search);
    const locParam = searchParams.get('location');
    const path = window.location.pathname.replace(/^\//, '');

    const slugToTest = locParam || hash || path;
    if (slugToTest) {
      if (slugToTest.startsWith('blog')) {
        setCurrentTab('blog');
      } else {
        const locObj = getLocationBySlug(slugToTest);
        if (locObj) {
          setSelectedLocation(locObj);
          setCurrentTab(locObj.slug);
        } else if (['40-bpm-mineral-water-plant', '60-bpm-mineral-water-plant', 'bottle-filling-machine', 'pet-blowing-machine', 'ss-ro-plant', 'jar-filling-machine', 'bopp-labeling-machine', 'shrink-wrapping-machine', 'csd-project', 'rts-juice-dairy-plant', 'water-pouch-packing-machine', 'locations', 'roi-calculator', 'faqs'].includes(slugToTest)) {
          setCurrentTab(slugToTest);
        }
      }
    }
  }, []);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Default CTA');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState(null);
  const [showScriptCode, setShowScriptCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputSheetUrl, setInputSheetUrl] = useState(getSheetUrl());
  const [urlSaved, setUrlSaved] = useState(false);

  // Live Conversion Tracking Logs
  const [trackerLogs, setTrackerLogs] = useState([
    { time: new Date().toLocaleTimeString(), eventType: 'page_view', message: 'User landed on Ion Recon Mineral Water Plant Landing Page (Google Ads Target)' }
  ]);

  const trackEvent = (message, eventType = 'custom_event') => {
    const time = new Date().toLocaleTimeString();
    setTrackerLogs((prev) => [{ time, eventType, message }, ...prev.slice(0, 15)]);
    
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventType, message });
    }
  };

  const handleOpenQuoteModal = (source = 'General CTA') => {
    setModalSource(source);
    setQuoteModalOpen(true);
  };

  const handleFormSuccess = (formData) => {
    setLastSubmittedLead(formData);
    setThankYouModalOpen(true);
    trackEvent(`Thank You Page Triggered & Synced to Google Sheet for ${formData.name}`, 'conversion_thank_you_page');
  };

  const copyScriptCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveSheetUrl = () => {
    setCustomSheetUrl(inputSheetUrl);
    setUrlSaved(true);
    trackEvent('Custom Google Sheet URL updated', 'google_sheet_url_saved');
    setTimeout(() => setUrlSaved(false), 2500);
  };

  // Scroll to top when tab changes or reset view and update pushState URL
  useEffect(() => {
    const targetPath = currentTab === 'home' ? '/' : `/${currentTab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    const locObj = getLocationBySlug(currentTab);
    if (locObj) {
      setSelectedLocation(locObj);
      setSelectedProduct(null);
    } else if (['40-bpm-mineral-water-plant', '60-bpm-mineral-water-plant', 'bottle-filling-machine', 'pet-blowing-machine', 'ss-ro-plant', 'jar-filling-machine', 'bopp-labeling-machine', 'shrink-wrapping-machine', 'csd-project', 'rts-juice-dairy-plant', 'water-pouch-packing-machine'].includes(currentTab)) {
      const match = PLANT_DATA.products.find(p => p.id === currentTab);
      if (match) {
        setSelectedProduct(match);
      }
      setSelectedLocation(null);
    } else {
      setSelectedProduct(null);
      setSelectedLocation(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className={`min-h-screen flex flex-col font-sans relative selection:bg-cyan-500 selection:text-slate-950 transition-colors ${
      theme === 'light' ? 'light-mode bg-slate-50 text-slate-900' : 'dark-mode bg-slate-950 text-slate-100'
    }`}>
      <Helmet>
        <title>Ion Recon | Mineral Water Plant Manufacturer & Bottling Machine Ghaziabad</title>
        <meta name="description" content="Ion Recon Ghaziabad is India's leading Mineral Water Plant Manufacturer & Turnkey Solutions Supplier. 40 BPM 30 BPM 60 BPM packaged drinking water plants, RFC monoblock filling machines, SS RO plants & PET blow molding machinery." />
        <meta name="keywords" content="Ion Recon, Ion Recon Ghaziabad, Ion Recon Industries, Mineral Water Plant Manufacturer, Packaged Drinking Water Plant Setup, 40 BPM Mineral Water Plant, 30 BPM Mineral Water Plant, 60 BPM Mineral Water Plant, 90 BPM Bottling Line, 120 BPM Automatic Water Plant, Turnkey Mineral Water Plant Manufacturer, RFC Monoblock Bottle Filling Machine, 3 in 1 Automatic Bottle Filling Machine, Rinser Filler Capper Monoblock, 20 Litre Jar Filling Machine, Automatic 20L Water Jar Washing Filling Capping Machine, PET Bottle Making Machine, PET Stretch Blow Molding Machine, BOPP Hot Melt Bottle Labeling Machine, Automatic Web Sealer Shrink Wrapping Machine, Industrial SS RO Water Treatment Plant, 1000 LPH RO Water Plant, 2000 LPH SS RO System, Commercial RO Plant Manufacturer, Automatic Water Pouch Packing Machine, Carbonated Soft Drink CSD Plant, RTS Fruit Juice Line, Mineral Water Plant Setup Cost in India, 40 BPM Mineral Water Plant Price, BIS ISI License Setup, Mineral Water Plant Profit Margin, Mineral Water Plant Manufacturer in Ghaziabad Delhi NCR UP" />
        <link rel="canonical" href={currentTab === 'home' ? 'https://ionrecon.info/' : `https://ionrecon.info/${currentTab}`} />
      </Helmet>
      
      {/* Sticky Header Navbar with Theme Switcher */}
      <Navbar
        onOpenQuoteModal={handleOpenQuoteModal}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        trackEvent={trackEvent}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => {
              setSelectedProduct(null);
              setCurrentTab('home');
            }}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
          />
        ) : selectedLocation ? (
          <LocationPage
            location={selectedLocation}
            onBack={() => {
              setSelectedLocation(null);
              setCurrentTab('home');
            }}
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
            onSelectLocation={(slug) => {
              setCurrentTab(slug);
            }}
          />
        ) : currentTab === 'locations' ? (
          <LocationDirectory
            onSelectLocation={(slug) => {
              setCurrentTab(slug);
            }}
            theme={theme}
          />
        ) : currentTab === 'blog' ? (
          <BlogSection
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
          />
        ) : currentTab === 'roi-calculator' ? (
          <div className="py-8">
            <CapacityRoiCalculator
              onOpenQuoteModal={handleOpenQuoteModal}
              trackEvent={trackEvent}
              theme={theme}
            />
          </div>
        ) : currentTab === 'faqs' ? (
          <div className="py-8">
            <FAQSection
              onOpenQuoteModal={handleOpenQuoteModal}
              trackEvent={trackEvent}
              theme={theme}
            />
          </div>
        ) : (
          <>
            {/* Above the Fold Hero Image */}
            <HeroSection
              onOpenQuoteModal={handleOpenQuoteModal}
              onOpenVideoModal={() => setVideoModalOpen(true)}
              trackEvent={trackEvent}
              theme={theme}
            />

            {/* Trust Bar with key metrics */}
            <TrustBar theme={theme} />

            {/* Why Choose Us Cards */}
            <WhyChooseUs
              onOpenQuoteModal={handleOpenQuoteModal}
              trackEvent={trackEvent}
              theme={theme}
            />

            {/* Products Grid Showcase */}
            <ProductsGrid
              onOpenQuoteModal={handleOpenQuoteModal}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              trackEvent={trackEvent}
              theme={theme}
            />

            {/* 7-Step Turnkey Process Timeline */}
            <ProcessTimeline theme={theme} />

            {/* Turnkey Project Case Studies */}
            <CaseStudiesSection
              onOpenQuoteModal={handleOpenQuoteModal}
              trackEvent={trackEvent}
              theme={theme}
            />

            {/* Photo & Video Installation Gallery */}
            <GallerySection
              onOpenVideoModal={() => setVideoModalOpen(true)}
              trackEvent={trackEvent}
              theme={theme}
            />

            {/* Verified Testimonials */}
            <TestimonialsSlider theme={theme} />

            {/* End of Page Lead Form */}
            <ContactFormSection
              trackEvent={trackEvent}
              onFormSuccess={handleFormSuccess}
              theme={theme}
            />

            {/* SEO Content Block */}
            <SeoContent theme={theme} />

            {/* Conversion CTA Banner before Footer */}
            <CTASection
              onOpenQuoteModal={handleOpenQuoteModal}
              trackEvent={trackEvent}
              theme={theme}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenQuoteModal={handleOpenQuoteModal}
        theme={theme}
      />

      {/* Sticky Mobile/Desktop Bottom CTA Bar */}
      <StickyBottomBar
        onOpenQuoteModal={handleOpenQuoteModal}
        trackEvent={trackEvent}
        theme={theme}
      />

      {/* Lead Generation Modal */}
      <LeadModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        triggerSource={modalSource}
        trackEvent={trackEvent}
        onFormSuccess={handleFormSuccess}
        theme={theme}
      />

      {/* Video Demonstration Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onOpenQuoteModal={handleOpenQuoteModal}
        trackEvent={trackEvent}
        theme={theme}
      />



      {/* Thank You / Conversion Success Modal */}
      {thankYouModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl text-center space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-500 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Quotation Request & Sheet Synced!</h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Thank you <strong className="text-slate-900 dark:text-white">{lastSubmittedLead?.name || 'Valued Client'}</strong>! Your lead details have been submitted and automatically logged. Ion Recon's Senior Engineer will contact you at <strong className="text-cyan-600 dark:text-cyan-400">{lastSubmittedLead?.phone}</strong> within 10 minutes.
            </p>



            <button
              onClick={() => setThankYouModalOpen(false)}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/20"
            >
              Close & Continue Browsing
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
