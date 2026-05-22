'use client';

import { create } from 'zustand';

interface ImportModalState {
  isOpen: boolean;
  importText: string;
  open: () => void;
  close: () => void;
  setImportText: (text: string) => void;
}

export const useImportModalStore = create<ImportModalState>((set) => ({
  isOpen: false,
  importText: '',
  open: () => set({ isOpen: true, importText: '' }),
  close: () => set({ isOpen: false, importText: '' }),
  setImportText: (text) => set({ importText: text })
}));
