import React, { useState } from "react";
import { CodeExplanationResult } from "../types";
import {
  Sparkles,
  X,
  CheckCircle2,
  Layers,
  Palette,
  Code,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  ListOrdered
} from "lucide-react";

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  explanation: string;
  explanationResult?: CodeExplanationResult | null;
  language: string;
  framework: string;
  detectedElements: string[];
  colorPalette: string[];
}

export const ExplainModal: React.FC<ExplainModalProps> = ({
  isOpen,
  onClose,
  explanation,
  explanationResult,
  language,
  framework,
  detectedElements,
  colorPalette,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = explanationResult
      ? `## Architecture Breakdown: ${language} (${framework})

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

### Integration Tips
${explanationResult.customizationTips.map((t) => `- ${t}`).join("\n")}
`
      : explanation;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Architecture & Code Analysis</h3>
              <p className="text-xs text-slate-400">Deep layout breakdown for {language} • {framework}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition cursor-pointer"
              title="Copy full explanation"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* Executive Overview & Functionality */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Overview & Functionality
            </h4>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {explanationResult?.functionality ||
                explanation ||
                "This code converts the visual screenshot into a clean semantic structure. Layout containers use responsive Flexbox and Grid models to adjust fluidly across mobile and desktop displays without fixed pixel constraints."}
            </p>
          </div>

          {/* Architectural Layout */}
          {explanationResult?.structure && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Structural Layout & Grid System
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {explanationResult.structure}
              </p>
            </div>
          )}

          {/* Key Components Breakdown */}
          {explanationResult?.keyComponents && explanationResult.keyComponents.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Components Identified ({explanationResult.keyComponents.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {explanationResult.keyComponents.map((comp, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1"
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
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Recognized Visual Hierarchy
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {detectedElements.map((elem, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200">{elem}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Styling, Theme & Accessibility */}
          {explanationResult && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Accessibility & Design System
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {explanationResult.stylingAndTheme}
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-300">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{explanationResult.accessibility}</span>
              </div>
            </div>
          )}

          {/* Extracted Theme & Palette */}
          {colorPalette.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                Color Tokens Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorPalette.map((hex, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: hex }}
                    ></span>
                    <span className="font-mono text-[11px] text-slate-300">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customization & Integration Tips */}
          {explanationResult?.customizationTips && (
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2">
              <h4 className="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
                Integration & Customization Tips
              </h4>
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
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
