import React, { useState } from "react";
import { QUICK_PROMPTS } from "../data/languages";
import { MessageSquareCode, Sparkles, X, Check } from "lucide-react";

interface PromptControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  customPrompt: string;
  onSavePrompt: (prompt: string) => void;
  onApplyPreset: (preset: string) => void;
}

export const PromptControlModal: React.FC<PromptControlModalProps> = ({
  isOpen,
  onClose,
  customPrompt,
  onSavePrompt,
  onApplyPreset,
}) => {
  const [localPrompt, setLocalPrompt] = useState(customPrompt);

  if (!isOpen) return null;

  const handleSave = () => {
    onSavePrompt(localPrompt);
    onClose();
  };

  const handleSelectPreset = (preset: string) => {
    onApplyPreset(preset);
    if (!localPrompt.includes(preset)) {
      setLocalPrompt((prev) => (prev ? `${prev}\n- ${preset}` : `- ${preset}`));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquareCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Vision & Code Prompt Control</h3>
              <p className="text-xs text-slate-400">Instruct Gemini on custom conversion constraints and styling rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Quick Prompt Presets */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Quick Rule Presets (Click to add)
            </label>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt, i) => {
                const isSelected = localPrompt.includes(prompt);
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectPreset(prompt)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-purple-600/20 border-purple-500 text-purple-300 font-medium"
                        : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-purple-400" />}
                    <span>{prompt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Instruction Box */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Custom Vision & Architecture Instructions
            </label>
            <textarea
              rows={4}
              value={localPrompt}
              onChange={(e) => setLocalPrompt(e.target.value)}
              placeholder="e.g. Ensure high contrast for dark mode, use Inter font, extract exact hex colors, keep cards under 400px width on mobile..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500 transition leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <button
            onClick={() => setLocalPrompt("")}
            className="text-xs text-slate-400 hover:text-rose-400 transition"
          >
            Clear Instructions
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/20 transition"
            >
              Apply Prompt Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
