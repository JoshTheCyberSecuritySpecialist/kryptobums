import { Scene, Enemy, GameItem, GameEvent, GameState } from '../types/alleyGame';

export const SCENES: Scene[] = [
  {
    id: 'alley',
    name: 'Dark Alley',
    description: 'Trash bags, broken dreams, and the smell of regret.',
  },
  {
    id: 'underpass',
    name: 'Underpass',
    description: 'Echo chamber of bad investment advice.',
  },
  {
    id: 'gas_station',
    name: 'Abandoned Gas Station',
    description: 'Pumps dried up like your portfolio.',
  },
  {
    id: 'crypto_atm',
    name: 'Closed Crypto ATM',
    description: 'The machine that ate everyone\'s rent money.',
  },
  {
    id: 'rooftop',
    name: 'The Rooftop',
    description: 'You made it. Somehow.',
    isRare: true,
  },
];

export const ENEMIES: Enemy[] = [
  {
    name: 'Rival KryptoBum',
    health: 30,
    maxHealth: 30,
    damage: 5,
    taunt: [
      'My bags are heavier than yours!',
      'Still holding? Pathetic.',
      'Paper hands detected.',
    ],
    defeatText: 'They crawl back to their cardboard chart.',
  },
  {
    name: 'Crypto Influencer',
    health: 25,
    maxHealth: 25,
    damage: 7,
    taunt: [
      '*posts screenshot* "Just made 10000x"',
      'Subscribe to my course.',
      'NFA but...',
    ],
    defeatText: 'Phone drops. Account suspended.',
  },
  {
    name: 'Parking Enforcement',
    health: 40,
    maxHealth: 40,
    damage: 10,
    taunt: [
      'That shopping cart needs a permit.',
      'You\'re in a loading zone.',
      'I\'m just doing my job.',
    ],
    defeatText: 'Waddles away to harass someone else.',
  },
  {
    name: 'IRS Shadow Figure',
    health: 50,
    maxHealth: 50,
    damage: 15,
    taunt: [
      'We know about 2017.',
      'Capital gains are inevitable.',
      'You can\'t hide forever.',
    ],
    defeatText: 'Dissolves into paperwork.',
  },
  {
    name: 'XRP Guy',
    health: 20,
    maxHealth: 20,
    damage: 3,
    taunt: [
      'THE LAWSUIT IS ALMOST OVER!',
      'XRP to $589 by Tuesday!',
      'ISO 20022 COMPLIANT!',
    ],
    defeatText: 'Runs away yelling about Ripple.',
  },
];

export const ITEMS: GameItem[] = [
  {
    id: 'half_charger',
    name: 'Half Phone Charger',
    description: 'The wrong half.',
    effect: 'useless',
  },
  {
    id: 'paper_wallet',
    name: 'Paper Wallet',
    description: 'Wrong seed phrase. Obviously.',
    effect: 'curse',
    statModifier: { luck: -5 },
  },
  {
    id: 'cart_wheel',
    name: 'Shopping Cart Wheel',
    description: 'The one that spins.',
    effect: 'useless',
  },
  {
    id: 'usb_stick',
    name: 'USB Stick',
    description: '"Billion Dollar Idea" written in sharpie.',
    effect: 'buff',
    statModifier: { luck: 10 },
  },
  {
    id: 'energy_drink',
    name: 'Expired Energy Drink',
    description: 'Best before: 2019',
    effect: 'buff',
    statModifier: { health: 10, rage: 5 },
  },
  {
    id: 'broken_phone',
    name: 'Cracked Phone',
    description: 'Still has Robinhood installed.',
    effect: 'curse',
    statModifier: { health: -5 },
  },
];

export const RANDOM_EVENTS: GameEvent[] = [
  {
    title: 'Market Flash Crash',
    description: 'Everything goes red for no reason.',
    outcome: 'You feel weak and confused.',
    effect: (state) => ({
      ...state,
      health: Math.max(1, state.health - 10),
      luck: Math.max(0, state.luck - 10),
      messageLog: [...state.messageLog, 'EVERYTHING\'S RED! AGAIN!'],
    }),
  },
  {
    title: 'Mystery Food',
    description: 'Found behind the dumpster. Still warm?',
    outcome: Math.random() > 0.5 ? 'Actually not bad!' : 'Immediate regret.',
    effect: (state) => {
      const isGood = Math.random() > 0.5;
      return {
        ...state,
        health: isGood
          ? Math.min(state.maxHealth, state.health + 15)
          : Math.max(1, state.health - 15),
        messageLog: [...state.messageLog, isGood ? 'Ate garbage. Feel better. Life is weird.' : 'Instant regret. INSTANT.'],
      };
    },
  },
  {
    title: 'Crackhead Bobby Appears',
    description: 'He wants to share his investment strategy.',
    outcome: '"Buy high, sell low. Trust me bro."',
    effect: (state) => ({
      ...state,
      luck: Math.random() > 0.3 ? state.luck - 15 : state.luck + 25,
      messageLog: [...state.messageLog, 'Bobby told me to buy high, sell low. Trust me bro.'],
    }),
  },
  {
    title: 'Surprise Rally',
    description: 'Something pumped. You don\'t know what.',
    outcome: 'Feeling optimistic!',
    effect: (state) => ({
      ...state,
      health: Math.min(state.maxHealth, state.health + 20),
      luck: state.luck + 15,
      messageLog: [...state.messageLog, 'Something pumped! I don\'t know what but I FEEL IT!'],
    }),
  },
  {
    title: 'Phone Notification',
    description: 'Portfolio update: -47%',
    outcome: 'Your spirit breaks a little more.',
    effect: (state) => ({
      ...state,
      rage: Math.min(100, state.rage + 20),
      messageLog: [...state.messageLog, 'The charts betrayed me. AGAIN.'],
    }),
  },
];

export const WIN_QUOTES = [
  'You climbed the ladder. Now what?',
  'The rooftop smells like freedom. And pigeons.',
  'Achievement Unlocked: Temporarily Not Broke',
  'The moon was actually a rooftop all along.',
  'You won the tutorial. The game is life.',
];

export const DEATH_MESSAGES = [
  'LIQUIDATED',
  'REKT',
  'PORTFOLIO: $0',
  'GG NO RE',
  'BAGS TOO HEAVY',
];
