import { createContext, useContext, useState, ReactNode } from 'react';
import { Card, shuffleDeck, getStarterDeck } from '../data/cards';
import { Character } from '../data/characters';
import { PlayerProfile, AIDecision, Difficulty } from '../types/ai';
import { getAIOpponentDecision } from '../services/openai';

export type GamePhase = 'fighter-select' | 'deck-builder' | 'match' | 'result';
export type TurnPhase = 'draw' | 'action' | 'end';
export type CurrentTurn = 'player' | 'opponent';

interface PlayerState {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  block: number;
  hand: Card[];
  deck: Card[];
  discard: Card[];
  fighter: Character | null;
}

interface OpponentState {
  health: number;
  maxHealth: number;
  block: number;
  hand: Card[];
  deck: Card[];
  discard: Card[];
}

interface GameState {
  phase: GamePhase;
  currentTurn: CurrentTurn;
  turnNumber: number;
  turnPhase: TurnPhase;
  player: PlayerState;
  opponent: OpponentState;
  selectedDeck: Card[];
  matchResult: 'win' | 'loss' | null;
  playerProfile: PlayerProfile;
  lastAIDecision: AIDecision | null;
  difficulty: Difficulty;
  debugMode: boolean;
}

interface CardClashContextType {
  gameState: GameState;
  selectFighter: (fighter: Character) => void;
  setSelectedDeck: (deck: Card[]) => void;
  startMatch: () => void;
  quickStartMatch: () => void;
  playCard: (cardIndex: number) => void;
  endTurn: () => void;
  restartGame: () => void;
  toggleDebugMode: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

const CardClashContext = createContext<CardClashContextType | undefined>(undefined);

const initialPlayerProfile: PlayerProfile = {
  recentActions: [],
  hitAccuracy: 0,
  dodgesUsed: 0,
  itemsUsed: [],
  idleTimeMs: 0
};

const initialGameState: GameState = {
  phase: 'fighter-select',
  currentTurn: 'player',
  turnNumber: 1,
  turnPhase: 'draw',
  player: {
    health: 30,
    maxHealth: 30,
    energy: 3,
    maxEnergy: 3,
    block: 0,
    hand: [],
    deck: [],
    discard: [],
    fighter: null
  },
  opponent: {
    health: 30,
    maxHealth: 30,
    block: 0,
    hand: [],
    deck: [],
    discard: []
  },
  selectedDeck: [],
  matchResult: null,
  playerProfile: initialPlayerProfile,
  lastAIDecision: null,
  difficulty: 'normal',
  debugMode: false
};

export const CardClashProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const selectFighter = (fighter: Character) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        fighter
      },
      phase: 'deck-builder'
    }));
  };

  const setSelectedDeck = (deck: Card[]) => {
    setGameState(prev => ({
      ...prev,
      selectedDeck: deck
    }));
  };

  const startMatch = () => {
    const playerDeck = shuffleDeck([...gameState.selectedDeck]);
    const opponentDeck = shuffleDeck(getStarterDeck());

    const playerHand = playerDeck.slice(0, 5);
    const opponentHand = opponentDeck.slice(0, 5);

    setGameState(prev => ({
      ...prev,
      phase: 'match',
      currentTurn: 'player',
      turnNumber: 1,
      turnPhase: 'action',
      player: {
        ...prev.player,
        health: 30,
        energy: 3,
        block: 0,
        hand: playerHand,
        deck: playerDeck.slice(5),
        discard: []
      },
      opponent: {
        health: 30,
        maxHealth: 30,
        block: 0,
        hand: opponentHand,
        deck: opponentDeck.slice(5),
        discard: []
      },
      matchResult: null
    }));
  };

  const quickStartMatch = () => {
    const starterDeck = getStarterDeck();
    const playerDeck = shuffleDeck([...starterDeck]);
    const opponentDeck = shuffleDeck(getStarterDeck());

    const playerHand = playerDeck.slice(0, 5);
    const opponentHand = opponentDeck.slice(0, 5);

    setGameState({
      phase: 'match',
      currentTurn: 'player',
      turnNumber: 1,
      turnPhase: 'action',
      player: {
        health: 30,
        maxHealth: 30,
        energy: 3,
        maxEnergy: 3,
        block: 0,
        hand: playerHand,
        deck: playerDeck.slice(5),
        discard: [],
        fighter: null
      },
      opponent: {
        health: 30,
        maxHealth: 30,
        block: 0,
        hand: opponentHand,
        deck: opponentDeck.slice(5),
        discard: []
      },
      selectedDeck: starterDeck,
      matchResult: null
    });
  };

  const drawCard = (state: GameState, forPlayer: boolean): GameState => {
    const target = forPlayer ? 'player' : 'opponent';
    const entity = state[target];

    if (entity.deck.length === 0) {
      if (entity.discard.length === 0) return state;
      const newDeck = shuffleDeck([...entity.discard]);
      return {
        ...state,
        [target]: {
          ...entity,
          deck: newDeck.slice(1),
          hand: [...entity.hand, newDeck[0]],
          discard: []
        }
      };
    }

    return {
      ...state,
      [target]: {
        ...entity,
        hand: [...entity.hand, entity.deck[0]],
        deck: entity.deck.slice(1)
      }
    };
  };

  const updatePlayerProfile = (state: GameState, action: string, didHit: boolean = false) => {
    const profile = state.playerProfile;
    const recentActions = [...profile.recentActions, action].slice(-10);

    let hitAccuracy = profile.hitAccuracy;
    if (action.includes('attack')) {
      const totalAttacks = profile.recentActions.filter(a => a.includes('attack')).length + 1;
      const successfulHits = didHit ?
        (profile.hitAccuracy * (totalAttacks - 1) + 1) :
        (profile.hitAccuracy * (totalAttacks - 1));
      hitAccuracy = successfulHits / totalAttacks;
    }

    return {
      ...profile,
      recentActions,
      hitAccuracy
    };
  };

  const playCard = (cardIndex: number) => {
    if (gameState.currentTurn !== 'player') return;
    if (gameState.turnPhase !== 'action') return;

    const card = gameState.player.hand[cardIndex];
    if (!card) return;
    if (card.cost > gameState.player.energy) return;

    let newState = card.onPlay(gameState);

    const actionName = card.type === 'attack' ?
      (card.cost >= 3 ? 'heavy_attack' : 'light_attack') :
      card.type === 'defense' ? 'block' : 'ability';

    const didHit = card.type === 'attack' && newState.opponent.health < gameState.opponent.health;

    newState = {
      ...newState,
      player: {
        ...newState.player,
        energy: newState.player.energy - card.cost,
        hand: newState.player.hand.filter((_, i) => i !== cardIndex),
        discard: [...newState.player.discard, card]
      },
      playerProfile: updatePlayerProfile(newState, actionName, didHit)
    };

    if (newState.opponent.health <= 0) {
      newState.phase = 'result';
      newState.matchResult = 'win';
    }

    setGameState(newState);
  };

  const opponentTurn = async (state: GameState): Promise<GameState> => {
    let currentState = { ...state };

    currentState = drawCard(currentState, false);

    currentState = {
      ...currentState,
      opponent: {
        ...currentState.opponent,
        block: 0
      }
    };

    let aiDecision: AIDecision | null = null;

    try {
      aiDecision = await getAIOpponentDecision(
        currentState.playerProfile,
        currentState.opponent.health,
        currentState.difficulty
      );
      currentState.lastAIDecision = aiDecision;
    } catch (error) {
      console.error('AI decision failed:', error);
    }

    const decision = aiDecision?.decision || 'light_attack';

    const playableCards = currentState.opponent.hand
      .map((card, index) => ({ card, index }))
      .filter(({ card }) => card.cost <= 3);

    let selectedCard = null;

    switch (decision) {
      case 'light_attack':
        selectedCard = playableCards.find(({ card }) =>
          card.type === 'attack' && card.cost <= 2
        );
        break;
      case 'heavy_attack':
        selectedCard = playableCards.find(({ card }) =>
          card.type === 'attack' && card.cost >= 3
        ) || playableCards.find(({ card }) => card.type === 'attack');
        break;
      case 'block':
      case 'counter':
        selectedCard = playableCards.find(({ card }) =>
          card.type === 'defense'
        );
        break;
      case 'dodge':
      case 'wait':
        break;
    }

    if (!selectedCard && decision !== 'dodge' && decision !== 'wait') {
      selectedCard = playableCards[Math.floor(Math.random() * playableCards.length)];
    }

    if (selectedCard) {
      if (selectedCard.card.type === 'attack') {
        const damage = Math.max(0, selectedCard.card.value - currentState.player.block);
        currentState = {
          ...currentState,
          player: {
            ...currentState.player,
            health: Math.max(0, currentState.player.health - damage),
            block: Math.max(0, currentState.player.block - selectedCard.card.value)
          },
          opponent: {
            ...currentState.opponent,
            hand: currentState.opponent.hand.filter((_, i) => i !== selectedCard.index),
            discard: [...currentState.opponent.discard, selectedCard.card]
          }
        };
      } else if (selectedCard.card.type === 'defense') {
        currentState = {
          ...currentState,
          opponent: {
            ...currentState.opponent,
            block: currentState.opponent.block + selectedCard.card.value,
            hand: currentState.opponent.hand.filter((_, i) => i !== selectedCard.index),
            discard: [...currentState.opponent.discard, selectedCard.card]
          }
        };
      }
    }

    if (currentState.player.health <= 0) {
      currentState.phase = 'result';
      currentState.matchResult = 'loss';
    }

    return {
      ...currentState,
      currentTurn: 'player',
      turnNumber: currentState.turnNumber + 1,
      turnPhase: 'draw'
    };
  };

  const endTurn = () => {
    if (gameState.currentTurn !== 'player') return;

    let newState = { ...gameState };

    if (gameState.currentTurn === 'player') {
      newState = drawCard(newState, true);

      newState = {
        ...newState,
        player: {
          ...newState.player,
          energy: newState.player.maxEnergy,
          block: 0
        },
        currentTurn: 'opponent',
        turnPhase: 'action'
      };

      setGameState(newState);

      setTimeout(async () => {
        const updatedState = await opponentTurn(newState);
        setGameState(updatedState);
      }, 1500);
    }
  };

  const restartGame = () => {
    setGameState({
      ...initialGameState,
      phase: 'fighter-select',
      difficulty: gameState.difficulty,
      debugMode: gameState.debugMode
    });
  };

  const toggleDebugMode = () => {
    setGameState(prev => ({
      ...prev,
      debugMode: !prev.debugMode
    }));
  };

  const setDifficulty = (difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty
    }));
  };

  return (
    <CardClashContext.Provider
      value={{
        gameState,
        selectFighter,
        setSelectedDeck,
        startMatch,
        quickStartMatch,
        playCard,
        endTurn,
        restartGame,
        toggleDebugMode,
        setDifficulty
      }}
    >
      {children}
    </CardClashContext.Provider>
  );
};

export const useCardClash = () => {
  const context = useContext(CardClashContext);
  if (!context) {
    throw new Error('useCardClash must be used within CardClashProvider');
  }
  return context;
};
