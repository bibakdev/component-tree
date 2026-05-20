'use client';

export default function CloseSidebarButton({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
      aria-label="بستن منو"
    >
      ✕
    </button>
  );
}
