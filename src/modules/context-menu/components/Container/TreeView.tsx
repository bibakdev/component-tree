'use client';

import React from 'react';
import { useTreeStore } from '@/modules/tree-core/store';
import { TreeNodeComponent } from '../Presentational/TreeNodeComponent';
import { TreeContextMenu } from '@/modules/context-menu/components/Container/TreeContextMenu';
import { useContextMenuStore } from '@/modules/context-menu/store';
import type { TreeNode } from '@/modules/tree-core/types';

export const TreeView: React.FC = () => {
  const root = useTreeStore((s) => s.root);
  const selectedNodeId = useTreeStore((s) => s.selectedNodeId);
  const selectNode = useTreeStore((s) => s.selectNode);
  const openContextMenu = useContextMenuStore((s) => s.open);

  const handleSelect = (node: TreeNode) => {
    selectNode(node.id);
  };

  const handleContextMenu = (e: React.MouseEvent, node: TreeNode) => {
    e.preventDefault();
    selectNode(node.id);
    openContextMenu(node.id, e.clientX, e.clientY);
  };

  if (!root) {
    return (
      <div className="text-white/50 p-4 text-center">درختی وجود ندارد</div>
    );
  }

  return (
    <div className="tree-container p-6 pt-14 font-mono text-base leading-relaxed text-left">
      <TreeNodeComponent
        node={root}
        depth={0}
        isLast={true}
        parentPrefix=""
        selectedId={selectedNodeId}
        onSelect={handleSelect}
        onContextMenu={handleContextMenu}
      />
      <TreeContextMenu />
    </div>
  );
};
