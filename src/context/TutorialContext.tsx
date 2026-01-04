import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TutorialStep =
  | 'welcome'
  | 'fighter-select'
  | 'deck-builder'
  | 'start-match'
  | 'first-turn'
  | 'opponent-turn'
  | 'match-end'
  | 'complete'
  | 'inactive';

interface TutorialState {
  currentStep: TutorialStep;
  isActive: boolean;
  hasCompletedBefore: boolean;
}

interface TutorialContextType {
  tutorialState: TutorialState;
  startTutorial: () => void;
  skipTutorial: () => void;
  nextStep: () => void;
  goToStep: (step: TutorialStep) => void;
  completeTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

const TUTORIAL_STORAGE_KEY = 'kryptobums-card-clash-tutorial-completed';

const tutorialStepOrder: TutorialStep[] = [
  'welcome',
  'fighter-select',
  'deck-builder',
  'start-match',
  'first-turn',
  'opponent-turn',
  'match-end',
  'complete'
];

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [tutorialState, setTutorialState] = useState<TutorialState>(() => {
    const hasCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
    return {
      currentStep: hasCompleted ? 'inactive' : 'welcome',
      isActive: !hasCompleted,
      hasCompletedBefore: hasCompleted
    };
  });

  const startTutorial = () => {
    setTutorialState({
      currentStep: 'welcome',
      isActive: true,
      hasCompletedBefore: tutorialState.hasCompletedBefore
    });
  };

  const skipTutorial = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setTutorialState({
      currentStep: 'inactive',
      isActive: false,
      hasCompletedBefore: true
    });
  };

  const nextStep = () => {
    const currentIndex = tutorialStepOrder.indexOf(tutorialState.currentStep);
    if (currentIndex < tutorialStepOrder.length - 1) {
      setTutorialState(prev => ({
        ...prev,
        currentStep: tutorialStepOrder[currentIndex + 1]
      }));
    }
  };

  const goToStep = (step: TutorialStep) => {
    setTutorialState(prev => ({
      ...prev,
      currentStep: step
    }));
  };

  const completeTutorial = () => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setTutorialState({
      currentStep: 'inactive',
      isActive: false,
      hasCompletedBefore: true
    });
  };

  return (
    <TutorialContext.Provider
      value={{
        tutorialState,
        startTutorial,
        skipTutorial,
        nextStep,
        goToStep,
        completeTutorial
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within TutorialProvider');
  }
  return context;
};
