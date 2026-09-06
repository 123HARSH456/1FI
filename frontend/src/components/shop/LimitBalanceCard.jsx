import React from 'react';

export default function LimitBalanceCard({
  remainingLimit = 156091,
  utilizationPercentage = 46,
  onIncreaseLimit
}) {
  return (
    <div className="rounded-[28px] px-5 py-4 sm:px-6 sm:py-4.5 bg-gradient-to-br from-[#722EDC] to-[#5E22B9] text-white shadow-[0_10px_28px_rgba(114,46,220,0.3)] relative overflow-hidden">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10.5px] font-medium tracking-[0.22em] text-white/80 uppercase block">
            REMAINING LIMIT
          </span>
          <h2 className="font-display font-extrabold text-[28px] text-white tracking-tight leading-tight mt-0.5">
            ₹{remainingLimit.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs text-white/75 font-normal">
            Available to spend
          </p>
        </div>

        <button 
          onClick={onIncreaseLimit}
          className="px-4 py-2 rounded-full bg-white text-[#722EDC] font-bold text-xs shadow-sm hover:bg-purple-50 transition-all cursor-pointer whitespace-nowrap self-center"
        >
          Increase Limit
        </button>
      </div>

      {/* Bottom Progress Bar Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-white/70 tracking-[0.14em] uppercase text-[10px] font-bold">
            UTILIZED
          </span>
          <span className="text-white/90 text-xs font-bold">
            {utilizationPercentage}%
          </span>
        </div>
        <div className="w-full h-[6px] bg-white/20 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500" 
            style={{ width: `${utilizationPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
