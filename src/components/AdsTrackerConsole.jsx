import React, { useState } from 'react';
import { Activity, ShieldCheck, Terminal, X, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function AdsTrackerConsole({ logs }) {
  const [minimized, setMinimized] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm w-full hidden md:block">
      <div className="glass-panel rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden bg-slate-950/95">
        
        {/* Console Top Header */}
        <div 
          onClick={() => setMinimized(!minimized)}
          className="p-3 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-800/80 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200">Google Ads Tracker & GA4 Live Console</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded font-mono font-bold border border-cyan-500/30">
              QS: 9.8/10
            </span>
            <button className="text-slate-400 hover:text-white">
              {minimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Console Expanded Body */}
        {!minimized && (
          <div className="p-3.5 space-y-3 font-mono text-[11px]">
            
            {/* Tag Manager Status */}
            <div className="grid grid-cols-2 gap-2 text-[10px] pb-2 border-b border-slate-800 text-slate-300">
              <div className="flex items-center space-x-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>GTM-584729 Tag Active</span>
              </div>
              <div className="flex items-center space-x-1 text-cyan-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>GA4-MEASURE-READY</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Meta Pixel ID Active</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Speed: 98/100 Core Vitals</span>
              </div>
            </div>

            {/* Event Logs Stream */}
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              <div className="text-[10px] text-slate-500 uppercase font-sans font-bold">Realtime Conversion Stream:</div>
              {logs.length === 0 ? (
                <div className="text-slate-500 italic">No user interaction logged yet. Click CTAs, WhatsApp, or submit form to fire triggers.</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="bg-slate-900/90 p-2 rounded border border-slate-800 text-slate-200">
                    <span className="text-cyan-400 font-bold">{log.time}</span> • <span className="text-emerald-400 font-bold">[{log.eventType}]</span>: {log.message}
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
