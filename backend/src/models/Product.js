const mongoose = require('mongoose');

const EmiPlanSchema = new mongoose.Schema({
  plan_label: {
    type: String,
    required: true,
    trim: true
  },
  tenure_months: {
    type: Number,
    required: true
  },
  interest_rate: {
    type: Number,
    required: true,
    default: 0.0
  },
  monthly_amount: {
    type: Number,
    required: true
  },
  cashback_amount: {
    type: Number,
    default: 0
  },
  cashback_note: {
    type: String,
    default: ''
  },
  fund_backed: {
    type: Boolean,
    default: true
  },
  fund_name: {
    type: String,
    default: '1Fi Balanced Advantage Fund'
  },
  is_recommended: {
    type: Boolean,
    default: false
  },
  down_payment: {
    type: Number,
    default: 0
  },
  processing_fee: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const VariantSchema = new mongoose.Schema({
  variant_name: {
    type: String,
    required: true,
    trim: true
  },
  storage: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  color_code: {
    type: String,
    default: '#1E293B'
  },
  mrp: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 15
  },
  is_default: {
    type: Boolean,
    default: false
  },
  emi_plans: [EmiPlanSchema]
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    default: 'Smartphones'
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 4.8
  },
  review_count: {
    type: Number,
    default: 128
  },
  badge: {
    type: String,
    default: 'Top Pick'
  },
  variants: [VariantSchema]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Product', ProductSchema);
