import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage({ onProceedToCheckout, onContinueShopping }) {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    isFreeShipping,
    freeShippingProgress,
    shippingRemaining,
    grandTotal,
    discountCode,
    discountAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyDiscount(couponInput);
    setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Your Cart is Currently Empty</h1>
        <p className="text-sm text-slate-500 max-w-md mb-8">
          Explore our certified pharmaceutical catalog to order medicines, diagnostic healthcare devices, and clinical supplies.
        </p>
        <button
          onClick={onContinueShopping}
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Review Shopping Cart
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {itemCount} total units ready for pharmaceutical fulfillment
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Free shipping banner */}
            <div className="px-6 py-4 bg-sky-50 border-b border-sky-100 flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-2 text-sky-900">
                <Truck className="w-4 h-4 text-brand-600" />
                {isFreeShipping
                  ? 'Congratulations! You qualified for Free Standard Delivery.'
                  : `Add $${shippingRemaining.toFixed(2)} more to reach FREE delivery.`}
              </span>
              <span className="font-bold text-sky-800">{Math.round(freeShippingProgress)}%</span>
            </div>

            <div className="divide-y divide-slate-100 p-6 space-y-6">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="pt-6 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-sky-700 uppercase">
                        {product.brand}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {product.name}
                      </h3>
                      <span className="text-xs text-slate-400 block">{product.packSize}</span>
                      {product.prescriptionRequired && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Prescription / Verification Required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Unit Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-bold text-slate-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="text-base font-black text-slate-900 block">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400">
                        ${product.price.toFixed(2)}/unit
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onContinueShopping}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping Catalogue</span>
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            {/* Promo code form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-grow">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon code (PHARMA10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-900 transition-colors"
              >
                Apply
              </button>
            </form>

            {discountCode && (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-200">
                <span className="font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Code {discountCode} active
                </span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {/* Pricing details */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promotional Discount</span>
                  <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Climate Delivery</span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Due</span>
                <span className="text-xl text-brand-700">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to checkout button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 rounded-2xl font-bold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Compliance Guarantee */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Authorized Pharmaceutical Custody</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Orders are processed through GDP-certified climate control. Prescriptions verified prior to packing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
