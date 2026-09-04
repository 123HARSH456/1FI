import React from 'react';
import { MapPin, Navigation, Store, ArrowRight, ShieldCheck } from 'lucide-react';

export default function NearbyStoresTab({ onExploreMarketplace }) {
  const simulatedStores = [
    { name: '1Fi Experience Center - Indiranagar', dist: '1.2 km away', status: 'Coming Soon', address: '100ft Road, Bengaluru' },
    { name: 'Croma Store (1Fi Partner Desk)', dist: '2.5 km away', status: 'Integration in Progress', address: 'Koramangala 5th Block' },
    { name: 'Apple Authorized Partner', dist: '3.1 km away', status: 'Integration in Progress', address: 'MG Road Metro Boulevard' }
  ];

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="card-white rounded-3xl p-5 text-center relative overflow-hidden shadow-onefi-subtle">
        <div className="w-12 h-12 rounded-2xl bg-[#F3EFFF] text-[#6C38FF] border border-[#E4D8FF] flex items-center justify-center mx-auto mb-2">
          <MapPin className="w-6 h-6" />
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EFFF] text-[#6C38FF] text-[11px] font-semibold mb-2">
          <Navigation className="w-3 h-3" /> Location: Bengaluru
        </div>
        <h3 className="font-display font-bold text-base text-[#151928] mb-1">Nearby Partner Merchant Stores</h3>
        <p className="text-xs text-[#8C93A8] max-w-xs mx-auto mb-3">
          Scan & Pay with 1Fi Instant Loan against Mutual Funds at offline retail stores near you.
        </p>
        <button 
          onClick={onExploreMarketplace}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full gradient-1fi-purple text-white font-bold text-xs shadow-onefi-glow hover:brightness-105 transition-all cursor-pointer"
        >
          <span>Shop Online on 1Fi Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">Nearby Outlets</span>
          <span className="text-[11px] text-[#8C93A8]">Within 5 km</span>
        </div>

        <div className="space-y-2">
          {simulatedStores.map((store, idx) => (
            <div
              key={idx}
              className="card-white rounded-2xl p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F5F6FA] text-[#6C38FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151928]">{store.name}</h4>
                  <p className="text-[11px] text-[#8C93A8]">{store.address}</p>
                  <p className="text-[10px] text-[#008C62] font-semibold mt-0.5">{store.dist}</p>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#F5F6FA] text-[#8C93A8] border border-[#EAEFF6] whitespace-nowrap">
                {store.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-white rounded-2xl p-3 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#00C88C] shrink-0" />
        <p className="text-[11px] text-[#6A7389]">
          All 1Fi partner stores offer 100% digital checkouts backed by RBI-regulated NBFC partners.
        </p>
      </div>
    </div>
  );
}
