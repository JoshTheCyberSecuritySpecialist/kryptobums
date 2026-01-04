import { Skull } from 'lucide-react';
import { Enemy } from '../../types/alleyGame';

interface CombatDisplayProps {
  enemy: Enemy;
  enemyHealth: number;
  enemyMaxHealth: number;
}

export const CombatDisplay = ({ enemy, enemyHealth, enemyMaxHealth }: CombatDisplayProps) => {
  const healthPercent = (enemyHealth / enemyMaxHealth) * 100;

  return (
    <div className="bg-[#14161A] border-2 border-red-500 p-6 animate-shake">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Skull className="w-6 h-6 text-red-500 animate-pulse" />
          <h3 className="text-2xl font-black text-red-500 uppercase tracking-wider">
            {enemy.name}
          </h3>
          <Skull className="w-6 h-6 text-red-500 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white uppercase">Enemy HP</span>
          <span className="text-sm font-mono text-red-500">
            {enemyHealth}/{enemyMaxHealth}
          </span>
        </div>
        <div className="w-full h-4 bg-[#0B0D10] border-2 border-red-500">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-yellow-400 text-xs font-mono italic">
          "Stand down or get knocked down!"
        </p>
      </div>
    </div>
  );
};
