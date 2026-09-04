import React from 'react';
import { Building2, Sparkles, Bell, ArrowRight } from 'lucide-react';

export default function TopBrandsTab({ onExploreMarketplace }) {
  const brandLogos = [
    { name: 'Apple', icon: '', tag: 'Direct Partner', color: 'bg-slate-900 text-white' },
    { name: 'Samsung', icon: 'SAMSUNG', tag: 'Official EMI', color: 'bg-blue-900 text-white text-[10px]' },
    { name: 'Google', icon: 'G', tag: 'Exclusive MF Rewards', color: 'bg-zinc-800 text-white' },
    { name: 'OnePlus', icon: '1+', tag: 'No-Cost EMI', color: 'bg-red-600 text-white' },
    { name: 'Sony', icon: 'SONY', tag: 'Audio & Cameras', color: 'bg-black text-white text-[10px]' },
    { name: 'Marshall', icon: 'Marshall', tag: 'Premium Sound', color: 'bg-stone-900 text-white text-[10px]' }
  ];

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="p-5 rounded-3xl gradient-1fi-card text-white shadow-onefi-glow text-center relative overflow-hidden">
        <div className="w-10 h-10 rounded-2xl bg-white/15 text-white flex items-center justify-center mx-auto mb-2">
          <Building2 className="w-5 h-5" />
        </div>
        <h3 className="font-display font-bold text-base text-white mb-1">Top Brand Stores</h3>
        <p className="text-xs text-purple-100 max-w-xs mx-auto mb-3">
          Brand-exclusive flagship stores with 0% EMI financing against your mutual fund portfolio are coming soon.
        </p>
        <button 
          onClick={onExploreMarketplace}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-white text-[#5E2BE9] font-bold text-xs shadow-sm hover:bg-purple-50 transition-all cursor-pointer"
        >
          <span>Explore 1Fi Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">Partner Brands</span>
          <span className="text-[11px] text-[#6C38FF] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> 6 Brands Onboarding
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {brandLogos.map((brand, idx) => (
            <div
              key={idx}
              className="card-white card-white-hover rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${brand.color} flex items-center justify-center font-bold text-sm shadow-xs`}>
                {brand.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#151928]">{brand.name}</h4>
                <p className="text-[10px] text-[#8C93A8]">{brand.tag}</p>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F5F6FA] text-[#8C93A8] border border-[#EAEFF6]">
                Opening Soon
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-white rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#151928]">
          <Bell className="w-4 h-4 text-[#6C38FF]" />
          <span>Get notified when brand stores launch</span>
        </div>
        <button 
          onClick={() => alert('Notifications enabled!')}
          className="text-xs font-bold text-[#6C38FF] hover:underline cursor-pointer"
        >
          Notify Me
        </button>
      </div>
    </div>
  );
}
