import { MarketPhase, TrendBias, TrendStrength, MomentumState, VolatilityRegime, CrowdPsychology, LiquidityQuality, RiskAmplifier } from '../types/marketGame';

export const PHASE_SEQUENCE: MarketPhase[] = [
  'pre-market',
  'open',
  'expansion',
  'midday-chop',
  'trend-continuation',
  'reversal-window',
  'power-hour',
  'close',
];

export const PHASE_MODIFIERS = {
  'pre-market': {
    volatilityMult: 0.7,
    liquidityPenalty: 0.5,
    aiAggression: 0.3,
  },
  'open': {
    volatilityMult: 1.8,
    liquidityPenalty: 0.2,
    aiAggression: 0.6,
  },
  'expansion': {
    volatilityMult: 1.3,
    liquidityPenalty: 0,
    aiAggression: 0.5,
  },
  'midday-chop': {
    volatilityMult: 0.5,
    liquidityPenalty: 0.3,
    aiAggression: 0.8,
  },
  'trend-continuation': {
    volatilityMult: 1.1,
    liquidityPenalty: 0,
    aiAggression: 0.4,
  },
  'reversal-window': {
    volatilityMult: 1.5,
    liquidityPenalty: 0.4,
    aiAggression: 0.9,
  },
  'power-hour': {
    volatilityMult: 1.6,
    liquidityPenalty: 0.1,
    aiAggression: 0.7,
  },
  'close': {
    volatilityMult: 0.8,
    liquidityPenalty: 0.3,
    aiAggression: 0.5,
  },
};

export const NARRATOR_LINES = {
  sessionStart: [
    'Session open.',
    'Market awaits.',
    'Begin.',
    'Your move.',
  ],
  lowStress: [
    'Calm.',
    'Steady.',
    'Patience.',
    'Control.',
  ],
  moderateStress: [
    'Pressure builds.',
    'Focus slipping.',
    'Tension rising.',
    'Hold it together.',
  ],
  highStress: [
    'Breaking point.',
    'Losing control.',
    'Emotional.',
    'Compromised.',
  ],
  extremeStress: [
    'Unhinged.',
    'Reckless.',
    'Chaos.',
    'Destroyed.',
  ],
  goodTiming: [
    'Clean.',
    'Precise.',
    'Read correctly.',
    'Disciplined.',
  ],
  poorTiming: [
    'Late.',
    'Missed.',
    'Chasing.',
    'Impulse.',
  ],
  riskAmplifier: {
    'off': ['Safe mode.', 'Training wheels on.'],
    '10x': ['Leverage active.', 'Margin engaged.'],
    '50x': ['High risk.', 'Danger zone.'],
    '250x': ['Insanity.', 'Suicide.', 'Liquidation imminent.'],
  },
  hold: [
    'Waiting.',
    'Observing.',
    'Patience tested.',
  ],
  risk: [
    'Position opened.',
    'Exposure increased.',
    'Skin in the game.',
  ],
  doubleDown: [
    'All in.',
    'Maximum exposure.',
    'Point of no return.',
  ],
  cashOut: [
    'Position closed.',
    'Locked in.',
    'Reset.',
  ],
  walkAway: [
    'Session ended.',
    'Preserved capital.',
    'Discipline wins.',
  ],
  tauntMarket: [
    'Provoked.',
    'Market responds.',
    'Chaos invited.',
  ],
};

export const AMPLIFIER_LABELS: Record<RiskAmplifier, string> = {
  1: '1×',
  10: '10×',
  50: '50×',
  250: '250×',
};

export const getRandomState = <T,>(values: T[]): T => {
  return values[Math.floor(Math.random() * values.length)];
};

export const getRandomLine = (category: string[]): string => {
  return category[Math.floor(Math.random() * category.length)];
};
