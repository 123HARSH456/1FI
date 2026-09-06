import React from 'react';
import { Star } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const defaultVar = product.default_variant || {};

  return (
    <div
      onClick={() => onSelectProduct(product.slug)}
      className="bg-white rounded-[20px] p-3 sm:p-3.5 border border-[#EAEFF6] shadow-[0_4px_16px_-2px_rgba(21,25,40,0.03)] hover:border-[#D4B8FF] hover:shadow-[0_8px_20px_-4px_rgba(114,46,220,0.08)] transition-all duration-200 cursor-pointer flex flex-col justify-between group select-none"
    >
      <div>
        {/* 1. PRODUCT IMAGE: Floating transparent phone cutout directly on card surface */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-1.5 overflow-hidden bg-transparent">
          <img
            src={defaultVar.image_url ? `${defaultVar.image_url}?v=2` : ''}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* 2 & 3. BRAND & RATING: Small, subtle secondary row (NO pills, NO boxes) */}
        <div className="flex items-center justify-between text-[10px] mt-2.5 mb-1">
          <span className="font-bold uppercase tracking-wider text-[#8C93A8]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[#8C93A8]">
            <Star className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
            <span className="font-bold text-[#151928]">{product.rating}</span>
          </div>
        </div>

        {/* 4. PRODUCT NAME & VARIANT */}
        <div>
          <h3 className="font-display font-bold text-sm sm:text-[15px] text-[#151928] leading-tight line-clamp-2 group-hover:text-[#722EDC] transition-colors">
            {product.name}
          </h3>
          <p className="text-[10.5px] text-[#8C93A8] font-normal mt-0.5 line-clamp-1">
            {defaultVar.variant_name || `${defaultVar.storage || ''} • ${defaultVar.color || ''}`}
          </p>
        </div>

        {/* 5. PRICE: Strongest number on the card */}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="font-display font-extrabold text-[15.5px] sm:text-base text-[#151928] tracking-tight">
            ₹{defaultVar.price?.toLocaleString('en-IN')}
          </span>
          {defaultVar.mrp > defaultVar.price && (
            <span className="text-[11px] text-[#8C93A8] line-through font-normal">
              ₹{defaultVar.mrp?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* 6. EMI INFORMATION: Clean financial text, NO large green/purple boxes */}
        {product.min_monthly_emi && (
          <p className="mt-1 text-[11px] sm:text-xs text-[#722EDC] font-semibold">
            EMI from <span className="font-extrabold">₹{product.min_monthly_emi?.toLocaleString('en-IN')}/mo</span>
          </p>
        )}
      </div>

      {/* 7. CTA: Compact 1Fi action button */}
      <div className="w-full mt-2.5 py-1.5 px-3 rounded-full bg-[#F4EEFF] text-[#722EDC] text-[11px] sm:text-xs font-semibold flex items-center justify-between group-hover:bg-[#722EDC] group-hover:text-white transition-all">
        <span>View EMI Plans</span>
        <span className="text-xs font-bold transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  );
}
