import React, { useState } from 'react';
import { ShieldCheck, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { sendLeadToGoogleSheet } from '../utils/googleSheets';

export default function ContactFormSection({ trackEvent, onFormSuccess, theme }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    capacity: '40 BPM (2,400 BPH - Bestseller)',
    businessStage: 'Planning to Start New Plant',
    budget: '₹34 Lakhs - ₹37 Lakhs',
    message: '',
    source: 'Bottom Page Form'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('Form submitting & pushing to Google Sheets...', 'lead_form_submitted');

    // Send lead data to Google Sheet endpoint
    await sendLeadToGoogleSheet(formData);
    trackEvent(`Data sent to Google Sheet for ${formData.name} (${formData.phone})`, 'google_sheets_post_success');

    setTimeout(() => {
      setSubmitting(false);
      onFormSuccess(formData);
    }, 1000);
  };

  const isLight = theme === 'light';

  return (
    <section className={`py-12 lg:py-20 transition-colors ${
      isLight ? 'bg-slate-50' : 'bg-slate-950'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative transition-all ${
          isLight 
            ? 'bg-white/90 border-slate-200 shadow-xl' 
            : 'glass-panel border-cyan-500/30 bg-slate-900/50'
        }`}>


          <div className="mb-6 pt-1 text-center">
            <h3 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Request Ion Recon Factory Quote</h3>
            <p className={`text-sm mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Get customized technical specs, 40 BPM plant layout & cost estimate in 10 mins.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Your Full Name *</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Ramesh Sharma"
                className={`w-full px-3.5 py-3 rounded-xl text-sm transition-all ${
                  isLight 
                    ? 'bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500/20' 
                    : 'glass-input text-white'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98109 20792"
                  className={`w-full px-3.5 py-3 rounded-xl text-sm transition-all ${
                    isLight 
                      ? 'bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:border-cyan-600' 
                      : 'glass-input text-white'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>State / Location *</label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-3 rounded-xl text-sm ${
                    isLight 
                      ? 'bg-slate-50 border border-slate-300 text-slate-900' 
                      : 'glass-input bg-slate-900 text-white'
                  }`}
                >
                  <option value="">Select State</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (Ghaziabad / NCR)</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana / AP">Telangana / AP</option>
                  <option value="Punjab / Haryana">Punjab / Haryana</option>
                  <option value="Other">Other India Location</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Plant Capacity</label>
                <select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-3 rounded-xl text-sm ${
                    isLight 
                      ? 'bg-slate-50 border border-slate-300 text-slate-900' 
                      : 'glass-input bg-slate-900 text-white'
                  }`}
                >
                  <option value="40 BPM (2,400 BPH - Bestseller)">40 BPM (2,400 BPH - Bestseller)</option>
                  <option value="30 BPM (1,800 BPH)">30 BPM (1,800 BPH)</option>
                  <option value="60 BPM (3,600 BPH)">60 BPM (3,600 BPH)</option>
                  <option value="90 BPM (5,400 BPH)">90 BPM (5,400 BPH)</option>
                  <option value="120 BPM (7,200 BPH)">120 BPM (7,200 BPH)</option>
                  <option value="200 BPM (12,000 BPH)">200 BPM (12,000 BPH)</option>
                  <option value="20L Jar Plant (300-600 JPH)">20L Jar Plant (300-600 JPH)</option>
                  <option value="CSD / Juice Plant">CSD / Juice Line</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Business Stage</label>
                <select
                  name="businessStage"
                  value={formData.businessStage}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-3 rounded-xl text-sm ${
                    isLight 
                      ? 'bg-slate-50 border border-slate-300 text-slate-900' 
                      : 'glass-input bg-slate-900 text-white'
                  }`}
                >
                  <option value="Planning New Setup">New Business Setup</option>
                  <option value="Expanding Existing Plant">Expanding Capacity</option>
                  <option value="Replacing Old Machines">Replacing Old Line</option>
                  <option value="Collecting Market Information">Gathering Quotations</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Estimated Budget Range</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`w-full px-3.5 py-3 rounded-xl text-sm ${
                  isLight 
                    ? 'bg-slate-50 border border-slate-300 text-slate-900' 
                    : 'glass-input bg-slate-900 text-white'
                }`}
              >
                <option value="₹29 Lakhs - ₹32 Lakhs">₹29 Lakhs - ₹32 Lakhs (30 BPM)</option>
                <option value="₹34 Lakhs - ₹37 Lakhs">₹34 Lakhs - ₹37 Lakhs (40 BPM)</option>
                <option value="₹50 Lakhs - ₹84 Lakhs">₹50 Lakhs - ₹84 Lakhs (60 BPM)</option>
                <option value="₹1.0 Crore - ₹1.2 Crore">₹1.0 Crore - ₹1.2 Crore (90 BPM)</option>
                <option value="₹1.6 Crore - ₹1.8 Crore">₹1.6 Crore - ₹1.8 Crore (120 BPM)</option>
                <option value="₹2.5 Crore - ₹3.0 Crore">₹2.5 Crore - ₹3.0 Crore (200 BPM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-4 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-base shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <span className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Syncing with Google Sheets...</span>
                </span>
              ) : (
                <>
                  <span>Request Quote & Specs PDF</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </form>

          <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'
          }`}>
            <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Direct Ion Recon Factory Guarantee
            </span>
            <span>🔒 GST 09AFSPV0532M1ZQ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
