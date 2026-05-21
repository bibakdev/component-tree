'use client';

import { create } from 'zustand';

export type NodeModalType =
  | 'addChild'
  | 'addSibling'
  | 'edit'
  | 'delete'
  | null;

interface NodeModalState {
  modalType: NodeModalType;
  targetNodeId: number | null;
  nameInputValue: string;
  openModal: (
    type: Exclude<NodeModalType, null>,
    targetId: number,
    initialName?: string
  ) => void;
  closeModal: () => void;
  setNameInput: (value: string) => void;
}

export const useNodeModalStore = create<NodeModalState>((set) => ({
  modalType: null,
  targetNodeId: null,
  nameInputValue: '',
  openModal: (type, targetId, initialName = '') =>
    set({
      modalType: type,
      targetNodeId: targetId,
      nameInputValue: initialName
    }),
  closeModal: () =>
    set({ modalType: null, targetNodeId: null, nameInputValue: '' }),
  setNameInput: (value) => set({ nameInputValue: value })
}));
