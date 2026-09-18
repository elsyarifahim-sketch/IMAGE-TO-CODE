import React, { useState } from "react";
import { CodeExplanationResult } from "../types";
import {
  Sparkles,
  X,
  Copy,
  Check,
  RefreshCw,
  Layers,
  Palette,
  ShieldCheck,
  Cpu,
  BookOpen,
  ArrowUpRight,
  Maximize2,
  CheckCircle2,
  ListOrdered
} from "lucide-react";

interface ExplainCodePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onExpandModal: () => void;
  explanationResult: CodeExplanationResult | null;
  isLoading: boolean;
  onReAnalyze: () => void;
  language: string;
  framework: string;
  darkMode: boolean;
}

export const ExplainCodePanel: React.FC<ExplainCodePanelProps> = ({
  isOpen,
  onClose,
  onExpandModal,
  explanationResult,
  isLoading,
  onReAnalyze,
  language,
  framework,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "components" | "architecture">("all");

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!explanationResult) return;
    const text = `## Code Explanation: ${language} (${framework})

### Overview
${explanationResult.summary}

### Functionality
${explanationResult.functionality}

### Structure & Layout
${explanationResult.structure}

### Key Components
${explanationResult.keyComponents.map((c) => `- **${c.name}**: ${c.purpose}`).join("\n")}

### Styling & Theme
${explanationResult.stylingAndTheme}

### Accessibility
${explanationResult.accessibility}

### Customization Tips
${explanationResult.customizationTips.map((t) => `- ${t}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-80 sm:w-96 border-l border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden shrink-0 animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Code Explanation</span>
              <span className="text-[9px] font-mono font-normal text-purple-400 bg-purple-500/10 px-1 rounded">
                AI Vision
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 truncate max-w-[170px]">
              {language} • {framework}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            disabled={!explanationResult || isLoading}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition disabled:opacity-40 cursor-pointer"
            title="Copy explanation markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onExpandModal}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Expand to full modal"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Close explanation panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/40 text-[11px] font-medium text-slate-400">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 text-center transition ${
            activeTab === "all" ? "text-blue-400 border-b-2 border-blue-500 bg-slate-900/60 font-semibold" : "hover:text-slate-200"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("components")}
          className={`flex-1 py-2 text-center transition ${
            activeTab === "components" ? "text-blue-400 border-b-2 border-blue-500 bg-slate-900/60 font-semibold" : "hover:text-slate-200"
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex-1 py-2 text-center transition ${
            activeTab === "architecture" ? "text-blue-400 border-b-2 border-blue-500 bg-slate-900/60 font-semibold" : "hover:text-slate-200"
          }`}
        >
          Layout & Tips
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed text-slate-300">
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
            <div>
              <div className="text-xs font-semibold text-white">Analyzing Generated Code...</div>
              <div className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                Deconstructing visual hierarchy, components, and responsive structure
              </div>
            </div>
          </div>
        ) : !explanationResult ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <BookOpen className="w-6 h-6 text-slate-600" />
            <div className="text-xs text-slate-400">Click "Explain Code" to generate architectural breakdown.</div>
            <button
              onClick={onReAnalyze}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Analyze Code Now
            </button>
          </div>
        ) : (
          <>
            {/* Overview / Functionality */}
            {(activeTab === "all" || activeTab === "architecture") && (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>Functionality & Behavior</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {explanationResult.functionality}
                </p>
                <div className="pt-1 text-[11px] text-slate-400 italic">
                  "{explanationResult.summary}"
                </div>
              </div>
            )}

            {/* Structure & Layout */}
            {(activeTab === "all" || activeTab === "architecture") && (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Architecture & Structure</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {explanationResult.structure}
                </p>
              </div>
            )}

            {/* Key Components */}
            {(activeTab === "all" || activeTab === "components") && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Key Components ({explanationResult.keyComponents.length})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {explanationResult.keyComponents.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1"
                    >
                      <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span>{comp.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal pl-3">
                        {comp.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Styling, Theme & Accessibility */}
            {activeTab === "all" && (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <Palette className="w-3.5 h-3.5 text-purple-400" />
                  <span>Styling & Accessibility</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {explanationResult.stylingAndTheme}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{explanationResult.accessibility}</span>
                </div>
              </div>
            )}

            {/* Customization Tips */}
            {(activeTab === "all" || activeTab === "architecture") && (
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-wider">
                  <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
                  <span>Integration & Next Steps</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  {explanationResult.customizationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 border-t border-slate-800 bg-slate-900/70 flex items-center justify-between shrink-0">
        <button
          onClick={onReAnalyze}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition cursor-pointer disabled:opacity-40"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
          <span>Re-Analyze</span>
        </button>

        <button
          onClick={onExpandModal}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
        >
          <span>Full Modal View</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
