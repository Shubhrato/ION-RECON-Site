import React, { useState } from 'react';
import { Play, Eye, Video } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function GallerySection({ onOpenVideoModal, trackEvent, theme }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState('All');

  const isLight = theme === 'light';

  const categories = ['All', 'Machinery', 'RO Plant', 'Jar Plant', 'Blow Molding', 'Factory'];

  const filteredGallery = PLANT_DATA.gallery.filter(item => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <section className={`py-16 lg:py-24 border-t relative transition-colors ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className={`font-extrabold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            Ion Recon Factory Showcase
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mt-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Real Factory Setup & <span className="text-gradient-cyan">Live Production Lines</span>
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Explore our Sahibabad, Ghaziabad manufacturing facility and operational turnkey plant installations across India.
          </p>
        </div>

        {/* Video Banner Callout */}
        <div className={`mb-10 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${
          isLight 
            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 text-white border-cyan-400' 
            : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-cyan-500/30 text-white'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Watch High-Speed Bottling Line Video Demo</h3>
              <p className="text-xs text-cyan-100 mt-1">See 40 BPM / 60 BPM automatic RFC filling monoblock machine operating live in client factory.</p>
            </div>
          </div>
          <button
            onClick={() => {
              trackEvent('Gallery Video Demo Clicked', 'video_modal_opened');
              onOpenVideoModal();
            }}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-lg whitespace-nowrap transition-transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-slate-900 text-slate-900" />
            <span>Play Factory Video</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-cyan-600 text-white font-bold shadow-md'
                  : isLight
                    ? 'bg-slate-100 text-slate-700 border border-slate-300 hover:border-cyan-500'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImg(item)}
              className={`group relative h-64 rounded-2xl overflow-hidden cursor-pointer border ${
                isLight ? 'bg-slate-100 border-slate-200 shadow-md hover:shadow-xl' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <img 
                src={item.image} 
                alt={`${item.title} - Ion Recon Turnkey Mineral Water Plant Ghaziabad`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Badge for Video items */}
              {item.isVideo && (
                <div className="absolute top-3 left-3 bg-cyan-600/90 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md flex items-center space-x-1 shadow-md">
                  <Play className="w-3 h-3 fill-white" />
                  <span>Video Demo</span>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block">{item.category}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                  {item.isVideo ? <Play className="w-4 h-4 fill-white" /> : <Eye className="w-4 h-4" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImg && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`max-w-4xl w-full rounded-3xl overflow-hidden border shadow-2xl relative ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-cyan-500/30'
            }`}>
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white font-bold flex items-center justify-center hover:bg-cyan-600 transition-colors z-20"
              >
                ✕
              </button>
              
              {selectedImg.video ? (
                <div className="aspect-video bg-slate-950">
                  <video src={selectedImg.video} controls autoPlay className="w-full h-full object-cover" />
                </div>
              ) : (
                <img src={selectedImg.image} alt={selectedImg.title} className="w-full max-h-[70vh] object-cover" />
              )}

              <div className={`p-6 flex justify-between items-center ${isLight ? 'bg-slate-50' : 'bg-slate-950'}`}>
                <div>
                  <span className="text-xs text-cyan-600 font-bold uppercase">{selectedImg.category}</span>
                  <h3 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedImg.title}</h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedImg(null);
                    onOpenVideoModal(selectedImg.video, selectedImg.title);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors"
                >
                  Watch Full Video Demo
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
