'use client';

export default function MobileSidebarToggle({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 lg:hidden"
      aria-label="باز کردن منو"
    >
      ☰
    </button>
  );
}
