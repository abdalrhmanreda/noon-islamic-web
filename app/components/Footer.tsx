'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Download, ShieldCheck, Apple, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  const iosUrl = "https://apps.apple.com/eg/app/%D9%8A%D8%B3%D8%B1-yusr/id6759193445";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.nooralhuda.noor";

  return (
    <footer className="border-t border-themed pt-16 pb-12 section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white logo-badge-container p-1 flex items-center justify-center shadow-lg">
                <Image
                  src="/yusr_logo.png"
                  alt="شعار يُسْر"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain filter contrast-125"
                />
              </div>
              <span className="text-2xl font-black flex items-center gap-1.5 font-serif text-themed-heading">
                تطبيق يُسْر (Yusr)
                <Sparkles className="w-4 h-4 text-amber-500" />
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-themed-muted">
              رفيقك اليومي في القرآن والأذكار ومواقيت الصلاة. تطبيق إسلامي كامل بدون إعلانات وبدون اتصال بالإنترنت.
            </p>

            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-600 dark:text-amber-300 font-serif font-semibold w-fit">
              «الدَّالُّ على الخيرِ كفاعلِه»
            </div>

            {/* Store Download Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover:bg-amber-500/10 font-medium text-xs px-4 py-2.5 rounded-xl border border-amber-500/30 transition-all flex items-center gap-2"
              >
                <Apple className="w-4 h-4 text-amber-500" />
                <span>تحميل iOS (App Store)</span>
              </a>

              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-emerald text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>تحميل أندرويد (Google Play)</span>
              </a>
            </div>
          </div>

          {/* Nav Col 1: Quran */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-themed-heading">القرآن الكريم والتلاوات</h4>
            <ul className="space-y-2.5 text-xs text-themed-muted">
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">المصحف الإلكتروني الكامل</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">التفسير المباشر وأسباب النزول</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">اختبار وتقييم الحفظ الذكي</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">متشابهات القرآن الكريم</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">بطاقات مشاركة الآيات</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Prayers & Zakat */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-themed-heading">الصلاة والعبادات</h4>
            <ul className="space-y-2.5 text-xs text-themed-muted">
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">مواقيت الصلاة والأذان</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">بوصلة اتجاه القبلة الدقيقة</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">حاسبة الزكاة (مال، ذهب، زروع)</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">حصن المسلم والرقية الشرعية</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">المسبحة الإلكترونية الذكية</a></li>
            </ul>
          </div>

          {/* Nav Col 3: Library & Tools */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-themed-heading">المكتبة والعلوم</h4>
            <ul className="space-y-2.5 text-xs text-themed-muted">
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">صحيح البخاري والنووية</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">أسماء الله الحسنى 99</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">الإذاعات الإسلامية 24/7</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">التقويم ومحول التاريخ الهجري</a></li>
              <li><a href="#features" className="hover:text-emerald-500 transition-colors">المسابقات والإنجازات اليومية</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-themed flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-themed-muted">
          <p className="flex items-center gap-1">
            تم التطوير بحب وإتقان لخدمة المسلمين • تطبيق <span className="text-emerald-500 font-bold">يُسْر (Yusr)</span> © 2026
          </p>

          <div className="flex items-center gap-4">
            <a href={iosUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              <Apple className="w-3.5 h-3.5" />
              <span>iOS</span>
            </a>
            <a href={androidUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
