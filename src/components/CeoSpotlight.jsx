import React from 'react';
import { ShieldCheck, Quote, Award, CheckCircle2, Building2 } from 'lucide-react';
import { companyData } from '../data/company';

export default function CeoSpotlight({ onExploreAbout }) {
  const { ceo } = companyData;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-80 h-80 bg-brand-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 -mr-32 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Executive Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-600 via-sky-400 to-teal-400 opacity-20 blur-lg" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={ceo.image}
                  alt={ceo.name}
                  className="w-full h-auto object-cover object-center transform hover:scale-102 transition-transform duration-500"
                />

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      Executive Leadership
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight">{ceo.name}</h3>
                  <p className="text-xs text-sky-200 font-medium">{ceo.role}</p>
                  <p className="text-[11px] text-slate-300 font-light">{companyData.name}</p>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-4 -right-4 glass-panel px-4 py-3 rounded-2xl shadow-xl border border-sky-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">Pharma First</span>
                  <span className="block text-[10px] text-slate-500 font-medium">Distribution Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Philosophy & Mission */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/60 mb-4">
              <Award className="w-3.5 h-3.5 text-brand-600" />
              Executive Perspective
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-6">
              Empowering Healthcare Through{' '}
              <span className="text-brand-600">Reliable Distribution</span> &amp; Integrity
            </h2>

            {/* CEO Quote Box */}
            <div className="relative p-6 rounded-2xl bg-sky-50/60 border border-sky-100 mb-6 w-full">
              <Quote className="w-8 h-8 text-sky-300 absolute top-4 right-4" />
              <p className="text-slate-800 text-base sm:text-lg font-medium italic relative z-10 leading-relaxed mb-3">
                "{ceo.quote}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-brand-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {ceo.name} • {ceo.role}
                </span>
              </div>
            </div>

            {/* Extended Statement */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              {ceo.statement}
            </p>

            {/* Strategic Priorities Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              {ceo.keyPriorities.map((priority, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {priority}
                  </span>
                </div>
              ))}
            </div>

            {/* Link to Full About Us */}
            {onExploreAbout && (
              <button
                onClick={onExploreAbout}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200/80 transition-colors"
              >
                Read Full Company Vision &amp; Supply Chain Infrastructure
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
