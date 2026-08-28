import React, { useState, useEffect } from 'react';
import { 
  COMMERCIAL_BANNER_ADS, 
  PLATFORM_PHONE_DISPLAY, 
  PLATFORM_WHATSAPP_LINK 
} from '../data/mockData';
import { CommercialBannerAd } from '../types';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Phone, 
  MessageSquare, 
  Crown,
} from 'lucide-react';

interface CommercialBannerStripProps {
  onOpenAdvertisingHub?: () => void;
  onLearnMore?: () => void;
  selectedCategory?: string;
  banners?: CommercialBannerAd[];
}

export const CommercialBannerStrip: React.FC<CommercialBannerStripProps> = ({
  onOpenAdvertisingHub,
  onLearnMore,
  selectedCategory,
  banners = COMMERCIAL_BANNER_ADS,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active banners only
  const activeBanners = (banners && banners.length > 0)
    ? banners.filter(b => b.status === 'active' || !b.status)
    : COMMERCIAL_BANNER_ADS;

  const currentList = activeBanners.length > 0 ? activeBanners : COMMERCIAL_BANNER_ADS;

  // Auto rotate banners every 6 seconds
  useEffect(() => {
    if (currentList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentList.length]);

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex >= currentList.length) {
      setCurrentIndex(0);
    }
  }, [currentList.length, currentIndex]);

  const currentBanner = currentList[currentIndex] || currentList[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
  };

  const handleHubClick = () => {
    if (onOpenAdvertisingHub) {
      onOpenAdvertisingHub();
    } else if (onLearnMore) {
      onLearnMore();
    }
  };

  if (!currentBanner) return null;

  const whatsappLink = currentBanner.whatsappNumber
    ? `https://wa.me/${currentBanner.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam! Inquiring about ${currentBanner.title} on MarketPro Qatar`)}`
    : PLATFORM_WHATSAPP_LINK;

  const phoneCall = currentBanner.phone || PLATFORM_PHONE_DISPLAY;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white animate-fadeIn">
      {/* Background Image with dark luxury gradient overlay */}
      <div className="relative h-44 sm:h-56 w-full overflow-hidden">
        <img
          key={currentBanner.id}
          src={currentBanner.imageUrl}
          alt={currentBanner.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 ease-out animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-4 sm:left-6 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
            <Crown className="w-3 h-3 fill-slate-950" /> {currentBanner.badgeText || 'SPONSORED SHOWROOM'}
          </span>
          {currentBanner.location && (
            <span className="text-[11px] text-slate-300 font-semibold bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
              {currentBanner.location}
            </span>
          )}
        </div>

        {/* "Advertise With Us" shortcut at top right */}
        <div className="absolute top-3 right-4 sm:right-6">
          <button
            onClick={handleHubClick}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20 flex items-center gap-1 transition-all"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Advertise Here (أعلن معنا)</span>
          </button>
        </div>

        {/* Content Block */}
        <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-16 sm:right-24 space-y-1 sm:space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wide">
              {currentBanner.advertiserName}
            </span>
          </div>
          <h3 className="text-sm sm:text-xl font-black text-white line-clamp-1">
            {currentBanner.title}
          </h3>
          <p className="text-xs sm:text-xs text-slate-300 line-clamp-1 max-w-xl">
            {currentBanner.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-transform"
            >
              <span>{currentBanner.ctaText || 'Contact Dealer'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${phoneCall.replace(/[^0-9+]/g, '')}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 border border-white/10 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{phoneCall}</span>
            </a>
          </div>
        </div>

        {/* Carousel controls */}
        {currentList.length > 1 && (
          <div className="absolute bottom-3 right-3 sm:right-4 flex items-center gap-1.5 z-10">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors"
              title="Previous Sponsor"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/10 transition-colors"
              title="Next Sponsor"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Slide indicators */}
        {currentList.length > 1 && (
          <div className="absolute top-3 right-1/2 translate-x-1/2 flex items-center gap-1 z-10 hidden sm:flex">
            {currentList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
