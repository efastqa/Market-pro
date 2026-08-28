import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Car, 
  Building2, 
  Smartphone, 
  Watch,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageSquare,
  Flame,
  ArrowUpRight,
  Calculator,
  FileCheck2,
  Scale,
  X,
  Bell
} from 'lucide-react';
import { FilterState, Category, HeroSpotlightConfig } from '../types';
import { QATAR_LOCATIONS, PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK, INITIAL_HERO_SPOTLIGHT } from '../data/mockData';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categories: Category[];
  onOpenMap: () => void;
  onOpenPostAd: () => void;
  onOpenFinanceModal?: () => void;
  onOpenSpecialPlatesModal?: () => void;
  onOpenValuationModal?: () => void;
  onOpenMetrashGuideModal?: () => void;
  onOpenAdvertisingHub?: () => void;
  spotlightConfig?: HeroSpotlightConfig;
  onOpenSavedAlerts?: () => void;
  savedAlertsCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  categories,
  onOpenMap,
  onOpenPostAd,
  onOpenFinanceModal,
  onOpenSpecialPlatesModal,
  onOpenValuationModal,
  onOpenMetrashGuideModal,
  onOpenAdvertisingHub,
  spotlightConfig = INITIAL_HERO_SPOTLIGHT,
  onOpenSavedAlerts,
  savedAlertsCount = 0,
}) => {
  const currentSpotlight = spotlightConfig || INITIAL_HERO_SPOTLIGHT;
  const trendingSearches = [
    'Land Cruiser 2024',
    'Pearl Villa',
    'Rolex Daytona',
    'Lusail Studio',
    'iPhone 16 Pro',
    'Nissan Patrol Nismo'
  ];

  const handleExecuteSearch = (customQuery?: string) => {
    if (customQuery !== undefined) {
      onFilterChange({ searchQuery: customQuery });
    }
    // Smoothly scroll down to listings section
    const el = document.getElementById('marketplace-section') || document.querySelector('main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 pt-4 pb-8 transition-colors animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Bento Cell 1: Main Search & Hero Headline (Spans 8 cols on desktop) */}
          <div className="md:col-span-8 bg-gradient-to-br from-slate-900 via-[#73102d] to-slate-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-rose-900/40 shadow-xl flex flex-col justify-between animate-fadeInUp">
            {/* Ambient Lighting & Pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none animate-pulseSubtle"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10 animate-badgeGlow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  #1 Qatar Buy & Sell Platform
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  QID Verified Sellers
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Buy, Sell & Trade in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">
                  Qatar Marketplace
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl">
                Discover luxury vehicles, premium villas in Lusail & The Pearl, gadgets, watches, and verified items with instant escrow security.
              </p>

              {/* Quick Feature Shortcut Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
                {onOpenSpecialPlatesModal && (
                  <button
                    onClick={onOpenSpecialPlatesModal}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105"
                  >
                    <Car className="w-3 h-3" /> Special Plates (لوحات مميزة)
                  </button>
                )}

                {onOpenFinanceModal && (
                  <button
                    onClick={onOpenFinanceModal}
                    className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105"
                  >
                    <Calculator className="w-3 h-3" /> Bank Loan Calc (حاسبة التمويل)
                  </button>
                )}

                {onOpenValuationModal && (
                  <button
                    onClick={onOpenValuationModal}
                    className="px-2.5 py-1 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105"
                  >
                    <TrendingUp className="w-3 h-3" /> Price Estimator (مقياس الأسعار)
                  </button>
                )}

                {onOpenMetrashGuideModal && (
                  <button
                    onClick={onOpenMetrashGuideModal}
                    className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-[11px] font-bold flex items-center gap-1 transition-all hover:scale-105"
                  >
                    <FileCheck2 className="w-3 h-3" /> Metrash2 Guide (مطراش2)
                  </button>
                )}

                {onOpenAdvertisingHub && (
                  <button
                    onClick={onOpenAdvertisingHub}
                    className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 text-[11px] font-black flex items-center gap-1 shadow-md hover:bg-amber-300 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3 h-3 fill-slate-950" /> Free & Paid Ads (باقات الإعلانات)
                  </button>
                )}
              </div>
            </div>

            {/* Integrated Bento Search Box */}
            <div className="relative z-10 mt-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2.5 sm:p-3 space-y-2">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteSearch();
                }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2"
              >
                {/* Category Select */}
                <div className="sm:col-span-3">
                  <select
                    value={filters.category}
                    onChange={(e) => onFilterChange({ category: e.target.value, subcategory: '' })}
                    className="w-full bg-slate-900/90 text-white text-xs rounded-xl border border-slate-700 px-3 py-2.5 focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
                  >
                    <option value="">All Categories (جميع الأقسام)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Select */}
                <div className="sm:col-span-3">
                  <select
                    value={filters.location}
                    onChange={(e) => onFilterChange({ location: e.target.value === 'All Qatar' ? '' : e.target.value })}
                    className="w-full bg-slate-900/90 text-white text-xs rounded-xl border border-slate-700 px-3 py-2.5 focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
                  >
                    {QATAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc === 'All Qatar' ? '' : loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keyword Input with Instant Clear */}
                <div className="sm:col-span-3 relative">
                  <input
                    type="text"
                    placeholder="Search Land Cruiser, Rolex..."
                    value={filters.searchQuery}
                    onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                    className="w-full bg-slate-900/90 text-white text-xs rounded-xl border border-slate-700 pl-3 pr-8 py-2.5 focus:outline-none focus:border-amber-400 font-medium placeholder:text-slate-400"
                  />
                  {filters.searchQuery ? (
                    <button
                      type="button"
                      onClick={() => onFilterChange({ searchQuery: '' })}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white transition-colors"
                      title="Clear Search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  )}
                </div>

                {/* Search & Map Buttons */}
                <div className="sm:col-span-3 grid grid-cols-2 gap-1.5">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                    title="Search Listings"
                  >
                    <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Search</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenMap}
                    className="w-full py-2.5 px-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    title="Explore Qatar Map View"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Map</span>
                  </button>
                </div>
              </form>

              {/* Popular Tags & Notify Me Alert Button */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-[11px]">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-amber-300 font-bold flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3 h-3" /> Trending:
                  </span>
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleExecuteSearch(term)}
                      className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-medium whitespace-nowrap transition-colors flex items-center gap-1"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>

                {onOpenSavedAlerts && (
                  <button
                    type="button"
                    onClick={onOpenSavedAlerts}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-[10px] font-black shrink-0 transition-all flex items-center gap-1 border border-amber-500/30"
                    title="Get notifications when new matching items are posted in Qatar"
                  >
                    <Bell className="w-3 h-3" />
                    <span>Notify Me / Save Alert {savedAlertsCount > 0 && `(${savedAlertsCount})`}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bento Cell 2: VIP Spotlight Featured Item (Spans 4 cols on desktop) */}
          <div className="md:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between relative group animate-fadeInUp stagger-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3 fill-slate-950" /> {currentSpotlight.badge || 'VIP Spotlight'}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8A1538] dark:text-rose-400" /> {currentSpotlight.location || 'The Pearl-Qatar'}
                </span>
              </div>

              {/* Image with rounded corner */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={currentSpotlight.imageUrl}
                  alt={currentSpotlight.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-2.5 text-white">
                  <span className="text-[11px] font-medium text-amber-300">{currentSpotlight.subLocation || 'Porto Arabia Marina'}</span>
                  <p className="text-base font-black tracking-tight">{currentSpotlight.price}</p>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#8A1538] dark:group-hover:text-rose-400 transition-colors">
                  {currentSpotlight.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                  {currentSpotlight.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{currentSpotlight.escrowGuaranteed !== false ? 'Escrow Guaranteed' : 'Verified Seller'}</span>
              </div>

              <button
                onClick={() => onFilterChange({ category: currentSpotlight.category || 'properties' })}
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#8A1538] text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <span>View More</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bento Cell 3: Four Category Cards (Motors, Real Estate, Luxury, Electronics) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Motors */}
            <div
              onClick={() => onFilterChange({ category: 'vehicles', subcategory: '' })}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/80 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Car className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold text-amber-500 uppercase">1,420+ Ads</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Motors & Cars</h4>
                <p className="text-[10px] text-slate-500">Cruisers & Patrols</p>
              </div>
            </div>

            {/* Properties */}
            <div
              onClick={() => onFilterChange({ category: 'properties', subcategory: '' })}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/80 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">2,150+ Ads</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Real Estate</h4>
                <p className="text-[10px] text-slate-500">Pearl & Lusail</p>
              </div>
            </div>

            {/* Electronics */}
            <div
              onClick={() => onFilterChange({ category: 'electronics', subcategory: '' })}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold text-blue-500 uppercase">3,410+ Ads</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Electronics</h4>
                <p className="text-[10px] text-slate-500">iPhone, MacBooks</p>
              </div>
            </div>

            {/* Luxury Watches */}
            <div
              onClick={() => onFilterChange({ category: 'luxury', subcategory: '' })}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/80 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Watch className="w-5 h-5" />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-bold text-purple-500 uppercase">890+ Ads</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Luxury & Gold</h4>
                <p className="text-[10px] text-slate-500">Rolex, Diamonds</p>
              </div>
            </div>
          </div>

          {/* Bento Cell 4: Direct Hotline & WhatsApp Contact (Spans 5 cols on desktop) */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                  24/7 Qatar Support Live
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Call or WhatsApp Qatar Team</h4>
              <p className="text-xs text-slate-300 font-mono font-bold">{PLATFORM_PHONE_DISPLAY}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+97477315415"
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4 text-amber-400" />
              </a>
              <a
                href={PLATFORM_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                title="Direct WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
