'use client';

import { useNodeModalStore } from '../../store';
import { useTreeStore } from '@/modules/tree-core/store';
import Modal from '@/shared/components/ui/Modal';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';

export default function NodeNameModal() {
  const { modalType, targetNodeId, nameInputValue, closeModal, setNameInput } =
    useNodeModalStore();

  const { addChild, addSibling, editNode } = useTreeStore();

  const isOpen =
    modalType === 'addChild' ||
    modalType === 'addSibling' ||
    modalType === 'edit';

  if (!isOpen || targetNodeId === null) return null;

  const handleConfirm = () => {
    const name = nameInputValue.trim();
    if (!name) return;

    if (modalType === 'addChild') addChild(targetNodeId, name);
    else if (modalType === 'addSibling') addSibling(targetNodeId, name);
    else if (modalType === 'edit') editNode(targetNodeId, name);

    closeModal();
  };

  const titles = {
    addChild: '➕ افزودن فرزند',
    addSibling: '↔️ افزودن هم‌سطح',
    edit: '✏️ ویرایش نام'
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <h3 className="text-white text-xl font-bold mb-4">{titles[modalType]}</h3>
      <div className="mb-6">
        <Input
          value={nameInputValue}
          onChange={setNameInput}
          placeholder="نام گره..."
          autoFocus
          onEnter={handleConfirm}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={closeModal}>
          ❌ لغو
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          ✅ تأیید
        </Button>
      </div>
    </Modal>
  );
}
