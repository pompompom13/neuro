import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { TASK_SCENARIOS, INDUSTRY_SECTORS, TaskScenario } from '../data/aiIndustriesData';

export const TaskMatcher: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom interactive prompt builder state
  const [customGoal, setCustomGoal] = useState<string>('');
  const [customPriority, setCustomPriority] = useState<'quality' | 'privacy' | 'free' | 'speed'>('quality');
  const [customRole, setCustomRole] = useState<string>('Разработчик');
  const [customResult, setCustomResult] = useState<{
    recommendedModel: string;
    alternative: string;
    advice: string;
    generatedPrompt: string;
  } | null>(null);

  const filteredScenarios = TASK_SCENARIOS.filter((scenario) => {
    if (selectedIndustry === 'all') return true;
    return scenario.industryId === selectedIndustry;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoal.trim()) return;

    let model = 'Claude 3.7 Sonnet / Cursor';
    let alt = 'DeepSeek-R1 (Local Ollama)';
    let advice = 'Для комплексных задач используйте пошаговый промптинг с требованием сначала составить план.';

    const goalLower = customGoal.toLowerCase();

    if (goalLower.includes('картин') || goalLower.includes('фото') || goalLower.includes('дизайн') || goalLower.includes('лого')) {
      if (customPriority === 'privacy' || customPriority === 'free') {
        model = 'FLUX.1 Schnell / Dev (Локально)';
        alt = 'Stable Diffusion XL';
      } else {
        model = 'FLUX.1 Pro / Midjourney v6.1';
        alt = 'Recraft AI (для векторов/SVG)';
      }
      advice = 'Описывайте оптику камеры (50mm lens, studio rim light) и материал поверхностей.';
    } else if (goalLower.includes('видео') || goalLower.includes('анимац')) {
      model = 'Runway Gen-3 Alpha / Kling AI';
      alt = 'Luma Dream Machine';
      advice = 'Сначала сгенерируйте идеальный первый кадр (Image-to-Video), затем анимируйте его.';
    } else if (goalLower.includes('голос') || goalLower.includes('звук') || goalLower.includes('музык') || goalLower.includes('озвуч')) {
      model = 'ElevenLabs (Речь) / Suno v4 (Музыка)';
      alt = 'Whisper Large v3 (Транскрипция)';
      advice = 'Загружайте образцы голоса без реверберации и фоновой музыки.';
    } else if (goalLower.includes('документ') || goalLower.includes('пдф') || goalLower.includes('отчет') || goalLower.includes('книг')) {
      model = 'Google NotebookLM / Gemini 1.5 Pro';
      alt = 'Claude 3.5 Sonnet';
      advice = 'NotebookLM гарантирует ответы строго по фактам из ваших файлов без галлюцинаций.';
    } else if (customPriority === 'privacy') {
      model = 'DeepSeek-R1 (через Ollama 32B/70B)';
      alt = 'Llama 3.3 70B Instruct';
      advice = 'Локальный запуск полностью гарантирует соблюдение коммерческой тайны и NDA.';
    } else if (customPriority === 'free') {
      model = 'DeepSeek-V3 (Веб/API) или Gemini 2.0 Flash';
      alt = 'OpenAI GPT-4o (Бесплатный лимит)';
      advice = 'Предоставляют максимальные возможности без необходимости платной подписки.';
    }

    const generatedPrompt = `Ты опытный ${customRole} мирового уровня. Моя цель: ${customGoal.trim()}.
1. Проведи декомпозицию задачи на ключевые этапы.
2. Предложи оптимальное решение с учетом современных стандартов индустрии.
3. Укажи возможные подводные камни и как их избежать.
4. Предоставь конкретный финальный результат в структурированном виде без банальных вводных слов.`;

    setCustomResult({
      recommendedModel: model,
      alternative: alt,
      advice,
      generatedPrompt,
    });
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Интерактивный помощник выбора</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Какую нейросеть выбрать под вашу конкретную задачу?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Выберите готовый проверенный сценарий применения с готовым профессиональным промптом или воспользуйтесь интерактивным конфигуратором задачи.
          </p>
        </div>

        {/* Custom Configurator Box */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 bg-slate-950/60 p-5 rounded-xl border">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Интерактивный подборщик под вашу цель
          </h3>

          <form onSubmit={handleGenerateRecommendation} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Ваша роль</label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option>Разработчик / Архитектор</option>
                  <option>Маркетолог / Копирайтер</option>
                  <option>Дизайнер / Арт-директор</option>
                  <option>Предприниматель / Руководитель</option>
                  <option>Аналитик данных / Финансист</option>
                  <option>Студент / Исследователь</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Главный приоритет</label>
                <select
                  value={customPriority}
                  onChange={(e) => setCustomPriority(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="quality">Максимальное качество (State-of-the-Art)</option>
                  <option value="free">Бесплатное использование</option>
                  <option value="privacy">Конфиденциальность / Локальный запуск (NDA)</option>
                  <option value="speed">Сверхвысокая скорость генерации</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-1">
                <label className="text-xs text-slate-400 font-medium">&nbsp;</label>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950"
                >
                  Подобрать модель и промпт
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">
                Опишите вашу задачу своими словами
              </label>
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="Например: 'Написать модульные тесты для бэкенда на Go' или 'Создать рекламный баннер для кофейни'..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </form>

          {/* Recommendation Output Card */}
          {customResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="text-[11px] text-cyan-400 font-mono">
                    Рекомендация экспертов
                  </div>
                  <div className="text-base font-bold text-white">
                    {customResult.recommendedModel}
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Альтернатива: <span className="text-slate-200">{customResult.alternative}</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{customResult.advice}</span>
              </div>

              {/* Ready-to-use custom prompt */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400">
                    Сгенерированный промпт под вашу задачу:
                  </span>
                  <button
                    onClick={() => handleCopy(customResult.generatedPrompt, 'custom-result')}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedId === 'custom-result' ? (
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
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
                  {customResult.generatedPrompt}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Industry Filter for Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Готовые проверенные production-сценарии
          </h3>
          <span className="text-xs text-slate-500">
            Шаблоны с доказанной эффективностью
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedIndustry('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedIndustry === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Все сферы
          </button>
          {INDUSTRY_SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedIndustry(sec.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedIndustry === sec.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScenarios.map((scen) => (
            <div
              key={scen.id}
              className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono text-cyan-400">
                    Сложность: {scen.difficulty}
                  </span>
                  <span className="text-slate-500">
                    {INDUSTRY_SECTORS.find((s) => s.id === scen.industryId)?.title}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {scen.taskTitle}
                </h4>
              </div>

              {/* Model Recommendation Badges */}
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Лучший выбор:</span>
                  <span className="font-bold text-cyan-300">{scen.bestModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Альтернатива:</span>
                  <span className="text-slate-300">{scen.alternativeModel}</span>
                </div>
                <div className="pt-2 text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {scen.whyThisChoice}
                </div>
              </div>

              {/* Prompt Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Рабочий промпт
                  </span>
                  <button
                    onClick={() => handleCopy(scen.readyPrompt, scen.id)}
                    className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 py-1 px-2 rounded hover:bg-slate-950"
                  >
                    {copiedId === scen.id ? (
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
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 leading-relaxed select-all">
                  {scen.readyPrompt}
                </div>
              </div>

              {/* Tips */}
              <div className="pt-2 border-t border-slate-800/60 space-y-1 text-xs text-slate-400">
                <div className="font-medium text-slate-300">Совет эксперта:</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {scen.tips.map((tip, tIdx) => (
                    <li key={tIdx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
