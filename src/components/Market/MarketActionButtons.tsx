import { MarketActionType } from '../../types/marketGame';

interface MarketActionButtonsProps {
  onAction: (action: MarketActionType) => void;
  disabled: boolean;
  glowButton: MarketActionType | null;
}

export const MarketActionButtons = ({ onAction, disabled, glowButton }: MarketActionButtonsProps) => {
  const buttons: { label: string; action: MarketActionType }[] = [
    { label: 'Hold', action: 'hold' },
    { label: 'Risk', action: 'risk' },
    { label: 'Double Down', action: 'double-down' },
    { label: 'Cash Out', action: 'cash-out' },
    { label: 'Walk Away', action: 'walk-away' },
    { label: 'Taunt Market', action: 'taunt-market' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {buttons.map(({ label, action }) => (
        <button
          key={action}
          onClick={() => onAction(action)}
          disabled={disabled}
          className={`w-full h-10 bg-[#1A1C20] border border-[#2A2C30] text-[#E5E7EB]
                     font-semibold text-xs tracking-wide uppercase
                     hover:bg-[#23252A] active:scale-[0.97]
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-100
                     ${glowButton === action ? 'ring-2 ring-[#00FF9C] ring-opacity-60' : ''}`}
          style={{ borderRadius: '4px' }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
