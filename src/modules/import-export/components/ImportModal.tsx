'use client';

import { useState } from 'react';
import Modal from '@/shared/components/ui/Modal';
import Button from '@/shared/components/ui/Button';
import { useImportModalStore } from '../store';
import { parseTreeText } from '../services';
import { useTreeStore } from '@/modules/tree-core/store';
import { useHistoryStore } from '@/modules/history/store';
import { TreeNode } from '@/modules/tree-core/types';

export default function ImportModal() {
  const { isOpen, importText, close, setImportText } = useImportModalStore();
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    setError(null);
    try {
      const newRoot = parseTreeText(importText);
      if (!newRoot) throw new Error('متن درخت معتبر نیست');

      // Assign unique IDs starting from 1
      let nextId = 1;
      function assignIds(node: TreeNode) {
        node.id = nextId++;
        node.children.forEach(assignIds);
      }
      assignIds(newRoot);

      useHistoryStore.getState().clear();
      useTreeStore.getState().setRoot(newRoot);
      close();
    } catch (e: any) {
      setError(e.message || 'خطا در پردازش متن');
    }
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center text-white">
          📥 ورود درخت
        </h2>
        <textarea
          value={importText}
          onChange={(e) => {
            setImportText(e.target.value);
            setError(null);
          }}
          placeholder="متن درخت را اینجا قرار دهید..."
          className="w-full h-48 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors resize-none font-mono text-sm"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={close}>
            ❌ لغو
          </Button>
          <Button variant="primary" onClick={handleImport}>
            ✅ تأیید
          </Button>
        </div>
      </div>
    </Modal>
  );
}
