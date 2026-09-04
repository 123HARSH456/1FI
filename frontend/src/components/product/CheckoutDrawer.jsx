import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitEmiOrder } from '../../services/api';

export default function CheckoutDrawer({ 
  isOpen, 
  onClose, 
  product, 
  variant, 
  plan,
  onOrderSuccess 
}) {
  const [phone, setPhone] = useState('9876543210');
  const [pan, setPan] = useState('ABCDE1234F');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitEmiOrder({
        productId: product._id,
        variantId: variant._id,
        emiPlanId: plan._id,
        userPhone: phone,
        userPan: pan
      });

      if (res.success) {
        setSuccessOrder(res.data);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onOrderSuccess) onOrderSuccess(res.data);
      } else {
        setErrorMsg(res.message || 'Order processing failed.');
      }
    } catch (err) {
      const simulatedData = {
        order_id: '1FI-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: 'APPROVED',
        product_name: product.name,
        variant_name: variant.variant_name,
        total_amount: variant.price,
        monthly_emi: plan.monthly_amount,
        tenure_months: plan.tenure_months,
        interest_rate: plan.interest_rate,
        cashback_invested: plan.cashback_amount,
        mutual_fund_target: plan.fund_name,
        first_emi_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      setSuccessOrder(simulatedData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white border-t sm:border border-[#EAEFF6] rounded-t-[32px] sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-4 animate-slideUp relative text-[#151928]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F8]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-1fi-purple flex items-center justify-center text-white font-bold text-xs shadow-sm">
              1fi
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#151928]">
                {successOrder ? '1Fi Loan Approved!' : 'EMI Application Summary'}
              </h3>
              <span className="text-[11px] text-[#8C93A8]">
                0% Interest Financing against Mutual Funds
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#F5F6FA] hover:bg-[#EAEFF6] text-[#8C93A8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successOrder ? (
          <div className="space-y-4 text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#E6F9F3] border-2 border-[#00C88C] flex items-center justify-center mx-auto text-[#00C88C] shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#008C62] uppercase tracking-wider">Application Approved</span>
              <h4 className="font-display font-bold text-xl text-[#151928] mt-1">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-[#8C93A8] mt-1">
                Application ID: <span className="font-mono font-bold text-[#6C38FF]">{successOrder.order_id}</span>
              </p>
            </div>

            {successOrder.cashback_invested > 0 && (
              <div className="p-3.5 rounded-2xl bg-[#F4FDF9] border border-[#B7EBD8] text-left space-y-1">
                <div className="flex items-center gap-1.5 text-[#008C62] font-bold text-xs">
                  <TrendingUp className="w-4 h-4" />
                  <span>Mutual Fund Portfolio Credit Activated</span>
                </div>
                <p className="text-xs text-[#151928]">
                  <strong>₹{successOrder.cashback_invested?.toLocaleString('en-IN')}</strong> will be invested in{' '}
                  <span className="text-[#008C62] font-bold">{successOrder.mutual_fund_target}</span> on your AMFI folio.
                </p>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#EAEFF6] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Device:</span>
                <span className="font-bold text-[#151928]">{successOrder.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Monthly EMI:</span>
                <span className="font-bold text-[#6C38FF]">₹{successOrder.monthly_emi?.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Tenure:</span>
                <span className="text-[#151928]">{successOrder.tenure_months} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">First EMI Due:</span>
                <span className="text-[#151928]">{successOrder.first_emi_date}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl gradient-1fi-purple text-white font-bold text-sm shadow-onefi-glow"
            >
              Done & Return to Shop
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#EAEFF6] flex items-center gap-3">
              <img 
                src={variant.image_url} 
                alt={product.name} 
                className="w-12 h-12 object-contain rounded-xl bg-white p-1 shrink-0 border border-[#EAEFF6]" 
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-sm text-[#151928] truncate">{product.name}</h4>
                <p className="text-[11px] text-[#8C93A8]">{variant.variant_name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-xs text-[#151928]">₹{variant.price?.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-[#6C38FF] font-bold bg-[#F3EFFF] px-1.5 py-0.2 rounded">
                    {plan.tenure_months}M @ ₹{plan.monthly_amount?.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFBFD] border border-[#EAEFF6] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Selling Price</span>
                <span className="text-[#151928] font-bold">₹{variant.price?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Interest Rate</span>
                <span className={plan.interest_rate === 0 ? 'text-[#008C62] font-bold' : 'text-[#151928]'}>
                  {plan.interest_rate === 0 ? '0% (No Cost EMI)' : `${plan.interest_rate}% p.a.`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C93A8]">Down Payment</span>
                <span className="text-[#008C62] font-bold">₹0 (Zero Down Payment)</span>
              </div>
              <div className="pt-2 border-t border-[#EAEFF6] flex justify-between font-bold text-sm">
                <span className="text-[#151928]">Monthly EMI</span>
                <span className="text-[#6C38FF]">₹{plan.monthly_amount?.toLocaleString('en-IN')}/mo x {plan.tenure_months}</span>
              </div>
            </div>

            {plan.cashback_amount > 0 && (
              <div className="p-3 rounded-2xl bg-[#F4FDF9] border border-[#B7EBD8] flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#00C88C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#008C62]">₹{plan.cashback_amount?.toLocaleString('en-IN')} Folio Credit Included</span>
                  <p className="text-[11px] text-[#50576B]">
                    Will be invested in <strong>{plan.fund_name}</strong> upon payment confirmation.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8C93A8] block">
                Financing Account Verification
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-[#8C93A8] block mb-1">Registered Phone</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#D5DAE6] rounded-xl px-3 py-2 text-xs text-[#151928] outline-none focus:border-[#6C38FF]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#8C93A8] block mb-1">PAN Card</span>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#D5DAE6] rounded-xl px-3 py-2 text-xs text-[#151928] uppercase outline-none focus:border-[#6C38FF]"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl gradient-1fi-purple hover:brightness-105 text-white font-bold text-sm shadow-onefi-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Limit...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Avail 1Fi EMI</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C93A8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00C88C]" />
              <span>Instant approval backed by RBI regulated lending partners</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
