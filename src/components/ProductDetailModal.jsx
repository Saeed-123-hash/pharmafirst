import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  AlertTriangle,
  FileText,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  Package,
  Layers,
  Thermometer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productsData } from '../data/products';

export default function ProductDetailModal({ product, onClose, onSelectProduct }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // overview, specs, compliance

  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = productsData
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-brand-600 capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-slate-800 font-mono text-[11px]">{product.sku || product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image Showcase */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-600 text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-500 text-white shadow-sm">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Trust Features Strip */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>GMP / GDP Source</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Cold-Chain Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                  {product.brand}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-2">
                  {product.name}
                </h1>

                {/* Rating & Stock Status */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 5)
                            ? 'fill-current text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span
                    className={`text-xs font-bold inline-flex items-center gap-1 ${
                      product.inStock ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        product.inStock ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    {product.inStock ? `In Stock (${product.stockCount} units)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-slate-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="block text-xs text-slate-500 mt-0.5">
                      Standard wholesale / retail unit pricing
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200/60">
                      SKU: {product.sku}
                    </span>
                  </div>
                </div>

                {/* Prescription / Regulatory Alert Notice */}
                {product.prescriptionRequired ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 mb-6">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Prescription / Verification Required</span>
                      <span>{product.prescriptionNote}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-xs flex items-start gap-2.5 mb-6">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Standard Healthcare Supply</span>
                      <span>Product information will be provided by Pharma First Enterprises.</span>
                    </div>
                  </div>
                )}

                {/* Quantity and Cart Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between border border-slate-300 rounded-xl p-1 bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-slate-800 text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-grow py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
                      product.inStock
                        ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/25 hover:shadow-brand-600/40'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add {quantity > 1 ? `(${quantity})` : ''} to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Deep-Dive Information Tabs */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`text-sm font-bold pb-1 transition-colors border-b-2 -mb-3.5 px-2 ${
                  activeTab === 'overview'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Overview &amp; Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-sm font-bold pb-1 transition-colors border-b-2 -mb-3.5 px-2 ${
                  activeTab === 'specs'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('compliance')}
                className={`text-sm font-bold pb-1 transition-colors border-b-2 -mb-3.5 px-2 ${
                  activeTab === 'compliance'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Storage &amp; Compliance
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>{product.description}</p>
                <p className="italic text-slate-500 text-xs">
                  {product.regulatoryNotice}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Dosage Form</span>
                    <span className="text-sm font-semibold text-slate-800">{product.dosageForm}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Package Size</span>
                    <span className="text-sm font-semibold text-slate-800">{product.packSize}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Category</span>
                    <span className="text-sm font-semibold text-slate-800">{product.category}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="w-full text-left text-sm text-slate-700">
                  <tbody className="divide-y divide-slate-100">
                    {product.specifications &&
                      Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-500 bg-slate-50/60 w-1/3">
                            {key}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-800">{val}</td>
                        </tr>
                      ))}
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-500 bg-slate-50/60">
                        Manufacturer / Brand
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-800">{product.brand}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-semibold text-slate-500 bg-slate-50/60">
                        Item Code (SKU)
                      </td>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-800">{product.sku}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <Thermometer className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">Storage Protocol</span>
                    <span>{product.storageConditions}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-800 block">
                    Pharmaceutical Safety &amp; Distribution Standard
                  </span>
                  <p>
                    Product information will be provided by Pharma First Enterprises. In accordance with healthcare regulations, items are preserved in GDP-compliant, climate-monitored facilities.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-4">Related Healthcare Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-brand-400 hover:shadow-sm transition-all cursor-pointer flex items-center gap-3 bg-slate-50/50"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-12 h-12 object-contain flex-shrink-0 bg-white p-1 rounded-lg border border-slate-100"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs text-slate-800 truncate">{rel.name}</h4>
                      <span className="text-xs font-black text-brand-700">${rel.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
