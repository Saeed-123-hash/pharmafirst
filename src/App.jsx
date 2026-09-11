import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider, useCart } from './context/CartContext';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import SearchModal from './components/SearchModal';
import AccountModal from './components/AccountModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function MainLayout() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    // Show welcome screen on initial load
    return !sessionStorage.getItem('pharmafirst_welcomed_v1');
  });

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('pharmafirst_welcomed_v1', 'true');
    setShowWelcome(false);
  };

  const handleNavigate = (pageId, category = 'all') => {
    setActivePage(pageId);
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1. Opening Fullscreen Welcome Experience */}
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {/* 2. Main Sticky Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => handleNavigate(page)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            onExploreProducts={() => handleNavigate('products')}
            onSelectCategory={(slug) => handleNavigate('products', slug)}
            onViewDetails={(prod) => setSelectedProduct(prod)}
            onNavigate={(page) => handleNavigate(page)}
          />
        )}

        {activePage === 'products' && (
          <ProductsPage
            initialCategory={selectedCategory}
            onViewDetails={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activePage === 'categories' && (
          <ProductsPage
            initialCategory="all"
            onViewDetails={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            onProceedToCheckout={() => handleNavigate('checkout')}
            onContinueShopping={() => handleNavigate('products')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            onOrderComplete={() => handleNavigate('home')}
            onBackToCart={() => handleNavigate('cart')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onExploreProducts={() => handleNavigate('products')}
            onContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* 4. Comprehensive Global Footer */}
      <Footer onNavigate={(page) => handleNavigate(page)} />

      {/* 5. Slide-out Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout')}
        onNavigateToCart={() => handleNavigate('cart')}
        onContinueShopping={() => handleNavigate('products')}
      />

      {/* 6. Product Detail View Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(newProd) => setSelectedProduct(newProd)}
        />
      )}

      {/* 7. Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
        }}
        onExploreAll={(term) => {
          handleNavigate('products');
        }}
      />

      {/* 8. Account & Provider Portal Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </ToastProvider>
  );
}
