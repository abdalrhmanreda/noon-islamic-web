'use client';

import React from 'react';
import { Sparkles, ArrowLeft, BookOpen, Headphones, Brain, Share2, FileText, Clock, Compass, CheckSquare, Moon, Shield, Disc, HeartHandshake, Calculator, CalendarCheck, Calendar, Library, Radio, Trophy, CalendarDays, Sun } from 'lucide-react';
import { FeatureItem } from '../data/features';

interface FeatureCardProps {
  feature: FeatureItem;
  onSelect: (feature: FeatureItem) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Headphones,
  BrainWithSparkles: Brain,
  GitCompare: Share2,
  FileText,
  Share2,
  Clock,
  Compass,
  CheckSquare,
  Book: BookOpen,
  Moon,
  Shield,
  Disc,
  HeartHandshake,
  Calculator,
  CalendarCheck,
  Calendar,
  Library,
  Sparkles,
  Radio,
  Trophy,
  CalendarDays,
  Sun,
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onSelect }) => {
  const IconComponent = ICON_MAP[feature.icon] || Sparkles;

  return (
    <div
      onClick={() => onSelect(feature)}
      className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between cursor-pointer group border border-themed relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-gradient-emerald group-hover:scale-110 transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6 text-emerald-500 dark:text-emerald-400 group-hover:text-white transition-colors" />
          </div>

          {feature.badge && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
              {feature.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-themed-heading mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
          {feature.title}
        </h3>

        {/* Short Description */}
        <p className="text-themed-sub text-sm leading-relaxed line-clamp-3 mb-6 font-normal">
          {feature.shortDesc}
        </p>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-4 border-t border-themed">
        <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
          استكشف الميزة التفصيلية
        </span>
        <div className="w-8 h-8 rounded-full badge-bg-themed flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-themed-muted">
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
