import React from "react";
import { ViewMode } from "../types";
import {
  LayoutDashboard,
  Sparkles,
  History,
  FolderGit2,
  Library,
  Sliders,
  BookOpen,
  Cpu,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  darkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapsed,
  darkMode,
}) => {
  const menuItems: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      id: "workspace",
      label: "Image to Code",
      icon: <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />,
      badge: "Core",
    },
    {
      id: "history",
      label: "Code History",
      icon: <History className="w-4 h-4 shrink-0" />,
    },
    {
      id: "projects",
      label: "Saved Projects",
      icon: <FolderGit2 className="w-4 h-4 shrink-0" />,
    },
    {
      id: "templates",
      label: "Templates",
      icon: <Library className="w-4 h-4 shrink-0" />,
    },
    {
      id: "ai-settings",
      label: "AI Settings",
      icon: <Sliders className="w-4 h-4 shrink-0" />,
    },
    {
      id: "docs",
      label: "Documentation",
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
    {
      id: "api-integration",
      label: "API Integration",
      icon: <Cpu className="w-4 h-4 shrink-0" />,
      badge: "REST",
    },
  ];

  return (
    <aside
      id="app-sidebar"
      className={`relative flex flex-col justify-between border-r transition-all duration-300 z-20 shrink-0 ${
        collapsed ? "w-16" : "w-60"
      } ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
      }`}
    >
      {/* Navigation List */}
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between px-2 py-1.5 mb-2">
          {!collapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Workspace Menu
            </span>
          )}
          <button
            id="sidebar-toggle-btn"
            onClick={onToggleCollapsed}
            className={`p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition ${
              collapsed ? "mx-auto" : ""
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer group relative ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.badge}
                  </span>
                )}
                {/* Tooltip on collapsed hover */}
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / Engine Badge */}
      <div className="p-3 border-t border-slate-800/80">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">Vision Engine</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <ShieldCheck className="w-3 h-3" /> Ready
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Gemini 3.8 Multimodal vision active for high fidelity code synthesis.
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="Vision Engine Ready">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>
        )}
      </div>
    </aside>
  );
};
