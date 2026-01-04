import { useState } from 'react';
import { Card, CARD_POOL } from '../../data/cards';
import { GameCard } from './GameCard';
import { TutorialHighlight } from './TutorialHighlight';
import { useTutorial } from '../../context/TutorialContext';
import { Button } from '../UI/Button';
import { Plus, Minus, Play } from 'lucide-react';

interface DeckBuilderProps {
  onStartMatch: (deck: Card[]) => void;
}

const MAX_DECK_SIZE = 20;

export const DeckBuilder = ({ onStartMatch }: DeckBuilderProps) => {
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const { tutorialState } = useTutorial();

  const addCard = (card: Card) => {
    if (selectedCards.length >= MAX_DECK_SIZE) return;
    setSelectedCards([...selectedCards, { ...card, id: `${card.id}-${Date.now()}` }]);
  };

  const removeCard = (index: number) => {
    setSelectedCards(selectedCards.filter((_, i) => i !== index));
  };

  const canStartMatch = selectedCards.length === MAX_DECK_SIZE;

  const getCardCount = (cardId: string) => {
    return selectedCards.filter(c => c.id.startsWith(cardId)).length;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#00FF9C] text-3xl font-black uppercase tracking-tight">Deck Builder</h2>
          <p className="text-[#9CA3AF] mt-2">Select {MAX_DECK_SIZE} cards to build your deck</p>
        </div>
        <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'deck-builder'}>
          <div className="text-right">
            <p className="text-[#9CA3AF] text-sm uppercase tracking-wider font-bold">Deck Size</p>
            <p className={`text-4xl font-black ${canStartMatch ? 'text-[#00FF9C]' : 'text-[#E5E7EB]'}`}>
              {selectedCards.length}/{MAX_DECK_SIZE}
            </p>
          </div>
        </TutorialHighlight>
      </div>

      <div className="bg-[#1F2937] border-2 border-[#374151] rounded-lg p-6">
        <h3 className="text-[#E5E7EB] text-xl font-black mb-4 uppercase tracking-wider">Available Cards</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CARD_POOL.map(card => {
            const count = getCardCount(card.id);
            const canAdd = selectedCards.length < MAX_DECK_SIZE;

            return (
              <div key={card.id} className="relative">
                <GameCard card={card} small />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => addCard(card)}
                    disabled={!canAdd}
                    className={`
                      flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded
                      font-bold text-sm transition-all
                      ${canAdd
                        ? 'bg-[#00FF9C] text-[#14161A] hover:bg-[#4ADE80]'
                        : 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
                      }
                    `}
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                  {count > 0 && (
                    <div className="px-2 py-1 bg-[#00FF9C]/20 border border-[#00FF9C] rounded text-[#00FF9C] font-black text-sm">
                      {count}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 rounded-lg p-6">
        <h3 className="text-[#00FF9C] text-xl font-black mb-4 uppercase tracking-wider">Your Deck</h3>
        {selectedCards.length === 0 ? (
          <p className="text-[#6B7280] text-center py-8">No cards selected yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {selectedCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="relative">
                <GameCard card={card} small />
                <button
                  onClick={() => removeCard(index)}
                  className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 rounded bg-[#FF3B3B] text-white hover:bg-[#FF6B6B] font-bold text-sm transition-all"
                >
                  <Minus className="w-4 h-4" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'deck-builder' && canStartMatch}>
          <Button
            onClick={() => onStartMatch(selectedCards)}
            disabled={!canStartMatch}
            accentColor="green"
            className="px-8 py-4 text-xl"
          >
            <Play className="w-6 h-6" />
            Start Match
          </Button>
        </TutorialHighlight>
      </div>
    </div>
  );
};
