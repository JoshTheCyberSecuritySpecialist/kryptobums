import { useState, useCallback } from 'react';
import { GameState, ActionType, GameItem } from '../types/alleyGame';
import { SCENES, ENEMIES, ITEMS, RANDOM_EVENTS, WIN_QUOTES, DEATH_MESSAGES } from '../data/alleyGameData';
import { BUM_DIALOGUE, getContextualDialogue } from '../data/bumDialogue';

const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomScene = () => {
  const roll = Math.random();
  if (roll > 0.95) {
    return SCENES.find(s => s.id === 'rooftop')!;
  }
  return getRandomElement(SCENES.filter(s => !s.isRare));
};

const getRandomEnemy = () => {
  const enemy = getRandomElement(ENEMIES);
  return { ...enemy };
};

const initialState: GameState = {
  health: 100,
  maxHealth: 100,
  rage: 0,
  luck: 50,
  xp: 0,
  inventory: [],
  currentScene: getRandomScene(),
  messageLog: [BUM_DIALOGUE.spawnLines[Math.floor(Math.random() * BUM_DIALOGUE.spawnLines.length)]],
  isAlive: true,
  hasWon: false,
  rageMode: false,
};

export const useAlleyGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const addMessage = useCallback((message: string) => {
    setGameState(prev => ({
      ...prev,
      messageLog: [...prev.messageLog.slice(-9), message],
    }));
  }, []);

  const takeDamage = useCallback((amount: number) => {
    setGameState(prev => {
      const newHealth = Math.max(0, prev.health - amount);
      const newRage = Math.min(100, prev.rage + amount);
      const isAlive = newHealth > 0;

      return {
        ...prev,
        health: newHealth,
        rage: newRage,
        isAlive,
        rageMode: newRage >= 80,
      };
    });
  }, []);

  const heal = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount),
    }));
  }, []);

  const addItem = useCallback((item: GameItem) => {
    setGameState(prev => {
      const newState = { ...prev, inventory: [...prev.inventory, item] };

      if (item.statModifier) {
        if (item.statModifier.health) {
          newState.health = Math.min(
            newState.maxHealth,
            Math.max(1, newState.health + item.statModifier.health)
          );
        }
        if (item.statModifier.rage) {
          newState.rage = Math.max(0, Math.min(100, newState.rage + item.statModifier.rage));
        }
        if (item.statModifier.luck) {
          newState.luck = Math.max(0, newState.luck + item.statModifier.luck);
        }
      }

      return newState;
    });
  }, []);

  const spawnEnemy = useCallback(() => {
    const enemy = getRandomEnemy();
    setGameState(prev => ({
      ...prev,
      currentEnemy: enemy,
      enemyHealth: enemy.health,
      enemyMaxHealth: enemy.maxHealth,
    }));
    addMessage(`${enemy.name} appears!`);
    setTimeout(() => {
      const taunts = BUM_DIALOGUE.enemyTaunts[enemy.name as keyof typeof BUM_DIALOGUE.enemyTaunts] || enemy.taunt;
      addMessage(getRandomElement(taunts));
    }, 800);
  }, [addMessage]);

  const triggerRandomEvent = useCallback(() => {
    const shouldTrigger = Math.random() > 0.6;
    if (!shouldTrigger) return false;

    const event = getRandomElement(RANDOM_EVENTS);
    addMessage(`⚡ ${event.title}`);
    setTimeout(() => {
      addMessage(event.description);
    }, 500);
    setTimeout(() => {
      addMessage(event.outcome);
      setGameState(prev => event.effect(prev));
    }, 1500);

    return true;
  }, [addMessage]);

  const findRandomItem = useCallback((state: GameState) => {
    const shouldFind = Math.random() > 0.7;
    if (!shouldFind) return false;

    const item = getRandomElement(ITEMS);
    addMessage(getContextualDialogue('itemFoundLines', state));
    setTimeout(() => {
      addMessage(`${item.name} - ${item.description}`);
      addItem(item);
    }, 500);

    return true;
  }, [addMessage, addItem]);

  const attack = useCallback(() => {
    if (!gameState.currentEnemy || !gameState.enemyHealth) return;

    const luckModifier = gameState.luck / 100;
    const hitChance = 0.7 + (luckModifier * 0.2);
    const rageBonus = gameState.rageMode ? 10 : 0;

    if (Math.random() < hitChance) {
      const damage = 15 + rageBonus + Math.floor(Math.random() * 10);
      const newEnemyHealth = Math.max(0, gameState.enemyHealth - damage);

      const hitDialogue = rageBonus > 0
        ? getContextualDialogue('attackResults', gameState, 'critical')
        : getContextualDialogue('attackResults', gameState, 'hit');

      setGameState(prev => ({
        ...prev,
        enemyHealth: newEnemyHealth,
        rage: Math.max(0, prev.rage - 5),
      }));

      addMessage(hitDialogue);

      if (newEnemyHealth <= 0) {
        setTimeout(() => {
          addMessage(gameState.currentEnemy!.defeatText);
          addMessage(getContextualDialogue('victoryLines', gameState));
          setGameState(prev => ({
            ...prev,
            xp: prev.xp + 50,
            currentEnemy: undefined,
            enemyHealth: undefined,
            enemyMaxHealth: undefined,
            rageMode: false,
          }));
        }, 800);
      } else {
        setTimeout(() => {
          const enemyDamage = gameState.currentEnemy!.damage;
          takeDamage(enemyDamage);
          addMessage(getContextualDialogue('damageTakenLines', gameState));
        }, 1000);
      }
    } else {
      addMessage(getContextualDialogue('missResults', gameState));
      setTimeout(() => {
        const enemyDamage = gameState.currentEnemy!.damage;
        takeDamage(enemyDamage);
        addMessage(getContextualDialogue('damageTakenLines', gameState));
      }, 800);
    }
  }, [gameState, addMessage, takeDamage]);

  const handleAction = useCallback((action: ActionType) => {
    if (gameState.currentEnemy) {
      if (action === 'fight') {
        attack();
      } else if (action === 'talk') {
        const talkSuccess = Math.random() < (gameState.luck / 150);
        if (talkSuccess) {
          addMessage(getContextualDialogue('talkResults', gameState, 'success'));
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              currentEnemy: undefined,
              enemyHealth: undefined,
              enemyMaxHealth: undefined,
              xp: prev.xp + 25,
            }));
          }, 1000);
        } else {
          addMessage(getContextualDialogue('talkResults', gameState, 'failure'));
          setTimeout(() => {
            const damage = gameState.currentEnemy!.damage;
            takeDamage(damage);
            addMessage(getContextualDialogue('damageTakenLines', gameState));
          }, 800);
        }
      } else {
        const roll = Math.random();
        const luckBonus = gameState.luck / 200;
        const successChance = 0.3 + luckBonus;

        if (roll < successChance) {
          addMessage(getContextualDialogue('stupidActionResults', gameState, 'success'));
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              currentEnemy: undefined,
              enemyHealth: undefined,
              enemyMaxHealth: undefined,
              xp: prev.xp + 100,
            }));
          }, 1000);
        } else {
          addMessage(getContextualDialogue('stupidActionResults', gameState, 'failure'));
          setTimeout(() => {
            const damage = gameState.currentEnemy!.damage * 2;
            takeDamage(damage);
          }, 1000);
        }
      }
    } else {
      const eventTriggered = triggerRandomEvent();
      if (!eventTriggered) {
        const itemFound = findRandomItem(gameState);
        if (!itemFound) {
          spawnEnemy();
        }
      }
    }
  }, [gameState, attack, addMessage, takeDamage, triggerRandomEvent, findRandomItem, spawnEnemy]);

  const nextScene = useCallback(() => {
    const newScene = getRandomScene();

    if (newScene.isRare) {
      setGameState(prev => ({
        ...prev,
        currentScene: newScene,
        hasWon: true,
        currentEnemy: undefined,
        enemyHealth: undefined,
        enemyMaxHealth: undefined,
      }));
      addMessage(getRandomElement(BUM_DIALOGUE.winQuotes));
    } else {
      setGameState(prev => ({
        ...prev,
        currentScene: newScene,
        currentEnemy: undefined,
        enemyHealth: undefined,
        enemyMaxHealth: undefined,
      }));
      addMessage(`Moved to: ${newScene.name}...`);

      setTimeout(() => {
        const roll = Math.random();
        if (roll > 0.5) {
          spawnEnemy();
        }
      }, 1500);
    }
  }, [addMessage, spawnEnemy]);

  const restart = useCallback(() => {
    const newScene = getRandomScene();
    setGameState({
      ...initialState,
      currentScene: newScene,
      messageLog: [BUM_DIALOGUE.spawnLines[Math.floor(Math.random() * BUM_DIALOGUE.spawnLines.length)]],
    });
  }, []);

  const handleBumInteraction = useCallback(() => {
    const reactions = BUM_DIALOGUE.bumMutters;
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    addMessage(reaction);

    const roll = Math.random();
    if (roll < 0.3) {
      setGameState(prev => ({
        ...prev,
        rage: Math.min(100, prev.rage + 10),
      }));
    } else if (roll < 0.5) {
      setGameState(prev => ({
        ...prev,
        luck: prev.luck + 5,
      }));
    } else if (roll < 0.6) {
      const secretEvents = [
        'You feel... different.',
        'Reality glitches for a moment.',
        'The bum stares into your soul.',
        'Time stops. Then continues.',
      ];
      addMessage(secretEvents[Math.floor(Math.random() * secretEvents.length)]);
      setGameState(prev => ({
        ...prev,
        health: Math.min(prev.maxHealth, prev.health + 5),
      }));
    }
  }, [addMessage]);

  return {
    gameState,
    actions: {
      handleAction,
      nextScene,
      restart,
      addMessage,
      handleBumInteraction,
    },
  };
};
