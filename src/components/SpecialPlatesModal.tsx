import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  MessageSquare, 
  Flame, 
  Search, 
  ChevronRight,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';

export interface SpecialPlateItem {
  id: string;
  type: 'car_plate' | 'vip_phone';
  code: string; // e.g. "77777", "1001", "5555 5555"
  carrier?: 'Ooredoo' | 'Vodafone';
  digitsCount?: number;
  categoryName: string;
  priceQAR: number;
  sellerName: string;
  sellerPhone: string;
  isVerified: boolean;
  isSpecialMetrash2Transfer: boolean;
  views: number;
  isFeatured?: boolean;
}

export const SPECIAL_ITEMS: SpecialPlateItem[] = [
  {
    id: 'plate-1',
    type: 'car_plate',
    code: '77777',
    digitsCount: 5,
    categoryName: 'Private 5-Digit Unique Super VIP (خمس أرقام متشابهة)',
    priceQAR: 480000,
    sellerName: 'Sheikh Jassim Al-Thani',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 3840,
    isFeatured: true
  },
  {
    id: 'plate-2',
    type: 'car_plate',
    code: '90000',
    digitsCount: 5,
    categoryName: 'Private 5-Digit Round Milestone (رقم مقفول مميز)',
    priceQAR: 195000,
    sellerName: 'Al-Rayyan VIP Plates',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 2150,
    isFeatured: true
  },
  {
    id: 'plate-3',
    type: 'car_plate',
    code: '12345',
    digitsCount: 5,
    categoryName: 'Private 5-Digit Ascending Sequence (سيريال تصاعدي)',
    priceQAR: 320000,
    sellerName: 'Mohammed Al-Kuwari',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 2900,
    isFeatured: false
  },
  {
    id: 'plate-4',
    type: 'car_plate',
    code: '8888',
    digitsCount: 4,
    categoryName: 'Private 4-Digit Super Rare (أربع أرقام مكررة)',
    priceQAR: 650000,
    sellerName: 'Doha Prestige Collectibles',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 4500,
    isFeatured: true
  },
  {
    id: 'plate-5',
    type: 'car_plate',
    code: '5050',
    digitsCount: 4,
    categoryName: 'Private 4-Digit Symmetrical Repeat (رقم ثنائي متناسق)',
    priceQAR: 240000,
    sellerName: 'Tariq Al-Sulaiti',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 1840,
    isFeatured: false
  },
  {
    id: 'sim-1',
    type: 'vip_phone',
    code: '5555 5555',
    carrier: 'Ooredoo',
    categoryName: 'Ooredoo Diamond VIP Number (أوريدو ماسي رقم ملكي)',
    priceQAR: 150000,
    sellerName: 'Qatar VIP Numbers',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 1980,
    isFeatured: true
  },
  {
    id: 'sim-2',
    type: 'vip_phone',
    code: '7777 0000',
    carrier: 'Vodafone',
    categoryName: 'Vodafone Red VIP 8-Digit (فودافون رقم مميز جداً)',
    priceQAR: 85000,
    sellerName: 'Nasser VIP Telecom',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 1420,
    isFeatured: false
  },
  {
    id: 'sim-3',
    type: 'vip_phone',
    code: '3333 1111',
    carrier: 'Vodafone',
    categoryName: 'Vodafone Symmetrical Double Quad',
    priceQAR: 65000,
    sellerName: 'Al-Sadd Telecom Hub',
    sellerPhone: '+97477315415',
    isVerified: true,
    isSpecialMetrash2Transfer: true,
    views: 990,
    isFeatured: false
  }
];

interface SpecialPlatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
}

