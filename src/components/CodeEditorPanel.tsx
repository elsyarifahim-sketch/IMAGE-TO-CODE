import React, { useState, useMemo } from "react";
import { SupportedLanguage, CodeFile, CodeVersion, CodeExplanationResult } from "../types";
import { SUPPORTED_LANGUAGES, QUICK_PROMPTS } from "../data/languages";
import { VersionHistoryDrawer } from "./VersionHistoryDrawer";
import { ExplainCodePanel } from "./ExplainCodePanel";
import { 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Wand2, 
  AlignLeft, 
  Search, 
  FileCode2, 
  ChevronDown, 
  Maximize2,
  FolderTree,
  Plus,
  Trash2,
  Settings2,
  MessageSquareCode,
  GitCommit,
  BookOpen
} from "lucide-react";

interface CodeEditorPanelProps {
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  framework: string;
  onChangeFramework: (framework: string) => void;
  code: string;
  onChangeCode: (newCode: string) => void;
  files: CodeFile[];
  activeFileIndex: number;
  onSelectFileIndex: (idx: number) => void;
  onAddFile: (name: string) => void;
  onDeleteFile: (idx: number) => void;
  onCopyCode: () => void;
  onDownloadCode: () => void;
  onRegenerate: () => void;
  onExplainCode: () => void;
  onOptimizeCode: () => void;
  onFormatCode: () => void;
  onOpenPromptControl: () => void;
  isGenerating: boolean;
  darkMode: boolean;
  // Version Control Props
  versions: CodeVersion[];
  onRevertToVersion: (version: CodeVersion) => void;
  onCreateSnapshot: (label: string, description?: string) => void;
  // Explain Code Props
  explanationResult: CodeExplanationResult | null;
  isExplaining: boolean;
  showExplainPanel: boolean;
  setShowExplainPanel: (show: boolean) => void;
  onExpandExplainModal: () => void;
}

