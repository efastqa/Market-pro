import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Building2, 
  Car, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle
} from 'lucide-react';
import { PLATFORM_PHONE_DISPLAY, PLATFORM_WHATSAPP_LINK } from '../data/mockData';

interface FinanceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  initialType?: 'vehicle' | 'property';
  listingTitle?: string;
}

interface BankOption {
  name: string;
  logo: string;
  carRate: number;
  mortgageRate: number;
  features: string[];
}

const QATAR_BANKS: BankOption[] = [
  {
    name: 'Qatar National Bank (QNB)',
    logo: '🏦 QNB',
    carRate: 3.95,
    mortgageRate: 4.50,
    features: ['Instant Pre-Approval', 'Up to 5 Years Auto / 25 Years Property', 'Salary Transfer Benefit']
  },
  {
    name: 'Commercial Bank of Qatar (CBQ)',
    logo: '🏛️ CBQ',
    carRate: 4.10,
    mortgageRate: 4.65,
    features: ['Zero Downpayment Option for Nationals', 'Complimentary First Year Insurance', 'Fast Track Approval']
  },
  {
    name: 'Qatar Islamic Bank (QIB)',
    logo: '🕌 QIB',
    carRate: 4.05,
    mortgageRate: 4.60,
    features: ['100% Sharia-Compliant Murabaha', 'No Hidden Fees', 'Flexible Grace Periods']
  },
  {
    name: 'Dukhan Bank',
    logo: '🌟 Dukhan',
    carRate: 3.85,
    mortgageRate: 4.45,
    features: ['Competitive Profit Rates', 'Digital Application', 'Loyalty Rewards Points']
  }
];

