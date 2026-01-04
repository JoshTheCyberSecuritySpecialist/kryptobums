import { Card, CardType } from '../../data/cards';
import { Sword, Shield, Zap, Dices } from 'lucide-react';

interface GameCardProps {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
  small?: boolean;
}

const getTypeColor = (type: CardType): string => {
  switch (type) {
    case 'attack': return 'from-[#FF3B3B] to-[#FF6B6B]';
    case 'defense': return 'from-[#3B82F6] to-[#60A5FA]';
    case 'ability': return 'from-[#00FF9C] to-[#4ADE80]';
    case 'chaos': return 'from-[#A855F7] to-[#C084FC]';
  }
};

const getTypeIcon = (type: CardType) => {
  switch (type) {
    case 'attack': return <Sword className="w-5 h-5" />;
    case 'defense': return <Shield className="w-5 h-5" />;
    case 'ability': return <Zap className="w-5 h-5" />;
    case 'chaos': return <Dices className="w-5 h-5" />;
  }
};

export const GameCard = ({ card, onClick, disabled, small }: GameCardProps) => {
  const canPlay = onClick && !disabled;

  return (
    <div
      className={`
        relative border-2 rounded-lg overflow-hidden
        transition-all duration-200
        ${small ? 'w-24 h-32' : 'w-32 h-44'}
        ${canPlay
          ? 'border-[#00FF9C] shadow-lg shadow-[#00FF9C]/50 cursor-pointer hover:scale-105 hover:-translate-y-2'
          : disabled
            ? 'border-[#4B5563] opacity-50 cursor-not-allowed'
            : 'border-[#6B7280]'
        }
      `}
      onClick={canPlay ? onClick : undefined}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(card.type)} opacity-20`} />

      <div className="relative h-full bg-[#1F2937]/90 backdrop-blur-sm flex flex-col p-3">
        <div className="flex items-start justify-between mb-2">
          <div className={`
            ${small ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}
            rounded-full bg-gradient-to-br ${getTypeColor(card.type)}
            flex items-center justify-center font-black text-white
          `}>
            {card.cost}
          </div>
          <div className="text-white">
            {getTypeIcon(card.type)}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`font-black text-white ${small ? 'text-xs' : 'text-sm'} leading-tight mb-1`}>
              {card.name}
            </h3>
            <p className={`text-[#9CA3AF] ${small ? 'text-[10px]' : 'text-xs'} leading-tight`}>
              {card.description}
            </p>
          </div>

          {card.value > 0 && (
            <div className={`
              ${small ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}
              rounded-full bg-[#14161A] border-2 border-[#00FF9C]
              flex items-center justify-center font-black text-[#00FF9C]
              self-end
            `}>
              {card.value}
            </div>
          )}
        </div>
      </div>

      {canPlay && (
        <div className="absolute inset-0 border-2 border-[#00FF9C] rounded-lg pointer-events-none animate-pulse" />
      )}
    </div>
  );
};
