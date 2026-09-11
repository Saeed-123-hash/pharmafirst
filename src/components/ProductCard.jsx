import React from 'react';
import { Star, ShoppingCart, Eye, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Media & Badges Area */}
      <div className="relative w-full pt-[85%] bg-slate-50 overflow-hidden flex items-center justify-center p-4">
        {/* Product Visual */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-600 text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Prescription Tag / Availability */}
        <div className="absolute top-3 right-3 z-10">
          {product.prescriptionRequired ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
              <AlertCircle className="w-3 h-3 text-amber-700" />
              Rx Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              OTC Verified
            </span>
          )}
        </div>

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-2.5 rounded-full bg-white text-slate-800 hover:bg-brand-50 hover:text-brand-600 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
            title="Quick preview"
            aria-label="Quick preview"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-sky-700 truncate max-w-[65%]">
              {product.brand}
            </span>
            <span className="text-slate-400 capitalize">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Packaging / Dosage info */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
            {product.packSize || product.dosageForm}
          </p>

          {/* Rating Placeholder */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-semibold block ${
                product.inStock ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {product.inStock ? 'In Stock (Ready to ship)' : 'Out of Stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2.5 sm:px-3 sm:py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all duration-200 ${
              product.inStock
                ? 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
