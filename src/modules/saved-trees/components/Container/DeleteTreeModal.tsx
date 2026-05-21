// src/modules/saved-trees/components/Container/DeleteTreeModal.tsx
'use client';

import React from 'react';
import Modal from '@/shared/components/ui/Modal';
import Button from '@/shared/components/ui/Button';
import { useSavedTreesModalStore } from '../../stores/useSavedTreesModalStore';
import { useSavedTreesStore } from '../../stores/useSavedTreesStore';

const DeleteTreeModal: React.FC = () => {
  const { deleteModalOpen, deleteTargetName, closeDeleteModal } =
    useSavedTreesModalStore();
  const deleteTree = useSavedTreesStore((s) => s.deleteTree);

  const handleConfirm = () => {
    if (deleteTargetName) {
      deleteTree(deleteTargetName);
    }
    closeDeleteModal();
  };

  return (
    <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-center">⚠️ حذف درخت</h3>
        <p className="text-center text-white/80">
          {deleteTargetName
            ? `آیا از حذف درخت "${deleteTargetName}" اطمینان دارید؟`
            : 'درختی برای حذف انتخاب نشده است.'}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={closeDeleteModal}>
            ❌ لغو
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            🗑️ حذف
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTreeModal;
