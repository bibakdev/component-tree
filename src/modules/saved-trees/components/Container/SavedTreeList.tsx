// src/modules/saved-trees/components/Container/SavedTreeList.tsx
'use client';

import React, { useEffect } from 'react';
import SavedTreeItem from '../Presentational/SavedTreeItem';
import { useSavedTreesStore } from '../../stores/useSavedTreesStore';
import { useSavedTreesModalStore } from '../../stores/useSavedTreesModalStore';
import { useTreeStore } from '@/modules/tree-core/store';
import { useHistoryStore } from '@/modules/history/store';
import { useSidebarStore } from '@/modules/ui-shell/store';

const SavedTreeList: React.FC = () => {
  const trees = useSavedTreesStore((s) => s.trees);
  const loadTrees = useSavedTreesStore((s) => s.loadTrees);
  const getTreeData = useSavedTreesStore((s) => s.getTreeData);
  const openEditModal = useSavedTreesModalStore((s) => s.openEditModal);
  const openDeleteModal = useSavedTreesModalStore((s) => s.openDeleteModal);
  const setRoot = useTreeStore((s) => s.setRoot);
  const selectNode = useTreeStore((s) => s.selectNode);
  const clearHistory = useHistoryStore((s) => s.clear);
  const closeSidebar = useSidebarStore((s) => s.close);

  useEffect(() => {
    loadTrees();
  }, [loadTrees]);

  const handleSelect = (name: string) => {
    const data = getTreeData(name);
    if (!data) return;
    setRoot(data);
    selectNode(data.id);
    clearHistory();
    closeSidebar(); // close mobile sidebar after selection
  };

  if (trees.length === 0) {
    return (
      <li className="flex justify-center text-white/50 text-sm py-2">خالی</li>
    );
  }

  return (
    <>
      {trees.map((tree) => (
        <SavedTreeItem
          key={tree.name}
          name={tree.name}
          onSelect={() => handleSelect(tree.name)}
          onEdit={() => openEditModal(tree.name)}
          onDelete={() => openDeleteModal(tree.name)}
        />
      ))}
    </>
  );
};

export default SavedTreeList;
