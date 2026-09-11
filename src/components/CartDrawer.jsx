import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onNavigateToCheckout, onNavigateToCart, onContinueShopping }) {
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
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyDiscount(inputCode);
    setPromoMessage(res);
    setInputCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">Your Shopping Cart</h2>
                <span className="text-xs text-slate-500 font-medium">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in order
                </span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Bar */}
          <div className="px-5 py-3 bg-sky-50/70 border-b border-sky-100 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-sky-800">
                <Truck className="w-4 h-4 text-brand-600" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold">You qualify for FREE Standard Delivery!</span>
                ) : (
                  <span>Add ${shippingRemaining.toFixed(2)} more for FREE Delivery</span>
                )}
              </span>
              <span className="text-slate-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-sky-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our verified medical catalogue and add pharmaceutical items to begin.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    if (onContinueShopping) onContinueShopping();
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex items-start gap-4">
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500 block mb-2">{product.brand}</span>

                    {/* Quantity controls & Price */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white rounded transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-white rounded transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-slate-400">
                          ${product.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/90 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-grow">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (Try PHARMA10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Promo active notice */}
              {discountCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Code {discountCode} applied
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Calculation Summary */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-base text-brand-700">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => {
                      closeCart();
                      onNavigateToCart();
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors py-1"
                  >
                    View Cart Page
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors py-1"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authorized Pharmaceutical Chain of Custody</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
