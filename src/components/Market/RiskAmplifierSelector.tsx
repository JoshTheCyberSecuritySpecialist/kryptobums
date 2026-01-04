import { RiskAmplifier } from '../../types/marketGame';
import { AMPLIFIER_LABELS } from '../../data/marketGameData';

interface RiskAmplifierSelectorProps {
  current: RiskAmplifier;
  onChange: (amplifier: RiskAmplifier) => void;
  disabled: boolean;
}

export const RiskAmplifierSelector = ({ current, onChange, disabled }: RiskAmplifierSelectorProps) => {
  const amplifiers: RiskAmplifier[] = [1, 10, 50, 250];

  return (
    <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 p-4">
      <div className="text-sm font-bold text-[#00FF9C] uppercase tracking-wider mb-3">
        Leverage
      </div>
      <div className="grid grid-cols-4 gap-2">
        {amplifiers.map(amp => (
          <button
            key={amp}
            onClick={() => onChange(amp)}
            disabled={disabled}
            className={`h-9 text-xs font-bold uppercase tracking-wider
                       border-2 transition-all duration-100
                       ${current === amp
                         ? 'bg-[#00FF9C] text-black border-[#00FF9C]'
                         : 'bg-[#1A1C20] text-gray-400 border-[#2A2C30] hover:border-[#00FF9C]/50'}
                       disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ borderRadius: '4px' }}
          >
            {AMPLIFIER_LABELS[amp]}
          </button>
        ))}
      </div>
    </div>
  );
};
