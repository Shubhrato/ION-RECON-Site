import React, { useState } from 'react';
import { X, Play, Factory, CheckCircle2 } from 'lucide-react';
import { PLANT_DATA } from '../data/plantData';

export default function VideoModal({ isOpen, onClose, onOpenQuoteModal, trackEvent, theme, videoUrl, videoTitle }) {
  const [videoError, setVideoError] = useState(false);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const activeVideo = videoUrl || "/images/jar-filling-machine-demo.mp4";
  const titleText = videoTitle || "Ion Recon Industrial Bottling Plant Video Demo";

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`max-w-3xl w-full rounded-3xl overflow-hidden border shadow-2xl relative transition-all ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-cyan-500/40 text-white'
      }`}>
        
        {/* Header Bar */}
        <div className={`p-4 border-b flex justify-between items-center ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center space-x-2">
            <Factory className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {titleText}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isLight ? 'bg-slate-200 text-slate-700 hover:bg-cyan-600 hover:text-white' : 'bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-950'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Container */}
        <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              src={activeVideo}
              controls
              autoPlay
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Fallback Animated Graphic Preview if custom video file not yet placed */}
              <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
              
              <div className="relative z-10 text-center px-6">
                <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto mb-4 animate-pulse">
                  <Play className="w-10 h-10 fill-cyan-400 ml-1" />
                </div>
                <h4 className="text-xl font-extrabold text-white">40 BPM / 60 BPM Automatic Bottling Line</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Featuring Rinser, Gravity Filler, Rotary Capper & BOPP Shrink Labeling System.
                </p>

                <div className="mt-4 p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] text-amber-300">
                  📁 To play your own custom video: Place your video file inside <code className="text-cyan-300">public/plant_video.mp4</code>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-slate-200">
                  <span className="flex items-center bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-1" /> 2,400 - 3,600 Bottles / Hour
                  </span>
                  <span className="flex items-center bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-1" /> SS 304 Food Grade
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Want to inspect this machine live at our Sahibabad Ghaziabad plant?
          </span>
          <button
            onClick={() => {
              onClose();
              trackEvent('Video Modal Quote Clicked', 'conversion_quote_open');
              onOpenQuoteModal('Video Modal Footer');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs hover:bg-cyan-500 transition-colors shadow-md"
          >
            Request Factory Visit & Live Quote
          </button>
        </div>

      </div>
    </div>
  );
}
