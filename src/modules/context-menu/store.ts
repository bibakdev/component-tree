import { create } from 'zustand';

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  targetNodeId: number | null;

  open: (nodeId: number, x: number, y: number) => void;
  close: () => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  targetNodeId: null,

  open: (nodeId, x, y) =>
    set({ isOpen: true, position: { x, y }, targetNodeId: nodeId }),

  close: () => set({ isOpen: false, targetNodeId: null })
}));
