import { Candle } from '../utils/priceGenerator';

export type MarketPhase =
  | 'pre-market'
  | 'open'
  | 'expansion'
  | 'midday-chop'
  | 'trend-continuation'
  | 'reversal-window'
  | 'power-hour'
  | 'close';

export type TrendBias = 'up' | 'down' | 'flat';
export type TrendStrength = 'weak' | 'strong' | 'exhausted';
export type MomentumState = 'building' | 'peaking' | 'fading';
export type VolatilityRegime = 'compressed' | 'expanding' | 'extreme';
export type CrowdPsychology = 'fear' | 'greed' | 'complacency' | 'confusion';
export type LiquidityQuality = 'thin' | 'normal' | 'thick';

export type MarketActionType = 'hold' | 'risk' | 'double-down' | 'cash-out' | 'walk-away' | 'taunt-market';

export type RiskAmplifier = 1 | 10 | 50 | 250;

export type IndicatorLabel =
  | 'Bollinger Bands'
  | 'Moving Average'
  | 'RSI'
  | 'Volume'
  | 'Market Structure'
  | 'Liquidity'
  | 'Momentum'
  | 'Trend Exhaustion';

export interface MarketState {
  phase: MarketPhase;
  trendBias: TrendBias;
  trendStrength: TrendStrength;
  momentumState: MomentumState;
  volatilityRegime: VolatilityRegime;
  crowdPsychology: CrowdPsychology;
  liquidityQuality: LiquidityQuality;
}

export interface Position {
  entryPrice: number;
  size: number;
  leverage: RiskAmplifier;
  entryTime: number;
}

export interface EquityPoint {
  time: number;
  equity: number;
  drawdown: number;
}

export interface PlayerMarketState {
  kbumBalance: number;
  startingBalance: number;
  position: Position | null;
  unrealizedPnL: number;
  exposure: number;
  risk: number;
  volatility: number;
  maxDrawdown: number;
  emotionalStress: number;
  behavioralStreak: number;
  disciplineScore: number;
  impulsiveActions: number;
  timingQuality: number;
  messageLog: string[];
  isSessionActive: boolean;
  sessionEnded: boolean;
  riskAmplifier: RiskAmplifier;
  glowButton: MarketActionType | null;
  indicatorLabel: IndicatorLabel | null;
  equityCurve: EquityPoint[];
  currentPrice: number;
  priceData: Candle[];
  tradeCount: number;
}

export interface SessionReview {
  discipline: number;
  impulse: number;
  timing: number;
  exposureControl: number;
  emotionalPressure: number;
  riskAmplifierUsage: RiskAmplifier;
  equityCurve: EquityPoint[];
  finalBalance: number;
  maxDrawdown: number;
  totalTrades: number;
}
