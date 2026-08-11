'use client';

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { FeatureVideos } from './components/FeatureVideos';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';

export default function Home() {
  const handleSearchClick = () => {
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <main className="min-h-screen transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
        {/* Header Navigation with Logo & Theme Switcher */}
        <Header onSearchClick={handleSearchClick} />

        {/* Hero Showcase Section */}
        <HeroSection />

        {/* Feature Video Demos Showcase */}
        <FeatureVideos />

        {/* 40+ Features Grid & Search/Filter */}
        <FeatureGrid />

        {/* Developers & Team Section */}
        <TeamSection />

        {/* Footer */}
        <Footer />
      </main>
    </ThemeProvider>
  );
}
