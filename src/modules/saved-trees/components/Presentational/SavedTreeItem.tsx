// src/modules/saved-trees/components/Presentational/SavedTreeItem.tsx
import React from 'react';

interface SavedTreeItemProps {
  name: string;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const SavedTreeItem: React.FC<SavedTreeItemProps> = ({
  name,
  onSelect,
  onEdit,
  onDelete
}) => {
  return (
    <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.08] px-4 py-2.5 backdrop-blur-[5px] transition-all duration-200 hover:-translate-x-1 hover:border-white/30 hover:bg-white/[0.15]">
      <span
        onClick={onSelect}
        className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap font-medium text-[#e0e0ff]"
        title={name}
      >
        {name}
      </span>
      <div className="flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded-lg p-1 text-lg text-yellow-400 transition hover:bg-white/20"
          title="ویرایش نام"
        >
          ✎
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded-lg p-1 text-lg text-red-400 transition hover:bg-white/20"
          title="حذف درخت"
        >
          ✕
        </button>
      </div>
    </li>
  );
};

export default SavedTreeItem;
