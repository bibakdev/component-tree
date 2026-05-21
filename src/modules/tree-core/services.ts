import { TreeNode } from './types';

export function createNode(name: string, children: TreeNode[] = []): TreeNode {
  // id will be assigned in the store when using nextId
  return {
    id: 0, // placeholder; actual id set by store
    name,
    children
  };
}

export function findParent(root: TreeNode, targetId: number): TreeNode | null {
  for (const child of root.children) {
    if (child.id === targetId) return root;
    const found = findParent(child, targetId);
    if (found) return found;
  }
  return null;
}

export function findNodeById(root: TreeNode, id: number): TreeNode | null {
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

export function getMaxId(node: TreeNode): number {
  let max = node.id;
  for (const child of node.children) {
    const childMax = getMaxId(child);
    if (childMax > max) max = childMax;
  }
  return max;
}
