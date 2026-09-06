import React, { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function EMIPlanSelector({ 
  emiPlans = [], 
  selectedPlan, 
  onSelectPlan, 
  variantPrice = 0 
}) {
  const [showPlans, setShowPlans] = useState(true);

  const lowestEmi = emiPlans.length > 0 
    ? Math.min(...emiPlans.map(p => p.monthly_amount))
    : Math.round(variantPrice / 6);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#6C38FF]" />
          <span>Flexible Financing & EMI</span>
        </span>
        <span className="text-[10px] text-[#008C62] font-bold bg-[#E6F9F3] px-2 py-0.5 rounded-full">
          0% Interest Available
        </span>
      </div>

      <div className="card-white rounded-3xl p-4 space-y-3 shadow-onefi-subtle">
        {/* Header summary */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C93A8] uppercase tracking-wider block">
              Device Selling Price
            </span>
            <span className="font-display font-black text-2xl text-[#151928]">
              ₹{variantPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {selectedPlan && (
            <div className="text-right">
              <span className="text-[10px] text-[#8C93A8] block">Selected Tenure</span>
              <span className="text-xs font-bold text-[#6C38FF] bg-[#F3EFFF] px-2 py-1 rounded-lg border border-[#E4D8FF] inline-block">
                {selectedPlan.tenure_months} Months
              </span>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[#F0F2F8] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#8C93A8]">
            Starts at <strong className="text-[#151928] font-bold">₹{lowestEmi.toLocaleString('en-IN')}/mo</strong>
          </span>

          <button
            onClick={() => setShowPlans(!showPlans)}
            className="text-xs font-bold text-[#6C38FF] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>{showPlans ? 'Hide all plans' : 'View all plans'}</span>
            {showPlans ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable EMI list */}
        {showPlans && (
          <div className="space-y-2 pt-2 border-t border-[#F0F2F8] animate-fadeIn">
            {emiPlans.map((plan) => {
              const isSelected = selectedPlan?._id === plan._id || 
                (selectedPlan?.tenure_months === plan.tenure_months && selectedPlan?.monthly_amount === plan.monthly_amount);

              return (
                <div
                  key={plan._id || `${plan.tenure_months}-${plan.monthly_amount}`}
                  onClick={() => onSelectPlan(plan)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-[#F3EFFF] border-2 border-[#6C38FF] shadow-sm'
                      : 'bg-[#FAFBFD] border border-[#EAEFF6] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#6C38FF] bg-[#6C38FF]' : 'border-[#CBD2E1]'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>

                      <span className={`text-xs font-bold ${isSelected ? 'text-[#6C38FF]' : 'text-[#151928]'}`}>
                        {plan.tenure_months} Months · {plan.interest_rate === 0 ? '0% No-Cost EMI' : `${plan.interest_rate}% p.a.`}
                      </span>

                      {plan.is_recommended && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[#FFB800] text-black rounded-md shadow-xs">
                          1Fi Pick
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="font-display font-extrabold text-sm text-[#151928]">
                        ₹{plan.monthly_amount?.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#8C93A8] ml-0.5">/mo</span>
                    </div>
                  </div>

                  {/* Mutual fund benefit callout */}
                  {plan.cashback_amount > 0 && (
                    <div className="flex items-center justify-between text-[11px] text-[#008C62] font-semibold bg-white/90 px-2.5 py-1.5 rounded-xl border border-[#B7EBD8]">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#00C88C] shrink-0" />
                        <span>
                          +₹{plan.cashback_amount?.toLocaleString('en-IN')} invested in{' '}
                          <strong className="text-[#008C62]">{plan.fund_name}</strong>
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-[#6C38FF] bg-[#F3EFFF] px-1.5 py-0.5 rounded border border-[#E4D8FF] shrink-0">
                        Direct Folio
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
