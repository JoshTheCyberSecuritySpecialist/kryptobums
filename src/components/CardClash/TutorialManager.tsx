import { useTutorial } from '../../context/TutorialContext';
import { useCardClash } from '../../context/CardClashContext';
import { TutorialDialogue } from './TutorialDialogue';
import { useEffect } from 'react';

export const TutorialManager = () => {
  const { tutorialState, nextStep, skipTutorial, goToStep, completeTutorial, startTutorial } = useTutorial();
  const { gameState } = useCardClash();

  useEffect(() => {
    if (!tutorialState.isActive) return;

    if (gameState.phase === 'fighter-select' && tutorialState.currentStep === 'welcome') {
      const timer = setTimeout(() => {
        goToStep('fighter-select');
      }, 100);
      return () => clearTimeout(timer);
    }

    if (gameState.phase === 'deck-builder' && tutorialState.currentStep === 'fighter-select') {
      goToStep('deck-builder');
    }

    if (gameState.phase === 'match' && tutorialState.currentStep === 'deck-builder') {
      goToStep('start-match');
    }

    if (gameState.phase === 'match' && gameState.turnNumber === 1 && gameState.currentTurn === 'player' && tutorialState.currentStep === 'start-match') {
      const timer = setTimeout(() => {
        goToStep('first-turn');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState.phase === 'match' && gameState.currentTurn === 'opponent' && tutorialState.currentStep === 'first-turn') {
      goToStep('opponent-turn');
    }

    if (gameState.phase === 'result' && (tutorialState.currentStep === 'opponent-turn' || tutorialState.currentStep === 'first-turn')) {
      goToStep('match-end');
    }
  }, [gameState.phase, gameState.turnNumber, gameState.currentTurn, tutorialState.currentStep, tutorialState.isActive, goToStep]);

  if (!tutorialState.isActive || tutorialState.currentStep === 'inactive') {
    return null;
  }

  const handleComplete = () => {
    completeTutorial();
  };

  switch (tutorialState.currentStep) {
    case 'welcome':
      return (
        <TutorialDialogue
          title="Welcome to Card Clash"
          message="Yo. Name's Bobby.
You don't look ready, but nobody ever is.
Let's get you through this without embarrassing yourself."
          explanation="This is Card Clash — turn-based card battles. Strategy over speed. Think before you act."
          onNext={nextStep}
          onSkip={skipTutorial}
          nextLabel="Let's go"
        />
      );

    case 'fighter-select':
      return (
        <TutorialDialogue
          title="Pick a Fighter"
          message="Pick who you roll with.
They fight different. Choose wrong and that's on you."
          explanation="Each fighter has their own style. Bobby (that's me), Bonnie, or Shaniqua. Doesn't matter much for now — just pick one."
          onNext={nextStep}
          onSkip={skipTutorial}
          nextLabel="Got it"
        />
      );

    case 'deck-builder':
      return (
        <TutorialDialogue
          title="Build Your Deck"
          message="Cards win fights.
Too many trash cards? You lose.
Pick smart."
          explanation="You need exactly 20 cards. Attack cards deal damage. Defense cards block it. Ability cards do other stuff. Mix 'em up."
          onNext={nextStep}
          onSkip={skipTutorial}
          nextLabel="Understood"
        />
      );

    case 'start-match':
      return (
        <TutorialDialogue
          title="Match Started"
          message="Once you step in, there's no rewind.
Health hits zero, it's over."
          explanation="See those bars? That's health. Yours and theirs. Energy lets you play cards. No energy? No moves."
          onNext={nextStep}
          onSkip={skipTutorial}
          nextLabel="Ready"
        />
      );

    case 'first-turn':
      return (
        <TutorialDialogue
          title="Your Turn"
          message="Your turn. Play cards.
Costs energy. No energy? No magic."
          explanation="Click a card to play it. Green glow means you can afford it. When you're done, hit End Turn."
          onSkip={skipTutorial}
          showNext={false}
        />
      );

    case 'opponent-turn':
      return (
        <TutorialDialogue
          title="Opponent's Turn"
          message="Now watch close.
They ain't smart, but they ain't stupid either."
          explanation="They'll play a card, then pass the turn back. Block reduces damage. Attack breaks through block."
          onSkip={skipTutorial}
          showNext={false}
        />
      );

    case 'match-end':
      return (
        <TutorialDialogue
          title="Match Over"
          message="That's it.
You win, you learn.
You lose, you learn faster."
          explanation="Health hit zero? Someone won. Simple as that. You can restart and try again."
          onNext={() => goToStep('complete')}
          onSkip={skipTutorial}
          nextLabel="Finish"
        />
      );

    case 'complete':
      return (
        <TutorialDialogue
          title="Tutorial Complete"
          message="You made it.
Now stop listening to me and start thinking."
          explanation="You know the basics. Rest is on you. Good luck out there."
          onNext={handleComplete}
          onReplay={startTutorial}
          showSkip={false}
          showReplay={true}
          nextLabel="Jump Back In"
        />
      );

    default:
      return null;
  }
};
