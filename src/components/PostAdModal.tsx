import React, { useState, useEffect, useRef } from 'react';
import { Category, Listing, UserAccount, PlatformConfig } from '../types';
import { 
  X, 
  Upload, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Camera, 
  DollarSign, 
  Phone, 
  HelpCircle,
  Car,
  Building2,
  Smartphone,
  Crown,
  UserCheck,
  Clock,
  ImagePlus,
  Trash2,
  Link as LinkIcon,
  Star,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Plus,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QATAR_LOCATIONS, PLATFORM_PHONE } from '../data/mockData';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddListing: (listing: Listing) => void;
  initialPlan?: 'standard' | 'featured' | 'vip_gold';
  currentUser?: UserAccount | null;
  onOpenAuth?: () => void;
  platformConfig?: PlatformConfig;
}

export const PostAdModal: React.FC<PostAdModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddListing,
  initialPlan = 'standard',
  currentUser,
  onOpenAuth,
  platformConfig
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState('vehicles');
  const [subcategory, setSubcategory] = useState('suvs');
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(currentUser?.location || 'Doha - The Pearl-Qatar');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Gently Used' | 'Used'>('Like New');
  const [description, setDescription] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [sellerName, setSellerName] = useState(currentUser?.name || 'Qatar Seller');
  const [sellerPhone, setSellerPhone] = useState(currentUser?.phone || PLATFORM_PHONE);
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'featured' | 'vip_gold'>(initialPlan);
  const [paymentMethod, setPaymentMethod] = useState<'QPay' | 'ApplePay' | 'QNB' | 'NAPS_Debit'>('QPay');

  // Multi-image upload state
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser) {
      setSellerName(currentUser.name);
      setSellerPhone(currentUser.phone);
      if (currentUser.location) {
        setLocation(currentUser.location);
      }
    }
  }, [currentUser]);

  // Sample image gallery choices for quick preset selection
  const categoryPresets: Record<string, string[]> = {
    vehicles: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    realestate: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    electronics: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    luxury: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    ],
    yachts: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    furniture: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ]
  };

  // Helper to handle local files uploaded from disk or camera
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);

    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WEBP).');
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setImages((prev) => {
            if (prev.length >= 10) {
              setUploadError('Maximum 10 photos allowed per listing.');
              return prev;
            }
            return [...prev, result];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddUrlImage = () => {
    if (!customUrlInput.trim()) return;
    const url = customUrlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('data:image')) {
      setUploadError('Please enter a valid image URL starting with http:// or https://');
      return;
    }
    setImages((prev) => [...prev, url]);
    setCustomUrlInput('');
    setShowUrlInput(false);
    setUploadError(null);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSetCover = (index: number) => {
    setImages((prev) => {
      if (index === 0) return prev;
      const target = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [target, ...rest];
    });
  };

  const handleSelectPreset = (presetUrl: string) => {
    setImages((prev) => {
      if (prev.includes(presetUrl)) return prev;
      return [...prev, presetUrl];
    });
  };

  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'pending_approval' | 'published_active'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const requiresApproval = platformConfig?.requireAdminApprovalForNewAds !== false;
    const initialStatus = requiresApproval ? 'pending' : 'active';

    const fallbackImage = categoryPresets[category]?.[0] || 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80';
    const finalImages = images.length > 0 ? images : [fallbackImage];

    const newListing: Listing = {
      id: `list-${Date.now()}`,
      title,
      titleAr: titleAr || undefined,
      category,
      subcategory,
      price: parseFloat(price) || 0,
      currency: 'QAR',
      location,
      coordinates: {
        lat: 25.37,
        lng: 51.54,
        areaName: location
      },
      condition,
      images: finalImages,
      description: description || 'No description provided.',
      seller: {
        id: currentUser ? currentUser.id : 'current-user-seller',
        name: currentUser ? currentUser.name : (sellerName || 'Qatar MarketPro User'),
        phone: currentUser ? currentUser.phone : sellerPhone,
        whatsapp: currentUser ? (currentUser.whatsapp || currentUser.phone) : sellerPhone,
        email: currentUser ? currentUser.email : 'user@marketpro.qa',
        avatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        isVerified: true,
        isSuperSeller: selectedPlan === 'vip_gold' || currentUser?.accountType === 'dealer_business',
        rating: currentUser?.rating || 5.0,
        reviewCount: currentUser?.reviewCount || 1,
        joinedDate: currentUser?.joinedDate || 'Joined Today',
        responseRate: '100%',
        responseTime: 'within 5 mins',
        location: currentUser?.location || location,
        isOnline: true,
      },
      isFeatured: selectedPlan !== 'standard',
      isNegotiable,
      isVerifiedAd: true,
      views: 1,
      likes: 0,
      featuredTier: selectedPlan,
      createdAt: 'Just now',
      specs: {
        'Condition': condition,
        'Location': location,
        'Listed': 'Today'
      },
      status: initialStatus,
      escrowEligible: true,
      deliveryAvailable: true
    };

    onAddListing(newListing);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmittedStatus(requiresApproval ? 'pending_approval' : 'published_active');
  };

  const handleFinishAndClose = () => {
    setSubmittedStatus('idle');
    setStep(1);
    setTitle('');
    setTitleAr('');
    setPrice('');
    setDescription('');
    setImages(['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80']);
    onClose();
  };

  const currentCategoryObj = categories.find((c) => c.id === category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-[#700f2b] to-slate-900 text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
              Post Your Ad in Qatar
            </span>
            <h3 className="text-lg font-black text-white">
              Sell on MarketPro Qatar (سوق قطر)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#8A1538] dark:text-rose-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#8A1538] text-white flex items-center justify-center text-[10px]">1</span>
            <span>Category</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#8A1538] dark:text-rose-400' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2 ? 'bg-[#8A1538] text-white' : 'bg-slate-300 text-slate-700'
            }`}>2</span>
            <span>Details</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-700"></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#8A1538] dark:text-rose-400' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 3 ? 'bg-[#8A1538] text-white' : 'bg-slate-300 text-slate-700'
            }`}>3</span>
            <span>Boost & Publish</span>
          </div>
        </div>

        {/* Current Logged In Seller Banner */}
        {currentUser && (
          <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-amber-400"
              />
              <span className="text-slate-700 dark:text-slate-200">
                Posting as: <strong className="text-slate-900 dark:text-white">{currentUser.name}</strong> ({currentUser.phone})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> QID Verified
            </span>
          </div>
        )}

        {/* Wizard Content or Moderation Notice Modal */}
        {submittedStatus !== 'idle' ? (
          <div className="p-6 sm:p-8 text-center space-y-5 animate-fadeIn">
            {submittedStatus === 'pending_approval' ? (
              <>
                <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/40 shadow-lg animate-bounce">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider">
                    ⏳ Submitted for Admin Verification
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Your Ad is Under Review (قيد المراجعة والتدقيق)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you! To maintain high trust in Qatar, our admin team verifies every ad before it goes live. You will receive a notification and it will be visible on the marketplace as soon as approved.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ad Title:</span>
                    <strong className="text-slate-900 dark:text-white truncate max-w-[200px]">{title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Price:</span>
                    <strong className="text-[#8A1538] dark:text-rose-400 font-bold">{parseFloat(price || '0').toLocaleString()} QAR</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Moderation Status:</span>
                    <span className="text-amber-500 font-bold">Pending Admin Approval</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishAndClose}
                  className="w-full max-w-md py-3.5 bg-[#8A1538] hover:bg-rose-900 text-white font-bold text-sm rounded-2xl shadow-lg transition-all"
                >
                  Got It, Close Window
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                    🎉 Ad Published Live
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Your Ad is Now Live on MarketPro Qatar!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Buyers in Doha, Lusail, and all Qatar can now view your listing, contact your WhatsApp, and submit inquiries.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFinishAndClose}
                  className="w-full max-w-md py-3.5 bg-[#8A1538] hover:bg-rose-900 text-white font-bold text-sm rounded-2xl shadow-lg transition-all"
                >
                  View Listings
                </button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                  Select Main Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                          setSubcategory(cat.subcategories[0]?.id || '');
                        }}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-[#8A1538] bg-rose-50/50 dark:bg-rose-950/40 text-[#8A1538] dark:text-rose-300 font-bold ring-2 ring-[#8A1538]/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold">{cat.name}</span>
                        <span className="text-[10px] text-slate-400">{cat.nameAr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentCategoryObj && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
                    Select Subcategory
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {currentCategoryObj.subcategories.map((sub) => (
                      <button
                        type="button"
                        key={sub.id}
                        onClick={() => setSubcategory(sub.id)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                          subcategory === sub.id
                            ? 'bg-[#8A1538] text-white border-[#8A1538]'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className="text-[10px] opacity-80">{sub.nameAr}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-[#8A1538] hover:bg-rose-900 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md"
                >
                  Continue to Details
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Ad Title (English) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024 Nissan Patrol Titanium - Low Mileage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  عنوان الإعلان (بالعربية - اختياري)
                </label>
                <input
                  type="text"
                  placeholder="مثال: نيسان باترول تيتانيوم 2024 بحالة الوكالة"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  dir="rtl"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Price in QAR *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 185000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full p-2.5 pr-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-bold text-[#8A1538] dark:text-rose-400">
                      QAR
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e: any) => setCondition(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Brand New">Brand New (جديد)</option>
                    <option value="Like New">Like New (كالجديد)</option>
                    <option value="Gently Used">Gently Used (مستعمل بحالة ممتازة)</option>
                    <option value="Used">Used (مستعمل)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Location in Qatar *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  {QATAR_LOCATIONS.filter(l => l !== 'All Qatar').map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comprehensive Photos & Image Upload Section */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#8A1538] dark:text-rose-400" />
                    <span>Upload Product Photos (صور الإعلان) *</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {images.length}/10 Photos
                  </span>
                </div>

                {uploadError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Hidden File Inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = '';
                  }}
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = '';
                  }}
                />

                {/* Drag and Drop Box & Upload Actions */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                  }}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                    isDragging
                      ? 'border-[#8A1538] bg-rose-50/60 dark:bg-rose-950/40 scale-[1.01]'
                      : 'border-slate-300 dark:border-slate-700 hover:border-[#8A1538]/60 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#8A1538]/10 dark:bg-rose-950/50 text-[#8A1538] dark:text-rose-400 flex items-center justify-center shadow-inner">
                      <ImagePlus className="w-6 h-6" />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Drag and drop photos here, or choose an option:
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        High resolution JPG, PNG, WEBP supported (Max 10 images)
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-[#8A1538] hover:bg-rose-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse Device Files</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-500" />
                        <span>Take Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-blue-500" />
                        <span>Add Web URL</span>
                      </button>
                    </div>

                    {/* Paste Image URL Input Field */}
                    {showUrlInput && (
                      <div className="w-full max-w-md mt-2 flex gap-2 animate-fadeIn">
                        <input
                          type="url"
                          placeholder="Paste direct image link (e.g. https://...)"
                          value={customUrlInput}
                          onChange={(e) => setCustomUrlInput(e.target.value)}
                          className="flex-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#8A1538]"
                        />
                        <button
                          type="button"
                          onClick={handleAddUrlImage}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Uploaded Gallery Grid */}
                {images.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Uploaded Photos (First photo is the main cover card):</span>
                      <button
                        type="button"
                        onClick={() => setImages([])}
                        className="text-rose-500 hover:underline flex items-center gap-0.5 text-[10px]"
                      >
                        <Trash2 className="w-3 h-3" /> Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {images.map((photo, i) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-slate-900 shadow-sm"
                        >
                          <img
                            src={photo}
                            alt={`listing photo ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />

                          {/* Cover badge */}
                          {i === 0 ? (
                            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#8A1538] text-white text-[9px] font-black shadow flex items-center gap-0.5 z-10">
                              <Star className="w-2.5 h-2.5 fill-current" /> Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCover(i)}
                              className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/80 hover:bg-[#8A1538] text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10"
                              title="Set as Cover Photo"
                            >
                              Make Cover
                            </button>
                          )}

                          {/* Delete photo button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(i)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center shadow transition-transform opacity-90 group-hover:opacity-100 z-10"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/60 text-white text-[9px] font-semibold">
                            #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Qatar Stock Photo Suggestions for Category */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      Or pick ready HD presets for {currentCategoryObj?.name || 'Category'}:
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {(categoryPresets[category] || categoryPresets.vehicles).map((presetUrl, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSelectPreset(presetUrl)}
                        className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 hover:ring-2 hover:ring-[#8A1538] transition-all opacity-80 hover:opacity-100"
                        title="Click to add preset photo"
                      >
                        <img src={presetUrl} alt="preset" className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/20 flex items-center justify-center text-white">
                          <Plus className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide details, inspection history, warranty, and any accessories included..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!title || !price}
                  className="flex-1 py-3 bg-[#8A1538] hover:bg-rose-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md disabled:opacity-50"
                >
                  Continue to Promotion
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Select Ad Type & Visibility Package
                  </label>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    Free Ads Available
                  </span>
                </div>
                
                <div className="space-y-2.5">
                  {/* Free Standard Plan */}
                  <div
                    onClick={() => setSelectedPlan('standard')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPlan === 'standard'
                        ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <Check className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Free Standard Classified</h4>
                          <span className="px-2 py-0.2 rounded bg-emerald-600 text-white text-[10px] font-black">100% FREE</span>
                        </div>
                        <p className="text-xs text-slate-500">30 days live in Qatar • Standard search ranking • WhatsApp chat</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">0 QAR</span>
                  </div>

                  {/* Featured Plan */}
                  <div
                    onClick={() => setSelectedPlan('featured')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPlan === 'featured'
                        ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 ring-2 ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8A1538] to-rose-600 text-white flex items-center justify-center font-bold">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Featured Pro 7-Day Badge</h4>
                          <span className="px-2 py-0.2 rounded bg-[#8A1538] text-white text-[10px] font-black">5X VIEWS</span>
                        </div>
                        <p className="text-xs text-slate-500">Highlighted maroon border • Starred badge in search • Map pin</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#8A1538] dark:text-rose-400">49 QAR</span>
                  </div>

                  {/* VIP Gold Plan */}
                  <div
                    onClick={() => setSelectedPlan('vip_gold')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPlan === 'vip_gold'
                        ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/30 ring-2 ring-amber-400/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">VIP Gold Top Ad (30 Days)</h4>
                          <span className="px-2 py-0.2 rounded bg-amber-500 text-slate-950 text-[10px] font-black">10X VIEWS</span>
                        </div>
                        <p className="text-xs text-slate-500">Homepage Hero Spotlight • Golden Glow Card • Metrash2 link</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400">99 QAR</span>
                  </div>
                </div>
              </div>

              {/* Payment selector when paid plan selected */}
              {selectedPlan !== 'standard' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Choose Payment Gateway (Qatar Secure Pay)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('QPay')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === 'QPay'
                          ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950 text-[#8A1538] dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      💳 QPay Qatar
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ApplePay')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === 'ApplePay'
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      🍎 Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('QNB')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === 'QNB'
                          ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950 text-[#8A1538] dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      🏛️ QNB Direct
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NAPS_Debit')}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        paymentMethod === 'NAPS_Debit'
                          ? 'border-[#8A1538] bg-rose-50 dark:bg-rose-950 text-[#8A1538] dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      🇶🇦 NAPS Card
                    </button>
                  </div>
                </div>
              )}

              {/* Seller Contact Preferences */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Seller Direct Verification:</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Qatar Phone & WhatsApp:</span>
                  <strong className="text-[#8A1538] dark:text-rose-400">{sellerPhone}</strong>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Buyer WhatsApp inquiry and Metrash2 transfer ready.
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#8A1538] via-rose-700 to-[#8A1538] hover:from-rose-800 hover:to-rose-900 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-950/30"
                >
                  {selectedPlan === 'standard' 
                    ? 'Publish 100% Free Ad Now' 
                    : `Pay ${selectedPlan === 'vip_gold' ? '99 QAR' : '49 QAR'} via ${paymentMethod} & Activate VIP Ad`}
                </button>
              </div>
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  );
};
