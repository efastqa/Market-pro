import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Car, 
  FileCheck2, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageSquare,
  Lock
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface MetrashGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetrashGuideModal: React.FC<MetrashGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'vehicle' | 'fahes' | 'property' | 'escrow'>('vehicle');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-[#8A1538] dark:text-rose-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Qatar Metrash2 & Safe Trading Handbook
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                دليل النقل الرسمي عبر مطراش2 وضمان الصفقات في قطر
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('vehicle')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'vehicle'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Metrash2 Vehicle Transfer
          </button>

          <button
            onClick={() => setActiveTab('fahes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'fahes'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" /> Fahes Centers in Qatar
          </button>

          <button
            onClick={() => setActiveTab('property')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'property'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Property Tawtheeq & Title
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'escrow'
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protection
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {activeTab === 'vehicle' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                How to Transfer Vehicle Ownership via Metrash2 (نقل ملكية مركبة)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Official Ministry of Interior (MOI) Qatar digital procedure takes under 3 minutes without visiting Traffic Department.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Seller Initiates Transfer</h4>
                  <p className="text-xs text-slate-500">
                    Seller opens Metrash2 &gt; Traffic &gt; Vehicle Services &gt; Ownership Transfer. Enters Buyer QID and plate number.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Buyer Approves & Pays Fee</h4>
                  <p className="text-xs text-slate-500">
                    Buyer gets instant SMS notification in Metrash2, accepts transfer, and pays 200 QAR MOI transfer fee via QPay / NAPS.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Valid Insurance & Fahes</h4>
                  <p className="text-xs text-slate-500">
                    Vehicle must have valid Istimara (road registration), active third-party or comprehensive insurance, and cleared Fahes inspection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8A1538] text-white flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Digital Istimara Delivered</h4>
                  <p className="text-xs text-slate-500">
                    Digital registration card appears immediately in Metrash2 Wallet. Physical card can be picked up at QPost or self-service kiosk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fahes' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Official Fahes Vehicle Technical Inspection Centers in Qatar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Fahes Industrial Area Main Center', location: 'Street 24, Industrial Area', hours: '6:00 AM - 6:00 PM' },
                  { name: 'Fahes Wadi Al Banat (North Doha)', location: 'Near Duhail & Education City', hours: '6:00 AM - 6:00 PM' },
                  { name: 'Fahes Al Mazrouah Station', location: 'Al Mazrouah, Umm Salal', hours: '7:00 AM - 5:00 PM' },
                  { name: 'Fahes Al Wakrah South Center', location: 'Mesaieed Road, Al Wakrah', hours: '6:30 AM - 5:30 PM' }
                ].map((station) => (
                  <div key={station.name} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{station.name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8A1538]" /> {station.location}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Operating Hours: {station.hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'property' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Qatar Real Estate & Lease Authentication (Tawtheeq)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                To guarantee full legal safety under Qatar Ministry of Municipality and Real Estate Regulatory Authority (Aqarat):
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Tawtheeq Registration:</strong> All lease contracts are registered online with Municipality for Kahramaa electricity/water transfer.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Foreign Freehold Ownership:</strong> Expats can own 100% freehold property in The Pearl-Qatar, Lusail City, and West Bay Lagoon.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Title Deed Verification:</strong> MarketPro checks Qatar Ministry of Justice (MOJ) Sanad Malikiyya prior to listing.</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'escrow' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                MarketPro Qatar Escrow Safe Protection Policy
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Never worry about non-delivery or misleading items. When using MarketPro Escrow:
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2 text-xs">
                <p className="text-emerald-900 dark:text-emerald-300 font-semibold">
                  1. Buyer deposits funds via QNB, QPay, NAPS, or Apple Pay into our secured escrow holding account.
                </p>
                <p className="text-emerald-900 dark:text-emerald-300 font-semibold">
                  2. Seller is notified to handover or ship the item safely.
                </p>
                <p className="text-emerald-900 dark:text-emerald-300 font-semibold">
                  3. Buyer inspects and verifies the condition within 24 hours.
                </p>
                <p className="text-emerald-900 dark:text-emerald-300 font-semibold">
                  4. Funds are released to the seller only after mutual confirmation.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">Need personal assistance with Metrash2 or Escrow?</span>
          <a
            href={PLATFORM_WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Qatar Metrash2 Support Team</span>
          </a>
        </div>

      </div>
    </div>
  );
};
