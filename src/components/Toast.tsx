import React from "react";
import { ToastNotification } from "../types";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

interface ToastProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
          error: <XCircle className="w-4 h-4 text-rose-400 shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
        };

        const bgColors = {
          success: "border-emerald-500/30 bg-slate-900/95 text-slate-100",
          error: "border-rose-500/30 bg-slate-900/95 text-slate-100",
          warning: "border-amber-500/30 bg-slate-900/95 text-slate-100",
          info: "border-blue-500/30 bg-slate-900/95 text-slate-100",
        };

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${bgColors[toast.type]}`}
          >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-white leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
