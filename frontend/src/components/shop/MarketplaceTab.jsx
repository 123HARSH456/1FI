import React, { useState, useMemo, useEffect } from 'react';
import LimitBalanceCard from './LimitBalanceCard';
import SearchBar from '../SearchBar/SearchBar';
import OffersCarousel from './OffersCarousel';
import ProductGrid from './ProductGrid';
import BrandPartnersStrip from './BrandPartnersStrip';

export default function MarketplaceTab({ 
  products = [], 
  loading, 
  error, 
  onRefresh, 
  onSelectProduct,
  selectedBrand = 'All',
  setSelectedBrand
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Smooth in-memory filtering across name, brand, category, description, and variants
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by brand if selected from brand partners strip
    if (selectedBrand && selectedBrand !== 'All') {
      result = result.filter(
        p => p.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const nameMatch = p.name?.toLowerCase().includes(q);
        const brandMatch = p.brand?.toLowerCase().includes(q);
        const categoryMatch = p.category?.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q);
        const variantMatch = p.default_variant && (
          p.default_variant.variant_name?.toLowerCase().includes(q) ||
          p.default_variant.storage?.toLowerCase().includes(q) ||
          p.default_variant.color?.toLowerCase().includes(q)
        );
        const colorsMatch = p.available_colors?.some(c => c.toLowerCase().includes(q));
        const storagesMatch = p.available_storages?.some(s => s.toLowerCase().includes(q));

        return nameMatch || brandMatch || categoryMatch || descMatch || variantMatch || colorsMatch || storagesMatch;
      });
    }

    return result;
  }, [products, selectedBrand, searchQuery]);

  // Keep currentPage valid when filtering changes
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts.length, currentPage, itemsPerPage]);

  // Sliced products for the current page only (DOM efficiency)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Smoothly scroll to the catalog section when changing pages
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="p-4 space-y-4 sm:space-y-4.5 animate-fadeIn pb-3">
      {/* 1. LIMIT SECTION */}
      <LimitBalanceCard
        remainingLimit={156091}
        utilizationPercentage={46}
      />

      {/* 2. SEARCH BAR */}
      <SearchBar
        value={searchQuery}
        onChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onClear={() => {
          setSearchQuery('');
          setCurrentPage(1);
        }}
        placeholder="Search phones, laptops, accessories..."
      />

      {/* 3. OFFERS CAROUSEL */}
      <OffersCarousel 
        onSelectProduct={onSelectProduct} 
      />

      {/* 4. PRODUCT LIST */}
      <div id="catalog-section" className="space-y-3 pt-1">
        {/* Marketplace Section Header (without refresh icon) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-3.5 bg-[#722EDC] rounded-full inline-block" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#722EDC]">
              {searchQuery.trim() 
                ? `SEARCH RESULTS (${filteredProducts.length})` 
                : selectedBrand !== 'All'
                ? `${selectedBrand.toUpperCase()} DEVICES (${filteredProducts.length})`
                : '1Fi MARKETPLACE'}
            </span>
          </div>

          {(searchQuery || selectedBrand !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                if (setSelectedBrand) setSelectedBrand('All');
                setCurrentPage(1);
              }}
              className="text-[11px] font-semibold text-[#722EDC] hover:underline cursor-pointer"
            >
              Show All
            </button>
          )}
        </div>

        {/* 2-Column Product Grid with Loading / Error / Empty States & Pagination */}
        <ProductGrid
          products={paginatedProducts}
          loading={loading}
          error={error}
          onRefresh={onRefresh}
          searchQuery={searchQuery}
          onClearSearch={() => {
            setSearchQuery('');
            setCurrentPage(1);
          }}
          onResetBrand={() => {
            setSearchQuery('');
            if (setSelectedBrand) setSelectedBrand('All');
            setCurrentPage(1);
          }}
          onSelectProduct={onSelectProduct}
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Self-Moving Infinite Brand Partners Carousel */}
      <BrandPartnersStrip
        selectedBrand={selectedBrand}
        onSelectBrand={(brand) => {
          // If a brand is clicked from the bottom strip, clear text search and reset to page 1
          setSearchQuery('');
          setCurrentPage(1);
          if (setSelectedBrand) setSelectedBrand(brand);
        }}
      />
    </div>
  );
}
