import React from "react";
import { UserProfile } from "../types";
import { 
  Code2, 
  Sparkles, 
  Download, 
  Save, 
  Sun, 
  Moon, 
  User as UserIcon, 
  Check, 
  Activity,
  Zap
} from "lucide-react";

interface NavbarProps {
  projectName: string;
  onUpdateProjectName: (name: string) => void;
  onSaveProject: () => void;
  onExportZip: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  hasUnsavedChanges: boolean;
  modelName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  projectName,
  onUpdateProjectName,
  onSaveProject,
  onExportZip,
  darkMode,
  onToggleDarkMode,
  currentUser,
  onOpenAuth,
  hasUnsavedChanges,
  modelName,
}) => {
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [tempTitle, setTempTitle] = React.useState(projectName);

  React.useEffect(() => {
    setTempTitle(projectName);
  }, [projectName]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (tempTitle.trim()) {
      onUpdateProjectName(tempTitle.trim());
    } else {
      setTempTitle(projectName);
    }
  };

  return (
    <header 
      id="top-navbar" 
      className={`h-14 border-b px-4 flex items-center justify-between transition-colors shrink-0 z-30 ${
        darkMode ? "bg-slate-900/90 border-slate-800 text-slate-100" : "bg-white/90 border-slate-200 text-slate-800"
      } backdrop-blur-md`}
    >
      {/* Brand & Active Project Title */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-sm md:text-base bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              CodeVision AI
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v2.5
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-700/50 hidden md:block"></div>

        {/* Project Title with inline rename */}
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <div className="flex items-center gap-1">
              <input
                id="project-name-input"
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                autoFocus
                className={`text-xs md:text-sm font-medium px-2 py-0.5 rounded border outline-none ${
                  darkMode ? "bg-slate-950 border-blue-500 text-white" : "bg-slate-50 border-blue-500 text-slate-900"
                }`}
              />
              <button
                onClick={handleTitleSubmit}
                className="p-1 text-emerald-400 hover:text-emerald-300 transition"
                title="Save Title"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-slate-300 hover:text-white transition group py-1 px-1.5 rounded hover:bg-slate-800/50"
              title="Click to rename project"
            >
              <span className="truncate max-w-[140px] sm:max-w-[220px]">{projectName}</span>
              {hasUnsavedChanges && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Unsaved changes"></span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Center Status / Model Indicator */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-800/60 border border-slate-700/60">
        <Zap className="w-3 h-3 text-amber-400" />
        <span className="text-slate-300 font-mono text-[11px]">{modelName}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Save Button */}
        <button
          id="navbar-save-btn"
          onClick={onSaveProject}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          title="Save project locally"
        >
          <Save className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Export ZIP Button */}
        <button
          id="navbar-export-zip-btn"
          onClick={onExportZip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20 transition cursor-pointer"
          title="Export project as ZIP"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export ZIP</span>
        </button>

        {/* Theme Toggle */}
        <button
          id="navbar-theme-toggle"
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User Profile Avatar / Sign In */}
        <button
          id="navbar-user-btn"
          onClick={onOpenAuth}
          className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {currentUser.name.slice(0, 2)}
          </div>
          <span className="hidden md:inline font-medium text-slate-300">{currentUser.name}</span>
        </button>
      </div>
    </header>
  );
};
