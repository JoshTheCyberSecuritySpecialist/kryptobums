export interface GameState {
  health: number;
  maxHealth: number;
  rage: number;
  luck: number;
  xp: number;
  inventory: GameItem[];
  currentScene: Scene;
  messageLog: string[];
  isAlive: boolean;
  hasWon: boolean;
  enemyHealth?: number;
  enemyMaxHealth?: number;
  currentEnemy?: Enemy;
  rageMode: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  description: string;
  effect?: 'buff' | 'curse' | 'useless';
  statModifier?: {
    health?: number;
    rage?: number;
    luck?: number;
  };
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  isRare?: boolean;
}

export interface Enemy {
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  taunt: string[];
  defeatText: string;
}

export interface GameEvent {
  title: string;
  description: string;
  outcome: string;
  effect: (state: GameState) => GameState;
}

export type ActionType = 'fight' | 'talk' | 'stupid';
