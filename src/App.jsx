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
import SocialShare from './components/SocialShare';

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

// Helper to parse URL path on initial load & popstate
function parseUrlRoute() {
  if (typeof window === 'undefined') {
    return { tab: 'home', product: null, location: null, blogSlug: null };
  }

  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const searchParams = new URLSearchParams(window.location.search);
  const locParam = searchParams.get('location');
  const rawPath = window.location.pathname.replace(/^\/|\/$/g, '');

  const slugToTest = locParam || hash || rawPath;
  if (!slugToTest || slugToTest === 'home') {
    return { tab: 'home', product: null, location: null, blogSlug: null };
  }

  if (slugToTest.startsWith('blog')) {
    const parts = slugToTest.split('/');
    const blogSlug = parts.length > 1 && parts[1] ? parts[1] : null;
    return { tab: 'blog', product: null, location: null, blogSlug };
  }

  const locObj = getLocationBySlug(slugToTest);
  const prodMatch = PLANT_DATA.products.find(p => p.id === slugToTest);

  if (locObj) {
    return { tab: locObj.slug, product: null, location: locObj, blogSlug: null };
  } else if (prodMatch) {
    return { tab: prodMatch.id, product: prodMatch, location: null, blogSlug: null };
  } else {
    return { tab: slugToTest, product: null, location: null, blogSlug: null };
  }
}

