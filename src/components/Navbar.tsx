import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  PlusCircle, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Sun, 
  Moon, 
  SlidersHorizontal,
  Globe,
  LayoutDashboard,
  User,
  Sparkles,
  ChevronDown,
  X,
  Menu,
  Calculator,
  Scale,
  TrendingUp,
  FileCheck2,
  Car,
  Megaphone,
  Crown,
  Lock,
  Smartphone,
  Download,
  Bell
} from 'lucide-react';
import { QATAR_LOCATIONS, PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { Category, FilterState } from '../types';
import { CurrencyCode, CURRENCIES } from '../utils/currency';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categories: Category[];
  savedCount: number;
  unreadCount: number;
  onOpenPostAd: () => void;
  onOpenChat: () => void;
  onOpenFavorites: () => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang: 'en' | 'ar';
  onToggleLang: () => void;
  onOpenFiltersDrawer: () => void;
  // Extra Tools & Ads
  onOpenAdvertisingHub: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (curr: CurrencyCode) => void;
  onOpenFinanceModal: () => void;
  onOpenSpecialPlatesModal: () => void;
  onOpenValuationModal: () => void;
  onOpenMetrashGuideModal: () => void;
  onOpenCompareModal: () => void;
  compareCount?: number;
  onOpenInstallApp?: () => void;
  onOpenSavedAlerts?: () => void;
  savedAlertsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  filters,
  onFilterChange,
  categories,
  savedCount,
  unreadCount,
  onOpenPostAd,
  onOpenChat,
  onOpenFavorites,
  onOpenAdmin,
  onOpenContact,
  isDarkMode,
  onToggleDarkMode,
  currentLang,
  onToggleLang,
  onOpenFiltersDrawer,
  onOpenAdvertisingHub,
  currency,
  onChangeCurrency,
  onOpenFinanceModal,
  onOpenSpecialPlatesModal,
  onOpenValuationModal,
  onOpenMetrashGuideModal,
  onOpenCompareModal,
  compareCount = 0,
  onOpenInstallApp,
  onOpenSavedAlerts,
  savedAlertsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Qatar Maroon Top Announcement & Quick Contact Bar */}
      <div className="bg-gradient-to-r from-[#700f2b] via-[#8A1538] to-[#5a0c22] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Qatar's #1 Trusted Marketplace
            </span>
            <span className="hidden md:inline text-rose-100 text-xs">
              Buy & Sell Cars, Real Estate, Luxury & Electronics across Doha, Lusail & The Pearl
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            <a
              href={`tel:+97477315415`}
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Direct Support: <strong className="text-white font-bold">{PLATFORM_PHONE_DISPLAY}</strong></span>
            </a>

            <div className="h-3 w-px bg-rose-400/40 hidden sm:block"></div>

            {onOpenInstallApp && (
              <button
                onClick={onOpenInstallApp}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full border border-white/30 transition-colors text-[11px] font-bold shadow-sm"
                title="Install MarketPro Qatar Mobile App"
              >
                <Smartphone className="w-3 h-3 text-amber-300" />
                <span>Get App</span>
              </button>
            )}

            <div className="h-3 w-px bg-rose-400/40 hidden sm:block"></div>

            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2 py-0.5 rounded border border-amber-400/40 transition-colors text-[11px]"
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <BrandLogo isArabic={currentLang === 'ar'} size="md" />
            </a>
          </div>

          {/* Search Bar with Location Pill */}
          <div className="hidden lg:flex flex-1 max-w-xl items-center bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-1 pl-3 shadow-inner">
            {/* Location selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLocationDropdownOpen(!locationDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 pr-3 border-r border-slate-300 dark:border-slate-700 hover:text-[#8A1538] whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8A1538] dark:text-rose-400 shrink-0" />
                <span className="max-w-[110px] truncate">{filters.location || 'All Qatar'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 max-h-64 overflow-y-auto">
                  <div className="p-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Municipality / Zone
                  </div>
                  {QATAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        onFilterChange({ location: loc === 'All Qatar' ? '' : loc });
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        (filters.location === loc || (!filters.location && loc === 'All Qatar'))
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {(filters.location === loc || (!filters.location && loc === 'All Qatar')) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A1538]"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={currentLang === 'ar' ? 'ابحث عن لاندكروزر، فيلا اللؤلؤة، آيفون...' : 'Search Land Cruiser, Pearl Villa, iPhone 16...'}
                value={filters.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Drawer Launcher */}
            <button
              onClick={onOpenFiltersDrawer}
              className="p-2 text-slate-500 hover:text-[#8A1538] dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Right Action Icons & Qatar Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Qatar Marketplace Tools Hub Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setCurrencyDropdownOpen(false);
                  setLocationDropdownOpen(false);
                }}
                className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Qatar Marketplace Tools"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline">Qatar Hub</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Qatar Special Services
                  </div>
                  
                  <button
                    onClick={() => {
                      onOpenSpecialPlatesModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <Car className="w-4 h-4 text-[#8A1538] dark:text-rose-400" />
                    <div>
                      <span>Special Plates & VIP Numbers</span>
                      <span className="block text-[10px] text-slate-400 font-normal">لوحات وأرقام مميزة</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenFinanceModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <Calculator className="w-4 h-4 text-emerald-500" />
                    <div>
                      <span>Auto & Mortgage Calculator</span>
                      <span className="block text-[10px] text-slate-400 font-normal">حاسبة تمويل البنوك القطرية</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenValuationModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <div>
                      <span>Market Valuation Estimator</span>
                      <span className="block text-[10px] text-slate-400 font-normal">مقياس أسعار السوق الفعلي</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenMetrashGuideModal();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-800 dark:text-slate-200"
                  >
                    <FileCheck2 className="w-4 h-4 text-amber-500" />
                    <div>
                      <span>Metrash2 & Safe Trading Guide</span>
                      <span className="block text-[10px] text-slate-400 font-normal">دليل مطراش2 والفاحص</span>
                    </div>
                  </button>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-700 space-y-1">
                    <button
                      onClick={() => {
                        onOpenAdvertisingHub();
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 flex items-center gap-2"
                    >
                      <Megaphone className="w-4 h-4 text-amber-600" />
                      <div>
                        <span>Advertising Hub & VIP Boosts</span>
                        <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-normal">باقات الإعلانات المجانية والمميزة</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAdmin();
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700/60 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                    >
                      <Lock className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="flex items-center gap-1">
                          Admin Portal
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-500 font-black">PIN</span>
                        </span>
                        <span className="block text-[10px] text-slate-400 font-normal">لوحة تحكم المشرف المحمية</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Currency Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setToolsDropdownOpen(false);
                  setLocationDropdownOpen(false);
                }}
                className="px-2.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Change Currency"
              >
                <span>{CURRENCIES[currency].flag}</span>
                <span className="font-mono">{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-44 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-1.5 z-50">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase">
                    GCC & Global Currencies
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        onChangeCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        currency === code
                          ? 'bg-[#8A1538] text-white font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{CURRENCIES[code].flag}</span>
                        <span>{code}</span>
                      </span>
                      <span className="text-[10px] opacity-80">{CURRENCIES[code].nameAr}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Dock Trigger */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompareModal}
                className="relative p-2 rounded-xl bg-amber-500 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1"
                title="View Compared Listings"
              >
                <Scale className="w-4 h-4" />
                <span className="text-xs font-black">{compareCount}</span>
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-bold flex items-center gap-1"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 text-[#8A1538] dark:text-rose-400" />
              <span className="hidden sm:inline">{currentLang === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Saved Alerts Bell Icon */}
            {onOpenSavedAlerts && (
              <button
                onClick={onOpenSavedAlerts}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Saved Search Alerts (تنبيهات البحث)"
              >
                <Bell className="w-5 h-5" />
                {savedAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center">
                    {savedAlertsCount}
                  </span>
                )}
              </button>
            )}

            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Saved Listings"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8A1538] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Live Chat System Trigger */}
            <button
              onClick={onOpenChat}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Instant Messages & Chat"
            >
              <MessageSquare className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Install App Button */}
            {onOpenInstallApp && (
              <button
                onClick={onOpenInstallApp}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all shadow-sm"
                title="Install MarketPro Qatar Mobile App"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentLang === 'ar' ? 'تثبيت التطبيق' : 'Install App'}</span>
              </button>
            )}

            {/* Advertise with us button */}
            <button
              onClick={onOpenAdvertisingHub}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all shadow-sm"
              title="Qatar Free & Paid Advertising Packages"
            >
              <Megaphone className="w-3.5 h-3.5 text-amber-600" />
              <span>{currentLang === 'ar' ? 'أعلن معنا' : 'Advertise'}</span>
            </button>

            {/* Post Ad Button */}
            <button
              onClick={onOpenPostAd}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-[#8A1538] via-[#9e1b43] to-[#8A1538] hover:from-[#73102d] hover:to-[#73102d] text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] border border-amber-400/30"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>{currentLang === 'ar' ? 'أضف إعلانك' : 'Post Free Ad'}</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-3 flex items-center gap-2">
          <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search Land Cruiser, Pearl, iPhone..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button
            onClick={onOpenFiltersDrawer}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-600 dark:text-slate-300"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 overflow-x-auto no-scrollbar py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button
            onClick={() => onFilterChange({ category: '', subcategory: '' })}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              !filters.category
                ? 'bg-[#8A1538] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            All Categories ({categories.reduce((acc, c) => acc + c.count, 0)})
          </button>

          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: isSelected ? '' : cat.id, subcategory: '' })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8A1538] text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-[#8A1538]'
                }`}
              >
                <span>{currentLang === 'ar' ? cat.nameAr : cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {onOpenInstallApp && (
              <button
                onClick={() => { onOpenInstallApp(); setMobileMenuOpen(false); }}
                className="col-span-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md"
              >
                <Smartphone className="w-4 h-4" /> Install MarketPro Mobile App (تثبيت التطبيق)
              </button>
            )}
            {onOpenSavedAlerts && (
              <button
                onClick={() => { onOpenSavedAlerts(); setMobileMenuOpen(false); }}
                className="col-span-2 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Saved Search Alerts & Notify Me {savedAlertsCount > 0 && `(${savedAlertsCount})`}</span>
              </button>
            )}
            <button
              onClick={() => { onOpenAdvertisingHub(); setMobileMenuOpen(false); }}
              className="col-span-2 p-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Megaphone className="w-4 h-4" /> Advertising & VIP Packages (أعلن معنا)
            </button>
            <button
              onClick={() => { onOpenSpecialPlatesModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Car className="w-4 h-4 text-[#8A1538]" /> Special Plates
            </button>
            <button
              onClick={() => { onOpenFinanceModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-emerald-500" /> Finance Calc
            </button>
            <button
              onClick={() => { onOpenValuationModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-blue-500" /> Price Estimator
            </button>
            <button
              onClick={() => { onOpenMetrashGuideModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4 text-amber-500" /> Metrash2 Guide
            </button>
            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Lock className="w-4 h-4 text-amber-500" /> Admin Portal
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-[#8A1538] dark:text-rose-300">Qatar Helpline</p>
              <p className="text-slate-600 dark:text-slate-400 font-semibold">{PLATFORM_PHONE_DISPLAY}</p>
            </div>
            <a
              href={`tel:+97477315415`}
              className="px-3 py-1.5 bg-[#8A1538] text-white font-bold rounded-xl text-xs"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
