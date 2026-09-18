import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  Image as ImageIcon, 
  Clipboard, 
  Trash2, 
  Plus, 
  Maximize2, 
  Sparkles, 
  Layers, 
  Palette, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Tag
} from "lucide-react";
import { SAMPLE_TEMPLATES } from "../data/sampleTemplates";

interface UploadedImageItem {
  id: string;
  name: string;
  dataUrl: string;
  size: string;
  detectedElements: string[];
  colorPalette: string[];
}

interface ImageUploadPanelProps {
  images: UploadedImageItem[];
  activeImageIndex: number;
  onSelectImageIndex: (index: number) => void;
  onAddImages: (newImages: { name: string; dataUrl: string; size: string }[]) => void;
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
  isGenerating: boolean;
  onTriggerGenerate: () => void;
  onLoadTemplate: (templateId: string) => void;
  darkMode: boolean;
}

export const ImageUploadPanel: React.FC<ImageUploadPanelProps> = ({
  images,
  activeImageIndex,
  onSelectImageIndex,
  onAddImages,
  onRemoveImage,
  onClearAll,
  isGenerating,
  onTriggerGenerate,
  onLoadTemplate,
  darkMode,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeImage = images[activeImageIndex] || null;

  // Global paste handler for clipboard images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith("image/")) {
          processFile(file);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.match(/image\/(png|jpe?g|webp)/)) {
      alert("Please upload a PNG, JPG, JPEG, or WEBP image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      onAddImages([{ name: file.name, dataUrl, size: sizeMb }]);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => processFile(file));
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => processFile(file));
    }
  };

  const handlePasteFromClipboardBtn = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = new File([blob], "clipboard-image.png", { type });
            processFile(file);
            return;
          }
        }
      }
      alert("No image found on clipboard. Copy an image or screenshot first!");
    } catch {
      alert("Clipboard access was denied or is not supported. Use Ctrl+V / Cmd+V directly.");
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            1. Design Source ({images.length} {images.length === 1 ? "page" : "pages"})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {images.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 rounded hover:bg-slate-800/80 transition"
              title="Remove all images"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300 px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Image</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        multiple
        onChange={handleManualUpload}
        className="hidden"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Upload Zone / Drop Area */}
        {images.length === 0 ? (
          <div
            id="drop-zone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[260px] ${
              isDragging
                ? "border-blue-500 bg-blue-500/10 scale-[0.99]"
                : "border-slate-700/80 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/60"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">Drag & drop your design here</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Supports UI screenshots, wireframes, sketches (PNG, JPG, WEBP up to 25MB)
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Browse Files
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePasteFromClipboardBtn();
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <Clipboard className="w-3 h-3 text-blue-400" />
                <span>Paste Clipboard (Ctrl+V)</span>
              </button>
            </div>

            {/* Quick Sample Presets */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 w-full">
              <p className="text-[11px] font-medium text-slate-400 mb-2">Or test with ready design samples:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SAMPLE_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadTemplate(tpl.id);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 hover:border-blue-500/40 border border-slate-700 text-slate-300 transition"
                  >
                    ⚡ {tpl.title.split(" ")[0]} {tpl.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Multi-page Image Selector Tabs */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => onSelectImageIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition shrink-0 ${
                      activeImageIndex === idx
                        ? "bg-blue-600/20 border-blue-500 text-blue-300"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="truncate max-w-[100px]">{img.name}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveImage(idx);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-0.5 rounded"
                      title="Remove image"
                    >
                      ×
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Active Image Visual Stage with Zoom Controls */}
            {activeImage && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                {/* Image Toolbar */}
                <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 truncate">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-medium text-slate-200 truncate">{activeImage.name}</span>
                    <span className="text-[10px] text-slate-500">({activeImage.size})</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-400 px-1">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition ml-1"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Scaled Preview Canvas */}
                <div className="relative p-4 flex items-center justify-center min-h-[280px] max-h-[380px] overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                  <img
                    src={activeImage.dataUrl}
                    alt={activeImage.name}
                    style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
                    className="max-h-[320px] max-w-full object-contain rounded-lg border border-slate-800/80 shadow-2xl transition-transform duration-150"
                  />
                </div>
              </div>
            )}

            {/* AI Image Analysis: Detected Elements */}
            {activeImage && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Detected UI Elements ({activeImage.detectedElements.length})
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Auto-Mapped
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeImage.detectedElements.map((el, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:border-blue-500/50 transition cursor-default"
                    >
                      <Tag className="w-2.5 h-2.5 text-blue-400" />
                      {el}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Image Analysis: Extracted Color Palette */}
            {activeImage && activeImage.colorPalette.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Color Palette
                    </h4>
                  </div>
                  {copiedColor && (
                    <span className="text-[10px] text-emerald-400 font-mono animate-fade-in">
                      Copied {copiedColor}!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {activeImage.colorPalette.map((hex, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyColor(hex)}
                      className="group flex flex-col items-center gap-1.5 p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
                      title={`Click to copy ${hex}`}
                    >
                      <div
                        className="w-full h-7 rounded-md border border-white/10 shadow-inner group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: hex }}
                      ></div>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-white uppercase truncate">
                        {hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Conversion Trigger Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80 shrink-0 space-y-2">
        <button
          id="trigger-generate-btn"
          disabled={images.length === 0 || isGenerating}
          onClick={onTriggerGenerate}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            images.length === 0 || isGenerating
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/25 active:scale-[0.99]"
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing Layout & Generating Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Convert Image to Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
