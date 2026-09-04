require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./db/connection');
const apiRoutes = require('./routes/api');
const Product = require('./models/Product');
const { seedData } = require('./db/seed');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    service: '1Fi Marketplace API',
    endpoints: [
      'GET /api/products',
      'GET /api/products/:slug',
      'GET /api/variants/:id/emi-plans',
      'POST /api/orders/checkout'
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

const startServer = async () => {
  try {
    await connectDB();
    
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedData);
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} (offline DB mode)`);
    });
  }
};

startServer();
