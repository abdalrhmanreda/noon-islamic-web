'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  BookOpen,
  Calculator,
  GraduationCap,
  ScrollText,
  Heart,
  HandHelping,
  UtensilsCrossed,
  Clock,
  CalendarDays,
  Settings,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
} from 'lucide-react';

interface FeatureVideo {
  id: string;
  title: string;
  icon: React.ElementType;
  videoUrl: string;
  color: string;
  glowColor: string;
}

const FEATURE_VIDEOS: FeatureVideo[] = [
  {
    id: 'quran',
    title: 'القرآن الكريم',
    icon: BookOpen,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395755/%D9%82%D8%B1%D8%A7%D9%86_b9wctm.mp4',
    color: 'emerald',
    glowColor: 'rgba(16, 185, 129, 0.35)',
  },
  {
    id: 'salah',
    title: 'الصلاة',
    icon: Clock,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395629/%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D9%87_zfpvue.mp4',
    color: 'blue',
    glowColor: 'rgba(59, 130, 246, 0.35)',
  },
  {
    id: 'zakat',
    title: 'الزكاة',
    icon: Calculator,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395751/%D8%A7%D9%84%D8%B2%D9%83%D8%A7%D9%87_txpz50.mp4',
    color: 'amber',
    glowColor: 'rgba(245, 158, 11, 0.35)',
  },
  {
    id: 'hadith',
    title: 'الأحاديث',
    icon: ScrollText,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395731/%D8%A7%D8%AD%D8%A7%D8%AF%D9%8A%D8%AB_bbbpgg.mp4',
    color: 'violet',
    glowColor: 'rgba(139, 92, 246, 0.35)',
  },
  {
    id: 'ilm',
    title: 'العلم',
    icon: GraduationCap,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395741/%D8%A7%D9%84%D8%B9%D9%84%D9%85_nsxznd.mp4',
    color: 'cyan',
    glowColor: 'rgba(6, 182, 212, 0.35)',
  },
  {
    id: 'tazkiya',
    title: 'تزكية النفس',
    icon: Heart,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395727/%D8%AA%D8%B2%D9%83%D9%8A%D9%87_%D8%A7%D9%84%D9%86%D9%81%D8%B3_muvodw.mp4',
    color: 'rose',
    glowColor: 'rgba(244, 63, 94, 0.35)',
  },
  {
    id: 'duaa',
    title: 'الأدعية',
    icon: HandHelping,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395716/%D8%A7%D9%84%D8%A7%D8%AF%D8%B9%D9%8A%D9%87_zbaqy0.mp4',
    color: 'teal',
    glowColor: 'rgba(20, 184, 166, 0.35)',
  },
  {
    id: 'siyam',
    title: 'الصيام',
    icon: UtensilsCrossed,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395678/%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%85_zytuca.mp4',
    color: 'orange',
    glowColor: 'rgba(249, 115, 22, 0.35)',
  },
  {
    id: 'hijri',
    title: 'التقويم الهجري',
    icon: CalendarDays,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786395618/%D8%AA%D9%82%D9%88%D9%8A%D9%85_%D9%87%D8%AC%D8%B1%D9%8A_tpixhf.mp4',
    color: 'indigo',
    glowColor: 'rgba(99, 102, 241, 0.35)',
  },
  {
    id: 'settings',
    title: 'الإعدادات',
    icon: Settings,
    videoUrl:
      'https://res.cloudinary.com/drgptawcj/video/upload/v1786396811/settings_cepqqp.mp4',
    color: 'slate',
    glowColor: 'rgba(148, 163, 184, 0.35)',
  },
];

