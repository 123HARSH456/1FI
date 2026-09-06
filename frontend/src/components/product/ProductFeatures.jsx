import React from 'react';
import { Info, Check, ShieldCheck } from 'lucide-react';

export default function ProductFeatures({ description, features = [] }) {
  if (!description && (!features || features.length === 0)) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8] flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#722EDC]" />
          <span>Product Overview & Specifications</span>
        </span>
      </div>

      <div className="card-white rounded-3xl p-4 space-y-3 shadow-onefi-subtle">
        {description && (
          <p className="text-xs text-[#50576B] leading-relaxed">
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <div className="pt-2 border-t border-[#F0F2F8] space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C93A8] block">
              Key Highlights
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#151928]">
                  <div className="w-4 h-4 rounded-full bg-[#E6F9F3] text-[#008C62] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#F0F2F8] flex items-center gap-2 text-[11px] text-[#6A7389]">
          <ShieldCheck className="w-4 h-4 text-[#00C88C] shrink-0" />
          <span>100% Genuine Brand Warranty · Brand Direct Dispatch</span>
        </div>
      </div>
    </div>
  );
}
