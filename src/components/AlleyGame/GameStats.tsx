import { Heart, Flame, Sparkles, Star } from 'lucide-react';

interface GameStatsProps {
  health: number;
  maxHealth: number;
  rage: number;
  luck: number;
  xp: number;
  rageMode: boolean;
}

export const GameStats = ({ health, maxHealth, rage, luck, xp, rageMode }: GameStatsProps) => {
  const healthPercent = (health / maxHealth) * 100;
  const ragePercent = rage;

  return (
    <div className="bg-[#14161A] border-2 border-[#00FF9C] p-4 space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className={`w-4 h-4 ${health < 30 ? 'text-red-500 animate-pulse' : 'text-[#00FF9C]'}`} />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Health</span>
          </div>
          <span className="text-sm font-mono text-[#00FF9C]">
            {health}/{maxHealth}
          </span>
        </div>
        <div className="w-full h-3 bg-[#0B0D10] border border-[#00FF9C]">
          <div
            className={`h-full transition-all duration-300 ${
              health < 30 ? 'bg-red-500' : 'bg-[#00FF9C]'
            }`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`w-4 h-4 ${rageMode ? 'text-orange-500 animate-bounce' : 'text-orange-400'}`} />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Rage {rageMode && <span className="text-orange-500 text-xs">MODE!</span>}
            </span>
          </div>
          <span className="text-sm font-mono text-orange-400">{rage}</span>
        </div>
        <div className="w-full h-3 bg-[#0B0D10] border border-orange-400">
          <div
            className={`h-full transition-all duration-300 ${
              rageMode ? 'bg-orange-500 animate-pulse' : 'bg-orange-400'
            }`}
            style={{ width: `${ragePercent}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-[#00FF9C]/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase">Luck</span>
          <span className="text-xs font-mono text-blue-400">{luck}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-bold text-white uppercase">XP</span>
          <span className="text-xs font-mono text-yellow-400">{xp}</span>
        </div>
      </div>
    </div>
  );
};
