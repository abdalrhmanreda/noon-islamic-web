'use client';

import React from 'react';
import Image from 'next/image';
import { Code2, Users, ExternalLink } from 'lucide-react';

interface Developer {
  id: string;
  nameAr: string;
  nameEn: string;
  roleEn: string;
  linkedin: string;
  imageSrc: string;
  gradient: string;
}

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const DEVELOPERS: Developer[] = [
  {
    id: 'abdalrhman',
    nameAr: 'عبدالرحمن رضا',
    nameEn: 'Abdalrhman Reda',
    roleEn: 'Full-Stack Mobile & Backend Engineer',
    linkedin: 'https://www.linkedin.com/in/abdalrhman-reda-b24a11226/',
    imageSrc: '/developer_abdalrhman.jpg',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'eslam',
    nameAr: 'إسلام عابد',
    nameEn: 'Eslam Aped',
    roleEn: 'Full-Stack Mobile & Backend Engineer',
    linkedin: 'https://www.linkedin.com/in/eslamaped/',
    imageSrc: '/developer_eslam.png',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'mohammed',
    nameAr: 'محمد راجح',
    nameEn: 'Mohammed Rageh',
    roleEn: 'Full-Stack Mobile & Backend Engineer',
    linkedin: 'https://www.linkedin.com/in/mohammedrageh/?locale=en',
    imageSrc: '/developer_mohammed.jpg',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 relative section-bg-alt border-t border-themed">
      {/* Background Decor Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
            <Users className="w-4 h-4" />
            <span>فريق العمل والتطوير</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-themed-heading mb-4">
            فريق تطوير تطبيق <span className="text-gradient-emerald font-serif">يُسْر (Yusr)</span>
          </h2>
          <p className="text-themed-muted text-base">
            نخبة من المهندسين المبدعين المشاركين في تصميم وتطوير محرك وشبكة التطبيق
          </p>
        </div>

        {/* Developers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {DEVELOPERS.map((dev) => (
            <div
              key={dev.id}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-themed-strong shadow-xl flex flex-col items-center text-center relative overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${dev.gradient}`} />

              {/* Developer Real Profile Image Avatar */}
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-emerald-400 via-amber-400 to-emerald-600 shadow-xl shadow-emerald-500/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                  <Image
                    src={dev.imageSrc}
                    alt={dev.nameAr}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-themed-heading mb-1">
                {dev.nameAr}
              </h3>
              <p className="text-xs text-themed-muted mb-3 dir-ltr font-mono">
                {dev.nameEn}
              </p>

              {/* Role Badge (ENGLISH ONLY) */}
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 shrink-0" />
                <span className="dir-ltr">{dev.roleEn}</span>
              </div>

              {/* LinkedIn Action Button */}
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white dark:text-blue-400 dark:hover:text-white border border-blue-500/30 font-semibold text-xs transition-all duration-300 shadow-md group/btn"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
