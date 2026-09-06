import React from 'react';

export default function ShopTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'brands', label: 'Top Brands' },
    { id: 'stores', label: 'Nearby Stores' },
    { id: 'marketplace', label: '1Fi Marketplace' }
  ];

  return (
    <div className="px-3.5 py-2 bg-[#F5F6FA] sticky top-0 z-30 shrink-0">
      {/* Outer rounded-full pill container matching 1Fi reference design */}
      <div className="grid grid-cols-3 bg-[#F4EEFF] p-1 rounded-full border border-[#D4B8FF]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 sm:py-2.5 px-2 rounded-full text-[11px] sm:text-xs text-center transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-[#722EDC] font-bold shadow-[0_2px_8px_rgba(114,46,220,0.06)] border border-[#D4B8FF]'
                  : 'text-[#6A7389] font-medium hover:text-[#151928]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
