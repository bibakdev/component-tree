'use client';

import { create } from 'zustand';
import { TreeNode } from './types';
import { createNode, findParent, getMaxId } from './services';

interface TreeState {
  root: TreeNode | null;
  selectedNodeId: number | null;
  nextId: number;

  // Actions
  selectNode: (nodeId: number) => void;
  setRoot: (newRoot: TreeNode) => void;
  addChild: (parentId: number, name: string) => void;
  addSibling: (nodeId: number, name: string) => void;
  deleteNode: (nodeId: number) => void;
  editNode: (nodeId: number, newName: string) => void;
}

function buildDefaultTree(): TreeNode {
  const root = createNode('App');
  root.id = 1;
  const sidebar = createNode('Sidebar');
  const sidebarHeader = createNode('SidebarHeader');
  const userProfile = createNode('UserProfileSection');
  const chatList = createNode('ChatList');
  const chatItem = createNode('ChatItem (× N)');
  chatList.children.push(chatItem);
  sidebar.children.push(sidebarHeader, userProfile, chatList);

  const chatArea = createNode('ChatArea');
  const noChat = createNode('NoChatSelected');
  const activeChat = createNode('ActiveChatView');
  const chatHeader = createNode('ChatHeader');
  const messagesContainer = createNode('MessagesContainer');
  const messageWrapper = createNode('MessageWrapper (× N)');
  const typingIndicator = createNode('TypingIndicator');
  const replyBar = createNode('ReplyBar');
  const inputArea = createNode('InputArea');
  const emojiPanel = createNode('EmojiPanel');
  messagesContainer.children.push(messageWrapper, typingIndicator);
  inputArea.children.push(emojiPanel);
  activeChat.children.push(chatHeader, messagesContainer, replyBar, inputArea);
  chatArea.children.push(noChat, activeChat);

  const overlay = createNode('OverlayBackdrop');
  const portal = createNode('(Portal) MessageActionsMenu / UserSettingsMenu');

  root.children = [sidebar, chatArea, overlay, portal];

  // Assign unique IDs manually for default tree (since createNode uses 0)
  let idCounter = 1;
  function assignIds(node: TreeNode) {
    node.id = idCounter++;
    node.children.forEach(assignIds);
  }
  assignIds(root);
  return root;
}

export const useTreeStore = create<TreeState>((set, get) => ({
  root: null,
  selectedNodeId: null,
  nextId: 1,

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  setRoot: (newRoot) => {
    const maxId = getMaxId(newRoot);
    set({
      root: newRoot,
      selectedNodeId: newRoot.id,
      nextId: maxId + 1
    });
  },

  addChild: (parentId, name) => {
    const { root, nextId } = get();
    if (!root) return;
    const newRoot = structuredClone(root);
    const parent = findNodeById(newRoot, parentId); // helper needed
    if (!parent) return;
    const child = createNode(name);
    child.id = nextId;
    parent.children.push(child);
    set({
      root: newRoot,
      nextId: nextId + 1
    });
  },

  addSibling: (nodeId, name) => {
    const { root, nextId } = get();
    if (!root) return;
    if (nodeId === root.id) return; // cannot add sibling to root
    const newRoot = structuredClone(root);
    const parent = findParent(newRoot, nodeId);
    if (!parent) return;
    const index = parent.children.findIndex((c) => c.id === nodeId);
    if (index === -1) return;
    const sibling = createNode(name);
    sibling.id = nextId;
    parent.children.splice(index + 1, 0, sibling);
    set({
      root: newRoot,
      nextId: nextId + 1
    });
  },

  deleteNode: (nodeId) => {
    const { root } = get();
    if (!root || nodeId === root.id) return;
    const newRoot = structuredClone(root);
    const parent = findParent(newRoot, nodeId);
    if (!parent) return;
    parent.children = parent.children.filter((c) => c.id !== nodeId);
    set({
      root: newRoot,
      selectedNodeId: newRoot.id // fallback
    });
  },

  editNode: (nodeId, newName) => {
    const { root } = get();
    if (!root) return;
    const newRoot = structuredClone(root);
    const node = findNodeById(newRoot, nodeId); // helper needed
    if (node) node.name = newName;
    set({ root: newRoot });
  }
}));

// Helper: find node by id (used inside store)
function findNodeById(node: TreeNode, id: number): TreeNode | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

// Initialize with default tree
const defaultTree = buildDefaultTree();
useTreeStore.getState().setRoot(defaultTree);
