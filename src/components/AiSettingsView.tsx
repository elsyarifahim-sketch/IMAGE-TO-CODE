import React, { useState } from "react";
import { AiSettings } from "../types";
import { Sliders, Cpu, Sparkles, Check, RotateCcw, ShieldCheck, ToggleLeft, ToggleRight } from "lucide-react";

interface AiSettingsViewProps {
  settings: AiSettings;
  onUpdateSettings: (newSettings: AiSettings) => void;
  onResetDefaults: () => void;
  darkMode: boolean;
}

export const AiSettingsView: React.FC<AiSettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetDefaults,
  darkMode,
}) => {
  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = <K extends keyof AiSettings>(key: K, value: AiSettings[K]) => {
    onUpdateSettings({
      ...settings,
      [key]: value,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <span>AI Model & Vision Settings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fine-tune Gemini multimodal vision models and code synthesis hyperparameters
          </p>
        </div>

        <button
          onClick={onResetDefaults}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Settings saved and synced to active vision pipeline.</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="space-y-6">
        {/* Model Selection */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Multimodal Vision Model</h3>
              <p className="text-xs text-slate-400">Select which Gemini foundation model processes visual inputs</p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" /> Recommended
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: "gemini-2.5-flash",
                name: "Gemini 2.5 Flash",
                tag: "Fastest & Ultra Responsive",
                desc: "Optimized for sub-second UI image-to-code conversions and fast live preview streaming.",
              },
              {
                id: "gemini-2.5-pro",
                name: "Gemini 2.5 Pro",
                tag: "Maximum Architecture Reasoning",
                desc: "Best for complex multi-screen wireframes, complex nested layouts, and full backend scaffolding.",
              },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => handleChange("selectedModel", m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  settings.selectedModel === m.id
                    ? "bg-blue-600/15 border-blue-500 text-white"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold">{m.name}</h4>
                    {settings.selectedModel === m.id && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 mt-0.5 block">{m.tag}</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">Synthesis Temperature ({settings.temperature})</h3>
              <p className="text-xs text-slate-400">Lower values ensure deterministic pixel fidelity; higher values add creative flair</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              {settings.temperature < 0.3 ? "Strict Fidelity" : settings.temperature < 0.7 ? "Balanced" : "Creative"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.temperature}
            onChange={(e) => handleChange("temperature", parseFloat(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0.0 (Strict Wireframe Match)</span>
            <span>0.5 (Balanced)</span>
            <span>1.0 (Creative Layout)</span>
          </div>
        </div>

        {/* Architectural Generation Toggles */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Generation Rules & Preferences</h3>
            <p className="text-xs text-slate-400">Control layout structure and styling outputs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => handleChange("responsiveFlexGrid", !settings.responsiveFlexGrid)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
            >
              <div>
                <div className="text-xs font-semibold text-white">Responsive Flex/Grid</div>
                <div className="text-[10px] text-slate-400">Eliminate fixed pixel coordinates</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${settings.responsiveFlexGrid ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                {settings.responsiveFlexGrid ? "ON" : "OFF"}
              </span>
            </div>

            <div
              onClick={() => handleChange("preserveExactColors", !settings.preserveExactColors)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
            >
              <div>
                <div className="text-xs font-semibold text-white">Extract Exact Hex Colors</div>
                <div className="text-[10px] text-slate-400">Inject sampled design tokens</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${settings.preserveExactColors ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                {settings.preserveExactColors ? "ON" : "OFF"}
              </span>
            </div>

            <div
              onClick={() => handleChange("useTailwindCDN", !settings.useTailwindCDN)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
            >
              <div>
                <div className="text-xs font-semibold text-white">Tailwind CSS v4 CDN</div>
                <div className="text-[10px] text-slate-400">Include modern utilities in previews</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${settings.useTailwindCDN ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                {settings.useTailwindCDN ? "ON" : "OFF"}
              </span>
            </div>

            <div
              onClick={() => handleChange("generateMultiFile", !settings.generateMultiFile)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
            >
              <div>
                <div className="text-xs font-semibold text-white">Multi-File Modular Scaffolding</div>
                <div className="text-[10px] text-slate-400">Separate types and subcomponents</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${settings.generateMultiFile ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}>
                {settings.generateMultiFile ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>

        {/* System Prompt Customizer */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Global System Instructions</h3>
            <p className="text-xs text-slate-400">Rules applied to every visual analysis and code generation prompt</p>
          </div>

          <textarea
            rows={4}
            value={settings.customSystemInstruction}
            onChange={(e) => handleChange("customSystemInstruction", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-blue-500 font-mono leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
