import React, { useState } from 'react';
import { X, FileText, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { sendLeadToGoogleSheet } from '../utils/googleSheets';

export default function LeadModal({ isOpen, onClose, triggerSource, trackEvent, onFormSuccess, theme }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    capacity: '40 BPM (2,400 BPH - Bestseller)',
    businessType: 'Mineral Water Plant',
    budget: '₹34 Lakhs - ₹37 Lakhs',
    message: '',
    source: triggerSource || 'Quotation Popup Modal'
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent(`Modal Form submitting & syncing to Google Sheets (${triggerSource})...`, 'lead_form_submitted');

    // Send lead to Google Sheets
    await sendLeadToGoogleSheet({ ...formData, source: triggerSource || 'Quotation Popup Modal' });
    trackEvent(`Google Sheets Lead Synced: ${formData.name}`, 'google_sheets_post_success');

    setTimeout(() => {
      setSubmitting(false);
      onFormSuccess(formData);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 border transition-all ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-cyan-500/40 text-white'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isLight ? 'bg-slate-100 text-slate-700 hover:bg-cyan-600 hover:text-white' : 'bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-slate-950'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase mb-2 border ${
            isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950 text-cyan-400 border-cyan-500/30'
          }`}>
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Google Sheets Auto-Sync • {triggerSource || 'General'}</span>
          </div>
          <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Get Ion Recon Price & CAD Layout</h3>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Our technical team will call you back within 10 minutes with full project breakdown.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input text-white'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Phone / Mobile Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98109 20792"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                  isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input text-white'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Email Address</label>
              <input
                type="email"
                placeholder="info@ionrecon.co.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                  isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input text-white'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>State / City *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ghaziabad, UP"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                  isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input text-white'
                }`}
              />
            </div>
            <div>
              <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Plant Capacity</label>
              <select
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                  isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input bg-slate-900 text-white'
                }`}
              >
                <option value="40 BPM (2,400 BPH - Bestseller)">40 BPM (2,400 BPH - Bestseller)</option>
                <option value="30 BPM (1,800 BPH)">30 BPM (1,800 BPH)</option>
                <option value="60 BPM (3,600 BPH)">60 BPM (3,600 BPH)</option>
                <option value="90 BPM (5,400 BPH)">90 BPM (5,400 BPH)</option>
                <option value="120 BPM (7,200 BPH)">120 BPM (7,200 BPH)</option>
                <option value="200 BPM (12,000 BPH)">200 BPM (12,000 BPH)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Specific Requirement / Message</label>
            <textarea
              rows="2"
              placeholder="Mention any specific machine requirement, water source, or land availability..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm ${
                isLight ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'glass-input text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-base shadow-xl shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            {submitting ? (
              <span>Syncing with Google Sheets...</span>
            ) : (
              <>
                <span>Request Quote & Sync Data</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className={`mt-4 text-center text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          🔒 Direct Ion Recon Manufacturer Guarantee • Auto Google Sheet Sync
        </div>

      </div>
    </div>
  );
}
