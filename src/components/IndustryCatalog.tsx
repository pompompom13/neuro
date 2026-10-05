import React, { useState } from 'react';
import {
  Code2,
  Megaphone,
  Palette,
  Clapperboard,
  Mic,
  TrendingUp,
  Activity,
  GraduationCap,
  Headphones,
  Scale,
  Check,
  Copy,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { INDUSTRY_SECTORS, IndustrySector, AIModel } from '../data/aiIndustriesData';

interface IndustryCatalogProps {
  searchQuery: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Megaphone,
  Palette,
  Clapperboard,
  Mic,
  TrendingUp,
  Activity,
  GraduationCap,
  Headphones,
  Scale,
};

export const IndustryCatalog: React.FC<IndustryCatalogProps> = ({ searchQuery }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('it-dev');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleCopyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  // Filter sectors if search query is present
  const filteredSectors = INDUSTRY_SECTORS.filter((sector) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesSector =
      sector.title.toLowerCase().includes(q) ||
      sector.subtitle.toLowerCase().includes(q) ||
      sector.summary.toLowerCase().includes(q);
    const matchesModel = sector.topModels.some(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.developer.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q) ||
        m.primaryUseCases.some((u) => u.toLowerCase().includes(q))
    );
    return matchesSector || matchesModel;
  });

  const activeSector =
    filteredSectors.find((s) => s.id === selectedSectorId) ||
    filteredSectors[0] ||
    INDUSTRY_SECTORS[0];

  return (
    <div className="space-y-8">
      {/* Sector Navigation Strip */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Выберите индустрию для анализа
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {INDUSTRY_SECTORS.length} ключевых сфер
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {INDUSTRY_SECTORS.map((sector) => {
            const IconComp = ICON_MAP[sector.iconName] || Code2;
            const isSelected = activeSector.id === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSectorId(sector.id)}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    {sector.adoptionRate}% внедрено
                  </span>
                </div>
                <div
                  className={`text-sm font-semibold truncate ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {sector.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {sector.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Sector Deep Dive Hero */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-cyan-400">Отраслевой разбор</span>
              <span aria-hidden="true">·</span>
              <span>{activeSector.topModels.length} топовых решений</span>
              <span aria-hidden="true">·</span>
              <span>Экономия времени: {activeSector.timeSavedAvg}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeSector.title}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {activeSector.summary}
            </p>
          </div>

          {/* Quick Metrics Card */}
          <div className="flex lg:flex-col sm:flex-row gap-3 min-w-[240px]">
            <div className="flex-1 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Индекс внедрения</div>
              <div className="text-2xl font-bold font-mono text-cyan-400 flex items-baseline gap-2">
                {activeSector.adoptionRate}%
                <span className="text-xs text-emerald-400 font-sans font-normal">
                  Лидирующий сектор
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                  style={{ width: `${activeSector.adoptionRate}%` }}
                />
              </div>
            </div>

            <div className="flex-1 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 mb-1">Ключевой сдвиг 2025–2026</div>
              <div className="text-xs text-slate-200 leading-tight">
                {activeSector.keyTrend}
              </div>
            </div>
          </div>
        </div>

        {/* Why In Demand Bullets */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Почему нейросети критически востребованы в этой индустрии
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeSector.whyInDemand.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-sm text-slate-300"
              >
                <div className="mt-1 text-cyan-400 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Models Header */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              Наиболее востребованные модели и инструменты
            </h3>
            <span className="text-xs text-slate-500">
              Рейтинг основан на производственном использовании и опросах индустрии
            </span>
          </div>

          {/* Cards of AI Models */}
          <div className="grid grid-cols-1 gap-6">
            {activeSector.topModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                copiedPromptId={copiedPromptId}
                onCopyPrompt={handleCopyPrompt}
              />
            ))}
          </div>
        </div>

        {/* Practical Workflows in Industry */}
        {activeSector.practicalWorkflows.length > 0 && (
          <div className="pt-4 border-t border-slate-800/80">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Проверенные производственные воркфлоу (Production Pipelines)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSector.practicalWorkflows.map((workflow, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
                >
                  <div className="text-sm font-bold text-white">
                    {workflow.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {workflow.description}
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-slate-500">Стек:</span>
                      {workflow.recommendedStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-cyan-300 font-mono">
                          {tech}
                          {tIdx < workflow.recommendedStack.length - 1 && ' +'}
                        </span>
                      ))}
                    </div>
                    <span className="text-emerald-400 font-medium">
                      {workflow.roiImpact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ModelCardProps {
  model: AIModel;
  copiedPromptId: string | null;
  onCopyPrompt: (text: string, id: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  copiedPromptId,
  onCopyPrompt,
}) => {
  const getStatusColor = (status: AIModel['status']) => {
    switch (status) {
      case 'Флагман индустрии':
        return 'text-amber-400';
      case 'Лидер открытого кода':
        return 'text-emerald-400';
      case 'Быстрорастущий стандарт':
        return 'text-cyan-400';
      case 'Нишевый эталон':
        return 'text-purple-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 transition-all space-y-4">
      {/* Card Header (Zero-Pill discipline) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">{model.developer}</span>
            <span aria-hidden="true">·</span>
            <span className={getStatusColor(model.status)}>{model.status}</span>
            <span aria-hidden="true">·</span>
            <span>{model.accessType}</span>
            {model.contextWindow && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-400">Контекст: {model.contextWindow}</span>
              </>
            )}
          </div>
          <h4 className="text-xl font-bold text-white tracking-tight">
            {model.name}
          </h4>
        </div>

        {/* Demand Score Meter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400">
              Востребованность
            </div>
            <div className="text-lg font-bold font-mono text-cyan-400">
              {model.demandScore}%
            </div>
          </div>
          <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full"
              style={{ width: `${model.demandScore}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">
        {model.shortDescription}
      </p>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/60 space-y-1.5">
          <div className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Ключевые преимущества
          </div>
          <ul className="space-y-1 text-slate-300 list-disc list-inside">
            {model.keyStrengths.map((strength, sIdx) => (
              <li key={sIdx} className="leading-snug">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/60 space-y-1.5">
          <div className="font-semibold text-slate-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Ограничения и нюансы
          </div>
          <ul className="space-y-1 text-slate-400 list-disc list-inside">
            {model.keyWeaknesses.map((weakness, wIdx) => (
              <li key={wIdx} className="leading-snug">
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Metadata strip (Pricing, Russian support, Ideal for) */}
      <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <span className="text-slate-500">Стоимость: </span>
            <span className="text-slate-200 font-mono">{model.pricingInfo}</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500">Русский язык: </span>
            <span className="text-slate-200">{model.russianSupport}</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500">Идеально для: </span>
            <span className="text-cyan-300">{model.idealFor}</span>
          </div>
        </div>
      </div>

      {/* Prompt Example Accordion/Box */}
      {model.promptExample && (
        <div className="mt-3 pt-3 border-t border-slate-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Пример профессионального запроса (Prompt)
            </span>
            <button
              onClick={() => onCopyPrompt(model.promptExample!, model.id)}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors py-1 px-2 rounded hover:bg-slate-900"
            >
              {copiedPromptId === model.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 leading-relaxed select-all">
            {model.promptExample}
          </div>
        </div>
      )}
    </div>
  );
};
