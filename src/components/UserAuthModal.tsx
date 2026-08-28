import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  MapPin, 
  KeyRound, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { UserAccount } from '../types';
import { QATAR_LOCATIONS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  initialMode?: 'signin' | 'signup' | 'phone';
  promptMessage?: string;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'phone',
  promptMessage = 'Please sign in or create an account to post your advertisement on MarketPro Qatar.',
}) => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email' | 'google'>('phone');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Phone OTP Flow State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStep, setOtpStep] = useState<'enter_phone' | 'verify_otp'>('enter_phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [simulatedCode, setSimulatedCode] = useState('7788');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email Flow State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(QATAR_LOCATIONS[0] || 'Doha');
  const [accountType, setAccountType] = useState<'individual' | 'dealer_business'>('individual');
  const [businessName, setBusinessName] = useState('');

  if (!isOpen) return null;

  // Handle Request Phone OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 7) {
      setOtpError('Please enter a valid Qatar phone number (+974).');
      return;
    }
    setOtpError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const generated = Math.floor(1000 + Math.random() * 9000).toString();
      setSimulatedCode(generated);
      setOtpStep('verify_otp');
    }, 600);
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered !== simulatedCode && entered !== '1234') {
      setOtpError(`Invalid code. Enter the verification code sent to your phone (Demo: ${simulatedCode} or 1234)`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const cleanedPhone = phoneNumber.startsWith('+974') ? phoneNumber : `+974 ${phoneNumber.trim()}`;
      const newUser: UserAccount = {
        id: `user_${Date.now()}`,
        name: fullName || `Qatar Seller (${cleanedPhone.slice(-4)})`,
        nameAr: fullName ? `${fullName} (قطر)` : undefined,
        email: email || `${phoneNumber.replace(/\D/g, '')}@marketpro.qa`,
        phone: cleanedPhone,
        whatsapp: cleanedPhone,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        accountType,
        businessName: accountType === 'dealer_business' ? (businessName || 'Qatar Motors & Trading') : undefined,
        location: selectedLocation,
        locationAr: selectedLocation,
        isVerified: true,
        qidVerified: true,
        joinedDate: 'August 2026',
        rating: 5.0,
        reviewCount: 1,
        activeAdsCount: 0,
        favoriteListingIds: []
      };

      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  // Handle Email Sign In or Registration
  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setOtpError('Please fill in all required fields.');
      return;
    }
    if (isRegisterMode && !fullName) {
      setOtpError('Please enter your full name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newUser: UserAccount = {
        id: `user_${Date.now()}`,
        name: isRegisterMode ? fullName : email.split('@')[0],
        email: email,
        phone: phoneNumber ? (phoneNumber.startsWith('+974') ? phoneNumber : `+974 ${phoneNumber}`) : '+974 5588 4422',
        whatsapp: phoneNumber ? (phoneNumber.startsWith('+974') ? phoneNumber : `+974 ${phoneNumber}`) : '+974 5588 4422',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        accountType,
        businessName: accountType === 'dealer_business' ? (businessName || 'Doha Elite Trading') : undefined,
        location: selectedLocation,
        locationAr: selectedLocation,
        isVerified: true,
        qidVerified: false,
        joinedDate: 'August 2026',
        rating: 5.0,
        reviewCount: 0,
        activeAdsCount: 0,
        favoriteListingIds: []
      };

      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  // Handle Quick Demo Login
  const handleQuickDemoLogin = (type: 'qatari_local' | 'expat_dealer') => {
    const demoUser: UserAccount = type === 'qatari_local' ? {
      id: 'seller_101',
      name: 'Sheikh Jassim Al-Thani',
      nameAr: 'الشيخ جاسم آل ثاني',
      email: 'jassim.althani@qatar.qa',
      phone: '+974 5521 8899',
      whatsapp: '+974 5521 8899',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      accountType: 'individual',
      location: 'The Pearl-Qatar',
      locationAr: 'اللؤلؤة قطر',
      isVerified: true,
      qidVerified: true,
      joinedDate: 'March 2024',
      rating: 4.9,
      reviewCount: 38,
      activeAdsCount: 3,
      favoriteListingIds: []
    } : {
      id: 'dealer_202',
      name: 'Lusail Luxury Motors W.L.L',
      nameAr: 'لوسيل موتورز الفاخرة',
      email: 'sales@lusailmotors.qa',
      phone: '+974 4499 7700',
      whatsapp: '+974 5533 1122',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
      accountType: 'dealer_business',
      businessName: 'Lusail Luxury Motors W.L.L',
      location: 'Lusail City',
      locationAr: 'مدينة لوسيل',
      isVerified: true,
      qidVerified: true,
      joinedDate: 'January 2023',
      rating: 5.0,
      reviewCount: 84,
      activeAdsCount: 7,
      favoriteListingIds: []
    };

    onLoginSuccess(demoUser);
    onClose();
  };

  // Google Live Auth
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setOtpError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const googleUser: UserAccount = {
        id: fbUser.uid,
        name: fbUser.displayName || 'Google User',
        email: fbUser.email || `${fbUser.uid}@marketpro.qa`,
        phone: fbUser.phoneNumber || '+974 6677 8899',
        whatsapp: fbUser.phoneNumber || '+974 6677 8899',
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
        accountType: 'individual',
        location: 'West Bay, Doha',
        locationAr: 'الخليج الغربي، الدوحة',
        isVerified: true,
        qidVerified: true,
        joinedDate: 'August 2026',
        rating: 5.0,
        reviewCount: 4,
        activeAdsCount: 1,
        favoriteListingIds: []
      };
      onLoginSuccess(googleUser);
      onClose();
    } catch (err: any) {
      console.warn('Firebase Google Auth fallback:', err);
      // Demo fallback if popup is closed or restricted in iframe
      const googleUser: UserAccount = {
        id: `google_${Date.now()}`,
        name: 'Tariq Al-Mansoor',
        email: 'tariq.mansoor@gmail.com',
        phone: '+974 6677 8899',
        whatsapp: '+974 6677 8899',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
        accountType: 'individual',
        location: 'West Bay, Doha',
        locationAr: 'الخليج الغربي، الدوحة',
        isVerified: true,
        qidVerified: true,
        joinedDate: 'August 2026',
        rating: 5.0,
        reviewCount: 4,
        activeAdsCount: 1,
        favoriteListingIds: []
      };
      onLoginSuccess(googleUser);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-fadeInUp">
        
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#8A1538] via-[#630b24] to-slate-950 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-xl border-2 border-amber-400 flex items-center justify-center mb-3">
            <BrandLogo variant="icon-only" size="md" />
          </div>

          <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" /> Qatar Verified Seller Account
          </span>

          <h2 className="text-2xl font-black tracking-tight mt-1.5">
            Sign In to MarketPro Qatar
          </h2>
          
          {promptMessage && (
            <p className="text-xs text-rose-100/90 mt-2 max-w-sm mx-auto leading-relaxed bg-black/20 py-1.5 px-3 rounded-xl border border-white/10">
              {promptMessage}
            </p>
          )}

          {/* Switch Tab Methods */}
          <div className="flex bg-black/30 p-1 rounded-2xl mt-4 max-w-xs mx-auto border border-white/10">
            <button
              onClick={() => { setAuthMethod('phone'); setOtpError(''); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'phone'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Qatar SMS
            </button>
            <button
              onClick={() => { setAuthMethod('email'); setOtpError(''); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-white text-[#8A1538] shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {otpError && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs border border-rose-200 dark:border-rose-800/60 flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{otpError}</span>
            </div>
          )}

          {/* METHOD 1: Phone OTP SMS */}
          {authMethod === 'phone' && (
            <div>
              {otpStep === 'enter_phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Qatar Mobile Number (رقم الجوال القطري)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-500 border-r border-slate-200 dark:border-slate-700 pr-2">
                        🇶🇦 +974
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="5512 3456 / 3300 1122"
                        className="w-full pl-24 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:ring-2 focus:ring-[#8A1538] outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> We'll send a 4-digit verification code via instant SMS.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#8A1538] hover:bg-[#6c0f2b] text-white font-bold text-sm shadow-lg shadow-[#8A1538]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Sending SMS Code...' : 'Send Verification Code (إرسال رمز التحقق)'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Enter the 4-digit code sent to <strong className="text-slate-900 dark:text-white font-mono">+974 {phoneNumber}</strong>
                    </p>
                    <div className="mt-2 inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                      💡 Demo SMS Code: <span className="underline">{simulatedCode}</span> (or 1234)
                    </div>
                  </div>

                  {/* 4 Digit Box Inputs */}
                  <div className="flex justify-center gap-3 my-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={otpCode[index] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newCode = [...otpCode];
                          newCode[index] = val;
                          setOtpCode(newCode);

                          // Auto focus next input
                          if (val && index < 3) {
                            const nextInput = document.getElementById(`otp-input-${index + 1}`);
                            nextInput?.focus();
                          }
                        }}
                        className="w-14 h-14 text-center text-xl font-bold font-mono rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus:border-[#8A1538] bg-slate-50 dark:bg-slate-800 outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Continue (تأكيد والدخول)'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpStep('enter_phone')}
                      className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
                    >
                      Change Phone Number
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const generated = Math.floor(1000 + Math.random() * 9000).toString();
                        setSimulatedCode(generated);
                        setOtpError('');
                      }}
                      className="text-[#8A1538] dark:text-rose-400 font-bold"
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: Email & Password */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name (الاسم الكامل)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mohammed Al-Kuwari"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#8A1538] outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (البريد الإلكتروني)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.qa"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#8A1538] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password (كلمة المرور)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#8A1538] outline-none"
                  />
                </div>
              </div>

              {isRegisterMode && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Location in Qatar (المنطقة)
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#8A1538] outline-none"
                    >
                      {QATAR_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Account Type Selector */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAccountType('individual')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                        accountType === 'individual'
                          ? 'border-[#8A1538] bg-[#8A1538]/10 text-[#8A1538] dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" /> Individual Seller
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType('dealer_business')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 ${
                        accountType === 'dealer_business'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-black'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" /> Dealership / Store
                    </button>
                  </div>

                  {accountType === 'dealer_business' && (
                    <input
                      type="text"
                      placeholder="Company / Showroom Name (اسم المعرض / الشركة)"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border border-amber-300 dark:border-amber-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-[#8A1538] outline-none"
                    />
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-2xl bg-[#8A1538] hover:bg-[#6c0f2b] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? 'Processing...' : (isRegisterMode ? 'Create Account & Post Ad' : 'Sign In & Continue')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(!isRegisterMode); setOtpError(''); }}
                  className="text-xs text-[#8A1538] dark:text-rose-400 font-bold hover:underline"
                >
                  {isRegisterMode ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase font-bold text-slate-400">
              Or 1-Click Fast Access
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Quick Demo Test Profiles */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
              ⚡ Quick 1-Click Demo Profiles (For Instant Testing)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('qatari_local')}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-[#8A1538] transition-colors"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Sheikh Jassim (The Pearl)</p>
                <p className="text-[10px] text-slate-500">QID Verified VIP Seller</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('expat_dealer')}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:border-amber-500 transition-colors"
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Lusail Luxury Motors</p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400">Verified Business Store</p>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-500" /> Protected by Qatar Data Privacy & Consumer Protection Laws
          </p>
        </div>

      </div>
    </div>
  );
};
