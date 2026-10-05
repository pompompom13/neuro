import React, { useState } from 'react';
import { Search, Sparkles, Layers, SlidersHorizontal, TrendingUp, BookmarkCheck, Share2, ExternalLink } from 'lucide-react';
import { GLOBAL_AI_STATISTICS } from '../data/aiIndustriesData';
import { ExportModal } from './ExportModal';

interface HeaderProps {
  activeTab: 'industries' | 'matrix' | 'matcher' | 'trends';
  setActiveTab: (tab: 'industries' | 'matrix' | 'matcher' | 'trends') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar with Branding, Search & Export/Web Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 font-bold text-lg">
                AI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white">
                    Атлас востребованности нейросетей
                  </h1>
                  <span className="text-xs text-cyan-400 font-mono">2025–2026</span>
                </div>
                <p className="text-xs text-slate-400">
                  Какие модели сейчас лидируют в реальном бизнесе, кодинге, медиа и науке
                </p>
              </div>
            </div>

            {/* Actions: Search & Web Export */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск модели, сферы, навыка..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/60 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsExportOpen(true)}
                className="py-2 px-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                title="Веб-версия, печать и экспорт в Markdown"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Веб-версия & Экспорт</span>
              </button>
            </div>
          </div>

        {/* Global Key Stats Strip (Zero-pill typography discipline) */}
        <div className="hidden lg:flex items-center justify-between py-2.5 text-xs text-slate-400 border-b border-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="text-slate-200 font-medium">Проникновение в бизнес:</span>
            <span className="text-cyan-300 font-semibold">{GLOBAL_AI_STATISTICS.overallEnterpriseAdoption}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-200 font-medium">Рост продуктивности:</span>
            <span className="text-emerald-400 font-semibold">{GLOBAL_AI_STATISTICS.averageProductivityBoost}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-200 font-medium">Топ кодинг:</span>
            <span className="text-slate-300">Claude 3.7 & Cursor</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-200 font-medium">Топ визуал:</span>
            <span className="text-slate-300">FLUX.1 & Midjourney</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-200 font-medium">Топ открытая модель:</span>
            <span className="text-cyan-300 font-semibold">{GLOBAL_AI_STATISTICS.mostUsedOpenModel}</span>
          </div>
        </div>

        {/* Navigation Tabs (Functional button controls) */}
        <nav className="flex items-center gap-1 sm:gap-2 pt-2 pb-2 overflow-x-auto no-scrollbar" aria-label="Разделы атласа">
          <button
            onClick={() => setActiveTab('industries')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'industries'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            Индустрии и сферы
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Сравнительная матрица моделей
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'matcher'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            AI-Навигатор задач
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'trends'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Тренды & Архитектура
          </button>
        </nav>
      </div>
    </header>

    <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
  </>
  );
};
