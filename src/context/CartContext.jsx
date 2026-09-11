import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

const STORAGE_KEY = 'pharmafirst_cart_v1';
const FREE_SHIPPING_THRESHOLD = 50.0;
const STANDARD_SHIPPING_FEE = 9.99;

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, quantity = 1, shouldOpenDrawer = true) => {
    if (!product || !product.id) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    addToast(`Added "${product.name}" to your cart`, 'success');

    if (shouldOpenDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => {
      const removed = prevItems.find((i) => i.product.id === productId);
      if (removed) {
        addToast(`Removed "${removed.product.name}" from cart`, 'info');
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode('');
    setDiscountPercent(0);
    addToast('Shopping cart cleared', 'info');
  };

  const applyDiscount = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'PHARMA10' || cleanCode === 'HEALTH10') {
      setDiscountCode(cleanCode);
      setDiscountPercent(10);
      addToast('Promo code applied: 10% discount!', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (cleanCode === 'FIRSTORDER') {
      setDiscountCode(cleanCode);
      setDiscountPercent(15);
      addToast('Welcome code applied: 15% discount!', 'success');
      return { success: true, message: '15% discount applied successfully!' };
    } else {
      addToast('Invalid or expired promotional code', 'error');
      return { success: false, message: 'Invalid promo code. Try PHARMA10' };
    }
  };

  // Calculations
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0;
  const deliveryFee = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        deliveryFee,
        isFreeShipping,
        freeShippingProgress,
        shippingRemaining,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        grandTotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
