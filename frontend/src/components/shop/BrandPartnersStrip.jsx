import React, { useState } from 'react';
import defaultBrandPartners from '../../data/brandPartners.json';

const renderBrandLogo = (brand) => {
  switch (brand.name) {
    case 'Samsung':
      return (
        <span className="font-black text-[9px] tracking-[0.06em] text-black select-none uppercase font-sans">
          SAMSUNG
        </span>
      );
    case 'OnePlus':
      return (
        <svg viewBox="0 0 28 28" className="w-[28px] h-[28px]" fill="none">
          <rect x="2.5" y="2.5" width="18" height="18" rx="4" stroke="#EB0029" strokeWidth="2.2" />
          <text x="11.5" y="15.5" fill="#EB0029" fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">1</text>
          <path d="M21 7V12M18.5 9.5H23.5" stroke="#EB0029" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'Reliance':
      return (
        <div className="flex flex-col items-center justify-center select-none leading-none">
          <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#0A2540] flex items-center justify-center mb-0.5">
            <div className="w-1 h-1 rounded-full bg-[#0A2540]" />
          </div>
          <span className="text-[#E42529] font-black text-[7.5px] tracking-tight leading-none">Reliance</span>
          <span className="text-[#0078AD] font-bold text-[6.5px] tracking-tight leading-none mt-0.5">Digital</span>
        </div>
      );
    case 'Croma':
      return (
        <span className="text-[#00A499] font-black text-[13px] tracking-tight select-none lowercase font-sans">
          cromā
        </span>
      );
    case 'Vijay Sales':
      return (
        <div className="flex flex-col items-center justify-center select-none text-[#E31E24] leading-tight">
          <span className="font-black italic text-[9px] tracking-tight leading-none">vijay</span>
          <span className="font-black italic text-[11px] tracking-tight leading-none mt-0.5">sales</span>
        </div>
      );
    case 'Apple':
      return (
        <svg viewBox="0 0 170 170" className="w-5 h-5 text-black" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.53-10.13-11.64-21.72-15.34-34.77-3.7-13.06-5.55-25.07-5.55-36.04 0-14.7 3.59-26.68 10.77-35.95 7.18-9.26 16.21-13.98 27.1-14.15 4.58 0 9.77 1.25 15.56 3.75 5.8 2.5 9.76 3.86 11.89 4.09 2.45-.43 6.64-1.89 12.58-4.38 5.93-2.49 11.1-3.64 15.5-3.46 12.33.64 22.04 4.88 29.13 12.72-10.7 6.53-16.05 15.65-16.05 27.35 0 9.38 3.53 17.38 10.58 24 7.05 6.63 15.61 10.22 25.68 10.79-2.17 6.44-4.78 13.08-7.82 19.92zM119.22 31.84c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 11.92-10.39 19.8-12-0.22 1.3-.44 2.44-.65 3.42-1.31 6.53-4.3 12.73-8.98 18.6-4.68 5.87-10.53 9.73-17.55 11.58-.2-0.31-.6-0.93-.6-0.93z" />
        </svg>
      );
    default:
      return <span className="font-bold text-xs text-[#151928]">{brand.name[0]}</span>;
  }
};

export default function BrandPartnersStrip({ 
  brandPartners = defaultBrandPartners, 
  selectedBrand = 'All', 
  onSelectBrand 
}) {
  const [isBrandPaused, setIsBrandPaused] = useState(false);

  return (
    <div className="space-y-2 pt-1">
      {/* Section Heading */}
      <div className="flex items-center gap-1.5">
        <span className="w-[3px] h-3.5 bg-[#722EDC] rounded-full inline-block" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#722EDC]">
          OUR BRAND PARTNERS
        </span>
      </div>

      {/* Self-moving Infinite Carousel */}
      <div 
        className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0 relative select-none"
        onMouseEnter={() => setIsBrandPaused(true)}
        onMouseLeave={() => setIsBrandPaused(false)}
        onTouchStart={() => setIsBrandPaused(true)}
        onTouchEnd={() => setIsBrandPaused(false)}
      >
        <div 
          className="animate-brand-scroll flex"
          style={{ animationPlayState: isBrandPaused ? 'paused' : 'running' }}
        >
          {[...brandPartners, ...brandPartners, ...brandPartners, ...brandPartners].map((bp, idx) => {
            const isSelected = selectedBrand === bp.name;
            return (
              <button
                key={`${bp.name}-${idx}`}
                onClick={() => {
                  if (onSelectBrand) {
                    if (selectedBrand === bp.name) {
                      onSelectBrand('All');
                    } else {
                      onSelectBrand(bp.name === 'Reliance' || bp.name === 'Croma' || bp.name === 'Vijay Sales' ? 'All' : bp.name);
                    }
                  }
                }}
                className="w-[62px] sm:w-[66px] flex flex-col items-center shrink-0 cursor-pointer select-none transition-all group mr-2 sm:mr-2.5"
                aria-label={bp.displayName}
              >
                {/* Logo Tile */}
                <div className={`w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-[18px] flex items-center justify-center p-2 transition-all ${
                  isSelected
                    ? 'bg-[#FBF9FF] border-[1.5px] border-[#722EDC] shadow-[0_2px_8px_rgba(114,46,220,0.08)]'
                    : 'bg-white border border-[#EAEFF6] shadow-[0_1.5px_4px_rgba(21,25,40,0.03)] group-hover:border-[#D4B8FF]'
                }`}>
                  <div className="w-full h-full flex items-center justify-center">
                    {renderBrandLogo(bp)}
                  </div>
                </div>

                {/* Brand Name Underneath */}
                <span className={`text-[10.5px] font-medium text-center leading-tight mt-1.5 transition-colors ${
                  isSelected ? 'text-[#722EDC] font-bold' : 'text-[#4B5565] group-hover:text-[#151928]'
                }`}>
                  {bp.displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
