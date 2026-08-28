import React, { useState, useRef } from 'react';
import { 
  Listing, 
  AdminStats, 
  PaymentTransaction, 
  CommercialBannerAd,
  HeroSpotlightConfig,
  PlatformConfig
} from '../types';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Sparkles, 
  Trash2, 
  Search, 
  TrendingUp, 
  Building2, 
  Eye, 
  X,
  Check,
  RefreshCw,
  Sliders,
  Bell,
  Crown,
  Megaphone,
  Layers,
  ArrowUpRight,
  Lock,
  KeyRound,
  LogOut,
  Upload,
  Image as ImageIcon,
  Plus,
  Edit3,
  Phone,
  MessageSquare,
  Save,
  RotateCcw,
  Tag,
  MapPin,
  Flame,
  CheckSquare,
  Clock
} from 'lucide-react';
import { 
  PLATFORM_PHONE_DISPLAY, 
  QATAR_LOCATIONS, 
  CATEGORIES, 
  QATAR_IMAGE_PRESETS,
  INITIAL_HERO_SPOTLIGHT,
  INITIAL_PLATFORM_CONFIG
} from '../data/mockData';
import { getStoredAdminPassword, setStoredAdminPassword } from './AdminAuthModal';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  listings: Listing[];
  stats: AdminStats;
  transactions: PaymentTransaction[];
  commercialBanners: CommercialBannerAd[];
  heroSpotlight: HeroSpotlightConfig;
  platformConfig: PlatformConfig;
  onApproveListing: (id: string) => void;
  onRejectListing: (id: string) => void;
  onToggleFeatureListing: (id: string) => void;
  onDeleteListing: (id: string) => void;
  onUpdateListing: (updatedListing: Listing) => void;
  onAddListing: (newListing: Listing) => void;
  onUpdateCommercialBanners: (banners: CommercialBannerAd[]) => void;
  onUpdateHeroSpotlight: (spotlight: HeroSpotlightConfig) => void;
  onUpdatePlatformConfig: (config: PlatformConfig) => void;
  onResetDefaults?: () => void;
  onVerifyUser: (sellerId: string) => void;
  onReleaseEscrow: (txnId: string) => void;
  onLockAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  listings,
  stats,
  transactions,
  commercialBanners,
  heroSpotlight,
  platformConfig,
  onApproveListing,
  onRejectListing,
  onToggleFeatureListing,
  onDeleteListing,
  onUpdateListing,
  onAddListing,
  onUpdateCommercialBanners,
  onUpdateHeroSpotlight,
  onUpdatePlatformConfig,
  onResetDefaults,
  onVerifyUser,
  onReleaseEscrow,
  onLockAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'billboards' | 'hero_spotlight' | 'listings_manager' | 'transactions' | 'users' | 'settings' | 'presets'
  >('overview');

  // Search & Filter in Listings Tab
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Editing Commercial Banner Ad Modal / Drawer
  const [editingBanner, setEditingBanner] = useState<CommercialBannerAd | null>(null);
  const [isNewBanner, setIsNewBanner] = useState(false);

  // Editing Listing Modal / Drawer
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isNewListing, setIsNewListing] = useState(false);

  // Local copy of Hero Spotlight & Platform Settings for smooth editing
  const [localSpotlight, setLocalSpotlight] = useState<HeroSpotlightConfig>(heroSpotlight);
  const [localPlatformConfig, setLocalPlatformConfig] = useState<PlatformConfig>(platformConfig);
  const [spotlightSavedMsg, setSpotlightSavedMsg] = useState(false);
  const [platformSavedMsg, setPlatformSavedMsg] = useState(false);

  // File Upload input references
  const bannerFileRef = useRef<HTMLInputElement>(null);
  const listingFileRef = useRef<HTMLInputElement>(null);
  const spotlightFileRef = useRef<HTMLInputElement>(null);

  // Password Management State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  // Sync props to local form states when dashboard opens
  React.useEffect(() => {
    setLocalSpotlight(heroSpotlight);
  }, [heroSpotlight]);

  React.useEffect(() => {
    setLocalPlatformConfig(platformConfig);
  }, [platformConfig]);

  if (!isOpen) return null;

  // Filter listings
  const filteredListings = listings.filter((l) => {
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && l.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q) || (l.titleAr && l.titleAr.toLowerCase().includes(q));
      const matchSeller = l.seller.name.toLowerCase().includes(q);
      const matchLoc = l.location.toLowerCase().includes(q);
      if (!matchTitle && !matchSeller && !matchLoc) return false;
    }
    return true;
  });

  const freeListingsCount = listings.filter(l => !l.isFeatured && l.featuredTier !== 'vip_gold').length;
  const paidListingsCount = listings.filter(l => l.isFeatured || l.featuredTier === 'vip_gold').length;
  const pendingCount = listings.filter(l => l.status === 'pending').length;

  // Helper to convert uploaded File to Data URL
  const handleFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- COMMERCIAL BANNER HANDLERS ---
  const handleOpenEditBanner = (banner: CommercialBannerAd) => {
    setEditingBanner({ ...banner });
    setIsNewBanner(false);
  };

  const handleOpenNewBanner = () => {
    const newBannerObj: CommercialBannerAd = {
      id: `banner-${Date.now()}`,
      title: 'Qatar Luxury Showcase 2026',
      titleAr: 'معرض قطر للفخامة والسيارات 2026',
      subtitle: 'Exclusive VIP Offers, Warranty & Immediate Financing in Doha',
      subtitleAr: 'عروض حصرية وضمان شامل وتمويل مباشر في الدوحة',
      advertiserName: 'Premium Qatar Motors',
      advertiserLogo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=120&q=80',
      badgeText: 'OFFICIAL SPONSOR',
      badgeTextAr: 'راعي رسمي معتمد',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      categoryTag: 'vehicles',
      ctaText: 'Explore Collection',
      ctaTextAr: 'تصفح العروض',
      whatsappNumber: '+97477315415',
      phone: '+97477315415',
      location: 'Doha - Lusail City & West Bay',
      impressions: 12500,
      clicks: 890,
      status: 'active',
      isSponsored: true
    };
    setEditingBanner(newBannerObj);
    setIsNewBanner(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    let updated: CommercialBannerAd[];
    if (isNewBanner) {
      updated = [editingBanner, ...commercialBanners];
    } else {
      updated = commercialBanners.map(b => b.id === editingBanner.id ? editingBanner : b);
    }
    onUpdateCommercialBanners(updated);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (bannerId: string) => {
    if (confirm('Are you sure you want to delete this commercial banner?')) {
      const updated = commercialBanners.filter(b => b.id !== bannerId);
      onUpdateCommercialBanners(updated);
    }
  };

  // --- LISTINGS HANDLERS ---
  const handleOpenEditListing = (listing: Listing) => {
    setEditingListing({ ...listing, images: [...listing.images] });
    setIsNewListing(false);
  };

  const handleOpenNewListing = () => {
    const newListingObj: Listing = {
      id: `list-${Date.now()}`,
      title: 'New Qatar Premium Listing',
      titleAr: 'إعلان قطر جديد ومميز',
      category: 'vehicles',
      subcategory: 'cars',
      price: 150000,
      currency: 'QAR',
      location: 'Doha - The Pearl-Qatar',
      coordinates: {
        lat: 25.3713,
        lng: 51.5516,
        areaName: 'The Pearl-Qatar'
      },
      condition: 'Brand New',
      images: [
        'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Clean vehicle / property in excellent showroom condition. Qatar agency inspection verified.',
      seller: {
        id: `sel-${Date.now()}`,
        name: 'MarketPro Verified Seller',
        nameAr: 'بائع معتمد',
        phone: '+97477315415',
        whatsapp: '+97477315415',
        email: 'seller@marketpro.qa',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        isVerified: true,
        rating: 5.0,
        reviewCount: 12,
        joinedDate: 'Joined Recently',
        responseRate: '100%',
        responseTime: '5 mins',
        location: 'Doha',
        isOnline: true
      },
      isFeatured: true,
      isVerifiedAd: true,
      isNegotiable: true,
      views: 120,
      likes: 18,
      featuredTier: 'vip_gold',
      createdAt: 'Just now',
      specs: {
        'Condition': 'Excellent',
        'Inspection': 'Passed Metrash2 / Agency'
      },
      status: 'active',
      escrowEligible: true,
      deliveryAvailable: true
    };
    setEditingListing(newListingObj);
    setIsNewListing(true);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;

    if (isNewListing) {
      onAddListing(editingListing);
    } else {
      onUpdateListing(editingListing);
    }
    setEditingListing(null);
  };

  // --- HERO SPOTLIGHT SAVE ---
  const handleSaveHeroSpotlight = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHeroSpotlight(localSpotlight);
    setSpotlightSavedMsg(true);
    setTimeout(() => setSpotlightSavedMsg(false), 3000);
  };

  // --- PLATFORM CONFIG SAVE ---
  const handleSavePlatformConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePlatformConfig(localPlatformConfig);
    setPlatformSavedMsg(true);
    setTimeout(() => setPlatformSavedMsg(false), 3000);
  };

  // --- ADMIN PASSWORD HANDLER ---
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = getStoredAdminPassword();

    if (currentPasswordInput.trim() !== stored) {
      setPasswordChangeStatus({ type: 'error', message: 'Current password is incorrect.' });
      return;
    }

    if (newPasswordInput.length < 5) {
      setPasswordChangeStatus({ type: 'error', message: 'New password must be at least 5 characters long.' });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setStoredAdminPassword(newPasswordInput.trim());
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordChangeStatus({ type: 'success', message: 'Admin Master Password updated successfully!' });

    setTimeout(() => {
      setPasswordChangeStatus({ type: 'idle', message: '' });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-6xl shadow-2xl border border-slate-800 my-auto max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Admin Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8A1538] to-amber-500 flex items-center justify-center text-white shadow-lg">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  MarketPro Qatar Admin Command Center
                </h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  LIVE CONTROL
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  <Lock className="w-3 h-3 text-amber-400" /> Protected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Change default ads, update images, manage billboard banners, hero spotlight & Qatar classifieds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onResetDefaults && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset all ads, hero images, and billboard banners back to system defaults?')) {
                    onResetDefaults();
                  }
                }}
                className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-950 hover:text-amber-300 text-slate-300 text-xs font-bold transition-all items-center gap-1.5 border border-slate-700 hover:border-amber-800"
                title="Restore default mock ads and images"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            )}

            {onLockAdmin && (
              <button
                type="button"
                onClick={onLockAdmin}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 hover:border-rose-800"
                title="Lock admin session"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Lock / Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Overview & KPIs
          </button>

          <button
            onClick={() => setActiveTab('billboards')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'billboards'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-400" /> Corporate Billboard Ads ({commercialBanners.length})
          </button>

          <button
            onClick={() => setActiveTab('hero_spotlight')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'hero_spotlight'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" /> Hero Spotlight & Banner
          </button>

          <button
            onClick={() => setActiveTab('listings_manager')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 relative ${
              activeTab === 'listings_manager'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Classified Ads & Moderation ({listings.length})
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] animate-pulse">
                {pendingCount} Pending Review
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'presets'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Qatar Image Presets
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'transactions'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" /> Escrow & Payments ({transactions.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'users'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Sellers & KYC
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'settings'
                ? 'bg-[#8A1538] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Settings & Password
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-[11px] font-semibold text-slate-400 block">Total Market Volume</span>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {(stats.totalVolumeQAR / 1000000).toFixed(1)}M <span className="text-xs text-amber-400">QAR</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                    ↑ Live platform volume
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-[11px] font-semibold text-slate-400 block">Active Qatar Listings</span>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {listings.length}
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                    {paidListingsCount} VIP/Boosted • {freeListingsCount} Free
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-[11px] font-semibold text-slate-400 block">Billboard Sponsor Ads</span>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {commercialBanners.length} <span className="text-xs text-slate-300">Banners</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                    Active on homepage carousel
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                  <span className="text-[11px] font-semibold text-slate-400 block">Verified Qatar Sellers</span>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1">
                    {stats.verifiedSellers.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> QID checked
                  </span>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveTab('billboards')}
                  className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-amber-500 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                      <Megaphone className="w-5 h-5" />
                    </span>
                    <span className="text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">Edit Banners →</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">Billboard Sponsor Ads</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Change banner images, titles, sponsor names, phone/WhatsApp links, or add new billboards.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('hero_spotlight')}
                  className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-rose-500 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-2xl bg-[#8A1538]/30 text-rose-300">
                      <Flame className="w-5 h-5" />
                    </span>
                    <span className="text-xs text-rose-300 font-bold group-hover:translate-x-1 transition-transform">Edit Spotlight →</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">Homepage Hero Spotlight</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Change the prominent VIP card image, price, title, and description featured on top of the site.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab('listings_manager')}
                  className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">Manage Ads →</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">Ad Listings & Photo Manager</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Modify existing default ads, replace photos, edit pricing, or post your own official listings.
                  </p>
                </div>
              </div>

              {/* Broadcast Banner Preview */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Broadcast Announcement</span>
                    <p className="text-xs text-white font-medium">"{platformConfig.announcementNotice}"</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-3 py-1 bg-slate-900 hover:bg-[#8A1538] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Edit Notice
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CORPORATE BILLBOARD ADS & BANNERS */}
          {activeTab === 'billboards' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    Corporate Billboard & Sponsor Banners (إعلانات البنرات والرعاة)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    These carousel banners appear at the top of the homepage and category sections. You can edit any details or upload custom images.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewBanner}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add New Billboard Banner
                </button>
              </div>

              {/* Billboard Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commercialBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-all"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700">
                        <img
                          src={banner.imageUrl}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                            #{index + 1} {banner.badgeText || 'SPONSORED'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            banner.status === 'active' ? 'bg-emerald-500/80 text-white' : 'bg-rose-500/80 text-white'
                          }`}>
                            {banner.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="mt-3 space-y-1">
                        <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wide">
                          {banner.advertiserName}
                        </span>
                        <h4 className="text-sm font-black text-white line-clamp-1">{banner.title}</h4>
                        <p className="text-xs text-slate-300 line-clamp-2">{banner.subtitle}</p>

                        <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-amber-400" /> {banner.phone || PLATFORM_PHONE_DISPLAY}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-emerald-400" /> {banner.whatsappNumber || '+974 7731 5415'}
                          </span>
                          <span>CTA: <strong className="text-white">{banner.ctaText}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {banner.impressions.toLocaleString()} views • {banner.clicks.toLocaleString()} clicks
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditBanner(banner)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#8A1538] text-white text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Details & Image
                        </button>

                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HERO SPOTLIGHT & PROMO BANNER */}
          {activeTab === 'hero_spotlight' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Homepage Hero Spotlight Card Editor (إعلان الصدارة في الصفحة الرئيسية)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update the featured showcase card on the homepage bento grid. You can set custom title, price, location, and upload your own image.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Live Preview Card */}
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Live Preview</span>
                  <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                        {localSpotlight.badge || 'VIP Spotlight'}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" /> {localSpotlight.location || 'The Pearl-Qatar'}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                      <img
                        src={localSpotlight.imageUrl}
                        alt={localSpotlight.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2.5 left-2.5 text-white bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-xl">
                        <span className="text-[10px] font-medium text-amber-300">{localSpotlight.subLocation}</span>
                        <p className="text-sm font-black">{localSpotlight.price}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white line-clamp-1">{localSpotlight.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{localSpotlight.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {localSpotlight.escrowGuaranteed ? 'Escrow Guaranteed' : 'Verified Listing'}
                      </span>
                      <span className="text-slate-400 capitalize">Category: {localSpotlight.category}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-7 bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
                  <form onSubmit={handleSaveHeroSpotlight} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Spotlight Title (English)
                        </label>
                        <input
                          type="text"
                          value={localSpotlight.title}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, title: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Spotlight Title (Arabic)
                        </label>
                        <input
                          type="text"
                          value={localSpotlight.titleAr || ''}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, titleAr: e.target.value })}
                          placeholder="العنوان بالعربية"
                          className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-medium text-right"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Display Price
                        </label>
                        <input
                          type="text"
                          value={localSpotlight.price}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, price: e.target.value })}
                          placeholder="e.g. 4,250,000 QAR"
                          className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Location Area
                        </label>
                        <select
                          value={localSpotlight.location}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, location: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-medium"
                        >
                          {QATAR_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Sub-location / Neighborhood
                        </label>
                        <input
                          type="text"
                          value={localSpotlight.subLocation}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, subLocation: e.target.value })}
                          placeholder="e.g. Porto Arabia Marina"
                          className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>
                    </div>

                    {/* Image URL & File Upload */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        Spotlight Image
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={localSpotlight.imageUrl}
                          onChange={(e) => setLocalSpotlight({ ...localSpotlight, imageUrl: e.target.value })}
                          placeholder="Paste image URL here..."
                          className="flex-1 text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                        />

                        <input
                          type="file"
                          ref={spotlightFileRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], (dataUrl) => {
                                setLocalSpotlight({ ...localSpotlight, imageUrl: dataUrl });
                              });
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => spotlightFileRef.current?.click()}
                          className="px-3 py-2 bg-slate-900 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1"
                          title="Upload image from device"
                        >
                          <Upload className="w-3.5 h-3.5 text-amber-400" />
                          <span>Upload</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Highlights / Description
                      </label>
                      <textarea
                        rows={2}
                        value={localSpotlight.description}
                        onChange={(e) => setLocalSpotlight({ ...localSpotlight, description: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-emerald-400 font-bold">
                        {spotlightSavedMsg && '✓ Hero Spotlight updated live on homepage!'}
                      </span>

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#8A1538] hover:bg-rose-900 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" /> Save Spotlight Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLASSIFIED ADS & PHOTO MANAGER */}
          {activeTab === 'listings_manager' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Pending Moderation Alert Banner if any ads are waiting */}
              {pendingCount > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{pendingCount} Ad(s) Waiting For Your Approval & Verification</span>
                        <span className="px-2 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">ACTION REQUIRED</span>
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        New ads posted by users are hidden from the marketplace until you verify and click <strong>Approve & Post</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStatusFilter('pending')}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all shrink-0"
                  >
                    View Pending Ads ({pendingCount})
                  </button>
                </div>
              )}

              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-800/60 p-3 rounded-2xl border border-slate-700">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search title, seller, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 rounded-xl border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-slate-900 text-xs rounded-xl border border-slate-700 px-3 py-2 text-white font-medium"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="bg-slate-900 text-xs rounded-xl border border-slate-700 px-3 py-2 text-white font-medium"
                  >
                    <option value="all">All Statuses ({listings.length})</option>
                    <option value="active">Active Only</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <button
                  onClick={handleOpenNewListing}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" /> Create Custom Ad
                </button>
              </div>

              {/* Listings Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3">Ad Details & Photo</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Seller</th>
                      <th className="p-3">Ad Tier</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredListings.map((l) => {
                      const isVip = l.featuredTier === 'vip_gold';
                      const isFeatured = l.featuredTier === 'featured' || l.isFeatured;

                      return (
                        <tr key={l.id} className="hover:bg-slate-800/40">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={l.images[0]}
                                alt={l.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700"
                              />
                              <div className="min-w-0 max-w-[240px]">
                                <p className="font-bold text-white truncate">{l.title}</p>
                                <p className="text-[11px] text-slate-400 truncate">{l.location}</p>
                                <span className="text-[10px] text-slate-500">{l.images.length} photo(s)</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 capitalize">{l.category}</td>
                          <td className="p-3 font-bold text-amber-400">
                            {l.price.toLocaleString()} {l.currency}
                          </td>
                          <td className="p-3">
                            <div>
                              <p className="font-semibold text-white truncate">{l.seller.name}</p>
                              <span className="text-[10px] text-slate-400">{l.seller.phone}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            {isVip ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                👑 VIP GOLD
                              </span>
                            ) : isFeatured ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300">
                                ⭐ FEATURED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">
                                FREE AD
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              l.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : l.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {l.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => onApproveListing(l.id)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                                    title="Verify & Publish Ad Live to Qatar Marketplace"
                                  >
                                    <Check className="w-3.5 h-3.5" /> Approve & Post
                                  </button>
                                  <button
                                    onClick={() => onRejectListing(l.id)}
                                    className="px-2.5 py-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                                    title="Reject Ad"
                                  >
                                    <X className="w-3.5 h-3.5" /> Reject
                                  </button>
                                </>
                              )}

                              {l.status === 'rejected' && (
                                <button
                                  onClick={() => onApproveListing(l.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                                  title="Re-approve Ad"
                                >
                                  <Check className="w-3.5 h-3.5" /> Re-Approve
                                </button>
                              )}

                              <button
                                onClick={() => handleOpenEditListing(l)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-[#8A1538] text-white text-xs font-bold flex items-center gap-1 transition-colors"
                                title="Edit Listing Details & Photos"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>

                              <button
                                onClick={() => onToggleFeatureListing(l.id)}
                                className={`p-1.5 rounded-lg text-xs ${
                                  isVip
                                    ? 'bg-amber-400 text-slate-950 font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                                title="Toggle VIP Gold Tier"
                              >
                                <Crown className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => onDeleteListing(l.id)}
                                className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 transition-colors"
                                title="Delete Listing"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: QATAR IMAGE PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  Qatar Curated Image Gallery Presets (مكتبة الصور الجاهزة)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click on any high-resolution image to copy its URL or quickly apply it to the homepage hero spotlight.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {QATAR_IMAGE_PRESETS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5 flex flex-col justify-between hover:border-amber-500 transition-all"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] text-amber-300 font-bold">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-2 truncate">{item.name}</h4>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-700/80">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.url);
                          alert('Image URL copied to clipboard!');
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-[11px] font-semibold transition-colors"
                      >
                        Copy URL
                      </button>

                      <button
                        onClick={() => {
                          onUpdateHeroSpotlight({
                            ...heroSpotlight,
                            imageUrl: item.url
                          });
                          alert(`Applied "${item.name}" to Homepage Hero Spotlight!`);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black transition-colors"
                        title="Set as Hero Spotlight Image"
                      >
                        Set Spotlight
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TRANSACTIONS & ESCROW */}
          {activeTab === 'transactions' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Escrow Safe-Hold: Payouts release only after buyer in-person confirmation or 48h handover window in Qatar.</span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-3">Txn ID</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Buyer / Seller</th>
                      <th className="p-3">Gateway</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Escrow Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono text-white font-bold">{t.id}</td>
                        <td className="p-3 capitalize">{t.type.replace('_', ' ')}</td>
                        <td className="p-3 font-bold text-amber-400">
                          {t.amount.toLocaleString()} {t.currency}
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="text-white font-semibold">{t.buyerName}</p>
                            {t.sellerName && <p className="text-[10px] text-slate-400">to {t.sellerName}</p>}
                          </div>
                        </td>
                        <td className="p-3 font-bold text-rose-400">{t.method}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : t.status === 'escrow_held'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}>
                            {t.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {t.status === 'escrow_held' ? (
                            <button
                              onClick={() => onReleaseEscrow(t.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px]"
                            >
                              Release Payout
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500">Settled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: USERS & KYC */}
          {activeTab === 'users' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {listings.map((l) => (
                  <div key={l.seller.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={l.seller.avatar}
                        alt={l.seller.name}
                        className="w-12 h-12 rounded-2xl object-cover"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                          {l.seller.name}
                          {l.seller.isVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </h4>
                        <p className="text-[11px] text-slate-400">{l.seller.location}</p>
                        <p className="text-[11px] text-amber-400 font-bold">★ {l.seller.rating} rating</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">QID Verified:</span>
                      <strong className="text-emerald-400">Yes (Metrash2)</strong>
                    </div>

                    <button
                      onClick={() => onVerifyUser(l.seller.id)}
                      className="w-full py-1.5 rounded-xl bg-slate-900 hover:bg-[#8A1538] text-white text-xs font-bold transition-colors"
                    >
                      {l.seller.isVerified ? 'Re-validate Seller Badge' : 'Grant Verified Qatar Badge'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS & PASSWORD */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
              {/* Platform Details Config */}
              <form onSubmit={handleSavePlatformConfig} className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Platform Details & Broadcast Settings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Platform Name
                    </label>
                    <input
                      type="text"
                      value={localPlatformConfig.platformName}
                      onChange={(e) => setLocalPlatformConfig({ ...localPlatformConfig, platformName: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Platform Contact Phone
                    </label>
                    <input
                      type="text"
                      value={localPlatformConfig.phoneDisplay}
                      onChange={(e) => setLocalPlatformConfig({ ...localPlatformConfig, phoneDisplay: e.target.value, phone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Broadcast Announcement Banner
                  </label>
                  <textarea
                    rows={2}
                    value={localPlatformConfig.announcementNotice}
                    onChange={(e) => setLocalPlatformConfig({ ...localPlatformConfig, announcementNotice: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Ad Moderation & Verification Control Switch */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Require Admin Verification Before Ad Goes Live (موافقة الإدارة المسبقة قبل النشر)
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        When enabled, newly posted ads stay in <strong>Pending</strong> state until you review and click <strong>Approve & Publish</strong> in the admin panel.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
                      <input
                        type="checkbox"
                        checked={localPlatformConfig.requireAdminApprovalForNewAds !== false}
                        onChange={(e) => setLocalPlatformConfig({
                          ...localPlatformConfig,
                          requireAdminApprovalForNewAds: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-bold">
                    {platformSavedMsg && '✓ Platform configuration updated!'}
                  </span>
                  <button
                    type="submit"
                    className="py-2 px-5 rounded-xl bg-[#8A1538] hover:bg-rose-900 text-white text-xs font-bold shadow-md flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Configuration
                  </button>
                </div>
              </form>

              {/* Admin Master Password Card */}
              <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    Admin Master Password Protection
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Current password"
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Min 5 characters"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Re-enter password"
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  {passwordChangeStatus.type === 'error' && (
                    <p className="text-xs text-rose-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {passwordChangeStatus.message}
                    </p>
                  )}

                  {passwordChangeStatus.type === 'success' && (
                    <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {passwordChangeStatus.message}
                    </p>
                  )}

                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      disabled={!currentPasswordInput || !newPasswordInput || !confirmPasswordInput}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- MODAL 1: EDIT / CREATE COMMERCIAL BILLBOARD BANNER --- */}
      {editingBanner && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="font-black text-sm text-white flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                {isNewBanner ? 'Add New Corporate Billboard Ad' : 'Edit Corporate Billboard Ad'}
              </h3>
              <button
                onClick={() => setEditingBanner(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Advertiser / Sponsor Name *
                  </label>
                  <input
                    type="text"
                    value={editingBanner.advertiserName}
                    onChange={(e) => setEditingBanner({ ...editingBanner, advertiserName: e.target.value })}
                    placeholder="e.g. Alfardan Premier Motors"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Badge Tag (e.g. SPONSORED SHOWROOM)
                  </label>
                  <input
                    type="text"
                    value={editingBanner.badgeText}
                    onChange={(e) => setEditingBanner({ ...editingBanner, badgeText: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Banner Headline Title *
                </label>
                <input
                  type="text"
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  placeholder="e.g. Defender 2025 Exclusive Ramadan Package"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Subtitle / Special Offer Description
                </label>
                <textarea
                  rows={2}
                  value={editingBanner.subtitle}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  placeholder="e.g. 5-Year Free Service & 0% Down Payment..."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Banner Image URL & File Upload */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-300">
                  Banner Background Image *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingBanner.imageUrl}
                    onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                    required
                  />

                  <input
                    type="file"
                    ref={bannerFileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], (dataUrl) => {
                          setEditingBanner({ ...editingBanner, imageUrl: dataUrl });
                        });
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => bannerFileRef.current?.click()}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload</span>
                  </button>
                </div>

                {editingBanner.imageUrl && (
                  <div className="relative aspect-[16/6] rounded-xl overflow-hidden border border-slate-700 mt-2">
                    <img
                      src={editingBanner.imageUrl}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={editingBanner.ctaText}
                    onChange={(e) => setEditingBanner({ ...editingBanner, ctaText: e.target.value })}
                    placeholder="e.g. Book Test Drive"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={editingBanner.whatsappNumber}
                    onChange={(e) => setEditingBanner({ ...editingBanner, whatsappNumber: e.target.value })}
                    placeholder="+974 7731 5415"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Location / Showroom
                  </label>
                  <input
                    type="text"
                    value={editingBanner.location}
                    onChange={(e) => setEditingBanner({ ...editingBanner, location: e.target.value })}
                    placeholder="e.g. West Bay, Doha"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={editingBanner.categoryTag}
                    onChange={(e) => setEditingBanner({ ...editingBanner, categoryTag: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                  >
                    <option value="vehicles">Motors & Vehicles</option>
                    <option value="properties">Properties & Real Estate</option>
                    <option value="electronics">Electronics</option>
                    <option value="luxury">Luxury & Watches</option>
                    <option value="finance">Banking & Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Banner Status
                  </label>
                  <select
                    value={editingBanner.status}
                    onChange={(e: any) => setEditingBanner({ ...editingBanner, status: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="ended">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBanner(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Save Billboard Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: EDIT / CREATE CLASSIFIED AD & PHOTOS --- */}
      {editingListing && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-3xl w-full max-w-3xl border border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="font-black text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {isNewListing ? 'Create New Classified Ad' : 'Edit Classified Ad Details & Photos'}
              </h3>
              <button
                onClick={() => setEditingListing(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Ad Title *
                </label>
                <input
                  type="text"
                  value={editingListing.title}
                  onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                  placeholder="e.g. Toyota Land Cruiser VXR 2024 Twin Turbo"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Price (QAR) *
                  </label>
                  <input
                    type="number"
                    value={editingListing.price}
                    onChange={(e) => setEditingListing({ ...editingListing, price: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingListing.category}
                    onChange={(e) => setEditingListing({ ...editingListing, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Location in Qatar *
                  </label>
                  <select
                    value={editingListing.location}
                    onChange={(e) => setEditingListing({ ...editingListing, location: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium"
                  >
                    {QATAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photos Manager */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-slate-300">
                    Listing Photos ({editingListing.images.length})
                  </label>
                  <span className="text-[10px] text-slate-400">First photo is cover image</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {editingListing.images.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-700 group">
                      <img
                        src={imgUrl}
                        alt={`Photo ${imgIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = editingListing.images.filter((_, i) => i !== imgIdx);
                          setEditingListing({ ...editingListing, images: newImages.length ? newImages : ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'] });
                        }}
                        className="absolute top-1 right-1 p-1 rounded-md bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      {imgIdx === 0 && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Add New Image Button */}
                  <div className="aspect-video rounded-xl border border-dashed border-slate-700 bg-slate-950/50 flex flex-col items-center justify-center p-2 text-center">
                    <input
                      type="file"
                      ref={listingFileRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0], (dataUrl) => {
                            setEditingListing({ ...editingListing, images: [...editingListing.images, dataUrl] });
                          });
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => listingFileRef.current?.click()}
                      className="text-[10px] text-amber-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Photo
                    </button>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    id="add-photo-url-input"
                    placeholder="Or paste image URL and click Add..."
                    className="flex-1 text-xs p-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('add-photo-url-input') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        setEditingListing({ ...editingListing, images: [...editingListing.images, input.value.trim()] });
                        input.value = '';
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingListing.description}
                  onChange={(e) => setEditingListing({ ...editingListing, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Seller Information */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block">
                  Seller Contact Info
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Seller Name</label>
                    <input
                      type="text"
                      value={editingListing.seller.name}
                      onChange={(e) => setEditingListing({
                        ...editingListing,
                        seller: { ...editingListing.seller, name: e.target.value }
                      })}
                      className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Phone Number</label>
                    <input
                      type="text"
                      value={editingListing.seller.phone}
                      onChange={(e) => setEditingListing({
                        ...editingListing,
                        seller: { ...editingListing.seller, phone: e.target.value }
                      })}
                      className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">WhatsApp</label>
                    <input
                      type="text"
                      value={editingListing.seller.whatsapp}
                      onChange={(e) => setEditingListing({
                        ...editingListing,
                        seller: { ...editingListing.seller, whatsapp: e.target.value }
                      })}
                      className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Tier & Status Flags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Ad Tier</label>
                  <select
                    value={editingListing.featuredTier || 'standard'}
                    onChange={(e: any) => setEditingListing({
                      ...editingListing,
                      featuredTier: e.target.value,
                      isFeatured: e.target.value !== 'standard'
                    })}
                    className="w-full text-xs p-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="standard">Standard Free Ad</option>
                    <option value="featured">Featured Pro (49 QAR)</option>
                    <option value="vip_gold">VIP Gold (99 QAR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Status</label>
                  <select
                    value={editingListing.status}
                    onChange={(e: any) => setEditingListing({ ...editingListing, status: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Escrow Eligible</label>
                  <select
                    value={editingListing.escrowEligible ? 'yes' : 'no'}
                    onChange={(e) => setEditingListing({ ...editingListing, escrowEligible: e.target.value === 'yes' })}
                    className="w-full text-xs p-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="yes">Yes (Safe Hold)</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Delivery Available</label>
                  <select
                    value={editingListing.deliveryAvailable ? 'yes' : 'no'}
                    onChange={(e) => setEditingListing({ ...editingListing, deliveryAvailable: e.target.value === 'yes' })}
                    className="w-full text-xs p-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8A1538] hover:bg-rose-900 text-white text-xs font-bold shadow-md flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Save Ad Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
