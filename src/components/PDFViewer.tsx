"use client";

import React from "react";
import { X, Download, ExternalLink, Maximize2 } from "lucide-react";

interface PDFViewerProps {
  filename: string;
  title: string;
  onClose: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ filename, title, onClose }) => {
  const filePath = `/files/${filename}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative flex flex-col w-full h-[90vh] max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">معاينة مباشرة للمستند التعليمي</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={filePath}
              download={filename}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>تحميل</span>
            </a>
            <a
              href={filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              title="فتح في علامة تبويب جديدة"
            >
              <ExternalLink size={16} />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Body */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-hidden relative">
          {filename.endsWith(".docx") ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-800 dark:text-slate-200">
              <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-full mb-3 text-emerald-500">
                <Download size={40} />
              </div>
              <h4 className="text-lg font-bold mb-2">مستند Word (.docx)</h4>
              <p className="text-sm text-slate-500 max-w-sm mb-4">لا يمكن معاينة ملفات Word مباشرة في المتصفح. يرجى تحميل الملف لفتحه على جهازك.</p>
              <a
                href={filePath}
                download={filename}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer"
              >
                تحميل المستند الآن
              </a>
            </div>
          ) : (
            <iframe
              src={`${filePath}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0 bg-white"
              title={title}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 dark:text-slate-500 flex justify-between items-center">
          <span>أكاديمية ADVVVV11 للمراجعات</span>
          <span className="text-emerald-500 font-bold font-sans">2026 © حمد العبدولي</span>
        </div>

      </div>
    </div>
  );
};
