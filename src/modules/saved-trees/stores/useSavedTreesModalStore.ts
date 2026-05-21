// src/modules/saved-trees/stores/useSavedTreesModalStore.ts
'use client';

import { create } from 'zustand';

interface SavedTreesModalState {
  saveModalOpen: boolean;
  editModalOpen: boolean;
  editTargetName: string | null;
  deleteModalOpen: boolean;
  deleteTargetName: string | null;

  openSaveModal: () => void;
  closeSaveModal: () => void;
  openEditModal: (name: string) => void;
  closeEditModal: () => void;
  openDeleteModal: (name: string) => void;
  closeDeleteModal: () => void;
}

export const useSavedTreesModalStore = create<SavedTreesModalState>((set) => ({
  saveModalOpen: false,
  editModalOpen: false,
  editTargetName: null,
  deleteModalOpen: false,
  deleteTargetName: null,

  openSaveModal: () => set({ saveModalOpen: true }),
  closeSaveModal: () => set({ saveModalOpen: false }),
  openEditModal: (name) => set({ editModalOpen: true, editTargetName: name }),
  closeEditModal: () => set({ editModalOpen: false, editTargetName: null }),
  openDeleteModal: (name) =>
    set({ deleteModalOpen: true, deleteTargetName: name }),
  closeDeleteModal: () =>
    set({ deleteModalOpen: false, deleteTargetName: null })
}));
