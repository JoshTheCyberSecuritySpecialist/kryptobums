import { Button } from '../UI/Button';
import { Trophy, Skull, RotateCcw } from 'lucide-react';

interface MatchResultProps {
  result: 'win' | 'loss';
  onRestart: () => void;
}

export const MatchResult = ({ result, onRestart }: MatchResultProps) => {
  const isWin = result === 'win';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`
        max-w-lg w-full mx-4 p-8 rounded-lg border-4
        ${isWin
          ? 'bg-gradient-to-br from-[#00FF9C]/20 to-[#14161A] border-[#00FF9C]'
          : 'bg-gradient-to-br from-[#FF3B3B]/20 to-[#14161A] border-[#FF3B3B]'
        }
      `}>
        <div className="text-center space-y-6">
          {isWin ? (
            <Trophy className="w-24 h-24 text-[#00FF9C] mx-auto" />
          ) : (
            <Skull className="w-24 h-24 text-[#FF3B3B] mx-auto" />
          )}

          <div>
            <h2 className={`
              text-5xl font-black uppercase tracking-tight mb-2
              ${isWin ? 'text-[#00FF9C]' : 'text-[#FF3B3B]'}
            `}>
              {isWin ? 'Victory!' : 'Defeated'}
            </h2>
            <p className="text-[#9CA3AF] text-lg">
              {isWin
                ? 'You crushed your opponent! Your card skills are unmatched.'
                : 'Your opponent got the better of you this time. Try again?'
              }
            </p>
          </div>

          <Button
            onClick={onRestart}
            accentColor={isWin ? 'green' : 'red'}
            className="px-8 py-4 text-xl"
          >
            <RotateCcw className="w-6 h-6" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};
