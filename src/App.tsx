import React, { useState } from "react";
import { 
  ViewMode, 
  SupportedLanguage, 
  CodeFile, 
  ConversionItem, 
  Project, 
  DashboardStats, 
  UserProfile, 
  AiSettings, 
  ToastNotification,
  CodeVersion,
  CodeExplanationResult
} from "./types";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./data/languages";
import { SAMPLE_TEMPLATES } from "./data/sampleTemplates";
import { exportProjectToZip, downloadSingleFile } from "./utils/zipExport";
import { extractPaletteFromDataUrl, detectElementsFromContext } from "./utils/codeGenerators";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { WorkspaceView } from "./components/WorkspaceView";
import { DashboardView } from "./components/DashboardView";
import { HistoryView } from "./components/HistoryView";
import { SavedProjectsView } from "./components/SavedProjectsView";
import { TemplatesView } from "./components/TemplatesView";
import { AiSettingsView } from "./components/AiSettingsView";
import { DocsView } from "./components/DocsView";
import { ApiIntegrationView } from "./components/ApiIntegrationView";
import { PromptControlModal } from "./components/PromptControlModal";
import { ExplainModal } from "./components/ExplainModal";
import { AuthModal } from "./components/AuthModal";
import { ToastContainer } from "./components/Toast";

interface UploadedImageItem {
  id: string;
  name: string;
  dataUrl: string;
  size: string;
  detectedElements: string[];
  colorPalette: string[];
}

