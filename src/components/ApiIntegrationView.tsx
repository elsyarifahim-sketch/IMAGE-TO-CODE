import React, { useState } from "react";
import { Cpu, Copy, Check, Terminal, Play, Send } from "lucide-react";

interface ApiIntegrationViewProps {
  darkMode: boolean;
}

export const ApiIntegrationView: React.FC<ApiIntegrationViewProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<"curl" | "js" | "python">("curl");
  const [copiedTab, setCopiedTab] = useState(false);
  const [testLanguage, setTestLanguage] = useState("React JSX");
  const [testFramework, setTestFramework] = useState("Tailwind CSS");
  const [testPrompt, setTestPrompt] = useState("Create clean responsive hero with modern dark theme");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const snippets = {
    curl: `curl -X POST "https://your-domain.com/api/generate-code" \\
  -H "Content-Type: application/json" \\
  -d '{
    "imageBase64": "data:image/png;base64,iVBORw0KGgo...",
    "language": "React JSX",
    "framework": "Tailwind CSS",
    "customPrompt": "Convert to clean responsive components"
  }'`,
    js: `const response = await fetch("/api/generate-code", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    imageBase64: "data:image/png;base64,...",
    language: "React JSX",
    framework: "Tailwind CSS",
    customPrompt: "Convert to clean responsive components"
  })
});

const data = await response.json();
console.log(data.code);`,
    python: `import requests

url = "https://your-domain.com/api/generate-code"
payload = {
    "imageBase64": "data:image/png;base64,...",
    "language": "React JSX",
    "framework": "Tailwind CSS",
    "customPrompt": "Convert to clean responsive components"
}

response = requests.post(url, json=payload)
print(response.json()["code"])`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopiedTab(true);
    setTimeout(() => setCopiedTab(false), 1500);
  };

  const handleRunApiTest = async () => {
    setIsLoading(true);
    setApiResponse(null);
    try {
      const res = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: testLanguage,
          framework: testFramework,
          customPrompt: testPrompt,
        }),
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-5xl mx-auto text-slate-300 text-xs leading-relaxed">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span>REST API Developer Integration</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Programmatically invoke the CodeVision AI Image-to-Code engine from your CLI, CI/CD pipeline, or backend services
        </p>
      </div>

      {/* Endpoints Table */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-sm font-semibold text-white">Available Endpoints</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="text-slate-500 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">Method</th>
                <th className="py-2 px-3">Endpoint</th>
                <th className="py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-2.5 px-3 text-blue-400 font-bold">POST</td>
                <td className="py-2.5 px-3 text-white">/api/generate-code</td>
                <td className="py-2.5 px-3 text-slate-400">Multimodal vision code generation from image</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">POST</td>
                <td className="py-2.5 px-3 text-white">/api/optimize-code</td>
                <td className="py-2.5 px-3 text-slate-400">Refactor, make responsive, clean CSS and semantic structure</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-purple-400 font-bold">POST</td>
                <td className="py-2.5 px-3 text-white">/api/explain-code</td>
                <td className="py-2.5 px-3 text-slate-400">Architecture analysis and component inventory explanation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Snippets Card */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Code Samples</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
              {(["curl", "js", "python"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition uppercase ${
                    activeTab === tab ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Copy snippet"
            >
              {copiedTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed">
          {snippets[activeTab]}
        </pre>
      </div>

      {/* Live API Test Console */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Interactive Test Console</h3>
          </div>
          <button
            onClick={handleRunApiTest}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isLoading ? "Executing..." : "Send Request"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Target Language</label>
            <input
              type="text"
              value={testLanguage}
              onChange={(e) => setTestLanguage(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Framework</label>
            <input
              type="text"
              value={testFramework}
              onChange={(e) => setTestFramework(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        {apiResponse && (
          <div className="space-y-1.5">
            <label className="block text-[11px] text-slate-400">Response Payload</label>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-48 overflow-auto leading-relaxed">
              {apiResponse}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
