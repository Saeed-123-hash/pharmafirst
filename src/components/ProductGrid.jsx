import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ProductGrid({ products, onViewDetails, onExploreMore, title = "Featured Pharmaceutical Products", subtitle = "Directly sourced from certified manufacturing lines with verified batch cold-chain pedigree." }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filterTabs = [
    { id: 'all', label: 'All Catalog' },
    { id: 'medicines', label: 'Medicines' },
    { id: 'healthcare', label: 'Healthcare Devices' },
    { id: 'vitamins-supplements', label: 'Vitamins & Supplements' },
    { id: 'medical-supplies', label: 'Medical Supplies' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeFilter !== 'all') {
      list = list.filter((p) => p.categorySlug === activeFilter);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Default: featured priority
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [products, activeFilter, sortBy]);

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Verified Sourcing
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="featured">Featured &amp; Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No products found in this category</h3>
            <p className="text-slate-500 text-sm mb-4">Try choosing another category or clearing your active filters.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA for full catalog */}
        {onExploreMore && (
          <div className="mt-12 text-center">
            <button
              onClick={onExploreMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-sm hover:border-slate-400 transition-all duration-200 text-sm group"
            >
              <span>Explore Complete Pharmaceutical Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
