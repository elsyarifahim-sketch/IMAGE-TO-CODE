import React from "react";
import { SAMPLE_TEMPLATES } from "../data/sampleTemplates";
import { SampleTemplate } from "../types";
import { Library, ArrowUpRight, Sparkles, Layers, Palette } from "lucide-react";

interface TemplatesViewProps {
  onLoadTemplate: (templateId: string) => void;
  darkMode: boolean;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onLoadTemplate,
  darkMode,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Library className="w-5 h-5 text-indigo-400" />
          <span>Curated Wireframe Templates</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Pre-analyzed design templates ready to convert and inspect in 1 click
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            {/* Visual Thumbnail */}
            <div className="relative h-48 bg-slate-950 p-3 flex items-center justify-center border-b border-slate-800 overflow-hidden">
              <img
                src={tpl.thumbnail}
                alt={tpl.title}
                className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-900/90 text-blue-400 border border-slate-700">
                {tpl.category}
              </span>
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {tpl.difficulty}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  {tpl.description}
                </p>
              </div>

              {/* Elements & Palettes */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap gap-1">
                  {tpl.detectedElements.slice(0, 3).map((el, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {el}
                    </span>
                  ))}
                  {tpl.detectedElements.length > 3 && (
                    <span className="text-[10px] text-slate-500 px-1">
                      +{tpl.detectedElements.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  {tpl.colorPalette.slice(0, 5).map((hex, i) => (
                    <span
                      key={i}
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onLoadTemplate(tpl.id)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Load Template in Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
