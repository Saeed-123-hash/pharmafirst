import React from 'react';
import { Pill, Activity, ShieldCheck, Sparkles, PackagePlus, Flame, ChevronRight } from 'lucide-react';
import { categoriesData } from '../data/categories';

// Dynamic Lucide icon mapping
const iconMap = {
  Pill: Pill,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  PackagePlus: PackagePlus,
  Flame: Flame,
};

export default function QuickCategories({ onSelectCategory }) {
  return (
    <section className="py-12 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Curated Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Browse by Healthcare Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Category Grid / Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesData.map((category) => {
            const IconComponent = iconMap[category.icon] || Pill;

            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.slug)}
                className="group relative cursor-pointer rounded-2xl p-4 bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 flex flex-col items-start justify-between min-h-[160px] transform hover:-translate-y-1.5"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(category.slug)}
              >
                {/* Icon Container with Gradient Hover */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${category.bgLight} group-hover:scale-110 group-hover:shadow-sm`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Category Info */}
                <div className="w-full">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs text-slate-400 font-medium">
                      {category.itemCount} items
                    </span>
                    {category.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 group-hover:bg-brand-100 group-hover:text-brand-800 transition-colors">
                        {category.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-brand-600 transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                </div>

                {/* Subtle bottom indicator */}
                <div className="w-full h-0.5 bg-transparent group-hover:bg-brand-500 rounded-full mt-3 transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
