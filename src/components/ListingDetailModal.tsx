import React, { useState } from 'react';
import { Listing, Review } from '../types';
import { 
  X, 
  MapPin, 
  Heart, 
  Share2, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Clock, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  AlertCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  CreditCard,
  Building2,
  Check,
  ThumbsUp,
  Send,
  Calculator,
  Scale,
  FileCheck2,
  QrCode
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';

interface ListingDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenChat: (listing: Listing) => void;
  onOpenPayment: (listing: Listing) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  currency?: CurrencyCode;
  onOpenFinance?: (listing: Listing) => void;
  onOpenMetrashGuide?: () => void;
  isComparing?: boolean;
  onToggleCompare?: (listing: Listing) => void;
  onBoost?: (listing: Listing) => void;
  onOpenStoryPoster?: (listing: Listing) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenChat,
  onOpenPayment,
  reviews,
  onAddReview,
  currency = 'QAR',
  onOpenFinance,
  onOpenMetrashGuide,
  isComparing = false,
  onToggleCompare,
  onBoost,
  onOpenStoryPoster
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewerName, setNewReviewerName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!listing) return null;

  const listingReviews = reviews.filter((r) => r.listingId === listing.id || r.sellerId === listing.seller.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out ${listing.title} on MarketPro Qatar for ${listing.price.toLocaleString()} QAR!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewerName.trim()) return;

    onAddReview({
      listingId: listing.id,
      sellerId: listing.seller.id,
      authorName: newReviewerName,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: newRating,
      title: newReviewTitle,
      comment: newReviewComment,
      verifiedPurchase: true,
    });

    setReviewSubmitted(true);
    setShowReviewForm(false);
    setNewReviewComment('');
    setNewReviewTitle('');
  };

  const whatsappMessage = encodeURIComponent(
    `Salam! I am contacting you regarding your listing on MarketPro Qatar: "${listing.title}" (${listing.price.toLocaleString()} ${listing.currency}). Is it still available?`
  );

  const isFinanceEligible = listing.category === 'vehicles' || listing.category === 'properties';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Sticky Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#8A1538] dark:text-rose-300 text-xs font-bold uppercase">
              {listing.category.toUpperCase()}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {listing.views} Views
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Boost / Upgrade Ad Button */}
            {onBoost && (
              <button
                onClick={() => onBoost(listing)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"
                title="Boost or Promote this Ad"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span className="hidden sm:inline">Boost Ad</span>
              </button>
            )}

            {/* Compare Toggle */}
            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(listing)}
                className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isComparing
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Compare listing"
              >
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">{isComparing ? 'Comparing' : 'Compare'}</span>
              </button>
            )}

            {/* QR Story & Status Poster Generator */}
            {onOpenStoryPoster && (
              <button
                onClick={() => onOpenStoryPoster(listing)}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-700 dark:text-amber-300 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
                title="Generate WhatsApp & Instagram Story Flyer with QR Code (بوستر واتساب)"
              >
                <QrCode className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                <span className="hidden sm:inline">QR Story Poster</span>
              </button>
            )}

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Share Listing"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(listing.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Moderation Warning if listing is Pending or Rejected */}
          {listing.status === 'pending' && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-600 dark:text-amber-400 text-xs animate-fadeIn">
              <Clock className="w-5 h-5 shrink-0" />
              <div>
                <strong className="block font-bold">This listing is currently Pending Admin Verification (قيد المراجعة)</strong>
                <span>It is visible to you and platform administrators only. Once approved, it will be published to the public marketplace.</span>
              </div>
            </div>
          )}

          {listing.status === 'rejected' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs animate-fadeIn">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <strong className="block font-bold">This listing was rejected by admin moderation</strong>
                <span>Please edit the photos or details from your account dashboard to request re-verification.</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Gallery + Details + Reviews */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Image Slider */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 group select-none">
                <img
                  src={listing.images[activeImageIndex] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 backdrop-blur-md transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % listing.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 backdrop-blur-md transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {listing.featuredTier === 'vip_gold' && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> VIP Gold Verified
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#8A1538] ring-2 ring-rose-500/30 scale-105'
                          : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Listing Description & Details
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>

                {listing.descriptionAr && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 text-right" dir="rtl">
                    <p className="text-xs font-bold text-slate-500 mb-1">الوصف بالعربية:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {listing.descriptionAr}
                    </p>
                  </div>
                )}
              </div>

              {/* Specifications Grid */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8A1538] dark:text-rose-400" />
                  Key Specifications & Attributes
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[11px] font-semibold text-slate-400 block">Condition</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{listing.condition}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[11px] font-semibold text-slate-400 block">Location</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block">{listing.location}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="text-[11px] font-semibold text-slate-400 block">Negotiable</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{listing.isNegotiable ? 'Yes' : 'Fixed Price'}</span>
                  </div>

                  {Object.entries(listing.specs).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                      <span className="text-[11px] font-semibold text-slate-400 block truncate">{k}</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Review & Ratings Section */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      Verified Ratings & Reviews ({listingReviews.length})
                    </h3>
                    <p className="text-xs text-slate-500">Feedback from authentic buyers in Qatar</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-[#8A1538] text-white text-xs font-semibold transition-colors"
                  >
                    {showReviewForm ? 'Cancel' : 'Write Review'}
                  </button>
                </div>

                {/* Review Form Drawer */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="mb-5 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3">
                    <h4 className="text-xs font-bold text-[#8A1538] dark:text-rose-300">Submit Your Experience</h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 text-amber-400 hover:scale-125 transition-transform"
                          >
                            <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Your Full Name (e.g. Faisal Al-Kuwari)"
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />

                    <input
                      type="text"
                      placeholder="Headline (e.g. Excellent condition & quick deal)"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />

                    <textarea
                      placeholder="Describe the transaction, punctuality, and condition of the item..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      required
                      rows={3}
                      className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                    />

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#8A1538] hover:bg-rose-900 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Verified Review
                    </button>
                  </form>
                )}

                {/* Review Items List */}
                {listingReviews.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">
                    No reviews for this listing yet. Be the first to review!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {listingReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={rev.authorAvatar}
                              alt={rev.authorName}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                {rev.authorName}
                                {rev.verifiedPurchase && (
                                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal flex items-center gap-0.5">
                                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                                  </span>
                                )}
                              </p>
                              <span className="text-[10px] text-slate-400">{rev.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                              />
                            ))}
                          </div>
                        </div>

                        {rev.title && (
                          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2">
                            {rev.title}
                          </h5>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {rev.comment}
                        </p>

                        {rev.sellerReply && (
                          <div className="mt-2 p-2 rounded-xl bg-white dark:bg-slate-800 border-l-2 border-[#8A1538] text-[11px]">
                            <span className="font-bold text-[#8A1538] dark:text-rose-400 block">
                              Seller Reply:
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">{rev.sellerReply.text}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Price Card + Seller Box + Contact Action Hub */}
            <div className="lg:col-span-5 space-y-5">
              {/* Main Price Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-[#5a0c22] to-slate-950 text-white shadow-xl border border-rose-900/40 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl"></div>

                <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider block">
                  Price in {currency}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {formatPriceWithCurrency(listing.price, currency, listing.currency.includes('/') ? listing.currency.split('/')[1] : '')}
                  </h2>
                </div>

                {listing.originalPrice && listing.originalPrice > listing.price && (
                  <p className="text-xs text-slate-300 mt-1">
                    Original Price: <span className="line-through">{formatPriceWithCurrency(listing.originalPrice, currency)}</span> (Save {formatPriceWithCurrency(listing.originalPrice - listing.price, currency)})
                  </p>
                )}

                {/* Extra Financial / EMI Action */}
                {isFinanceEligible && onOpenFinance && (
                  <button
                    onClick={() => onOpenFinance(listing)}
                    className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Monthly EMI / Bank Installments</span>
                  </button>
                )}

                {/* Instant Action CTA Buttons */}
                <div className="space-y-2.5 mt-5">
                  {/* Buy / Escrow Secure Checkout */}
                  {listing.escrowEligible && (
                    <button
                      onClick={() => onOpenPayment(listing)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-sm font-extrabold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ShieldCheck className="w-5 h-5 text-slate-950" />
                      Buy with Escrow Protection (QNB / QPay)
                    </button>
                  )}

                  {/* Real-time In-App Chat */}
                  <button
                    onClick={() => onOpenChat(listing)}
                    className="w-full py-3 px-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageSquare className="w-5 h-5 text-[#8A1538]" />
                    Chat & Make Offer on MarketPro
                  </button>

                  {/* WhatsApp Direct */}
                  <a
                    href={`https://wa.me/97477315415?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp ({PLATFORM_PHONE_DISPLAY})
                  </a>

                  {/* Direct Call */}
                  <a
                    href={`tel:+97477315415`}
                    className="w-full py-2.5 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-rose-400" />
                    Call Direct Hotline: {PLATFORM_PHONE_DISPLAY}
                  </a>

                  {/* QR Social Story Poster */}
                  {onOpenStoryPoster && (
                    <button
                      type="button"
                      onClick={() => onOpenStoryPoster(listing)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <span>Generate QR Poster (Story & Status)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Seller Verification Profile Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={listing.seller.avatar}
                      alt={listing.seller.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8A1538]"
                    />
                    {listing.seller.isOnline && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800" title="Online now"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                      {listing.seller.name}
                      {listing.seller.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" title="Qatar ID Verified Seller" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-500">{listing.seller.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                        ★ {listing.seller.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">({listing.seller.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/80 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                    <span className="text-[10px] text-slate-400 block">Response Rate</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.seller.responseRate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                    <span className="text-[10px] text-slate-400 block">Response Time</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{listing.seller.responseTime}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {listing.seller.joinedDate}
                </div>
              </div>

              {/* Safety & Metrash2 Verification Advice */}
              <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <Shield className="w-4 h-4 text-amber-500" />
                    Qatar Buyer Safety & Metrash2
                  </div>
                  {onOpenMetrashGuide && (
                    <button
                      onClick={onOpenMetrashGuide}
                      className="text-[11px] font-bold text-[#8A1538] dark:text-rose-400 underline flex items-center gap-1"
                    >
                      <FileCheck2 className="w-3 h-3" /> Metrash2 Guide
                    </button>
                  )}
                </div>
                <ul className="text-[11px] space-y-1 text-slate-600 dark:text-amber-100/80 list-disc pl-4">
                  <li>Meet in safe public locations (e.g., Pearl Marina, Doha Festival City, Villaggio).</li>
                  <li>For vehicle sales, verify registration & traffic points via Ministry of Interior (Metrash2).</li>
                  <li>Use MarketPro Escrow to hold your money safely until items are inspected.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
