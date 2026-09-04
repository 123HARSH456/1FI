import React from 'react';
import ProductCard from './ProductCard';
import { 
  RefreshCw, 
  Calendar, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';

export default function MarketplaceTab({ 
  products, 
  loading, 
  error, 
  onRefresh, 
  onSelectProduct,
  selectedBrand,
  setSelectedBrand
}) {
  const brands = ['All', 'Apple', 'Samsung', 'Google', 'OnePlus'];

  const brandPartners = [
    { name: 'Samsung', logo: 'SAMSUNG', color: 'bg-black text-white font-bold' },
    { name: 'OnePlus', logo: '1+', color: 'bg-[#EB0029] text-white font-black' },
    { name: 'Reliance D..', logo: 'Reliance', color: 'bg-[#002B49] text-white text-[10px] font-bold' },
    { name: 'Croma', logo: 'croma', color: 'bg-[#00B4D8] text-white font-bold' },
    { name: 'Vijay Sales', logo: 'VIJAY', color: 'bg-[#E53935] text-white text-[10px] font-bold' },
    { name: 'Apple', logo: '', color: 'bg-slate-900 text-white font-bold' }
  ];

  return (
    <div className="p-4 space-y-5 animate-fadeIn pb-24">
      <div className="relative rounded-3xl p-5 gradient-1fi-card text-white shadow-onefi-glow overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00C88C] text-black text-[10px] font-black tracking-wide uppercase mb-2">
              <CreditCard className="w-3 h-3" />
              <span>Limit Available</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
              ₹1,56,091
            </h2>
            <p className="text-[11px] font-semibold text-purple-200 tracking-wider uppercase mt-0.5">
              Remaining to Spend
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-2xl sm:text-3xl text-white leading-none block italic drop-shadow-sm">
              0%
            </span>
            <span className="text-[11px] font-black uppercase text-purple-200 tracking-wider">
              Interest
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
          <button 
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full bg-white text-[#5E2BE9] font-bold text-xs shadow-md hover:bg-purple-50 transition-all cursor-pointer"
          >
            Shop now
          </button>
          <span className="text-[11px] text-purple-200 font-medium">
            Mutual Fund Backed EMIs
          </span>
        </div>
      </div>

      <div className="card-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-onefi-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3EFFF] text-[#6C38FF] flex items-center justify-center shrink-0 border border-[#E4D8FF]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#151928]">Don't miss a payment</h4>
            <p className="text-[11px] text-[#8C93A8]">Set autopay with UPI · Paytm, PhonePe, GPay</p>
          </div>
        </div>
        <button 
          onClick={() => alert('Autopay configuration active')}
          className="px-3.5 py-1.5 rounded-full border border-[#6C38FF] text-[#6C38FF] text-xs font-bold hover:bg-[#F3EFFF] transition-colors shrink-0 cursor-pointer"
        >
          Setup
        </button>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#6C38FF] flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-[#6C38FF] rounded-full inline-block"></span>
          <span>Offers</span>
        </h3>

        <div className="rounded-3xl p-5 gradient-offer-banner text-white relative overflow-hidden shadow-md">
          <div className="max-w-[200px] space-y-1 relative z-10">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#FFB800] block">
              Everyday Pro Performance
            </span>
            <h4 className="font-display font-extrabold text-base leading-snug">
              Get Your New Flagship for Work
            </h4>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-semibold text-emerald-300 mt-2">
              <CheckCircle2 className="w-3 h-3 text-[#00C88C]" />
              <span>Starts at ₹2,160/mo</span>
            </div>
          </div>

          <div className="absolute -right-4 -bottom-4 w-36 h-36 opacity-90 pointer-events-none">
            <img 
              src="/products/iphone-17-pro.png" 
              alt="Offer" 
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4 pt-2">
            <span className="w-4 h-1 bg-white rounded-full"></span>
            <span className="w-1.5 h-1 bg-white/40 rounded-full"></span>
            <span className="w-1.5 h-1 bg-white/40 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#6C38FF] flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-[#6C38FF] rounded-full inline-block"></span>
          <span>Our Brand Partners</span>
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {brandPartners.map((bp, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedBrand(bp.name === 'Reliance D..' || bp.name === 'Croma' || bp.name === 'Vijay Sales' ? 'All' : bp.name)}
              className="card-white card-white-hover rounded-2xl p-2.5 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${bp.color} flex items-center justify-center text-xs shadow-sm`}>
                {bp.logo}
              </div>
              <span className="text-[11px] font-semibold text-[#151928] truncate w-full">
                {bp.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div id="catalog-section" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#6C38FF] flex items-center gap-1.5">
            <span className="w-1 h-3.5 bg-[#6C38FF] rounded-full inline-block"></span>
            <span>1Fi Marketplace Catalog</span>
          </h3>

          <button
            onClick={onRefresh}
            className="p-1.5 rounded-xl card-white text-[#8C93A8] hover:text-[#6C38FF] transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#6C38FF]' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-[#6C38FF] text-white shadow-sm'
                  : 'card-white text-[#6A7389] hover:text-[#151928]'
              }`}
            >
              {brand === 'All' ? 'All Devices' : brand}
            </button>
          ))}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card-white rounded-3xl p-4 animate-pulse space-y-3">
                <div className="h-40 bg-slate-100 rounded-2xl"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-2">
            <p className="text-xs text-red-600 font-semibold">{error}</p>
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
