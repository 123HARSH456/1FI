import React, { useState, useEffect } from 'react';
import MobileFrame from './components/layout/MobileFrame';
import AppHeader from './components/layout/AppHeader';
import BottomNav from './components/layout/BottomNav';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  const [viewMode, setViewMode] = useState('mobile');
  const [activeNav, setActiveNav] = useState('shop');
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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

  return (
    <MobileFrame viewMode={viewMode}>
      <AppHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      <main className="flex-1 flex flex-col">
        {selectedProductSlug ? (
          <ProductDetailPage
            slug={selectedProductSlug}
            onBack={handleBackToShop}
          />
        ) : (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>

      {!selectedProductSlug && (
        <BottomNav
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onBackToShop={handleBackToShop}
        />
      )}
    </MobileFrame>
  );
}