/* Tailwind-safe color map */
const COLOR_MAP: Record<string, { bg: string; text: string; border: string; ring: string; bgFaint: string }> = {
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500 dark:text-emerald-400', border: 'border-emerald-500/40', ring: 'ring-emerald-500/50', bgFaint: 'bg-emerald-500/10' },
  blue:    { bg: 'bg-blue-500',    text: 'text-blue-500 dark:text-blue-400',    border: 'border-blue-500/40',    ring: 'ring-blue-500/50',    bgFaint: 'bg-blue-500/10' },
  amber:   { bg: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400',   border: 'border-amber-500/40',   ring: 'ring-amber-500/50',   bgFaint: 'bg-amber-500/10' },
  violet:  { bg: 'bg-violet-500',  text: 'text-violet-600 dark:text-violet-400',  border: 'border-violet-500/40',  ring: 'ring-violet-500/50',  bgFaint: 'bg-violet-500/10' },
  cyan:    { bg: 'bg-cyan-500',    text: 'text-cyan-600 dark:text-cyan-400',    border: 'border-cyan-500/40',    ring: 'ring-cyan-500/50',    bgFaint: 'bg-cyan-500/10' },
  rose:    { bg: 'bg-rose-500',    text: 'text-rose-600 dark:text-rose-400',    border: 'border-rose-500/40',    ring: 'ring-rose-500/50',    bgFaint: 'bg-rose-500/10' },
  teal:    { bg: 'bg-teal-500',    text: 'text-teal-600 dark:text-teal-400',    border: 'border-teal-500/40',    ring: 'ring-teal-500/50',    bgFaint: 'bg-teal-500/10' },
  orange:  { bg: 'bg-orange-500',  text: 'text-orange-600 dark:text-orange-400',  border: 'border-orange-500/40',  ring: 'ring-orange-500/50',  bgFaint: 'bg-orange-500/10' },
  indigo:  { bg: 'bg-indigo-500',  text: 'text-indigo-600 dark:text-indigo-400',  border: 'border-indigo-500/40',  ring: 'ring-indigo-500/50',  bgFaint: 'bg-indigo-500/10' },
  slate:   { bg: 'bg-slate-500',   text: 'text-slate-600 dark:text-slate-400',   border: 'border-slate-500/40',   ring: 'ring-slate-500/50',   bgFaint: 'bg-slate-400/10' },
};

export const FeatureVideos: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  const active = FEATURE_VIDEOS[activeIdx];
  const colors = COLOR_MAP[active.color];

  /* Play / Pause toggle */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  /* Mute toggle */
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  /* Fullscreen */
  const goFullscreen = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  }, []);

  /* Progress tracker */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, [activeIdx]);

  /* Auto-play on switch */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
    setIsPlaying(true);
    setProgress(0);
  }, [activeIdx]);

  /* Scroll active thumbnail into view */
  useEffect(() => {
    const strip = thumbnailStripRef.current;
    if (!strip) return;
    const btn = strip.children[activeIdx] as HTMLElement | undefined;
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeIdx]);

  return (
    <section
      id="feature-videos"
      className="py-24 relative overflow-hidden section-bg"
    >
      {/* Ambient background blurs */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-colors duration-700 opacity-60 dark:opacity-100"
        style={{ backgroundColor: active.glowColor }}
      />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-5">
            <Film className="w-4 h-4" />
            <span>شاهد المميزات بالفيديو</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-themed-heading mb-4 leading-tight">
            اكتشف مميزات تطبيق{' '}
            <span className="text-gradient-emerald font-serif">يُسْر</span>{' '}
            مباشرة
          </h2>
          <p className="text-themed-muted text-base sm:text-lg max-w-2xl mx-auto">
            استعرض فيديوهات حقيقية من داخل التطبيق لتتعرف على كل ميزة قبل التحميل
          </p>
        </div>

        {/* ========= SPOTLIGHT VIDEO PLAYER (NO ARTIFICIAL FRAME) ========= */}
        <div className="max-w-md mx-auto mb-12">
          {/* Clean Rounded Video Container */}
          <div
            className="relative rounded-[32px] overflow-hidden aspect-[9/19.5] shadow-2xl transition-all duration-700 bg-black"
            style={{
              boxShadow: `0 25px 60px -15px ${active.glowColor}`,
            }}
          >
            {/* The video */}
            <video
              ref={videoRef}
              key={active.id}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
            >
              <source src={active.videoUrl} type="video/mp4" />
            </video>

            {/* Gradient overlay at bottom for controls */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

            {/* Play / pause overlay tap area */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex items-center justify-center group cursor-pointer"
              aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
            >
              <div
                className={`w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300 ${
                  isPlaying
                    ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                    : 'opacity-100 scale-100'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 text-white" />
                ) : (
                  <Play className="w-7 h-7 text-white ml-1" />
                )}
              </div>
            </button>

            {/* Bottom controls bar */}
            <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-between gap-3">
              {/* Progress bar */}
              <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${active.glowColor}, white)`,
                  }}
                />
              </div>
              {/* Mute button */}
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
                aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              {/* Fullscreen */}
              <button
                onClick={goFullscreen}
                className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white transition-colors"
                aria-label="ملء الشاشة"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature title beneath spotlight */}
          <div className="text-center mt-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bgFaint} ${colors.border} border ${colors.text} text-sm font-bold transition-all duration-500`}>
              {React.createElement(active.icon, { className: 'w-5 h-5' })}
              <span>{active.title}</span>
            </div>
          </div>
        </div>

        {/* ========= THUMBNAIL STRIP ========= */}
        <div
          ref={thumbnailStripRef}
          className="flex items-center gap-3 overflow-x-auto pb-3 px-2 snap-x snap-mandatory scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {FEATURE_VIDEOS.map((feat, idx) => {
            const isActive = idx === activeIdx;
            const c = COLOR_MAP[feat.color];
            const Icon = feat.icon;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveIdx(idx)}
                className={`
                  group relative flex-shrink-0 snap-center flex flex-col items-center gap-2
                  px-5 py-4 rounded-2xl border transition-all duration-300
                  ${
                    isActive
                      ? `${c.bgFaint} ${c.border} ${c.text} scale-105 shadow-lg`
                      : 'glass-card border-themed text-themed-muted hover:text-themed-heading'
                  }
                `}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${c.bg} animate-pulse`} />
                )}
                <Icon className={`w-6 h-6 transition-colors ${isActive ? c.text : 'text-themed-muted'}`} />
                <span className="text-xs font-semibold whitespace-nowrap">{feat.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
