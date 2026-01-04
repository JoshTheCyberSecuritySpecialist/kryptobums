interface CombatButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const CombatButton = ({ label, onClick, disabled = false }: CombatButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-10 bg-[#1A1C20] border border-[#2A2C30] text-[#E5E7EB]
                 font-semibold text-sm tracking-wide uppercase
                 hover:bg-[#23252A] active:scale-[0.97]
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-100"
      style={{ borderRadius: '4px' }}
    >
      {label}
    </button>
  );
};
