'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Download,
  Copy,
  Check,
  Printer,
  Star,
  Apple,
  Smartphone,
  ShieldCheck,
  WifiOff,
  BookOpen,
  Compass,
  Heart,
  Moon,
  Sun,
  Layers,
  Share2
} from 'lucide-react';
import yusrLogo from '../../public/yusr_logo.png';
import yusrAppHome from '../../public/yusr_app_home.png';
import yusrAppQuran from '../../public/yusr_app_quran.png';
import yusrAppTafseer from '../../public/yusr_app_tafseer.png';

// Two posters per printed sheet, stacked for cutting.
const COPIES_PER_PAGE = 2;
const COPY_GAP = '6mm';

export default function PosterPage() {
  const [aspectRatio, setAspectRatio] = useState<'square' | 'story' | 'landscape'>('square');
  const [colorMode, setColorMode] = useState<'black' | 'white'>('white');
  const [swappedImages, setSwappedImages] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const iosUrl = "https://apps.apple.com/eg/app/%D9%8A%D8%B3%D8%B1-yusr/id6759193445";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.nooralhuda.noor";

  // Pure black & white QR codes
  const iosQrDark = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(iosUrl)}&margin=10&color=000000&bgcolor=ffffff`;
  const androidQrDark = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(androidUrl)}&margin=10&color=000000&bgcolor=ffffff`;

  const copyPostText = () => {
    const text = `🌙 تطبيق «يُسْر — Yusr» | رفيقك اليومي في القرآن والأذكار ومواقيت الصلاة

✨ ميزات التطبيق:
• مجاني 100% وبدون أي إعلانات
• يعمل بالكامل بدون إنترنت (أوفلاين)
• المصحف الشريف بالرسم العثماني مع التفسير
• مواقيت الصلاة الدقيقة والأذان واتجاه القبلة
• حصن المسلم، الأذكار، والسبحة الإلكترونية

📲 روابط التحميل:
🍏 App Store (iOS): ${iosUrl}
🤖 Google Play: ${androidUrl}

«الدَّالُّ عَلَى الخَيْرِ كَفَاعِلِهِ» 🤍`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Print a high-resolution raster of the live DOM instead of letting the
  // print engine re-render the CSS. Guarantees the sheet matches the screen
  // (soft shadows, rounded corners, blurs) on every browser.
  const printSnapshot = (dataUrl: string) => {
    const orientation = aspectRatio === 'landscape' ? 'landscape' : 'portrait';
    const frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(frame);

    const doc = frame.contentDocument;
    if (!doc) {
      frame.remove();
      window.print();
      return;
    }

    // Two copies stacked on one sheet, each capped at half the page height.
    doc.open();
    doc.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
        '@page { size: A4 ' + orientation + '; margin: 8mm; }' +
        'html,body{margin:0;padding:0;height:100%;}' +
        'body{display:flex;flex-direction:column;align-items:center;' +
        'justify-content:center;gap:' + COPY_GAP + ';height:100%;}' +
        'img{max-width:100%;max-height:calc((100% - ' + COPY_GAP + ') / ' + COPIES_PER_PAGE + ');' +
        'display:block;object-fit:contain;' +
        '-webkit-print-color-adjust:exact;print-color-adjust:exact;}' +
        '</style></head><body></body></html>'
    );
    doc.close();

    let loaded = 0;
    const onEach = () => {
      if (++loaded < COPIES_PER_PAGE) return;
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 3000);
    };

    for (let i = 0; i < COPIES_PER_PAGE; i++) {
      const img = doc.createElement('img');
      img.onload = onEach;
      img.onerror = onEach;
      img.src = dataUrl;
      doc.body.appendChild(img);
    }
  };

  const handlePrint = async () => {
    const node = posterRef.current;
    if (!node || isExporting) return;

    setIsExporting(true);
    try {
      // modern-screenshot renders through an SVG <foreignObject>, so the
      // browser itself lays out the page: Arabic shaping/bidi, CSS filters
      // and shadows all come out exactly as on screen. Canvas-based
      // rasterizers draw text glyph-by-glyph and break Arabic.
      const { domToPng } = await import('modern-screenshot');
      await document.fonts?.ready;

      const dataUrl = await domToPng(node, {
        // ~300 DPI on an A4 sheet
        scale: Math.max(3, (window.devicePixelRatio || 1) * 2),
        backgroundColor: colorMode === 'black' ? '#000000' : '#ffffff',
        fetch: { requestInit: { mode: 'cors', cache: 'force-cache' } },
      });

      printSnapshot(dataUrl);
    } catch (err) {
      console.error('Snapshot print failed, falling back to CSS print:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 flex flex-col items-center selection:bg-white selection:text-black print:p-0 print:m-0 print:bg-transparent print:min-h-0 print:h-auto">

      {/* Print-specific style tags to enforce EXACT 1-PAGE layout */}
      <style jsx global>{`
        @page {
          size: ${aspectRatio === 'landscape' ? 'A4 landscape' : 'A4 portrait'};
          margin: 10mm;
        }
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #poster-element, #poster-element * {
            visibility: visible;
          }
          #poster-element {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            max-width: ${aspectRatio === 'landscape' ? '265mm' : '185mm'} !important;
            max-height: ${aspectRatio === 'landscape' ? '180mm' : '260mm'} !important;
            height: auto !important;
            margin: 0 auto !important;
            padding: 20px 24px !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            border: 1.5px solid #d4d4d8 !important;
            border-radius: 24px !important;
            background: ${colorMode === 'black' ? '#000000' : '#ffffff'} !important;
            color: ${colorMode === 'black' ? '#ffffff' : '#000000'} !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          /* Printers rasterize blurs as solid blocks: neutralize every
             shadow / filter / translucency inside the poster. */
          #poster-element *,
          #poster-element *::before,
          #poster-element *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-shadow: none !important;
            text-shadow: none !important;
            filter: none !important;
            -webkit-filter: none !important;
            backdrop-filter: none !important;
            opacity: 1 !important;
            animation: none !important;
            transition: none !important;
          }
          #poster-element .poster-accent {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Controls Bar (Hidden during Print/PDF export) */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 mb-8 bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800 shadow-2xl print:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-sm font-semibold group"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>الرئيسية</span>
        </Link>

        {/* Poster Options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Black / White Style Toggle */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setColorMode('black')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${colorMode === 'black'
                  ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>أسود (Black)</span>
            </button>
            <button
              onClick={() => setColorMode('white')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${colorMode === 'white'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>أبيض (White)</span>
            </button>
          </div>

          {/* Aspect Ratio Switcher */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setAspectRatio('square')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${aspectRatio === 'square'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              مربع (1:1)
            </button>
            <button
              onClick={() => setAspectRatio('story')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${aspectRatio === 'story'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              ستوري (9:16)
            </button>
            <button
              onClick={() => setAspectRatio('landscape')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${aspectRatio === 'landscape'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
                }`}
            >
              عريض (16:9)
            </button>
          </div>

          {/* Swap Images Button */}
          <button
            onClick={() => setSwappedImages(!swappedImages)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-800 transition active:scale-95"
            title="تبديل موضع الصور الأمامية والخلفية"
          >
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>تبديل الصور (Swap)</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyPostText}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-bold border border-zinc-700 transition active:scale-95"
            title="نسخ نص المنشور"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ نص البوست'}</span>
          </button>

          <button
            onClick={handlePrint}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-black shadow-lg transition active:scale-95 disabled:opacity-60 disabled:cursor-wait"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isExporting ? 'جاري التحضير…' : 'طباعة / حفظ PDF'}</span>
          </button>
        </div>
      </header>

      {/* POSTER CANVAS (Black and White Theme) */}
      <div
        ref={posterRef}
        id="poster-element"
        className={`relative overflow-hidden transition-all duration-300 ${colorMode === 'black'
            ? 'bg-black text-white border-2 border-zinc-800 shadow-[0_0_80px_rgba(255,255,255,0.06)]'
            : 'bg-white text-black border-2 border-zinc-300 shadow-[0_0_80px_rgba(0,0,0,0.12)]'
          } ${aspectRatio === 'square'
            ? 'w-full max-w-[850px] aspect-square rounded-[32px] p-8 sm:p-12'
            : aspectRatio === 'story'
              ? 'w-full max-w-[540px] aspect-[9/16] rounded-[36px] p-8 sm:p-10'
              : 'w-full max-w-[1000px] aspect-[16/9] rounded-[32px] p-8 sm:p-12'
          } flex flex-col justify-between`}
        style={{ direction: 'rtl' }}
      >
        {/* Minimalist Geometric Inner Frame */}
        <div className={`absolute inset-4 sm:inset-5 border rounded-2xl pointer-events-none ${colorMode === 'black' ? 'border-zinc-800/80' : 'border-zinc-200'
          }`} />
        <div className={`absolute inset-6 sm:inset-7 border rounded-xl pointer-events-none ${colorMode === 'black' ? 'border-zinc-900' : 'border-zinc-100'
          }`} />

        {/* Subtle Luxury Monochrome Accents */}
        <div className={`poster-accent absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${colorMode === 'black' ? 'bg-white/5' : 'bg-black/5'
          }`} />
        <div className={`poster-accent absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${colorMode === 'black' ? 'bg-white/5' : 'bg-black/5'
          }`} />

        {/* 1. Header Section */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* High-Clarity Crisp Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 flex items-center justify-center border-2 border-zinc-300 shadow-xl shrink-0 overflow-hidden">
              <Image
                src={yusrLogo}
                alt="شعار تطبيق يُسْر"
                width={90}
                height={90}
                priority
                className="w-full h-full object-contain filter contrast-110 drop-shadow-sm"
              />
            </div>

            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold mb-1 border whitespace-nowrap ${colorMode === 'black'
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-300'
                  : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                }`}>
                <span>✦ «الدَّالُّ عَلَى الخَيْرِ كَفَاعِلِهِ»</span>
              </div>
              <h1 className={`text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-2 ${colorMode === 'black' ? 'text-white' : 'text-black'
                }`}>
                <span>تطبيق يُسْر</span>
                <span className={`font-serif text-xl sm:text-3xl font-light ${colorMode === 'black' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>— Yusr</span>
              </h1>
            </div>
          </div>

          {/* Rating & Trust */}
          <div className="flex flex-col items-end">
            <div className={`flex items-center gap-0.5 sm:gap-1 ${colorMode === 'black' ? 'text-white' : 'text-black'
              }`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              ))}
            </div>
            <span className={`text-[11px] sm:text-xs font-bold mt-1 ${colorMode === 'black' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              تقييم 4.9 • خالي من الإعلانات 100%
            </span>
          </div>
        </div>

        {/* 2. Main Body Content */}
        <div className={`relative z-10 grid gap-6 sm:gap-8 items-center my-auto ${aspectRatio === 'story' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'
          }`}>

          {/* Left Column: Descriptions & QR Codes */}
          <div className={aspectRatio === 'story' ? 'col-span-1' : 'md:col-span-7'}>

            <h2 className={`text-xl sm:text-3xl font-black mb-2 leading-snug ${colorMode === 'black' ? 'text-zinc-100' : 'text-zinc-900'
              }`}>
              رفيقك اليومي للقرآن والأذكار ومواقيت الصلاة 🌙
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${colorMode === 'black' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              تطبيق إسلامي شامل مصمم بواجهة حديثة وفائقة السرعة، بدون أي إعلانات، ويعمل بالكامل بدون الحاجة لإنترنت.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-bold ${colorMode === 'black'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}>
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>مصحف عثماني وتفسير</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-bold ${colorMode === 'black'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}>
                <Compass className="w-4 h-4 shrink-0" />
                <span>مواقيت وأذان وقبلة</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-bold ${colorMode === 'black'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}>
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>بدون إعلانات إطلاقاً</span>
              </div>
              <div className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-bold ${colorMode === 'black'
                  ? 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                }`}>
                <WifiOff className="w-4 h-4 shrink-0" />
                <span>عمل كامل بدون نت</span>
              </div>
            </div>

            {/* Scannable Monochrome QR Codes Box */}
            <div className={`p-4 rounded-2xl border flex items-center justify-around gap-4 shadow-xl ${colorMode === 'black'
                ? 'bg-zinc-950 border-zinc-800'
                : 'bg-zinc-100 border-zinc-300'
              }`}>

              {/* iOS QR */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-1 shadow-md border border-zinc-400 mb-2 overflow-hidden">
                  <img
                    src={iosQrDark}
                    alt="iOS App Store QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className={`flex items-center gap-1 text-[11px] sm:text-xs font-black ${colorMode === 'black' ? 'text-white' : 'text-black'
                  }`}>
                  <Apple className="w-3.5 h-3.5" />
                  <span>App Store (iOS)</span>
                </div>
              </div>

              <div className={`w-px h-20 ${colorMode === 'black' ? 'bg-zinc-800' : 'bg-zinc-300'}`} />

              {/* Android QR */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-1 shadow-md border border-zinc-400 mb-2 overflow-hidden">
                  <img
                    src={androidQrDark}
                    alt="Android Google Play QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className={`flex items-center gap-1 text-[11px] sm:text-xs font-black ${colorMode === 'black' ? 'text-white' : 'text-black'
                  }`}>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Google Play (Android)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Phone Screenshots Showcase */}
          <div
            className={`${aspectRatio === 'story' ? 'col-span-1 hidden' : aspectRatio === 'landscape' ? 'md:col-span-6' : 'md:col-span-5'} relative flex items-center justify-center h-[340px] sm:h-[400px] w-full select-none py-2 px-1`}
          >
            {aspectRatio === 'landscape' ? (
              /* Side-by-Side 2 Phones Next to Each Other in Landscape */
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-5 w-full h-full">
                {/* Phone 1: Quran Screen */}
                <div className={`relative w-36 sm:w-44 aspect-[9/19] rounded-[26px] sm:rounded-[30px] overflow-hidden border-[3px] shadow-2xl transition-all duration-300 hover:scale-105 ${colorMode === 'black'
                    ? 'border-zinc-700 bg-zinc-950 shadow-black'
                    : 'border-zinc-800 bg-white shadow-zinc-400'
                  }`}>
                  <Image
                    src={yusrAppQuran}
                    alt="المصحف الشريف بالخط العثماني"
                    fill
                    priority
                    sizes="(max-width: 768px) 150px, 190px"
                    className="object-cover"
                  />
                </div>

                {/* Phone 2: Home Screen (Next to it) */}
                <div className={`relative w-36 sm:w-44 aspect-[9/19] rounded-[26px] sm:rounded-[30px] overflow-hidden border-[3px] shadow-2xl transition-all duration-300 hover:scale-105 ${colorMode === 'black'
                    ? 'border-zinc-700 bg-zinc-950 shadow-black'
                    : 'border-zinc-800 bg-white shadow-zinc-400'
                  }`}>
                  <Image
                    src={yusrAppHome}
                    alt="واجهة التطبيق الرئيسية ومواقيت الصلاة"
                    fill
                    priority
                    sizes="(max-width: 768px) 150px, 190px"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : swappedImages ? (
              /* Portrait / Square: Overlapped Style */
              <div
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => setSwappedImages(!swappedImages)}
                title="انقر لتبديل ترتيب الصور"
              >
                {/* Secondary Phone in the BACK (Home Screen - Tilted Right & Contained) */}
                <div className={`absolute right-1 sm:right-3 top-4 sm:top-6 w-36 sm:w-44 aspect-[9/19] rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 shadow-2xl transform rotate-8 z-10 opacity-80 hover:opacity-100 hover:rotate-4 transition-all duration-500 ${colorMode === 'black' ? 'bg-zinc-900 border-zinc-700 shadow-black' : 'bg-white border-zinc-400 shadow-zinc-500'
                  }`}>
                  <Image
                    src={yusrAppHome}
                    alt="واجهة التطبيق الرئيسية ومواقيت الصلاة"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover"
                  />
                </div>

                {/* Main Phone in FRONT (Quran Screen - Centered & Crisp) */}
                <div className={`relative left-4 sm:left-6 w-40 sm:w-48 aspect-[9/19] rounded-[28px] sm:rounded-[32px] overflow-hidden border-[3.5px] shadow-2xl z-20 transform hover:scale-105 transition-all duration-500 ${colorMode === 'black'
                    ? 'bg-zinc-950 border-zinc-600 shadow-black'
                    : 'bg-white border-zinc-800 shadow-zinc-600'
                  }`}>
                  <Image
                    src={yusrAppQuran}
                    alt="المصحف الشريف بالخط العثماني"
                    fill
                    priority
                    sizes="(max-width: 768px) 180px, 240px"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div
                className="relative w-full h-full flex items-center justify-center cursor-pointer"
                onClick={() => setSwappedImages(!swappedImages)}
                title="انقر لتبديل ترتيب الصور"
              >
                {/* Secondary Phone in the BACK (Quran Screen - Tilted Left & Contained) */}
                <div className={`absolute left-1 sm:left-3 top-4 sm:top-6 w-36 sm:w-44 aspect-[9/19] rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 shadow-2xl transform -rotate-8 z-10 opacity-80 hover:opacity-100 hover:-rotate-4 transition-all duration-500 ${colorMode === 'black' ? 'bg-zinc-900 border-zinc-700 shadow-black' : 'bg-white border-zinc-400 shadow-zinc-500'
                  }`}>
                  <Image
                    src={yusrAppQuran}
                    alt="المصحف الشريف"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover"
                  />
                </div>

                {/* Main Phone in FRONT (Home Screen - Centered & Crisp) */}
                <div className={`relative right-4 sm:right-6 w-40 sm:w-48 aspect-[9/19] rounded-[28px] sm:rounded-[32px] overflow-hidden border-[3.5px] shadow-2xl z-20 transform hover:scale-105 transition-all duration-500 ${colorMode === 'black'
                    ? 'bg-zinc-950 border-zinc-600 shadow-black'
                    : 'bg-white border-zinc-800 shadow-zinc-600'
                  }`}>
                  <Image
                    src={yusrAppHome}
                    alt="واجهة التطبيق الرئيسية ومواقيت الصلاة"
                    fill
                    priority
                    sizes="(max-width: 768px) 180px, 240px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 3. Footer Slogan */}
        <div className={`relative z-10 pt-4 border-t flex items-center justify-between text-[11px] sm:text-xs font-bold ${colorMode === 'black' ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-600'
          }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${colorMode === 'black' ? 'bg-white animate-pulse' : 'bg-black'}`} />
            <span>تطبيق يُسْر • صدقة جارية ومجاني بالكامل</span>
          </div>
          <span className={colorMode === 'black' ? 'text-white' : 'text-black'}>
            امسح الكود وحمّل التطبيق الآن 📲
          </span>
        </div>

      </div>

      {/* Bottom Information Card (Hidden in print) */}
      <footer className="mt-8 text-center text-xs text-zinc-500 max-w-lg print:hidden">
        <p>تصميم بوستر أبيض وأسود عالي الدقة، جاهز للطباعة بدقة 300DPI أو النشر الفوري عبر منصات التواصل.</p>
      </footer>

    </div>
  );
}
