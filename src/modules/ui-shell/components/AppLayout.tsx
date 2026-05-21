'use client';

import { useSidebarStore } from '../store';
import Sidebar from './Sidebar';
import MobileSidebarToggle from './MobileSidebarToggle';
import NodeNameModal from '@/modules/modals/components/Container/NodeNameModal';
import DeleteNodeModal from '@/modules/modals/components/Container/DeleteNodeModal';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, open, close } = useSidebarStore();

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <Sidebar open={isOpen} onClose={close}>
        {/* SavedTreesList will be inserted here later */}
        <p className="text-sm text-gray-400 text-center">درخت‌های ذخیره‌شده</p>
      </Sidebar>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-4 border-b border-white/10 p-4">
          <MobileSidebarToggle onClick={open} />
          <h1 className="text-xl font-bold">Component Tree Builder</h1>
        </div>
        <main className="flex-1 overflow-auto p-6">{children}</main>
        <NodeNameModal />
        <DeleteNodeModal />
      </div>
    </div>
  );
}
