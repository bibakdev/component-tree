// src/modules/history/store.ts
'use client';

import { create } from 'zustand';
import type { TreeNode } from '@/modules/tree-core/types';

const MAX_UNDO = 50;

interface HistoryState {
  undoStack: string[];
  redoStack: string[];
  canUndo: boolean;
  canRedo: boolean;
  pushSnapshot: (root: TreeNode) => void;
  undo: (currentRoot: TreeNode) => TreeNode | null;
  redo: (currentRoot: TreeNode) => TreeNode | null;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  undoStack: [],
  redoStack: [],
  canUndo: false,
  canRedo: false,

  pushSnapshot: (root) => {
    const { undoStack } = get();
    const snapshot = JSON.stringify(root);
    const newUndo = [...undoStack, snapshot];
    while (newUndo.length > MAX_UNDO) {
      newUndo.shift();
    }
    set({
      undoStack: newUndo,
      redoStack: [],
      canUndo: newUndo.length > 0,
      canRedo: false
    });
  },

  undo: (currentRoot) => {
    const { undoStack, redoStack } = get();
    if (undoStack.length === 0) return null;

    const currentSnapshot = JSON.stringify(currentRoot);
    const newRedo = [...redoStack, currentSnapshot];

    const newUndo = [...undoStack];
    const previousSnapshot = newUndo.pop()!;
    const previousRoot = JSON.parse(previousSnapshot) as TreeNode;

    set({
      undoStack: newUndo,
      redoStack: newRedo,
      canUndo: newUndo.length > 0,
      canRedo: true
    });
    return previousRoot;
  },

  redo: (currentRoot) => {
    const { undoStack, redoStack } = get();
    if (redoStack.length === 0) return null;

    const currentSnapshot = JSON.stringify(currentRoot);
    const newUndo = [...undoStack, currentSnapshot];

    const newRedo = [...redoStack];
    const nextSnapshot = newRedo.pop()!;
    const nextRoot = JSON.parse(nextSnapshot) as TreeNode;

    set({
      undoStack: newUndo,
      redoStack: newRedo,
      canUndo: true,
      canRedo: newRedo.length > 0
    });
    return nextRoot;
  },

  clear: () =>
    set({ undoStack: [], redoStack: [], canUndo: false, canRedo: false })
}));
