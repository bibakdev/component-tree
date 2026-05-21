// src/shared/stores/useStatusStore.ts
'use client';

import { create } from 'zustand';

interface StatusState {
  message: string | null;
  showMessage: (msg: string) => void;
  clearMessage: () => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  message: null,

  showMessage: (msg) => {
    set({ message: msg });
    setTimeout(() => set({ message: null }), 3000);
  },

  clearMessage: () => set({ message: null })
}));
