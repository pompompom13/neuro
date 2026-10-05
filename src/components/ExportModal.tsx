import React, { useState } from 'react';
import {
  X,
  FileText,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Code,
  Download,
  Share2,
  Globe,
  Info,
  Laptop,
} from 'lucide-react';
import { generateMarkdownGuide, generateStandaloneHtml, downloadFile } from '../utils/exportGuide';
import { INDUSTRY_SECTORS } from '../data/aiIndustriesData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedDev, setCopiedDev] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // The active development server URL where the app is live right now
  const devAppUrl = 'https://ais-dev-crupzx2jgouddssfsqnggr-315019890531.europe-west2.run.app';

  const handleCopyDevLink = () => {
    navigator.clipboard.writeText(devAppUrl);
    setCopiedDev(true);
    setTimeout(() => setCopiedDev(false), 2000);
  };

  const handleDownloadHtml = () => {
    const content = generateStandaloneHtml();
    downloadFile(content, 'AI_Industries_Guide_2025_2026.html', 'text/html;charset=utf-8');
    setDownloadSuccess('html');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    const content = generateMarkdownGuide();
    downloadFile(content, 'AI_Industries_Guide_2025_2026.md', 'text/markdown;charset=utf-8');
    setDownloadSuccess('md');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleDownloadJSON = () => {
    const content = JSON.stringify(INDUSTRY_SECTORS, null, 2);
    downloadFile(content, 'AI_Industries_Data_2025_2026.json', 'application/json;charset=utf-8');
    setDownloadSuccess('json');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Веб-версия и Экспорт данных
              </h3>
              <p className="text-xs text-slate-400">
                Как открыть в браузере или сохранить автономную копию
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Direct Working Web Link (ais-dev) */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Прямая ссылка на работающий сервер
            </span>
            <span className="text-emerald-400 font-mono">Активен онлайн</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={devAppUrl}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs font-mono text-cyan-300 truncate focus:outline-none"
            />
            <button
              onClick={handleCopyDevLink}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copiedDev ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Копировать</span>
                </>
              )}
            </button>
            <a
              href={devAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Открыть</span>
            </a>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <b>Почему ссылка <code className="text-slate-300">ais-pre</code> выдавала 404?</b> Ссылка с приставкой <code className="text-slate-300">ais-pre</code> активируется только после нажатия кнопки <b>«Share / Publish»</b> в верхнем правом углу Google AI Studio. Активная же ссылка сервера — это <code className="text-cyan-300">ais-dev</code> (указана выше).
            </span>
          </div>
        </div>

        {/* 2. Export Actions Grid */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Выгрузить автономную версию на компьютер
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Standalone HTML */}
            <button
              onClick={handleDownloadHtml}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Laptop className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
              </div>
              <div className="text-xs font-bold text-white">Автономный HTML-сайт (.html)</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Открывается в любом браузере двойным кликом даже без интернета
              </div>
              {downloadSuccess === 'html' && (
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  ✓ HTML-файл скачан!
                </div>
              )}
            </button>

            {/* Markdown */}
            <button
              onClick={handleDownloadMarkdown}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
              </div>
              <div className="text-xs font-bold text-white">Markdown-документ (.md)</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Для Notion, Obsidian, GitHub и Word
              </div>
              {downloadSuccess === 'md' && (
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  ✓ Файл скачан!
                </div>
              )}
            </button>

            {/* Print / PDF */}
            <button
              onClick={handlePrint}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Printer className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
              </div>
              <div className="text-xs font-bold text-white">Печать / Сохранить в PDF</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Адаптировано под печать на листах A4
              </div>
            </button>

            {/* JSON Data */}
            <button
              onClick={handleDownloadJSON}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-950 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Code className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <Download className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <div className="text-xs font-bold text-white">База данных в JSON</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Для интеграции в свои проекты
              </div>
              {downloadSuccess === 'json' && (
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  ✓ Файл скачан!
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 flex items-center justify-between">
          <span>Стек: React 19 + TypeScript + Vite + Tailwind CSS</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
