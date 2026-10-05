import React from 'react';
import {
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  Server,
  Terminal,
  Workflow,
} from 'lucide-react';
import { GLOBAL_AI_STATISTICS, INDUSTRY_SECTORS } from '../data/aiIndustriesData';

export const TrendsAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Overview */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Стратегический ландшафт 2025–2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            5 фундаментальных сдвигов в индустрии искусственного интеллекта
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Эпоха «наивных чат-ботов» завершилась. Сегодня мировой рынок определяют рассуждающие модели (Reasoning), автономные мультимодальные агенты, открытые веса (Open Weights) и сверхнизкие задержки в реальном времени.
          </p>
        </div>

        {/* Global Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Проникновение в бизнес</div>
            <div className="text-2xl font-bold font-mono text-cyan-400">
              {GLOBAL_AI_STATISTICS.overallEnterpriseAdoption}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Компаний используют AI в продакшене
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Средний рост КПД</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {GLOBAL_AI_STATISTICS.averageProductivityBoost}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Экономия часов на рутинных задачах
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Самый быстрый сегмент</div>
            <div className="text-sm font-bold text-white mt-1">
              AI-агенты в IDE
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">
              +310% рост адаптации (Cursor/Windsurf)
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Революция открытого кода</div>
            <div className="text-sm font-bold text-white mt-1">
              DeepSeek & FLUX.1
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Сравнялись с закрытыми флагманами
            </div>
          </div>
        </div>
      </div>

      {/* 5 Macro Trends Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Ключевые технологические драйверы
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trend 1 */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  1. Рассуждения во время инференса (Test-Time Compute)
                </h4>
                <div className="text-xs text-cyan-400 font-mono">
                  DeepSeek-R1, OpenAI o1, o3-mini, Claude 3.7 Thinking
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Вместо мгновенного предсказания следующего токена модель тратит от 5 до 40 секунд на генерацию скрытой цепочки рассуждений (Chain-of-Thought), внутренне проверяя свои гипотезы, симулируя код и исправляя логические нестыковки. Это снизило уровень ошибок в сложных архитектурных задачах в разы.
            </p>
          </div>

          {/* Trend 2 */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  2. Агентный AI: от текста к автономным действиям
                </h4>
                <div className="text-xs text-emerald-400 font-mono">
                  Cursor Composer, Claude Computer Use, Devin
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Модели получили «руки»: они могут вызывать внешние API, исполнять команды в терминале, запускать браузер, нажимать кнопки в интерфейсе ОС и самостоятельно исправлять ошибки выполнения до тех пор, пока тесты не пройдут успешно.
            </p>
          </div>

          {/* Trend 3 */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  3. Революция открытых весов (Open Weights) и локальный запуск
                </h4>
                <div className="text-xs text-purple-400 font-mono">
                  DeepSeek-V3/R1, Qwen 2.5, Llama 3.3, FLUX.1
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Предприятия больше не обязаны передавать коммерческую тайну, банковские выписки или исходный код на серверы зарубежных вендоров. Полноразмерные и дистиллированные модели разворачиваются на собственных серверах компаний с нулевым риском утечки данных.
            </p>
          </div>

          {/* Trend 4 */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  4. Сверхдлинный контекст (Long-Context Renaissance)
                </h4>
                <div className="text-xs text-amber-400 font-mono">
                  Google Gemini (1–2M токенов), Claude 3.5 (200K)
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Вместо сложной и хрупкой векторной фрагментации (RAG) в модель можно разом загрузить 30 книг, видеозапись часового совещания или весь репозиторий проекта на 80 000 строк кода. Точность нахождения иголки в стоге сена превышает 99.5%.
            </p>
          </div>
        </div>
      </div>

      {/* Sector Adoption Comparison Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Рейтинг проникновения AI по отраслям
            </h3>
            <p className="text-xs text-slate-400">
              Доля компаний и специалистов, системно внедривших нейросети в ежедневную практику
            </p>
          </div>
          <BarChart3 className="w-5 h-5 text-slate-500" />
        </div>

        <div className="space-y-3 pt-2">
          {INDUSTRY_SECTORS.map((sec) => (
            <div key={sec.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">{sec.title}</span>
                <span className="font-mono text-cyan-400 font-bold">{sec.adoptionRate}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                  style={{ width: `${sec.adoptionRate}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Safety Checklist */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Чек-лист безопасного внедрения нейросетей
            </h3>
            <p className="text-xs text-slate-400">
              Как извлечь максимум без риска утечек данных и галлюцинаций
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="font-bold text-white">1. Защита коммерческой тайны</div>
            <p className="text-slate-400 leading-relaxed">
              Отключайте обучение на ваших данных (Settings → Data Controls в ChatGPT/Claude) или используйте корпоративные тарифы Enterprise / API-ключи, на которых вендоры юридически гарантируют необучение.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="font-bold text-white">2. Верификация фактов (Grounding)</div>
            <p className="text-slate-400 leading-relaxed">
              Для фактологических и юридических задач требуйте цитирования источников (Perplexity, NotebookLM) либо заставляйте модель сначала составить список предположений.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="font-bold text-white">3. Локальные контуры (On-Premise)</div>
            <p className="text-slate-400 leading-relaxed">
              Для медицинских, банковских и секретных данных развертывайте DeepSeek-R1 или Llama 3.3 локально через Ollama, vLLM или TGI внутри закрытого периметра без доступа в интернет.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
