export type CardType = 'attack' | 'defense' | 'ability' | 'chaos';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  value: number;
  description: string;
  onPlay: (gameState: any) => any;
}

export const CARD_POOL: Card[] = [
  {
    id: 'street-strike',
    name: 'Street Strike',
    type: 'attack',
    cost: 1,
    value: 5,
    description: 'Deal 5 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 5)
      }
    })
  },
  {
    id: 'heavy-blow',
    name: 'Heavy Blow',
    type: 'attack',
    cost: 2,
    value: 8,
    description: 'Deal 8 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 8)
      }
    })
  },
  {
    id: 'crackhead-combo',
    name: 'Crackhead Combo',
    type: 'attack',
    cost: 3,
    value: 12,
    description: 'Deal 12 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 12)
      }
    })
  },
  {
    id: 'trash-lid-slam',
    name: 'Trash Lid Slam',
    type: 'attack',
    cost: 2,
    value: 7,
    description: 'Deal 7 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 7)
      }
    })
  },
  {
    id: 'scrap-shield',
    name: 'Scrap Shield',
    type: 'defense',
    cost: 1,
    value: 4,
    description: 'Gain 4 block',
    onPlay: (gs) => ({
      ...gs,
      player: {
        ...gs.player,
        block: (gs.player.block || 0) + 4
      }
    })
  },
  {
    id: 'steel-defense',
    name: 'Steel Defense',
    type: 'defense',
    cost: 2,
    value: 7,
    description: 'Gain 7 block',
    onPlay: (gs) => ({
      ...gs,
      player: {
        ...gs.player,
        block: (gs.player.block || 0) + 7
      }
    })
  },
  {
    id: 'alley-dodge',
    name: 'Alley Dodge',
    type: 'defense',
    cost: 1,
    value: 3,
    description: 'Gain 3 block',
    onPlay: (gs) => ({
      ...gs,
      player: {
        ...gs.player,
        block: (gs.player.block || 0) + 3
      }
    })
  },
  {
    id: 'methhead-rage',
    name: 'Methhead Rage',
    type: 'ability',
    cost: 2,
    value: 0,
    description: 'Draw 2 cards',
    onPlay: (gs) => {
      const newCards = gs.player.deck.slice(0, 2);
      return {
        ...gs,
        player: {
          ...gs.player,
          hand: [...gs.player.hand, ...newCards],
          deck: gs.player.deck.slice(2)
        }
      };
    }
  },
  {
    id: 'crack-energy',
    name: 'Crack Energy',
    type: 'ability',
    cost: 0,
    value: 1,
    description: 'Gain 1 energy',
    onPlay: (gs) => ({
      ...gs,
      player: {
        ...gs.player,
        energy: gs.player.energy + 1
      }
    })
  },
  {
    id: 'bottle-smash',
    name: 'Bottle Smash',
    type: 'attack',
    cost: 1,
    value: 4,
    description: 'Deal 4 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 4)
      }
    })
  },
  {
    id: 'shopping-cart-ram',
    name: 'Shopping Cart Ram',
    type: 'attack',
    cost: 2,
    value: 9,
    description: 'Deal 9 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 9)
      }
    })
  },
  {
    id: 'dumpster-dive',
    name: 'Dumpster Dive',
    type: 'ability',
    cost: 1,
    value: 0,
    description: 'Draw 1 card',
    onPlay: (gs) => {
      const newCard = gs.player.deck[0];
      if (!newCard) return gs;
      return {
        ...gs,
        player: {
          ...gs.player,
          hand: [...gs.player.hand, newCard],
          deck: gs.player.deck.slice(1)
        }
      };
    }
  },
  {
    id: 'chaos-strike',
    name: 'Chaos Strike',
    type: 'chaos',
    cost: 2,
    value: 0,
    description: 'Deal 3-10 damage',
    onPlay: (gs) => {
      const damage = Math.floor(Math.random() * 8) + 3;
      return {
        ...gs,
        opponent: {
          ...gs.opponent,
          health: Math.max(0, gs.opponent.health - damage)
        }
      };
    }
  },
  {
    id: 'reinforced-block',
    name: 'Reinforced Block',
    type: 'defense',
    cost: 3,
    value: 10,
    description: 'Gain 10 block',
    onPlay: (gs) => ({
      ...gs,
      player: {
        ...gs.player,
        block: (gs.player.block || 0) + 10
      }
    })
  },
  {
    id: 'pipe-swing',
    name: 'Pipe Swing',
    type: 'attack',
    cost: 1,
    value: 6,
    description: 'Deal 6 damage',
    onPlay: (gs) => ({
      ...gs,
      opponent: {
        ...gs.opponent,
        health: Math.max(0, gs.opponent.health - 6)
      }
    })
  }
];

export const getStarterDeck = (fighterId?: string): Card[] => {
  const baseCards = [
    ...Array(5).fill(CARD_POOL.find(c => c.id === 'street-strike')!),
    ...Array(5).fill(CARD_POOL.find(c => c.id === 'scrap-shield')!),
    ...Array(3).fill(CARD_POOL.find(c => c.id === 'heavy-blow')!),
    ...Array(3).fill(CARD_POOL.find(c => c.id === 'alley-dodge')!),
    ...Array(2).fill(CARD_POOL.find(c => c.id === 'bottle-smash')!),
    ...Array(2).fill(CARD_POOL.find(c => c.id === 'dumpster-dive')!)
  ];

  return baseCards.map((card, idx) => ({
    ...card,
    id: `${card.id}-${idx}`
  }));
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
