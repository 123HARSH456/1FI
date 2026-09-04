import React, { useState, useEffect } from 'react';
import ShopTabs from '../components/shop/ShopTabs';
import TopBrandsTab from '../components/shop/TopBrandsTab';
import NearbyStoresTab from '../components/shop/NearbyStoresTab';
import MarketplaceTab from '../components/shop/MarketplaceTab';
import { fetchProducts } from '../services/api';

export default function ShopPage({ 
  onSelectProduct, 
  searchQuery 
}) {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
        category: selectedCategory,
        brand: selectedBrand,
        search: searchQuery
      });
      setProducts(data || []);
    } catch (err) {
      setError('Could not connect to backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedBrand, searchQuery]);

  return (
    <div className="flex-1 flex flex-col">
      <ShopTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {activeTab === 'brands' && (
        <TopBrandsTab 
          onExploreMarketplace={() => setActiveTab('marketplace')} 
        />
      )}

      {activeTab === 'stores' && (
        <NearbyStoresTab 
          onExploreMarketplace={() => setActiveTab('marketplace')} 
        />
      )}

      {activeTab === 'marketplace' && (
        <MarketplaceTab
          products={products}
          loading={loading}
          error={error}
          onRefresh={loadProducts}
          onSelectProduct={onSelectProduct}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
        />
      )}
    </div>
  );
}
