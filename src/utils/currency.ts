export type CurrencyCode = 'QAR' | 'SAR' | 'AED' | 'KWD' | 'BHD' | 'OMR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  nameAr: string;
  rateFromQAR: number; // Multiply QAR by this rate to get target currency
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyRate> = {
  QAR: {
    code: 'QAR',
    symbol: 'QAR',
    name: 'Qatari Riyal',
    nameAr: 'ريال قطري',
    rateFromQAR: 1,
    flag: '🇶🇦'
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    name: 'Saudi Riyal',
    nameAr: 'ريال سعودي',
    rateFromQAR: 1.03,
    flag: '🇸🇦'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    nameAr: 'درهم إماراتي',
    rateFromQAR: 1.01,
    flag: '🇦🇪'
  },
  KWD: {
    code: 'KWD',
    symbol: 'KWD',
    name: 'Kuwaiti Dinar',
    nameAr: 'دينار كويتي',
    rateFromQAR: 0.084,
    flag: '🇰🇼'
  },
  BHD: {
    code: 'BHD',
    symbol: 'BHD',
    name: 'Bahraini Dinar',
    nameAr: 'دينار بحريني',
    rateFromQAR: 0.103,
    flag: '🇧🇭'
  },
  OMR: {
    code: 'OMR',
    symbol: 'OMR',
    name: 'Omani Rial',
    nameAr: 'ريال عماني',
    rateFromQAR: 0.106,
    flag: '🇴🇲'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameAr: 'دولار أمريكي',
    rateFromQAR: 0.275,
    flag: '🇺🇸'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameAr: 'يورو',
    rateFromQAR: 0.252,
    flag: '🇪🇺'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    nameAr: 'جنيه إسترليني',
    rateFromQAR: 0.215,
    flag: '🇬🇧'
  }
};

export function formatPriceWithCurrency(
  qarPrice: number,
  currencyCode: CurrencyCode | string = 'QAR',
  unitSuffix: string = ''
): string {
  const validCode = (currencyCode && currencyCode in CURRENCIES) ? (currencyCode as CurrencyCode) : 'QAR';
  const currency = CURRENCIES[validCode] || CURRENCIES.QAR;
  const converted = Math.round(qarPrice * currency.rateFromQAR);
  
  if (validCode === 'USD' || validCode === 'EUR' || validCode === 'GBP') {
    return `${currency.symbol}${converted.toLocaleString()}${unitSuffix ? ` ${unitSuffix}` : ''}`;
  }
  
  return `${converted.toLocaleString()} ${currency.symbol}${unitSuffix ? ` ${unitSuffix}` : ''}`;
}
