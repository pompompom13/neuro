import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Check, AlertCircle, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { INDUSTRY_SECTORS, AIModel } from '../data/aiIndustriesData';

export const ModelMatrix: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'demandScore' | 'name'>('demandScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Extract all unique models from all sectors
  const allModels = useMemo(() => {
    const map = new Map<string, AIModel & { sectors: string[] }>();

    INDUSTRY_SECTORS.forEach((sector) => {
      sector.topModels.forEach((model) => {
        if (!map.has(model.id)) {
          map.set(model.id, { ...model, sectors: [sector.title] });
        } else {
          const existing = map.get(model.id)!;
          if (!existing.sectors.includes(sector.title)) {
            existing.sectors.push(sector.title);
          }
        }
      });
    });

    return Array.from(map.values());
  }, []);

  const filteredAndSortedModels = useMemo(() => {
    return allModels
      .filter((model) => {
        // Category
        if (categoryFilter !== 'all') {
          if (categoryFilter === 'opensource') {
            if (!model.accessType.includes('Open Weights')) return false;
          } else if (model.category !== categoryFilter) {
            return false;
          }
        }

        // Access
        if (accessFilter !== 'all') {
          if (accessFilter === 'free' && !model.accessType.includes('Бесплатно')) return false;
          if (accessFilter === 'open' && !model.accessType.includes('Open Weights')) return false;
          if (accessFilter === 'subscription' && !model.accessType.includes('Подписка')) return false;
        }

        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matches =
            model.name.toLowerCase().includes(q) ||
            model.developer.toLowerCase().includes(q) ||
            model.shortDescription.toLowerCase().includes(q) ||
            model.idealFor.toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === 'demandScore') {
          return sortAsc ? a.demandScore - b.demandScore : b.demandScore - a.demandScore;
        } else {
          return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
      });
  }, [allModels, categoryFilter, accessFilter, search, sortField, sortAsc]);

  const toggleSort = (field: 'demandScore' | 'name') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Сравнительная матрица топовых нейросетей
        </h2>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          Единый реестр актуальных моделей мира с объективным индексом востребованности, техническими характеристиками (размер контекста, ценовая модель, поддержка русского языка) и ключевыми сценариями использования.
        </p>

        {/* Filter Toolbar (Segmented controls) */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-xl" role="tablist">
            {[
              { id: 'all', label: 'Все модели' },
              { id: 'code', label: 'Код & Архитектура' },
              { id: 'reasoning', label: 'Рассуждения (Reasoning)' },
              { id: 'text', label: 'Текст & Аналитика' },
              { id: 'image', label: 'Изображения' },
              { id: 'video', label: 'Видео' },
              { id: 'audio', label: 'Звук & Речь' },
              { id: 'opensource', label: 'Open Weights' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  categoryFilter === tab.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search within matrix */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Фильтр в таблице..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-slate-800 rounded-2xl bg-slate-950/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Модель и разработчик
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('demandScore')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Востребованность
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Статус & Тип</th>
                <th className="py-3.5 px-4">Контекст</th>
                <th className="py-3.5 px-4">Русский язык</th>
                <th className="py-3.5 px-4 min-w-[240px]">Ключевая суперсила</th>
                <th className="py-3.5 px-4">Условия доступа</th>
                <th className="py-3.5 px-4">Применение</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAndSortedModels.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    По вашему запросу модели не найдены. Попробуйте сбросить фильтры.
                  </td>
                </tr>
              ) : (
                filteredAndSortedModels.map((model) => (
                  <tr
                    key={model.id}
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    {/* Model & Dev */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-white text-sm">
                        {model.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {model.developer}
                      </div>
                    </td>

                    {/* Demand Score */}
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400">
                          {model.demandScore}%
                        </span>
                      </div>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-500 h-full rounded-full"
                          style={{ width: `${model.demandScore}%` }}
                        />
                      </div>
                    </td>

                    {/* Status & Access */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-medium text-slate-200">
                        {model.status}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {model.accessType}
                      </div>
                    </td>

                    {/* Context Window */}
                    <td className="py-4 px-4 align-top font-mono text-slate-300">
                      {model.contextWindow || '—'}
                    </td>

                    {/* Russian Support */}
                    <td className="py-4 px-4 align-top">
                      <span
                        className={
                          model.russianSupport === 'Отличная'
                            ? 'text-emerald-400'
                            : model.russianSupport === 'Хорошая'
                            ? 'text-cyan-400'
                            : 'text-slate-400'
                        }
                      >
                        {model.russianSupport}
                      </span>
                    </td>

                    {/* Key Strength */}
                    <td className="py-4 px-4 align-top text-slate-300 leading-relaxed">
                      {model.keyStrengths[0]}
                    </td>

                    {/* Pricing */}
                    <td className="py-4 px-4 align-top font-mono text-[11px] text-slate-400">
                      {model.pricingInfo}
                    </td>

                    {/* Ideal for */}
                    <td className="py-4 px-4 align-top text-[11px] text-slate-400">
                      {model.idealFor}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