export const FinanceCalculatorModal: React.FC<FinanceCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPrice = 250000,
  initialType = 'vehicle',
  listingTitle
}) => {
  const [loanType, setLoanType] = useState<'vehicle' | 'property'>(initialType);
  const [price, setPrice] = useState<number>(initialPrice || (loanType === 'vehicle' ? 250000 : 2500000));
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(loanType === 'vehicle' ? 3.95 : 4.50);
  const [tenureYears, setTenureYears] = useState<number>(loanType === 'vehicle' ? 4 : 20);
  const [selectedBank, setSelectedBank] = useState<string>('Qatar National Bank (QNB)');

  // Sync loanType change defaults
  const handleTypeChange = (type: 'vehicle' | 'property') => {
    setLoanType(type);
    if (type === 'vehicle') {
      if (price > 1000000) setPrice(280000);
      setTenureYears(4);
      setInterestRate(3.95);
    } else {
      if (price < 500000) setPrice(2200000);
      setTenureYears(20);
      setInterestRate(4.50);
    }
  };

  // Calculations
  const downPaymentAmount = useMemo(() => Math.round((price * downPaymentPercent) / 100), [price, downPaymentPercent]);
  const loanAmount = useMemo(() => Math.max(0, price - downPaymentAmount), [price, downPaymentAmount]);

  const calculation = useMemo(() => {
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = tenureYears * 12;

    if (totalMonths <= 0 || loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0
      };
    }

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / totalMonths;
      return {
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: 0,
        totalPayment: loanAmount
      };
    }

    // Standard EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [loanAmount, interestRate, tenureYears]);

  const principalPercent = calculation.totalPayment > 0 
    ? Math.round((loanAmount / calculation.totalPayment) * 100) 
    : 100;
  const interestPercent = 100 - principalPercent;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-[#8A1538] dark:text-rose-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Qatar Auto & Mortgage Finance Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {listingTitle ? `Estimate installments for "${listingTitle}"` : 'Calculate monthly EMI with top Qatar banks'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Loan Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              <button
                type="button"
                onClick={() => handleTypeChange('vehicle')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  loanType === 'vehicle'
                    ? 'bg-[#8A1538] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Auto Loan (سيارات)</span>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('property')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  loanType === 'property'
                    ? 'bg-[#8A1538] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Property Mortgage (عقارات)</span>
              </button>
            </div>

            {/* Total Price Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{loanType === 'vehicle' ? 'Vehicle Price' : 'Property Value'}</span>
                <span className="text-[#8A1538] dark:text-rose-400 font-mono text-sm">
                  {price.toLocaleString()} QAR
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={loanType === 'vehicle' ? 30000 : 500000}
                  max={loanType === 'vehicle' ? 1500000 : 15000000}
                  step={loanType === 'vehicle' ? 5000 : 50000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#8A1538]"
                />
              </div>
              <div className="flex gap-2 pt-1">
                {[
                  loanType === 'vehicle' ? 120000 : 1200000,
                  loanType === 'vehicle' ? 260000 : 2500000,
                  loanType === 'vehicle' ? 450000 : 4800000,
                  loanType === 'vehicle' ? 850000 : 8000000
                ].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPrice(val)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#8A1538] hover:text-white transition-colors"
                  >
                    {(val / 1000).toLocaleString()}k QAR
                  </button>
                ))}
              </div>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Down Payment ({downPaymentPercent}%)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                  {downPaymentAmount.toLocaleString()} QAR
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>0% (Full Finance)</span>
                <span>20% (Standard)</span>
                <span>40%</span>
                <span>60%</span>
              </div>
            </div>

            {/* Tenure & Interest Rate row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tenure */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>Loan Period (المدة)</span>
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-[#8A1538]"
                >
                  {loanType === 'vehicle' ? (
                    <>
                      <option value={1}>1 Year (12 Months)</option>
                      <option value={2}>2 Years (24 Months)</option>
                      <option value={3}>3 Years (36 Months)</option>
                      <option value={4}>4 Years (48 Months)</option>
                      <option value={5}>5 Years (60 Months - Max Auto)</option>
                    </>
                  ) : (
                    <>
                      <option value={5}>5 Years (60 Months)</option>
                      <option value={10}>10 Years (120 Months)</option>
                      <option value={15}>15 Years (180 Months)</option>
                      <option value={20}>20 Years (240 Months)</option>
                      <option value={25}>25 Years (300 Months - Max Mortgage)</option>
                    </>
                  )}
                </select>
              </div>

              {/* Interest Rate */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-amber-500" />
                  <span>Profit/Interest Rate %</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.05"
                    min="2.5"
                    max="10.0"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#8A1538]"
                  />
                  <span className="text-xs font-bold text-slate-500">% p.a.</span>
                </div>
              </div>
            </div>

            {/* Bank Comparison Quick Pick */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Benchmark Rates by Qatar Banks
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {QATAR_BANKS.map((b) => {
                  const rate = loanType === 'vehicle' ? b.carRate : b.mortgageRate;
                  const isSelected = selectedBank === b.name;
                  return (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => {
                        setSelectedBank(b.name);
                        setInterestRate(rate);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#8A1538] bg-rose-50/50 dark:bg-rose-950/30 text-[#8A1538] dark:text-rose-300 ring-2 ring-[#8A1538]/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-extrabold truncate">{b.logo}</div>
                      <div className="text-xs font-black text-slate-900 dark:text-white mt-1">
                        {rate}%
                      </div>
                      <div className="text-[9px] text-slate-400">Fixed Rate</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Financial Result Summary & Call to Action */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#73102d] to-slate-950 text-white rounded-3xl p-5 sm:p-6 border border-rose-900/40 shadow-xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-rose-200 font-semibold uppercase tracking-wider">
                  Estimated Monthly EMI
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {tenureYears * 12} Installments
                </span>
              </div>

              <div className="mt-4 text-center">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {calculation.monthlyPayment.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-amber-300 ml-1.5">QAR / month</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Estimated repayment per month
                </p>
              </div>

              {/* Progress Bar of Principal vs Interest */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-emerald-400">Principal: {principalPercent}%</span>
                  <span className="text-amber-400">Interest/Profit: {interestPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${principalPercent}%` }}
                  />
                  <div 
                    className="bg-amber-400 h-full transition-all duration-500" 
                    style={{ width: `${interestPercent}%` }}
                  />
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="mt-5 space-y-2 text-xs bg-black/30 rounded-2xl p-3.5 border border-white/10">
                <div className="flex justify-between text-slate-300">
                  <span>Financed Loan Amount:</span>
                  <span className="font-bold text-white">{loanAmount.toLocaleString()} QAR</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Down Payment ({downPaymentPercent}%):</span>
                  <span className="font-bold text-emerald-400">{downPaymentAmount.toLocaleString()} QAR</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest / Profit:</span>
                  <span className="font-bold text-amber-300">+{calculation.totalInterest.toLocaleString()} QAR</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-sm">
                  <span>Total Payable:</span>
                  <span className="text-white">{calculation.totalPayment.toLocaleString()} QAR</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTAs */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <a
                href={`${PLATFORM_WHATSAPP_LINK}&text=Hello%20MarketPro,%20I%20want%20pre-approval%20financing%20for%20a%20${loanType}%20valued%20at%20${price.toLocaleString()}%20QAR%20with%20monthly%20estimate%20${calculation.monthlyPayment.toLocaleString()}%20QAR`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Bank Pre-Approval via WhatsApp</span>
              </a>

              <a
                href="tel:+97477315415"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Qatar Finance Desk ({PLATFORM_PHONE_DISPLAY})</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
