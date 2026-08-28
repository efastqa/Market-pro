import { Listing, Category, Review, Conversation, AdminStats, PaymentTransaction, AdPackage, CommercialBannerAd, HeroSpotlightConfig, PlatformConfig } from '../types';

export const PLATFORM_PHONE = '+97477315415';
export const PLATFORM_PHONE_DISPLAY = '+974 7731 5415';
export const PLATFORM_WHATSAPP_LINK = 'https://wa.me/97477315415?text=Hello%20MarketPro%20Qatar,%20I%20am%20inquiring%20about%20your%20services';

export const QATAR_LOCATIONS = [
  'All Qatar',
  'Doha - West Bay',
  'Doha - The Pearl-Qatar',
  'Doha - Lusail City',
  'Doha - Al Sadd',
  'Doha - Msheireb Downtown',
  'Doha - Old Airport',
  'Doha - Al Dafna',
  'Doha - Abu Hamour',
  'Doha - Madinat Khalifa',
  'Al Rayyan - Education City',
  'Al Wakrah - Souq Waqif Al Wakrah',
  'Al Khor - Al Khor Corniche',
  'Umm Salal - Umm Salal Ali',
  'Al Daayen',
  'Al Shamal'
];

export const CATEGORIES: Category[] = [
  {
    id: 'vehicles',
    name: 'Motors & Vehicles',
    nameAr: 'سيارات ومركبات',
    icon: 'Car',
    color: 'from-amber-500 to-red-600',
    count: 1420,
    subcategories: [
      { id: 'cars', name: 'Cars for Sale', nameAr: 'سيارات للبيع', count: 980 },
      { id: 'suvs', name: '4x4 & SUVs', nameAr: 'دفع رباعي وجيب', count: 320 },
      { id: 'luxury_cars', name: 'Luxury & Sports', nameAr: 'سيارات فاخرة ورياضية', count: 120 },
      { id: 'car_plates', name: 'Special Number Plates', nameAr: 'أرقام سيارات مميزة', count: 85 },
      { id: 'motorcycles', name: 'Motorcycles & Quads', nameAr: 'دراجات نارية وبيجيات', count: 64 },
    ],
    popularSpecs: ['Make & Model', 'Year', 'Mileage (km)', 'Transmission', 'Engine Cylinders', 'Regional Specs']
  },
  {
    id: 'properties',
    name: 'Properties & Real Estate',
    nameAr: 'عقارات',
    icon: 'Building2',
    color: 'from-emerald-500 to-teal-700',
    count: 2150,
    subcategories: [
      { id: 'apartments_rent', name: 'Apartments for Rent', nameAr: 'شقق للإيجار', count: 890 },
      { id: 'villas_rent', name: 'Villas for Rent', nameAr: 'فلل للإيجار', count: 420 },
      { id: 'properties_sale', name: 'Properties for Sale', nameAr: 'عقارات للبيع', count: 310 },
      { id: 'commercial', name: 'Commercial & Offices', nameAr: 'مكاتب ومحلات تجارية', count: 240 },
      { id: 'studios', name: 'Studios & Rooms', nameAr: 'استوديوهات وغرف', count: 290 },
    ],
    popularSpecs: ['Bedrooms', 'Bathrooms', 'Furnishing', 'Size (sqm)', 'Amenities', 'Building Floor']
  },
  {
    id: 'electronics',
    name: 'Electronics & Mobiles',
    nameAr: 'إلكترونيات وهواتف',
    icon: 'Smartphone',
    color: 'from-blue-500 to-indigo-700',
    count: 3410,
    subcategories: [
      { id: 'mobiles', name: 'Mobile Phones & Tablets', nameAr: 'هواتف وأجهزة لوحية', count: 1540 },
      { id: 'laptops', name: 'Laptops & Computers', nameAr: 'لابتوبات وحواسيب', count: 780 },
      { id: 'gaming', name: 'Gaming Consoles & PCs', nameAr: 'أجهزة ألعاب وبلايستيشن', count: 520 },
      { id: 'tvs_audio', name: 'TVs & Sound Systems', nameAr: 'شاشات وأجهزة صوت', count: 310 },
      { id: 'cameras', name: 'Cameras & Drones', nameAr: 'كاميرات ودرونز', count: 260 },
    ],
    popularSpecs: ['Brand', 'Model', 'Storage', 'Color', 'Warranty Status', 'Condition']
  },
  {
    id: 'luxury',
    name: 'Luxury Watches & Fashion',
    nameAr: 'ساعات فاخرة وأزياء',
    icon: 'Watch',
    color: 'from-purple-500 to-pink-600',
    count: 890,
    subcategories: [
      { id: 'watches', name: 'Luxury Watches', nameAr: 'ساعات فاخرة', count: 410 },
      { id: 'bags', name: 'Designer Bags', nameAr: 'حقائب مصممين', count: 210 },
      { id: 'perfumes', name: 'Oud & Niche Perfumes', nameAr: 'عود وعطور فاخرة', count: 150 },
      { id: 'jewelry', name: 'Fine Jewelry & Gold', nameAr: 'مجوهرات وذهب', count: 120 },
    ],
    popularSpecs: ['Brand', 'Reference Number', 'Box & Papers', 'Material', 'Condition']
  },
  {
    id: 'boats',
    name: 'Boats & Marine',
    nameAr: 'قوارب ومعدات بحرية',
    icon: 'Anchor',
    color: 'from-cyan-500 to-blue-600',
    count: 310,
    subcategories: [
      { id: 'yachts', name: 'Yachts & Speed Boats', nameAr: 'يخوت وطرادات', count: 180 },
      { id: 'jetskis', name: 'Jet Skis (PWC)', nameAr: 'جت سكي ودراجات مائية', count: 90 },
      { id: 'fishing', name: 'Marine & Fishing Equipment', nameAr: 'معدات صيد وغوص', count: 40 },
    ],
    popularSpecs: ['Length (ft)', 'Engines', 'Year', 'Horsepower', 'Hull Material']
  },
  {
    id: 'furniture',
    name: 'Home & Furniture',
    nameAr: 'أثاث وديكور منزلي',
    icon: 'Sofa',
    color: 'from-rose-500 to-orange-600',
    count: 1290,
    subcategories: [
      { id: 'living_room', name: 'Living Room Sofas & Sets', nameAr: 'كنب وأطقم جلوس', count: 540 },
      { id: 'bedroom', name: 'Bedroom Sets & Mattresses', nameAr: 'غرف نوم ومراتب', count: 360 },
      { id: 'appliances', name: 'Home Appliances', nameAr: 'أجهزة منزلية وكهربائية', count: 390 },
    ]
  },
  {
    id: 'services',
    name: 'Services & Jobs',
    nameAr: 'خدمات ووظائف',
    icon: 'Briefcase',
    color: 'from-teal-500 to-emerald-600',
    count: 740,
    subcategories: [
      { id: 'moving', name: 'Moving & Transport Services', nameAr: 'نقل عفش وتوصيل', count: 260 },
      { id: 'cleaning', name: 'Home Cleaning & Maintenance', nameAr: 'تنظيف وصيانة', count: 210 },
      { id: 'it_design', name: 'Design, IT & Web Services', nameAr: 'تصميم وبرمجة', count: 170 },
      { id: 'jobs', name: 'Jobs in Qatar', nameAr: 'وظائف شاغرة في قطر', count: 100 },
    ]
  },
  {
    id: 'pets',
    name: 'Pets & Falcons',
    nameAr: 'طيور وصقور وحيوانات أليفة',
    icon: 'Heart',
    color: 'from-yellow-500 to-amber-600',
    count: 220,
    subcategories: [
      { id: 'falcons', name: 'Falcons & Hunting Birds', nameAr: 'صقور ومقانيص', count: 45 },
      { id: 'cats_dogs', name: 'Cats & Dogs', nameAr: 'قطط وكلاب', count: 130 },
      { id: 'pet_accessories', name: 'Pet Supplies & Cages', nameAr: 'مستلزمات وأقفاص', count: 45 },
    ]
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'list-1',
    title: 'Toyota Land Cruiser VXR 2024 Twin Turbo 3.5L - Zero Mileage',
    titleAr: 'تويوتا لاندكروزر VXR 2024 توين تيربو وكالة قطر زيرو كم',
    category: 'vehicles',
    subcategory: 'suvs',
    price: 365000,
    originalPrice: 380000,
    currency: 'QAR',
    location: 'Doha - The Pearl-Qatar',
    locationAr: 'الدوحة - اللؤلؤة قطر',
    coordinates: {
      lat: 25.3713,
      lng: 51.5516,
      areaName: 'The Pearl-Qatar'
    },
    condition: 'Brand New',
    conditionAr: 'جديد بالكامل',
    images: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Direct from authorized Qatar showroom. 2024 Toyota Land Cruiser VXR Twin Turbo 3.5L V6 with VIP tan leather interior, sunroof, 360-degree cameras, JBL premium sound system, rear entertainment screens, radar cruise control, and full 5-year AAB Qatar warranty and free service package.',
    descriptionAr: 'وارد وكالة عبد الغني قطر، كامل المواصفات جلد تان، فتحة سقف، كاميرات 360، شاشات خلفية، نظام صوتي JBL، رادار وتحديد مسار، مع ضمان 5 سنوات وصيانة مجانية.',
    seller: {
      id: 'sel-1',
      name: 'Nasser Al-Kuwari (VIP Motors)',
      nameAr: 'ناصر الكواري (في آي بي موتورز)',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'nasser.motors@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 4.9,
      reviewCount: 38,
      joinedDate: 'Joined March 2022',
      responseRate: '99%',
      responseTime: 'within 5 minutes',
      location: 'The Pearl-Qatar',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 1840,
    likes: 142,
    featuredTier: 'vip_gold',
    createdAt: '2 hours ago',
    specs: {
      'Make': 'Toyota',
      'Model': 'Land Cruiser VXR',
      'Year': '2024',
      'Mileage': '50 km (Delivery mileage)',
      'Engine': '3.5L Twin Turbo V6',
      'Transmission': '10-Speed Automatic',
      'Color': 'Pearl White / Tan Interior',
      'Warranty': '5 Years AAB Qatar Warranty'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  },
  {
    id: 'list-2',
    title: 'Luxury 3-Bedroom Villa with Private Pool & Beach Access - West Bay Lagoon',
    titleAr: 'فيلا فاخرة 3 غرف مع مسبح خاص وإطلالة على البحر - لاجون الخليج الغربي',
    category: 'properties',
    subcategory: 'villas_rent',
    price: 24000,
    originalPrice: 26000,
    currency: 'QAR/month',
    location: 'Doha - West Bay',
    locationAr: 'الدوحة - الخليج الغربي لاجون',
    coordinates: {
      lat: 25.3855,
      lng: 51.5284,
      areaName: 'West Bay Lagoon'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Exceptional standalone standalone compound villa in prestigious West Bay Lagoon. Features 3 en-suite master bedrooms, maid room, private temperature-controlled pool, landscaped garden, direct lagoon beach access, fully fitted German kitchen, covered parking for 3 cars.',
    descriptionAr: 'فيلا راقية جداً في لاجون الخليج الغربي مع مسبح خاص وحديقة خاصة ومدخل مباشر للشاطئ، 3 غرف نوم ماستر، غرفة خادمة، مطبخ مجهز بأحدث الأجهزة.',
    seller: {
      id: 'sel-2',
      name: 'Qatar Oasis Real Estate',
      nameAr: 'واحة قطر العقارية',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'properties@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 4.8,
      reviewCount: 64,
      joinedDate: 'Joined Jan 2021',
      responseRate: '98%',
      responseTime: 'within 10 minutes',
      location: 'West Bay, Doha',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 3120,
    likes: 215,
    featuredTier: 'vip_gold',
    createdAt: '5 hours ago',
    specs: {
      'Property Type': 'Standalone Villa',
      'Bedrooms': '3 En-Suite + Maid Room',
      'Bathrooms': '5 Bathrooms',
      'Built-up Area': '480 sqm',
      'Furnishing': 'Semi-Furnished (Fully Equipped Kitchen)',
      'Amenities': 'Private Pool, Beach Access, 24/7 Security'
    },
    status: 'active',
    escrowEligible: false,
    deliveryAvailable: false
  },
  {
    id: 'list-3',
    title: 'Rolex Submariner Date 41mm (126610LN) 2024 Brand New Unworn',
    titleAr: 'ساعة رولكس صبمارينر ديت 41 مم موديل 2024 جديدة تماماً مع البوكس والضمان',
    category: 'luxury',
    subcategory: 'watches',
    price: 54500,
    originalPrice: 57000,
    currency: 'QAR',
    location: 'Doha - Lusail City',
    locationAr: 'الدوحة - مدينة لوسيل',
    coordinates: {
      lat: 25.4225,
      lng: 51.5273,
      areaName: 'Lusail Marina'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfa88c9fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Authentic Rolex Submariner Date 41mm Oystersteel with Black Cerachrom Bezel. Purchased from authorized Qatar Fifty One East retailer in 2024. Full set with original green box, outer box, international warranty card, green seal tag, and manual. Direct verification at retailer welcomed.',
    descriptionAr: 'ساعة أصلية 100% رولكس صبمارينر ديت، مشتراه من وكيل قطر مع العلبة والبطاقة والضمان الدولي، جاهز للفحص عند الوكيل.',
    seller: {
      id: 'sel-3',
      name: 'Tariq Al-Thani (Luxury Vault)',
      nameAr: 'طارق آل ثاني (خزانة الفخامة)',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'tariq.watches@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 5.0,
      reviewCount: 42,
      joinedDate: 'Joined August 2023',
      responseRate: '100%',
      responseTime: 'within 2 minutes',
      location: 'Lusail City',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 950,
    likes: 89,
    featuredTier: 'vip_gold',
    createdAt: 'Today at 09:30 AM',
    specs: {
      'Brand': 'Rolex',
      'Model': 'Submariner Date 126610LN',
      'Year': '2024',
      'Case Diameter': '41 mm',
      'Material': 'Oystersteel',
      'Condition': 'Brand New with Box & Papers'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  },
  {
    id: 'list-4',
    title: 'Apple iPhone 16 Pro Max 512GB Desert Titanium - Qatar Apple Warranty',
    titleAr: 'آيفون 16 برو ماكس 512 جيجابايت تيتانيوم صحراوي - ضمان وكيل قطر',
    category: 'electronics',
    subcategory: 'mobiles',
    price: 5200,
    originalPrice: 5599,
    currency: 'QAR',
    location: 'Doha - Al Sadd',
    locationAr: 'الدوحة - السد',
    coordinates: {
      lat: 25.2854,
      lng: 51.5036,
      areaName: 'Al Sadd'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Sealed factory box Apple iPhone 16 Pro Max 512GB in trending Desert Titanium finish. TRA Qatar approved, FaceTime enabled, 1-year official Apple Qatar warranty. Fast same-day handover in Doha.',
    descriptionAr: 'جهاز جديد متبرشم بالكرتونة آيفون 16 برو ماكس 512 جيجا لون تيتانيوم صحراوي، معتمد من هيئة الاتصالات وضمان ابل الرسمي في قطر.',
    seller: {
      id: 'sel-4',
      name: 'Doha Tech & Mobile Hub',
      nameAr: 'مركز الدوحة للهواتف والتكنولوجيا',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'tech@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.7,
      reviewCount: 92,
      joinedDate: 'Joined Nov 2020',
      responseRate: '96%',
      responseTime: 'within 15 minutes',
      location: 'Al Sadd, Doha',
      isOnline: false
    },
    isFeatured: true,
    isUrgent: true,
    isNegotiable: false,
    isVerifiedAd: true,
    views: 2420,
    likes: 198,
    featuredTier: 'featured',
    createdAt: '1 day ago',
    specs: {
      'Brand': 'Apple',
      'Model': 'iPhone 16 Pro Max',
      'Storage': '512 GB',
      'Color': 'Desert Titanium',
      'Condition': 'Factory Sealed Brand New',
      'Warranty': '1 Year Apple Official Qatar'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  },
  {
    id: 'list-5',
    title: 'Porsche 911 GT3 RS 2023 - Weissach Package & Ceramic Brakes',
    titleAr: 'بورش 911 GT3 RS موديل 2023 مع باقة فايساخ ومكابح سيراميك',
    category: 'vehicles',
    subcategory: 'luxury_cars',
    price: 1180000,
    currency: 'QAR',
    location: 'Doha - The Pearl-Qatar',
    locationAr: 'الدوحة - اللؤلؤة قطر',
    coordinates: {
      lat: 25.3670,
      lng: 51.5450,
      areaName: 'Porto Arabia'
    },
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'GCC Specs Porsche 911 GT3 RS with Weissach Package, Magnesium lightweight wheels, Porsche Ceramic Composite Brakes (PCCB), Clubsport Package, Front Axle Lift system, full PPF paint protection from day one. Under Porsche Qatar warranty till 2027.',
    seller: {
      id: 'sel-1',
      name: 'Nasser Al-Kuwari (VIP Motors)',
      nameAr: 'ناصر الكواري',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'nasser.motors@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 4.9,
      reviewCount: 38,
      joinedDate: 'Joined March 2022',
      responseRate: '99%',
      responseTime: 'within 5 minutes',
      location: 'The Pearl-Qatar',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 4520,
    likes: 420,
    featuredTier: 'vip_gold',
    createdAt: '3 days ago',
    specs: {
      'Make': 'Porsche',
      'Model': '911 GT3 RS (992)',
      'Year': '2023',
      'Mileage': '2,400 km',
      'Engine': '4.0L Naturally Aspirated Boxer-6',
      'Package': 'Weissach Carbon Fiber Package'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  },
  {
    id: 'list-6',
    title: '36ft Gulf Craft Walkaround Speed Boat with Twin Yamaha 300HP 4-Stroke',
    titleAr: 'طراد جلف كرافت 36 قدم مع مكينتين ياماها 300 فور ستروك',
    category: 'boats',
    subcategory: 'yachts',
    price: 215000,
    originalPrice: 235000,
    currency: 'QAR',
    location: 'Al Wakrah - Souq Waqif Al Wakrah',
    locationAr: 'الوكرة - فرضة الوكرة',
    coordinates: {
      lat: 25.1768,
      lng: 51.6033,
      areaName: 'Al Wakrah Marina'
    },
    condition: 'Like New',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculate Gulf Craft 36ft center console boat, perfect for Halul and deep sea fishing or family cruises. Twin 300HP Yamaha engines with only 180 engine hours. Garmin GPS Chartplotter, Fishfinder, Fusion Bluetooth sound system, toilet cabin, marine fridge, and dual axle aluminum trailer included.',
    seller: {
      id: 'sel-5',
      name: 'Captain Jassem Al-Sulaiti',
      nameAr: 'كابتن جاسم السليطي',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'jassem.marine@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.9,
      reviewCount: 19,
      joinedDate: 'Joined April 2021',
      responseRate: '95%',
      responseTime: 'within 30 minutes',
      location: 'Al Wakrah',
      isOnline: true
    },
    isFeatured: false,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 1120,
    likes: 74,
    createdAt: '2 days ago',
    specs: {
      'Type': 'Speed Boat / Fishing Cruiser',
      'Length': '36 Feet (11 Meters)',
      'Engines': '2x Yamaha 300HP 4-Stroke',
      'Hours': '180 Hours only',
      'Trailer': 'Heavy-duty aluminum trailer included'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: false
  },
  {
    id: 'list-7',
    title: 'Brand New 2-Bedroom Apartment with Marina View - Porto Arabia The Pearl',
    titleAr: 'شقة مفروشة راقية غرفتين نوم إطلالة مباشرة على المارينا - بورتو أرابيا اللؤلؤة',
    category: 'properties',
    subcategory: 'apartments_rent',
    price: 11500,
    currency: 'QAR/month',
    location: 'Doha - The Pearl-Qatar',
    locationAr: 'الدوحة - بورتو أرابيا اللؤلؤة',
    coordinates: {
      lat: 25.3735,
      lng: 51.5490,
      areaName: 'The Pearl Porto Arabia Tower 22'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Fully furnished luxury 2-bedroom + maid room apartment in Porto Arabia Tower 22. Huge private balcony overlooking luxury yachts and marina. Bills included options, high floor, swimming pool, state-of-the-art gym, kids play area, and 2 designated underground parking slots.',
    seller: {
      id: 'sel-2',
      name: 'Qatar Oasis Real Estate',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'properties@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 4.8,
      reviewCount: 64,
      joinedDate: 'Joined Jan 2021',
      responseRate: '98%',
      responseTime: 'within 10 minutes',
      location: 'West Bay, Doha',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 1890,
    likes: 160,
    featuredTier: 'featured',
    createdAt: '4 days ago',
    specs: {
      'Bedrooms': '2 Bedrooms + Maid',
      'Bathrooms': '3 Bathrooms',
      'Area': '175 sqm',
      'Floor': '18th Floor',
      'View': 'Full Marina View'
    },
    status: 'active',
    escrowEligible: false,
    deliveryAvailable: false
  },
  {
    id: 'list-8',
    title: 'Sony PlayStation 5 Pro (2TB SSD) + 2 DualSense Controllers & FC 25',
    titleAr: 'سوني بلايستيشن 5 برو سعة 2 تيرابايت + وحدتي تحكم ولعبة إف سي 25',
    category: 'electronics',
    subcategory: 'gaming',
    price: 2850,
    originalPrice: 3100,
    currency: 'QAR',
    location: 'Doha - Msheireb Downtown',
    locationAr: 'الدوحة - مشيرب قلب الدوحة',
    coordinates: {
      lat: 25.2867,
      lng: 51.5298,
      areaName: 'Msheireb Downtown'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Brand new in original retail packaging PlayStation 5 Pro console with ultra-fast 2TB SSD, enhanced ray tracing, AI upscaling PSSR, 2 DualSense wireless controllers and sealed physical copy of EA Sports FC 25. Official 2-year warranty.',
    seller: {
      id: 'sel-4',
      name: 'Doha Tech & Mobile Hub',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'tech@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.7,
      reviewCount: 92,
      joinedDate: 'Joined Nov 2020',
      responseRate: '96%',
      responseTime: 'within 15 minutes',
      location: 'Al Sadd, Doha',
      isOnline: false
    },
    isFeatured: false,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 890,
    likes: 67,
    createdAt: '1 day ago',
    specs: {
      'Brand': 'Sony PlayStation',
      'Model': 'PS5 Pro',
      'Storage': '2TB Ultra High Speed NVMe SSD',
      'Accessories': '2x Wireless Controllers + FC25 Game'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  },
  {
    id: 'list-9',
    title: 'Authentic Purebred Arabian Falcon (Shaheen) with Falconry Passport & Microchip',
    titleAr: 'صقر شاهين فرخ أصيل مع جواز السفر الصقري والشريحة الإلكترونية',
    category: 'pets',
    subcategory: 'falcons',
    price: 38000,
    currency: 'QAR',
    location: 'Al Khor - Al Khor Corniche',
    locationAr: 'الخور - كورنيش الخور',
    coordinates: {
      lat: 25.6838,
      lng: 51.5058,
      areaName: 'Al Khor'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1611689342806-0863700ce9e4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Championship breed Shaheen Falcon from prestigious breeding lineage. Complete with official Qatar Falconry Passport, microchip, certified health clearance from Souq Waqif Falcon Hospital. Strong wingspan, well-tempered and trained for hunting season.',
    seller: {
      id: 'sel-6',
      name: 'Ghanem Al-Mohannadi (Al-Khor Heritage)',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'falconry@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 5.0,
      reviewCount: 14,
      joinedDate: 'Joined Oct 2022',
      responseRate: '100%',
      responseTime: 'within 10 minutes',
      location: 'Al Khor, Qatar',
      isOnline: true
    },
    isFeatured: true,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 1420,
    likes: 180,
    featuredTier: 'featured',
    createdAt: '3 days ago',
    specs: {
      'Type': 'Shaheen (Peregrine Falcon)',
      'Age': 'Farokh (Under 1 year)',
      'Documentation': 'Official Qatar Falcon Hospital Health Card & Microchip',
      'Weight': '1,050 grams'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: false
  },
  {
    id: 'list-10',
    title: 'Professional Villa Interior Design, Fitout & Renovation Services Qatar',
    titleAr: 'خدمات تصميم داخلي وتنفيذ ديكورات وتشطيب فلل ومكاتب في قطر',
    category: 'services',
    subcategory: 'it_design',
    price: 3500,
    currency: 'QAR/Project',
    location: 'Doha - Lusail City',
    locationAr: 'الدوحة - مارينا لوسيل',
    coordinates: {
      lat: 25.4190,
      lng: 51.5240,
      areaName: 'Lusail Marina'
    },
    condition: 'Brand New',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Licensed Qatar Architecture & Interior Design Studio. 3D renderings, turnkey villa fitout, gypsum ceilings, smart lighting, marble flooring, and bespoke Italian furniture supply. Free initial site consultation across Doha and Lusail.',
    seller: {
      id: 'sel-7',
      name: 'Atelier Doha Design Studio',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'design@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      isSuperSeller: true,
      rating: 4.9,
      reviewCount: 47,
      joinedDate: 'Joined June 2021',
      responseRate: '99%',
      responseTime: 'within 15 minutes',
      location: 'Lusail, Qatar',
      isOnline: true
    },
    isFeatured: false,
    isUrgent: false,
    isNegotiable: true,
    isVerifiedAd: true,
    views: 670,
    likes: 48,
    createdAt: '5 days ago',
    specs: {
      'Service Type': '3D Interior Architecture & Turnkey Execution',
      'Coverage': 'All Qatar (Doha, Al Wakrah, Al Khor, Lusail)',
      'Consultation': 'Complimentary on-site assessment'
    },
    status: 'active',
    escrowEligible: true,
    deliveryAvailable: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    listingId: 'list-1',
    sellerId: 'sel-1',
    authorName: 'Khalid Al-Marri',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    authorLocation: 'Doha, Qatar',
    rating: 5,
    title: 'Top notch seller, smoothest Land Cruiser purchase in Qatar!',
    comment: 'Nasser was extremely professional and honest. He arranged the inspection at AAB showroom within 2 hours, and we completed the escrow payment safely on MarketPro. Vehicle was spotless and brand new as described.',
    date: 'August 18, 2026',
    verifiedPurchase: true,
    helpfulCount: 24,
    sellerReply: {
      text: 'Thank you Brother Khalid! Always a pleasure serving you with VIP automotive standards in Qatar.',
      date: 'August 19, 2026'
    }
  },
  {
    id: 'rev-2',
    listingId: 'list-2',
    sellerId: 'sel-2',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    authorLocation: 'West Bay Lagoon, Doha',
    rating: 5,
    title: 'Found our dream villa in West Bay Lagoon',
    comment: 'The Oasis Real Estate team showed us the villa on the same afternoon. Very responsive, helped through the municipality leasing contract and Kahramaa activation seamlessly.',
    date: 'August 12, 2026',
    verifiedPurchase: true,
    helpfulCount: 16
  },
  {
    id: 'rev-3',
    listingId: 'list-3',
    sellerId: 'sel-3',
    authorName: 'Mohamed Bin Hamad',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    authorLocation: 'Lusail, Qatar',
    rating: 5,
    title: 'Authentic Rolex with complete documentation',
    comment: 'Met Tariq at Fifty One East Lusail for verification. Watch was 100% genuine, unworn stickers in place. Outstanding luxury seller on MarketPro.',
    date: 'August 20, 2026',
    verifiedPurchase: true,
    helpfulCount: 31
  },
  {
    id: 'rev-4',
    listingId: 'list-4',
    sellerId: 'sel-4',
    authorName: 'Fahad Al-Nuaimi',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80',
    authorLocation: 'Al Sadd, Doha',
    rating: 4,
    title: 'Fast delivery across Doha',
    comment: 'Phone was delivered within 45 minutes using QPay card payment. Sealed box with official warranty receipt.',
    date: 'August 21, 2026',
    verifiedPurchase: true,
    helpfulCount: 8
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    listingId: 'list-1',
    listingTitle: 'Toyota Land Cruiser VXR 2024 Twin Turbo 3.5L',
    listingPrice: 365000,
    listingImage: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=400&q=80',
    listingLocation: 'The Pearl-Qatar',
    otherUser: {
      id: 'sel-1',
      name: 'Nasser Al-Kuwari (VIP Motors)',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'nasser.motors@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.9,
      reviewCount: 38,
      joinedDate: 'Joined March 2022',
      responseRate: '99%',
      responseTime: 'within 5 minutes',
      location: 'The Pearl-Qatar',
      isOnline: true
    },
    lastMessage: 'Salam! Yes, the Land Cruiser is available and ready at our Pearl showroom.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'current-user',
        senderName: 'You',
        text: 'Salam Alaykum brother, is this Land Cruiser VXR still available? Can we do inspection today?',
        timestamp: '10:40 AM',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'sel-1',
        senderName: 'Nasser Al-Kuwari',
        text: 'Salam! Yes, the Land Cruiser is available and ready at our Pearl showroom. You are welcome anytime between 9 AM and 9 PM.',
        timestamp: '10:45 AM',
        isRead: false
      }
    ]
  },
  {
    id: 'conv-2',
    listingId: 'list-4',
    listingTitle: 'Apple iPhone 16 Pro Max 512GB Desert Titanium',
    listingPrice: 5200,
    listingImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
    listingLocation: 'Al Sadd, Doha',
    otherUser: {
      id: 'sel-4',
      name: 'Doha Tech & Mobile Hub',
      phone: '+97477315415',
      whatsapp: '+97477315415',
      email: 'tech@marketpro.qa',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.7,
      reviewCount: 92,
      joinedDate: 'Joined Nov 2020',
      responseRate: '96%',
      responseTime: 'within 15 minutes',
      location: 'Al Sadd, Doha',
      isOnline: true
    },
    lastMessage: 'Offer received: QAR 5,000. Seller has accepted the offer!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-3',
        senderId: 'current-user',
        senderName: 'You',
        text: 'Hi, can you deliver to West Bay today?',
        timestamp: 'Yesterday 3:15 PM',
        isRead: true
      },
      {
        id: 'msg-4',
        senderId: 'current-user',
        senderName: 'You',
        text: 'I submitted an offer for QAR 5,000',
        timestamp: 'Yesterday 3:16 PM',
        isOffer: true,
        offerAmount: 5000,
        offerStatus: 'accepted',
        isRead: true
      },
      {
        id: 'msg-5',
        senderId: 'sel-4',
        senderName: 'Doha Tech',
        text: 'Offer accepted! You can proceed with MarketPro secure escrow or pay upon delivery.',
        timestamp: 'Yesterday 3:20 PM',
        isRead: true
      }
    ]
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalListings: 10420,
  activeListings: 9815,
  pendingListings: 42,
  reportedListings: 8,
  totalUsers: 48600,
  verifiedSellers: 3420,
  totalVolumeQAR: 142850000,
  promotionsRevenueQAR: 284500,
  totalTransactions: 3190
};

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TXN-9021',
    type: 'ad_boost',
    amount: 99,
    currency: 'QAR',
    listingId: 'list-1',
    listingTitle: 'Toyota Land Cruiser VXR 2024',
    buyerName: 'Nasser Al-Kuwari',
    method: 'QNB',
    status: 'completed',
    date: '2026-08-24 09:15'
  },
  {
    id: 'TXN-9020',
    type: 'escrow_purchase',
    amount: 5000,
    currency: 'QAR',
    listingId: 'list-4',
    listingTitle: 'Apple iPhone 16 Pro Max 512GB',
    buyerName: 'Abdullah Al-Kindi',
    sellerName: 'Doha Tech & Mobile Hub',
    method: 'ApplePay',
    status: 'escrow_held',
    date: '2026-08-23 18:30'
  },
  {
    id: 'TXN-9019',
    type: 'vip_badge',
    amount: 299,
    currency: 'QAR',
    buyerName: 'Qatar Oasis Real Estate',
    method: 'NAPS_Debit',
    status: 'completed',
    date: '2026-08-23 14:02'
  },
  {
    id: 'TXN-9018',
    type: 'ad_boost',
    amount: 49,
    currency: 'QAR',
    listingId: 'list-7',
    listingTitle: 'Brand New 2-Bedroom Porto Arabia',
    buyerName: 'Qatar Oasis Real Estate',
    method: 'QPay',
    status: 'completed',
    date: '2026-08-22 11:20'
  }
];

export const ADVERTISING_PACKAGES: AdPackage[] = [
  {
    id: 'pkg-free',
    name: 'Free Basic Ad',
    nameAr: 'إعلان مجاني أساسي',
    tier: 'free',
    priceQAR: 0,
    durationDays: 30,
    viewsMultiplier: '1x',
    badge: 'FREE',
    badgeAr: 'مجاني',
    tagline: 'Ideal for casual personal items and quick local sales',
    taglineAr: 'مثالي لبيع الأغراض الشخصية اليومية',
    features: [
      '30 Days Live in Qatar Classifieds',
      'Upload up to 5 High-Res Photos',
      'Standard Search & Category Listing',
      'Direct Buyer Messaging & Chat',
      'Verified Phone & WhatsApp Links',
      'QID Seller Verification Badge'
    ],
    featuresAr: [
      'ظهور لمدة 30 يوماً في الإعلانات المبوبة بقطر',
      'رفع حتى 5 صور بجودة عالية',
      'ظهور قياسي في نتائج البحث والتصنيفات',
      'مراسلة ومحادثة فورية مع المشترين',
      'أزرار اتصال واتساب وهاتف مباشرة',
      'شارة توثيق البطاقة الشخصية القطرية'
    ],
    isFree: true,
    colorScheme: 'slate'
  },
  {
    id: 'pkg-bump',
    name: 'Express 24h Bump',
    nameAr: 'رفع سريع 24 ساعة',
    tier: 'bump_24h',
    priceQAR: 19,
    durationDays: 1,
    viewsMultiplier: '3x',
    badge: '⚡ FLASH BUMP',
    badgeAr: '⚡ رفع فوري',
    tagline: 'Instantly re-bump your ad back to the #1 spot',
    taglineAr: 'إعادة إعلانك فوراً إلى أعلى القائمة في صدارة نتائج البحث',
    features: [
      'Immediate #1 Spot Placement in Category',
      'Urgent Sale Flame Badge (🔥 عاجل)',
      'Push to Top of Today’s Recent Ads',
      '3x Higher Click-Through Rate',
      'SMS & WhatsApp Alert Notification'
    ],
    featuresAr: [
      'ظهور فوري في المركز الأول داخل القسم',
      'شارة إعلان عاجل (🔥 عاجل للبيع)',
      'إعادة الترتيب في صدارة إعلانات اليوم',
      'معدل نقرات أعلى 3 أضعاف',
      'إشعار رسالة للمهتمين بالقسم'
    ],
    colorScheme: 'orange'
  },
  {
    id: 'pkg-featured',
    name: 'Featured Pro Badge',
    nameAr: 'إعلان مميز برو 7 أيام',
    tier: 'featured_7d',
    priceQAR: 49,
    durationDays: 7,
    viewsMultiplier: '5x',
    badge: '⭐ FEATURED',
    badgeAr: '⭐ إعلان مميز',
    tagline: 'Distinctive highlight for vehicles, electronics & jewelry',
    taglineAr: 'تمييز لافت للسيارات والإلكترونيات والساعات الفاخرة',
    features: [
      '7 Days Highlighted Maroon Border Card',
      'Priority Placement above Free Listings',
      'Starred Badge on Qatar Search & Feeds',
      'Featured Pin on Qatar Interactive Map',
      'Detailed Specs Comparison Inclusion',
      'Social Share & Instant WhatsApp Lead Generation'
    ],
    featuresAr: [
      'إطار عنابي مميز لمدة 7 أيام متتالية',
      'أولوية ظهور دائمة فوق الإعلانات المجانية',
      'شارة نجمة مميزة في نتائج البحث',
      'دبوس بارز على خريطة قطر التفاعلية',
      'ظهور في أداة مقارنة المنتجات',
      'مشاركة على منصات التواصل مع أزرار واتساب'
    ],
    colorScheme: 'rose'
  },
  {
    id: 'pkg-vip',
    name: 'VIP Gold Spotlight',
    nameAr: 'إعلان VIP الذهبي المميز',
    tier: 'vip_gold',
    priceQAR: 99,
    durationDays: 30,
    viewsMultiplier: '10x',
    badge: '👑 VIP GOLD',
    badgeAr: '👑 VIP الذهبي',
    tagline: 'Maximum exposure on Homepage Hero, Top of Search & Map',
    taglineAr: 'أعلى نسبة مشاهدات على الصفحة الرئيسية وصدارة البحث والخريطة',
    features: [
      '30 Days Permanent VIP Golden Glow Card',
      'Homepage Bento Hero Spotlight Banner',
      'Always Top #1 in Search & Municipality Filters',
      'VIP Gold Pin Marker on Qatar Interactive Map',
      'Bank Loan & Metrash2 Inspection Integration',
      'Dedicated Social Media Boost on MarketPro Qatar',
      'Priority Escrow Protection & Support'
    ],
    featuresAr: [
      'إطار ذهبي فاخر مع توهج VIP لمدة 30 يوماً',
      'ظهور في بنر الصدارة بالصفحة الرئيسية',
      'صدارة دائمة في نتائج البحث وفلاتر البلديات',
      'علامة VIP ذهبية على خريطة قطر التفاعلية',
      'ربط تلقائي بحاسبة التمويل البنكي ودليل مطراش2',
      'ترويج خاص عبر قنوات المنصة في قطر',
      'أولوية الدعم والضمان وخدمة الدفع الآمن'
    ],
    isPopular: true,
    colorScheme: 'amber'
  },
  {
    id: 'pkg-business',
    name: 'Dealership & Agency Pro',
    nameAr: 'باقة المعارض والشركات العقارية',
    tier: 'business_pro',
    priceQAR: 399,
    durationDays: 30,
    viewsMultiplier: '25x',
    badge: '🏢 BUSINESS PRO',
    badgeAr: '🏢 باقة الأعمال',
    tagline: 'For Qatar car showrooms, real estate agencies & tech stores',
    taglineAr: 'مخصصة لمعارض السيارات القطرية والشركات العقارية ومتاجر الإلكترونيات',
    features: [
      'Unlimited Active Free & Paid Boosted Ads',
      'Custom Showroom / Company Profile Page',
      'Verified Commercial Registration (CR/سجل تجاري) Badge',
      'Top Billboard Commercial Banner Inclusion',
      'Dedicated WhatsApp Account Manager (+974 7731 5415)',
      'Monthly Analytics, Lead Export & Impression Insights'
    ],
    featuresAr: [
      'نشر غير محدود للإعلانات المجانية والمميزة',
      'صفحة خاصة للمتجر أو المعرض متكاملة',
      'شارة السجل التجاري الموثق (CR Verified)',
      'بنر إعلاني تجاري بارز في رأس الأقسام',
      'مدير حساب واتساب خاص للمتابعة الدورية (+974 7731 5415)',
      'تقارير شهرية متقدمة لتتبع النقرات والاتصالات'
    ],
    colorScheme: 'purple'
  }
];

export const COMMERCIAL_BANNER_ADS: CommercialBannerAd[] = [
  {
    id: 'ad-banner-1',
    title: 'Alfardan Premier Motors - Defender 2025',
    titleAr: 'الفردان للسيارات - ديفندر 2025 الجديد كلياً',
    subtitle: 'Exclusive 5-Year Free Service & Warranty Package in Qatar',
    subtitleAr: 'باقة صيانة وضمان مجاني لمدة 5 سنوات حصرية في قطر',
    advertiserName: 'Alfardan Premier Motors Qatar',
    advertiserLogo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=120&q=80',
    badgeText: 'SPONSORED SHOWROOM',
    badgeTextAr: 'معرض معتمد راعي',
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'vehicles',
    ctaText: 'Book Test Drive',
    ctaTextAr: 'احجز تجربة القيادة',
    whatsappNumber: '+97477315415',
    phone: '+97477315415',
    location: 'Doha - Burj Alfardan, West Bay',
    impressions: 48500,
    clicks: 3420,
    status: 'active',
    isSponsored: true
  },
  {
    id: 'ad-banner-2',
    title: 'The Pearl Beachfront Duplexes - UDC Qatar',
    titleAr: 'دوبلكس الواجهة البحرية باللؤلؤة - الشركة المتحدة للتنمية',
    subtitle: 'Freehold Luxury Living with Direct Marina Access & Zero Down Payment Options',
    subtitleAr: 'تملك حر فاخر مع إطلالة مباشرة على المارينا وخيارات تمويل ميسرة',
    advertiserName: 'United Development Company (UDC)',
    advertiserLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
    badgeText: 'EXCLUSIVE REAL ESTATE',
    badgeTextAr: 'عقارات حصرية',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'properties',
    ctaText: 'View Floor Plans',
    ctaTextAr: 'عرض المخططات والأسعار',
    whatsappNumber: '+97477315415',
    phone: '+97477315415',
    location: 'The Pearl-Qatar, Porto Arabia',
    impressions: 62100,
    clicks: 4890,
    status: 'active',
    isSponsored: true
  },
  {
    id: 'ad-banner-3',
    title: 'QNB First Auto & Home Finance 2026',
    titleAr: 'تمويل السيارات والمساكن الأول من QNB',
    subtitle: 'Special 3.45% Reducing Rate with Instant Metrash2 Approval',
    subtitleAr: 'معدل فائدة مخفض 3.45% وموافقة فورية عبر مطراش2',
    advertiserName: 'Qatar National Bank (QNB)',
    advertiserLogo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=120&q=80',
    badgeText: 'OFFICIAL BANK PARTNER',
    badgeTextAr: 'شريك مصرفي معتمد',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'finance',
    ctaText: 'Check Eligibility',
    ctaTextAr: 'احسب أهليتك للتمويل',
    whatsappNumber: '+97477315415',
    phone: '+97477315415',
    location: 'All Branches - Qatar',
    impressions: 39800,
    clicks: 2910,
    status: 'active',
    isSponsored: true
  },
  {
    id: 'ad-banner-4',
    title: 'Jarir Bookstore Qatar - Tech & Mobile Fest',
    titleAr: 'مكتبة جرير قطر - مهرجان التكنولوجيا والهواتف',
    subtitle: 'Get up to 400 QAR Trade-In Bonus on your Old iPhone or MacBook',
    subtitleAr: 'احصل على مكافأة استبدال حتى 400 ريال عند استبدال هاتفك القديم',
    advertiserName: 'Jarir Bookstore Qatar',
    advertiserLogo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=120&q=80',
    badgeText: 'RETAIL SPONSOR',
    badgeTextAr: 'راعي تجزئة معتمد',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'electronics',
    ctaText: 'Shop Tech Offers',
    ctaTextAr: 'تصفح عروض التكنولوجيا',
    whatsappNumber: '+97477315415',
    phone: '+97477315415',
    location: 'Salwa Road & Jaidah Square, Doha',
    impressions: 54300,
    clicks: 3820,
    status: 'active',
    isSponsored: true
  }
];

export const INITIAL_HERO_SPOTLIGHT: HeroSpotlightConfig = {
  badge: 'VIP Spotlight',
  location: 'The Pearl-Qatar',
  subLocation: 'Porto Arabia Marina',
  imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  price: '4,250,000 QAR',
  priceNum: 4250000,
  title: 'Ultra-Luxury Duplex Penthouse with Marina Berth',
  titleAr: 'بنتهاوس دوبلكس فائق الفخامة مع مرسى خاص لليخوت',
  description: 'Verified Title Deed • 4 Beds • Private Jacuzzi • Direct Lagoon & Marina Views',
  category: 'properties',
  escrowGuaranteed: true
};

export const INITIAL_PLATFORM_CONFIG: PlatformConfig = {
  platformName: 'MarketPro Qatar',
  phone: '+97477315415',
  phoneDisplay: '+974 7731 5415',
  whatsappNumber: '+97477315415',
  announcementNotice: 'Welcome to MarketPro Qatar: National Day VIP promotion is now live! QID & Metrash2 verification enabled.',
  isAnnouncementActive: true,
  requireAdminApprovalForNewAds: true
};

export const QATAR_IMAGE_PRESETS = [
  {
    category: 'Vehicles & Motors',
    name: 'Toyota Land Cruiser VXR White',
    url: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Vehicles & Motors',
    name: 'Nissan Patrol Nismo Black Edition',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Vehicles & Motors',
    name: 'Porsche 911 GT3 RS Qatar',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Vehicles & Motors',
    name: 'Mercedes-AMG G63 Mansory',
    url: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Vehicles & Motors',
    name: 'Land Rover Defender 110 V8',
    url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Properties & Real Estate',
    name: 'The Pearl Beachfront Villa',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Properties & Real Estate',
    name: 'Lusail Marina Luxury Apartment',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Properties & Real Estate',
    name: 'West Bay Lagoon Palace',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Properties & Real Estate',
    name: 'Modern Doha Compound Interior',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Electronics & Mobiles',
    name: 'Apple iPhone 16 Pro Desert Titanium',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Electronics & Mobiles',
    name: 'Apple MacBook Pro M3 Max Space Black',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Electronics & Mobiles',
    name: 'Sony PlayStation 5 Pro & Gaming Rig',
    url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Luxury & Watches',
    name: 'Rolex Daytona Cosmograph Gold',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Luxury & Watches',
    name: 'Patek Philippe Nautilus Rose Gold',
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Commercial Banners',
    name: 'Luxury Showroom Billboard',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Commercial Banners',
    name: 'Qatar Banking & Finance Banner',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    category: 'Commercial Banners',
    name: 'UDC The Pearl Marina Billboard',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
  }
];

