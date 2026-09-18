import React, { useState } from "react";
import { SupportedLanguage, CodeFile, CodeVersion, CodeExplanationResult } from "../types";
import { ImageUploadPanel } from "./ImageUploadPanel";
import { CodeEditorPanel } from "./CodeEditorPanel";
import { LivePreviewPanel } from "./LivePreviewPanel";
import { 
  Columns3, 
  SplitSquareVertical, 
  Eye, 
  Code2, 
  Image as ImageIcon 
} from "lucide-react";

interface UploadedImageItem {
  id: string;
  name: string;
  dataUrl: string;
  size: string;
  detectedElements: string[];
  colorPalette: string[];
}

interface WorkspaceViewProps {
  images: UploadedImageItem[];
  activeImageIndex: number;
  onSelectImageIndex: (index: number) => void;
  onAddImages: (newImages: { name: string; dataUrl: string; size: string }[]) => void;
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  framework: string;
  onChangeFramework: (framework: string) => void;
  code: string;
  onChangeCode: (code: string) => void;
  files: CodeFile[];
  activeFileIndex: number;
  onSelectFileIndex: (idx: number) => void;
  onAddFile: (name: string) => void;
  onDeleteFile: (idx: number) => void;
  onTriggerGenerate: () => void;
  onLoadTemplate: (templateId: string) => void;
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

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  images,
  activeImageIndex,
  onSelectImageIndex,
  onAddImages,
  onRemoveImage,
  onClearAll,
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
  onTriggerGenerate,
  onLoadTemplate,
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
  // Workspace split layout modes
  const [layoutMode, setLayoutMode] = useState<"all" | "image-code" | "code-preview" | "preview">("all");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Workspace Top Layout Bar */}
      <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300 text-xs">Image to Code Workspace</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] text-slate-400">3-Column Interactive Pipeline</span>
        </div>

        {/* Layout Mode Switcher */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
          <button
            onClick={() => setLayoutMode("all")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
              layoutMode === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="3-Column View"
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3-Column</span>
          </button>
          <button
            onClick={() => setLayoutMode("image-code")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
              layoutMode === "image-code" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Image + Editor"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Design & Code</span>
          </button>
          <button
            onClick={() => setLayoutMode("code-preview")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
              layoutMode === "code-preview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Editor + Live Preview"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Code & Preview</span>
          </button>
          <button
            onClick={() => setLayoutMode("preview")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
              layoutMode === "preview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
            title="Preview Only"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Split Interface */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Image Upload & Vision Analysis */}
        {(layoutMode === "all" || layoutMode === "image-code") && (
          <div
            className={`border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col overflow-hidden transition-all duration-200 ${
              layoutMode === "image-code"
                ? "w-full lg:w-1/2"
                : showExplainPanel
                ? "w-full lg:w-[26%] xl:w-[24%]"
                : "w-full lg:w-[32%] xl:w-[28%]"
            }`}
          >
            <ImageUploadPanel
              images={images}
              activeImageIndex={activeImageIndex}
              onSelectImageIndex={onSelectImageIndex}
              onAddImages={onAddImages}
              onRemoveImage={onRemoveImage}
              onClearAll={onClearAll}
              isGenerating={isGenerating}
              onTriggerGenerate={onTriggerGenerate}
              onLoadTemplate={onLoadTemplate}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Center Column: Source Code Editor with Version Control & Explanation */}
        {layoutMode !== "preview" && (
          <div
            className={`flex flex-col overflow-hidden transition-all duration-200 ${
              layoutMode === "image-code"
                ? "w-full lg:w-1/2"
                : layoutMode === "code-preview"
                ? "w-full lg:w-1/2"
                : showExplainPanel
                ? "w-full lg:w-[48%] xl:w-[50%]"
                : "w-full lg:w-[38%] xl:w-[40%]"
            }`}
          >
            <CodeEditorPanel
              language={language}
              onChangeLanguage={onChangeLanguage}
              framework={framework}
              onChangeFramework={onChangeFramework}
              code={code}
              onChangeCode={onChangeCode}
              files={files}
              activeFileIndex={activeFileIndex}
              onSelectFileIndex={onSelectFileIndex}
              onAddFile={onAddFile}
              onDeleteFile={onDeleteFile}
              onCopyCode={onCopyCode}
              onDownloadCode={onDownloadCode}
              onRegenerate={onRegenerate}
              onExplainCode={onExplainCode}
              onOptimizeCode={onOptimizeCode}
              onFormatCode={onFormatCode}
              onOpenPromptControl={onOpenPromptControl}
              isGenerating={isGenerating}
              darkMode={darkMode}
              versions={versions}
              onRevertToVersion={onRevertToVersion}
              onCreateSnapshot={onCreateSnapshot}
              explanationResult={explanationResult}
              isExplaining={isExplaining}
              showExplainPanel={showExplainPanel}
              setShowExplainPanel={setShowExplainPanel}
              onExpandExplainModal={onExpandExplainModal}
            />
          </div>
        )}

        {/* Right Column: Live Rendered Preview */}
        {(layoutMode === "all" || layoutMode === "code-preview" || layoutMode === "preview") && (
          <div
            className={`flex flex-col overflow-hidden transition-all duration-200 ${
              layoutMode === "preview"
                ? "w-full h-full"
                : layoutMode === "code-preview"
                ? "w-full lg:w-1/2"
                : showExplainPanel
                ? "w-full lg:w-[26%] xl:w-[26%]"
                : "w-full lg:w-[30%] xl:w-[32%]"
            }`}
          >
            <LivePreviewPanel
              code={code}
              language={language}
              framework={framework}
              isGenerating={isGenerating}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};
