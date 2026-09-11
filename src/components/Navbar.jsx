import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, Pill, ShieldCheck, Phone, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { companyData } from '../data/company';

export default function Navbar({ activePage, setActivePage, onOpenSearch, onOpenAccount }) {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner with Quick Medical Notice & Contact */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certified Cold-Chain &amp; GDP Distribution
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Fast Wholesale &amp; Retail Healthcare Dispatch</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${companyData.contact.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{companyData.contact.phoneDisplay}</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{companyData.contact.businessHours}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-sm py-3' : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Treatment */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Pharma First Enterprises Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-brand-700 via-sky-600 to-emerald-500 p-[2px] shadow-sm group-hover:shadow-glow transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
                  <path d="M20 7v26M7 20h26" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="5.5" fill="#10b981" />
                </svg>
              </div>
            </div>
            <div>
              <span className="block font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                PHARMA FIRST
              </span>
              <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sky-700">
                Enterprises
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 relative ${
                    isActive
                      ? 'text-brand-700 font-semibold bg-brand-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons (Search, Account, Cart, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition-colors relative"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Trigger */}
            <button
              onClick={onOpenAccount}
              className="p-2.5 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition-colors hidden sm:flex items-center gap-1.5"
              title="Account / Provider Portal"
              aria-label="Account / Provider Portal"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium text-slate-700">Account</span>
            </button>

            {/* Shopping Cart Trigger with Animated Badge */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-brand-50 hover:bg-brand-100/80 text-brand-700 border border-brand-200/60 transition-all duration-200 flex items-center gap-2 group"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="hidden sm:inline font-semibold text-xs">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden transition-colors ml-1"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/60 backdrop-blur-sm transition-opacity">
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
                  P
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">PHARMA FIRST</div>
                  <div className="text-[10px] text-sky-600 font-semibold uppercase">Enterprises</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 flex flex-col gap-2 flex-grow">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 font-medium"
                >
                  <User className="w-5 h-5 text-brand-600" />
                  <span>Healthcare Provider Portal</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 font-medium mt-1"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-brand-600" />
                    <span>Shopping Cart</span>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-100 text-brand-700">
                    {itemCount} items
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Contact Footer */}
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex flex-col gap-1.5">
              <span className="font-semibold text-slate-700">Customer Support:</span>
              <a href={`tel:${companyData.contact.phone}`} className="text-brand-600 font-medium">
                {companyData.contact.phoneDisplay}
              </a>
              <span className="text-[11px]">{companyData.contact.businessHours}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
