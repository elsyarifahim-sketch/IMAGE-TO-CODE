import React, { useState } from "react";
import { Project } from "../types";
import { 
  FolderGit2, 
  Plus, 
  Search, 
  Download, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  Tag, 
  Calendar 
} from "lucide-react";
import { exportProjectToZip } from "../utils/zipExport";

interface SavedProjectsViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onCreateNewProject: () => void;
  darkMode: boolean;
}

export const SavedProjectsView: React.FC<SavedProjectsViewProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onCreateNewProject,
  darkMode,
}) => {
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportZip = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    exportProjectToZip(
      project.name,
      project.activeConversion.language,
      project.activeConversion.framework,
      project.activeConversion.code,
      project.activeConversion.files,
      project.activeConversion.explanation
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-400" />
            <span>Saved Projects Library</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Persisted code workspaces with multi-file structures and export bundles
          </p>
        </div>

        <button
          onClick={onCreateNewProject}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter saved projects..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500 space-y-2">
          <FolderGit2 className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-medium text-slate-400">No saved projects found</p>
          <p className="text-xs text-slate-500">Save a project from the top navigation bar to access it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleExportZip(e, proj)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Download ZIP"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(proj.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {proj.description || "Generated UI codebase converted with CodeVision AI."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {proj.activeConversion.language}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {proj.activeConversion.framework}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(proj.updatedAt).toLocaleDateString()}
                </span>
                <span className="text-blue-400 font-medium group-hover:underline flex items-center gap-1">
                  Open <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
