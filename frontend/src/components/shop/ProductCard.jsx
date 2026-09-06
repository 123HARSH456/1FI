import React from 'react';
import { Star, TrendingUp, ChevronRight } from 'lucide-react';

export default function ProductCard({ product, onSelectProduct }) {
  const defaultVar = product.default_variant || {};
  const discountPercent = defaultVar.mrp && defaultVar.price
    ? Math.round(((defaultVar.mrp - defaultVar.price) / defaultVar.mrp) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelectProduct(product.slug)}
      className="card-white card-white-hover rounded-3xl p-4 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      {/* Top Header: Brand Chip & Rating */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F3EFFF] text-[#6C38FF] border border-[#E4D8FF] uppercase tracking-wider">
          {product.brand}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-[#FAFBFD] px-2 py-0.5 rounded-lg border border-[#EAEFF6]">
          <Star className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
          <span className="text-xs font-bold text-[#151928]">{product.rating}</span>
          <span className="text-[10px] text-[#8C93A8]">({product.review_count})</span>
        </div>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square max-h-48 rounded-2xl bg-[#FAFBFD] flex items-center justify-center p-3 mb-3 overflow-hidden border border-[#F0F2F8]">
        <img
          src={defaultVar.image_url}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Discount Tag */}
        {discountPercent > 0 && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#FFF1F0] text-[#FF4D4F] border border-[#FFCCC7]">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2">
        <div>
          <h3 className="font-display font-bold text-base text-[#151928] group-hover:text-[#6C38FF] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#8C93A8] line-clamp-1">
            {defaultVar.variant_name || `${defaultVar.storage} · ${defaultVar.color}`}
          </p>
        </div>

        {/* Pricing Matrix */}
        <div className="pt-2 border-t border-[#F0F2F8] flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-lg text-[#151928]">
                ₹{defaultVar.price?.toLocaleString('en-IN')}
              </span>
              {defaultVar.mrp > defaultVar.price && (
                <span className="text-xs text-[#8C93A8] line-through">
                  ₹{defaultVar.mrp?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {defaultVar.mrp > defaultVar.price && (
              <span className="text-[10px] text-[#008C62] font-semibold">
                Save ₹{(defaultVar.mrp - defaultVar.price)?.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* EMI Starting badge */}
          {product.min_monthly_emi && (
            <div className="text-right">
              <span className="text-[10px] text-[#8C93A8] block">Starts at</span>
              <span className="font-display font-bold text-sm text-[#6C38FF]">
                ₹{product.min_monthly_emi?.toLocaleString('en-IN')}/mo
              </span>
            </div>
          )}
        </div>

        {/* 1Fi Mutual Fund Cashback Callout */}
        {product.max_mf_cashback > 0 && (
          <div className="p-2 rounded-xl bg-[#F4FDF9] border border-[#B7EBD8] flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#00C88C] shrink-0" />
              <span className="text-[11px] font-bold text-[#008C62]">
                +₹{product.max_mf_cashback?.toLocaleString('en-IN')} MF Credit
              </span>
            </div>
            <span className="text-[9px] font-bold text-[#6C38FF] bg-[#F3EFFF] px-1.5 py-0.5 rounded border border-[#E4D8FF]">
              0% EMI
            </span>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full mt-1 py-2 px-3 rounded-xl bg-[#F5F6FA] group-hover:bg-[#6C38FF] group-hover:text-white text-[#151928] text-xs font-bold transition-all flex items-center justify-center gap-1 border border-[#EAEFF6] group-hover:border-[#6C38FF] cursor-pointer">
          <span>View EMI Plans</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
