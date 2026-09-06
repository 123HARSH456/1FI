import React, { useState, useEffect } from 'react';
import BottomNav from './components/layout/BottomNav';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  const [activeNav, setActiveNav] = useState('shop');
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith('/products/')) {
        const slug = path.replace('/products/', '');
        if (slug) setSelectedProductSlug(slug);
      } else if (hash.startsWith('#/products/')) {
        const slug = hash.replace('#/products/', '');
        if (slug) setSelectedProductSlug(slug);
      } else {
        setSelectedProductSlug(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleSelectProduct = (slug) => {
    setSelectedProductSlug(slug);
    window.history.pushState(null, '', `/products/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setSelectedProductSlug(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavChange = (nav) => {
    setActiveNav(nav);
    if (selectedProductSlug) {
      setSelectedProductSlug(null);
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 relative bg-[#F5F6FA] overflow-hidden">

      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto no-scrollbar">
        {selectedProductSlug ? (
          <ProductDetailPage
            slug={selectedProductSlug}
            onBack={handleBackToShop}
          />
        ) : activeNav === 'shop' ? (
          <ShopPage
            onSelectProduct={handleSelectProduct}
          />
        ) : (
          <div className="flex-1 bg-[#F5F6FA]" />
        )}
      </main>

      {!selectedProductSlug && (
        <BottomNav
          activeNav={activeNav}
          onNavChange={handleNavChange}
          onBackToShop={handleBackToShop}
        />
      )}
    </div>
  );
}
