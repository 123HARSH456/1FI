import React from 'react';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

export default function MobileFrame({ children, viewMode }) {
  if (viewMode === 'full') {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex flex-col justify-between max-w-5xl mx-auto shadow-xl border-x border-[#E2E8F0]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4A15BE] py-3 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center font-sans">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6C38FF]/25 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Realistic Mobile Frame */}
      <div className="w-full max-w-[420px] bg-black rounded-[48px] p-3 border-[4px] border-[#1E1E24] shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_50px_rgba(108,56,255,0.4)] overflow-hidden flex flex-col relative">
        
        {/* Phone Shell Inner */}
        <div className="rounded-[38px] overflow-hidden flex-1 flex flex-col bg-[#F5F6FA] max-h-[860px] relative">
          
          {/* Dynamic Island / Punch Hole */}
          <div className="bg-transparent px-6 pt-3 pb-1 flex items-center justify-between text-xs select-none z-50">
            <span className="font-bold text-[#151928] tracking-tight">9:41</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2">
              <div className="w-2 h-2 rounded-full bg-[#1A1A2E] mr-1.5"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#2E2E48]"></div>
            </div>

            <div className="flex items-center gap-1.5 text-[#151928]">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* App Scrollable Content */}
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
            {children}
          </div>

          {/* iOS / Android Home Indicator Bar */}
          <div className="bg-[#F5F6FA] py-1.5 flex justify-center items-center z-50">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-purple-200/90 text-center flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-purple-300" />
        <span>1Fi Android App &bull; Faithful UI</span>
      </p>
    </div>
  );
}
