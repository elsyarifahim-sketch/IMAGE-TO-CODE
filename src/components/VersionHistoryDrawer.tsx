import React, { useState, useMemo } from "react";
import { CodeVersion } from "../types";
import { computeLineDiff } from "../utils/diffHelper";
import {
  History,
  GitCommit,
  RotateCcw,
  Plus,
  X,
  Clock,
  ArrowLeftRight,
  Check,
  FileCode,
  Sparkles,
  User,
  Wand2,
  ChevronRight,
  Columns,
  Rows3,
  Search
} from "lucide-react";

interface VersionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  versions: CodeVersion[];
  currentCode: string;
  onRevertToVersion: (version: CodeVersion) => void;
  onCreateSnapshot: (label: string, description?: string) => void;
  darkMode: boolean;
}

export const VersionHistoryDrawer: React.FC<VersionHistoryDrawerProps> = ({
  isOpen,
  onClose,
  versions,
  currentCode,
  onRevertToVersion,
  onCreateSnapshot,
  darkMode,
}) => {
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    versions[0]?.id || null
  );
  const [diffMode, setDiffMode] = useState<"unified" | "split">("unified");
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);
  const [newSnapshotLabel, setNewSnapshotLabel] = useState("");
  const [newSnapshotDesc, setNewSnapshotDesc] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const activeSelectedVersion = useMemo(() => {
    return versions.find((v) => v.id === selectedVersionId) || versions[0] || null;
  }, [versions, selectedVersionId]);

  // Compute diff between selected version (old) and current editor code (new)
  const diff = useMemo(() => {
    if (!activeSelectedVersion) return null;
    return computeLineDiff(activeSelectedVersion.code, currentCode);
  }, [activeSelectedVersion, currentCode]);

  const filteredVersions = useMemo(() => {
    if (!searchFilter.trim()) return versions;
    const query = searchFilter.toLowerCase();
    return versions.filter(
      (v) =>
        v.label.toLowerCase().includes(query) ||
        (v.description && v.description.toLowerCase().includes(query)) ||
        v.author.toLowerCase().includes(query)
    );
  }, [versions, searchFilter]);

  if (!isOpen) return null;

  const handleCreateSnapshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnapshotLabel.trim()) return;
    onCreateSnapshot(newSnapshotLabel.trim(), newSnapshotDesc.trim() || undefined);
    setNewSnapshotLabel("");
    setNewSnapshotDesc("");
    setIsCreatingSnapshot(false);
  };

  const formatTimeAgo = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="absolute inset-0 z-40 flex bg-slate-950/95 backdrop-blur-md border-t border-slate-800 animate-in fade-in duration-200">
      {/* Left Timeline Panel */}
      <div className="w-80 border-r border-slate-800 flex flex-col h-full bg-slate-900/60">
        {/* Drawer Header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <GitCommit className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Version History</h3>
              <p className="text-[10px] text-slate-400">{versions.length} recorded state(s)</p>
            </div>
          </div>

          <button
            onClick={() => setIsCreatingSnapshot(!isCreatingSnapshot)}
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-medium transition cursor-pointer"
            title="Create manual code snapshot"
          >
            <Plus className="w-3 h-3" />
            <span>Snapshot</span>
          </button>
        </div>

        {/* Create Snapshot Inline Form */}
        {isCreatingSnapshot && (
          <form onSubmit={handleCreateSnapshot} className="p-3 bg-slate-950 border-b border-slate-800 space-y-2">
            <div className="text-[11px] font-semibold text-slate-200 flex items-center justify-between">
              <span>Save Current Version</span>
              <button
                type="button"
                onClick={() => setIsCreatingSnapshot(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <input
              type="text"
              placeholder="e.g., Before mobile refactor"
              value={newSnapshotLabel}
              onChange={(e) => setNewSnapshotLabel(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:border-blue-500 outline-none"
              autoFocus
            />
            <input
              type="text"
              placeholder="Optional notes or context..."
              value={newSnapshotDesc}
              onChange={(e) => setNewSnapshotDesc(e.target.value)}
              className="w-full px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-slate-300 placeholder-slate-500 focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setIsCreatingSnapshot(false)}
                className="px-2 py-1 text-[10px] text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium rounded transition"
              >
                Save Commit
              </button>
            </div>
          </form>
        )}

        {/* Filter Input */}
        <div className="p-2 border-b border-slate-800/80 bg-slate-950/40">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2.5 top-2 text-slate-500" />
            <input
              type="text"
              placeholder="Filter timeline..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-7 pr-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-300 placeholder-slate-500 outline-none focus:border-slate-700"
            />
          </div>
        </div>

        {/* Timeline List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {filteredVersions.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">No versions match query.</div>
          ) : (
            filteredVersions.map((ver, idx) => {
              const isSelected = activeSelectedVersion?.id === ver.id;
              const isLatest = idx === 0;

              return (
                <div
                  key={ver.id}
                  onClick={() => setSelectedVersionId(ver.id)}
                  className={`p-3 transition cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-blue-600/15 border-l-2 border-blue-500 text-white"
                      : "hover:bg-slate-800/50 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                          ver.author === "AI"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : ver.author === "Optimizer"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {ver.author === "AI" ? (
                          <span className="flex items-center gap-0.5"><Sparkles className="w-2.5 h-2.5" /> AI</span>
                        ) : ver.author === "Optimizer" ? (
                          <span className="flex items-center gap-0.5"><Wand2 className="w-2.5 h-2.5" /> OPT</span>
                        ) : (
                          <span className="flex items-center gap-0.5"><User className="w-2.5 h-2.5" /> YOU</span>
                        )}
                      </span>
                      <span className="text-xs font-semibold truncate max-w-[140px]">{ver.label}</span>
                    </div>

                    {isLatest && (
                      <span className="text-[9px] font-mono px-1 bg-slate-800 text-slate-400 rounded">
                        Latest
                      </span>
                    )}
                  </div>

                  {ver.description && (
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ver.description}</p>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      {formatTimeAgo(ver.timestamp)}
                    </span>
                    <span>
                      {ver.lineCount} lines • {ver.framework}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Diff & Inspection Panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Diff Action Header */}
        <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/70 shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">
                  Comparing: <span className="text-blue-400">{activeSelectedVersion?.label}</span>
                </span>
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-semibold text-emerald-400">Current Editor State</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono mt-0.5">
                <span className="text-emerald-400">+{diff?.addedCount || 0} additions</span>
                <span className="text-rose-400">-{diff?.removedCount || 0} deletions</span>
                <span className="text-slate-400">{diff?.unchangedCount || 0} identical</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-950 border border-slate-800 rounded p-0.5">
              <button
                onClick={() => setDiffMode("unified")}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition ${
                  diffMode === "unified" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Unified Diff View"
              >
                <Rows3 className="w-3 h-3" />
                <span>Unified</span>
              </button>
              <button
                onClick={() => setDiffMode("split")}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono transition ${
                  diffMode === "split" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Side-by-Side Split View"
              >
                <Columns className="w-3 h-3" />
                <span>Split</span>
              </button>
            </div>

            {/* Revert Button */}
            {activeSelectedVersion && (
              <button
                onClick={() => {
                  if (window.confirm(`Revert code editor back to "${activeSelectedVersion.label}"? Current unsaved edits will be replaced.`)) {
                    onRevertToVersion(activeSelectedVersion);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert to this Version</span>
              </button>
            )}

            {/* Close Drawer */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diff Content View */}
        <div className="flex-1 overflow-auto font-mono text-xs p-4 leading-relaxed">
          {diffMode === "unified" ? (
            <div className="space-y-0.5 bg-slate-900/40 rounded-xl p-3 border border-slate-800/80">
              {diff?.lines.map((line, i) => {
                const isAdded = line.type === "added";
                const isRemoved = line.type === "removed";

                return (
                  <div
                    key={i}
                    className={`flex items-start px-2 py-0.5 rounded transition ${
                      isAdded
                        ? "bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500"
                        : isRemoved
                        ? "bg-rose-950/40 text-rose-300 border-l-2 border-rose-500 line-through opacity-80"
                        : "text-slate-400 hover:bg-slate-800/30"
                    }`}
                  >
                    <span className="w-8 select-none text-[10px] text-slate-600 text-right pr-2">
                      {line.oldLineNumber || ""}
                    </span>
                    <span className="w-8 select-none text-[10px] text-slate-600 text-right pr-3">
                      {line.newLineNumber || ""}
                    </span>
                    <span className="w-4 select-none font-bold text-center">
                      {isAdded ? "+" : isRemoved ? "-" : " "}
                    </span>
                    <span className="flex-1 whitespace-pre overflow-x-auto pl-1">
                      {line.content || " "}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Split Side-by-Side View */
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Past Version (Selected) */}
              <div className="flex flex-col rounded-xl border border-slate-800 overflow-hidden bg-slate-900/30">
                <div className="p-2 border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold text-slate-300 flex items-center justify-between">
                  <span>Selected Version ({activeSelectedVersion?.label})</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {activeSelectedVersion?.lineCount} lines
                  </span>
                </div>
                <pre className="p-3 overflow-auto flex-1 text-slate-300 whitespace-pre">
                  {activeSelectedVersion?.code}
                </pre>
              </div>

              {/* Current Version */}
              <div className="flex flex-col rounded-xl border border-slate-800 overflow-hidden bg-slate-900/30">
                <div className="p-2 border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold text-emerald-400 flex items-center justify-between">
                  <span>Current Editor State</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {currentCode.split("\n").length} lines
                  </span>
                </div>
                <pre className="p-3 overflow-auto flex-1 text-slate-200 whitespace-pre">
                  {currentCode}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
