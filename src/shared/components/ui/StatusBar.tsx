// src/shared/components/ui/StatusBar.tsx
'use client';

import { useStatusStore } from '@/shared/stores/useStatusStore';

export default function StatusBar() {
  const message = useStatusStore((state) => state.message);
  const clearMessage = useStatusStore((state) => state.clearMessage);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-5 py-3 rounded-2xl shadow-xl">
        <span>{message}</span>
        <button
          onClick={clearMessage}
          className="text-white/70 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
