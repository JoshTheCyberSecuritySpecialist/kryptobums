import { CurrentTurn } from '../../context/CardClashContext';
import { User, Bot } from 'lucide-react';

interface TurnIndicatorProps {
  currentTurn: CurrentTurn;
  turnNumber: number;
}

export const TurnIndicator = ({ currentTurn, turnNumber }: TurnIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <div className={`
        flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300
        ${currentTurn === 'player'
          ? 'bg-[#00FF9C]/20 border-[#00FF9C] shadow-lg shadow-[#00FF9C]/50'
          : 'bg-[#14161A] border-[#374151] opacity-50'
        }
      `}>
        <User className={`w-5 h-5 ${currentTurn === 'player' ? 'text-[#00FF9C]' : 'text-[#6B7280]'}`} />
        <span className={`font-black uppercase tracking-wider ${currentTurn === 'player' ? 'text-[#00FF9C]' : 'text-[#6B7280]'}`}>
          Your Turn
        </span>
      </div>

      <div className="px-4 py-2 bg-[#14161A] border-2 border-[#374151] rounded-lg">
        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider font-bold text-center mb-1">Turn</p>
        <p className="text-[#E5E7EB] font-black text-2xl text-center">{turnNumber}</p>
      </div>

      <div className={`
        flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-300
        ${currentTurn === 'opponent'
          ? 'bg-[#FF3B3B]/20 border-[#FF3B3B] shadow-lg shadow-[#FF3B3B]/50'
          : 'bg-[#14161A] border-[#374151] opacity-50'
        }
      `}>
        <Bot className={`w-5 h-5 ${currentTurn === 'opponent' ? 'text-[#FF3B3B]' : 'text-[#6B7280]'}`} />
        <span className={`font-black uppercase tracking-wider ${currentTurn === 'opponent' ? 'text-[#FF3B3B]' : 'text-[#6B7280]'}`}>
          Opponent Turn
        </span>
      </div>
    </div>
  );
};
