'use client';

import React from 'react';
import { X, Check, Sparkles, Share2, BookOpen, Clock, Heart, Calculator, Library, Calendar, Shield, Compass, Brain, Headphones, FileText, CheckSquare, Moon, Disc, HeartHandshake, CalendarCheck, Radio, Trophy, CalendarDays, Sun } from 'lucide-react';
import { FeatureItem } from '../data/features';

interface FeatureModalProps {
  feature: FeatureItem | null;
  onClose: () => void;
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

export const FeatureModal: React.FC<FeatureModalProps> = ({ feature, onClose }) => {
  if (!feature) return null;

  const IconComponent = ICON_MAP[feature.icon] || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-themed-strong shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl glass-card text-themed-muted hover:text-themed-heading hover:border-emerald-500/50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-emerald flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {feature.category === 'quran' && 'القرآن الكريم'}
                {feature.category === 'prayers' && 'الصلاة والقبلة'}
                {feature.category === 'azkar' && 'الأذكار والسبحة'}
                {feature.category === 'worship' && 'العبادات والزكاة'}
                {feature.category === 'library' && 'المكتبة والحديث'}
                {feature.category === 'tools' && 'التقويم والأدوات'}
              </span>
              {feature.badge && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  {feature.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-themed-heading">{feature.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-themed-sub text-base leading-relaxed mb-6 badge-bg-themed p-4 rounded-2xl border border-themed">
          {feature.fullDesc}
        </p>

        {/* Key Highlights */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            أبرز خصائص ومواصفات الميزة:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {feature.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 badge-bg-themed p-3 rounded-xl border border-themed text-sm text-themed-sub">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-themed">
          <span className="text-xs text-themed-muted">متاحة مجاناً بدون إعلانات في تطبيق نور الإسلام</span>
          <button
            onClick={onClose}
            className="bg-gradient-emerald text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 hover:scale-105 transition-transform"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
