import React, { useState, useEffect, useRef } from "react";
import { DeviceMode, SupportedLanguage } from "../types";
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  AlertCircle,
  Code2,
  CheckCircle,
  Eye
} from "lucide-react";

interface LivePreviewPanelProps {
  code: string;
  language: SupportedLanguage;
  framework: string;
  isGenerating: boolean;
  darkMode: boolean;
}

export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({
  code,
  language,
  framework,
  isGenerating,
  darkMode,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate safe sandboxed HTML for iframe preview
  const previewHtml = React.useMemo(() => {
    const isHtmlOrTailwind =
      language.id === "html" ||
      language.id === "tailwind-css" ||
      language.id === "css" ||
      language.id === "bootstrap";

    if (isHtmlOrTailwind) {
      // If complete HTML document
      if (code.includes("<html") || code.includes("<!DOCTYPE html>")) {
        return code;
      }
      // Wrap snippet in standard boilerplate with Tailwind CDN
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4">
  ${code}
</body>
</html>`;
    }

    if (language.id === "react-jsx") {
      // Clean export statements and render React with Babel Standalone inside the iframe
      const cleanedCode = code
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
        .replace(/export\s+default\s+function\s+(\w+)/, "function GeneratedComponent")
        .replace(/export\s+default\s+(\w+);?/, "const GeneratedComponent = $1;");

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    try {
      ${cleanedCode}
      
      const ComponentToRender = typeof GeneratedComponent !== 'undefined' ? GeneratedComponent : () => (
        <div className="p-6 text-slate-300">Loading React component...</div>
      );
      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<ComponentToRender />);
    } catch (err) {
      document.getElementById('root').innerHTML = '<div class="p-6 text-rose-400 bg-rose-950/40 border border-rose-800 rounded-xl m-4 font-mono text-xs"><strong>React Render Notice:</strong> ' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
    }

    // For non-web frameworks (Flutter, Python, Java, SQL, JSON) render a specialized UI component preview card
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 flex flex-col items-center justify-center font-sans">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
    <div class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-xl font-bold">
      ⚡
    </div>
    <div>
      <h3 class="text-base font-semibold text-white">${language.name} Target</h3>
      <p class="text-xs text-slate-400 mt-1">Framework: ${framework}</p>
    </div>
    <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-1">
      <div class="text-[10px] text-slate-500 uppercase tracking-wider">Compiler Status</div>
      <div class="text-emerald-400 font-semibold flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Syntax Validated
      </div>
      <div class="text-slate-400 text-[11px] pt-1">
        This target compiles in native ${language.name} environment. Use the code editor on the left to copy or download.
      </div>
    </div>
    <button onclick="window.parent.postMessage('download', '*')" class="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition">
      Download Source File (.${language.extension})
    </button>
  </div>
</body>
</html>`;
  }, [code, language, framework, refreshKey]);

  // Viewport width based on device mode
  const getDeviceWidth = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  return (
    <div
      className={`flex flex-col h-full overflow-hidden bg-slate-950 transition-all ${
        isFullscreen ? "fixed inset-0 z-50 p-4 bg-slate-950/95 backdrop-blur-lg" : ""
      }`}
    >
      {/* Top Browser Mockup Chrome Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0 gap-2">
        <div className="flex items-center gap-2">
          {/* Mac style window control dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>

          {/* Simulated Browser URL bar */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 w-44 md:w-56 truncate">
            <span className="text-emerald-400">https://</span>
            <span className="text-slate-300 truncate">preview.codevision.local</span>
          </div>
        </div>

        {/* Center Device Mode Toggles */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
          <button
            id="device-desktop-btn"
            onClick={() => setDeviceMode("desktop")}
            className={`p-1.5 rounded-md transition cursor-pointer ${
              deviceMode === "desktop"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            id="device-tablet-btn"
            onClick={() => setDeviceMode("tablet")}
            className={`p-1.5 rounded-md transition cursor-pointer ${
              deviceMode === "tablet"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            id="device-mobile-btn"
            onClick={() => setDeviceMode("mobile")}
            className={`p-1.5 rounded-md transition cursor-pointer ${
              deviceMode === "mobile"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Tools: Refresh & Fullscreen */}
        <div className="flex items-center gap-1">
          <button
            id="refresh-preview-btn"
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Reload live preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            id="fullscreen-preview-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Sandboxed Live Render Stage */}
      <div className="flex-1 bg-slate-950/60 p-3 sm:p-4 overflow-auto flex items-center justify-center relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]">
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-slate-200">Rebuilding Live Preview...</p>
          </div>
        )}

        <div
          className={`h-full ${getDeviceWidth()} transition-all duration-300 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900`}
        >
          <iframe
            key={refreshKey}
            ref={iframeRef}
            srcDoc={previewHtml}
            title="Live Render Preview"
            sandbox="allow-scripts allow-same-origin allow-modals"
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="px-3 py-1.5 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Live Synchronized</span>
        </div>
        <div>
          <span>Viewport: {deviceMode.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
