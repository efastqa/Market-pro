import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Car, 
  Building2, 
  Smartphone, 
  Watch, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Info
} from 'lucide-react';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface ValuationPreset {
  category: 'cars' | 'properties' | 'watches' | 'gadgets';
  model: string;
  year: number | string;
  lowQAR: number;
  avgQAR: number;
  highQAR: number;
  demand: 'Hot' | 'High' | 'Steady';
  depreciationTrend: string;
  advice: string;
}

const VALUATION_DATABASE: ValuationPreset[] = [
  {
    category: 'cars',
    model: 'Toyota Land Cruiser VXR 3.5L Twin Turbo',
    year: 2024,
    lowQAR: 345000,
    avgQAR: 365000,
    highQAR: 385000,
    demand: 'Hot',
    depreciationTrend: 'Ultra-low depreciation in Qatar (~4% / year)',
    advice: 'Highest resale value in the GCC. Pearl White and Tan interior command premium prices in Doha.'
  },
  {
    category: 'cars',
    model: 'Nissan Patrol 5.6L V8 Titanium / Nismo',
    year: 2024,
    lowQAR: 290000,
    avgQAR: 320000,
    highQAR: 355000,
    demand: 'Hot',
    depreciationTrend: 'Strong GCC demand (~6% / year)',
    advice: 'Full Qatar dealership service history (Saleh Al Hamad Al Mana) provides 8% higher valuation.'
  },
  {
    category: 'cars',
    model: 'Porsche 911 GT3 RS (992)',
    year: 2023,
    lowQAR: 1100000,
    avgQAR: 1180000,
    highQAR: 1290000,
    demand: 'Hot',
    depreciationTrend: 'Appreciating / Collector asset in Doha',
    advice: 'Weissach package and ceramic brakes increase asking price by up to 120,000 QAR.'
  },
  {
    category: 'properties',
    model: 'The Pearl-Qatar 2-Bedroom Luxury Marina View',
    year: 'Tower 20-25',
    lowQAR: 1850000,
    avgQAR: 2150000,
    highQAR: 2450000,
    demand: 'High',
    depreciationTrend: 'Rental yield ~7.2% annually in Porto Arabia',
    advice: 'Units with direct marina berth views and freehold title deed attract rapid international expat buyers.'
  },
  {
    category: 'properties',
    model: 'Lusail Fox Hills 1-Bedroom Modern Apartment',
    year: 'Fox Hills North',
    lowQAR: 850000,
    avgQAR: 980000,
    highQAR: 1150000,
    demand: 'High',
    depreciationTrend: 'Capital growth +5.5% with Lusail Tram infrastructure',
    advice: 'High occupancy rates among Education City students and Lusail business professionals.'
  },
  {
    category: 'watches',
    model: 'Rolex Submariner Date 41mm (126610LN)',
    year: 2024,
    lowQAR: 51000,
    avgQAR: 54500,
    highQAR: 58000,
    demand: 'Hot',
    depreciationTrend: 'Trading above official retail MSRP',
    advice: 'Box, papers, green seal tag, and Fifty One East Qatar invoice retain peak liquidity.'
  },
  {
    category: 'gadgets',
    model: 'Apple iPhone 16 Pro Max 512GB Desert Titanium',
    year: 2024,
    lowQAR: 4900,
    avgQAR: 5200,
    highQAR: 5500,
    demand: 'Hot',
    depreciationTrend: 'Stable premium demand across Doha',
    advice: 'Official Apple warranty and TRA Qatar seal ensures 1-day sale conversion.'
  }
];

interface MarketValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency?: CurrencyCode;
  onOpenPostAdWithValuation?: (title: string, price: number) => void;
}

export const MarketValuationModal: React.FC<MarketValuationModalProps> = ({
  isOpen,
  onClose,
  currency = 'QAR',
  onOpenPostAdWithValuation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'cars' | 'properties' | 'watches' | 'gadgets'>('cars');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Good'>('Like New');

  const filteredItems = VALUATION_DATABASE.filter(item => item.category === selectedCategory);
  const currentItem = filteredItems[selectedIndex] || filteredItems[0] || VALUATION_DATABASE[0];

  // Adjust price based on selected condition
  const multiplier = condition === 'Brand New' ? 1.05 : condition === 'Like New' ? 1.0 : 0.92;
  const estimatedLow = Math.round(currentItem.lowQAR * multiplier);
  const estimatedAvg = Math.round(currentItem.avgQAR * multiplier);
  const estimatedHigh = Math.round(currentItem.highQAR * multiplier);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Qatar Market Price Valuation Index
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                مقياس أسعار السوق الذكي في قطر للسيارات والعقارات والسلع الفاخرة
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => {
                setSelectedCategory('cars');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'cars'
                  ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Car className="w-5 h-5" />
              <span className="text-xs">Motors & SUVs</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('properties');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'properties'
                  ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs">Real Estate</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('watches');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'watches'
                  ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Watch className="w-5 h-5" />
              <span className="text-xs">Luxury Watches</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('gadgets');
                setSelectedIndex(0);
              }}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedCategory === 'gadgets'
                  ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-black'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-xs">Electronics</span>
            </button>
          </div>

          {/* Model Selector & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Benchmark Model in Qatar:
              </label>
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#8A1538]"
              >
                {filteredItems.map((item, idx) => (
                  <option key={item.model} value={idx}>
                    {item.model} ({item.year})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Condition Rating:
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['Brand New', 'Like New', 'Good'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`py-2 px-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                      condition === c
                        ? 'bg-slate-900 dark:bg-slate-700 text-white border-slate-900'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Valuation Result Showcase Box */}
          <div className="bg-gradient-to-br from-slate-900 via-[#73102d] to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-900/40 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Fair Market Valuation
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {currentItem.model}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {currentItem.demand} Demand
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold">
                  {condition}
                </span>
              </div>
            </div>

            {/* Price Range Meter */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <span className="text-[11px] text-slate-400 font-semibold block">Quick Sale / Trade-In</span>
                <span className="text-lg sm:text-xl font-black text-slate-200">
                  {formatPriceWithCurrency(estimatedLow, currency)}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-400/80 text-center shadow-lg transform sm:scale-105">
                <span className="text-[11px] text-amber-300 font-black uppercase tracking-wider block">
                  ★ Fair Market Average
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatPriceWithCurrency(estimatedAvg, currency)}
                </span>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <span className="text-[11px] text-slate-400 font-semibold block">Top Showroom / Agency</span>
                <span className="text-lg sm:text-xl font-black text-slate-200">
                  {formatPriceWithCurrency(estimatedHigh, currency)}
                </span>
              </div>
            </div>

            {/* Market Insights & Tips */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Qatar Market Insight: </span>
                  <span className="text-slate-200">{currentItem.depreciationTrend}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300">Pricing Strategy: </span>
                  <span className="text-slate-200">{currentItem.advice}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`${PLATFORM_WHATSAPP_LINK}&text=Salam,%20I%20want%20a%20professional%20valuation%20for%20my%20${currentItem.model}%20in%20Qatar`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Request Detailed Inspection & Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenPostAdWithValuation && (
                <button
                  onClick={() => {
                    onOpenPostAdWithValuation(currentItem.model, estimatedAvg);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 transition-colors"
                >
                  List Ad at {estimatedAvg.toLocaleString()} QAR
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
