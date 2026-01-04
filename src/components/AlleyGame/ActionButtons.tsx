import { Sword, MessageCircle, Sparkles } from 'lucide-react';
import { ActionType } from '../../types/alleyGame';

interface ActionButtonsProps {
  onAction: (action: ActionType) => void;
  disabled: boolean;
  inCombat: boolean;
}

export const ActionButtons = ({ onAction, disabled, inCombat }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <button
        onClick={() => onAction('fight')}
        disabled={disabled}
        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 border-2 border-red-800
                   text-white font-bold py-4 px-2 uppercase text-sm tracking-wider
                   transition-all hover:scale-105 active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-50
                   shadow-lg hover:shadow-red-500/50"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        <Sword className="w-5 h-5 mx-auto mb-1" />
        {inCombat ? 'Attack' : 'Fight'}
      </button>

      <button
        onClick={() => onAction('talk')}
        disabled={disabled}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 border-2 border-blue-800
                   text-white font-bold py-4 px-2 uppercase text-sm tracking-wider
                   transition-all hover:scale-105 active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-50
                   shadow-lg hover:shadow-blue-500/50"
      >
        <MessageCircle className="w-5 h-5 mx-auto mb-1" />
        Talk
      </button>

      <button
        onClick={() => onAction('stupid')}
        disabled={disabled}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 border-2 border-purple-800
                   text-white font-bold py-4 px-2 uppercase text-xs tracking-wider
                   transition-all hover:scale-105 active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-50
                   shadow-lg hover:shadow-purple-500/50"
        style={{ transform: 'rotate(0.5deg)' }}
      >
        <Sparkles className="w-5 h-5 mx-auto mb-1" />
        Do Something Stupid
      </button>
    </div>
  );
};
