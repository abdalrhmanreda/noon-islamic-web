'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';

const SHOWCASE_VIDEOS = [
  {
    id: 'home',
    title: 'الشاشة الرئيسية ومواقيت الصلاة',
    subtitle: 'العد التنازلي للأذان، أوقات الصلوات الخمس وشبكة الخدمات الإيمانية السريعة',
    video: 'https://res.cloudinary.com/drgptawcj/video/upload/v1786395629/%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D9%87_zfpvue.mp4',
    tag: 'الرئيسية',
    accent: 'emerald',
  },
  {
    id: 'quran',
    title: 'المصحف الشريف والتلاوات',
    subtitle: 'قراءة سلسة بالصفحات، خط عثماني واضح، وحفظ التلاوة والعلامات التلقائية',
    video: 'https://res.cloudinary.com/drgptawcj/video/upload/v1786395755/%D9%82%D8%B1%D8%A7%D9%86_b9wctm.mp4',
    tag: 'القرآن الكريم',
    accent: 'amber',
  },
  {
    id: 'hadith',
    title: 'الأحاديث النبوية الشريفة',
    subtitle: 'صحيح البخاري والأربعون النووية مع الشرح والتخريج المفصل',
    video: 'https://res.cloudinary.com/drgptawcj/video/upload/v1786395731/%D8%A7%D8%AD%D8%A7%D8%AF%D9%8A%D8%AB_bbbpgg.mp4',
    tag: 'الأحاديث',
    accent: 'violet',
  },
];

const ACCENT_STYLES: Record<string, { ring: string; tag: string; glow: string }> = {
  emerald: {
    ring: 'ring-emerald-500/50',
    tag: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    glow: 'shadow-emerald-500/30',
  },
  amber: {
    ring: 'ring-amber-500/50',
    tag: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    glow: 'shadow-amber-500/30',
  },
  violet: {
    ring: 'ring-violet-500/50',
    tag: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    glow: 'shadow-violet-500/30',
  },
};

export const AppScreenshotsGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = SHOWCASE_VIDEOS[activeIdx];
  const accent = ACCENT_STYLES[current.accent];

  /* Auto-play on switch */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
    setIsPlaying(true);
  }, [activeIdx]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const goNext = () => setActiveIdx((p) => (p < SHOWCASE_VIDEOS.length - 1 ? p + 1 : 0));
  const goPrev = () => setActiveIdx((p) => (p > 0 ? p - 1 : SHOWCASE_VIDEOS.length - 1));

  return (
    <section className="py-20 relative section-bg border-t border-themed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
            <Smartphone className="w-4 h-4" />
            <span>معرض واجهات التطبيق الحقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-themed-heading mb-4">
            استعرض واجهات تطبيق <span className="text-gradient-emerald">يُسْر (Yusr)</span> الأصلية
          </h2>
          <p className="text-themed-muted text-base">
            شاهد التصميم العصري والسهل للواجهات الفعلية المتاحة على الأجهزة الذكية.
          </p>
        </div>

        {/* Showcase Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-themed-strong shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Info Side */}
            <div className="md:col-span-5 text-right space-y-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${accent.tag}`}>
                {current.tag}
              </span>
              <h3 className="text-2xl font-bold text-themed-heading">
                {current.title}
              </h3>
              <p className="text-themed-sub text-sm leading-relaxed">
                {current.subtitle}
              </p>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={goPrev}
                  className="p-3 rounded-xl glass-card text-themed-muted hover:text-themed-heading hover:border-emerald-500/50"
                  title="السابق"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-themed-muted">
                  {activeIdx + 1} من {SHOWCASE_VIDEOS.length}
                </span>
                <button
                  onClick={goNext}
                  className="p-3 rounded-xl glass-card text-themed-muted hover:text-themed-heading hover:border-emerald-500/50"
                  title="التالي"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player in Phone Frame */}
            <div className="md:col-span-7 flex justify-center">
              <div className={`relative w-64 sm:w-72 aspect-[9/19.5] rounded-[32px] overflow-hidden shadow-2xl ${accent.glow} ring-2 ${accent.ring}`}>
                {/* Dynamic island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-black rounded-full" />

                {/* Video */}
                <video
                  ref={videoRef}
                  key={current.id}
                  className="w-full h-full object-cover bg-black"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={current.video} type="video/mp4" />
                </video>

                {/* Play/Pause overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center group cursor-pointer"
                  aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300 ${
                      isPlaying
                        ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    )}
                  </div>
                </button>

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Home indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-30" />
              </div>
            </div>

          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {SHOWCASE_VIDEOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIdx
                  ? 'w-8 h-2.5 bg-emerald-500'
                  : 'w-2.5 h-2.5 bg-[var(--border-color)] hover:bg-emerald-500/50'
              }`}
              aria-label={`عرض ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
