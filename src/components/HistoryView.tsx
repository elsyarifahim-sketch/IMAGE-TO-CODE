import React, { useState } from "react";
import { ConversionItem } from "../types";
import { 
  History, 
  Search, 
  Trash2, 
  ArrowUpRight, 
  Copy, 
  Download, 
  Check, 
  Calendar,
  Layers,
  Palette
} from "lucide-react";
import { downloadSingleFile } from "../utils/zipExport";

interface HistoryViewProps {
  history: ConversionItem[];
  onRestoreConversion: (item: ConversionItem) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
  darkMode: boolean;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onRestoreConversion,
  onClearHistory,
  onDeleteHistoryItem,
  darkMode,
}) => {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.language.toLowerCase().includes(search.toLowerCase()) ||
      item.framework.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" />
            <span>Code Conversion History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse and restore previous visual-to-code conversions
          </p>
        </div>

        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-500/20 hover:bg-rose-500/10 transition cursor-pointer"
            >
              Clear All History
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversions by title, language, or framework..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* History Grid / List */}
      {filteredHistory.length === 0 ? (
        <div className="py-16 text-center text-slate-500 space-y-2">
          <History className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-medium text-slate-400">No conversions match your query</p>
          <p className="text-xs text-slate-500">Conversions performed in the workspace will automatically save here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imagePreview}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-xl border border-slate-800 shrink-0 bg-slate-950"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {item.language}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate">{item.framework}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteHistoryItem(item.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Elements & Palettes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.detectedElements.slice(0, 4).map((el, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {el}
                    </span>
                  ))}
                  {item.detectedElements.length > 4 && (
                    <span className="text-[10px] text-slate-500 px-1">
                      +{item.detectedElements.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(item.id, item.code)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Copy code"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => onRestoreConversion(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition cursor-pointer"
                  >
                    <span>Load in Workspace</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
