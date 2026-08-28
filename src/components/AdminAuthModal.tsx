import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Phone, 
  Sparkles,
  Fingerprint
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ADMIN_PASSWORD_STORAGE_KEY = 'marketpro_admin_password';
export const ADMIN_SESSION_STORAGE_KEY = 'marketpro_admin_session_auth';
export const DEFAULT_ADMIN_PASSWORD = 'qatar2026';

export const getStoredAdminPassword = (): string => {
  return localStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
};

export const setStoredAdminPassword = (newPass: string): void => {
  localStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, newPass);
};

export const isSessionAdminAuthenticated = (): boolean => {
  return sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'true';
};

export const setSessionAdminAuthenticated = (isAuth: boolean): void => {
  if (isAuth) {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  }
};

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Lockout countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setErrorMsg('');
    setIsAuthenticating(true);

    setTimeout(() => {
      const correctPassword = getStoredAdminPassword();

      if (password.trim() === correctPassword) {
        if (rememberSession) {
          setSessionAdminAuthenticated(true);
        }
        setIsAuthenticating(false);
        setPassword('');
        setErrorMsg('');
        setFailedAttempts(0);
        onSuccess();
      } else {
        setIsAuthenticating(false);
        const newFailCount = failedAttempts + 1;
        setFailedAttempts(newFailCount);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);

        if (newFailCount >= 4) {
          setLockoutTimer(30);
          setErrorMsg('Security Lockdown: Too many failed password attempts. Please wait 30 seconds.');
        } else {
          setErrorMsg(`Incorrect admin password. (${4 - newFailCount} attempts remaining)`);
        }
      }
    }, 350);
  };

  const handleQuickFill = () => {
    const currentPass = getStoredAdminPassword();
    setPassword(currentPass);
    setErrorMsg('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-md bg-slate-900 border border-slate-700/80 text-white rounded-3xl shadow-2xl overflow-hidden transition-transform duration-200 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Qatar Maroon & Gold Header */}
        <div className="relative bg-gradient-to-r from-[#5a0c22] via-[#8A1538] to-[#400818] p-6 text-center border-b border-amber-500/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black tracking-wider uppercase border border-amber-400/30 mb-2">
            Qatar Administrative Gateway • لوحة الإدارة
          </span>

          <h2 className="text-xl font-black text-white">
            Admin Password Protection
          </h2>
          <p className="text-xs text-rose-100 mt-1 max-w-xs mx-auto">
            Restricted access for MarketPro Qatar marketplace moderators, finance officers & executives.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {lockoutTimer > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
              <Clock className="w-8 h-8 text-rose-400 mx-auto animate-spin" />
              <h4 className="text-sm font-bold text-rose-300">Access Temporarily Suspended</h4>
              <p className="text-xs text-rose-200">
                Security cooldown active. Retry in <span className="font-mono font-bold text-base text-white">{lockoutTimer}s</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    Enter Master Admin Password:
                  </span>
                  <span className="text-[10px] text-slate-400">رمز المرور السري</span>
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                    autoFocus
                    placeholder="Enter admin password / PIN..."
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-mono tracking-wider transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs font-semibold text-rose-400 mt-2 flex items-center gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Session Remember Checkbox */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-[#8A1538] focus:ring-0 cursor-pointer"
                  />
                  <span>Keep me logged in for this browser session</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAuthenticating || !password.trim()}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    <span>Unlock Admin Control Panel</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Helper / Default Password Info */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Default Master Admin Password:
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 transition-colors"
              >
                Auto-Fill Default PIN
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-white font-bold">{getStoredAdminPassword()}</span>
              <span className="text-[10px] text-slate-500 font-sans">(Customizable in Settings)</span>
            </div>
          </div>

          {/* Qatar Emergency WhatsApp Hotline */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Forgot Password? Contact Qatar Ops:</span>
            <a
              href={`https://wa.me/97477315415?text=${encodeURIComponent('Hello MarketPro Qatar Admin Support, I need password assistance.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8A1538] dark:text-rose-400 font-bold hover:underline flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3" />
              {PLATFORM_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
