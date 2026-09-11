import React from 'react';
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  Headphones,
  Lock,
  ThermometerSnowflake,
  Sparkles
} from 'lucide-react';
import { featuresData } from '../data/features';

const iconMap = {
  Truck: Truck,
  ShieldCheck: ShieldCheck,
  ShoppingBag: ShoppingBag,
  Headphones: Headphones,
  Lock: Lock,
  ThermometerSnowflake: ThermometerSnowflake,
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200/60 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Operational Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Healthcare Partners Choose Pharma First
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Engineered for pharmacies, hospitals, clinics, and private consumers who demand transparency, verified regulatory compliance, and rapid logistics.
          </p>
        </div>

        {/* Features 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feat) => {
            const IconComp = iconMap[feat.icon] || ShieldCheck;

            return (
              <div
                key={feat.id}
                className="group relative p-8 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon and Highlight Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200/60 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                      {feat.highlight}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom decorative bar */}
                <div className="w-12 h-1 bg-slate-200 group-hover:w-full group-hover:bg-brand-500 rounded-full mt-6 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
