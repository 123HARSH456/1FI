import React from 'react';
import { Bell, QrCode } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F6FA] px-4 py-2.5 shrink-0 border-b border-[#EAEFF6]/60">
      <div className="flex items-center justify-between">
        {/* 1Fi Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-1fi-purple flex items-center justify-center shadow-onefi-glow">
            <span className="font-display font-extrabold text-white text-base tracking-tight">1fi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-base text-[#151928] tracking-tight">1Fi</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F4EEFF] text-[#722EDC] border border-[#D4B8FF]">
              PAY
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Scan QR */}
          <button 
            className="p-2 rounded-xl bg-white border border-[#EAEFF6] text-[#60677C] hover:text-[#151928] transition-colors cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            title="Scan QR"
            aria-label="Scan QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button 
            className="relative p-2 rounded-xl bg-white border border-[#EAEFF6] text-[#60677C] hover:text-[#151928] transition-colors cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#722EDC]"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
