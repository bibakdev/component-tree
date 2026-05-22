// src/modules/saved-trees/components/Container/SavedTreeList.tsx
'use client';

import { useEffect } from 'react';
import { useSavedTreesStore } from '../../stores/useSavedTreesStore';
import { useSavedTreesModalStore } from '../../stores/useSavedTreesModalStore';
import { useTreeStore } from '@/modules/tree-core/store';
import SavedTreeItem from '../Presentational/SavedTreeItem';

export default function SavedTreeList() {
  const trees = useSavedTreesStore((state) => state.trees);
  const initialize = useSavedTreesStore((state) => state.initialize);
  const getTreeData = useSavedTreesStore((state) => state.getTreeData);
  const openEditModal = useSavedTreesModalStore((state) => state.openEditModal);
  const openDeleteModal = useSavedTreesModalStore(
    (state) => state.openDeleteModal
  );

  // فقط یک بار در کلاینت، داده‌ها را از localStorage بارگذاری کن
  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLoad = (name: string) => {
    const root = getTreeData(name);
    if (root) {
      useTreeStore.getState().setRoot(root);
    }
  };

  if (trees.length === 0) {
    return (
      <p className="text-white/50 text-sm text-center py-4">
        هیچ درختی ذخیره نشده است.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {trees.map((tree) => (
        <SavedTreeItem
          key={tree.name}
          name={tree.name}
          onSelect={() => handleLoad(tree.name)}
          onEdit={() => openEditModal(tree.name)}
          onDelete={() => openDeleteModal(tree.name)}
        />
      ))}
    </ul>
  );
}
