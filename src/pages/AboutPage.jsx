import React from 'react';
import {
  ShieldCheck,
  Target,
  Eye,
  HeartHandshake,
  Truck,
  Building,
  CheckCircle2,
  Quote,
  Layers,
  ArrowRight
} from 'lucide-react';
import { companyData } from '../data/company';

export default function AboutPage({ onExploreProducts, onContact }) {
  const { about, ceo } = companyData;

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <span>Company</span>
            <span>/</span>
            <span className="text-brand-600">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            About Pharma First Enterprises
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Pharma First Enterprises is an online medicine distribution and pharmaceutical products business established to streamline dependable healthcare supply chain access for clinics, pharmacies, and patients.
          </p>
        </div>

        {/* Mission, Vision, Commitment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{about.mission}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Reliable Supply Standards</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{about.vision}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-sky-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Technological Progress</span>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Commitment</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{about.commitment}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Patient &amp; Provider Safety</span>
            </div>
          </div>
        </div>

        {/* CEO Leadership Feature Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100">
                <img
                  src={ceo.image}
                  alt={ceo.name}
                  className="w-full h-auto object-cover object-center"
                />
                <div className="p-4 bg-slate-900 text-white">
                  <h4 className="font-bold text-base text-white">{ceo.name}</h4>
                  <p className="text-xs text-sky-300">{ceo.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{companyData.name}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                Executive Leadership Statement
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Leadership Built on Pharmaceutical Trust &amp; Cold-Chain Integrity
              </h2>

              <div className="relative p-6 rounded-2xl bg-sky-50 border border-sky-100">
                <Quote className="w-6 h-6 text-sky-300 absolute top-4 right-4" />
                <p className="text-slate-800 text-base font-medium italic leading-relaxed">
                  "{ceo.quote}"
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {ceo.statement}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Executive Operational Pillars
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  {ceo.keyPriorities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Network Highlights */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Supply Chain Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Integrated Pharmaceutical Logistics &amp; Distribution
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {about.distributionNetwork} Every product batch is handled under Good Distribution Practice (GDP) protocols, with rigorous temperature validation throughout handling and transit.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg transition-colors flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContact}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors"
              >
                Contact Logistics Department
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
