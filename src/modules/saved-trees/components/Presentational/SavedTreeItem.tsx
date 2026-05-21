// src/modules/saved-trees/components/Presentational/SavedTreeItem.tsx
'use client';

interface SavedTreeItemProps {
  name: string;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function SavedTreeItem({
  name,
  onSelect,
  onEdit,
  onDelete
}: SavedTreeItemProps) {
  return (
    <li
      onClick={onSelect}
      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition border border-white/10"
    >
      <span className="truncate text-sm font-medium text-white/80">{name}</span>
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-yellow-400 hover:text-yellow-300 text-lg"
          title="ویرایش"
        >
          ✎
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-400 hover:text-red-300 text-lg"
          title="حذف"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
