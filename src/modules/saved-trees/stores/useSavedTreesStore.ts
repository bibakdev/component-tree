// src/modules/saved-trees/stores/useSavedTreesStore.ts
'use client';

import { create } from 'zustand';
import { SavedTree } from '../types';
import { loadTreesFromStorage, saveTreesToStorage } from '../services';
import { useTreeStore } from '@/modules/tree-core/store';
import type { TreeNode } from '@/modules/tree-core/types';

interface SavedTreesState {
  trees: SavedTree[];
  loadTrees: () => void;
  saveTree: (name: string) => boolean; // false if duplicate and not overwritten
  overwriteTree: (name: string) => void;
  deleteTree: (name: string) => void;
  renameTree: (oldName: string, newName: string) => boolean;
  getTreeData: (name: string) => TreeNode | null;
}

export const useSavedTreesStore = create<SavedTreesState>((set, get) => ({
  trees: [],

  loadTrees: () => {
    const trees = loadTreesFromStorage();
    set({ trees });
  },

  saveTree: (name) => {
    const { trees } = get();
    const existingIndex = trees.findIndex((t) => t.name === name);
    if (existingIndex !== -1) {
      // duplicate name – caller should ask confirmation and use overwriteTree
      return false;
    }
    const root = useTreeStore.getState().root;
    if (!root) return false;
    const newTree: SavedTree = { name, treeData: JSON.stringify(root) };
    const updated = [...trees, newTree];
    set({ trees: updated });
    saveTreesToStorage(updated);
    return true;
  },

  overwriteTree: (name) => {
    const { trees } = get();
    const root = useTreeStore.getState().root;
    if (!root) return;
    const newTree: SavedTree = { name, treeData: JSON.stringify(root) };
    const updated = trees.map((t) => (t.name === name ? newTree : t));
    if (!trees.some((t) => t.name === name)) {
      updated.push(newTree);
    }
    set({ trees: updated });
    saveTreesToStorage(updated);
  },

  deleteTree: (name) => {
    const updated = get().trees.filter((t) => t.name !== name);
    set({ trees: updated });
    saveTreesToStorage(updated);
  },

  renameTree: (oldName, newName) => {
    const { trees } = get();
    if (trees.some((t) => t.name === newName)) return false;
    const updated = trees.map((t) =>
      t.name === oldName ? { ...t, name: newName } : t
    );
    set({ trees: updated });
    saveTreesToStorage(updated);
    return true;
  },

  getTreeData: (name) => {
    const tree = get().trees.find((t) => t.name === name);
    if (!tree) return null;
    try {
      return JSON.parse(tree.treeData) as TreeNode;
    } catch {
      return null;
    }
  }
}));
