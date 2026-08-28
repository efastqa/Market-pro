import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Printer, 
  Smartphone, 
  Image as ImageIcon,
  Flame,
  CheckCircle2
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Listing } from '../types';
import { CurrencyCode, formatPriceWithCurrency } from '../utils/currency';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface StoryPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
  currency: CurrencyCode;
}

export const StoryPosterModal: React.FC<StoryPosterModalProps> = ({
  isOpen,
  onClose,
  listing,
  currency
}) => {
  const [aspectRatio, setAspectRatio] = useState<'story' | 'square'>('story'); // 9:16 or 1:1
  const [theme, setTheme] = useState<'maroon' | 'obsidian' | 'emerald'>('maroon');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!listing) return;

    // Generate QR Code that leads directly to this listing and WhatsApp
    const listingUrl = `${window.location.origin}/?ad=${listing.id}`;
    const qrPayload = `https://wa.me/97477315415?text=${encodeURIComponent(`Hi MarketPro Qatar, I am inquiring about: ${listing.title} (Ref: ${listing.id}) - Price: ${listing.price} QAR. Link: ${listingUrl}`)}`;

    QRCode.toDataURL(qrPayload, {
      width: 250,
      margin: 1,
      color: {
        dark: theme === 'maroon' ? '#8A1538' : theme === 'obsidian' ? '#0f172a' : '#065f46',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Error generating QR Code:', err));
  }, [listing, theme]);

  if (!isOpen || !listing) return null;

  const formattedPrice = formatPriceWithCurrency(
    listing.price,
    currency,
    listing.currency.includes('/') ? listing.currency.split('/')[1] : ''
  );

  const handleCopyShare = () => {
    const promoText = `🇶🇦 *${listing.title}*
💰 Price: ${formattedPrice}
📍 Location: ${listing.location}, Qatar
🛡️ Verified Seller: ${listing.seller.name}
📲 Scan QR or WhatsApp: +974 7731 5415
🌐 View on MarketPro Qatar: ${window.location.origin}/?ad=${listing.id}`;

    navigator.clipboard.writeText(promoText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🇶🇦 *${listing.title}*\n💰 Price: ${formattedPrice}\n📍 Location: ${listing.location}\n📲 WhatsApp direct: +974 7731 5415\n🌐 Check it out here: ${window.location.origin}/?ad=${listing.id}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // High-Resolution Poster Canvas Generator for direct PNG download
  const handleDownloadPoster = async () => {
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = aspectRatio === 'story' ? 1080 : 1080;
      const height = aspectRatio === 'story' ? 1920 : 1080;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Gradient
      let gradient: CanvasGradient;
      if (theme === 'maroon') {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#5a0c22');
        gradient.addColorStop(0.5, '#8A1538');
        gradient.addColorStop(1, '#2c040f');
      } else if (theme === 'obsidian') {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(0.5, '#1e293b');
        gradient.addColorStop(1, '#020617');
      } else {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#064e3b');
        gradient.addColorStop(0.5, '#065f46');
        gradient.addColorStop(1, '#022c22');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative Top Qatar header bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('🇶🇦 MARKETPRO QATAR', 60, 90);

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('VERIFIED CLASSIFIED', width - 60, 90);
      ctx.textAlign = 'left';

      // 3. Load & Draw Main Listing Image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = listing.images[0];

      await new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });

      // Draw Listing Image Container
      const imgX = 60;
      const imgY = 130;
      const imgW = width - 120;
      const imgH = aspectRatio === 'story' ? 880 : 520;

      // Rounded rectangle for photo
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgW, imgH, 32);
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      ctx.restore();

      // Badge over image
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(imgX + 30, imgY + 30, 260, 56, 16);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(`★ ${listing.condition}`, imgX + 50, imgY + 68);

      // 4. Content Below Image
      const contentY = imgY + imgH + 50;

      // Price Tag Box
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(imgX, contentY, 460, 100, 24);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = '900 52px sans-serif';
      ctx.fillText(formattedPrice, imgX + 30, contentY + 68);

      // Location Pill
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.roundRect(imgX + 480, contentY, imgW - 480, 100, 24);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText(`📍 ${listing.location}`, imgX + 510, contentY + 64);

      // Title Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px sans-serif';
      const titleText = listing.title.length > 35 ? listing.title.substring(0, 35) + '...' : listing.title;
      ctx.fillText(titleText, imgX, contentY + 180);

      // Arabic Title if available
      if (listing.titleAr) {
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(listing.titleAr, imgX, contentY + 235);
      }

      // Specs Badges Row
      const specsEntries = Object.entries(listing.specs).slice(0, 3);
      let specOffsetX = imgX;
      const specY = contentY + (listing.titleAr ? 290 : 250);

      specsEntries.forEach(([k, v]) => {
        const specText = `${k}: ${v}`;
        ctx.font = 'bold 24px sans-serif';
        const textWidth = ctx.measureText(specText).width;
        const pillWidth = textWidth + 40;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.roundRect(specOffsetX, specY, pillWidth, 54, 16);
        ctx.fill();

        ctx.fillStyle = '#f1f5f9';
        ctx.fillText(specText, specOffsetX + 20, specY + 36);

        specOffsetX += pillWidth + 15;
      });

      // 5. QR Code Card at Bottom
      const qrBoxY = height - (aspectRatio === 'story' ? 360 : 250);
      const qrBoxH = aspectRatio === 'story' ? 290 : 200;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(imgX, qrBoxY, imgW, qrBoxH, 28);
      ctx.fill();

      // Draw QR Code inside box
      if (qrCodeDataUrl) {
        const qrImg = new Image();
        qrImg.src = qrCodeDataUrl;
        await new Promise((res) => {
          qrImg.onload = () => res(true);
          qrImg.onerror = () => res(false);
        });

        const qrSize = qrBoxH - 40;
        ctx.drawImage(qrImg, imgX + 25, qrBoxY + 20, qrSize, qrSize);

        // QR details text
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 34px sans-serif';
        ctx.fillText('SCAN TO CHAT & BUY', imgX + qrSize + 55, qrBoxY + 75);

        ctx.fillStyle = '#059669';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(`💬 WhatsApp: ${PLATFORM_PHONE_DISPLAY}`, imgX + qrSize + 55, qrBoxY + 125);

        ctx.fillStyle = '#64748b';
        ctx.font = '24px sans-serif';
        ctx.fillText('Instant verified inquiries on MarketPro Qatar', imgX + qrSize + 55, qrBoxY + 175);
      }

      // Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `MarketPro-Qatar-${listing.id}-${aspectRatio}-poster.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating poster download:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Hidden off-screen canvas for high-DPI export */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#700f2b] via-[#8A1538] to-[#5a0c22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  ⚡ Social Story & QR Generator
                </span>
                <span className="text-rose-200 text-xs hidden sm:inline">بوستر الإعلان للواتساب والانستغرام</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Shareable QR Flyer & Status Poster
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content: Left Settings & Actions, Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 overflow-y-auto">
          
          {/* Controls & Share Options (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Aspect Ratio Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Story & Aspect Ratio:</span>
                <span className="text-[11px] text-slate-400">حجم البوستر</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('story')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    aspectRatio === 'story'
                      ? 'border-[#8A1538] dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-slate-900 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#8A1538] dark:text-rose-400 shrink-0" />
                  <div>
                    <strong className="block text-xs font-bold">9:16 Vertical</strong>
                    <span className="text-[10px] text-slate-500 block">WhatsApp & IG Story</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('square')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    aspectRatio === 'square'
                      ? 'border-[#8A1538] dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-slate-900 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ImageIcon className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong className="block text-xs font-bold">1:1 Square</strong>
                    <span className="text-[10px] text-slate-500 block">Feed Post & Flyer</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Qatar Theme Color */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Luxury Color Theme (نمط التصميم):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('maroon')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    theme === 'maroon'
                      ? 'border-[#8A1538] bg-[#8A1538] text-white shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-[#8A1538] border border-white"></span>
                  <span>Qatar Maroon</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('obsidian')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    theme === 'obsidian'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-slate-950 border border-amber-400"></span>
                  <span>Dark Obsidian</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('emerald')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    theme === 'emerald'
                      ? 'border-emerald-700 bg-emerald-700 text-white shadow-md'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white"></span>
                  <span>Emerald Palm</span>
                </button>
              </div>
            </div>

            {/* Actions: Download PNG, WhatsApp Share, Copy Link */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleDownloadPoster}
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>
                  {isGenerating ? 'Rendering 4K Poster...' : downloadSuccess ? '✓ Downloaded Poster!' : 'Download High-Res PNG Poster'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Share to WhatsApp Status & Chats</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied Details' : 'Copy Text & Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-rose-500" />
                  <span>Print Window Flyer</span>
                </button>
              </div>
            </div>

            {/* QR Information Tip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>How QR Story Works in Qatar:</span>
              </div>
              <p>
                Anyone who scans the printed or shared QR code with their mobile camera instantly opens this ad on MarketPro or chats with your hotline on WhatsApp (+974 7731 5415).
              </p>
            </div>
          </div>

          {/* Live Dynamic Card Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Live Interactive Poster Preview ({aspectRatio === 'story' ? '9:16 Story' : '1:1 Square'})
              </span>
            </div>

            {/* Poster Card Container */}
            <div
              ref={previewRef}
              className={`w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-300 flex flex-col justify-between select-none ${
                aspectRatio === 'story' ? 'min-h-[580px]' : 'min-h-[420px]'
              } ${
                theme === 'maroon'
                  ? 'bg-gradient-to-b from-[#5a0c22] via-[#8A1538] to-[#2c040f] text-white border-amber-500/40'
                  : theme === 'obsidian'
                  ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-amber-400/40'
                  : 'bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white border-emerald-400/40'
              }`}
            >
              {/* Header inside poster */}
              <div className="p-3.5 flex items-center justify-between border-b border-white/15 bg-black/20">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">🇶🇦</span>
                  <span className="font-black text-xs tracking-wider">MARKETPRO QATAR</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                  VERIFIED AD
                </span>
              </div>

              {/* Poster Body */}
              <div className="p-3.5 space-y-3 flex-1 flex flex-col">
                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border border-white/20 shadow-md">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-bold">
                    ★ {listing.condition}
                  </div>
                  {listing.isNegotiable && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-500/90 text-white text-[10px] font-bold">
                      Negotiable
                    </div>
                  )}
                </div>

                {/* Price & Location Banner */}
                <div className="flex items-center justify-between gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-sm">
                    {formattedPrice}
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-md text-[11px] font-bold text-white truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-black text-sm text-white leading-tight line-clamp-2">
                    {listing.title}
                  </h4>
                  {listing.titleAr && (
                    <p className="text-[11px] text-slate-300 font-bold mt-0.5 line-clamp-1 text-right" dir="rtl">
                      {listing.titleAr}
                    </p>
                  )}
                </div>

                {/* Specs chips */}
                <div className="flex flex-wrap gap-1">
                  {Object.entries(listing.specs).slice(0, 3).map(([k, v]) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded-lg bg-white/10 text-slate-200 text-[10px] font-medium"
                    >
                      {k}: {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Scannable QR Code Footer */}
              <div className="p-3 bg-white text-slate-900 rounded-b-2xl flex items-center gap-3">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Scan QR"
                    className="w-16 h-16 rounded-xl border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-100 rounded-xl animate-pulse shrink-0"></div>
                )}
                <div className="min-w-0">
                  <span className="text-[10px] font-black text-[#8A1538] uppercase tracking-wider block">
                    SCAN TO CHAT & BUY
                  </span>
                  <p className="text-xs font-black text-slate-900 truncate">
                    💬 WhatsApp: {PLATFORM_PHONE_DISPLAY}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5 truncate">
                    Instant response from seller & support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