export default function App() {
  // Navigation & Shell State
  const [currentView, setCurrentView] = useState<ViewMode>("workspace");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [projectName, setProjectName] = useState("SaaS Analytics Dashboard");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modals State
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (type: ToastNotification["type"], title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Workspace & Conversion State
  const initialTemplate = SAMPLE_TEMPLATES[0];
  const [images, setImages] = useState<UploadedImageItem[]>([
    {
      id: initialTemplate.id,
      name: `${initialTemplate.title}.png`,
      dataUrl: initialTemplate.thumbnail,
      size: "1.42 MB",
      detectedElements: initialTemplate.detectedElements,
      colorPalette: initialTemplate.colorPalette,
    },
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [language, setLanguage] = useState<SupportedLanguage>(
    SUPPORTED_LANGUAGES.find((l) => l.id === "react-jsx") || DEFAULT_LANGUAGE
  );
  const [framework, setFramework] = useState("Tailwind CSS");

  const [code, setCode] = useState<string>(initialTemplate.code);
  const [files, setFiles] = useState<CodeFile[]>([
    { name: "App.tsx", content: initialTemplate.code, language: "typescript" },
  ]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  // Version Control History State
  const [versions, setVersions] = useState<CodeVersion[]>([
    {
      id: "ver-init",
      timestamp: Date.now() - 1000 * 60 * 20,
      label: "v1 - Initial Synthesized Layout",
      description: "Baseline SaaS Analytics dashboard component with responsive metric cards",
      code: initialTemplate.code,
      language: "React JSX",
      framework: "Tailwind CSS",
      lineCount: initialTemplate.code.split("\n").length,
      charCount: initialTemplate.code.length,
      author: "AI",
    },
  ]);

  // Explain Code State
  const [explanation, setExplanation] = useState<string>(
    "Synthesized responsive SaaS Analytics component utilizing dark navy container layout (#0F172A), high-contrast data metrics, KPI stat cards, and electric blue (#3B82F6) interactive controls."
  );
  const [explanationResult, setExplanationResult] = useState<CodeExplanationResult | null>({
    summary: "Production-ready React JSX (Tailwind CSS) component structure synthesized with responsive flexbox/grid layout and dark theme tokens.",
    functionality: "The dashboard displays interactive telemetry metrics, active user counters, and feature action buttons that adapt gracefully to desktop and mobile displays.",
    structure: "Structured hierarchically with a top navigation bar, a high-contrast hero banner, and a 3-column responsive KPI metric grid without hardcoded pixel coordinates.",
    keyComponents: [
      { name: "Navigation Header", purpose: "Provides application branding, status badge, and global primary actions." },
      { name: "Hero Section", purpose: "Highlights component title, synthesis summary, and workspace context." },
      { name: "Interactive KPI Cards", purpose: "Presents live metric telemetry with trend indicators and slate hover borders." },
    ],
    stylingAndTheme: "Dark navy canvas (#0F172A), electric blue (#3B82F6), purple gradient accent, subtle slate borders, and WCAG AA contrast.",
    accessibility: "Semantic HTML5 tags with accessible tap targets and keyboard-navigable buttons.",
    customizationTips: [
      "Bind telemetry cards to live backend WebSocket or REST endpoints.",
      "Extract sub-cards into standalone modular functional components.",
      "Adjust theme variables to match your corporate design system."
    ],
  });
  const [isExplaining, setIsExplaining] = useState(false);
  const [showExplainPanel, setShowExplainPanel] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  // AI Configuration Settings
  const [aiSettings, setAiSettings] = useState<AiSettings>({
    selectedModel: "gemini-2.5-flash",
    temperature: 0.2,
    responsiveFlexGrid: true,
    useTailwindCDN: true,
    preserveExactColors: true,
    generateMultiFile: false,
    customSystemInstruction:
      "You are an expert Frontend Architect. Convert UI screenshot wireframes directly into pristine, semantic, fully responsive source code. Prioritize accessibility, clean modular hierarchy, and exact color matching.",
  });

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "usr-dev-01",
    name: "Alex Dev",
    email: "alex@codevision.ai",
    avatar: "",
    plan: "Pro Developer",
    isGuest: false,
  });

  // Dashboard Stats & Persistence History
  const [stats, setStats] = useState<DashboardStats>({
    totalConversions: 48,
    generatedProjects: 12,
    supportedLanguages: 16,
    apiUsage: 142,
    successRate: 99.4,
  });

  const [history, setHistory] = useState<ConversionItem[]>([
    {
      id: "hist-1",
      timestamp: Date.now() - 1000 * 60 * 60 * 3,
      title: "SaaS Analytics Dashboard",
      language: "React JSX",
      framework: "Tailwind CSS",
      code: initialTemplate.code,
      files: [{ name: "App.tsx", content: initialTemplate.code, language: "typescript" }],
      imagePreview: initialTemplate.thumbnail,
      detectedElements: initialTemplate.detectedElements,
      colorPalette: initialTemplate.colorPalette,
      explanation: "Modular React dashboard with responsive Tailwind metrics.",
      promptUsed: "Convert into React components with modern Tailwind CSS.",
      modelUsed: "gemini-2.5-flash",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "SaaS Analytics Dashboard",
      description: "Cloud telemetry and conversion metrics interface converted from wireframe.",
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      updatedAt: Date.now() - 1000 * 60 * 60 * 12,
      tags: ["Dashboard", "Analytics", "Tailwind"],
      activeConversion: {
        id: "conv-1",
        timestamp: Date.now() - 1000 * 60 * 60 * 12,
        title: "SaaS Analytics Dashboard",
        language: "React JSX",
        framework: "Tailwind CSS",
        code: initialTemplate.code,
        files: [{ name: "App.tsx", content: initialTemplate.code, language: "typescript" }],
        imagePreview: initialTemplate.thumbnail,
        detectedElements: initialTemplate.detectedElements,
        colorPalette: initialTemplate.colorPalette,
        explanation: "Modular React dashboard with responsive Tailwind metrics.",
        promptUsed: "Convert into React components.",
        modelUsed: "gemini-2.5-flash",
      },
    },
  ]);

  // Keep active file in sync when code is edited
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setHasUnsavedChanges(true);
    setFiles((prev) => {
      const updated = [...prev];
      if (updated[activeFileIndex]) {
        updated[activeFileIndex] = { ...updated[activeFileIndex], content: newCode };
      }
      return updated;
    });
  };

  // Add multiple uploaded images
  const handleAddImages = (newImages: { name: string; dataUrl: string; size: string }[]) => {
    const formatted: UploadedImageItem[] = newImages.map((img) => ({
      id: "img-" + Date.now() + Math.random().toString(36).substring(2, 6),
      name: img.name,
      dataUrl: img.dataUrl,
      size: img.size,
      detectedElements: detectElementsFromContext(""),
      colorPalette: extractPaletteFromDataUrl(img.dataUrl),
    }));

    setImages((prev) => [...prev, ...formatted]);
    setActiveImageIndex(images.length);
    addToast("success", "Image Ingested", `Loaded ${newImages.length} design screenshot(s).`);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (activeImageIndex >= index && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const handleClearAllImages = () => {
    setImages([]);
    setActiveImageIndex(0);
    addToast("info", "Cleared", "Removed all design sources.");
  };

  // Load a Pre-built Template
  const handleLoadTemplate = (templateId: string) => {
    const tpl = SAMPLE_TEMPLATES.find((t) => t.id === templateId) || SAMPLE_TEMPLATES[0];
    setProjectName(tpl.title);
    setImages([
      {
        id: tpl.id,
        name: `${tpl.title}.png`,
        dataUrl: tpl.thumbnail,
        size: "1.2 MB",
        detectedElements: tpl.detectedElements,
        colorPalette: tpl.colorPalette,
      },
    ]);
    setActiveImageIndex(0);
    setCode(tpl.code);
    setFiles([{ name: `index.${language.extension}`, content: tpl.code, language: language.id }]);
    setActiveFileIndex(0);

    // Record initial version for template
    const tplVersion: CodeVersion = {
      id: "ver-" + Date.now(),
      timestamp: Date.now(),
      label: `v${versions.length + 1} - Template: ${tpl.title}`,
      description: tpl.description,
      code: tpl.code,
      language: language.name,
      framework: framework,
      lineCount: tpl.code.split("\n").length,
      charCount: tpl.code.length,
      author: "AI",
    };
    setVersions((prev) => [tplVersion, ...prev]);

    setCurrentView("workspace");
    addToast("success", "Template Loaded", `Loaded ${tpl.title} into workspace.`);
  };

  // Trigger Gemini AI Image to Code Conversion
  const handleTriggerGenerate = async () => {
    if (images.length === 0) {
      addToast("warning", "No Image Uploaded", "Please upload or drop a UI design image first.");
      return;
    }

    const currentImg = images[activeImageIndex] || images[0];
    setIsGenerating(true);
    addToast("info", "Analyzing Wireframe", "Gemini vision model is parsing components and colors...");

    try {
      const res = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: currentImg.dataUrl,
          language: language.name,
          framework: framework,
          customPrompt: customPrompt,
          model: aiSettings.selectedModel,
          temperature: aiSettings.temperature,
          systemInstruction: aiSettings.customSystemInstruction,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const generatedCode = data.code || "// Generation completed";
      const detectedEls = data.detectedElements || currentImg.detectedElements;
      const palette = data.colorPalette || currentImg.colorPalette;
      const explainText = data.explanation || "";

      setCode(generatedCode);
      setExplanation(explainText);

      // Record new Version in Version Control
      const newVersion: CodeVersion = {
        id: "ver-" + Date.now(),
        timestamp: Date.now(),
        label: `v${versions.length + 1} - AI Vision Generation`,
        description: `Synthesized ${language.name} (${framework}) from screenshot with ${detectedEls.length} components`,
        code: generatedCode,
        language: language.name,
        framework: framework,
        lineCount: generatedCode.split("\n").length,
        charCount: generatedCode.length,
        author: "AI",
      };
      setVersions((prev) => [newVersion, ...prev]);

      // Update active image with refined metadata
      setImages((prev) => {
        const updated = [...prev];
        if (updated[activeImageIndex]) {
          updated[activeImageIndex] = {
            ...updated[activeImageIndex],
            detectedElements: detectedEls,
            colorPalette: palette,
          };
        }
        return updated;
      });

      // Update multi-file list
      setFiles([
        { name: `App.${language.extension}`, content: generatedCode, language: language.id },
      ]);
      setActiveFileIndex(0);

      // Save into History
      const newHistoryItem: ConversionItem = {
        id: "hist-" + Date.now(),
        timestamp: Date.now(),
        title: projectName,
        language: language.name,
        framework: framework,
        code: generatedCode,
        files: [{ name: `App.${language.extension}`, content: generatedCode, language: language.id }],
        imagePreview: currentImg.dataUrl,
        detectedElements: detectedEls,
        colorPalette: palette,
        explanation: explainText,
        promptUsed: customPrompt || "Default conversion",
        modelUsed: aiSettings.selectedModel,
      };
      setHistory((prev) => [newHistoryItem, ...prev]);

      // Increment stats
      setStats((prev) => ({
        ...prev,
        totalConversions: prev.totalConversions + 1,
        apiUsage: prev.apiUsage + 1,
      }));

      setHasUnsavedChanges(false);
      addToast("success", "Conversion Complete", `Generated ${language.name} (${framework}) code.`);
    } catch (err: any) {
      console.error("Conversion failed:", err);
      addToast("error", "Generation Failed", err.message || "Could not complete conversion.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Optimize Code (Refactor, make responsive, clean semantic structure)
  const handleOptimizeCode = async () => {
    if (!code) return;
    setIsGenerating(true);
    addToast("info", "Optimizing Code", "Refactoring structure for responsiveness and clean semantics...");

    try {
      const res = await fetch("/api/optimize-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: language.name,
          framework,
        }),
      });

      if (!res.ok) throw new Error("Optimization failed");
      const data = await res.json();
      setCode(data.code);
      setHasUnsavedChanges(true);

      // Record optimization in Version History
      const optVersion: CodeVersion = {
        id: "ver-" + Date.now(),
        timestamp: Date.now(),
        label: `v${versions.length + 1} - AI Code Optimization`,
        description: "Refactored layout containers, flex/grid wrappers, and semantic accessibility",
        code: data.code,
        language: language.name,
        framework: framework,
        lineCount: data.code.split("\n").length,
        charCount: data.code.length,
        author: "Optimizer",
      };
      setVersions((prev) => [optVersion, ...prev]);

      addToast("success", "Code Optimized", "Enhanced responsive wrappers and semantic tags.");
    } catch (err: any) {
      addToast("error", "Optimization Error", err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Explain Code Feature
  const handleExplainCode = async () => {
    if (!code) {
      addToast("warning", "No Code Available", "Generate or write code first before analyzing.");
      return;
    }

    setIsExplaining(true);
    setShowExplainPanel(true);
    addToast("info", "Analyzing Code", "Gemini AI is examining architecture, components, and layout...");

    try {
      const res = await fetch("/api/explain-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: language.name,
          framework,
        }),
      });

      if (!res.ok) throw new Error("Explanation request failed");
      const data: CodeExplanationResult = await res.json();
      setExplanationResult(data);
      setExplanation(data.summary || data.functionality || "");
      addToast("success", "Analysis Complete", "Code functionality and component breakdown ready.");
    } catch (err: any) {
      console.error("Explain error:", err);
      addToast("error", "Analysis Failed", err.message || "Failed to analyze code.");
    } finally {
      setIsExplaining(false);
    }
  };

  // Version Control: Create Manual Snapshot
  const handleCreateSnapshot = (label: string, description?: string) => {
    const newVersion: CodeVersion = {
      id: "ver-" + Date.now(),
      timestamp: Date.now(),
      label: label || `v${versions.length + 1} - Manual Snapshot`,
      description: description || "User-saved code checkpoint",
      code: code,
      language: language.name,
      framework: framework,
      lineCount: code.split("\n").length,
      charCount: code.length,
      author: "User",
    };
    setVersions((prev) => [newVersion, ...prev]);
    addToast("success", "Snapshot Recorded", `Saved version "${newVersion.label}".`);
  };

  // Version Control: Revert to Previous State
  const handleRevertToVersion = (version: CodeVersion) => {
    setCode(version.code);
    const targetLang = SUPPORTED_LANGUAGES.find((l) => l.name === version.language) || language;
    setLanguage(targetLang);
    setFramework(version.framework);
    setFiles([{ name: `App.${targetLang.extension}`, content: version.code, language: targetLang.id }]);
    setActiveFileIndex(0);
    setHasUnsavedChanges(true);

    // Record revert in history
    const revertVersion: CodeVersion = {
      id: "ver-" + Date.now(),
      timestamp: Date.now(),
      label: `v${versions.length + 1} - Revert to ${version.label}`,
      description: `Rolled back to state from ${new Date(version.timestamp).toLocaleTimeString()}`,
      code: version.code,
      language: version.language,
      framework: version.framework,
      lineCount: version.lineCount,
      charCount: version.charCount,
      author: "User",
    };
    setVersions((prev) => [revertVersion, ...prev]);
    addToast("info", "Version Restored", `Reverted editor back to "${version.label}".`);
  };

  // Format Code Indentation
  const handleFormatCode = () => {
    try {
      const lines = code.split("\n");
      let indentLevel = 0;
      const formatted = lines
        .map((line) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("}") || trimmed.startsWith("</") || trimmed.startsWith("]")) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          const indent = "  ".repeat(indentLevel);
          if (
            (trimmed.endsWith("{") || trimmed.endsWith("(") || (trimmed.startsWith("<") && !trimmed.endsWith("/>") && !trimmed.includes("</"))) &&
            !trimmed.startsWith("<!--")
          ) {
            indentLevel++;
          }
          return indent + trimmed;
        })
        .join("\n");

      setCode(formatted);
      addToast("success", "Formatted", "Code indentation aligned.");
    } catch {
      addToast("error", "Format Error", "Could not format code.");
    }
  };

  // Copy Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    addToast("success", "Copied", "Source code copied to clipboard.");
  };

  // Download Code as File
  const handleDownloadCode = () => {
    const filename = `${projectName.toLowerCase().replace(/\s+/g, "-")}.${language.extension}`;
    downloadSingleFile(filename, code);
    addToast("success", "Downloaded", `Saved ${filename}`);
  };

  // Save Project Locally
  const handleSaveProject = () => {
    const currentImg = images[activeImageIndex] || images[0];
    const newProject: Project = {
      id: "proj-" + Date.now(),
      name: projectName,
      description: `Generated ${language.name} codebase converted from design.`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [language.name, framework],
      activeConversion: {
        id: "conv-" + Date.now(),
        timestamp: Date.now(),
        title: projectName,
        language: language.name,
        framework: framework,
        code: code,
        files: files,
        imagePreview: currentImg ? currentImg.dataUrl : "",
        detectedElements: currentImg ? currentImg.detectedElements : [],
        colorPalette: currentImg ? currentImg.colorPalette : [],
        explanation: explanation,
        promptUsed: customPrompt || "Standard generation",
        modelUsed: aiSettings.selectedModel,
      },
    };

    setProjects((prev) => {
      const existingIdx = prev.findIndex((p) => p.name.toLowerCase() === projectName.toLowerCase());
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newProject;
        return updated;
      }
      return [newProject, ...prev];
    });

    setStats((prev) => ({ ...prev, generatedProjects: prev.generatedProjects + 1 }));
    setHasUnsavedChanges(false);
    addToast("success", "Project Saved", `Persisted "${projectName}" to project library.`);
  };

  // Export Project to ZIP
  const handleExportZip = async () => {
    addToast("info", "Packaging ZIP", "Bundling source code, assets, and README...");
    try {
      await exportProjectToZip(
        projectName,
        language.name,
        framework,
        code,
        files,
        explanation
      );
      addToast("success", "Export Ready", "Project ZIP downloaded successfully.");
    } catch (err: any) {
      addToast("error", "Export Failed", err.message);
    }
  };

  // Multi-file tab additions
  const handleAddFile = (fileName: string) => {
    const newFile: CodeFile = {
      name: fileName,
      content: `// New file ${fileName}\n\n`,
      language: language.id,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileIndex(files.length);
    addToast("info", "File Created", `Added ${fileName}`);
  };

  const handleDeleteFile = (index: number) => {
    if (files.length <= 1) return;
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (activeFileIndex >= index && activeFileIndex > 0) {
      setActiveFileIndex(activeFileIndex - 1);
    }
  };

  // Restore previous conversion
  const handleRestoreConversion = (item: ConversionItem) => {
    setProjectName(item.title);
    const targetLang = SUPPORTED_LANGUAGES.find((l) => l.name === item.language) || language;
    setLanguage(targetLang);
    setFramework(item.framework);
    setCode(item.code);
    setFiles([{ name: `index.${targetLang.extension}`, content: item.code, language: targetLang.id }]);
    setActiveFileIndex(0);
    setImages([
      {
        id: item.id,
        name: `${item.title}.png`,
        dataUrl: item.imagePreview,
        size: "1.5 MB",
        detectedElements: item.detectedElements,
        colorPalette: item.colorPalette,
      },
    ]);
    setActiveImageIndex(0);

    // Record restored version in Version Control
    const restoreVersion: CodeVersion = {
      id: "ver-" + Date.now(),
      timestamp: Date.now(),
      label: `v${versions.length + 1} - Restored: ${item.title}`,
      description: `Loaded from conversion history`,
      code: item.code,
      language: item.language,
      framework: item.framework,
      lineCount: item.code.split("\n").length,
      charCount: item.code.length,
      author: "AI",
    };
    setVersions((prev) => [restoreVersion, ...prev]);

    setCurrentView("workspace");
    addToast("info", "Restored", `Loaded conversion "${item.title}".`);
  };

  // Load Saved Project
  const handleSelectProject = (proj: Project) => {
    setProjectName(proj.name);
    const targetLang =
      SUPPORTED_LANGUAGES.find((l) => l.name === proj.activeConversion.language) || language;
    setLanguage(targetLang);
    setFramework(proj.activeConversion.framework);
    setCode(proj.activeConversion.code);
    setFiles(proj.activeConversion.files || [{ name: `App.${targetLang.extension}`, content: proj.activeConversion.code, language: targetLang.id }]);
    setActiveFileIndex(0);
    setExplanation(proj.activeConversion.explanation || "");

    const projVersion: CodeVersion = {
      id: "ver-" + Date.now(),
      timestamp: Date.now(),
      label: `v${versions.length + 1} - Project: ${proj.name}`,
      description: proj.description,
      code: proj.activeConversion.code,
      language: proj.activeConversion.language,
      framework: proj.activeConversion.framework,
      lineCount: proj.activeConversion.code.split("\n").length,
      charCount: proj.activeConversion.code.length,
      author: "User",
    };
    setVersions((prev) => [projVersion, ...prev]);

    setCurrentView("workspace");
    addToast("info", "Project Loaded", `Switched to "${proj.name}".`);
  };

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden font-sans ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
      {/* Top Navbar */}
      <Navbar
        projectName={projectName}
        onUpdateProjectName={(name) => {
          setProjectName(name);
          setHasUnsavedChanges(true);
        }}
        onSaveProject={handleSaveProject}
        onExportZip={handleExportZip}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        hasUnsavedChanges={hasUnsavedChanges}
        modelName={aiSettings.selectedModel}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={(v) => setCurrentView(v)}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
          darkMode={darkMode}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {currentView === "workspace" && (
            <WorkspaceView
              images={images}
              activeImageIndex={activeImageIndex}
              onSelectImageIndex={setActiveImageIndex}
              onAddImages={handleAddImages}
              onRemoveImage={handleRemoveImage}
              onClearAll={handleClearAllImages}
              language={language}
              onChangeLanguage={setLanguage}
              framework={framework}
              onChangeFramework={setFramework}
              code={code}
              onChangeCode={handleCodeChange}
              files={files}
              activeFileIndex={activeFileIndex}
              onSelectFileIndex={(idx) => {
                setActiveFileIndex(idx);
                if (files[idx]) setCode(files[idx].content);
              }}
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
              onTriggerGenerate={handleTriggerGenerate}
              onLoadTemplate={handleLoadTemplate}
              onCopyCode={handleCopyCode}
              onDownloadCode={handleDownloadCode}
              onRegenerate={handleTriggerGenerate}
              onExplainCode={handleExplainCode}
              onOptimizeCode={handleOptimizeCode}
              onFormatCode={handleFormatCode}
              onOpenPromptControl={() => setIsPromptModalOpen(true)}
              isGenerating={isGenerating}
              darkMode={darkMode}
              // Version Control
              versions={versions}
              onRevertToVersion={handleRevertToVersion}
              onCreateSnapshot={handleCreateSnapshot}
              // Explain Code
              explanationResult={explanationResult}
              isExplaining={isExplaining}
              showExplainPanel={showExplainPanel}
              setShowExplainPanel={setShowExplainPanel}
              onExpandExplainModal={() => setIsExplainModalOpen(true)}
            />
          )}

          {currentView === "dashboard" && (
            <DashboardView
              stats={stats}
              history={history}
              onOpenWorkspace={() => setCurrentView("workspace")}
              onOpenTemplates={() => setCurrentView("templates")}
              onOpenApiDocs={() => setCurrentView("api-integration")}
              onRestoreConversion={handleRestoreConversion}
              darkMode={darkMode}
            />
          )}

          {currentView === "history" && (
            <HistoryView
              history={history}
              onRestoreConversion={handleRestoreConversion}
              onClearHistory={() => setHistory([])}
              onDeleteHistoryItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
              darkMode={darkMode}
            />
          )}

          {currentView === "projects" && (
            <SavedProjectsView
              projects={projects}
              onSelectProject={handleSelectProject}
              onDeleteProject={(id) => setProjects((prev) => prev.filter((p) => p.id !== id))}
              onCreateNewProject={() => {
                setProjectName("New Untitled UI");
                setCode("");
                setFiles([{ name: "index.html", content: "", language: "html" }]);
                setImages([]);
                setCurrentView("workspace");
              }}
              darkMode={darkMode}
            />
          )}

          {currentView === "templates" && (
            <TemplatesView
              onLoadTemplate={handleLoadTemplate}
              darkMode={darkMode}
            />
          )}

          {currentView === "ai-settings" && (
            <AiSettingsView
              settings={aiSettings}
              onUpdateSettings={setAiSettings}
              onResetDefaults={() =>
                setAiSettings({
                  selectedModel: "gemini-2.5-flash",
                  temperature: 0.2,
                  responsiveFlexGrid: true,
                  useTailwindCDN: true,
                  preserveExactColors: true,
                  generateMultiFile: false,
                  customSystemInstruction:
                    "You are an expert Frontend Architect. Convert UI screenshot wireframes directly into pristine, semantic, fully responsive source code.",
                })
              }
              darkMode={darkMode}
            />
          )}

          {currentView === "docs" && (
            <DocsView
              onOpenWorkspace={() => setCurrentView("workspace")}
              darkMode={darkMode}
            />
          )}

          {currentView === "api-integration" && (
            <ApiIntegrationView darkMode={darkMode} />
          )}
        </main>
      </div>

      {/* Modals */}
      <PromptControlModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        customPrompt={customPrompt}
        onSavePrompt={(p) => {
          setCustomPrompt(p);
          addToast("success", "Prompt Saved", "Custom vision instructions attached.");
        }}
        onApplyPreset={(preset) => {
          addToast("info", "Rule Attached", preset);
        }}
      />

      <ExplainModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        explanation={explanation}
        explanationResult={explanationResult}
        language={language.name}
        framework={framework}
        detectedElements={images[activeImageIndex]?.detectedElements || []}
        colorPalette={images[activeImageIndex]?.colorPalette || []}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(usr) => {
          setCurrentUser(usr);
          addToast("success", "Profile Updated", `Logged in as ${usr.name}.`);
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
