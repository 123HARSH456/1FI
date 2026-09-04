const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, brand, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(category, 'i');
    }
    if (brand && brand !== 'All') {
      filter.brand = new RegExp(brand, 'i');
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const products = await Product.find(filter).lean();

    const transformed = products.map(product => {
      const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];
      
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
        total_variants: product.variants.length,
        default_variant: {
          _id: defaultVariant?._id,
          variant_name: defaultVariant?.variant_name,
          storage: defaultVariant?.storage,
          color: defaultVariant?.color,
          color_code: defaultVariant?.color_code,
          mrp: defaultVariant?.mrp,
          price: defaultVariant?.price,
          image_url: defaultVariant?.image_url,
          stock: defaultVariant?.stock
        },
        min_monthly_emi: minEmi,
        max_mf_cashback: maxCashback,
        recommended_plan: recommendedPlan,
        available_colors: [...new Set(product.variants.map(v => v.color))],
        available_storages: [...new Set(product.variants.map(v => v.storage))]
      };
    });

    res.status(200).json({
      success: true,
      count: transformed.length,
      data: transformed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product '${slug}' not found`
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product details',
      error: error.message
    });
  }
};

exports.getVariantEmiPlans = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ 'variants._id': id }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Variant not found'
      });
    }

    const variant = product.variants.find(v => v._id.toString() === id);
    if (!variant) {
      return res.status(404).json({
        success: false,
        message: 'Variant not found'
      });
    }

    res.status(200).json({
      success: true,
      variant_id: variant._id,
      variant_name: variant.variant_name,
      price: variant.price,
      mrp: variant.mrp,
      emi_plans: variant.emi_plans || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch variant EMI plans',
      error: error.message
    });
  }
};

exports.createEmiOrder = async (req, res) => {
  try {
    const { productId, variantId, emiPlanId, userPhone, userPan } = req.body;

    if (!productId || !variantId || !emiPlanId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const variant = product.variants.find(v => v._id.toString() === variantId);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }

    const emiPlan = variant.emi_plans.find(p => p._id.toString() === emiPlanId);
    if (!emiPlan) {
      return res.status(404).json({ success: false, message: 'EMI Plan not found' });
    }

    const orderId = '1FI-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    res.status(201).json({
      success: true,
      message: 'EMI Application and Mutual Fund cashback initialized successfully',
      data: {
        order_id: orderId,
        status: 'APPROVED',
        product_name: product.name,
        variant_name: variant.variant_name,
        total_amount: variant.price,
        monthly_emi: emiPlan.monthly_amount,
        tenure_months: emiPlan.tenure_months,
        interest_rate: emiPlan.interest_rate,
        cashback_invested: emiPlan.cashback_amount,
        mutual_fund_target: emiPlan.fund_name,
        first_emi_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order submission failed',
      error: error.message
    });
  }
};
