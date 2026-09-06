import React from 'react';
import { Sparkles, Store, Building2 } from 'lucide-react';

export default function ShopTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'brands', label: 'Top Brands', icon: Building2 },
    { id: 'stores', label: 'Nearby Stores', icon: Store },
    { id: 'marketplace', label: '1Fi Marketplace', icon: Sparkles, isHighlight: true, badge: '0% EMI' }
  ];

  return (
    <div className="px-4 py-2.5 bg-[#F5F6FA] sticky top-[53px] z-30 border-b border-[#EAEFF6]">
      <div className="flex bg-[#EAEFF6]/80 p-1 rounded-2xl border border-[#DCE3EE]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-white text-[#6C38FF] shadow-[0_2px_8px_rgba(0,0,0,0.06)] font-bold'
                  : 'text-[#6A7389] hover:text-[#151928]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6C38FF]' : 'text-[#8C93A8]'}`} />
              <span className="truncate">{tab.label}</span>

              {tab.badge && !isActive && (
                <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 bg-[#F3EFFF] text-[#6C38FF] rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
