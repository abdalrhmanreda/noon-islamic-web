'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Download, Moon, Sun, Menu, X, Sparkles, Apple } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import yusrLogo from '../../public/yusr_logo.png';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iosUrl = "https://apps.apple.com/eg/app/%D9%8A%D8%B3%D8%B1-yusr/id6759193445";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.nooralhuda.noor";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-2.5 sm:py-3 shadow-2xl' : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* High-Contrast Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white logo-badge-container p-1 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Image
                src={yusrLogo}
                alt="شعار تطبيق يُسْر - Yusr App Logo"
                width={44}
                height={44}
                priority
                className="w-full h-full object-contain filter contrast-125"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-tight flex items-center gap-1 font-serif">
                تطبيق يُسْر
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 animate-pulse" />
              </span>
              <span className="text-[10px] sm:text-xs font-medium opacity-80">Yusr App • رفيقك اليومي</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 glass-card px-4 py-1.5 rounded-full border">
            <a
              href="#features"
              className="px-4 py-2 text-sm font-medium hover:text-emerald-500 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              المميزات (40+)
            </a>
            <a
              href="#feature-videos"
              className="px-4 py-2 text-sm font-medium hover:text-emerald-500 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              الفيديوهات
            </a>
            <a
              href="#team"
              className="px-4 py-2 text-sm font-medium hover:text-emerald-500 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              فريق العمل
            </a>
            <a
              href="#download"
              className="px-4 py-2 text-sm font-medium hover:text-emerald-500 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            >
              التحميل
            </a>
          </nav>

          {/* Action Buttons & Theme Switcher */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-card hover:border-emerald-500/50 transition-all flex items-center justify-center"
              title={theme === 'dark' ? 'التحويل للوضع الفاتح' : 'التحويل للوضع الداكن'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-emerald-600" />
              )}
            </button>

            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-xl glass-card hover:border-emerald-500/50 transition-all flex items-center gap-2 px-3.5 text-sm"
              title="ابحث في مميزات التطبيق"
            >
              <Search className="w-4 h-4 text-emerald-500" />
              <span>بحث...</span>
            </button>

            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover:bg-amber-500/10 font-medium text-xs px-3.5 py-2.5 rounded-xl border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Apple className="w-4 h-4 text-amber-500" />
              <span>App Store</span>
            </a>

            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-emerald text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Google Play</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass-card"
              title="تغيير الثيم"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              onClick={onSearchClick}
              className="p-2 rounded-xl glass-card"
              title="بحث"
            >
              <Search className="w-4 h-4 text-emerald-500" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-card text-themed-heading"
              title="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b px-4 py-4 mt-2 flex flex-col gap-2 animate-in slide-in-from-top duration-300 shadow-2xl">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 font-medium text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-themed-heading"
          >
            المميزات الشاملة (40+)
          </a>
          <a
            href="#feature-videos"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 font-medium text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-themed-heading"
          >
            الفيديوهات
          </a>
          <a
            href="#team"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 font-medium text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-themed-heading"
          >
            فريق العمل
          </a>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-themed">
            <a
              href={iosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card text-amber-500 text-center font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs"
            >
              <Apple className="w-4 h-4" />
              <span>App Store</span>
            </a>
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-emerald text-white text-center font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Google Play</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
