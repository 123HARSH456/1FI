import React from 'react';
import ProductCard from './ProductCard';
import Pagination from '../Pagination/Pagination';
import { SearchX } from 'lucide-react';

export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
  onRefresh,
  onResetBrand,
  onSelectProduct,
  searchQuery = '',
  onClearSearch,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 6,
  onPageChange
}) {
  // Loading Skeleton State
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white rounded-[20px] p-3 border border-[#EAEFF6] animate-pulse space-y-2.5">
            <div className="w-full aspect-[4/3] bg-[#F8F9FD] rounded-xl"></div>
            <div className="h-2.5 bg-slate-100 rounded w-1/3"></div>
            <div className="h-3.5 bg-slate-100 rounded w-3/4"></div>
            <div className="h-3.5 bg-slate-100 rounded w-1/2"></div>
            <div className="h-7 bg-slate-100 rounded-full mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-5 rounded-[20px] bg-red-50/70 border border-red-200/80 text-center space-y-2.5">
        <p className="text-xs text-red-600 font-semibold">{error}</p>
        <button
          onClick={onRefresh}
          className="px-4 py-1.5 bg-[#722EDC] text-white rounded-full text-xs font-bold cursor-pointer hover:bg-[#5F24BD] transition-colors"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  // Empty State
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-[20px] p-8 text-center space-y-3 border border-[#EAEFF6] shadow-[0_4px_18px_-2px_rgba(21,25,40,0.03)]">
        <div className="w-12 h-12 rounded-2xl bg-[#F8F9FD] text-[#8C93A8] flex items-center justify-center mx-auto">
          <SearchX className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-[#151928]">
            No Products Found
          </h4>
          <p className="text-xs text-[#8C93A8] max-w-xs mx-auto mt-1">
            {searchQuery
              ? `No devices matched "${searchQuery}". Try checking for typos or searching by brand.`
              : "We couldn't find any electronics matching this filter."}
          </p>
        </div>
        <button
          onClick={searchQuery ? onClearSearch : onResetBrand}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4EEFF] text-[#722EDC] font-bold text-xs hover:bg-[#E8DCFF] transition-all cursor-pointer border border-[#D4B8FF]"
        >
          <span>{searchQuery ? 'Clear Search' : 'Reset Filter'}</span>
        </button>
      </div>
    );
  }

  // 2-column Product Grid with Pagination controls below
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
