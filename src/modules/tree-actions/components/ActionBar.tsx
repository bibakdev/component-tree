// src/modules/tree-actions/components/ActionBar.tsx
'use client';

import Button from '@/shared/components/ui/Button';
import { useHistoryStore } from '@/modules/history/store';
import { useTreeStore } from '@/modules/tree-core/store';
import { useSavedTreesModalStore } from '@/modules/saved-trees/stores/useSavedTreesModalStore';
import { buildTreeText } from '@/modules/tree-view/utils';

export default function ActionBar() {
  const { canUndo, canRedo, undo, redo } = useHistoryStore();
  const root = useTreeStore((state) => state.root);
  const openSaveModal = useSavedTreesModalStore((state) => state.openSaveModal);

  const handleUndo = () => {
    const snapshot = undo();
    if (snapshot) useTreeStore.getState().setRoot(snapshot);
  };

  const handleRedo = () => {
    const snapshot = redo();
    if (snapshot) useTreeStore.getState().setRoot(snapshot);
  };

  const handleCopy = () => {
    if (!root) return;
    const treeText = buildTreeText(root);
    navigator.clipboard.writeText(treeText).catch(() => {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = treeText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
      <Button variant="secondary" onClick={handleUndo} disabled={!canUndo}>
        ↩ بازگشت
      </Button>
      <Button variant="secondary" onClick={handleRedo} disabled={!canRedo}>
        ↪ انجام دوباره
      </Button>
      <Button variant="secondary" onClick={openSaveModal}>
        💾 ذخیره
      </Button>
      <Button variant="secondary" onClick={handleCopy}>
        📋 کپی
      </Button>
    </div>
  );
}
