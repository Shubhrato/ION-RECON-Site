import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Clock, User, ArrowRight, CheckCircle2, FileText, Sparkles, X, ChevronRight, Share2, HelpCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';

export default function BlogSection({ onOpenQuoteModal, trackEvent, theme, currentArticleSlug, onSelectArticle }) {
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(
    currentArticleSlug ? BLOG_POSTS.find(b => b.slug === currentArticleSlug) : null
  );

  const categories = ['All', 'Mineral Water Plant', 'CSD Bottling Plant', 'STP Plant', 'ETP Plant', 'BIS & Licensing'];

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const handleArticleClick = (post) => {
    setSelectedArticle(post);
    if (onSelectArticle) onSelectArticle(post.slug);
    trackEvent(`Read Blog Article - ${post.title}`, 'blog_article_view');
  };

  return (
    <section id="blog-section" className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
    }`}>
      {/* Helmet SEO Meta Tags when an article is open */}
      {selectedArticle && (
        <Helmet>
          <title>{selectedArticle.title} | Ion Recon Guides</title>
          <meta name="description" content={selectedArticle.summary} />
          <link rel="canonical" href={`https://ionrecon.info/blog/${selectedArticle.slug}`} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": selectedArticle.title,
              "description": selectedArticle.summary,
              "author": {
                "@type": "Organization",
                "name": "Ion Recon Industries"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Ion Recon Industries",
                "logo": "https://ionrecon.info/images/mineral_water_plant_40bpm.png"
              }
            })}
          </script>
        </Helmet>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>📘 Industrial Knowledge Hub & Machinery Setup Guides</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Mineral Water & Bottling Plant <span className="text-gradient-cyan">Step-by-Step Setup Blueprints</span>
          </h2>

          <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Expert engineering guides, machinery selection blueprints, BIS (ISI IS 14543) licensing process, and budget planning reports.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : isLight 
                    ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={(e) => {
                e.preventDefault();
                handleArticleClick(post);
              }}
              className={`rounded-3xl border p-6 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] group block ${
                isLight ? 'bg-white border-slate-200 shadow-md hover:shadow-xl' : 'bg-slate-900 border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="space-y-4">
                <div className="h-48 rounded-2xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={post.image}
                    alt={`${post.title} - Ion Recon Bottling Machinery Setup Guide`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
                    {post.category}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-cyan-500" />{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className={`text-lg font-bold line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform">
                  Read Complete Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
                <span className="text-[10px] text-slate-400">{post.author.split(',')[0]}</span>
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`max-w-3xl w-full rounded-3xl border p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6 animate-fadeIn ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-bold uppercase">
                <span>{selectedArticle.category}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3">
              <h2 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {selectedArticle.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-cyan-500" />{selectedArticle.author}</span>
                <span>•</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-cyan-500" />{selectedArticle.readTime}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content Sections */}
            <div className="space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200 bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20">
                {selectedArticle.summary}
              </p>

              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2 pt-2">
                  <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {sec.heading}
                  </h3>
                  <div className="whitespace-pre-line text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Help & Custom Project Quote CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-white text-center space-y-4 shadow-xl">
              <h3 className="text-xl font-bold">Want to Setup a {selectedArticle.category} in Your City?</h3>
              <p className="text-xs text-cyan-100 max-w-xl mx-auto">
                Ion Recon provides complete turnkey design, CAD layout, machinery fabrication, installation, and BIS/PCB licensing support.
              </p>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onOpenQuoteModal(`Blog Article Guide CTA - ${selectedArticle.category}`);
                }}
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-cyan-50 transition-colors shadow-lg"
              >
                Get Free Turnkey Consultation & Price Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
