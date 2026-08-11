'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, BookOpen, Compass, Heart, Calculator, Library, Calendar, Filter } from 'lucide-react';
import { FEATURES, CATEGORIES, FeatureItem } from '../data/features';
import { FeatureCard } from './FeatureCard';
import { FeatureModal } from './FeatureModal';

interface FeatureGridProps {
  initialSearchQuery?: string;
}

const CATEGORY_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  BookOpen,
  Compass,
  Heart,
  Calculator,
  Library,
  Calendar,
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({ initialSearchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  // Filter features based on active category and search query
  const filteredFeatures = useMemo(() => {
    return FEATURES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="features" className="py-20 relative section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
            <Filter className="w-3.5 h-3.5" />
            <span>موسوعة الخصائص (40+ ميزة)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-themed-heading mb-4">
            استكشف جميع مميزات <span className="text-gradient-emerald">نور الإسلام</span>
          </h2>
          <p className="text-themed-muted text-base">
            تصفح الخصائص مقسمة حسب التصنيفات الفقهية والإيمانية، أو استخدم شريط البحث للعثور المباشر على أداة معينة.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative glass-card rounded-2xl p-2 border border-themed-strong focus-within:border-emerald-500/50 shadow-xl transition-all">
            <div className="flex items-center gap-3 px-3">
              <Search className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن ميزة (مثل: المصحف، حاسبة الزكاة، البوصلة، التسابيح)..."
                className="w-full bg-transparent text-themed-main placeholder-[var(--text-muted)] text-sm sm:text-base focus:outline-none py-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-themed-muted hover:text-themed-heading px-2 py-1 badge-bg-themed rounded-lg"
                >
                  مسح
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const IconComp = CATEGORY_ICON_MAP[cat.icon] || Sparkles;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-emerald text-white shadow-lg shadow-emerald-600/30 scale-105'
                    : 'glass-card text-themed-sub hover:text-themed-heading border border-themed'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500 dark:text-emerald-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between mb-6 px-2 text-sm text-themed-muted">
          <span>
            تم العثور على <strong className="text-emerald-500 dark:text-emerald-400 font-bold">{filteredFeatures.length}</strong> ميزة
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
            >
              إعادة عرض الكل
            </button>
          )}
        </div>

        {/* Feature Grid */}
        {filteredFeatures.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onSelect={(item) => setSelectedFeature(item)}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto my-12 border border-themed">
            <Sparkles className="w-12 h-12 text-amber-500 dark:text-amber-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-themed-heading mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-themed-muted text-sm mb-6">
              لم نجد ميزة تطابق بحثك &quot;{searchQuery}&quot;. جرب كلمات أخرى أو اختر تصنيفاً آخر.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-emerald text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg"
            >
              إعادة الضبط
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </section>
  );
};
