import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Edit3, 
  ChevronUp, 
  ChevronDown, 
  TrendingUp, 
  Store,
  ArrowRight
} from 'lucide-react';
import CheckoutDrawer from '../components/product/CheckoutDrawer';
import { fetchProductBySlug, fetchVariantEmiPlans } from '../services/api';

export default function ProductDetailPage({ slug, onBack }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlans, setShowPlans] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          className="px-4 py-2 bg-[#6C38FF] text-white rounded-xl text-xs font-bold"
        >
          &larr; Back to Shop
        </button>
      </div>
    );
  }

  const emiPlans = selectedVariant?.emi_plans || [];
  const lowestEmi = emiPlans.length > 0 
    ? Math.min(...emiPlans.map(p => p.monthly_amount))
    : (selectedVariant?.price || 0) / 6;

  return (
    <div className="flex-1 flex flex-col pb-28 animate-fadeIn bg-[#F5F6FA]">
      <div className="sticky top-[53px] z-30 bg-[#F5F6FA]/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-[#EAEFF6]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-bold text-[#151928] hover:text-[#6C38FF] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Pay using 1Fi</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="card-white rounded-3xl p-5 flex flex-col items-center justify-center relative shadow-onefi-subtle">
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#FAFBFD] text-[#151928] font-bold text-xs border border-[#EAEFF6] shadow-xs">
              {product.brand}
            </span>
          </div>

          <div className="w-full h-52 flex items-center justify-center my-2">
            <img
              src={selectedVariant?.image_url}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <h1 className="font-display font-black text-xl text-[#151928] tracking-tight">
            {product.name}
          </h1>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="w-9 h-9 rounded-full bg-[#F3EFFF] text-[#6C38FF] flex items-center justify-center hover:bg-[#EAE2FF] transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">
              Select Your Variant
            </span>
            <ChevronUp className="w-4 h-4 text-[#8C93A8]" />
          </div>

          <div className="space-y-2.5">
            {product.variants.map((variant) => {
              const isSelected = selectedVariant?._id === variant._id;

              return (
                <div
                  key={variant._id}
                  onClick={() => handleVariantSelect(variant)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-2 border-[#6C38FF] bg-[#F9F7FF] shadow-xs'
                      : 'card-white hover:border-[#D8C7FF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#6C38FF]' : 'border-[#CBD2E1]'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#6C38FF]"></div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#151928]">
                        2026 · {variant.storage}
                      </h4>
                      <p className="text-xs text-[#8C93A8]">
                        {product.name} {variant.storage} ({variant.color})
                      </p>
                    </div>
                  </div>

                  <span className="font-display font-extrabold text-sm text-[#151928]">
                    ₹{variant.price?.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">
              Suggested Amount
            </span>
            <span className="text-[10px] text-[#8C93A8]">
              Edit if paying different amount
            </span>
          </div>

          <div className="card-white rounded-3xl p-4 space-y-3 shadow-onefi-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-2xl text-[#151928]">
                  ₹ {selectedVariant?.price?.toLocaleString('en-IN')}
                </span>
              </div>
              <button className="text-[#8C93A8] hover:text-[#6C38FF]">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 border-t border-[#F0F2F8] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8C93A8]">
                Starts at <strong className="text-[#151928] font-bold">₹{lowestEmi?.toLocaleString('en-IN')}/mo</strong>
              </span>

              <button
                onClick={() => setShowPlans(!showPlans)}
                className="text-xs font-bold text-[#6C38FF] flex items-center gap-0.5 hover:underline"
              >
                <span>{showPlans ? 'Hide plans' : 'Show plans'}</span>
                {showPlans ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showPlans && (
              <div className="space-y-2 pt-2 border-t border-[#F0F2F8]">
                {emiPlans.map((plan) => {
                  const isSelected = selectedPlan?._id === plan._id;

                  return (
                    <div
                      key={plan._id || plan.tenure_months}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-[#F3EFFF] border border-[#6C38FF]'
                          : 'bg-[#FAFBFD] border border-[#EAEFF6] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#6C38FF]' : 'text-[#151928]'}`}>
                            {plan.tenure_months} months · {plan.interest_rate === 0 ? '0% No-Cost' : `${plan.interest_rate}% p.a.`}
                          </span>
                          {plan.is_recommended && (
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-[#FFB800] text-black rounded">
                              Recommended
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-bold text-[#151928]">
                          ₹{plan.monthly_amount?.toLocaleString('en-IN')} <span className="text-[10px] text-[#8C93A8]">/mo</span>
                        </span>
                      </div>

                      {plan.cashback_amount > 0 && (
                        <div className="flex items-center justify-between text-[10px] text-[#008C62] font-semibold bg-white/80 px-2 py-1 rounded-lg border border-[#B7EBD8]">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-[#00C88C]" />
                            <span>+₹{plan.cashback_amount?.toLocaleString('en-IN')} invested in {plan.fund_name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1.5 px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">
            Paying To
          </span>
          <div className="card-white rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F3EFFF] text-[#6C38FF] flex items-center justify-center font-bold text-xs">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#151928]">1Fi Marketplace Partner</h4>
                <p className="text-[10px] text-[#8C93A8]">Verified Merchant · Indiranagar Store</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#008C62] bg-[#E6F9F3] px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EAEFF6] px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-[#8C93A8] uppercase tracking-wider block">
              {selectedPlan ? `${selectedPlan.tenure_months}M EMI Plan` : 'Selected Price'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-xl text-[#6C38FF]">
                ₹{selectedPlan?.monthly_amount?.toLocaleString('en-IN') || selectedVariant?.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#8C93A8]">/mo</span>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex-1 max-w-[220px] py-3.5 px-4 rounded-2xl gradient-1fi-purple hover:brightness-110 text-white font-display font-extrabold text-sm shadow-onefi-glow flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Proceed to Pay</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {selectedVariant && selectedPlan && (
        <CheckoutDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          product={product}
          variant={selectedVariant}
          plan={selectedPlan}
          onOrderSuccess={(order) => {
            console.log('Order confirmed:', order.order_id);
          }}
        />
      )}
    </div>
  );
}
