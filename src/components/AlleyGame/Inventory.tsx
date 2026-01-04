import { Package } from 'lucide-react';
import { GameItem } from '../../types/alleyGame';

interface InventoryProps {
  items: GameItem[];
}

export const Inventory = ({ items }: InventoryProps) => {
  const getEffectColor = (effect?: string) => {
    switch (effect) {
      case 'buff':
        return 'text-green-400';
      case 'curse':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getEffectLabel = (effect?: string) => {
    switch (effect) {
      case 'buff':
        return '↑';
      case 'curse':
        return '↓';
      default:
        return '?';
    }
  };

  return (
    <div className="bg-[#14161A] border-2 border-[#00FF9C] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-4 h-4 text-[#00FF9C]" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Inventory ({items.length})
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-500 italic">Empty pockets...</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-[#0B0D10] border border-[#00FF9C]/40 p-2 hover:border-[#00FF9C] transition-colors"
              title={item.description}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-mono text-white line-clamp-2">
                  {item.name}
                </span>
                <span className={`text-sm font-bold ${getEffectColor(item.effect)}`}>
                  {getEffectLabel(item.effect)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
