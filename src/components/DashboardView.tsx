import React from "react";
import { DashboardStats, ConversionItem, SupportedLanguage } from "../types";
import { SUPPORTED_LANGUAGES } from "../data/languages";
import { 
  Sparkles, 
  FolderGit2, 
  FileCode2, 
  Activity, 
  ArrowUpRight, 
  Upload, 
  Library, 
  Cpu, 
  Clock, 
  Layers,
  CheckCircle2,
  TrendingUp,
  ExternalLink
} from "lucide-react";

interface DashboardViewProps {
  stats: DashboardStats;
  history: ConversionItem[];
  onOpenWorkspace: () => void;
  onOpenTemplates: () => void;
  onOpenApiDocs: () => void;
  onRestoreConversion: (item: ConversionItem) => void;
  darkMode: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  history,
  onOpenWorkspace,
  onOpenTemplates,
  onOpenApiDocs,
  onRestoreConversion,
  darkMode,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Multimodal Vision Code Synthesis Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Transform Wireframes & UI Screenshots into Production Source Code
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Upload any user interface design, prototype, or napkin wireframe. CodeVision AI automatically isolates layout, detects interactive components, extracts exact hex palettes, and synthesizes clean semantic code.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onOpenWorkspace}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Launch Converter Workspace</span>
            </button>
            <button
              onClick={onOpenTemplates}
              className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium transition flex items-center gap-2 cursor-pointer"
            >
              <Library className="w-4 h-4" />
              <span>Browse UI Templates</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Conversions</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.totalConversions.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24% this month</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Generated Projects</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.generatedProjects.toLocaleString()}
          </div>
          <p className="text-[11px] text-purple-400">Saved in workspace storage</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Supported Languages</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FileCode2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.supportedLanguages}
          </div>
          <p className="text-[11px] text-indigo-400">Web, Mobile & Backend targets</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>API Usage</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {stats.apiUsage} calls
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>REST Endpoints Active</span>
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Conversions & Supported Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Conversions (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Conversions</h2>
              <p className="text-xs text-slate-400">Past converted designs ready to inspect or re-export</p>
            </div>
            <button
              onClick={onOpenWorkspace}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Open Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Clock className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">No conversions yet. Upload an image in the workspace to start!</p>
              <button
                onClick={onOpenWorkspace}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
              >
                Convert First Design
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onRestoreConversion(item)}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imagePreview}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-lg border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                        <span className="text-blue-400 font-mono font-medium">{item.language}</span>
                        <span>•</span>
                        <span>{item.framework}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestoreConversion(item);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-medium transition shrink-0"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supported Languages Directory */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Target Ecosystem</h2>
              <p className="text-xs text-slate-400">16 Output Formats</p>
            </div>
            <button
              onClick={onOpenApiDocs}
              className="text-xs text-blue-400 hover:underline"
            >
              API Docs
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {SUPPORTED_LANGUAGES.slice(0, 10).map((lang) => (
              <div
                key={lang.id}
                className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="truncate">
                  <p className="text-xs font-medium text-white truncate">{lang.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{lang.category}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">.{lang.extension}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenWorkspace}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            Explore All 16 Languages
          </button>
        </div>
      </div>
    </div>
  );
};
