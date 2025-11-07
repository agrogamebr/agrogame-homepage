interface ToggleButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export default function ToggleButton({ children, isActive, onClick, className = "" }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0b63e5] focus:ring-offset-2 ${
        isActive
          ? 'bg-[#0b63e5] text-white shadow-lg transform hover:scale-105'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      } ${className}`}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}