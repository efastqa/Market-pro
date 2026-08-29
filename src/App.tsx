import React, { useState, useMemo, useEffect } from 'react';
import { 
  INITIAL_LISTINGS, 
  CATEGORIES, 
  INITIAL_REVIEWS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_ADMIN_STATS, 
  INITIAL_TRANSACTIONS,
  COMMERCIAL_BANNER_ADS,
  INITIAL_HERO_SPOTLIGHT,
  INITIAL_PLATFORM_CONFIG,
  PLATFORM_PHONE_DISPLAY,
  PLATFORM_WHATSAPP_LINK
} from './data/mockData';
import { 
  Listing, 
  FilterState, 
  Review, 
  Conversation, 
  AdminStats, 
  PaymentTransaction,
  CommercialBannerAd,
  HeroSpotlightConfig,
  PlatformConfig,
  SavedSearchAlert
} from './types';
import { CurrencyCode } from './utils/currency';
import { 
  subscribeToListings, 
  saveListingToFirestore, 
  updateListingStatusInFirestore, 
  deleteListingFromFirestore,
  recordTransactionInFirestore,
  saveSearchAlertToFirestore,
  getLocalDeletedIds,
  recordDeletedIdLocally
} from './services/firebaseService';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { PostAdModal } from './components/PostAdModal';
import { QatarMapExplorer } from './components/QatarMapExplorer';
import { ChatSystem } from './components/ChatSystem';
import { AdminDashboard } from './components/AdminDashboard';
import { PaymentModal } from './components/PaymentModal';
import { ContactSection } from './components/ContactSection';
import { FilterSidebar } from './components/FilterSidebar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';

// Advanced Qatar Tools & Modals
import { FinanceCalculatorModal } from './components/FinanceCalculatorModal';
import { SpecialPlatesModal } from './components/SpecialPlatesModal';
import { MarketValuationModal } from './components/MarketValuationModal';
import { MetrashGuideModal } from './components/MetrashGuideModal';
import { CompareModal } from './components/CompareModal';
import { AdvertisingHubModal } from './components/AdvertisingHubModal';
import { CommercialBannerStrip } from './components/CommercialBannerStrip';
import { AdminAuthModal, isSessionAdminAuthenticated, setSessionAdminAuthenticated } from './components/AdminAuthModal';
import { InstallAppModal } from './components/InstallAppModal';
import { StoryPosterModal } from './components/StoryPosterModal';
import { SavedAlertsModal } from './components/SavedAlertsModal';
import { AdPackage } from './types';

import { 
  SlidersHorizontal, 
  Flame, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowUpDown, 
  CheckCircle2, 
  Phone,
  LayoutGrid,
  Map as MapIcon,
  Crown,
  Scale,
  X,
  Calculator,
  FileCheck2,
  TrendingUp,
  Car,
  Smartphone,
  Download
} from 'lucide-react';

