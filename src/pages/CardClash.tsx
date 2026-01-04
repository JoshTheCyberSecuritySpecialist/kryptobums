import { useEffect } from 'react';
import { Section } from '../components/UI/Section';
import { CardClashProvider, useCardClash } from '../context/CardClashContext';
import { TutorialProvider, useTutorial } from '../context/TutorialContext';
import { FighterSelect } from '../components/CardClash/FighterSelect';
import { DeckBuilder } from '../components/CardClash/DeckBuilder';
import { GameBoard } from '../components/CardClash/GameBoard';
import { MatchResult } from '../components/CardClash/MatchResult';
import { TutorialManager } from '../components/CardClash/TutorialManager';
import { Button } from '../components/UI/Button';
import { HelpCircle } from 'lucide-react';

const CardClashContent = () => {
  const { gameState, selectFighter, setSelectedDeck, startMatch, quickStartMatch, restartGame, setDifficulty } = useCardClash();
  const { tutorialState, startTutorial, goToStep } = useTutorial();

  useEffect(() => {
    if (gameState.phase === 'fighter-select') {
      quickStartMatch();

      if (!tutorialState.hasCompletedBefore) {
        setTimeout(() => {
          goToStep('start-match');
        }, 500);
      }
    }
  }, []);

  return (
    <>
      <Section className="py-12">
        <div className="text-center mb-12 relative">
          <h1 className="text-[#00FF9C] text-5xl md:text-7xl font-black mb-4 uppercase tracking-tight">
            Card Clash
          </h1>
          <p className="text-[#9CA3AF] text-xl max-w-2xl mx-auto">
            Tactics over reflexes. Brains over brawls.
          </p>
          {tutorialState.hasCompletedBefore && !tutorialState.isActive && (
            <div className="absolute top-0 right-0">
              <Button
                onClick={startTutorial}
                accentColor="blue"
                className="px-4 py-2 text-sm"
              >
                <HelpCircle className="w-4 h-4" />
                Tutorial
              </Button>
            </div>
          )}
          {gameState.phase === 'match' && (
            <div className="flex justify-center gap-2 mt-6">
              {(['easy', 'normal', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-4 py-2 text-xs font-mono uppercase rounded border-2 transition-colors ${
                    gameState.difficulty === diff
                      ? 'bg-[#00FF9C] text-[#0B0D10] border-[#00FF9C]'
                      : 'bg-[#0B0D10] text-[#9CA3AF] border-[#374151] hover:border-[#00FF9C]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          )}
        </div>

        {gameState.phase === 'fighter-select' && (
          <FighterSelect onSelectFighter={selectFighter} />
        )}

        {gameState.phase === 'deck-builder' && (
          <DeckBuilder
            onStartMatch={(deck) => {
              setSelectedDeck(deck);
              startMatch();
            }}
          />
        )}

        {gameState.phase === 'match' && (
          <div className="max-w-6xl mx-auto">
            <GameBoard />
          </div>
        )}

        {gameState.phase === 'result' && gameState.matchResult && (
          <MatchResult result={gameState.matchResult} onRestart={restartGame} />
        )}
      </Section>

      <TutorialManager />
    </>
  );
};

export const CardClash = () => {
  return (
    <TutorialProvider>
      <CardClashProvider>
        <CardClashContent />
      </CardClashProvider>
    </TutorialProvider>
  );
};
