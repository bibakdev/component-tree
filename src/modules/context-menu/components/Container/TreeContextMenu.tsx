// src/modules/context-menu/components/Container/TreeContextMenu.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useContextMenuStore } from '../../store';
import { useTreeStore } from '@/modules/tree-core/store';
import { findNodeById } from '@/modules/tree-core/services';
import { useNodeModalStore } from '@/modules/modals/store';

export const TreeContextMenu: React.FC = () => {
  const { isOpen, position, targetNodeId, close } = useContextMenuStore();
  const { root } = useTreeStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک خارج از آن
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };

    // افزودن یک تاخیر کوچک برای جلوگیری از بسته شدن فوری با همان کلیک راست
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    // بستن با فشردن Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen || targetNodeId === null) return null;

  const targetNode = findNodeById(root, targetNodeId);
  if (!targetNode) return null;

  // --- عملیات با مودال‌ها ---

  const handleAddChild = () => {
    close();
    useNodeModalStore.getState().openModal('addChild', targetNodeId, '');
  };

  const handleAddSibling = () => {
    close();
    if (targetNode.id === root?.id) {
      alert('ریشه نمی‌تواند هم‌سطح داشته باشد.');
      return;
    }
    useNodeModalStore.getState().openModal('addSibling', targetNodeId, '');
  };

  const handleEdit = () => {
    close();
    useNodeModalStore
      .getState()
      .openModal('edit', targetNodeId, targetNode.name);
  };

  const handleDelete = () => {
    close();
    if (targetNode.id === root?.id) {
      alert('نمی‌توان ریشه را حذف کرد.');
      return;
    }
    useNodeModalStore.getState().openModal('delete', targetNodeId, '');
  };

  // محاسبه موقعیت با در نظر گرفتن لبه‌های صفحه
  const style: React.CSSProperties = {
    position: 'fixed',
    left: Math.min(position.x, window.innerWidth - 220),
    top: Math.min(position.y, window.innerHeight - 250),
    zIndex: 1000
  };

  return (
    <div
      ref={menuRef}
      className="min-w-[200px] py-2 backdrop-blur-xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl"
      style={style}
    >
      <button
        onClick={handleAddChild}
        className="w-full text-right px-4 py-2.5 hover:bg-white/10 text-sm text-white/80 flex items-center gap-2 transition-colors"
      >
        <span>➕</span> افزودن فرزند
      </button>
      <button
        onClick={handleAddSibling}
        className="w-full text-right px-4 py-2.5 hover:bg-white/10 text-sm text-white/80 flex items-center gap-2 transition-colors"
      >
        <span>↔️</span> افزودن هم‌سطح
      </button>
      <button
        onClick={handleEdit}
        className="w-full text-right px-4 py-2.5 hover:bg-white/10 text-sm text-white/80 flex items-center gap-2 transition-colors"
      >
        <span>✏️</span> ویرایش
      </button>
      <button
        onClick={handleDelete}
        className="w-full text-right px-4 py-2.5 hover:bg-white/10 text-sm text-red-400 flex items-center gap-2 transition-colors"
      >
        <span>🗑️</span> حذف
      </button>
    </div>
  );
};
