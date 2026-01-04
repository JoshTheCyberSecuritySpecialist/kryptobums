import { MarketPhase } from '../../types/marketGame';

interface MarketPhaseDisplayProps {
  phase: MarketPhase;
}

export const MarketPhaseDisplay = ({ phase }: MarketPhaseDisplayProps) => {
  const phaseLabels: Record<MarketPhase, string> = {
    'pre-market': 'Pre-Market',
    'open': 'Open',
    'expansion': 'Expansion',
    'midday-chop': 'Midday Chop',
    'trend-continuation': 'Trend Continuation',
    'reversal-window': 'Reversal Window',
    'power-hour': 'Power Hour',
    'close': 'Close',
  };

  return (
    <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 p-6 text-center">
      <div className="text-xs text-gray-400 font-mono uppercase tracking-wider mb-2">
        Phase
      </div>
      <div className="text-2xl font-black text-[#00FF9C] uppercase tracking-tight">
        {phaseLabels[phase]}
      </div>
    </div>
  );
};