export default function App() {
  const [routeState, setRouteState] = useState(() => parseUrlRoute());
  const { tab: currentTab, product: selectedProduct, location: selectedLocation, blogSlug: selectedBlogSlug } = routeState;
  
  // Theme state: DEFAULT IS LIGHT MODE ('light')
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync state when browser Back / Forward buttons are used
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseUrlRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser address bar (pushState) only when route state changes in client UI
  useEffect(() => {
    let targetPath = '/';
    if (selectedProduct) {
      targetPath = `/${selectedProduct.id}`;
    } else if (selectedLocation) {
      targetPath = `/${selectedLocation.slug}`;
    } else if (currentTab === 'blog') {
      targetPath = selectedBlogSlug ? `/blog/${selectedBlogSlug}` : '/blog';
    } else if (currentTab !== 'home') {
      targetPath = `/${currentTab}`;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  }, [currentTab, selectedProduct, selectedLocation, selectedBlogSlug]);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('Default CTA');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState(null);
  const [thankYouModalOpen, setThankYouModalOpen] = useState(false);

  const handleOpenVideoModal = (url = null, title = null) => {
    setActiveVideoUrl(url);
    setActiveVideoTitle(title);
    setVideoModalOpen(true);
  };
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

  const handleSelectTab = (tab) => {
    const prodMatch = PLANT_DATA.products.find(p => p.id === tab);
    const locObj = getLocationBySlug(tab);

    if (prodMatch) {
      setRouteState({ tab: prodMatch.id, product: prodMatch, location: null, blogSlug: null });
    } else if (locObj) {
      setRouteState({ tab: locObj.slug, product: null, location: locObj, blogSlug: null });
    } else {
      setRouteState({ tab, product: null, location: null, blogSlug: null });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setRouteState({ tab: product.id, product, location: null, blogSlug: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLocation = (slug) => {
    const locObj = getLocationBySlug(slug);
    if (locObj) {
      setRouteState({ tab: locObj.slug, product: null, location: locObj, blogSlug: null });
    } else {
      setRouteState({ tab: slug, product: null, location: null, blogSlug: null });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug) => {
    setRouteState({ tab: 'blog', product: null, location: null, blogSlug: slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canonicalUrl = selectedProduct
    ? `https://ionrecon.info/${selectedProduct.id}`
    : selectedLocation
    ? `https://ionrecon.info/${selectedLocation.slug}`
    : currentTab === 'blog' && selectedBlogSlug
    ? `https://ionrecon.info/blog/${selectedBlogSlug}`
    : currentTab === 'home'
    ? 'https://ionrecon.info/'
    : `https://ionrecon.info/${currentTab}`;

  return (
    <div className={`min-h-screen flex flex-col font-sans relative selection:bg-cyan-500 selection:text-slate-950 transition-colors ${
      theme === 'light' ? 'light-mode bg-slate-50 text-slate-900' : 'dark-mode bg-slate-950 text-slate-100'
    }`}>
      <Helmet>
        <title>Ion Recon | Mineral Water Plant Manufacturer & Bottling Machine Ghaziabad</title>
        <meta name="description" content="Ion Recon: Premier turnkey mineral water plant &amp; bottling machine manufacturer in Ghaziabad. Custom automatic filling lines, commercial RO &amp; CSD plants." />
        <meta name="keywords" content="Ion Recon, Ion Recon Ghaziabad, Ion Recon Industries, Ion Recon Sahibabad, Mineral Water Plant Manufacturer, Packaged Drinking Water Plant Setup, 30 BPM Mineral Water Plant, 40 BPM Package Drinking Water Plant, 60 BPM Mineral Water Plant, 90 BPM Bottling Line, 120 BPM Automatic Mineral Water Plant, 200 BPM High Speed Bottling Line, Turnkey Mineral Water Plant Setup, Mineral Water Plant Setup Cost in India, Mineral Water Plant Manufacturer in Ghaziabad Delhi NCR UP, RFC Monoblock Bottle Filling Machine, 3 in 1 Automatic Bottle Filling Machine, Rinser Filler Capper Monoblock, Automatic 20 Litre Jar Filling Machine, 20L Water Jar Washer Filler Capper, PET Bottle Stretch Blow Molding Machine, Semi Auto 2 Cavity PET Blow Molding Machine, Semi Auto 4 Cavity PET Blow Molding Machine, Fully Automatic 4 Cavity PET Blow Molding Machine, Fully Automatic 6 Cavity Servo PET Blow Molder, Industrial SS RO Water Treatment Plant, Commercial Stainless Steel RO Plant, 1000 LPH RO Water Plant, 2000 LPH SS RO System, 5000 LPH Industrial RO Plant, Ozonator for Mineral Water Plant, UV Water Sterilizer, BOPP Hot-Melt Bottle Labeling Machine, Automatic Self-Adhesive Sticker Labeling Machine, Automatic Web Sealer Shrink Wrapping Machine, Semi Automatic Shrink Wrapping Heating Tunnel, Automatic Water Pouch Packing Machine, Continuous Inkjet CIJ Coder Neelkamal, Thermal Inkjet TIJ Online Batch Coding Machine, MRP Date Printing Machine for PET Bottles, BIS ISI Water Testing Laboratory Equipment Package, Carbonated Soft Drink CSD Plant, Isobaric Counter Pressure Beverage Filling Machine, RTS Fruit Juice Bottling Plant, Mineral Water Plant Profit Margin in India" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      {/* Sticky Header Navbar with Theme Switcher */}
      <Navbar
        onOpenQuoteModal={handleOpenQuoteModal}
        currentTab={currentTab}
        setCurrentTab={handleSelectTab}
        trackEvent={trackEvent}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleSelectTab('home')}
            onSelectProduct={handleSelectProduct}
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
          />
        ) : selectedLocation ? (
          <LocationPage
            location={selectedLocation}
            onBack={() => handleSelectTab('home')}
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
            onSelectLocation={handleSelectLocation}
          />
        ) : currentTab === 'locations' ? (
          <LocationDirectory
            onSelectLocation={handleSelectLocation}
            theme={theme}
          />
        ) : currentTab === 'blog' ? (
          <BlogSection
            onOpenQuoteModal={handleOpenQuoteModal}
            trackEvent={trackEvent}
            theme={theme}
            currentArticleSlug={selectedBlogSlug}
            onSelectArticle={handleSelectArticle}
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
              onOpenVideoModal={handleOpenVideoModal}
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
              onSelectProduct={handleSelectProduct}
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
              onOpenVideoModal={handleOpenVideoModal}
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
        setCurrentTab={handleSelectTab}
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
        onClose={() => {
          setVideoModalOpen(false);
          setActiveVideoUrl(null);
          setActiveVideoTitle(null);
        }}
        onOpenQuoteModal={handleOpenQuoteModal}
        trackEvent={trackEvent}
        theme={theme}
        videoUrl={activeVideoUrl}
        videoTitle={activeVideoTitle}
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

      {/* Floating Social Media Share Bar */}
      <SocialShare variant="floating" theme={theme} />

    </div>
  );
}
