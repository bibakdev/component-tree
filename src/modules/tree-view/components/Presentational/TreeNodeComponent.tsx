'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import type { TreeNode } from '@/modules/tree-core/types';

export interface TreeNodeComponentProps {
  node: TreeNode;
  depth: number;
  isLast: boolean;
  parentPrefix: string;
  selectedId: number | null;
  onSelect: (node: TreeNode) => void;
  onContextMenu: (event: React.MouseEvent, node: TreeNode) => void;
}

export const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  depth,
  isLast,
  parentPrefix,
  selectedId,
  onSelect,
  onContextMenu
}) => {
  const connector = isLast ? '└── ' : '├── ';
  const linePrefix = parentPrefix + connector;

  // کلاس رنگ بر اساس عمق (چرخشی)
  const colorClass = `depth-${depth % 11}`;
  const isSelected = selectedId === node.id;

  return (
    <>
      <div className="tree-line flex whitespace-pre">
        <span className="prefix text-white/50">{linePrefix}</span>
        <span
          className={cn(
            'node-name cursor-pointer px-1.5 py-0.5 rounded-md transition-all duration-200 font-medium',
            colorClass,
            isSelected &&
              'bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold shadow-[0_0_12px_rgba(75,85,99,0.4)]'
          )}
          onClick={() => onSelect(node)}
          onContextMenu={(e) => onContextMenu(e, node)}
        >
          {node.name}
        </span>
      </div>

      {/* فرزندان */}
      {node.children.map((child, index) => {
        const childIsLast = index === node.children.length - 1;
        const childPrefix = parentPrefix + (isLast ? '    ' : '│   ');
        return (
          <TreeNodeComponent
            key={child.id}
            node={child}
            depth={depth + 1}
            isLast={childIsLast}
            parentPrefix={childPrefix}
            selectedId={selectedId}
            onSelect={onSelect}
            onContextMenu={onContextMenu}
          />
        );
      })}
    </>
  );
};
