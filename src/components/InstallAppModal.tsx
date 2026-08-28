import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Apple, 
  Share2, 
  PlusSquare, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Monitor, 
  Code2, 
  Copy, 
  Check,
  Zap
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallSuccess: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallSuccess,
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'store'>('android');
  const [isInstalling, setIsInstalling] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Detect user platform
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleNativeInstall = async () => {
    if (!deferredPrompt) {
      alert('To install on this device, please follow the step-by-step instructions below.');
      return;
    }

    try {
      setIsInstalling(true);
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        onInstallSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Installation error:', err);
    } finally {
      setIsInstalling(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#8A1538] via-[#6e0f2b] to-slate-900 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-xl border-2 border-[#D4AF37] flex items-center justify-center">
              <BrandLogo variant="icon-only" size="md" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Mobile & Desktop App
                </span>
                <span className="flex items-center text-xs text-emerald-300 font-medium gap-1">
                  <Zap className="w-3.5 h-3.5 fill-emerald-300" /> Instant Install
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-1">
                Install MarketPro Qatar
              </h2>
              <p className="text-xs sm:text-sm text-white/80">
                Get lightning-fast access, fullscreen mode & direct Qatar deal alerts.
              </p>
            </div>
          </div>

          {/* Quick Platform Switcher Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setPlatform('android')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                platform === 'android'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Android (Phone/Tablet)
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                platform === 'ios'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              iPhone / iPad (iOS)
            </button>
            <button
              onClick={() => setPlatform('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                platform === 'desktop'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              PC / Mac
            </button>
            <button
              onClick={() => setPlatform('store')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                platform === 'store'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              App Store / APK Build
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Why Install Highlights */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="w-8 h-8 mx-auto rounded-xl bg-[#8A1538]/10 dark:bg-[#8A1538]/30 flex items-center justify-center text-[#8A1538] dark:text-[#E0265B] mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold">1-Tap Launch</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Fullscreen no URL bar</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold">Instant Caching</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Offline & Qatar speed</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div className="w-8 h-8 mx-auto rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold">0MB Store Size</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Zero phone memory waste</p>
            </div>
          </div>

          {/* Tab 1: Android Instructions */}
          {platform === 'android' && (
            <div className="space-y-4 animate-fadeIn">
              {deferredPrompt ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                    Your device supports instant 1-click installation!
                  </p>
                  <button
                    onClick={handleNativeInstall}
                    disabled={isInstalling}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <Download className="w-5 h-5" />
                    {isInstalling ? 'Installing MarketPro...' : 'Install MarketPro Qatar Now'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    How to install on Android (Chrome/Samsung Internet):
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                      <span className="w-6 h-6 rounded-full bg-[#8A1538] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Tap the Browser Menu</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Tap the three dots <span className="font-bold">⋮</span> in the top-right corner of Google Chrome.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                      <span className="w-6 h-6 rounded-full bg-[#8A1538] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Select "Install App" or "Add to Home screen"</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Click <span className="font-bold text-[#8A1538] dark:text-[#E0265B]">"Install app"</span> or <span className="font-bold">"Add to Home screen"</span>.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                      <span className="w-6 h-6 rounded-full bg-[#8A1538] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        3
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">Confirm & Enjoy</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          The MarketPro Qatar app icon will immediately appear on your phone home screen!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: iOS Instructions */}
          {platform === 'ios' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                How to install on iPhone & iPad (Safari):
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      1. Tap the Share button in Safari
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Look at the bottom toolbar in Safari and tap the square icon with the arrow pointing up (<strong>Share ⎋</strong>).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                  <div className="w-8 h-8 rounded-xl bg-[#8A1538]/10 flex items-center justify-center text-[#8A1538] dark:text-[#E0265B] shrink-0">
                    <PlusSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      2. Tap "Add to Home Screen"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Scroll down through the share options and tap <strong>"Add to Home Screen" (⊕)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      3. Tap "Add" in Top Right
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      MarketPro Qatar will be installed directly on your iOS home screen as a standalone application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Desktop Instructions */}
          {platform === 'desktop' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-[#8A1538] dark:text-[#E0265B]" />
                  <div>
                    <p className="text-sm font-bold">Install as Desktop App (Mac / Windows / Linux)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use MarketPro in its own standalone window directly from your Dock or Taskbar.
                    </p>
                  </div>
                </div>
                {deferredPrompt ? (
                  <button
                    onClick={handleNativeInstall}
                    className="w-full py-3 px-6 rounded-xl bg-[#8A1538] hover:bg-[#6e0f2b] text-white font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Install Desktop App Now
                  </button>
                ) : (
                  <p className="text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
                    💡 <strong>Tip:</strong> Look for the <strong>Install icon (⊕ or computer with arrow)</strong> on the right side of your Chrome / Edge address bar and click it to install!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: App Store / Google Play Native Export Guide */}
          {platform === 'store' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Native iOS (.ipa) & Android (.apk) Build Setup
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                    Capacitor Configured
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The app is already structured with <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">capacitor.config.json</code> and <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">manifest.json</code>. You can generate native store projects with these 3 commands:
                </p>

                {/* Code Snippet */}
                <div className="relative bg-slate-950 p-3 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                  <button
                    onClick={() => copyToClipboard('npm run build\nnpx cap add android\nnpx cap add ios\nnpx cap open android', 'cap-build')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy commands"
                  >
                    {copiedCode === 'cap-build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="text-[11px] leading-5">
                    {`# 1. Build the production web app
npm run build

# 2. Add Native Android (Android Studio) & iOS (Xcode)
npx cap add android
npx cap add ios

# 3. Open in Android Studio / Xcode to publish to Play Store & App Store
npx cap open android
npx cap open ios`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#8A1538] dark:text-[#E0265B]" />
            <span>MarketPro Qatar PWA • Verified Secure</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppModal;
