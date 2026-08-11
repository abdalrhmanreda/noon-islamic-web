'use client';

import React, { useState } from 'react';
import { Calculator, Disc, Clock, Calendar, Sparkles, CheckCircle2, RotateCcw, Plus, Info, ChevronLeft } from 'lucide-react';

export const InteractiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'zakat' | 'tasbeeh' | 'prayers' | 'hijri'>('zakat');

  // --- Zakat Calculator State ---
  const [zakatType, setZakatType] = useState<'money' | 'gold21' | 'gold24'>('money');
  const [amountInput, setAmountInput] = useState<string>('50000');
  const [goldPriceInput, setGoldPriceInput] = useState<string>('3100');

  // Calculate Zakat Demo Results
  const calculateZakatDemo = () => {
    const val = parseFloat(amountInput) || 0;
    const goldPrice = parseFloat(goldPriceInput) || 0;

    if (zakatType === 'money') {
      const nisab = 85 * goldPrice; // 85g gold 24k
      const isEligible = val >= nisab;
      const zakatValue = isEligible ? val * 0.025 : 0;
      return { isEligible, nisab, zakatValue, unit: 'جنيه / ريال' };
    } else if (zakatType === 'gold21') {
      const nisab = 97; // 97g
      const isEligible = val >= nisab;
      const zakatValue = isEligible ? val * 0.025 * goldPrice : 0;
      return { isEligible, nisab, zakatValue, unit: 'جرام' };
    } else {
      const nisab = 85; // 85g
      const isEligible = val >= nisab;
      const zakatValue = isEligible ? val * 0.025 * goldPrice : 0;
      return { isEligible, nisab, zakatValue, unit: 'جرام' };
    }
  };

  const zakatResult = calculateZakatDemo();

  // --- Tasbeeh Counter State ---
  const [tasbeehCount, setTasbeehCount] = useState<number>(33);
  const [tasbeehGoal, setTasbeehGoal] = useState<number>(100);
  const [dhikrText, setDhikrText] = useState<string>('سبحان الله وبحمده، سبحان الله العظيم');

  // --- Hijri Converter State ---
  const [gregorianDate, setGregorianDate] = useState<string>('2026-08-10');

  return (
    <section id="interactive-demo" className="py-20 relative section-bg-alt border-y border-themed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>التجربة التفاعلية المباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-themed-heading mb-4">
            جرب أدوات <span className="text-gradient-gold">نور الإسلام</span> مباشرة على الموقع
          </h2>
          <p className="text-themed-sub text-base">
            اختر أداة من الأدوات التالية للتجربة التفاعلية الحية قبل تحكيل التطبيق على هاتفك.
          </p>
        </div>

        {/* Demo Navigation Bar */}
        <div className="flex items-center justify-center gap-3 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('zakat')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'zakat'
                ? 'bg-gradient-gold text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'glass-card text-themed-sub hover:text-themed-heading'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>حاسبة الزكاة الحية</span>
          </button>

          <button
            onClick={() => setActiveTab('tasbeeh')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'tasbeeh'
                ? 'bg-gradient-gold text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'glass-card text-themed-sub hover:text-themed-heading'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span>السبحة الإلكترونية</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'prayers'
                ? 'bg-gradient-gold text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'glass-card text-themed-sub hover:text-themed-heading'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>مواقيت الصلاة</span>
          </button>

          <button
            onClick={() => setActiveTab('hijri')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'hijri'
                ? 'bg-gradient-gold text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'glass-card text-themed-sub hover:text-themed-heading'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>محول التاريخ الهجري</span>
          </button>
        </div>

        {/* Demo Main Box */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-themed-strong shadow-2xl relative">
          
          {/* TAB 1: ZAKAT CALCULATOR */}
          {activeTab === 'zakat' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-themed pb-4">
                <div>
                  <h3 className="text-xl font-bold text-themed-heading flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                    حاسبة زكاة المال والذهب الشاملة
                  </h3>
                  <p className="text-xs text-themed-muted mt-1">حساب شرعي دقيق وفق قواعد النصاب الفقهية</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  تجربة حية
                </span>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Zakat Type */}
                <div>
                  <label className="block text-xs font-medium text-themed-sub mb-2">نوع الزكاة</label>
                  <select
                    value={zakatType}
                    onChange={(e) => setZakatType(e.target.value as any)}
                    className="w-full input-themed rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                  >
                    <option value="money">زكاة المال والمدخرات</option>
                    <option value="gold21">زكاة الذهب عيار 21</option>
                    <option value="gold24">زكاة الذهب عيار 24</option>
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-themed-sub mb-2">
                    {zakatType === 'money' ? 'إجمالي المبلغ المملوك' : 'وزن الذهب بالجرام'}
                  </label>
                  <input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="مثال: 50000"
                    className="w-full input-themed rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                  />
                </div>

                {/* Gold Price */}
                <div>
                  <label className="block text-xs font-medium text-themed-sub mb-2">سعر جرام الذهب عيار 24</label>
                  <input
                    type="number"
                    value={goldPriceInput}
                    onChange={(e) => setGoldPriceInput(e.target.value)}
                    placeholder="مثال: 3100"
                    className="w-full input-themed rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Calculation Result Display Box */}
              <div className="bg-emerald-500/10 dark:bg-gradient-to-r dark:from-emerald-950/60 dark:to-emerald-900/40 p-6 rounded-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {zakatResult.isEligible ? 'المال بلغ النصاب الشرعي (تجب الزكاة)' : 'لم يبلغ المبلغ النصاب الشرعي'}
                    </span>
                  </div>
                  <p className="text-xs text-themed-sub">
                    قيمة النصاب المطلوب: <strong className="text-themed-heading">{zakatResult.nisab.toLocaleString()} {zakatType === 'money' ? 'جنيه (قيمة 85g ذهب)' : 'جرام'}</strong>
                  </p>
                </div>

                <div className="text-center md:text-left bg-emerald-500/10 px-6 py-3 rounded-xl border border-emerald-500/20">
                  <span className="text-xs text-themed-muted block mb-1">مقدار الزكاة الواجبة (2.5%)</span>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                    {zakatResult.zakatValue.toLocaleString('ar-EG', { maximumFractionDigits: 2 })} جنيه
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: TASBEEH COUNTER */}
          {activeTab === 'tasbeeh' && (
            <div className="space-y-6 text-center animate-in fade-in duration-300 py-4">
              
              {/* Dhikr Selector Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {[
                  'سبحان الله وبحمده، سبحان الله العظيم',
                  'أستغفر الله العظيم وأتوب إليه',
                  'لا حول ولا قوة إلا بالله العلي العظيم',
                  'اللهم صلِّ وسلم على نبينا محمد',
                ].map((dhikr) => (
                  <button
                    key={dhikr}
                    onClick={() => setDhikrText(dhikr)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      dhikrText === dhikr
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'badge-bg-themed text-themed-sub hover:bg-emerald-500/10'
                    }`}
                  >
                    {dhikr}
                  </button>
                ))}
              </div>

              {/* Active Dhikr Text */}
              <h3 className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-300 mb-6 min-h-[3rem] flex items-center justify-center">
                &quot;{dhikrText}&quot;
              </h3>

              {/* Main Interactive Circular Counter Button */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 p-[3px] shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer">
                  <button
                    onClick={() => setTasbeehCount((prev) => prev + 1)}
                    className="w-full h-full bg-[var(--bg-section)] rounded-full flex flex-col items-center justify-center relative overflow-hidden group"
                  >
                    <span className="text-4xl font-extrabold text-themed-heading tracking-tight font-mono mb-1">
                      {tasbeehCount}
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" />
                      انقر للتسبيح
                    </span>
                  </button>
                </div>
              </div>

              {/* Goal & Reset Bar */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <span className="text-xs text-themed-muted">
                  الهدف اليومي: <strong className="text-amber-600 dark:text-amber-400">{tasbeehGoal}</strong> تسبيحة
                </span>
                <button
                  onClick={() => setTasbeehCount(0)}
                  className="flex items-center gap-1.5 text-xs text-themed-muted hover:text-themed-heading badge-bg-themed hover:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-themed transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  إعادة تصفير العداد
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: PRAYER TIMES WIDGET */}
          {activeTab === 'prayers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-themed pb-4">
                <h3 className="text-xl font-bold text-themed-heading flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  مواقيت الصلاة اليومية (الجمهورية والخليج)
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  تحديد تلقائي للموقع
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: 'الفجر', time: '04:12 ص', active: false },
                  { name: 'الشروق', time: '05:40 ص', active: false },
                  { name: 'الظهر', time: '12:15 م', active: true },
                  { name: 'العصر', time: '03:48 م', active: false },
                  { name: 'المغرب', time: '06:50 م', active: false },
                  { name: 'العشاء', time: '08:15 م', active: false },
                ].map((prayer) => (
                  <div
                    key={prayer.name}
                    className={`p-4 rounded-2xl text-center border transition-all ${
                      prayer.active
                        ? 'bg-gradient-emerald text-white border-emerald-400 shadow-lg shadow-emerald-600/30 scale-105'
                        : 'glass-card border-themed text-themed-sub'
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-80">{prayer.name}</p>
                    <p className="text-lg font-bold font-mono">{prayer.time}</p>
                  </div>
                ))}
              </div>

              <div className="badge-bg-themed p-4 rounded-2xl border border-themed text-center text-xs text-themed-sub">
                الصلاة القادمة: <strong className="text-amber-600 dark:text-amber-400 font-bold">صلاة الظهر (12:15 م)</strong> • متبقي 42 دقيقة على رفع الأذان.
              </div>
            </div>
          )}

          {/* TAB 4: HIJRI CONVERTER */}
          {activeTab === 'hijri' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-themed pb-4">
                <h3 className="text-xl font-bold text-themed-heading flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  محول التاريخ الهجري والميلادي
                </h3>
                <span className="text-xs text-themed-muted">تقويم ربيع الأول 1448 هـ</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block text-xs font-medium text-themed-sub mb-2">اختر التاريخ الميلادي</label>
                  <input
                    type="date"
                    value={gregorianDate}
                    onChange={(e) => setGregorianDate(e.target.value)}
                    className="w-full input-themed rounded-xl px-4 py-3 text-sm focus:border-amber-500"
                  />
                </div>

                <div className="bg-gradient-to-tr from-amber-500/10 to-emerald-500/10 p-6 rounded-2xl border border-amber-500/20 text-center">
                  <span className="text-xs text-themed-muted block mb-1">التاريخ الهجري المقابل</span>
                  <span className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-300">
                    27 ربيع الأول 1448 هـ
                  </span>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">يوم الإثنين • يوم مبارك</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
