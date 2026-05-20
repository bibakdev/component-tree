'use client';

import CloseSidebarButton from './CloseSidebarButton';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Sidebar({ open, onClose, children }: SidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto border-r border-white/10 
        bg-white/5 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">📁 درخت‌ها</h2>
        <CloseSidebarButton onClick={onClose} />
      </div>
      <nav className="p-4">{children}</nav>
    </aside>
  );
}
