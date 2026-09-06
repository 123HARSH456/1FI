import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Store,
  ArrowRight
} from 'lucide-react';
import VariantSelector from '../components/product/VariantSelector';
import EMIPlanSelector from '../components/product/EMIPlanSelector';
import ProductFeatures from '../components/product/ProductFeatures';
import CheckoutDrawer from '../components/product/CheckoutDrawer';
import { fetchProductBySlug, fetchVariantEmiPlans } from '../services/api';

export default function ProductDetailPage({ slug, onBack }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

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
          className="px-4 py-2 bg-[#6C38FF] text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          &larr; Back to Shop
        </button>
      </div>
    );
  }

  const emiPlans = selectedVariant?.emi_plans || [];

  return (
    <div className="flex-1 flex flex-col pb-28 animate-fadeIn bg-[#F5F6FA]">
      {/* Top sticky header */}
      <div className="sticky top-[53px] z-30 bg-[#F5F6FA]/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-[#EAEFF6]">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-bold text-[#151928] hover:text-[#6C38FF] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span>Pay using 1Fi</span>
        </button>

        {copiedToast && (
          <span className="text-[10px] font-bold text-[#008C62] bg-[#E6F9F3] px-2.5 py-1 rounded-full animate-fadeIn">
            Link Copied!
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Product Image hero card */}
        <div className="card-white rounded-3xl p-5 flex flex-col items-center justify-center relative shadow-onefi-subtle">
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#FAFBFD] text-[#151928] font-bold text-xs border border-[#EAEFF6] shadow-sm">
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

        {/* Title and Share */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="font-display font-black text-xl text-[#151928] tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#8C93A8] mt-0.5">
              {selectedVariant?.variant_name}
            </p>
          </div>

          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-[#F3EFFF] text-[#6C38FF] flex items-center justify-center hover:bg-[#EAE2FF] transition-colors cursor-pointer shrink-0"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Variant Selector */}
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onSelectVariant={handleVariantSelect}
        />

        {/* EMI Plans Selector */}
        <EMIPlanSelector
          emiPlans={emiPlans}
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
          variantPrice={selectedVariant?.price || 0}
        />

        {/* Product Overview & Features */}
        <ProductFeatures
          description={product.description}
          features={product.features}
        />

        {/* Merchant Partner Info */}
        <div className="space-y-1.5 px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8C93A8]">
            Fulfillment Partner
          </span>
          <div className="card-white rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F3EFFF] text-[#6C38FF] flex items-center justify-center font-bold text-xs">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#151928]">1Fi Verified Merchant</h4>
                <p className="text-[10px] text-[#8C93A8]">Direct Dispatch · Authorized Brand Partner</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#008C62] bg-[#E6F9F3] px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar with Selected EMI & CTA */}
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

      {/* Checkout Drawer Bottom Sheet */}
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