export const SpecialPlatesModal: React.FC<SpecialPlatesModalProps> = ({
  isOpen,
  onClose,
  currency = 'QAR'
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'plates' | 'phones'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = SPECIAL_ITEMS.filter((item) => {
    if (activeTab === 'plates' && item.type !== 'car_plate') return false;
    if (activeTab === 'phones' && item.type !== 'vip_phone') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.code.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        item.sellerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  Qatar Special Plates & VIP Numbers
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 text-[10px] font-black uppercase">
                  Metrash2 Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                سوق لوحات السيارات المميزة والأرقام الملكية في قطر
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

        {/* Filter bar & Search */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Items ({SPECIAL_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveTab('plates')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 ${
                activeTab === 'plates'
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Car className="w-3.5 h-3.5" /> Number Plates
            </button>
            <button
              onClick={() => setActiveTab('phones')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 ${
                activeTab === 'phones'
                  ? 'bg-[#8A1538] text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> VIP Phone Numbers
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search digits (e.g. 7777, 5050)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#8A1538]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Metrash2 Info Banner */}
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#8A1538] dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Direct Metrash2 MOI Qatar Ownership Transfer:
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                  All vehicle plates are transferrable instantly via the official Metrash2 Traffic Services app with full Escrow guarantee.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/97477315415?text=Hello%20MarketPro,%20I%20want%20to%20inquire%20about%20transferring%20a%20special%20plate%20number"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#8A1538] hover:bg-[#73102d] text-white rounded-xl font-bold whitespace-nowrap text-center transition-colors shrink-0"
            >
              Transfer Guide & Escrow
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-md hover:shadow-xl hover:border-amber-400/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                      {item.type === 'car_plate' ? (
                        <>
                          <Car className="w-3.5 h-3.5 text-[#8A1538] dark:text-rose-400" />
                          Qatar Plate
                        </>
                      ) : (
                        <>
                          <Phone className="w-3.5 h-3.5 text-blue-500" />
                          {item.carrier} VIP
                        </>
                      )}
                    </span>

                    {item.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-slate-950" /> Super VIP
                      </span>
                    )}
                  </div>

                  {/* VISUAL PLATE OR SIM CARD RENDERING */}
                  {item.type === 'car_plate' ? (
                    /* Qatar Car Number Plate Authentic Visual */
                    <div className="relative bg-white text-slate-950 rounded-xl border-4 border-slate-900 shadow-inner p-3 flex items-center justify-between select-none my-3">
                      {/* Qatar Maroon Flag Badge on Left */}
                      <div className="h-14 w-12 bg-[#8A1538] rounded-md flex flex-col items-center justify-between p-1 text-white text-[9px] font-bold tracking-tighter">
                        <span>QATAR</span>
                        <div className="w-6 h-3 bg-white/20 rounded flex items-center justify-center text-[7px]">
                          🇶🇦
                        </div>
                        <span className="font-arabic">قطر</span>
                      </div>

                      {/* Number Digits */}
                      <div className="flex-1 text-center font-black tracking-widest text-3xl sm:text-4xl text-slate-950 font-mono">
                        {item.code}
                      </div>

                      {/* Right Tag */}
                      <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase rotate-90">
                        QA
                      </div>
                    </div>
                  ) : (
                    /* VIP SIM Card Visual */
                    <div className="relative bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl border-2 border-amber-500/40 p-4 flex flex-col justify-between shadow-inner my-3">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-amber-400">{item.carrier} Special Line</span>
                        <span className="text-slate-400">ESIM / Physical</span>
                      </div>
                      <div className="py-2 text-center text-2xl sm:text-3xl font-black font-mono tracking-wider text-white">
                        {item.code}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>+974 Qatar</span>
                        <span className="text-emerald-400 font-bold">Instant Ownership Transfer</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {item.categoryName}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Seller: {item.sellerName} • {item.views} Views
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">Asking Price</span>
                    <span className="text-base font-black text-[#8A1538] dark:text-amber-400">
                      {formatPriceWithCurrency(item.priceQAR, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.code, item.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                      title="Copy Number"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={`${PLATFORM_WHATSAPP_LINK}&text=Salam,%20I%20am%20interested%20in%20purchasing%20the%20Qatar%20${item.type === 'car_plate' ? 'Plate' : 'VIP%20Number'}%20${item.code}%20listed%20for%20${item.priceQAR}%20QAR`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Offer</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Have a special Qatar plate or VIP mobile number to sell?
          </div>
          <a
            href="tel:+97477315415"
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-[#8A1538] text-white rounded-xl font-bold flex items-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>List VIP Number via Concierge ({PLATFORM_PHONE_DISPLAY})</span>
          </a>
        </div>

      </div>
    </div>
  );
};
