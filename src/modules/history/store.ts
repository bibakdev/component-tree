// src/modules/history/store.ts
'use client';

import { create } from 'zustand';

interface HistoryState {
  undoStack: string[]; // serialized TreeNode snapshots
  redoStack: string[];
  canUndo: boolean;
  canRedo: boolean;
  pushSnapshot: (root: unknown) => void;
  undo: () => unknown | null;
  redo: () => unknown | null;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  undoStack: [],
  redoStack: [],
  canUndo: false,
  canRedo: false,

  pushSnapshot: (root) => {
    // placeholder: later will implement proper snapshot logic
  },

  undo: () => {
    // placeholder
    return null;
  },

  redo: () => {
    // placeholder
    return null;
  },

  clear: () =>
    set({ undoStack: [], redoStack: [], canUndo: false, canRedo: false })
}));
