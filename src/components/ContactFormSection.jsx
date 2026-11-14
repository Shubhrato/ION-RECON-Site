import React, { useState } from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { sendLeadToGoogleSheet, isValidPhone } from '../utils/googleSheets';

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
    source: 'Bottom Page Form',
    company_website: '' // Anti-bot honeypot field
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Phone validation (10 digits Indian mobile)
    if (!isValidPhone(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setSubmitting(true);
    trackEvent('Form submitting & pushing to Google Sheets...', 'lead_form_submitted');

    // Send lead data to Google Sheet endpoint with sanitization & rate-limit guards
    const res = await sendLeadToGoogleSheet(formData);

    if (res.rateLimited) {
      setErrorMessage('Please wait a few seconds before submitting another request.');
      setSubmitting(false);
      return;
    }

    trackEvent(`Data sent to Google Sheet for ${formData.name} (${formData.phone})`, 'google_sheets_post_success');

    setTimeout(() => {
      setSubmitting(false);
      onFormSuccess(formData);
    }, 800);
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

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Anti-Bot Honeypot Field (Hidden from real users) */}
            <input
              type="text"
              name="company_website"
              value={formData.company_website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}
            />

            <div>
              <label className={`block text-xs font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Your Full Name *</label>
              <input
                type="text"
                required
                maxLength={80}
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
                  maxLength={15}
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
                <option value="₹32 Lakhs - ₹36 Lakhs">₹32 Lakhs - ₹36 Lakhs (40 BPM)</option>
                <option value="₹50 Lakhs - ₹84 Lakhs">₹50 Lakhs - ₹84 Lakhs (60 BPM)</option>
                <option value="₹1.0 Crore - ₹1.2 Crore">₹1.0 Crore - ₹1.2 Crore (90 BPM)</option>
                <option value="₹1.6 Crore - ₹1.8 Crore">₹1.6 Crore - ₹1.8 Crore (120 BPM)</option>
                <option value="₹2.5 Crore - ₹3.0 Crore">₹2.5 Crore - ₹3.0 Crore (200 BPM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-4 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-base shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>Sending to Factory Team...</span>
              ) : (
                <>
                  <span>Get Detailed Machine Pricing & Project Breakdown</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
