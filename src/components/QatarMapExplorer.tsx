import React, { useState } from 'react';
import { Listing } from '../types';
import { MapPin, Navigation, Eye, CheckCircle2, Phone, MessageSquare, X, ExternalLink } from 'lucide-react';
import { PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface QatarMapExplorerProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  onOpenChat: (listing: Listing) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
}

interface QatarZone {
  id: string;
  name: string;
  nameAr: string;
  cx: number;
  cy: number;
  radius: number;
  highlight: string;
}

const QATAR_HOTSPOTS: QatarZone[] = [
  { id: 'lusail', name: 'Lusail City', nameAr: 'مدينة لوسيل', cx: 340, cy: 195, radius: 18, highlight: 'bg-amber-500' },
  { id: 'pearl', name: 'The Pearl-Qatar', nameAr: 'اللؤلؤة قطر', cx: 355, cy: 225, radius: 16, highlight: 'bg-rose-500' },
  { id: 'westbay', name: 'West Bay & Diplomatic', nameAr: 'الخليج الغربي', cx: 335, cy: 245, radius: 18, highlight: 'bg-blue-500' },
  { id: 'doha_center', name: 'Doha Center / Al Sadd', nameAr: 'وسط الدوحة والسد', cx: 320, cy: 275, radius: 22, highlight: 'bg-emerald-500' },
  { id: 'msheireb', name: 'Msheireb Downtown', nameAr: 'مشيرب قلب الدوحة', cx: 330, cy: 285, radius: 14, highlight: 'bg-purple-500' },
  { id: 'wakrah', name: 'Al Wakrah', nameAr: 'مدينة الوكرة', cx: 345, cy: 360, radius: 20, highlight: 'bg-cyan-500' },
  { id: 'alkhor', name: 'Al Khor', nameAr: 'مدينة الخور', cx: 325, cy: 130, radius: 20, highlight: 'bg-orange-500' },
  { id: 'rayyan', name: 'Al Rayyan & Education City', nameAr: 'الريان والمدينة التعليمية', cx: 270, cy: 265, radius: 24, highlight: 'bg-indigo-500' },
  { id: 'ummsalal', name: 'Umm Salal', nameAr: 'أم صلال', cx: 290, cy: 185, radius: 18, highlight: 'bg-teal-500' },
  { id: 'shamal', name: 'Al Shamal & Ruwais', nameAr: 'الشمال والرويس', cx: 275, cy: 60, radius: 18, highlight: 'bg-slate-500' },
];

