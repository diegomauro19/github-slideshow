'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
  removing?: boolean;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const typeConfig: Record<ToastType, { bg: string; border: string; text: string; Icon: typeof CheckCircle2 }> = {
  success: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', Icon: CheckCircle2 },
  error: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', Icon: XCircle },
  warning: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-800', Icon: AlertTriangle },
  info: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', Icon: Info },
};

function ToastItem({ t, onRemove }: { t: Toast; onRemove: (id: number) => void }) {
  const cfg = typeConfig[t.type];
  const IconComp = cfg.Icon;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(t.id), 3000);
    return () => clearTimeout(timer);
  }, [t.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${cfg.bg} ${cfg.border} ${
        t.removing ? 'animate-[slideOut_200ms_ease-in_forwards]' : 'animate-[slideIn_200ms_ease-out]'
      }`}
      style={{ minWidth: 280, maxWidth: 420 }}
    >
      <IconComp size={18} className={cfg.text} />
      <p className={`text-sm font-medium flex-1 ${cfg.text}`}>{t.message}</p>
      <button onClick={() => onRemove(t.id)} className={`${cfg.text} opacity-60 hover:opacity-100`}>
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} t={t} onRemove={removeToast} />
        ))}
      </div>
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
