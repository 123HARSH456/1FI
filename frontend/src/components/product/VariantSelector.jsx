import React from 'react';
import { Layers } from 'lucide-react';

export default function VariantSelector({ variants = [], selectedVariant, onSelectVariant }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#6C38FF]" />
          <span>Select Variant</span>
        </span>
        <span className="text-[11px] text-[#6C38FF] font-bold">
          {variants.length} Options Available
        </span>
      </div>

      <div className="space-y-2.5">
        {variants.map((variant) => {
          const isSelected = selectedVariant?._id === variant._id;

          return (
            <div
              key={variant._id}
              onClick={() => onSelectVariant(variant)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-2 border-[#6C38FF] bg-[#F9F7FF] shadow-sm'
                  : 'card-white hover:border-[#D8C7FF]'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio selection circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-[#6C38FF]' : 'border-[#CBD2E1]'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6C38FF]"></div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#151928]">
                      {variant.storage}
                    </h4>
                    {variant.color && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#50576B] bg-[#F5F6FA] px-2 py-0.5 rounded-md border border-[#EAEFF6]">
                        {variant.color_code && (
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shrink-0"
                            style={{ backgroundColor: variant.color_code }}
                          />
                        )}
                        <span>{variant.color}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8C93A8] mt-0.5">
                    {variant.variant_name || `${variant.storage} · ${variant.color}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-extrabold text-sm text-[#151928] block">
                  ₹{variant.price?.toLocaleString('en-IN')}
                </span>
                {variant.mrp > variant.price && (
                  <span className="text-[10px] text-[#008C62] font-semibold">
                    Save ₹{(variant.mrp - variant.price)?.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
