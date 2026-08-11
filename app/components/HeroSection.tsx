'use client';

import React from 'react';
import Image from 'next/image';
import { Download, Sparkles, CheckCircle2, Star, Play, Apple, Smartphone, ShieldCheck, Heart } from 'lucide-react';
import yusrLogo from '../../public/yusr_logo.png';
import yusrAppQuran from '../../public/yusr_app_quran.png';
import yusrAppHome from '../../public/yusr_app_home.png';
import yusrAppTafseer from '../../public/yusr_app_tafseer.png';

export const HeroSection: React.FC = () => {
  const iosUrl = "https://apps.apple.com/eg/app/%D9%8A%D8%B3%D8%B1-yusr/id6759193445";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.nooralhuda.noor";

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 overflow-hidden section-bg">
      {/* Background Decorative Ambient Blur Elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Hero Content & Call to Action */}
          <div className="lg:col-span-6 flex flex-col text-right">
            
            {/* Top Hadith Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-amber-500/40 text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-serif font-semibold w-fit mb-6 shadow-xl shadow-amber-500/5 hover:border-amber-400/50 transition-colors">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>تطبيق يُسْر (Yusr) • «الدَّالُّ على الخيرِ كفاعلِه»</span>
            </div>

            {/* Main Headline with High-Contrast Logo Badge */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white logo-badge-container p-1.5 flex items-center justify-center shadow-2xl shrink-0">
                <Image
                  src={yusrLogo}
                  alt="شعار يُسْر"
                  width={75}
                  height={75}
                  priority
                  className="w-full h-full object-contain filter contrast-125"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] mb-4 tracking-tight text-themed-heading">
                تطبيق <span className="text-gradient-emerald font-serif">يُسْر — Yusr</span>
              </h1>
            </div>

            {/* Subtitle / Slogan */}
            <p className="text-2xl sm:text-3xl text-amber-600 dark:text-amber-300 font-serif font-bold mb-6 leading-snug">
              رفيقك اليومي في القرآن والأذكار ومواقيت الصلاة 🌙
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg opacity-90 font-normal leading-relaxed mb-8 max-w-2xl text-themed-sub">
              تطبيق <strong className="text-emerald-600 dark:text-emerald-400 font-bold">يُسْر (Yusr)</strong> يجمع لك المصحف الشريف بالصفحات مع التفسير الفوري، تلاوات خاشعة، مواقيت الصلاة والأذان، حاسبة الزكاة الشرعية، وحصن المسلم بدون إعلانات وبدون اتصال بالإنترنت.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-3 gap-2.5 mb-10 text-xs sm:text-sm font-semibold">
              <div className="flex items-center justify-center gap-2 glass-card px-3 py-3 rounded-2xl border border-emerald-500/20 text-themed-sub">
                <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>بدون إعلانات</span>
              </div>
              <div className="flex items-center justify-center gap-2 glass-card px-3 py-3 rounded-2xl border border-emerald-500/20 text-themed-sub">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>عمل كامل أوفلاين</span>
              </div>
              <div className="flex items-center justify-center gap-2 glass-card px-3 py-3 rounded-2xl border border-emerald-500/20 text-themed-sub">
                <Heart className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>مجاني بالكامل 100%</span>
              </div>
            </div>

            {/* Download CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4" id="download">
              {/* iOS Button */}
              <a
                href={iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 text-themed-heading font-bold px-7 py-4 rounded-2xl border border-themed-strong hover:border-amber-400/60 shadow-xl shadow-amber-500/5 hover:scale-105 transition-all duration-300 flex items-center gap-3 text-base"
              >
                <Apple className="w-6 h-6 text-amber-500 dark:text-amber-400 shrink-0" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-themed-muted font-normal">تحميل لنظام iOS</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </a>

              {/* Android Button */}
              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-emerald hover:brightness-110 text-white font-bold px-7 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-3 text-base"
              >
                <Smartphone className="w-6 h-6 shrink-0" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-emerald-100 font-normal">تحميل لنظام أندرويد</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </a>

              {/* Feature Videos Button */}
              <a
                href="#feature-videos"
                className="glass-card hover:bg-emerald-500/15 text-themed-sub font-semibold px-5 py-4 rounded-2xl border border-emerald-500/30 transition-all flex items-center gap-2 text-sm"
              >
                <Play className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>شاهد الفيديو</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-themed">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-themed-muted">تقييم 4.9 على المتاجر</p>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div>
                <p className="text-lg font-bold text-themed-heading">40+ ميزة</p>
                <p className="text-xs text-themed-muted">إيمانية وفقهية</p>
              </div>
              <div className="h-8 w-px bg-[var(--border-color)]" />
              <div>
                <p className="text-lg font-bold text-themed-heading">100%</p>
                <p className="text-xs text-themed-muted">خالي من الإعلانات</p>
              </div>
            </div>

          </div>

          {/* Left Column: Clean Raw Screenshots Showcase (NO FRAMES) */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-amber-500/15 to-emerald-600/20 rounded-full blur-3xl transform scale-110 pointer-events-none" />

            {/* Overlapping Raw App Screenshots Layout (NO ARTIFICIAL FRAMES) */}
            <div className="relative w-full max-w-lg h-[460px] sm:h-[540px] flex items-center justify-center">
              
              {/* Image 1: Left - Quran Screen */}
              <div className="absolute -left-2 sm:left-2 top-8 w-44 sm:w-56 aspect-[9/19] rounded-[28px] sm:rounded-[36px] shadow-2xl transform -rotate-6 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-500 z-10 overflow-hidden">
                <Image
                  src={yusrAppQuran}
                  alt="المصحف الشريف بالخط العثماني"
                  fill
                  sizes="(max-width: 640px) 180px, 230px"
                  className="object-cover"
                />
              </div>

              {/* Image 2: Center (Featured) - Main Home Screen */}
              <div className="absolute z-20 w-48 sm:w-60 aspect-[9/19] rounded-[30px] sm:rounded-[38px] shadow-2xl shadow-emerald-950/40 transform hover:scale-105 transition-all duration-500 overflow-hidden">
                <Image
                  src={yusrAppHome}
                  alt="واجهة تطبيق يُسْر الرئيسية ومواقيت الصلاة"
                  fill
                  priority
                  sizes="(max-width: 640px) 200px, 250px"
                  className="object-cover"
                />
              </div>

              {/* Image 3: Right - Tafseer Screen */}
              <div className="absolute -right-2 sm:right-2 top-8 w-44 sm:w-56 aspect-[9/19] rounded-[28px] sm:rounded-[36px] shadow-2xl transform rotate-6 hover:rotate-0 hover:z-30 hover:scale-105 transition-all duration-500 z-10 overflow-hidden">
                <Image
                  src={yusrAppTafseer}
                  alt="التفسير المباشر لآيات القرآن"
                  fill
                  sizes="(max-width: 640px) 180px, 230px"
                  className="object-cover"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
