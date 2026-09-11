import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import Hero3D from './Hero3D';
import { companyData } from '../data/company';

export default function Hero({ onExploreProducts, onContactUs }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50 pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-slate-200/60">
      {/* Background medical ambient mesh */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Next-Generation Healthcare Supply Chain</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Trusted Pharmaceutical Distribution,{' '}
              <span className="bg-gradient-to-r from-brand-600 via-sky-600 to-teal-600 bg-clip-text text-transparent">
                Delivered Simply.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
              Explore pharmaceutical products and discover a smarter way to manage your healthcare product needs. Backed by verified cold-chain infrastructure, regulatory transparency, and certified manufacturer sourcing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactUs}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 shadow-sm hover:border-slate-400 transition-all duration-200 text-sm"
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Trust Metric Badges */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-200 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Verified Origin</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-lg sm:text-xl">
                  <Truck className="w-4 h-4 text-brand-600" />
                  <span>24-48h</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Rapid Dispatch</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-lg sm:text-xl">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>24/7</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Logistics Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Pharmaceutical Visual */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <Hero3D />
          </div>
        </div>
      </div>
    </section>
  );
}
