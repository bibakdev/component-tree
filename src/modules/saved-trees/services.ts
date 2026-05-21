// src/modules/saved-trees/services.ts
import { SavedTree } from './types';

const STORAGE_KEY = 'savedTrees';

export function loadTreesFromStorage(): SavedTree[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTreesToStorage(trees: SavedTree[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
}
