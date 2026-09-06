import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  ChevronUp, 
  ChevronDown, 
  Pencil, 
  ArrowRight,
  Store
} from 'lucide-react';
import CheckoutDrawer from '../components/product/CheckoutDrawer';
import ProductViewer from '../components/ProductViewer/ProductViewer';
import { fetchProductBySlug, fetchVariantEmiPlans } from '../services/api';

export default function ProductDetailPage({ slug, onBack }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [showVariants, setShowVariants] = useState(true);
  const [showPlans, setShowPlans] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductBySlug(slug);
        if (data) {
          setProduct(data);
          const defaultVar = data.variants.find(v => v.is_default) || data.variants[0];
          setSelectedVariant(defaultVar);

          if (defaultVar?.emi_plans?.length) {
            const recommended = defaultVar.emi_plans.find(p => p.is_recommended) || defaultVar.emi_plans[0];
            setSelectedPlan(recommended);
          }
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadDetail();
    }
  }, [slug]);

  const handleVariantSelect = async (variant) => {
    setSelectedVariant(variant);

    if (variant?.emi_plans?.length) {
      const rec = variant.emi_plans.find(p => p.is_recommended) || variant.emi_plans[0];
      setSelectedPlan(rec);
    } else {
      try {
        const res = await fetchVariantEmiPlans(variant._id);
        if (res?.emi_plans?.length) {
          const rec = res.emi_plans.find(p => p.is_recommended) || res.emi_plans[0];
          setSelectedPlan(rec);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product?.name || '1Fi Marketplace', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded"></div>
        <div className="h-64 bg-white rounded-3xl"></div>
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="h-28 bg-white rounded-2xl"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center space-y-3">
        <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-semibold">
          {error || 'Product not found'}
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#722EDC] text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          &larr; Back to Shop
        </button>
      </div>
    );
  }

  const emiPlans = selectedVariant?.emi_plans || [];
  const lowestEmi = emiPlans.length > 0 
    ? Math.min(...emiPlans.map(p => p.monthly_amount))
    : Math.round((selectedVariant?.price || 0) / 6);

  const displayTitle = product.name.replace(/^Apple\s+/i, '');

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#F5F6FA] select-none">
      {/* 1. Top Header: Pay using 1Fi */}
      <div className="bg-[#F5F6FA] px-4 py-3 flex items-center justify-between border-b border-[#EAEFF6]/80 shrink-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[#151928] hover:text-[#722EDC] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[15px] font-bold">Pay using 1Fi</span>
        </button>

        {copiedToast && (
          <span className="text-[10px] font-bold text-[#008C62] bg-[#E6F9F3] px-2.5 py-1 rounded-full animate-fadeIn">
            Link Copied!
          </span>
        )}
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {/* Product Image hero card with top-left brand pill */}
        <div className="bg-white rounded-[24px] p-5 flex flex-col items-center justify-center relative border border-[#EAEFF6] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#151928] font-bold text-xs border border-[#EAEFF6] shadow-sm">
              {product.brand}
            </span>
          </div>

          <div className="w-full h-[268px] sm:h-[285px] flex items-center justify-center my-1 bg-transparent overflow-hidden">
            <ProductViewer
              staticImage={selectedVariant?.image_url ? `${selectedVariant.image_url}?v=2` : ''}
              alt={product.name}
              viewer={selectedVariant?.viewer || product.viewer}
              zoom={selectedVariant?.viewer?.zoom || product.viewer?.zoom || 1.15}
              hintText="Swipe to rotate 360°"
            />
          </div>
        </div>

        {/* Product Title and Top Share Button */}
        <div className="flex items-center justify-between px-1">
          <h1 className="font-display font-extrabold text-[22px] text-[#151928] tracking-tight">
            {displayTitle}
          </h1>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full border border-[#EAEFF6] bg-white flex items-center justify-center text-[#722EDC] shadow-sm hover:border-[#D4B8FF] transition-all cursor-pointer shrink-0"
            title="Share"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4 text-[#722EDC]" />
          </button>
        </div>

        {/* SELECT YOUR VARIANT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-[#8C93A8] uppercase tracking-wider">
              SELECT YOUR VARIANT
            </span>
            <button
              onClick={() => setShowVariants(!showVariants)}
              className="text-[#8C93A8] hover:text-[#151928] transition-colors cursor-pointer p-0.5"
              aria-label="Toggle variants"
            >
              {showVariants ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showVariants && (
            <div className="space-y-2">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?._id === variant._id;
                return (
                  <div
                    key={variant._id}
                    onClick={() => handleVariantSelect(variant)}
                    className={`p-3.5 rounded-[18px] cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[1.5px] border-[#722EDC] bg-[#FBF9FF]'
                        : 'border border-[#EAEFF6] bg-white hover:border-[#D4B8FF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'border-[#722EDC]' : 'border-[#D5DAE6]'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#722EDC]"></div>}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#151928] leading-tight">
                          {variant.storage || variant.variant_name}
                        </h4>
                        {isSelected && variant.variant_name && (
                          <p className="text-xs text-[#8C93A8] mt-0.5 leading-tight">
                            {variant.variant_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-extrabold text-sm sm:text-base text-[#151928]">
                        ₹{variant.price?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SUGGESTED AMOUNT */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-[#8C93A8] uppercase tracking-wider">
              SUGGESTED AMOUNT
            </span>
            <span className="text-[11px] text-[#8C93A8]">
              Edit if paying different amount
            </span>
          </div>

          <div className="bg-white rounded-[20px] p-4 border border-[#EAEFF6] shadow-[0_4px_18px_-2px_rgba(21,25,40,0.03)] space-y-3">
            {/* Amount & Pencil icon */}
            <div className="flex items-center justify-between">
              <span className="font-display font-extrabold text-[24px] text-[#151928] tracking-tight">
                ₹ {selectedVariant?.price?.toLocaleString('en-IN')}
              </span>
              <button
                className="p-1 text-[#8C93A8] hover:text-[#722EDC] transition-colors cursor-pointer"
                title="Edit amount"
                aria-label="Edit amount"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            {/* Starts at & Expandable plans dropdown */}
            <div className="pt-3 border-t border-[#F0F2F8]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8C93A8]">
                  Starts at <strong className="text-[#151928] font-bold">₹{lowestEmi.toLocaleString('en-IN')}/mo</strong>
                </span>

                <button
                  onClick={() => setShowPlans(!showPlans)}
                  className="text-xs font-bold text-[#722EDC] flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <span>{showPlans ? 'Hide plans' : 'View plans'}</span>
                  {showPlans ? <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              </div>

              {showPlans && (
                <div className="space-y-2.5 pt-3 mt-2 border-t border-[#F0F2F8]">
                  {emiPlans.map((plan, idx) => {
                    const isSelected = selectedPlan?._id === plan._id || 
                      (selectedPlan?.tenure_months === plan.tenure_months && selectedPlan?.monthly_amount === plan.monthly_amount);

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedPlan(plan)}
                        className={`flex items-center justify-between py-1 px-1 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#FBF9FF]' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className={`text-xs ${isSelected ? 'font-semibold text-[#722EDC]' : 'text-[#6A7389]'}`}>
                          {plan.tenure_months} months · {plan.interest_rate > 0 ? `${plan.interest_rate}% p.a.` : '10% p.a.'}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#151928]">
                          ₹{plan.monthly_amount?.toLocaleString('en-IN')}{' '}
                          <span className="text-[11px] text-[#8C93A8] font-normal">/mo</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAYING TO */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#8C93A8] uppercase tracking-wider px-1 block">
            PAYING TO
          </span>

          <div className="bg-white rounded-2xl p-3 border border-[#EAEFF6] shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#EAEFF6] shadow-sm flex items-center justify-center p-2 shrink-0">
              {product.brand === 'Apple' ? (
                <span className="text-2xl font-bold text-black select-none"></span>
              ) : product.brand === 'Samsung' ? (
                <span className="text-[10px] font-extrabold text-black">SAMSUNG</span>
              ) : (
                <Store className="w-5 h-5 text-[#722EDC]" />
              )}
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#151928]">
                {product.brand === 'Apple' ? 'Apple Store' : `${product.brand} Store`}
              </h4>
              <p className="text-[10px] sm:text-[10.5px] text-[#8C93A8] leading-tight line-clamp-2 mt-0.5">
                GOOD EARTH CITY CENTER, GF-31, Pocket H, Nirvana, Sector 50, Gurugram, Fatehpur, Haryana 122018, Gudgaon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sticky Action Bar */}
      <div className="bg-[#F5F6FA]/95 backdrop-blur-md border-t border-[#EAEFF6] p-4 flex items-center gap-3 shrink-0 z-20">
        <button
          onClick={handleShare}
          className="w-12 h-12 rounded-full border border-[#D4B8FF] bg-white flex items-center justify-center text-[#722EDC] shadow-sm hover:bg-[#FBF9FF] transition-all cursor-pointer shrink-0"
          title="Share"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5 text-[#722EDC]" />
        </button>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex-1 h-12 rounded-full bg-[#722EDC] hover:bg-[#5F24BD] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-onefi-glow cursor-pointer transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Checkout Drawer for Payment Confirmation */}
      {selectedVariant && selectedPlan && (
        <CheckoutDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          product={product}
          variant={selectedVariant}
          plan={selectedPlan}
          onOrderSuccess={(order) => {
            // Handled in drawer with confetti
          }}
        />
      )}
    </div>
  );
}
