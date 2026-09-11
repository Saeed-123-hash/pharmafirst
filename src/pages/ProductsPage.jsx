import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Package
} from 'lucide-react';
import { productsData } from '../data/products';
import { categoriesData } from '../data/categories';

export default function ProductsPage({
  initialCategory = 'all',
  initialSearch = '',
  onViewDetails
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceMax, setPriceMax] = useState(80);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [prescriptionFilter, setPrescriptionFilter] = useState('all'); // all, otc, rx
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync initial category or search if passed from navigation
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceMax(80);
    setInStockOnly(false);
    setPrescriptionFilter('all');
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...productsData];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.specifications?.['Active Ingredient'] &&
            p.specifications['Active Ingredient'].toLowerCase().includes(q))
        );
      });
    }

    // Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Price
    list = list.filter((p) => p.price <= priceMax);

    // In Stock
    if (inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Prescription
    if (prescriptionFilter === 'otc') {
      list = list.filter((p) => !p.prescriptionRequired);
    } else if (prescriptionFilter === 'rx') {
      list = list.filter((p) => p.prescriptionRequired);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      list.reverse();
    } else {
      // featured
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [searchQuery, selectedCategory, priceMax, inStockOnly, prescriptionFilter, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceMax < 80 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (prescriptionFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-brand-600">All Products</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pharmaceutical Catalog &amp; Healthcare Supplies
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Browse our complete temperature-monitored pharmaceutical product directory.
          </p>
        </div>

        {/* Top Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product name, brand, active agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Mobile filter trigger + Sort select */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm"
            >
              <Filter className="w-4 h-4 text-brand-600" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            {/* Sorting */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="featured">Featured &amp; Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                Refine Selection
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Categories
              </label>
              <div className="space-y-1.5 text-xs font-medium">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Healthcare Categories</span>
                  <span className="text-[11px] text-slate-400">{productsData.length}</span>
                </button>
                {categoriesData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-50 text-brand-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Max Price
                </label>
                <span className="text-xs font-bold text-slate-800">${priceMax}</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$5</span>
                <span>$80+</span>
              </div>
            </div>

            {/* Regulatory Classification (OTC vs Rx) */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Regulatory Type
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reg"
                    checked={prescriptionFilter === 'all'}
                    onChange={() => setPrescriptionFilter('all')}
                    className="accent-brand-600"
                  />
                  <span className="text-slate-700 font-medium">All Classifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reg"
                    checked={prescriptionFilter === 'otc'}
                    onChange={() => setPrescriptionFilter('otc')}
                    className="accent-brand-600"
                  />
                  <span className="text-slate-700 font-medium">General / OTC Supplies</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="reg"
                    checked={prescriptionFilter === 'rx'}
                    onChange={() => setPrescriptionFilter('rx')}
                    className="accent-brand-600"
                  />
                  <span className="text-slate-700 font-medium">Prescription / Regulated</span>
                </label>
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 accent-brand-600 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-800">
                  Ready-to-Ship Inventory Only
                </span>
              </label>
            </div>
          </aside>

          {/* Product Cards Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Active Filters Pill Strip */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/60 text-xs">
                <span className="font-semibold text-slate-500">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    Keyword: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {prescriptionFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    Type: {prescriptionFilter.toUpperCase()}
                    <button onClick={() => setPrescriptionFilter('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    In Stock Only
                    <button onClick={() => setInStockOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Count Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>
                Showing <strong>{filteredProducts.length}</strong> available pharmaceutical items
              </span>
              <span className="hidden sm:inline">Certified Batch Distribution</span>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try adjusting your price range, searching for different medical items, or clearing active filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="font-bold text-slate-900 text-sm">Refine Filter</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-slate-500 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="all">All Healthcare Categories</option>
                  {categoriesData.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Max */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-400 uppercase">Max Price</span>
                  <span className="text-slate-800">${priceMax}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Regulatory */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Classification
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m-reg"
                      checked={prescriptionFilter === 'all'}
                      onChange={() => setPrescriptionFilter('all')}
                      className="accent-brand-600"
                    />
                    <span>All Items</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m-reg"
                      checked={prescriptionFilter === 'otc'}
                      onChange={() => setPrescriptionFilter('otc')}
                      className="accent-brand-600"
                    />
                    <span>OTC Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m-reg"
                      checked={prescriptionFilter === 'rx'}
                      onChange={() => setPrescriptionFilter('rx')}
                      className="accent-brand-600"
                    />
                    <span>Prescription (Rx)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-brand-600"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
