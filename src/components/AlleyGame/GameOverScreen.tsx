import { SkullIcon, Trophy } from 'lucide-react';
import { BUM_DIALOGUE } from '../../data/bumDialogue';

interface GameOverScreenProps {
  isWin: boolean;
  xp: number;
  onRestart: () => void;
}

export const GameOverScreen = ({ isWin, xp, onRestart }: GameOverScreenProps) => {
  const message = isWin
    ? BUM_DIALOGUE.winQuotes[Math.floor(Math.random() * BUM_DIALOGUE.winQuotes.length)]
    : BUM_DIALOGUE.deathLines[Math.floor(Math.random() * BUM_DIALOGUE.deathLines.length)];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
      <div
        className={`max-w-md w-full mx-4 p-8 border-4 text-center space-y-6
                    ${isWin ? 'bg-yellow-900/30 border-yellow-400' : 'bg-red-900/30 border-red-500'}`}
        style={{
          transform: 'rotate(-1deg)',
          animation: 'shake 0.5s ease-in-out',
        }}
      >
        {isWin ? (
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-bounce" />
        ) : (
          <SkullIcon className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
        )}

        <h2
          className={`text-5xl font-black uppercase tracking-wider
                      ${isWin ? 'text-yellow-400' : 'text-red-500'}`}
          style={{
            textShadow: isWin ? '0 0 20px rgba(234, 179, 8, 0.8)' : '0 0 20px rgba(239, 68, 68, 0.8)',
            transform: 'scaleY(1.2)',
          }}
        >
          {isWin ? 'ASCENDED' : message}
        </h2>

        <p className="text-xl text-white font-mono">
          {isWin ? message : 'Back to the bottom.'}
        </p>

        <div className="py-4 space-y-2">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Final Stats</p>
          <p className="text-2xl text-[#00FF9C] font-bold">
            XP: <span className="text-yellow-400">{xp}</span>
          </p>
        </div>

        <button
          onClick={onRestart}
          className={`w-full py-4 px-8 font-black text-xl uppercase tracking-wider
                      border-2 transition-all hover:scale-105 active:scale-95
                      ${
                        isWin
                          ? 'bg-yellow-600 hover:bg-yellow-700 border-yellow-400 text-black'
                          : 'bg-red-600 hover:bg-red-700 border-red-400 text-white'
                      }`}
        >
          {isWin ? 'Descend Again' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};
