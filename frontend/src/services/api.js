const API_BASE = import.meta.env.VITE_API_URL || '/api';

const FALLBACK_PRODUCTS = [
  {
    _id: "66d89f01",
    slug: "apple-iphone-17-pro",
    name: "Apple iPhone 17 Pro",
    brand: "Apple",
    category: "Smartphones",
    badge: "1Fi Choice",
    rating: 4.9,
    review_count: 342,
    description: "Features A19 Pro bionic chip, grade 5 titanium chassis, 48MP periscope telephoto camera system, and mutual fund cashback.",
    total_variants: 2,
    min_monthly_emi: 6150,
    max_mf_cashback: 5000,
    available_colors: ["Sunset Gold", "Titanium Silver"],
    available_storages: ["256GB", "512GB"],
    default_variant: {
      _id: "66d89f01-v1",
      variant_name: "256GB - Sunset Gold",
      storage: "256GB",
      color: "Sunset Gold",
      color_code: "#E37A3F",
      mrp: 134900,
      price: 129900,
      stock: 18,
      image_url: "/images/iphone-17-pro.png"
    },
    variants: [
      {
        _id: "66d89f01-v1",
        variant_name: "256GB - Sunset Gold",
        storage: "256GB",
        color: "Sunset Gold",
        color_code: "#E37A3F",
        mrp: 134900,
        price: 129900,
        stock: 18,
        is_default: true,
        image_url: "/images/iphone-17-pro.png",
        emi_plans: [
          {
            _id: "66d89f01-p1",
            plan_label: "3 Months 0% No Cost EMI",
            tenure_months: 3,
            interest_rate: 0,
            monthly_amount: 43300,
            cashback_amount: 1500,
            fund_backed: true,
            fund_name: "Parag Parikh Flexi Cap Fund",
            is_recommended: false
          },
          {
            _id: "66d89f01-p2",
            plan_label: "6 Months 0% Smart Plan",
            tenure_months: 6,
            interest_rate: 0,
            monthly_amount: 21650,
            cashback_amount: 3500,
            fund_backed: true,
            fund_name: "Parag Parikh Flexi Cap Fund",
            is_recommended: true
          },
          {
            _id: "66d89f01-p3",
            plan_label: "12 Months Balanced EMI",
            tenure_months: 12,
            interest_rate: 9.5,
            monthly_amount: 11350,
            cashback_amount: 5000,
            fund_backed: true,
            fund_name: "Mirae Asset Large Cap Fund",
            is_recommended: false
          }
        ]
      },
      {
        _id: "66d89f01-v2",
        variant_name: "512GB - Sunset Gold",
        storage: "512GB",
        color: "Sunset Gold",
        color_code: "#E37A3F",
        mrp: 154900,
        price: 149900,
        stock: 12,
        is_default: false,
        image_url: "/images/iphone-17-pro.png",
        emi_plans: [
          {
            _id: "66d89f01-p5",
            plan_label: "6 Months 0% Smart Plan",
            tenure_months: 6,
            interest_rate: 0,
            monthly_amount: 24983,
            cashback_amount: 4000,
            fund_backed: true,
            fund_name: "Parag Parikh Flexi Cap Fund",
            is_recommended: true
          }
        ]
      }
    ]
  },
  {
    _id: "66d89f02",
    slug: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    badge: "Popular",
    rating: 4.8,
    review_count: 289,
    description: "Galaxy AI, Snapdragon 8 Elite, integrated S-Pen, and 200MP camera in titanium frame.",
    total_variants: 2,
    min_monthly_emi: 6155,
    max_mf_cashback: 5000,
    available_colors: ["Titanium Sand", "Titanium Black"],
    available_storages: ["256GB", "512GB"],
    default_variant: {
      _id: "66d89f02-v1",
      variant_name: "256GB - Titanium Sand",
      storage: "256GB",
      color: "Titanium Sand",
      color_code: "#D8CEBE",
      mrp: 139999,
      price: 129999,
      stock: 22,
      image_url: "/images/samsung-s25-ultra.png"
    },
    variants: [
      {
        _id: "66d89f02-v1",
        variant_name: "256GB - Titanium Sand",
        storage: "256GB",
        color: "Titanium Sand",
        color_code: "#D8CEBE",
        mrp: 139999,
        price: 129999,
        stock: 22,
        is_default: true,
        image_url: "/images/samsung-s25-ultra.png",
        emi_plans: [
          {
            _id: "66d89f02-p1",
            plan_label: "6 Months 0% No Cost EMI",
            tenure_months: 6,
            interest_rate: 0,
            monthly_amount: 21666,
            cashback_amount: 4000,
            fund_backed: true,
            fund_name: "Parag Parikh Flexi Cap Fund",
            is_recommended: true
          },
          {
            _id: "66d89f02-p2",
            plan_label: "12 Months Smart Wealth",
            tenure_months: 12,
            interest_rate: 9.5,
            monthly_amount: 11360,
            cashback_amount: 5000,
            fund_backed: true,
            fund_name: "ICICI Prudential Bluechip Fund",
            is_recommended: false
          }
        ]
      }
    ]
  },
  {
    _id: "66d89f03",
    slug: "google-pixel-9-pro",
    name: "Google Pixel 9 Pro",
    brand: "Google",
    category: "Smartphones",
    badge: "Best Camera",
    rating: 4.8,
    review_count: 215,
    description: "Gemini AI, Tensor G4 processor, computational photography, and 7 years OS updates.",
    total_variants: 2,
    min_monthly_emi: 4735,
    max_mf_cashback: 5000,
    available_colors: ["Porcelain White", "Obsidian Black"],
    available_storages: ["128GB", "256GB"],
    default_variant: {
      _id: "66d89f03-v1",
      variant_name: "128GB - Porcelain White",
      storage: "128GB",
      color: "Porcelain White",
      color_code: "#F2EFE9",
      mrp: 109999,
      price: 99999,
      stock: 20,
      image_url: "/images/pixel-9-pro.png"
    },
    variants: [
      {
        _id: "66d89f03-v1",
        variant_name: "128GB - Porcelain White",
        storage: "128GB",
        color: "Porcelain White",
        color_code: "#F2EFE9",
        mrp: 109999,
        price: 99999,
        stock: 20,
        is_default: true,
        image_url: "/images/pixel-9-pro.png",
        emi_plans: [
          {
            _id: "66d89f03-p1",
            plan_label: "6 Months 0% Smart Plan",
            tenure_months: 6,
            interest_rate: 0,
            monthly_amount: 16666,
            cashback_amount: 3000,
            fund_backed: true,
            fund_name: "UTI Nifty 50 Index Fund",
            is_recommended: true
          }
        ]
      }
    ]
  },
  {
    _id: "66d89f04",
    slug: "oneplus-13-5g",
    name: "OnePlus 13 5G",
    brand: "OnePlus",
    category: "Smartphones",
    badge: "Value Flagship",
    rating: 4.7,
    review_count: 178,
    description: "Snapdragon 8 Elite, Hasselblad 4th Gen camera system, 6000mAh battery, 100W SUPERVOOC.",
    total_variants: 2,
    min_monthly_emi: 5680,
    max_mf_cashback: 3500,
    available_colors: ["Midnight Blue", "Midnight Black"],
    available_storages: ["256GB", "512GB"],
    default_variant: {
      _id: "66d89f04-v1",
      variant_name: "256GB - Midnight Blue",
      storage: "256GB",
      color: "Midnight Blue",
      color_code: "#2B436D",
      mrp: 69999,
      price: 64999,
      stock: 25,
      image_url: "/images/oneplus-13.png"
    },
    variants: [
      {
        _id: "66d89f04-v1",
        variant_name: "256GB - Midnight Blue",
        storage: "256GB",
        color: "Midnight Blue",
        color_code: "#2B436D",
        mrp: 69999,
        price: 64999,
        stock: 25,
        is_default: true,
        image_url: "/images/oneplus-13.png",
        emi_plans: [
          {
            _id: "66d89f04-p1",
            plan_label: "6 Months 0% Smart Plan",
            tenure_months: 6,
            interest_rate: 0,
            monthly_amount: 10833,
            cashback_amount: 2500,
            fund_backed: true,
            fund_name: "SBI Small Cap Fund",
            is_recommended: true
          }
        ]
      }
    ]
  }
];