export default function App() {
  // State Management with LocalStorage persistence for Admin customizations
  const [listings, setListings] = useState<Listing[]>(() => {
    const deletedIds = getLocalDeletedIds();
    try {
      const saved = localStorage.getItem('marketpro_listings_custom');
      if (saved) {
        const parsed: Listing[] = JSON.parse(saved);
        return parsed.filter(l => !deletedIds.has(l.id));
      }
    } catch (e) {}
    return INITIAL_LISTINGS.filter(l => !deletedIds.has(l.id));
  });

  const [commercialBanners, setCommercialBanners] = useState<CommercialBannerAd[]>(() => {
    try {
      const saved = localStorage.getItem('marketpro_commercial_banners_custom');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return COMMERCIAL_BANNER_ADS;
  });

  const [heroSpotlight, setHeroSpotlight] = useState<HeroSpotlightConfig>(() => {
    try {
      const saved = localStorage.getItem('marketpro_hero_spotlight_custom');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_HERO_SPOTLIGHT;
  });

  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(() => {
    try {
      const saved = localStorage.getItem('marketpro_platform_config_custom');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PLATFORM_CONFIG;
  });

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [savedListingIds, setSavedListingIds] = useState<string[]>(['list-1', 'list-3']);
  const [compareListings, setCompareListings] = useState<Listing[]>([]);

  // Automatically subscribe to real-time Firestore sync
  useEffect(() => {
    const unsubscribe = subscribeToListings((liveListings) => {
      if (Array.isArray(liveListings)) {
        setListings(liveListings);
      }
    });
    return () => unsubscribe();
  }, []);

  // Automatically save customizations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marketpro_listings_custom', JSON.stringify(listings));
    } catch (e) {}
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('marketpro_commercial_banners_custom', JSON.stringify(commercialBanners));
    } catch (e) {}
  }, [commercialBanners]);

  useEffect(() => {
    try {
      localStorage.setItem('marketpro_hero_spotlight_custom', JSON.stringify(heroSpotlight));
    } catch (e) {}
  }, [heroSpotlight]);

  useEffect(() => {
    try {
      localStorage.setItem('marketpro_platform_config_custom', JSON.stringify(platformConfig));
    } catch (e) {}
  }, [platformConfig]);

  // Currency State
  const [currency, setCurrency] = useState<CurrencyCode>('QAR');

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
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
    sortBy: 'newest',
  });

  // UI Modals & Views State
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatActiveListing, setChatActiveListing] = useState<Listing | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentListing, setPaymentListing] = useState<Listing | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'map' | 'motors' | 'properties'>('all');

  // Advanced Tools Modal State
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [financeListing, setFinanceListing] = useState<Listing | null>(null);
  const [isSpecialPlatesOpen, setIsSpecialPlatesOpen] = useState(false);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [isMetrashGuideOpen, setIsMetrashGuideOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdvertisingHubOpen, setIsAdvertisingHubOpen] = useState(false);
  const [advertisingSelectedListing, setAdvertisingSelectedListing] = useState<Listing | null>(null);

  // QR Story & Status Poster State
  const [isStoryPosterOpen, setIsStoryPosterOpen] = useState(false);
  const [storyPosterListing, setStoryPosterListing] = useState<Listing | null>(null);

  // Saved Search Alerts State with LocalStorage persistence
  const [isSavedAlertsOpen, setIsSavedAlertsOpen] = useState(false);
  const [savedAlerts, setSavedAlerts] = useState<SavedSearchAlert[]>(() => {
    try {
      const saved = localStorage.getItem('marketpro_saved_alerts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'alert-default-1',
        title: 'Toyota Land Cruiser 2024 (Doha)',
        query: 'Land Cruiser',
        category: 'vehicles',
        categoryName: 'Motors & Vehicles',
        location: 'Doha',
        frequency: 'instant',
        channel: 'both',
        createdAt: '2 days ago',
        matchCount: 4,
        isActive: true,
        notifyOnWhatsApp: true
      },
      {
        id: 'alert-default-2',
        title: 'Rolex Luxury Watches (Qatar)',
        query: 'Rolex',
        category: 'luxury',
        categoryName: 'Luxury & Watches',
        location: 'All Qatar',
        frequency: 'instant',
        channel: 'both',
        createdAt: '5 days ago',
        matchCount: 2,
        isActive: true,
        notifyOnWhatsApp: true
      }
    ];
  });

  // Persist alerts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marketpro_saved_alerts', JSON.stringify(savedAlerts));
    } catch (e) {}
  }, [savedAlerts]);

  // Progressive Web App (PWA) & Mobile Installation State
  const [isInstallAppOpen, setIsInstallAppOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'ar'>('en');

  // Listen to PWA install prompt events
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };

    // Check if running as standalone PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsAppInstalled(true);
      setShowInstallBanner(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Dark Mode class toggle on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Filter Update
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string) => {
    setSavedListingIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compare Tool Handlers
  const handleToggleCompare = (listing: Listing) => {
    setCompareListings((prev) => {
      const exists = prev.some((l) => l.id === listing.id);
      if (exists) {
        return prev.filter((l) => l.id !== listing.id);
      }
      if (prev.length >= 4) {
        // limit to 4 comparisons max
        return [...prev.slice(1), listing];
      }
      return [...prev, listing];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareListings((prev) => prev.filter((l) => l.id !== id));
  };

  const handleClearCompare = () => {
    setCompareListings([]);
  };

  // Finance Calculator Launcher
  const handleOpenFinance = (listing?: Listing) => {
    setFinanceListing(listing || null);
    setIsFinanceOpen(true);
  };

  // Filtered and Sorted Listings (Public view displays 'active' verified ads only)
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Only display approved active listings on the public marketplace
      if (item.status !== 'active') {
        return false;
      }

      // Keyword search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesSeller = item.seller.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesLoc && !matchesSeller) {
          return false;
        }
      }

      // Category
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Subcategory
      if (filters.subcategory && item.subcategory !== filters.subcategory) {
        return false;
      }

      // Location
      if (filters.location && filters.location !== 'All Qatar' && !item.location.toLowerCase().includes(filters.location.toLowerCase().split(' - ')[0])) {
        return false;
      }

      // Price
      if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
        return false;
      }

      // Condition
      if (filters.condition && item.condition !== filters.condition) {
        return false;
      }

      // Featured only
      if (filters.isFeaturedOnly && !item.isFeatured) {
        return false;
      }

      // Verified only
      if (filters.isVerifiedOnly && !item.seller.isVerified) {
        return false;
      }

      // Tab specific quick filters
      if (activeTab === 'vip' && item.featuredTier !== 'vip_gold') {
        return false;
      }
      if (activeTab === 'motors' && item.category !== 'vehicles') {
        return false;
      }
      if (activeTab === 'properties' && item.category !== 'properties') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'popular') return b.views - a.views;
      // default: VIP Gold first, then featured, then newest
      if (a.featuredTier === 'vip_gold' && b.featuredTier !== 'vip_gold') return -1;
      if (b.featuredTier === 'vip_gold' && a.featuredTier !== 'vip_gold') return 1;
      return b.views - a.views;
    });
  }, [listings, filters, activeTab]);

  // Actions for Post Ad
  const handleAddListing = (newListing: Listing) => {
    setListings((prev) => [newListing, ...prev]);
    saveListingToFirestore(newListing).catch((err) => console.warn('Firestore write warning:', err));
    setAdminStats((prev) => ({
      ...prev,
      totalListings: prev.totalListings + 1,
      activeListings: prev.activeListings + 1,
      promotionsRevenueQAR: prev.promotionsRevenueQAR + (newListing.featuredTier === 'vip_gold' ? 99 : newListing.isFeatured ? 49 : 0)
    }));
  };

  // Advertising & Boost Handler
  const handleBoostListing = (listingId: string, pkg: AdPackage) => {
    const isVip = pkg.tier === 'vip_gold' || pkg.tier === 'business_pro';
    const isFeatured = pkg.tier !== 'free';

    setListings((prev) =>
      prev.map((l) => {
        if (l.id === listingId) {
          const updated = {
            ...l,
            featuredTier: isVip ? 'vip_gold' as const : isFeatured ? 'featured' as const : 'standard' as const,
            isFeatured: isFeatured,
            status: 'active' as const
          };
          saveListingToFirestore(updated).catch(console.warn);
          return updated;
        }
        return l;
      })
    );

    // If paid promotion, record transaction and update stats
    if (pkg.priceQAR > 0) {
      const targetListing = listings.find((l) => l.id === listingId);
      const boostTxn: PaymentTransaction = {
        id: `txn-boost-${Date.now()}`,
        type: 'ad_boost',
        listingId: listingId,
        listingTitle: `Ad Boost: ${targetListing ? targetListing.title : 'Marketplace Listing'} (${pkg.name})`,
        buyerName: 'Listing Owner',
        sellerName: 'MarketPro Qatar Ads Portal',
        amount: pkg.priceQAR,
        currency: 'QAR',
        method: 'QPay',
        status: 'completed',
        date: 'Just now'
      };

      setTransactions((prev) => [boostTxn, ...prev]);
      recordTransactionInFirestore(boostTxn).catch(console.warn);
      setAdminStats((prev) => ({
        ...prev,
        promotionsRevenueQAR: prev.promotionsRevenueQAR + pkg.priceQAR,
        totalTransactions: prev.totalTransactions + 1
      }));
    }
  };

  const handleSelectPackageForPost = (_pkg: AdPackage) => {
    setIsAdvertisingHubOpen(false);
    setIsPostAdOpen(true);
  };

  // Admin Access & Password Handlers
  const handleOpenAdmin = () => {
    if (isSessionAdminAuthenticated()) {
      setIsAdminOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthOpen(false);
    setIsAdminOpen(true);
  };

  const handleLockAdmin = () => {
    setSessionAdminAuthenticated(false);
    setIsAdminOpen(false);
  };

  // Actions for Review
  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const rev: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 1
    };
    setReviews((prev) => [rev, ...prev]);
  };

  // Actions for Chat
  const handleOpenChatWithListing = (listing: Listing) => {
    setChatActiveListing(listing);
    const exists = conversations.find(c => c.listingId === listing.id);
    if (!exists) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: listing.images[0],
        listingLocation: listing.location,
        otherUser: listing.seller,
        lastMessage: 'Conversation started',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'You',
            text: `Salam! I am inquiring about "${listing.title}" on MarketPro Qatar.`,
            timestamp: 'Just now',
            isRead: true
          }
        ]
      };
      setConversations((prev) => [newConv, ...prev]);
    }
    setIsChatOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string, isOffer?: boolean, offerAmount?: number) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'You',
            text,
            timestamp: 'Just now',
            isOffer,
            offerAmount,
            offerStatus: isOffer ? 'pending' as const : undefined,
            isRead: true
          };
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Simulate instant Qatari seller reply after 2 seconds
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const replyMsg = {
              id: `msg-${Date.now() + 1}`,
              senderId: c.otherUser.id,
              senderName: c.otherUser.name,
              text: isOffer 
                ? `Thank you for your offer of ${offerAmount?.toLocaleString()} QAR. I accept! We can arrange inspection or payment via MarketPro Escrow.`
                : `Wa Alaykum Assalam! Yes, still available in ${c.listingLocation}. You can call me directly on ${PLATFORM_PHONE_DISPLAY} or inspect in person.`,
              timestamp: 'Just now',
              isRead: false
            };
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              unreadCount: c.unreadCount + 1,
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1800);
  };

  // Actions for Escrow & Payment
  const handleOpenPayment = (listing: Listing) => {
    setPaymentListing(listing);
    setIsPaymentOpen(true);
  };

  const handleTransactionComplete = (txn: PaymentTransaction) => {
    setTransactions((prev) => [txn, ...prev]);
    recordTransactionInFirestore(txn).catch(console.warn);
    setAdminStats((prev) => ({
      ...prev,
      totalVolumeQAR: prev.totalVolumeQAR + txn.amount,
      totalTransactions: prev.totalTransactions + 1
    }));
  };

  // Admin Actions
  const handleApproveListing = (id: string) => {
    setListings((prev) => prev.map(l => l.id === id ? { ...l, status: 'active' } : l));
    updateListingStatusInFirestore(id, 'active').catch(console.warn);
  };

  const handleRejectListing = (id: string) => {
    setListings((prev) => prev.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
    updateListingStatusInFirestore(id, 'rejected').catch(console.warn);
  };

  const handleToggleFeatureListing = (id: string) => {
    setListings((prev) => prev.map(l => {
      if (l.id === id) {
        const isGold = l.featuredTier === 'vip_gold';
        const updated = {
          ...l,
          featuredTier: isGold ? 'standard' as const : 'vip_gold' as const,
          isFeatured: !isGold
        };
        saveListingToFirestore(updated).catch(console.warn);
        return updated;
      }
      return l;
    }));
  };

  const handleDeleteListing = (id: string) => {
    recordDeletedIdLocally(id);
    setListings((prev) => prev.filter(l => l.id !== id));
    deleteListingFromFirestore(id).catch(console.warn);
  };

  const handleUpdateListing = (updatedListing: Listing) => {
    setListings((prev) => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    saveListingToFirestore(updatedListing).catch(console.warn);
  };

  const handleUpdateCommercialBanners = (banners: CommercialBannerAd[]) => {
    setCommercialBanners(banners);
  };

  const handleUpdateHeroSpotlight = (spotlight: HeroSpotlightConfig) => {
    setHeroSpotlight(spotlight);
  };

  const handleUpdatePlatformConfig = (config: PlatformConfig) => {
    setPlatformConfig(config);
  };

  const handleResetDefaults = () => {
    setListings(INITIAL_LISTINGS);
    setCommercialBanners(COMMERCIAL_BANNER_ADS);
    setHeroSpotlight(INITIAL_HERO_SPOTLIGHT);
    setPlatformConfig(INITIAL_PLATFORM_CONFIG);
    try {
      localStorage.removeItem('marketpro_listings_custom');
      localStorage.removeItem('marketpro_commercial_banners_custom');
      localStorage.removeItem('marketpro_hero_spotlight_custom');
      localStorage.removeItem('marketpro_platform_config_custom');
    } catch (e) {}
  };

  const handleVerifyUser = (sellerId: string) => {
    setListings((prev) => prev.map(l => {
      if (l.seller.id === sellerId) {
        return {
          ...l,
          seller: { ...l.seller, isVerified: true }
        };
      }
      return l;
    }));
  };

  const handleReleaseEscrow = (txnId: string) => {
    setTransactions((prev) => prev.map(t => t.id === txnId ? { ...t, status: 'completed' } : t));
  };

  // QR Story & Status Poster Handler
  const handleOpenStoryPoster = (listing: Listing) => {
    setStoryPosterListing(listing);
    setIsStoryPosterOpen(true);
  };

  // Saved Search Alerts Handlers
  const handleSaveAlert = (newAlert: SavedSearchAlert) => {
    setSavedAlerts((prev) => [newAlert, ...prev]);
    saveSearchAlertToFirestore(newAlert).catch(console.warn);
  };

  const handleDeleteAlert = (id: string) => {
    setSavedAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleAlertStatus = (id: string) => {
    setSavedAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const handleApplyAlertFilters = (alert: SavedSearchAlert) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: alert.query || '',
      category: alert.category || '',
      location: alert.location || '',
      minPrice: alert.minPrice || '',
      maxPrice: alert.maxPrice || ''
    }));
    setActiveTab('all');
    setTimeout(() => {
      document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const activeAlertsCount = savedAlerts.filter((a) => a.isActive).length;
  const totalUnreadChatCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Navbar */}
      <Navbar
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={CATEGORIES}
        savedCount={savedListingIds.length}
        unreadCount={totalUnreadChatCount}
        onOpenPostAd={() => setIsPostAdOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenFavorites={() => {
          setListings(INITIAL_LISTINGS.filter(l => savedListingIds.includes(l.id)));
        }}
        onOpenAdmin={handleOpenAdmin}
        onOpenContact={() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        currentLang={currentLang}
        onToggleLang={() => setCurrentLang(currentLang === 'en' ? 'ar' : 'en')}
        onOpenFiltersDrawer={() => setIsFilterDrawerOpen(true)}
        onOpenAdvertisingHub={() => {
          setAdvertisingSelectedListing(null);
          setIsAdvertisingHubOpen(true);
        }}
        currency={currency}
        onChangeCurrency={(c) => setCurrency(c)}
        onOpenFinanceModal={() => handleOpenFinance()}
        onOpenSpecialPlatesModal={() => setIsSpecialPlatesOpen(true)}
        onOpenValuationModal={() => setIsValuationOpen(true)}
        onOpenMetrashGuideModal={() => setIsMetrashGuideOpen(true)}
        onOpenCompareModal={() => setIsCompareOpen(true)}
        compareCount={compareListings.length}
        onOpenInstallApp={() => setIsInstallAppOpen(true)}
        onOpenSavedAlerts={() => setIsSavedAlertsOpen(true)}
        savedAlertsCount={activeAlertsCount}
      />

      {/* Broadcast Announcement Bar (Customizable from Admin) */}
      {platformConfig.isAnnouncementActive && platformConfig.announcementNotice && (
        <div className="bg-gradient-to-r from-amber-500 via-[#8A1538] to-slate-950 text-white text-xs py-2 px-4 shadow-sm border-b border-amber-400/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase shrink-0">
                NOTICE
              </span>
              <p className="font-semibold text-xs truncate">
                {platformConfig.announcementNotice}
              </p>
            </div>
            <button
              onClick={() => setPlatformConfig(prev => ({ ...prev, isAnnouncementActive: false }))}
              className="text-white/80 hover:text-white shrink-0 text-xs"
              title="Dismiss Notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section with Bento Layout & Quick Qatar Tools */}
      <HeroSection
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={CATEGORIES}
        onOpenMap={() => setActiveTab('map')}
        onOpenPostAd={() => setIsPostAdOpen(true)}
        onOpenFinanceModal={() => handleOpenFinance()}
        onOpenSpecialPlatesModal={() => setIsSpecialPlatesOpen(true)}
        onOpenValuationModal={() => setIsValuationOpen(true)}
        onOpenMetrashGuideModal={() => setIsMetrashGuideOpen(true)}
        onOpenAdvertisingHub={() => {
          setAdvertisingSelectedListing(null);
          setIsAdvertisingHubOpen(true);
        }}
        spotlightConfig={heroSpotlight}
        onOpenSavedAlerts={() => setIsSavedAlertsOpen(true)}
        savedAlertsCount={activeAlertsCount}
      />

      {/* Main Container */}
      <main id="marketplace-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        
        {/* Sponsored Billboard Ad Banner Strip */}
        <CommercialBannerStrip 
          banners={commercialBanners}
          onOpenAdvertisingHub={() => setIsAdvertisingHubOpen(true)}
          onLearnMore={() => setIsAdvertisingHubOpen(true)} 
        />

        {/* Marketplace Section Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-[#8A1538] text-white shadow-md shadow-rose-950/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> All Qatar Listings ({listings.length})
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'vip'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Crown className="w-4 h-4" /> VIP Gold Featured
            </button>

            <button
              onClick={() => setActiveTab('motors')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'motors'
                  ? 'bg-[#8A1538] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              🚗 Qatar Motors
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'properties'
                  ? 'bg-[#8A1538] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              🏢 Real Estate
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <MapIcon className="w-4 h-4" /> Interactive Qatar Map
            </button>
          </div>

          {/* Sort & Filter Trigger */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={filters.sortBy}
                onChange={(e: any) => handleFilterChange({ sortBy: e.target.value })}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="newest">Newest Ads in Qatar</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Viewed</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="p-2 sm:px-3 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#8A1538]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content: Map View or Grid View */}
        {activeTab === 'map' ? (
          <div className="space-y-6 animate-fadeIn">
            <QatarMapExplorer
              listings={listings}
              onSelectListing={(listing) => setSelectedListing(listing)}
              onOpenChat={(listing) => handleOpenChatWithListing(listing)}
              selectedLocation={filters.location}
              onLocationChange={(loc) => handleFilterChange({ location: loc })}
            />
          </div>
        ) : (
          /* Listings Grid */
          <div className="space-y-6">
            {/* Active search tag pill */}
            {(filters.searchQuery || filters.category || filters.location) && (
              <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-950/30 p-3 rounded-2xl border border-rose-200 dark:border-rose-900/50 text-xs">
                <span className="text-[#8A1538] dark:text-rose-300 font-semibold">
                  Showing {filteredListings.length} matching listings in {filters.location || 'All Qatar'}
                  {filters.searchQuery && ` for "${filters.searchQuery}"`}
                </span>
                <button
                  onClick={() => handleFilterChange({ searchQuery: '', category: '', location: '' })}
                  className="font-bold text-[#8A1538] dark:text-rose-400 hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {filteredListings.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
                <Sparkles className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  No listings found for this search in Qatar
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your keywords, price range or municipality filter.
                </p>
                <button
                  onClick={() => handleFilterChange({ searchQuery: '', category: '', location: '', minPrice: '', maxPrice: '' })}
                  className="px-4 py-2 bg-[#8A1538] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
                {filteredListings.map((listing, idx) => (
                  <div 
                    key={listing.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${Math.min(idx * 45, 450)}ms` }}
                  >
                    <ListingCard
                      listing={listing}
                      isFavorite={savedListingIds.includes(listing.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelect={(l) => setSelectedListing(l)}
                      onOpenChat={(l) => handleOpenChatWithListing(l)}
                      isComparing={compareListings.some((c) => c.id === listing.id)}
                      onToggleCompare={handleToggleCompare}
                      onOpenFinance={handleOpenFinance}
                      onBoost={(l) => {
                        setAdvertisingSelectedListing(l);
                        setIsAdvertisingHubOpen(true);
                      }}
                      currency={currency}
                      onOpenStoryPoster={handleOpenStoryPoster}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Embedded Qatar Map Section in Home View */}
        {activeTab !== 'map' && (
          <div className="pt-8">
            <QatarMapExplorer
              listings={listings}
              onSelectListing={(listing) => setSelectedListing(listing)}
              onOpenChat={(listing) => handleOpenChatWithListing(listing)}
              selectedLocation={filters.location}
              onLocationChange={(loc) => handleFilterChange({ location: loc })}
            />
          </div>
        )}

        {/* Dedicated Contact Hub Section with +97477315415 */}
        <ContactSection onOpenChat={() => setIsChatOpen(true)} />
      </main>

      {/* Floating Compare Floating Action Bar */}
      {compareListings.length > 0 && (
        <aside 
          aria-label="Listing comparison floating bar"
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 text-white border border-amber-500/50 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-short"
        >
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs font-bold">{compareListings.length} item{compareListings.length > 1 ? 's' : ''} in comparison</span>
              <span className="block text-[10px] text-slate-400">Compare specs & prices side-by-side</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-colors shadow-md"
            >
              Compare Now
            </button>
            <button
              onClick={handleClearCompare}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Clear Comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdmin}
        onOpenPostAd={() => setIsPostAdOpen(true)}
        onOpenMap={() => setActiveTab('map')}
        onOpenContact={() => {
          document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInstallApp={() => setIsInstallAppOpen(true)}
      />

      {/* Floating Install App Quick Banner for Mobile & Desktop (Dismissible) */}
      {!isAppInstalled && showInstallBanner && (
        <div className="fixed bottom-16 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-gradient-to-r from-[#8A1538] via-[#6b0f2a] to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-amber-400/40 backdrop-blur-md flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 p-1 flex items-center justify-center shrink-0 border border-amber-400/40">
              <Smartphone className="w-5 h-5 text-[#8A1538] dark:text-rose-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black tracking-tight flex items-center gap-1.5 truncate">
                <span>Install MarketPro Qatar</span>
                <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-bold uppercase">
                  APP
                </span>
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/80 line-clamp-1">
                Fast fullscreen launch & instant Qatar deal alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsInstallAppOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="p-1 text-white/60 hover:text-white transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentView={activeTab === 'map' ? 'map' : 'home'}
        onNavigate={(view) => {
          if (view === 'map') setActiveTab('map');
          else if (view === 'home') setActiveTab('all');
          else if (view === 'admin') handleOpenAdmin();
          else if (view === 'contact') {
            document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenPostAd={() => setIsPostAdOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        unreadCount={totalUnreadChatCount}
        savedCount={savedListingIds.length}
      />

      {/* Modals & Drawers */}
      {/* 1. Listing Detail Modal */}
      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        isFavorite={selectedListing ? savedListingIds.includes(selectedListing.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenChat={(listing) => handleOpenChatWithListing(listing)}
        onOpenPayment={(listing) => handleOpenPayment(listing)}
        reviews={reviews}
        onAddReview={handleAddReview}
        currency={currency}
        onOpenFinance={(l) => handleOpenFinance(l)}
        onOpenMetrashGuide={() => setIsMetrashGuideOpen(true)}
        isComparing={selectedListing ? compareListings.some((c) => c.id === selectedListing.id) : false}
        onToggleCompare={handleToggleCompare}
        onBoost={(l) => {
          setSelectedListing(null);
          setAdvertisingSelectedListing(l);
          setIsAdvertisingHubOpen(true);
        }}
        onOpenStoryPoster={handleOpenStoryPoster}
      />

      {/* 2. Post Ad Wizard */}
      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
        categories={CATEGORIES}
        onAddListing={handleAddListing}
        platformConfig={platformConfig}
      />

      {/* 3. Real-Time Chat System */}
      <ChatSystem
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversations={conversations}
        activeListing={chatActiveListing}
        onSendMessage={handleSendMessage}
      />

      {/* 4. Admin Command Center Dashboard with Password Protection */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        listings={listings}
        stats={adminStats}
        transactions={transactions}
        commercialBanners={commercialBanners}
        heroSpotlight={heroSpotlight}
        platformConfig={platformConfig}
        onApproveListing={handleApproveListing}
        onRejectListing={handleRejectListing}
        onToggleFeatureListing={handleToggleFeatureListing}
        onDeleteListing={handleDeleteListing}
        onUpdateListing={handleUpdateListing}
        onAddListing={handleAddListing}
        onUpdateCommercialBanners={handleUpdateCommercialBanners}
        onUpdateHeroSpotlight={handleUpdateHeroSpotlight}
        onUpdatePlatformConfig={handleUpdatePlatformConfig}
        onResetDefaults={handleResetDefaults}
        onVerifyUser={handleVerifyUser}
        onReleaseEscrow={handleReleaseEscrow}
        onLockAdmin={handleLockAdmin}
      />

      {/* Admin Security Password Gatekeeper Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* 5. Escrow Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        listing={paymentListing}
        onTransactionComplete={handleTransactionComplete}
      />

      {/* 6. Filter Sidebar Drawer */}
      <FilterSidebar
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={CATEGORIES}
        totalResultsCount={filteredListings.length}
        onOpenSavedAlerts={() => setIsSavedAlertsOpen(true)}
      />

      {/* 7. Auto & Property Finance Calculator Modal */}
      <FinanceCalculatorModal
        isOpen={isFinanceOpen}
        onClose={() => setIsFinanceOpen(false)}
        initialPrice={financeListing?.price}
        initialTitle={financeListing?.title}
        initialCategory={financeListing?.category}
      />

      {/* 8. Qatar Special Plates & VIP Numbers Modal */}
      <SpecialPlatesModal
        isOpen={isSpecialPlatesOpen}
        onClose={() => setIsSpecialPlatesOpen(false)}
        onContactSeller={(item) => {
          setIsSpecialPlatesOpen(false);
          // Open WhatsApp directly
          const text = encodeURIComponent(`Salam! Inquiring about Special Plate / VIP Number ${item.number} on MarketPro Qatar`);
          window.open(`https://wa.me/97477315415?text=${text}`, '_blank');
        }}
      />

      {/* 9. Market Valuation & Price Index Modal */}
      <MarketValuationModal
        isOpen={isValuationOpen}
        onClose={() => setIsValuationOpen(false)}
      />

      {/* 10. Metrash2 & Safe Trading Handbook Modal */}
      <MetrashGuideModal
        isOpen={isMetrashGuideOpen}
        onClose={() => setIsMetrashGuideOpen(false)}
      />

      {/* 11. Listing Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        listings={compareListings}
        onRemoveListing={handleRemoveFromCompare}
        onOpenChat={(l) => handleOpenChatWithListing(l)}
        onOpenPayment={(l) => handleOpenPayment(l)}
      />

      {/* 12. Free & Paid Advertising Hub & VIP Boost Modal */}
      <AdvertisingHubModal
        isOpen={isAdvertisingHubOpen}
        onClose={() => {
          setIsAdvertisingHubOpen(false);
          setAdvertisingSelectedListing(null);
        }}
        myListings={listings}
        targetListing={advertisingSelectedListing || undefined}
        onSelectPackageForPost={handleSelectPackageForPost}
        onBoostListing={handleBoostListing}
      />

      {/* 13. Mobile & Desktop App Installation Modal (PWA & Native) */}
      <InstallAppModal
        isOpen={isInstallAppOpen}
        onClose={() => setIsInstallAppOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallSuccess={() => {
          setIsAppInstalled(true);
          setShowInstallBanner(false);
        }}
      />

      {/* 14. High-Res QR Story & Flyer Generator Modal */}
      <StoryPosterModal
        isOpen={isStoryPosterOpen}
        onClose={() => {
          setIsStoryPosterOpen(false);
          setStoryPosterListing(null);
        }}
        listing={storyPosterListing}
        currency={currency}
      />

      {/* 15. Saved Search & Deal Alerts Modal */}
      <SavedAlertsModal
        isOpen={isSavedAlertsOpen}
        onClose={() => setIsSavedAlertsOpen(false)}
        savedAlerts={savedAlerts}
        onSaveAlert={handleSaveAlert}
        onDeleteAlert={handleDeleteAlert}
        onToggleAlertStatus={handleToggleAlertStatus}
        currentFilters={filters}
        categories={CATEGORIES}
        listings={listings}
        onApplyAlertFilters={handleApplyAlertFilters}
      />

    </div>
  );
}
