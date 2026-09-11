import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Building,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { companyData } from '../data/company';

export default function CheckoutPage({ onOrderComplete, onBackToCart }) {
  const { items, subtotal, deliveryFee, discountAmount, grandTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    institutionType: 'individual', // individual, clinic, pharmacy, hospital
    licenseId: '',
    deliveryInstructions: '',
    complianceConfirmed: false,
    paymentMethod: 'invoice', // invoice, cod, card_placeholder
  });

  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderRecord, setOrderRecord] = useState(null);

  // Check if any item in cart requires prescription
  const hasRxItem = items.some((item) => item.product.prescriptionRequired);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name or Practitioner Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid contact email is required.';
    }
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required.';
    if (!formData.address.trim()) errs.address = 'Delivery shipping address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal / ZIP code is required.';
    if (!formData.complianceConfirmed) {
      errs.complianceConfirmed = 'You must confirm pharmaceutical regulatory compliance.';
    }
    if (hasRxItem && !formData.licenseId.trim()) {
      errs.licenseId = 'License ID / Doctor reference is required for regulated prescription items.';
    }
    return errs;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      const orderId = 'PFE-ORD-' + Math.floor(100000 + Math.random() * 900000);
      const record = {
        orderId,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customer: { ...formData },
        items: [...items],
        subtotal,
        deliveryFee,
        discountAmount,
        grandTotal,
      };

      setOrderRecord(record);
      setOrderSubmitted(true);
      clearCart();

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#10b981', '#38bdf8', '#0f172a']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  if (items.length === 0 && !orderSubmitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">No items in checkout</h2>
        <p className="text-xs text-slate-500 mb-6">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={onBackToCart}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  // Order Success Screen
  if (orderSubmitted && orderRecord) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 sm:py-20 border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Order Confirmed &amp; Dispatched for Verification
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Thank You for Ordering with Pharma First Enterprises
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                Your order ID is <strong className="text-slate-900 font-mono">{orderRecord.orderId}</strong>. A confirmation summary has been logged for cold-chain batch allocation.
              </p>
            </div>

            {/* Itemized Invoice Preview Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 font-semibold text-slate-700">
                <span>Ordered Item Details</span>
                <span>Qty &amp; Total</span>
              </div>

              <div className="space-y-3">
                {orderRecord.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 block">{product.name}</span>
                      <span className="text-slate-500">{product.brand} • {product.packSize}</span>
                    </div>
                    <span className="font-bold text-slate-900">
                      {quantity}x (${(product.price * quantity).toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${orderRecord.subtotal.toFixed(2)}</span>
                </div>
                {orderRecord.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount:</span>
                    <span>-${orderRecord.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Cold-Chain Delivery:</span>
                  <span>{orderRecord.deliveryFee === 0 ? 'FREE' : `$${orderRecord.deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span className="text-brand-700">${orderRecord.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Delivery Address: {orderRecord.customer.fullName}, {orderRecord.customer.address}, {orderRecord.customer.city}, {orderRecord.customer.postalCode}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice Preview</span>
              </button>
              <button
                onClick={onOrderComplete}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>Checkout</span>
              <span>/</span>
              <span className="text-brand-600">Verification &amp; Shipping</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Procurement &amp; Checkout
            </h1>
          </div>
          <button
            onClick={onBackToCart}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Information, Compliance & Payment */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Customer & Shipping Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="font-bold text-slate-900 text-base">Customer &amp; Dispatch Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name / Contact Practitioner <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arthur Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.fullName ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.fullName && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.fullName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="order.contact@facility.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.email && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.phone && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Purchaser Entity Type
                  </label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="individual">Individual Consumer / Patient</option>
                    <option value="clinic">Medical Clinic / Surgery</option>
                    <option value="pharmacy">Retail / Community Pharmacy</option>
                    <option value="hospital">Hospital / Institutional Account</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street address, building, suite, or dispensary floor"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                    errors.address ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                />
                {errors.address && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.address}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.city ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.city && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Postal / ZIP Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                      errors.postalCode ? 'border-rose-400 bg-rose-50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.postalCode && <span className="text-[11px] text-rose-500 mt-0.5 block">{errors.postalCode}</span>}
                </div>
              </div>
            </div>

            {/* Step 2: Pharmaceutical Regulatory Compliance Check */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="font-bold text-slate-900 text-base">Pharmaceutical Regulatory Compliance</h2>
              </div>

              {hasRxItem && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold block">
                      Prescription / Controlled Items Detected in Cart
                    </span>
                    <p>
                      Your order contains items requiring license verification prior to warehouse release. Please provide your institutional or medical practitioner license number below.
                    </p>
                    <div className="pt-2">
                      <label className="block font-bold mb-1">
                        Professional License ID / Rx Reference <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LIC-NY-98124 / Dr. Prescription Ref"
                        value={formData.licenseId}
                        onChange={(e) => setFormData({ ...formData, licenseId: e.target.value })}
                        className={`w-full text-xs p-2.5 rounded-xl bg-white border ${
                          errors.licenseId ? 'border-rose-500' : 'border-amber-300'
                        }`}
                      />
                      {errors.licenseId && (
                        <span className="text-rose-600 font-semibold block mt-1">{errors.licenseId}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.complianceConfirmed}
                    onChange={(e) => setFormData({ ...formData, complianceConfirmed: e.target.checked })}
                    className="w-4 h-4 mt-0.5 text-brand-600 rounded focus:ring-brand-500"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800">Compliance Confirmation: </strong>
                    I confirm that I am a licensed healthcare facility, authorized representative, or eligible individual procuring these items in adherence to relevant pharmaceutical guidelines and laws. Product information will be provided by Pharma First Enterprises.
                  </span>
                </label>
                {errors.complianceConfirmed && (
                  <span className="text-xs text-rose-500 block mt-1 font-semibold">
                    {errors.complianceConfirmed}
                  </span>
                )}
              </div>
            </div>

            {/* Step 3: Payment Method (UI Placeholder) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h2 className="font-bold text-slate-900 text-base">Payment &amp; Billing Option</h2>
              </div>

              <div className="space-y-2.5 text-xs">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 cursor-pointer bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'invoice'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'invoice' })}
                      className="accent-brand-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block">
                        Institutional Invoice &amp; Bank Wire
                      </span>
                      <span className="text-slate-500">
                        Official commercial invoice dispatched with batch package (Standard 30 days)
                      </span>
                    </div>
                  </div>
                  <Building className="w-5 h-5 text-slate-400" />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 cursor-pointer bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-brand-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block">Cash on Delivery (COD)</span>
                      <span className="text-slate-500">
                        Pay upon receipt at authorized pharmacy or clinical receiving desk
                      </span>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-slate-400" />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 cursor-pointer bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card_placeholder'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card_placeholder' })}
                      className="accent-brand-600"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block">Credit / Debit Card (Simulated UI)</span>
                      <span className="text-slate-500">
                        Secure gateway placeholder (No real charge will be processed)
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </label>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulated checkout interface. Ready for Stripe / Payment gateway hookup.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Review ({items.length} items)
            </h2>

            {/* Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-slate-800 block truncate">{product.name}</span>
                    <span className="text-slate-400">Qty: {quantity} • ${product.price.toFixed(2)}</span>
                  </div>
                  <span className="font-black text-slate-900 flex-shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promotional Savings</span>
                  <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Climate-Monitored Delivery</span>
                <span className="font-semibold text-slate-800">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Amount Due</span>
                <span className="text-xl text-brand-700">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Order Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Submit &amp; Confirm Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[11px] text-slate-400">
              <span>Pharma First Enterprises • Guaranteed Cold-Chain Transit</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
