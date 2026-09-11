import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, Pill, Sparkles, Building2, ShoppingCart } from 'lucide-react';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';

export default function SearchModal({ isOpen, onClose, onSelectProduct, onExploreAll }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return productsData.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchActive = p.specifications?.['Active Ingredient']?.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchBrand || matchCategory || matchActive || matchDesc;
    });
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = ['Paracetamol', 'Blood Pressure', 'Multivitamin', 'Antibiotic', 'Gauze', 'Thermometer'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-brand-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search medicines, brands, active ingredients, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-sm sm:text-base font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors text-xs font-semibold px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Content Body */}
        <div className="p-5 overflow-y-auto flex-grow space-y-4">
          {/* If No Query Typed: Show Suggestions */}
          {!query && (
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Suggested Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200/70 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
                <span>
                  Found {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} for "{query}"
                </span>
                {searchResults.length > 0 && (
                  <button
                    onClick={() => {
                      onClose();
                      onExploreAll(query);
                    }}
                    className="text-brand-600 hover:underline font-semibold"
                  >
                    View in Catalog →
                  </button>
                )}
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="py-3 px-3 rounded-2xl hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 flex-shrink-0 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-sky-700 uppercase block">
                            {product.brand} • {product.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-brand-600 transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs text-slate-500 block truncate">
                            {product.packSize}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="p-2 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white transition-colors"
                          title="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500">
                  <Pill className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="font-bold text-sm text-slate-700">No medical products found</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Try searching for generic names like Paracetamol, Cetirizine, or device categories.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
