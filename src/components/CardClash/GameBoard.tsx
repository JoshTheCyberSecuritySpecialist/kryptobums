import { useCardClash } from '../../context/CardClashContext';
import { useTutorial } from '../../context/TutorialContext';
import { GameCard } from './GameCard';
import { HealthBar } from './HealthBar';
import { EnergyMeter } from './EnergyMeter';
import { TurnIndicator } from './TurnIndicator';
import { TutorialHighlight } from './TutorialHighlight';
import { AIDebugPanel } from './AIDebugPanel';
import { Button } from '../UI/Button';
import { SkipForward } from 'lucide-react';

export const GameBoard = () => {
  const { gameState, playCard, endTurn, toggleDebugMode } = useCardClash();
  const { tutorialState } = useTutorial();

  const canPlayCard = (cardCost: number) => {
    return (
      gameState.currentTurn === 'player' &&
      gameState.turnPhase === 'action' &&
      cardCost <= gameState.player.energy
    );
  };

  const canEndTurn = gameState.currentTurn === 'player' && gameState.turnPhase === 'action';

  return (
    <div className="space-y-8">
      <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'start-match'}>
        <HealthBar
          current={gameState.opponent.health}
          max={gameState.opponent.maxHealth}
          block={gameState.opponent.block}
          label="Opponent"
        />
      </TutorialHighlight>

      <div className="bg-[#1F2937]/50 border-2 border-[#374151] rounded-lg p-6 min-h-[120px] flex items-center justify-center">
        <p className="text-[#6B7280] text-sm uppercase tracking-wider">
          Opponent has {gameState.opponent.hand.length} cards
        </p>
      </div>

      <TurnIndicator currentTurn={gameState.currentTurn} turnNumber={gameState.turnNumber} />

      <div className="flex items-center justify-center gap-6">
        <TutorialHighlight active={tutorialState.isActive && (tutorialState.currentStep === 'start-match' || tutorialState.currentStep === 'first-turn')}>
          <EnergyMeter current={gameState.player.energy} max={gameState.player.maxEnergy} />
        </TutorialHighlight>

        <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'first-turn'}>
          <Button
            onClick={endTurn}
            disabled={!canEndTurn}
            accentColor="blue"
            className="px-6 py-3"
          >
            <SkipForward className="w-5 h-5" />
            End Turn
          </Button>
        </TutorialHighlight>
      </div>

      <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'first-turn'}>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[#E5E7EB] text-xl font-black uppercase tracking-wider">Your Hand</h3>
            <p className="text-[#9CA3AF] text-sm">
              {gameState.player.deck.length} cards remaining in deck
            </p>
          </div>
          <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 rounded-lg p-6 min-h-[200px]">
            {gameState.player.hand.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[#6B7280] text-sm uppercase tracking-wider">No cards in hand</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {gameState.player.hand.map((card, index) => (
                  <GameCard
                    key={`${card.id}-${index}`}
                    card={card}
                    onClick={() => playCard(index)}
                    disabled={!canPlayCard(card.cost)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </TutorialHighlight>

      <TutorialHighlight active={tutorialState.isActive && tutorialState.currentStep === 'start-match'}>
        <HealthBar
          current={gameState.player.health}
          max={gameState.player.maxHealth}
          block={gameState.player.block}
          label="You"
        />
      </TutorialHighlight>

      <AIDebugPanel
        playerProfile={gameState.playerProfile}
        lastAIDecision={gameState.lastAIDecision}
        isVisible={gameState.debugMode}
        onToggle={toggleDebugMode}
      />
    </div>
  );
};
