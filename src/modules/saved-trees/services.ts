// src/modules/saved-trees/services.ts
import { SavedTree } from './types';

const STORAGE_KEY = 'savedTrees';

export function loadTreesFromStorage(): SavedTree[] {
  // مقاوم در برابر اجرا در محیط سرور (SSR)
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTreesToStorage(trees: SavedTree[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
}
