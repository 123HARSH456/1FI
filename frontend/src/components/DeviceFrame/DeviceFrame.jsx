import React from 'react';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';
import './DeviceFrame.css';

export default function DeviceFrame({ children }) {
  return (
    <div className="device-frame-outer">
      {/* Ambient glow lighting behind desktop phone frame */}
      <div className="device-frame-ambient" aria-hidden="true" />

      {/* Realistic Smartphone Chassis (collapses to full screen on <= 640px) */}
      <div className="device-phone">
        
        {/* Screen Inner Surface */}
        <div className="device-screen">
          
          {/* Status Bar / Dynamic Island (Desktop only) */}
          <div className="device-status-bar" aria-hidden="true">
            <span className="font-bold text-[#151928] tracking-tight">9:41</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2">
              <div className="w-2 h-2 rounded-full bg-[#1A1A2E] mr-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2E2E48]" />
            </div>

            <div className="flex items-center gap-1.5 text-[#151928]">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Actual Application Content */}
          <div className="device-app-container">
            {children}
          </div>

          {/* Bottom Home Indicator Bar (Desktop only) */}
          <div className="device-home-bar" aria-hidden="true">
            <div className="device-home-pill" />
          </div>
        </div>
      </div>
    </div>
  );
}
