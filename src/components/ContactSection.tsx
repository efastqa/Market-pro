import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface ContactSectionProps {
  onOpenChat: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#8A1538] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 Dedicated Qatar Customer Care
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Get in Touch with <span className="text-[#8A1538] dark:text-rose-400">MarketPro Qatar</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Have questions about posting an ad, verifying your Qatar ID, or our Escrow buyer protection? We're here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Call & WhatsApp & Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Phone Hotline Hero Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#700f2b] to-slate-950 text-white shadow-xl border border-rose-900/40 space-y-4 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-rose-600/20 rounded-full blur-2xl"></div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wide block">
                    Official Qatar Helpline
                  </span>
                  <a
                    href="tel:+97477315415"
                    className="text-2xl font-black text-white hover:text-amber-300 transition-colors font-mono tracking-tight"
                  >
                    {PLATFORM_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Direct phone and WhatsApp support for all Qatar buyers and sellers. Our Doha based support team assists in both Arabic and English.
              </p>

              {/* Instant Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:+97477315415"
                  className="py-3 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs sm:text-sm text-center shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#8A1538]" />
                  Call Hotline
                </a>
                <a
                  href={PLATFORM_WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm text-center shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Qatar Headquarters & Details */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Doha Headquarters</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Al Funduq Street, West Bay Commercial District, Tower 4, 14th Floor, Doha, State of Qatar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Customer Support Hours</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Sun - Thu: 8:00 AM – 9:00 PM AST<br />
                    Fri - Sat: 1:00 PM – 10:00 PM AST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Email Assistance</h4>
                  <a href="mailto:support@marketpro.qa" className="text-xs text-[#8A1538] dark:text-rose-400 font-semibold hover:underline">
                    support@marketpro.qa
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Support Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Thank you for reaching out to MarketPro Qatar. One of our support officers will contact you shortly at <strong className="text-slate-900 dark:text-white">{formData.phone || formData.email || '+974 77315415'}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#8A1538] text-white text-xs font-bold shadow-md"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Send Us a Direct Support Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jassim Al-Sulaiti"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Qatar Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+974 XXXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.qa"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Ad Boost & VIP Upgrade">Ad Boost & VIP Upgrade</option>
                      <option value="Escrow & Payment Assistance">Escrow & Payment Assistance</option>
                      <option value="QID Seller Verification">QID Seller Verification</option>
                      <option value="Report Listing or Scam">Report Listing or Scam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can our Qatar customer care team assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Immediate hotline: <strong className="text-[#8A1538] dark:text-rose-400">{PLATFORM_PHONE_DISPLAY}</strong>
                  </span>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#8A1538] to-rose-700 hover:from-rose-800 hover:to-rose-900 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