export const QatarMapExplorer: React.FC<QatarMapExplorerProps> = ({
  listings,
  onSelectListing,
  onOpenChat,
  selectedLocation = 'All Qatar',
  onLocationChange,
}) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredListing, setHoveredListing] = useState<Listing | null>(null);
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'vehicles' | 'properties' | 'electronics'>('all');

  // Filter listings based on category filter
  const filteredListings = listings.filter((item) => {
    if (viewMode !== 'all' && item.category !== viewMode) return false;
    if (activeZone) {
      const zone = QATAR_HOTSPOTS.find(z => z.id === activeZone);
      if (zone) {
        return item.location.toLowerCase().includes(zone.name.toLowerCase().split(' ')[0].toLowerCase()) ||
               (item.locationAr && item.locationAr.includes(zone.nameAr.split(' ')[0]));
      }
    }
    return true;
  });

  // Calculate coordinates mapping on our SVG viewBox: 0 0 500 500
  // Qatar bounding box approx: Lat 24.6 to 26.2, Lng 50.7 to 51.7
  const getCoordinatesPosition = (lat: number, lng: number) => {
    // normalized conversion to 500x500 svg
    const minLat = 24.6;
    const maxLat = 26.2;
    const minLng = 50.7;
    const maxLng = 51.7;

    const x = ((lng - minLng) / (maxLng - minLng)) * 360 + 70;
    const y = 500 - (((lat - minLat) / (maxLat - minLat)) * 420 + 40);

    return { x: Math.max(30, Math.min(470, x)), y: Math.max(30, Math.min(470, y)) };
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              Live Geolocation
            </span>
            <span className="text-xs text-slate-300">State of Qatar / دولة قطر</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-rose-400" />
            Qatar Interactive Market Map
          </h2>
          <p className="text-xs md:text-sm text-slate-300">
            Explore verified listings by municipality, waterfront towers, and commercial hubs in Qatar.
          </p>
        </div>

        {/* Quick Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setViewMode('all'); setActiveZone(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'all' && !activeZone
                ? 'bg-rose-700 text-white shadow-md shadow-rose-900/50'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Qatar ({listings.length})
          </button>
          <button
            onClick={() => setViewMode('vehicles')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'vehicles'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Motors 🚗
          </button>
          <button
            onClick={() => setViewMode('properties')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'properties'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Real Estate 🏢
          </button>
          <button
            onClick={() => setViewMode('electronics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'electronics'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Electronics 📱
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* Map SVG Area */}
        <div className="lg:col-span-8 p-4 md:p-8 bg-slate-950 flex flex-col items-center justify-center relative min-h-[440px] md:min-h-[520px] select-none overflow-hidden">
          {/* Subtle Grid / Radar scan effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#8a153818_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60"></div>
          
          {/* Arabian Gulf Water Label */}
          <div className="absolute top-6 right-6 text-slate-500/40 text-xs font-bold tracking-widest uppercase pointer-events-none select-none">
            Arabian Gulf / الخليج العربي
          </div>
          <div className="absolute bottom-6 left-6 text-slate-500/40 text-xs font-bold tracking-widest uppercase pointer-events-none select-none">
            Salwa & Saudi Border / الحدود
          </div>

          <div className="relative w-full max-w-[480px] aspect-square">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="qatarPeninsulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#111827" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Qatar Peninsula Realistic Polygonal Outline */}
              <path
                d="M 270 40 
                   C 290 40, 310 70, 320 100 
                   C 335 125, 345 150, 350 180 
                   C 365 200, 375 220, 370 240 
                   C 365 260, 360 280, 355 300 
                   C 355 330, 360 360, 355 390 
                   C 350 420, 330 460, 300 480 
                   C 260 480, 220 470, 190 440 
                   C 170 410, 165 370, 175 330 
                   C 180 290, 190 260, 200 230 
                   C 210 190, 215 150, 225 110 
                   C 235 70, 250 40, 270 40 Z"
                fill="url(#qatarPeninsulaGrad)"
                stroke="#8a1538"
                strokeWidth="2.5"
                strokeDasharray="none"
                className="transition-all duration-300"
              />

              {/* The Pearl-Qatar Island Silhouette */}
              <circle
                cx="370"
                cy="225"
                r="14"
                fill="#334155"
                stroke="#d4af37"
                strokeWidth="1.5"
                className="opacity-80"
              />
              <text x="375" y="222" fill="#d4af37" fontSize="8" fontWeight="bold">Pearl</text>

              {/* Major Highway Corridors (Al Shamal Rd, Al Majd, Corniche) */}
              <path d="M 270 50 L 320 275" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <path d="M 320 275 L 345 360" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              <path d="M 270 265 L 320 275" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />

              {/* Interactive Municipality Zones */}
              {QATAR_HOTSPOTS.map((zone) => {
                const isSelected = activeZone === zone.id;
                const countInZone = listings.filter(l => 
                  l.location.toLowerCase().includes(zone.name.toLowerCase().split(' ')[0].toLowerCase()) ||
                  (l.locationAr && l.locationAr.includes(zone.nameAr.split(' ')[0]))
                ).length;

                return (
                  <g
                    key={zone.id}
                    onClick={() => {
                      setActiveZone(isSelected ? null : zone.id);
                      if (onLocationChange) {
                        onLocationChange(isSelected ? 'All Qatar' : zone.name);
                      }
                    }}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={isSelected ? zone.radius + 6 : zone.radius}
                      fill={isSelected ? '#8a1538' : '#1e293b'}
                      fillOpacity={isSelected ? '0.6' : '0.4'}
                      stroke={isSelected ? '#f43f5e' : '#475569'}
                      strokeWidth={isSelected ? '2' : '1'}
                      className="transition-all duration-300 group-hover:fill-rose-900/60 group-hover:stroke-rose-400"
                    />
                    <text
                      x={zone.cx}
                      y={zone.cy - zone.radius - 4}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="9"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none drop-shadow"
                    >
                      {zone.name.split('/')[0].split('&')[0]}
                    </text>
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="3.5"
                      fill={isSelected ? '#f43f5e' : '#e2e8f0'}
                      className="group-hover:fill-rose-400 animate-pulse"
                    />
                    {countInZone > 0 && (
                      <g transform={`translate(${zone.cx + 6}, ${zone.cy - 12})`}>
                        <rect width="14" height="12" rx="4" fill="#8a1538" />
                        <text x="7" y="9" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                          {countInZone}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Specific Listing Map Pins */}
              {filteredListings.map((item) => {
                const pos = getCoordinatesPosition(item.coordinates.lat, item.coordinates.lng);
                const isHovered = hoveredListing?.id === item.id;
                const isSelected = activeListing?.id === item.id;

                return (
                  <g
                    key={item.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveListing(item);
                    }}
                    onMouseEnter={() => setHoveredListing(item)}
                    onMouseLeave={() => setHoveredListing(null)}
                    className="cursor-pointer group"
                  >
                    {/* Pin ripple */}
                    <circle
                      r={isHovered || isSelected ? '14' : '8'}
                      fill="#8a1538"
                      opacity="0.3"
                      className="animate-ping"
                    />
                    {/* Pin Base Marker */}
                    <circle
                      r={isHovered || isSelected ? '9' : '6'}
                      fill={item.featuredTier === 'vip_gold' ? '#d4af37' : item.isFeatured ? '#e11d48' : '#3b82f6'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="transition-transform duration-200 group-hover:scale-125"
                    />
                    {/* Price tooltip on map pin */}
                    {(isHovered || isSelected) && (
                      <g transform="translate(0, -20)">
                        <rect
                          x="-35"
                          y="-16"
                          width="70"
                          height="18"
                          rx="4"
                          fill="#0f172a"
                          stroke="#8a1538"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="-4"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          {item.price.toLocaleString()} QAR
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Controls & Status Badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>VIP Gold</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Standard</span>
            </div>
          </div>
        </div>

        {/* Listings Side Panel on the Map */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between max-h-[520px] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {activeZone 
                    ? `Zone: ${QATAR_HOTSPOTS.find(z => z.id === activeZone)?.name}`
                    : 'Properties & Listings in Qatar'}
                </h3>
                <span className="text-xs text-slate-500">
                  {filteredListings.length} verified listings found
                </span>
              </div>
              {activeZone && (
                <button
                  onClick={() => setActiveZone(null)}
                  className="text-xs text-rose-700 dark:text-rose-400 font-semibold hover:underline"
                >
                  Clear Zone
                </button>
              )}
            </div>

            {/* Selected Listing Floating Preview */}
            {activeListing && (
              <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-rose-600 shadow-md relative">
                <button
                  onClick={() => setActiveListing(null)}
                  className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex gap-3">
                  <img
                    src={activeListing.images[0]}
                    alt={activeListing.title}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                      Selected Pin
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {activeListing.title}
                    </h4>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {activeListing.price.toLocaleString()} {activeListing.currency}
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span className="truncate">{activeListing.location}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => onSelectListing(activeListing)}
                    className="col-span-1 px-2 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={() => onOpenChat(activeListing)}
                    className="col-span-1 px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat
                  </button>
                  <a
                    href={PLATFORM_WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-1 px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* List of items in map viewport */}
            <div className="space-y-2.5 mt-3">
              {filteredListings.slice(0, 5).map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => setActiveListing(listing)}
                  onMouseEnter={() => setHoveredListing(listing)}
                  onMouseLeave={() => setHoveredListing(null)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    activeListing?.id === listing.id
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/60 hover:border-rose-400'
                  }`}
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-14 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {listing.title}
                    </h5>
                    <p className="text-xs font-bold text-rose-700 dark:text-rose-400 mt-0.5">
                      {listing.price.toLocaleString()} {listing.currency}
                    </p>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {listing.location.replace('Doha - ', '')}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectListing(listing);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                    title="View full ad details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> GPS Pinpoint Verified
            </span>
            <span className="font-semibold text-rose-700 dark:text-rose-400">
              Tel: +974 7731 5415
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
