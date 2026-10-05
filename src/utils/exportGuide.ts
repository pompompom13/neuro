import { INDUSTRY_SECTORS, GLOBAL_AI_STATISTICS, TASK_SCENARIOS } from '../data/aiIndustriesData';

export function generateMarkdownGuide(): string {
  let md = `# Атлас востребованности нейросетей по сферам (2025–2026)
Аналитический гид и реестр ключевых моделей искусственного интеллекта.

---

## Ключевая статистика рынка
- **Проникновение в корпоративный сектор:** ${GLOBAL_AI_STATISTICS.overallEnterpriseAdoption}
- **Средний прирост продуктивности:** ${GLOBAL_AI_STATISTICS.averageProductivityBoost}
- **Самый быстрорастущий сегмент:** ${GLOBAL_AI_STATISTICS.fastestGrowingSegment}
- **Топ закрытая модель:** ${GLOBAL_AI_STATISTICS.mostUsedClosedModel}
- **Топ открытая модель:** ${GLOBAL_AI_STATISTICS.mostUsedOpenModel}
- **Топ визуальный движок:** ${GLOBAL_AI_STATISTICS.leadingImageEngine}
- **Топ речевой движок:** ${GLOBAL_AI_STATISTICS.leadingAudioEngine}

---

## 1. Обзор ключевых индустрий и лидеров

`;

  INDUSTRY_SECTORS.forEach((sec, idx) => {
    md += `### ${idx + 1}. ${sec.title}\n`;
    md += `*${sec.subtitle}*\n\n`;
    md += `- **Индекс внедрения:** ${sec.adoptionRate}%\n`;
    md += `- **Экономия рабочего времени:** ${sec.timeSavedAvg}\n`;
    md += `- **Главный сдвиг:** ${sec.keyTrend}\n\n`;
    md += `**Краткая сводка:**\n${sec.summary}\n\n`;

    md += `**Почему AI здесь востребован:**\n`;
    sec.whyInDemand.forEach((r) => {
      md += `- ${r}\n`;
    });
    md += `\n`;

    md += `#### Топ-модели в сфере:\n\n`;
    sec.topModels.forEach((m) => {
      md += `##### ${m.name} (${m.developer})\n`;
      md += `- **Статус:** ${m.status} | **Востребованность:** ${m.demandScore}%\n`;
      md += `- **Доступ:** ${m.accessType} | **Русский язык:** ${m.russianSupport}\n`;
      if (m.contextWindow) md += `- **Контекст:** ${m.contextWindow}\n`;
      md += `- **Стоимость:** ${m.pricingInfo}\n`;
      md += `- **Описание:** ${m.shortDescription}\n`;
      md += `- **Ключевые преимущества:** ${m.keyStrengths.join(', ')}\n`;
      md += `- **Ограничения:** ${m.keyWeaknesses.join(', ')}\n`;
      md += `- **Для кого идеально:** ${m.idealFor}\n`;
      if (m.promptExample) {
        md += `\n*Пример рабочего промпта:*\n\`\`\`\n${m.promptExample}\n\`\`\`\n`;
      }
      md += `\n`;
    });

    if (sec.practicalWorkflows.length > 0) {
      md += `#### Проверенные воркфлоу:\n`;
      sec.practicalWorkflows.forEach((w) => {
        md += `- **${w.title}:** ${w.description} (Стек: ${w.recommendedStack.join(' + ')}) — *${w.roiImpact}*\n`;
      });
      md += `\n`;
    }

    md += `---\n\n`;
  });

  md += `## 2. Готовые production-сценарии и промпты\n\n`;
  TASK_SCENARIOS.forEach((t) => {
    md += `### ${t.taskTitle} (Сложность: ${t.difficulty})\n`;
    md += `- **Рекомендуемая модель:** ${t.bestModel} (Альтернатива: ${t.alternativeModel})\n`;
    md += `- **Почему этот выбор:** ${t.whyThisChoice}\n`;
    md += `\n\`\`\`\n${t.readyPrompt}\n\`\`\`\n\n`;
  });

  return md;
}

export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Атлас востребованности нейросетей 2025–2026</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #030712; color: #f3f4f6; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
  <header class="border-b border-gray-800 pb-6">
    <div class="flex items-center gap-3 mb-2">
      <div class="w-10 h-10 rounded-xl bg-cyan-500 text-gray-950 font-bold flex items-center justify-center text-lg">AI</div>
      <div>
        <h1 class="text-2xl font-bold text-white">Атлас востребованности нейросетей</h1>
        <p class="text-xs text-gray-400">Автономная веб-версия · 2025–2026</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 text-xs text-gray-400 pt-3">
      <span>Внедрение в бизнес: <b class="text-cyan-400">${GLOBAL_AI_STATISTICS.overallEnterpriseAdoption}</b></span>
      <span>·</span>
      <span>Рост продуктивности: <b class="text-emerald-400">${GLOBAL_AI_STATISTICS.averageProductivityBoost}</b></span>
      <span>·</span>
      <span>Топ модель: <b class="text-white">${GLOBAL_AI_STATISTICS.mostUsedClosedModel}</b></span>
    </div>
  </header>

  <main class="space-y-8">
    ${INDUSTRY_SECTORS.map((sec, i) => `
      <section class="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-800 pb-3">
          <div>
            <h2 class="text-xl font-bold text-white">${i + 1}. ${sec.title}</h2>
            <p class="text-xs text-cyan-400 mt-0.5">${sec.subtitle}</p>
          </div>
          <span class="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md">
            Внедрение: ${sec.adoptionRate}% · Экономия: ${sec.timeSavedAvg}
          </span>
        </div>

        <p class="text-sm text-gray-300 leading-relaxed">${sec.summary}</p>

        <div class="space-y-3 pt-2">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400">Топ-модели:</h3>
          <div class="grid grid-cols-1 gap-3">
            ${sec.topModels.map(m => `
              <div class="bg-gray-950/70 border border-gray-800/80 rounded-xl p-4 space-y-2">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="font-bold text-white text-sm">${m.name} <span class="text-xs font-normal text-gray-400">(${m.developer})</span></div>
                  <div class="text-xs font-mono text-cyan-400">Востребованность: ${m.demandScore}%</div>
                </div>
                <p class="text-xs text-gray-300">${m.shortDescription}</p>
                <div class="text-xs text-gray-400 pt-1">
                  <span class="text-gray-500">Доступ:</span> ${m.accessType} · 
                  <span class="text-gray-500">Русский язык:</span> ${m.russianSupport} ·
                  <span class="text-gray-500">Цена:</span> <span class="font-mono text-gray-300">${m.pricingInfo}</span>
                </div>
                ${m.promptExample ? `
                  <div class="mt-2 pt-2 border-t border-gray-900 text-xs font-mono bg-gray-900 p-2.5 rounded text-gray-300">
                    <span class="text-cyan-400 font-sans block mb-1">Пример промпта:</span>
                    ${m.promptExample}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `).join('')}
  </main>
  
  <footer class="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
    AI Landscape & Radar 2025–2026 · Автономная выгрузка
  </footer>
</body>
</html>`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
