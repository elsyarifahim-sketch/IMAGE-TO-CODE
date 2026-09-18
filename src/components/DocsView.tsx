import React from "react";
import { BookOpen, Sparkles, Upload, FileCode2, Layers, CheckCircle, ExternalLink } from "lucide-react";

interface DocsViewProps {
  onOpenWorkspace: () => void;
  darkMode: boolean;
}

export const DocsView: React.FC<DocsViewProps> = ({ onOpenWorkspace, darkMode }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 max-w-4xl mx-auto text-slate-300 text-xs leading-relaxed">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <span>Documentation & Architecture Guide</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Learn how CodeVision AI transforms visual images into production source code
        </p>
      </div>

      {/* How it works */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          The Vision-to-Code Pipeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 font-bold flex items-center justify-center">1</div>
            <h3 className="font-semibold text-white">Visual Layout Ingestion</h3>
            <p className="text-[11px] text-slate-400">
              Uploaded screenshots or wireframes are ingested and pre-processed with color quantization and element detection.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center">2</div>
            <h3 className="font-semibold text-white">Semantic AI Synthesis</h3>
            <p className="text-[11px] text-slate-400">
              Gemini Multimodal extracts typography, interactive components, responsive flex/grid wrappers, and exact hex tokens.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center">3</div>
            <h3 className="font-semibold text-white">Live Execution & Bundling</h3>
            <p className="text-[11px] text-slate-400">
              The code is rendered immediately in the sandboxed preview with live editing, formatting, and 1-click ZIP export.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Best Practices for Highest Visual Fidelity
        </h2>
        <ul className="space-y-2.5 text-slate-300 text-xs">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Clear Contrast:</strong> High-contrast screenshots with legible text yield superior component recognition.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Multi-Screen Flows:</strong> When uploading multiple images, select the relevant screen from the top tabs before generating target code.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Prompt Customization:</strong> Use the <em>AI Instructions</em> dialog to enforce dark themes, specific CSS frameworks, or mobile-first layouts.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">•</span>
            <span><strong>Interactive Previews:</strong> Web targets (HTML, Tailwind, React JSX) update in real-time as you type in the code editor.</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Ready to convert a design?</h3>
          <p className="text-xs text-slate-400">Head over to the converter workspace and upload your first screenshot.</p>
        </div>
        <button
          onClick={onOpenWorkspace}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer"
        >
          Open Workspace
        </button>
      </div>
    </div>
  );
};
