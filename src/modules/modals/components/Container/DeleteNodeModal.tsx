'use client';

import { useNodeModalStore } from '../../store';
import { useTreeStore, findNodeById } from '@/modules/tree-core/store';
import Modal from '@/shared/components/ui/Modal';
import Button from '@/shared/components/ui/Button';

export default function DeleteNodeModal() {
  const { modalType, targetNodeId, closeModal } = useNodeModalStore();
  const { root, deleteNode } = useTreeStore();

  const isOpen = modalType === 'delete';

  if (!isOpen || targetNodeId === null || !root) return null;

  const targetNode = findNodeById(root, targetNodeId);
  if (!targetNode) return null;

  const handleConfirm = () => {
    deleteNode(targetNodeId);
    closeModal();
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <h3 className="text-red-400 text-xl font-bold mb-2">⚠️ حذف گره</h3>
      <p className="text-white/80 mb-6">
        آیا از حذف «{targetNode.name}» اطمینان دارید؟
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={closeModal}>
          ❌ لغو
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          🗑️ حذف
        </Button>
      </div>
    </Modal>
  );
}
