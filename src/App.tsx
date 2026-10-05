/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { IndustryCatalog } from './components/IndustryCatalog';
import { ModelMatrix } from './components/ModelMatrix';
import { TaskMatcher } from './components/TaskMatcher';
import { TrendsAnalytics } from './components/TrendsAnalytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<'industries' | 'matrix' | 'matcher' | 'trends'>('industries');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Header & Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Render Tab Views */}
        {activeTab === 'industries' && (
          <IndustryCatalog searchQuery={searchQuery} />
        )}

        {activeTab === 'matrix' && (
          <ModelMatrix />
        )}

        {activeTab === 'matcher' && (
          <TaskMatcher />
        )}

        {activeTab === 'trends' && (
          <TrendsAnalytics />
        )}
      </main>

      {/* Footer (Zero-pill typography discipline) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">AI Landscape & Radar</span>
            <span aria-hidden="true">·</span>
            <span>Анализ востребованности нейросетей по сферам применения</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Данные актуальны на 2025–2026 гг.</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Наверх ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
