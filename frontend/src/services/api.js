import productsData from '../data/products.json';

// Option to switch to an external REST backend in the future:
const USE_EXTERNAL_API = import.meta.env.VITE_USE_API === 'true';
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Format raw product into catalog-ready shape with computed EMI and Cashback values
 */
const formatProductSummary = (product) => {
  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];

  let minEmi = null;
  let maxCashback = 0;
  let recommendedPlan = null;

  if (defaultVariant?.emi_plans?.length) {
    defaultVariant.emi_plans.forEach(plan => {
      if (minEmi === null || plan.monthly_amount < minEmi) {
        minEmi = plan.monthly_amount;
      }
      if (plan.cashback_amount > maxCashback) {
        maxCashback = plan.cashback_amount;
      }
      if (plan.is_recommended) {
        recommendedPlan = plan;
      }
    });
  }

  return {
    _id: product._id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    badge: product.badge,
    rating: product.rating,
    review_count: product.review_count,
    description: product.description,
    total_variants: product.variants?.length || 0,
    default_variant: defaultVariant ? {
      _id: defaultVariant._id,
      variant_name: defaultVariant.variant_name,
      storage: defaultVariant.storage,
      color: defaultVariant.color,
      color_code: defaultVariant.color_code,
      mrp: defaultVariant.mrp,
      price: defaultVariant.price,
      image_url: defaultVariant.image_url,
      stock: defaultVariant.stock
    } : null,
    min_monthly_emi: minEmi,
    max_mf_cashback: maxCashback,
    recommended_plan: recommendedPlan,
    viewer: product.viewer || null,
    available_colors: [...new Set((product.variants || []).map(v => v.color))],
    available_storages: [...new Set((product.variants || []).map(v => v.storage))]
  };
};

/**
 * Fetch all products with filtering support
 */
export const fetchProducts = async (params = {}) => {
  if (USE_EXTERNAL_API) {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== 'All') query.append('category', params.category);
      if (params.brand && params.brand !== 'All') query.append('brand', params.brand);
      if (params.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn('Backend API request failed, falling back to JSON catalog:', error.message);
    }
  }

  // Pure JSON data filtering
  let filtered = [...productsData];

  if (params.category && params.category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
  }

  if (params.brand && params.brand !== 'All') {
    filtered = filtered.filter(p => p.brand.toLowerCase() === params.brand.toLowerCase());
  }

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.variants && p.variants.some(v => 
        (v.variant_name && v.variant_name.toLowerCase().includes(q)) ||
        (v.storage && v.storage.toLowerCase().includes(q)) ||
        (v.color && v.color.toLowerCase().includes(q))
      ))
    );
  }

  return filtered.map(formatProductSummary);
};

/**
 * Fetch complete product details by product slug
 */
export const fetchProductBySlug = async (slug) => {
  if (USE_EXTERNAL_API) {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.warn(`Backend API request for ${slug} failed, falling back to JSON:`, error.message);
    }
  }

  const product = productsData.find(p => p.slug === slug);
  if (!product) {
    throw new Error(`Product '${slug}' not found`);
  }
  return product;
};

/**
 * Fetch EMI plans for a specific variant
 */
export const fetchVariantEmiPlans = async (variantId) => {
  if (USE_EXTERNAL_API) {
    try {
      const res = await fetch(`${API_BASE}/variants/${variantId}/emi-plans`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn(`Backend API request for variant ${variantId} failed, falling back to JSON:`, error.message);
    }
  }

  for (const prod of productsData) {
    const variant = prod.variants?.find(v => v._id === variantId);
    if (variant) {
      return {
        success: true,
        variant_id: variant._id,
        variant_name: variant.variant_name,
        price: variant.price,
        mrp: variant.mrp,
        emi_plans: variant.emi_plans || []
      };
    }
  }

  throw new Error(`Variant '${variantId}' not found`);
};

/**
 * Submit checkout order and return instant approval response
 */
export const submitEmiOrder = async (payload) => {
  if (USE_EXTERNAL_API) {
    try {
      const res = await fetch(`${API_BASE}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (error) {
      console.warn('Backend checkout failed, processing with JSON order store:', error.message);
    }
  }

  // Simulate local checkout approval and persist to localStorage
  const product = productsData.find(p => p._id === payload.productId);
  const variant = product?.variants?.find(v => v._id === payload.variantId);
  const plan = variant?.emi_plans?.find(e => e._id === payload.emiPlanId);

  const orderId = '1FI-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderData = {
    order_id: orderId,
    status: 'APPROVED',
    product_name: product?.name || 'Flagship Smartphone',
    variant_name: variant?.variant_name || 'Selected Variant',
    total_amount: variant?.price || 129900,
    monthly_emi: plan?.monthly_amount || 21650,
    tenure_months: plan?.tenure_months || 6,
    interest_rate: plan?.interest_rate || 0,
    cashback_invested: plan?.cashback_amount || 3500,
    mutual_fund_target: plan?.fund_name || 'Parag Parikh Flexi Cap Fund',
    user_phone: payload.userPhone,
    user_pan: payload.userPan,
    first_emi_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    created_at: new Date().toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('1fi_orders') || '[]');
    existing.push(orderData);
    localStorage.setItem('1fi_orders', JSON.stringify(existing));
  } catch (err) {
    // ignore in environments without localStorage
  }

  return {
    success: true,
    message: 'EMI Application and Mutual Fund cashback initialized successfully',
    data: orderData
  };
};
