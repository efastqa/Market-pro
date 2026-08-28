import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  Eye, 
  Heart, 
  Share2, 
  TrendingUp, 
  LogOut, 
  Building2, 
  Layers,
  Clock,
  ExternalLink,
  Crown
} from 'lucide-react';
import { UserAccount, Listing } from '../types';
import { BrandLogo } from './BrandLogo';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  userListings: Listing[];
  onOpenPostAd: () => void;
  onOpenListingDetail: (listing: Listing) => void;
  onMarkAsSold: (listingId: string) => void;
  onDeleteListing: (listingId: string) => void;
  onBoostListing: (listing: Listing) => void;
  onLogout: () => void;
  currency: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  userListings,
  onOpenPostAd,
  onOpenListingDetail,
  onMarkAsSold,
  onDeleteListing,
  onBoostListing,
  onLogout,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'my_ads' | 'profile_info'>('my_ads');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'sold'>('all');

  if (!isOpen) return null;

  const pendingCount = userListings.filter(l => l.status === 'pending').length;

  const filteredAds = userListings.filter((ad) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return ad.status === 'active';
    if (filterStatus === 'pending') return ad.status === 'pending';
    if (filterStatus === 'sold') return ad.status === 'sold';
    return true;
  });

  return (
    <div className="fixed inset-0 z-[85] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-fadeInUp">
        
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-[#8A1538] via-[#6a0f29] to-slate-900 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* User Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl bg-slate-800"
              />
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 p-1 rounded-full bg-amber-400 text-slate-950 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black">{user.name}</h2>
                {user.accountType === 'dealer_business' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                    Business Dealership
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white border border-white/20">
                    Individual Seller
                  </span>
                )}
              </div>

              <p className="text-xs text-rose-200/90 mt-1 flex items-center justify-center sm:justify-start gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" /> {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-300" /> {user.phone}
                </span>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs">
                <div className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-xl border border-white/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{user.rating}</span>
                  <span className="text-white/60">({user.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-xl border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-white/80">Member since {user.joinedDate}</span>
                </div>

                <div className="flex items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-400/30 text-emerald-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> QID & Phone Verified
                </div>
              </div>
            </div>

            {/* Post Ad Button Top Right */}
            <button
              onClick={() => {
                onClose();
                onOpenPostAd();
              }}
              className="mt-2 sm:mt-0 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 flex items-center gap-1.5 transition-all transform active:scale-95 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Ad (+)</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-white/10 pt-4">
            <button
              onClick={() => setActiveTab('my_ads')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'my_ads'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>My Advertisements ({userListings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile_info')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile_info'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Account Details & Security</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: My Ads */}
          {activeTab === 'my_ads' && (
            <div className="space-y-4">
              {/* Filter Pills */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      filterStatus === 'all'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All ({userListings.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('active')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      filterStatus === 'active'
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Active ({userListings.filter(l => l.status === 'active').length})
                  </button>
                  {pendingCount > 0 && (
                    <button
                      onClick={() => setFilterStatus('pending')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        filterStatus === 'pending'
                          ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                          : 'text-amber-500 hover:text-amber-600 dark:hover:text-amber-300'
                      }`}
                    >
                      <span>In Review ({pendingCount})</span>
                    </button>
                  )}
                  <button
                    onClick={() => setFilterStatus('sold')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      filterStatus === 'sold'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Sold ({userListings.filter(l => l.status === 'sold').length})
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  Manage, mark sold, or boost your listings in Qatar
                </p>
              </div>

              {filteredAds.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold">No advertisements found in this filter</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Ready to sell your car, villa, watch, or electronics? Post your advertisement now and reach thousands of verified Qatar buyers.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPostAd();
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-[#8A1538] hover:bg-[#6c0f2b] text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post Your First Ad Now</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Image & Main Info */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={ad.images[0]}
                          alt={ad.title}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 cursor-pointer"
                          onClick={() => {
                            onClose();
                            onOpenListingDetail(ad);
                          }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {ad.category}
                            </span>
                            {ad.status === 'sold' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                Sold (تم البيع)
                              </span>
                            ) : ad.status === 'pending' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> Under Admin Review (قيد التدقيق)
                              </span>
                            ) : ad.status === 'rejected' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400">
                                Needs Revision
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                                Live & Active
                              </span>
                            )}
                            {ad.isFeatured && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 flex items-center gap-0.5">
                                <Crown className="w-2.5 h-2.5" /> Featured
                              </span>
                            )}
                          </div>

                          <h4
                            onClick={() => {
                              onClose();
                              onOpenListingDetail(ad);
                            }}
                            className="text-sm font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-[#8A1538] dark:hover:text-rose-400 mt-0.5"
                          >
                            {ad.title}
                          </h4>

                          <p className="text-sm font-black text-[#8A1538] dark:text-[#E0265B] mt-0.5">
                            {currency} {ad.price.toLocaleString()}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {ad.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" /> {ad.likes} saves
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {ad.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-700">
                        {ad.status !== 'sold' && (
                          <>
                            <button
                              onClick={() => onBoostListing(ad)}
                              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                              title="Boost views & VIP banner"
                            >
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>Boost</span>
                            </button>
                            <button
                              onClick={() => onMarkAsSold(ad.id)}
                              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-all"
                              title="Mark as Sold"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Sold</span>
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => onDeleteListing(ad.id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete Ad"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Profile Info & Security */}
          {activeTab === 'profile_info' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Account Security & Verification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-400 font-medium">Qatar Phone (جوال قطر)</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{user.phone}</p>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" /> OTP Verified
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-400 font-medium">Email Address</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{user.email}</p>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3 h-3" /> Linked & Active
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-400 font-medium">QID National ID Verification</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">Verified Qatar Resident / Citizen</p>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3 h-3" /> Ministry of Interior (Metrash2) compliant
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-400 font-medium">Seller Trust Score</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">⭐ {user.rating} / 5.0 Rating</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Based on verified buyer feedback
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out (تسجيل الخروج)
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
