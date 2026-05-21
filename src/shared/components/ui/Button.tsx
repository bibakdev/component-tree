'use client';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const variantClasses = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white',
  secondary: 'bg-white/10 hover:bg-white/20 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
};

export default function Button({
  variant,
  onClick,
  children,
  disabled
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}
