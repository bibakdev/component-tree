// src/modules/saved-trees/components/Container/SaveModal.tsx
'use client';

import React, { useState } from 'react';
import Modal from '@/shared/components/ui/Modal';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { useSavedTreesModalStore } from '../../stores/useSavedTreesModalStore';
import { useSavedTreesStore } from '../../stores/useSavedTreesStore';

const SaveModal: React.FC = () => {
  const { saveModalOpen, closeSaveModal } = useSavedTreesModalStore();
  const saveTree = useSavedTreesStore((s) => s.saveTree);
  const overwriteTree = useSavedTreesStore((s) => s.overwriteTree);
  const [name, setName] = useState('');

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const success = saveTree(trimmed);
    if (!success) {
      if (confirm(`نام "${trimmed}" قبلاً وجود دارد. بازنویسی شود؟`)) {
        overwriteTree(trimmed);
        closeSaveModal();
        setName('');
      }
      return;
    }
    closeSaveModal();
    setName('');
  };

  return (
    <Modal open={saveModalOpen} onClose={closeSaveModal}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-center">💾 ذخیره درخت</h3>
        <Input
          value={name}
          onChange={setName}
          placeholder="نام درخت..."
          autoFocus
          onEnter={handleConfirm}
        />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={closeSaveModal}>
            ❌ لغو
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ✅ ذخیره
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveModal;
