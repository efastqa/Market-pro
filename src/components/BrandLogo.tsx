import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
  isArabic?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
  isArabic = false,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subtitleSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm'
  }[size];

  const badgeSize = {
    sm: 'text-[8px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-[11px] px-2 py-0.5',
    xl: 'text-xs px-2.5 py-1'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Qatar Emblem Icon */}
      <div className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-tr from-[#8A1538] via-[#a81c47] to-[#d4af37] p-[1.5px] shadow-lg shadow-rose-950/20 hover:scale-105 transition-transform shrink-0`}>
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden relative">
          
          {/* Subtle Maroon Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8A1538]/40 to-transparent"></div>

          {/* Precision SVG Emblem: Qatar 9-Point Serrated Flag Ribbon + Shopping / Marketplace Monogram */}
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1 z-10">
            {/* Background Shield Geometry */}
            <path
              d="M24 4L40 10V22C40 32.5 33.2 41.8 24 44C14.8 41.8 8 32.5 8 22V10L24 4Z"
              fill="#8A1538"
              fillOpacity="0.25"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
            />
            {/* Stylized Qatar 9-Point Tooth Serrated Line Accent */}
            <path
              d="M13 18L16 20L13 22L16 24L13 26L16 28L13 30"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bold Golden Monogram M / Marketplace Diamond */}
            <path
              d="M19 32V17L25 25L31 17V32"
              stroke="url(#goldGradient)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Top Star Sparkle */}
            <circle cx="24" cy="9" r="1.5" fill="#D4AF37" />

            <defs>
              <linearGradient id="goldGradient" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.5" stopColor="#EAB308" />
                <stop offset="1" stopColor="#CA8A04" />
              </linearGradient>
            </defs>
          </svg>

          {/* Bottom Qatar Gold Stripe */}
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#8A1538] via-amber-400 to-[#8A1538]"></div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSize} font-black tracking-tight ${
            variant === 'light' ? 'text-white' : variant === 'dark' ? 'text-slate-900' : 'text-slate-900 dark:text-white'
          }`}>
            Market<span className="text-[#8A1538] dark:text-rose-400">Pro</span>
          </span>

          <span className={`${badgeSize} rounded font-black uppercase tracking-wider bg-gradient-to-r from-[#8A1538] to-[#600a22] text-amber-300 border border-amber-400/30 shadow-sm`}>
            QATAR
          </span>
        </div>

        {showSubtitle && (
          <p className={`${subtitleSize} font-medium -mt-0.5 text-slate-500 dark:text-slate-400`}>
            {isArabic ? 'سوق قطر المفتوح الأول • سيارات، عقارات وإلكترونيات' : 'Qatar Premier Marketplace • Doha & Lusail'}
          </p>
        )}
      </div>
    </div>
  );
};
