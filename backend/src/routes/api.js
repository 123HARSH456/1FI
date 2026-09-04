const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:slug', productController.getProductBySlug);
router.get('/variants/:id/emi-plans', productController.getVariantEmiPlans);
router.post('/orders/checkout', productController.createEmiOrder);

module.exports = router;
