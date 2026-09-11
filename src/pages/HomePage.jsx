import React from 'react';
import Hero from '../components/Hero';
import QuickCategories from '../components/QuickCategories';
import ProductGrid from '../components/ProductGrid';
import CeoSpotlight from '../components/CeoSpotlight';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactSection from '../components/ContactSection';
import { productsData } from '../data/products';

export default function HomePage({
  onExploreProducts,
  onSelectCategory,
  onViewDetails,
  onNavigate
}) {
  return (
    <div>
      {/* 1. Hero Section with 3D WebGL Canvas */}
      <Hero
        onExploreProducts={() => onNavigate('products')}
        onContactUs={() => {
          const el = document.getElementById('contact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('contact');
        }}
      />

      {/* 2. Quick Horizontal Categories */}
      <QuickCategories
        onSelectCategory={(slug) => {
          onSelectCategory(slug);
          onNavigate('products');
        }}
      />

      {/* 3. Featured Products Grid */}
      <ProductGrid
        products={productsData}
        onViewDetails={onViewDetails}
        onExploreMore={() => onNavigate('products')}
      />

      {/* 4. Leadership / CEO Spotlight */}
      <CeoSpotlight onExploreAbout={() => onNavigate('about')} />

      {/* 5. Why Choose Us 3D Feature Cards */}
      <WhyChooseUs />

      {/* 6. Contact & Inquiry Section */}
      <ContactSection />
    </div>
  );
}