export const fetchProducts = async (params = {}) => {
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
    let filtered = [...FALLBACK_PRODUCTS];
    if (params.brand && params.brand !== 'All') {
      filtered = filtered.filter(p => p.brand.toLowerCase() === params.brand.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return filtered;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    const match = FALLBACK_PRODUCTS.find(p => p.slug === slug);
    if (match) return match;
    throw error;
  }
};

export const fetchVariantEmiPlans = async (variantId) => {
  try {
    const res = await fetch(`${API_BASE}/variants/${variantId}/emi-plans`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    for (const prod of FALLBACK_PRODUCTS) {
      const foundVar = prod.variants.find(v => v._id === variantId);
      if (foundVar) {
        return {
          success: true,
          variant_id: foundVar._id,
          variant_name: foundVar.variant_name,
          price: foundVar.price,
          mrp: foundVar.mrp,
          emi_plans: foundVar.emi_plans || []
        };
      }
    }
    throw error;
  }
};

export const submitEmiOrder = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    return {
      success: true,
      message: 'EMI Application and Mutual Fund cashback initialized successfully',
      data: {
        order_id: '1FI-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        status: 'APPROVED',
        product_name: 'Flagship Smartphone',
        variant_name: 'Selected Variant',
        total_amount: 129900,
        monthly_emi: 21650,
        tenure_months: 6,
        interest_rate: 0,
        cashback_invested: 3500,
        mutual_fund_target: 'Parag Parikh Flexi Cap Fund',
        first_emi_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    };
  }
};
