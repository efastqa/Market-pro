import React from 'react';
import { 
  X, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Phone,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Listing } from '../types';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareListings: Listing[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onSelectListing: (listing: Listing) => void;
  onOpenChat: (listing: Listing) => void;
  currency?: CurrencyCode;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareListings,
  onRemoveFromCompare,
  onClearCompare,
  onSelectListing,
  onOpenChat,
  currency = 'QAR'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8A1538]/10 text-[#8A1538] dark:text-rose-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Side-by-Side Listing Comparison
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparing {compareListings.length} items side-by-side in Qatar Marketplace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {compareListings.length > 0 && (
              <button
                onClick={onClearCompare}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Matrix Table */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {compareListings.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No listings selected for comparison yet
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click the "Compare" button on any listing card across motors, properties, or electronics to compare them here!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 text-xs font-bold text-slate-400 uppercase w-48">
                      Specifications & Details
                    </th>
                    {compareListings.map((listing) => (
                      <th key={listing.id} className="p-3 w-72 align-top">
                        <div className="relative bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-full space-y-3">
                          <button
                            onClick={() => onRemoveFromCompare(listing.id)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:text-rose-600 transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                            <img
                              src={listing.images[0]}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h4
                              onClick={() => {
                                onSelectListing(listing);
                                onClose();
                              }}
                              className="text-xs font-black text-slate-900 dark:text-white line-clamp-2 hover:text-[#8A1538] cursor-pointer"
                            >
                              {listing.title}
                            </h4>
                            <div className="mt-1 text-base font-black text-[#8A1538] dark:text-rose-400">
                              {formatPriceWithCurrency(listing.price, currency)}
                            </div>
                          </div>

                          <div className="flex gap-1.5 pt-2">
                            <button
                              onClick={() => {
                                onOpenChat(listing);
                                onClose();
                              }}
                              className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-bold flex items-center justify-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" /> Chat
                            </button>
                            <a
                              href={`${PLATFORM_WHATSAPP_LINK}&text=Salam,%20I%20am%20inquiring%20about%20"${listing.title}"`}
                              target="_blank"
                              rel="noreferrer"
                              className="py-1.5 px-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center"
                            >
                              WA
                            </a>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {/* Category */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Category</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3 capitalize font-semibold text-slate-800 dark:text-slate-200">
                        {l.category} / {l.subcategory}
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Qatar Location</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3 text-slate-700 dark:text-slate-300 flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#8A1538] dark:text-rose-400 shrink-0" />
                        <span>{l.location}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Condition */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Item Condition</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                          {l.condition}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Escrow Eligible */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">MarketPro Escrow Guarantee</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3">
                        {l.escrowEligible ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Protected Escrow
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <XCircle className="w-4 h-4" /> Direct Handover
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Delivery Available */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Qatar Delivery</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3">
                        {l.deliveryAvailable ? (
                          <span className="text-blue-600 dark:text-blue-400 font-bold">
                            ✓ Same-Day Delivery
                          </span>
                        ) : (
                          <span className="text-slate-400">In-Person Pickup</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Seller Rating */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500">Seller & Verification</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3 space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <span>{l.seller.name}</span>
                          {l.seller.isVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{l.seller.rating}</span>
                          <span className="text-slate-400 font-normal">({l.seller.reviewCount} reviews)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Specs */}
                  <tr>
                    <td className="p-3 font-bold text-slate-500 align-top">Key Specifications</td>
                    {compareListings.map((l) => (
                      <td key={l.id} className="p-3 space-y-1.5 align-top">
                        {Object.entries(l.specs).slice(0, 4).map(([key, val]) => (
                          <div key={key} className="text-[11px] bg-slate-50 dark:bg-slate-800 p-1.5 rounded-lg">
                            <span className="text-slate-400 block text-[10px]">{key}:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
