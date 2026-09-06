import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import defaultOffers from '../../data/offers.json';

export default function OffersCarousel({ 
  offers = defaultOffers, 
  onSelectProduct 
}) {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !offers.length) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, offers.length]);

  if (!offers || offers.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center gap-1.5">
        <span className="w-[3px] h-3.5 bg-[#722EDC] rounded-full inline-block" />
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#722EDC]">
          OFFERS
        </span>
      </div>

      {/* Rotating Hero Card */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="relative rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(6,18,30,0.14)] select-none"
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentOfferIndex * 100}%)` }}
        >
          {offers.map((offer, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProduct && onSelectProduct(offer.slug)}
              className="w-full shrink-0 relative overflow-hidden cursor-pointer select-none min-h-[148px] sm:min-h-[156px] flex flex-col justify-center pl-6 pr-4 py-4 sm:pl-7 sm:py-4.5 bg-[#071322]"
            >
              {/* 1. TRUE FULL-BLEED BACKGROUND IMAGE */}
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{ 
                  objectPosition: offer.objectPosition || '82% center',
                  transform: offer.scale ? `scale(${offer.scale})` : 'scale(1.12)',
                  transformOrigin: 'right center'
                }}
              />

              {/* 2. LEFT-TO-RIGHT SUBTLE READABILITY GRADIENT */}
              {/* Darker on the left behind text, seamlessly fading to crystal clear on the right */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, rgba(6,15,26,0.95) 0%, rgba(6,15,26,0.85) 36%, rgba(6,15,26,0.38) 60%, rgba(6,15,26,0.06) 82%, rgba(6,15,26,0) 100%)'
                }}
              />

              {/* Top & bottom subtle vignette for polished edge blending */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(6,15,26,0.22) 0%, transparent 26%, transparent 74%, rgba(6,15,26,0.32) 100%)'
                }}
              />

              {/* 3. INTEGRATED TYPOGRAPHY & PRICING CTA */}
              <div className="max-w-[172px] sm:max-w-[192px] space-y-1 relative z-10">
                <span className={`text-[9.5px] sm:text-[10px] font-black uppercase tracking-[0.14em] ${offer.tagColor} block mb-1 drop-shadow-sm`}>
                  {offer.tag}
                </span>
                <h4 className="font-display font-bold text-[16px] sm:text-[17px] text-white leading-[1.22] tracking-tight drop-shadow-md">
                  {offer.title}
                </h4>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-[10.5px] sm:text-[11px] font-semibold text-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                    <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    <span>{offer.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators below the card */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {offers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentOfferIndex(idx)}
            className={`transition-all duration-300 cursor-pointer ${
              currentOfferIndex === idx
                ? 'w-5 h-1.5 rounded-full bg-[#722EDC]'
                : 'w-1.5 h-1.5 rounded-full bg-[#D1D5DB] hover:bg-[#9CA3AF]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
