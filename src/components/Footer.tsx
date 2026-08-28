import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Globe, 
  ArrowUp,
  LayoutDashboard,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenPostAd: () => void;
  onOpenMap: () => void;
  onOpenContact: () => void;
  onOpenInstallApp?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenPostAd,
  onOpenMap,
  onOpenContact,
  onOpenInstallApp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-[#700f2b] via-[#8A1538] to-[#5a0c22] text-white py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
              Start Selling Across Qatar Today
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Have a Car, Villa, Watch or Tech to Sell in Doha?
            </h3>
            <p className="text-xs text-rose-100 mt-1 max-w-xl">
              Join over 120,000 active buyers in Qatar. Post your classified ad for free with instant buyer inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenPostAd}
              className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Post Free Ad Now
            </button>
            <a
              href="tel:+97477315415"
              className="px-4 py-3 bg-slate-950/40 hover:bg-slate-950/60 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>{PLATFORM_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Qatar Hotline */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The modern Qatar marketplace inspired by Qatar Living and Mzad Qatar. Buy and sell luxury cars, waterfront properties in The Pearl and Lusail, high-end electronics, and verified services with Escrow safety.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-4 h-4 text-[#8A1538]" />
                <span>Qatar Direct Helpline:</span>
              </div>
              <a
                href="tel:+97477315415"
                className="text-base font-black text-amber-400 hover:underline block font-mono"
              >
                {PLATFORM_PHONE_DISPLAY}
              </a>
              <span className="text-[11px] text-slate-500 block">
                Available daily across Doha, Al Wakrah, Lusail & Al Khor.
              </span>
            </div>
          </div>

          {/* Col 2: Popular Categories in Qatar */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Top Qatar Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Toyota Land Cruiser & 4x4</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Pearl-Qatar Apartments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lusail City Studios & Villas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rolex & Luxury Watches</a></li>
              <li><a href="#" className="hover:text-white transition-colors">iPhone 16 Pro Max Qatar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gulf Craft Speed Boats</a></li>
            </ul>
          </div>

          {/* Col 3: Qatar Municipalities */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Browse by Location
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Doha (West Bay & Al Sadd)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Pearl-Qatar (Porto Arabia)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Lusail City (Marina & Fox Hills)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Al Wakrah & Souq Waqif</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Al Khor & Al Daayen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Al Rayyan & Education City</a></li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Support & Admin
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors text-left">
                  Customer Support Hub
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Admin Dashboard
                </button>
              </li>
              {onOpenInstallApp && (
                <li>
                  <button onClick={onOpenInstallApp} className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> Install Mobile App (PWA)
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenMap} className="hover:text-white transition-colors text-left">
                  Interactive Qatar Map
                </button>
              </li>
              <li><a href="#contact-section" className="hover:text-white transition-colors">Escrow Protection Info</a></li>
              <li><a href="#contact-section" className="hover:text-white transition-colors">Metrash2 Verification Safety</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Qatar 2030 Vision & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MarketPro Qatar (سوق ماركت برو قطر). All rights reserved.</span>
            <span>•</span>
            <span className="text-[#8A1538] font-bold">State of Qatar</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Ministry of Commerce & Industry Compliant
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
