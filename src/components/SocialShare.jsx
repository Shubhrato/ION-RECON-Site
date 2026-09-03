import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';

// Custom Brand SVG Icons for crisp rendering
const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function SocialShare({
  url = typeof window !== 'undefined' ? window.location.href : 'https://ionrecon.info/',
  title = "Ion Recon | Turnkey Mineral Water Plant Manufacturer & Bottling Lines",
  description = "Explore automatic mineral water bottling plants, 3-in-1 RFC Monoblocks, Commercial RO plants & PET blow molding machinery from Ion Recon, Ghaziabad.",
  variant = 'inline', // 'inline' | 'floating' | 'card'
  theme = 'light'
}) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      href: `https://wa.me/919810920792?text=${encodedTitle}%20-%20${encodedUrl}`
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      color: 'bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 hover:opacity-90 text-white',
      href: 'https://www.instagram.com/reel/DEZsyFPobHq/'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      href: 'https://www.facebook.com/ionrecon/'
    }
  ];

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const isLight = theme === 'light';

  // Variant: Floating Sidebar
  if (variant === 'floating') {
    return (
      <div className="fixed left-4 bottom-24 sm:bottom-6 z-40 hidden md:flex flex-col space-y-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700/60 shadow-2xl">
        <div className="text-[10px] font-bold uppercase tracking-wider text-center text-cyan-400 py-1 border-b border-slate-800">
          Connect
        </div>
        {shareLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-110 shadow-md ${item.color}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
        <button
          onClick={handleCopyLink}
          title="Copy URL"
          className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-transform hover:scale-110 shadow-md"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // Variant: Full Interactive Card
  if (variant === 'card') {
    return (
      <div className={`p-6 rounded-2xl border transition-all ${
        isLight
          ? 'bg-white border-slate-200 shadow-lg'
          : 'bg-slate-900 border-slate-800 shadow-xl'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Share2 className="w-4 h-4 text-cyan-500" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Ion Recon Social Links
              </h4>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Connect on WhatsApp, Instagram & Facebook
              </p>
            </div>
          </div>
          {typeof navigator !== 'undefined' && navigator.share && (
            <button
              onClick={handleNativeShare}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
            >
              Share Page
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {shareLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm transform hover:-translate-y-0.5 ${item.color}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}

          <button
            onClick={handleCopyLink}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Variant: Inline Compact Buttons (Default)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-xs font-semibold mr-1 flex items-center space-x-1 ${
        isLight ? 'text-slate-600' : 'text-slate-400'
      }`}>
        <Share2 className="w-3.5 h-3.5 text-cyan-500 inline" />
        <span>Socials:</span>
      </span>

      {shareLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            className={`p-2 rounded-lg transition-transform hover:scale-105 shadow-sm ${item.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        );
      })}

      <button
        onClick={handleCopyLink}
        title="Copy Link"
        className={`p-2 rounded-lg border transition-all ${
          copied
            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40'
            : isLight
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
