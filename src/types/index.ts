export interface Seller {
  id: string;
  name: string;
  nameAr?: string;
  phone: string;
  whatsapp: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  isSuperSeller?: boolean;
  rating: number;
  reviewCount: number;
  joinedDate: string;
  responseRate: string;
  responseTime: string;
  location: string;
  isOnline: boolean;
}

export interface Review {
  id: string;
  listingId: string;
  sellerId: string;
  authorName: string;
  authorAvatar: string;
  authorLocation?: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  sellerReply?: {
    text: string;
    date: string;
  };
}

export interface Listing {
  id: string;
  title: string;
  titleAr?: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  location: string;
  locationAr?: string;
  coordinates: {
    lat: number;
    lng: number;
    areaName: string;
  };
  condition: 'Brand New' | 'Like New' | 'Gently Used' | 'Used';
  conditionAr?: string;
  images: string[];
  description: string;
  descriptionAr?: string;
  seller: Seller;
  isFeatured: boolean;
  isUrgent?: boolean;
  isNegotiable: boolean;
  isVerifiedAd: boolean;
  views: number;
  likes: number;
  featuredTier?: 'standard' | 'featured' | 'vip_gold';
  createdAt: string;
  specs: Record<string, string>;
  status: 'active' | 'pending' | 'sold' | 'rejected';
  escrowEligible: boolean;
  deliveryAvailable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  count: number;
  subcategories: { id: string; name: string; nameAr: string; count: number }[];
  popularSpecs?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerStatus?: 'pending' | 'accepted' | 'declined';
  image?: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  listingLocation: string;
  otherUser: Seller;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  condition: string;
  isFeaturedOnly: boolean;
  isVerifiedOnly: boolean;
  isNegotiableOnly: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export interface AdminStats {
  totalListings: number;
  activeListings: number;
  pendingListings: number;
  reportedListings: number;
  totalUsers: number;
  verifiedSellers: number;
  totalVolumeQAR: number;
  promotionsRevenueQAR: number;
  totalTransactions: number;
}

export interface PaymentTransaction {
  id: string;
  type: 'ad_boost' | 'escrow_purchase' | 'vip_badge';
  amount: number;
  currency: string;
  listingId?: string;
  listingTitle?: string;
  buyerName: string;
  sellerName?: string;
  method: 'QNB' | 'QPay' | 'NAPS_Debit' | 'ApplePay' | 'Card' | 'Cash_COD';
  status: 'completed' | 'escrow_held' | 'pending' | 'refunded';
  date: string;
}

export type AdTier = 'free' | 'bump_24h' | 'featured_7d' | 'vip_gold' | 'business_pro';

export interface AdPackage {
  id: string;
  name: string;
  nameAr: string;
  tier: AdTier;
  priceQAR: number;
  durationDays: number;
  viewsMultiplier: string;
  badge: string;
  badgeAr: string;
  tagline: string;
  taglineAr: string;
  features: string[];
  featuresAr: string[];
  isPopular?: boolean;
  isFree?: boolean;
  colorScheme: string;
}

export interface CommercialBannerAd {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  advertiserName: string;
  advertiserLogo: string;
  badgeText: string;
  badgeTextAr: string;
  imageUrl: string;
  categoryTag: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink?: string;
  whatsappNumber: string;
  phone: string;
  location: string;
  impressions: number;
  clicks: number;
  status: 'active' | 'scheduled' | 'ended';
  isSponsored: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  nameAr?: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  accountType: 'individual' | 'dealer_business';
  businessName?: string;
  location: string;
  locationAr?: string;
  isVerified: boolean;
  qidVerified?: boolean;
  joinedDate: string;
  rating: number;
  reviewCount: number;
  activeAdsCount: number;
  favoriteListingIds: string[];
}

export interface HeroSpotlightConfig {
  badge: string;
  location: string;
  imageUrl: string;
  price: string;
  priceNum?: number;
  subLocation: string;
  title: string;
  titleAr?: string;
  description: string;
  category: string;
  escrowGuaranteed: boolean;
}

export interface PlatformConfig {
  platformName: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  announcementNotice: string;
  isAnnouncementActive: boolean;
  requireAdminApprovalForNewAds?: boolean;
}

export interface SavedSearchAlert {
  id: string;
  title: string;
  query: string;
  category?: string;
  categoryName?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  frequency: 'instant' | 'daily';
  channel: 'push_inapp' | 'whatsapp' | 'both';
  createdAt: string;
  matchCount?: number;
  isActive: boolean;
  notifyOnWhatsApp?: boolean;
}

