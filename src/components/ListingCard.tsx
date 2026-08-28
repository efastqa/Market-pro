import React, { useState } from 'react';
import { Listing } from '../types';
import { 
  MapPin, 
  Heart, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Eye, 
  Flame, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Clock,
  Scale,
  Calculator,
  QrCode
} from 'lucide-react';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';

interface ListingCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (listing: Listing) => void;
  onOpenChat: (listing: Listing) => void;
  onShare?: (listing: Listing) => void;
  isComparing?: boolean;
  onToggleCompare?: (listing: Listing) => void;
  onOpenFinance?: (listing: Listing) => void;
  onBoost?: (listing: Listing) => void;
  currency?: CurrencyCode;
  onOpenStoryPoster?: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onOpenChat,
  onShare,
  isComparing = false,
  onToggleCompare,
  onOpenFinance,
  onBoost,
  currency = 'QAR',
  onOpenStoryPoster
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out ${listing.title} on MarketPro Qatar for ${listing.price.toLocaleString()} QAR!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappUrl = `https://wa.me/97477315415?text=${encodeURIComponent(
    `Salam! I am interested in your listing on MarketPro Qatar: "${listing.title}" for ${listing.price.toLocaleString()} ${listing.currency}`
  )}`;

  const isFinanceEligible = listing.category === 'vehicles' || listing.category === 'properties';

  return (
    <div 
      onClick={() => onSelect(listing)}
      className={`group relative bg-white dark:bg-slate-800/95 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col overflow-hidden cursor-pointer ${
        listing.featuredTier === 'vip_gold'
          ? 'border-amber-400/80 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
          : listing.isFeatured
          ? 'border-rose-400/60 shadow-md shadow-rose-950/10'
          : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {/* VIP Gold Ribbon if applicable */}
      {listing.featuredTier === 'vip_gold' && (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-widest text-center py-0.5 px-3 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 fill-slate-950" />
          VIP Gold Featured • قطر
        </div>
      )}

      {/* Image Gallery Container */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden select-none">
        <img
          src={listing.images[currentImageIndex] || listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {listing.isFeatured && listing.featuredTier !== 'vip_gold' && (
            <span className="px-2 py-0.5 rounded-lg bg-rose-700 text-white text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}

          {listing.isUrgent && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-md">
              <Flame className="w-2.5 h-2.5 fill-slate-950" /> Urgent Deal
            </span>
          )}

          {!listing.isFeatured && listing.featuredTier !== 'vip_gold' && (
            <span className="px-2 py-0.5 rounded-lg bg-emerald-700/80 backdrop-blur-md text-emerald-100 text-[10px] font-bold border border-emerald-400/30">
              Free Ad
            </span>
          )}

          <span className="px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10">
            {listing.condition}
          </span>
        </div>

        {/* Action Buttons Top Right: Compare, Share, Favorite, Boost */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Boost / Promote Button */}
          {onBoost && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBoost(listing);
              }}
              className="p-2 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 backdrop-blur-md transition-all shadow-md hover:scale-110"
              title="Boost / Upgrade this Ad"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            </button>
          )}

          {/* Compare Button */}
          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(listing);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isComparing
                  ? 'bg-amber-500 text-slate-950 scale-110 font-bold'
                  : 'bg-slate-900/70 text-white hover:bg-slate-900 hover:text-amber-300'
              }`}
              title={isComparing ? 'Remove from Compare' : 'Add to Compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          )}

          {/* QR Story Poster Generator */}
          {onOpenStoryPoster && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenStoryPoster(listing);
              }}
              className="p-2 rounded-full bg-amber-500/90 text-slate-950 hover:bg-amber-400 backdrop-blur-md transition-all shadow-md"
              title="Generate QR Social Story Flyer (بوستر واتساب)"
            >
              <QrCode className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShareClick}
            className="p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 hover:text-blue-400 backdrop-blur-md transition-all shadow-md"
            title="Share listing"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(listing.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite
                ? 'bg-rose-600 text-white scale-110'
                : 'bg-slate-900/70 text-white hover:bg-slate-900 hover:text-rose-400'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save listing'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Carousel arrows if multiple images */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {listing.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-amber-400 w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Price Tag Overlay at bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
              {formatPriceWithCurrency(listing.price, currency, listing.currency.includes('/') ? listing.currency.split('/')[1] : '')}
            </span>
            {listing.originalPrice && listing.originalPrice > listing.price && (
              <span className="ml-2 text-xs text-slate-300 line-through opacity-80">
                {formatPriceWithCurrency(listing.originalPrice, currency)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {isFinanceEligible && onOpenFinance && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenFinance(listing);
                }}
                className="p-1 rounded-md bg-white/20 hover:bg-white/30 backdrop-blur-md text-amber-300 text-[10px] font-bold flex items-center gap-0.5"
                title="Calculate EMI Installments"
              >
                <Calculator className="w-3 h-3" />
                <span>EMI</span>
              </button>
            )}

            {listing.isNegotiable && (
              <span className="text-[10px] bg-emerald-500/80 backdrop-blur-md px-1.5 py-0.5 rounded font-semibold text-white">
                Negotiable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Time */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1 truncate font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8A1538] dark:text-rose-400 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </span>
            <span className="text-[11px] shrink-0 flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3" /> {listing.createdAt}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#8A1538] dark:group-hover:text-rose-400 transition-colors">
            {listing.title}
          </h3>

          {/* Key Specs chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {Object.entries(listing.specs).slice(0, 3).map(([key, val]) => (
              <span
                key={key}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Seller Info & Action Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80">
          {/* Seller Preview */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative">
                <img
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                {listing.seller.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900"></span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                  <span className="truncate">{listing.seller.name}</span>
                  {listing.seller.isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" title="Verified Qatar Seller" />
                  )}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                  ★ {listing.seller.rating.toFixed(1)} ({listing.seller.reviewCount})
                </div>
              </div>
            </div>

            {listing.escrowEligible && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Escrow Protected
              </span>
            )}
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-3 gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Instant In-App Chat */}
            <button
              type="button"
              onClick={() => onOpenChat(listing)}
              className="px-2 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-[#8A1538] dark:hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Chat with seller in app"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>

            {/* Direct WhatsApp with +97477315415 */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="Chat on WhatsApp (+974 7731 5415)"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Call to +97477315415 */}
            <a
              href={`tel:+97477315415`}
              className="px-2 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-[#8A1538] dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              title="Direct call: +974 7731 5415"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
