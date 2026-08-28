import React from 'react';
import { FilterState, Category } from '../types';
import { 
  X, 
  RotateCcw, 
  Check, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ShieldCheck,
  Tag,
  Bell
} from 'lucide-react';
import { QATAR_LOCATIONS } from '../data/mockData';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  categories: Category[];
  totalResultsCount: number;
  onOpenSavedAlerts?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  categories,
  totalResultsCount,
  onOpenSavedAlerts,
}) => {
  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === filters.category);

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      category: '',
      subcategory: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      isFeaturedOnly: false,
      isVerifiedOnly: false,
      isNegotiableOnly: false,
      sortBy: 'newest'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              Filter Listings
            </h3>
            <p className="text-xs text-slate-500">Refine search in Qatar market</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-slate-500 hover:text-[#8A1538] dark:hover:text-rose-400 text-xs font-semibold flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filters */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
              Category
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onFilterChange({ category: '', subcategory: '' })}
                className={`p-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                  !filters.category
                    ? 'bg-[#8A1538] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onFilterChange({ category: c.id, subcategory: '' })}
                  className={`p-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    filters.category === c.id
                      ? 'bg-[#8A1538] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {c.name.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (if selected) */}
          {currentCategory && (
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
                Subcategory
              </label>
              <div className="space-y-1">
                {currentCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onFilterChange({ subcategory: filters.subcategory === sub.id ? '' : sub.id })}
                    className={`w-full p-2 rounded-xl text-xs font-medium text-left flex items-center justify-between ${
                      filters.subcategory === sub.id
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="text-[10px] text-slate-400">({sub.count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location in Qatar */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
              Municipality / Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value === 'All Qatar' ? '' : e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
            >
              {QATAR_LOCATIONS.map((loc) => (
                <option key={loc} value={loc === 'All Qatar' ? '' : loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
              Price Range (QAR)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min QAR"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Max QAR"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">
              Item Condition
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['', 'Brand New', 'Like New', 'Gently Used', 'Used'].map((cond) => (
                <button
                  key={cond || 'any'}
                  onClick={() => onFilterChange({ condition: cond })}
                  className={`p-2 rounded-xl text-xs font-medium text-center ${
                    filters.condition === cond
                      ? 'bg-[#8A1538] text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {cond || 'Any Condition'}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> VIP & Featured Ads Only
              </span>
              <input
                type="checkbox"
                checked={filters.isFeaturedOnly}
                onChange={(e) => onFilterChange({ isFeaturedOnly: e.target.checked })}
                className="rounded text-[#8A1538] focus:ring-0 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified QID Sellers Only
              </span>
              <input
                type="checkbox"
                checked={filters.isVerifiedOnly}
                onChange={(e) => onFilterChange({ isVerifiedOnly: e.target.checked })}
                className="rounded text-[#8A1538] focus:ring-0 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-2">
          {onOpenSavedAlerts && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSavedAlerts();
              }}
              className="w-full py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Save Filter as Instant Alert (حفظ التنبيه)</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#8A1538] to-rose-700 hover:from-[#700f2b] hover:to-rose-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all"
          >
            Show {totalResultsCount} Results in Qatar
          </button>
        </div>
      </div>
    </div>
  );
};
