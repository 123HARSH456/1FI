import React from 'react';
import { 
  Bell, 
  Search, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function AppHeader({ 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery,
  showSearch,
  setShowSearch 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F6FA] border-b border-[#EAEFF6] px-4 py-2.5">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        {/* 1Fi Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-1fi-purple flex items-center justify-center shadow-onefi-glow">
            <span className="font-display font-extrabold text-white text-base tracking-tight">1fi</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base text-[#151928] tracking-tight">1Fi</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#F3EFFF] text-[#6C38FF] border border-[#E4D8FF]">
                PAY
              </span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 rounded-xl transition-all ${
              showSearch 
                ? 'bg-[#6C38FF] text-white shadow-sm' 
                : 'bg-white border border-[#EAEFF6] text-[#60677C] hover:text-[#151928]'
            }`}
            title="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'full' : 'mobile')}
            className="flex items-center gap-1 bg-white hover:bg-[#F3EFFF] border border-[#EAEFF6] text-[#60677C] hover:text-[#6C38FF] px-2 py-1.5 rounded-xl text-xs font-semibold transition-all"
            title={viewMode === 'mobile' ? 'Switch to Full Desktop View' : 'Switch to 1Fi Mobile App View'}
          >
            {viewMode === 'mobile' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#6C38FF]" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#6C38FF]" />
                <span className="hidden sm:inline">Mobile</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-white border border-[#EAEFF6] text-[#60677C] hover:text-[#151928] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6C38FF]"></span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="mt-2.5 animate-fadeIn">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C93A8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search iPhone, Galaxy S25, Pixel, OnePlus..."
              className="w-full bg-white border border-[#D5DAE6] focus:border-[#6C38FF] focus:ring-2 focus:ring-[#6C38FF]/20 text-[#151928] text-sm rounded-xl pl-10 pr-4 py-2 placeholder-[#8C93A8] outline-none transition-all shadow-sm"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C93A8] hover:text-[#151928] bg-slate-100 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
