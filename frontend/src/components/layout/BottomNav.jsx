import React from 'react';
import { 
  Home, 
  Store, 
  Receipt, 
  TrendingUp, 
  User 
} from 'lucide-react';

export default function BottomNav({ activeNav = 'shop', onNavChange, onBackToShop }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: Store },
    { id: 'dues', label: 'EMI Dues', icon: Receipt },
    { id: 'limit', label: 'Limit', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="shrink-0 z-40 bg-white border-t border-[#EAEFF6] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'shop' && onBackToShop) {
                  onBackToShop();
                }
                if (onNavChange) onNavChange(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all relative ${
                isActive 
                  ? 'text-[#722EDC]' 
                  : 'text-[#8C93A8] hover:text-[#50576B]'
              }`}
            >
              {/* Active Indicator Top Line */}
              {isActive && (
                <span className="absolute -top-1.5 w-7 h-1 bg-[#722EDC] rounded-full"></span>
              )}

              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#722EDC]' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
