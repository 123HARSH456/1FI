# 🛍️ 1Fi Marketplace — 0% EMI & Mutual Fund Wealth Catalog

> **A modern, mobile-first e-commerce marketplace for 1Fi** featuring zero-interest electronics financing, interactive 360° product exploration, instant catalog search, dynamic pagination, and cashback invested directly into Mutual Funds.

[![Repository](https://img.shields.io/badge/GitHub-123HARSH456%2F1FI-722EDC?style=for-the-badge&logo=github)](https://github.com/123HARSH456/1FI)
[![Vite](https://img.shields.io/badge/Vite-5.4-722EDC?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-722EDC?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-722EDC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📱 Visual Hierarchy & Architecture

The marketplace is structured specifically for a frictionless mobile shopping experience:

```
┌─────────────────────────────────────────────────────────┐
│  1Fi PAY APP HEADER                                     │
├─────────────────────────────────────────────────────────┤
│  1. LIMIT & PERSONALIZATION                             │
│     • Available 1Fi credit limit balance                │
│     • Utilization visual meter                          │
├─────────────────────────────────────────────────────────┤
│  2. MARKETPLACE SEARCH BAR                              │
│     • Real-time multi-field search                      │
│     • Dynamic clear action (×) & #722EDC focus ring     │
├─────────────────────────────────────────────────────────┤
│  3. SPECIAL OFFERS CAROUSEL                             │
│     • Full-bleed promotional artwork banners            │
│     • 3.5s auto-rotation, touch swipe & pause on hover  │
├─────────────────────────────────────────────────────────┤
│  4. 1Fi MARKETPLACE (2-COLUMN PRODUCT GRID)             │
│     • Transparent device cutouts                        │
│     • Dynamic EMI pricing & instant plan preview        │
│     • Scalable 6-item page slicing                      │
├─────────────────────────────────────────────────────────┤
│  5. PAGINATION CONTROLS                                 │
│     • Dynamic total page calculation                    │
│     • #722EDC active highlight & mobile touch targets   │
├─────────────────────────────────────────────────────────┤
│  6. INFINITE BRAND PARTNERS CAROUSEL                    │
│     • Continuous loop of certified partner brands       │
├─────────────────────────────────────────────────────────┤
│  BOTTOM NAVIGATION (Home · Shop · Dues · Limit · Profile│
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features & Capabilities

### 1. 💜 Unified `#722EDC` Purple Accent Design System
- **Single Source of Truth**: All primary buttons, active tabs, focus rings, badges, indicators, and glow states uniformly reference `--primary-purple: #722EDC`.
- **Systematic Tokens**: Documented in `index.css` and `tailwind.config.js` with harmonized tints (`#F4EEFF`, `#D4B8FF`, `#5F24BD`) and elevation glows (`rgba(114, 46, 220, 0.3)`).
- **Realistic Phone Chassis**: Desktop view is encased in a responsive smartphone chassis with status bar and dynamic island, seamlessly collapsing to full bleed on mobile devices.

### 2. 🔄 Interactive 360° Rotational Product Viewer
- **All 24 Models Enabled**: Every product card in the catalog opens to an interactive 360° rotating frame viewer.
- **30 High-Resolution Transparent Frames**: Preloaded sequence allowing natural horizontal finger swiping on mobile and mouse dragging on desktop.
- **Smooth Wrap-Around**: Rotates fluidly through 360 degrees in both directions with a custom hint badge (*"Swipe to rotate 360°"*).

### 3. 🖼️ Full-Bleed Promotional Offers Carousel
- **Edge-to-Edge Composition**: High-impact commercial banners featuring the OnePlus 13 5G, iPhone 17 Pro, Galaxy S25 Ultra, and Pixel 9 Pro.
- **Readability Scrim**: Directional gradient protecting typography on the left while keeping the transparent phone hardware crisp on the right.
- **Micro-Interactions**: Auto-rotates every 3.5 seconds, pauses on touch or hover, and includes active `#722EDC` pill indicators.

### 4. 🔍 Instant Marketplace Search Bar
- **Instant Search**: Filters products on every keystroke across name, brand, category, description, storage variants, and color names.
- **Clean Empty State**: Displays tailored feedback and a *"Clear Search"* button when no products match.
- **Reusable Component**: Fully decoupled inside `src/components/SearchBar/` with mobile-first 48px touch targets.

### 5. 📄 Scalable 24-Product Catalog & Pagination
- **Extended Real-World Catalog**: 24 complete products across 7 global smartphone brands:
  - 🍏 **Apple**: iPhone 17 Pro, iPhone 16, iPhone 16 Pro Max, iPhone 15
  - 🌌 **Samsung**: Galaxy S25 Ultra, Galaxy S24 FE, Galaxy Z Fold 6, Galaxy Z Flip 6
  - 🔵 **Google**: Pixel 9 Pro, Pixel 9, Pixel 8a
  - 🔴 **OnePlus**: OnePlus 13 5G, OnePlus 12, OnePlus Open, OnePlus Nord 4
  - 🟠 **Xiaomi**: Xiaomi 14 Ultra, Xiaomi 14, Redmi Note 13 Pro+
  - ⚪ **Nothing**: Nothing Phone (2), Nothing Phone (2a) Plus, CMF Phone 1
  - 🟣 **Motorola**: Edge 50 Ultra, Razr 50 Ultra, Edge 50 Pro
- **Reusable Pagination (`src/components/Pagination/`)**:
  - Displays 6 products per page (4 full pages).
  - Dynamically calculates `totalPages = Math.ceil(totalItems / itemsPerPage)`.
  - Mounts **only 6 `ProductCard` components** in the DOM per page for optimal performance.
  - Automatically resets or recalculates when search queries narrow results.
  - Smoothly scrolls back to the product catalog on page transitions.

### 6. 📈 Mutual Fund-Backed EMI Financing Matrix
- **Wealth Creation on Every Purchase**: Transparent monthly EMI plans where cashback is routed directly to AMFI mutual fund folios (Parag Parikh Flexi Cap Fund, UTI Nifty 50 Index Fund, ICICI Prudential Bluechip Fund, SBI Small Cap Fund).
- **Interactive Variant & EMI Plan Selector**: Switch storage options and tenures (3, 6, 12, 24 months) with dynamic price, interest rate, and cashback recalculation.
- **Instant KYC & Order Checkout Drawer**: Simulated PAN and mobile number verification with celebratory confetti upon instant approval.

---

## 📂 Project Structure

```
1fi/
├── frontend/
│   ├── public/
│   │   ├── favicon.svg               # Custom OneFi purple & mint SVG favicon
│   │   ├── assets/
│   │   │   └── phone360/             # 360° frame sets (apple, samsung, pixel, oneplus, oppo)
│   │   └── images/                   # Transparent phone cutouts & offer artwork
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeviceFrame/          # Smartphone viewport container & ambient lighting
│   │   │   ├── layout/               # AppHeader, BottomNav
│   │   │   ├── Pagination/           # Reusable Pagination component (Pagination.jsx/.css)
│   │   │   ├── product/              # CheckoutDrawer, VariantSelector, EMIPlanSelector
│   │   │   ├── ProductViewer/        # 360° Rotational touch/mouse viewer component
│   │   │   ├── SearchBar/            # Marketplace SearchBar component (SearchBar.jsx/.css)
│   │   │   └── shop/                 # LimitBalanceCard, OffersCarousel, ProductCard, ProductGrid, BrandPartnersStrip
│   │   ├── data/
│   │   │   ├── products.json         # 24-product catalog with variants & EMI plans
│   │   │   ├── offers.json           # Hero offer banners data
│   │   │   └── brandPartners.json    # Partner stores & brands
│   │   ├── pages/
│   │   │   ├── ShopPage.jsx          # Primary shop view with tabs
│   │   │   └── ProductDetailPage.jsx # Product detail view with 360° viewer & EMI plans
│   │   ├── services/
│   │   │   └── api.js                # API & catalog data access layer with search/filter
│   │   ├── App.jsx                   # Route coordinator & deep-linking handler
│   │   ├── main.jsx                  # React application root
│   │   └── index.css                 # Global CSS design tokens & utilities (--primary-purple)
│   ├── index.html                    # Main HTML entry with SVG favicon
│   ├── tailwind.config.js            # Tailwind theme tokens & shadow utilities
│   └── vite.config.js                # Vite development server configuration
├── package.json                      # Workspace root package scripts
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0 or higher recommended)
- **npm** (v9.0 or higher)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/123HARSH456/1FI.git

# Enter project directory
cd 1FI

# Install frontend dependencies
npm run install:all
# (or cd frontend && npm install)
```

### 3. Running the Development Server
Launch the local Vite development server:

```bash
npm run dev
# (or cd frontend && npm run dev)
```

The application will be live at:
👉 **`http://localhost:3000`**

### 4. Production Build
Verify production compilation:

```bash
npm run build
# (or cd frontend && npm run build)
```

The optimized bundle will be compiled to `frontend/dist/`.

---

## 🧪 Interactive Walkthrough & Testing Guide

When testing or reviewing the application, verify the following core user flows:

1. **Explore the Shop Page (`http://localhost:3000`)**:
   - Check the **1Fi Limit Card** with purple gradient and balance status.
   - Inspect the **Search Bar**: type `"Google"` or `"Pro"` to watch the catalog update in real time with instant result counts.
   - Click the clear icon **(×)** to immediately restore the full catalog.
   - Watch the **Special Offers** banner auto-rotate through the commercial promotions.

2. **Test Pagination**:
   - Navigate to Page 2, 3, and 4 using the pagination buttons below the catalog.
   - Notice that only 6 product cards are mounted per page for performance.
   - Verify that the **Previous** button is disabled on Page 1, and the **Next** button is disabled on Page 4.
   - Notice how changing pages smoothly scrolls back to the product section.

3. **Experience the 360° Product Viewer**:
   - Tap any device (e.g. *Apple iPhone 17 Pro*, *Samsung Galaxy S25 Ultra*, *Google Pixel 9 Pro*, or *OnePlus 13*).
   - Drag horizontally with your mouse or swipe with your finger to spin the device 360 degrees.
   - Switch variants (storage and color) and watch the price and EMI recalculate.

4. **Avail 1Fi 0% EMI & Mutual Fund Investment**:
   - Expand the **Flexible Financing & EMI** plans to inspect the mutual fund allocation callout (*"₹3,500 invested in Parag Parikh Flexi Cap Fund"*).
   - Tap **Continue** to trigger the **Checkout Drawer**.
   - Review your financing summary, enter mock PAN / Phone, and tap **Confirm & Avail 1Fi EMI**.
   - Enjoy the celebratory confetti and approval confirmation!

---

## 📄 License
MIT License © 2026 [123HARSH456](https://github.com/123HARSH456).
