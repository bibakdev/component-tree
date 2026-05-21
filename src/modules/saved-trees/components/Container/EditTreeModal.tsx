// src/modules/saved-trees/components/Container/EditTreeModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/shared/components/ui/Modal';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import { useSavedTreesModalStore } from '../../stores/useSavedTreesModalStore';
import { useSavedTreesStore } from '../../stores/useSavedTreesStore';

const EditTreeModal: React.FC = () => {
  const { editModalOpen, editTargetName, closeEditModal } =
    useSavedTreesModalStore();
  const renameTree = useSavedTreesStore((s) => s.renameTree);
  const [name, setName] = useState('');

  useEffect(() => {
    if (editTargetName) setName(editTargetName);
  }, [editTargetName]);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed || !editTargetName) return;
    if (trimmed === editTargetName) {
      closeEditModal();
      return;
    }
    const success = renameTree(editTargetName, trimmed);
    if (!success) {
      alert('این نام قبلاً وجود دارد.');
      return;
    }
    closeEditModal();
  };

  return (
    <Modal open={editModalOpen} onClose={closeEditModal}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-center">✏️ تغییر نام درخت</h3>
        <Input
          value={name}
          onChange={setName}
          placeholder="نام جدید..."
          autoFocus
          onEnter={handleConfirm}
        />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={closeEditModal}>
            ❌ لغو
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ✅ تأیید
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditTreeModal;