export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({
  language,
  onChangeLanguage,
  framework,
  onChangeFramework,
  code,
  onChangeCode,
  files,
  activeFileIndex,
  onSelectFileIndex,
  onAddFile,
  onDeleteFile,
  onCopyCode,
  onDownloadCode,
  onRegenerate,
  onExplainCode,
  onOptimizeCode,
  onFormatCode,
  onOpenPromptControl,
  isGenerating,
  darkMode,
  versions,
  onRevertToVersion,
  onCreateSnapshot,
  explanationResult,
  isExplaining,
  showExplainPanel,
  setShowExplainPanel,
  onExpandExplainModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isFrameworkDropdownOpen, setIsFrameworkDropdownOpen] = useState(false);
  const [showVersionDrawer, setShowVersionDrawer] = useState(false);

  const lines = useMemo(() => code.split("\n"), [code]);

  const handleCopy = () => {
    onCopyCode();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSearchReplace = () => {
    if (!searchQuery) return;
    const newCode = code.replaceAll(searchQuery, replaceQuery);
    onChangeCode(newCode);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950 border-r border-slate-800 relative">
      {/* Top Controls: Language & Framework Selectors */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700/80 text-white border border-slate-700 transition cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{language.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLanguageDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLanguageDropdownOpen(false)}
                ></div>
                <div className="absolute left-0 top-full mt-1.5 w-64 max-h-80 overflow-y-auto rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Supported Languages (16)
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        onChangeLanguage(lang);
                        onChangeFramework(lang.defaultFramework);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left cursor-pointer ${
                        language.id === lang.id
                          ? "bg-blue-600/20 text-blue-300 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        .{lang.extension}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Framework Selector Dropdown */}
          <div className="relative">
            <button
              id="framework-selector-btn"
              onClick={() => setIsFrameworkDropdownOpen(!isFrameworkDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition cursor-pointer"
            >
              <span className="text-slate-400">Style:</span>
              <span className="text-white truncate max-w-[130px]">{framework}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isFrameworkDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsFrameworkDropdownOpen(false)}
                ></div>
                <div className="absolute left-0 top-full mt-1.5 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Styling / Framework
                  </div>
                  {language.availableFrameworks.map((fw) => (
                    <button
                      key={fw}
                      onClick={() => {
                        onChangeFramework(fw);
                        setIsFrameworkDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left cursor-pointer ${
                        framework === fw
                          ? "bg-blue-600/20 text-blue-300 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{fw}</span>
                      {framework === fw && <Check className="w-3 h-3 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action triggers: Prompt Control + Version History */}
        <div className="flex items-center gap-2">
          {/* Version Control Badge Button */}
          <button
            id="version-history-btn"
            onClick={() => setShowVersionDrawer(!showVersionDrawer)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              showVersionDrawer
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
            title="Open Version History & Code Diff"
          >
            <GitCommit className="w-3.5 h-3.5 text-blue-400" />
            <span>Versions</span>
            <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded">
              v{versions.length}
            </span>
          </button>

          {/* AI Prompt Customize Trigger */}
          <button
            id="prompt-control-btn"
            onClick={onOpenPromptControl}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 border border-purple-500/30 transition cursor-pointer"
            title="Customize AI prompt instructions"
          >
            <MessageSquareCode className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">AI Instructions</span>
          </button>
        </div>
      </div>

      {/* Editor Action Toolbar (VS Code Top Bar) */}
      <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
        {/* Multi-file Explorer Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {files.length === 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono font-medium border border-slate-700/80">
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>index.{language.extension}</span>
            </div>
          ) : (
            files.map((file, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFileIndex(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition cursor-pointer ${
                  activeFileIndex === idx
                    ? "bg-slate-800 text-blue-300 font-medium border border-slate-700"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <FileCode2 className="w-3 h-3 text-blue-400" />
                <span className="truncate max-w-[110px]">{file.name}</span>
                {files.length > 1 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFile(idx);
                    }}
                    className="hover:text-rose-400 p-0.5 rounded ml-1"
                  >
                    ×
                  </span>
                )}
              </button>
            ))
          )}
          <button
            onClick={() => onAddFile(`component_${files.length + 1}.${language.extension}`)}
            className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition ml-1 cursor-pointer"
            title="Add new code file"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            id="toggle-search-btn"
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1.5 rounded transition cursor-pointer ${
              showSearch ? "bg-blue-600/20 text-blue-400" : "hover:bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Search & Replace"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            id="format-code-btn"
            onClick={onFormatCode}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Format code indentation"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>

          <button
            id="optimize-code-btn"
            onClick={onOptimizeCode}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Optimize code (responsive & clean)"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Explain Code Feature Button */}
          <button
            id="explain-code-btn"
            onClick={() => {
              setShowExplainPanel(true);
              onExplainCode();
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition cursor-pointer ${
              showExplainPanel
                ? "bg-purple-600/25 text-purple-300 border border-purple-500/40"
                : "hover:bg-slate-800 text-purple-300 hover:text-white"
            }`}
            title="Explain code functionality & architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden xl:inline text-[11px] font-medium">Explain</span>
          </button>

          <button
            id="regenerate-code-btn"
            disabled={isGenerating}
            onClick={onRegenerate}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition disabled:opacity-50 cursor-pointer"
            title="Regenerate code"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          </button>

          <button
            id="copy-code-btn"
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            id="download-code-btn"
            onClick={onDownloadCode}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Download code as file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search and Replace Banner */}
      {showSearch && (
        <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <input
            type="text"
            placeholder="Find..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-slate-200 outline-none focus:border-blue-500 w-36"
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceQuery}
            onChange={(e) => setReplaceQuery(e.target.value)}
            className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-slate-200 outline-none focus:border-blue-500 w-36"
          />
          <button
            onClick={handleSearchReplace}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition cursor-pointer"
          >
            Replace All
          </button>
          <button
            onClick={() => setShowSearch(false)}
            className="text-slate-400 hover:text-white px-1.5 py-1 text-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* Code Editor Body & Attached Explain Panel */}
      <div className="flex-1 relative overflow-hidden flex font-mono text-xs leading-relaxed">
        {/* Line Numbers Gutter */}
        <div className="w-12 bg-slate-950/90 text-slate-600 select-none py-4 text-right pr-3 font-mono border-r border-slate-900 shrink-0">
          {lines.map((_, i) => (
            <div key={i} className="h-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Editable Code Textarea */}
        <textarea
          id="code-editor-textarea"
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full h-full bg-slate-950 text-slate-200 py-4 px-4 resize-none outline-none overflow-auto whitespace-pre font-mono selection:bg-blue-600/30 selection:text-white"
          style={{ tabSize: 2 }}
        />

        {/* Dedicated Explain Code Side Panel */}
        {showExplainPanel && (
          <ExplainCodePanel
            isOpen={showExplainPanel}
            onClose={() => setShowExplainPanel(false)}
            onExpandModal={onExpandExplainModal}
            explanationResult={explanationResult}
            isLoading={isExplaining}
            onReAnalyze={onExplainCode}
            language={language.name}
            framework={framework}
            darkMode={darkMode}
          />
        )}

        {/* Full-featured Version Control Drawer (Timeline & Diff comparison) */}
        {showVersionDrawer && (
          <VersionHistoryDrawer
            isOpen={showVersionDrawer}
            onClose={() => setShowVersionDrawer(false)}
            versions={versions}
            currentCode={code}
            onRevertToVersion={onRevertToVersion}
            onCreateSnapshot={onCreateSnapshot}
            darkMode={darkMode}
          />
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span>{lines.length} lines</span>
          <span>{code.length} chars</span>
          <span>UTF-8</span>
          <button
            onClick={() => setShowVersionDrawer(true)}
            className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
          >
            v{versions.length} timeline
          </button>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>{language.name}</span>
          <span>•</span>
          <span className="text-blue-400 font-medium">Editable</span>
        </div>
      </div>
    </div>
  );
};
