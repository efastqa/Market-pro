import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  Plus, 
  Trash2, 
  Search, 
  Check, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Tag, 
  SlidersHorizontal,
  Flame,
  Clock,
  Phone,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SavedSearchAlert, FilterState, Category, Listing } from '../types';
import { QATAR_LOCATIONS, PLATFORM_PHONE_DISPLAY } from '../data/mockData';

interface SavedAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedAlerts: SavedSearchAlert[];
  onSaveAlert: (alert: SavedSearchAlert) => void;
  onDeleteAlert: (id: string) => void;
  onToggleAlertStatus: (id: string) => void;
  currentFilters: FilterState;
  categories: Category[];
  listings: Listing[];
  onApplyAlertFilters: (alert: SavedSearchAlert) => void;
  onTriggerSimulatedMatch?: (alert: SavedSearchAlert) => void;
}

export const SavedAlertsModal: React.FC<SavedAlertsModalProps> = ({
  isOpen,
  onClose,
  savedAlerts,
  onSaveAlert,
  onDeleteAlert,
  onToggleAlertStatus,
  currentFilters,
  categories,
  listings,
  onApplyAlertFilters,
  onTriggerSimulatedMatch
}) => {
  const [activeTab, setActiveTab] = useState<'my_alerts' | 'create_new'>('my_alerts');
  
  // New alert form state initialized with current active search
  const [title, setTitle] = useState(
    currentFilters.searchQuery 
      ? `Alert for "${currentFilters.searchQuery}"`
      : currentFilters.category 
      ? `Alert for ${categories.find(c => c.id === currentFilters.category)?.name || 'Category'}`
      : 'My Qatar Deals Alert'
  );
  const [query, setQuery] = useState(currentFilters.searchQuery || '');
  const [category, setCategory] = useState(currentFilters.category || '');
  const [location, setLocation] = useState(currentFilters.location || '');
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || '');
  const [frequency, setFrequency] = useState<'instant' | 'daily'>('instant');
  const [channel, setChannel] = useState<'push_inapp' | 'whatsapp' | 'both'>('both');
  const [notifyOnWhatsApp, setNotifyOnWhatsApp] = useState(true);
  const [testNotificationSuccess, setTestNotificationSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate live matching listings count for form
  const previewMatches = listings.filter((item) => {
    if (query && !item.title.toLowerCase().includes(query.toLowerCase()) && !item.description.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (category && item.category !== category) return false;
    if (location && item.location !== location) return false;
    if (minPrice && item.price < parseFloat(minPrice)) return false;
    if (maxPrice && item.price > parseFloat(maxPrice)) return false;
    return true;
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const catObj = categories.find((c) => c.id === category);

    const newAlert: SavedSearchAlert = {
      id: `alert-${Date.now()}`,
      title,
      query,
      category,
      categoryName: catObj?.name,
      location,
      minPrice,
      maxPrice,
      frequency,
      channel,
      createdAt: 'Just now',
      matchCount: previewMatches.length,
      isActive: true,
      notifyOnWhatsApp
    };

    onSaveAlert(newAlert);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setActiveTab('my_alerts');
  };

  const handleApplyPreset = (preset: { title: string; query: string; category: string; maxPrice?: string; location?: string }) => {
    setTitle(preset.title);
    setQuery(preset.query);
    setCategory(preset.category);
    setMaxPrice(preset.maxPrice || '');
    setLocation(preset.location || '');
    setActiveTab('create_new');
  };

  const handleSimulateTest = (alert: SavedSearchAlert) => {
    setTestNotificationSuccess(alert.id);
    if (onTriggerSimulatedMatch) {
      onTriggerSimulatedMatch(alert);
    }
    setTimeout(() => {
      setTestNotificationSuccess(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#700f2b] via-[#8A1538] to-[#5a0c22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300">
              <BellRing className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  ⚡ Smart Alerts & Notifications
                </span>
                <span className="text-rose-200 text-xs hidden sm:inline">تنبيهات البحث الفورية</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Saved Search & Deal Alerts
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 sm:px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('my_alerts')}
            className={`pb-3 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'my_alerts'
                ? 'text-[#8A1538] dark:text-rose-400 border-b-2 border-[#8A1538] dark:border-rose-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            My Active Alerts ({savedAlerts.length})
          </button>

          <button
            onClick={() => setActiveTab('create_new')}
            className={`pb-3 px-4 text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              activeTab === 'create_new'
                ? 'text-[#8A1538] dark:text-rose-400 border-b-2 border-[#8A1538] dark:border-rose-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Search Alert</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* TAB 1: LIST SAVED ALERTS */}
          {activeTab === 'my_alerts' && (
            <div className="space-y-4">
              {testNotificationSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span><strong>Test Alert Dispatched:</strong> We found matching listings and sent a notification simulation!</span>
                  </div>
                </div>
              )}

              {savedAlerts.length === 0 ? (
                <div className="text-center py-8 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/30 text-[#8A1538] dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900/50">
                    <Bell className="w-8 h-8 opacity-70" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      No Search Alerts Created Yet
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Never miss a bargain! Save custom search filters to get notified immediately when a matching car, villa, phone, or luxury item is posted.
                    </p>
                  </div>

                  {/* Preset Quick Start */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-left space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      ⚡ Quick One-Click Popular Qatar Alerts:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleApplyPreset({
                          title: 'Toyota Land Cruiser Deals (Under 300k QAR)',
                          query: 'Land Cruiser',
                          category: 'vehicles',
                          maxPrice: '300000',
                          location: 'Doha'
                        })}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                      >
                        <strong className="block text-xs font-bold text-slate-900 dark:text-white">🚘 Land Cruiser & Patrol</strong>
                        <span className="text-[11px] text-slate-500">Under 300k QAR in Doha</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset({
                          title: 'Lusail & Pearl Studio Rentals',
                          query: 'Studio',
                          category: 'property',
                          maxPrice: '7000',
                          location: 'Lusail'
                        })}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                      >
                        <strong className="block text-xs font-bold text-slate-900 dark:text-white">🏢 Lusail / Pearl Apartments</strong>
                        <span className="text-[11px] text-slate-500">Under 7,000 QAR/mo</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset({
                          title: 'Rolex Luxury Watches in Qatar',
                          query: 'Rolex',
                          category: 'luxury',
                          location: 'All Qatar'
                        })}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                      >
                        <strong className="block text-xs font-bold text-slate-900 dark:text-white">⌚ Rolex & Cartier Watches</strong>
                        <span className="text-[11px] text-slate-500">Instant VIP notifications</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset({
                          title: 'iPhone 16 Pro Max Deals',
                          query: 'iPhone 16',
                          category: 'electronics',
                          maxPrice: '4500'
                        })}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200 dark:border-slate-700 text-left transition-colors"
                      >
                        <strong className="block text-xs font-bold text-slate-900 dark:text-white">📱 iPhone 16 Pro & Max</strong>
                        <span className="text-[11px] text-slate-500">Under 4,500 QAR</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        alert.isActive
                          ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm'
                          : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {alert.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              alert.isActive
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}>
                              {alert.isActive ? 'Active' : 'Paused'}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold">
                              ⚡ {alert.frequency === 'instant' ? 'Instant Alert' : 'Daily Digest'}
                            </span>
                          </div>

                          {/* Filter tags pill row */}
                          <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                            {alert.query && (
                              <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                                <Search className="w-3 h-3 text-[#8A1538] dark:text-rose-400" /> "{alert.query}"
                              </span>
                            )}
                            {alert.category && (
                              <span className="flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                                <Tag className="w-3 h-3" /> {alert.categoryName || alert.category}
                              </span>
                            )}
                            {alert.location && (
                              <span className="flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                                <MapPin className="w-3 h-3" /> {alert.location}
                              </span>
                            )}
                            {(alert.minPrice || alert.maxPrice) && (
                              <span className="bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                                {alert.minPrice ? `${alert.minPrice} QAR` : '0'} - {alert.maxPrice ? `${alert.maxPrice} QAR` : 'Any'}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Switch Active status & Delete */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onToggleAlertStatus(alert.id)}
                            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                              alert.isActive
                                ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                                : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                            }`}
                            title={alert.isActive ? 'Pause Alert' : 'Resume Alert'}
                          >
                            <Bell className={`w-4 h-4 ${alert.isActive ? 'fill-emerald-500' : ''}`} />
                          </button>

                          <button
                            type="button"
                            onClick={() => onDeleteAlert(alert.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Alert"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bottom action bar */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span className="text-[11px] text-slate-500">
                          Created {alert.createdAt} • Delivery: In-App + WhatsApp
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSimulateTest(alert)}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-[11px] font-semibold transition-colors"
                          >
                            Test Alert
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onApplyAlertFilters(alert);
                              onClose();
                            }}
                            className="px-3 py-1 rounded-lg bg-[#8A1538] hover:bg-rose-900 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <span>View Live Matching Ads</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CREATE NEW ALERT */}
          {activeTab === 'create_new' && (
            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Alert Name / Title * (اسم التنبيه)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Land Cruiser 2024 VXR under 280k"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              {/* Keyword Search */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Keyword Search (الكلمات الدلالية)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Land Cruiser, iPhone, Rolex..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Category (القسم)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                  >
                    <option value="">All Categories (جميع الأقسام)</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Price Range */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Location in Qatar (المنطقة)
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                  >
                    <option value="">All Qatar (كل قطر)</option>
                    {QATAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Min Price (QAR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Max Budget (QAR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 250000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                  />
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Notification Delivery Preferences (طرق استلام التنبيه):
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="rounded text-[#8A1538] focus:ring-[#8A1538]"
                    />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">In-App Live Toast</strong>
                      <span className="text-[10px] text-slate-500">Banner alert when you open app</span>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyOnWhatsApp}
                      onChange={(e) => setNotifyOnWhatsApp(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <strong className="block text-slate-900 dark:text-white">WhatsApp Updates</strong>
                      <span className="text-[10px] text-slate-500">Direct message to +974 7731 5415</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Match counter banner */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
                <span>Currently matching listings on MarketPro:</span>
                <strong className="font-black text-sm">{previewMatches.length} Ads Available</strong>
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('my_alerts')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
                >
                  <Bell className="w-4 h-4 text-slate-950" />
                  <span>Save Alert (حفظ التنبيه)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
