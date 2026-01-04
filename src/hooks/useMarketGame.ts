import { useState, useCallback, useEffect, useRef } from 'react';
import {
  PlayerMarketState,
  MarketState,
  MarketActionType,
  RiskAmplifier,
  SessionReview,
  IndicatorLabel,
  EquityPoint,
} from '../types/marketGame';
import {
  PHASE_SEQUENCE,
  PHASE_MODIFIERS,
  NARRATOR_LINES,
  getRandomState,
  getRandomLine,
} from '../data/marketGameData';
import { generateRealisticSession, addFakeBreakout, addVolatilitySpike } from '../utils/priceGenerator';
import { calculateIndicators, detectBollingerSqueeze, detectRSIExtreme, detectVolumeSpike } from '../utils/indicators';

const getInitialMarketState = (): MarketState => ({
  phase: 'pre-market',
  trendBias: getRandomState(['up', 'down', 'flat']),
  trendStrength: getRandomState(['weak', 'strong', 'exhausted']),
  momentumState: getRandomState(['building', 'peaking', 'fading']),
  volatilityRegime: getRandomState(['compressed', 'expanding', 'extreme']),
  crowdPsychology: getRandomState(['fear', 'greed', 'complacency', 'confusion']),
  liquidityQuality: getRandomState(['thin', 'normal', 'thick']),
});

const getInitialPlayerState = (): PlayerMarketState => {
  const initialCandles = generateRealisticSession('pre-market');
  return {
    kbumBalance: 10000,
    startingBalance: 10000,
    position: null,
    unrealizedPnL: 0,
    exposure: 0,
    risk: 0,
    volatility: 30,
    maxDrawdown: 0,
    emotionalStress: 0,
    behavioralStreak: 0,
    disciplineScore: 50,
    impulsiveActions: 0,
    timingQuality: 50,
    messageLog: [getRandomLine(NARRATOR_LINES.sessionStart)],
    isSessionActive: true,
    sessionEnded: false,
    riskAmplifier: 1,
    glowButton: null,
    indicatorLabel: null,
    equityCurve: [{ time: Date.now(), equity: 10000, drawdown: 0 }],
    currentPrice: initialCandles[initialCandles.length - 1].close,
    priceData: initialCandles,
    tradeCount: 0,
  };
};

export const useMarketGame = () => {
  const [marketState, setMarketState] = useState<MarketState>(getInitialMarketState());
  const [playerState, setPlayerState] = useState<PlayerMarketState>(getInitialPlayerState());
  const [sessionReview, setSessionReview] = useState<SessionReview | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const priceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const glowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const labelTimerRef = useRef<NodeJS.Timeout | null>(null);

  const addMessage = useCallback((message: string) => {
    setPlayerState(prev => ({
      ...prev,
      messageLog: [...prev.messageLog.slice(-9), message],
    }));
  }, []);

  const showIndicatorLabel = useCallback((label: IndicatorLabel) => {
    setPlayerState(prev => ({ ...prev, indicatorLabel: label }));

    if (labelTimerRef.current) clearTimeout(labelTimerRef.current);
    labelTimerRef.current = setTimeout(() => {
      setPlayerState(prev => ({ ...prev, indicatorLabel: null }));
    }, 1000);
  }, []);

  const triggerGlow = useCallback((button: MarketActionType | null, amplifier: RiskAmplifier) => {
    if (amplifier === 250) return;

    const glowChance = amplifier === 1 ? 0.3 : amplifier === 10 ? 0.2 : 0.1;
    if (Math.random() > glowChance) return;

    setPlayerState(prev => ({ ...prev, glowButton: button }));

    if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    glowTimerRef.current = setTimeout(() => {
      setPlayerState(prev => ({ ...prev, glowButton: null }));
    }, 600);
  }, []);

  const updateEquityCurve = useCallback((balance: number, peak: number) => {
    const drawdown = ((peak - balance) / peak) * 100;
    const point: EquityPoint = {
      time: Date.now(),
      equity: balance,
      drawdown,
    };

    setPlayerState(prev => ({
      ...prev,
      equityCurve: [...prev.equityCurve, point],
      maxDrawdown: Math.max(prev.maxDrawdown, drawdown),
    }));
  }, []);

  const advancePrice = useCallback(() => {
    setPlayerState(prev => {
      if (!prev.isSessionActive || prev.sessionEnded) return prev;

      const volatilityMult = PHASE_MODIFIERS[marketState.phase].volatilityMult;
      const baseChange = (Math.random() - 0.5) * 0.5 * volatilityMult;
      const trendBias = marketState.trendBias === 'up' ? 0.1 : marketState.trendBias === 'down' ? -0.1 : 0;

      const newPrice = prev.currentPrice + prev.currentPrice * (baseChange + trendBias) * 0.01;

      let unrealizedPnL = 0;
      let exposure = 0;

      if (prev.position) {
        const priceDiff = newPrice - prev.position.entryPrice;
        const pnlPercent = (priceDiff / prev.position.entryPrice) * 100;
        unrealizedPnL = (prev.position.size * pnlPercent * prev.position.leverage) / 100;
        exposure = Math.abs((prev.position.size / prev.kbumBalance) * 100);
      }

      return {
        ...prev,
        currentPrice: newPrice,
        unrealizedPnL,
        exposure,
      };
    });
  }, [marketState.phase, marketState.trendBias]);

  useEffect(() => {
    if (!playerState.isSessionActive || playerState.sessionEnded) {
      if (priceTimerRef.current) clearInterval(priceTimerRef.current);
      return;
    }

    priceTimerRef.current = setInterval(() => {
      advancePrice();
    }, 500);

    return () => {
      if (priceTimerRef.current) clearInterval(priceTimerRef.current);
    };
  }, [playerState.isSessionActive, playerState.sessionEnded, advancePrice]);

  const evolveMarket = useCallback(() => {
    setMarketState(prev => {
      const changes: Partial<MarketState> = {};

      if (Math.random() > 0.7) {
        changes.trendBias = getRandomState(['up', 'down', 'flat']);
      }
      if (Math.random() > 0.6) {
        changes.trendStrength = getRandomState(['weak', 'strong', 'exhausted']);
      }
      if (Math.random() > 0.5) {
        changes.momentumState = getRandomState(['building', 'peaking', 'fading']);
      }
      if (Math.random() > 0.6) {
        changes.volatilityRegime = getRandomState(['compressed', 'expanding', 'extreme']);
      }
      if (Math.random() > 0.7) {
        changes.crowdPsychology = getRandomState(['fear', 'greed', 'complacency', 'confusion']);
      }
      if (Math.random() > 0.6) {
        changes.liquidityQuality = getRandomState(['thin', 'normal', 'thick']);
      }

      return { ...prev, ...changes };
    });
  }, []);

  const advancePhase = useCallback(() => {
    setMarketState(prev => {
      const currentIndex = PHASE_SEQUENCE.indexOf(prev.phase);
      const nextIndex = (currentIndex + 1) % PHASE_SEQUENCE.length;
      const nextPhase = PHASE_SEQUENCE[nextIndex];

      let newCandles = generateRealisticSession(nextPhase);

      if (Math.random() > 0.7) {
        newCandles = addFakeBreakout(newCandles);
      }
      if (Math.random() > 0.8) {
        newCandles = addVolatilitySpike(newCandles);
      }

      setPlayerState(p => ({
        ...p,
        priceData: newCandles,
        currentPrice: newCandles[newCandles.length - 1].close,
      }));

      if (nextPhase === 'close') {
        setPlayerState(p => ({ ...p, isSessionActive: false }));
      }

      return { ...prev, phase: nextPhase };
    });
    evolveMarket();
  }, [evolveMarket]);

  useEffect(() => {
    if (!playerState.isSessionActive || playerState.sessionEnded) {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      return;
    }

    phaseTimerRef.current = setTimeout(() => {
      advancePhase();
    }, 15000);

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [marketState.phase, playerState.isSessionActive, playerState.sessionEnded, advancePhase]);

  const executeAction = useCallback((action: MarketActionType) => {
    if (!playerState.isSessionActive || playerState.sessionEnded) return;

    setPlayerState(prev => {
      const indicators = calculateIndicators(prev.priceData);
      let newState = { ...prev };
      let outcomeMessage = '';
      let indicatorUsed: IndicatorLabel | null = null;

      switch (action) {
        case 'hold':
          outcomeMessage = getRandomLine(NARRATOR_LINES.hold);
          newState.emotionalStress = Math.max(0, newState.emotionalStress - 3);
          newState.disciplineScore = Math.min(100, newState.disciplineScore + 2);
          break;

        case 'risk':
          if (newState.position) {
            outcomeMessage = 'Already in position.';
            break;
          }

          outcomeMessage = getRandomLine(NARRATOR_LINES.risk);
          const riskSize = 1000 * newState.riskAmplifier;
          newState.position = {
            entryPrice: newState.currentPrice,
            size: riskSize,
            leverage: newState.riskAmplifier,
            entryTime: Date.now(),
          };
          newState.tradeCount += 1;
          newState.emotionalStress = Math.min(100, newState.emotionalStress + 5 * newState.riskAmplifier);

          if (marketState.trendStrength === 'exhausted') {
            indicatorUsed = 'Trend Exhaustion';
            outcomeMessage = 'Late entry.';
          } else if (detectBollingerSqueeze(indicators.bb)) {
            indicatorUsed = 'Bollinger Bands';
            outcomeMessage = 'Squeeze detected.';
          }

          break;

        case 'double-down':
          if (!newState.position) {
            outcomeMessage = 'No position to add to.';
            break;
          }

          outcomeMessage = getRandomLine(NARRATOR_LINES.doubleDown);
          newState.position.size += 1000 * newState.riskAmplifier;
          newState.emotionalStress = Math.min(100, newState.emotionalStress + 15 * newState.riskAmplifier);
          newState.impulsiveActions += 1;

          const rsiState = detectRSIExtreme(indicators.rsi);
          if (rsiState === 'overbought') {
            indicatorUsed = 'RSI';
            outcomeMessage = 'Overextended.';
          } else if (marketState.phase === 'midday-chop') {
            indicatorUsed = 'Market Structure';
            outcomeMessage = 'Chopped up.';
          }

          break;

        case 'cash-out':
          if (!newState.position) {
            outcomeMessage = 'No position.';
            break;
          }

          outcomeMessage = getRandomLine(NARRATOR_LINES.cashOut);
          newState.kbumBalance += newState.unrealizedPnL;
          newState.position = null;
          newState.unrealizedPnL = 0;
          newState.exposure = 0;
          newState.emotionalStress = Math.max(0, newState.emotionalStress - 20);
          newState.disciplineScore = Math.min(100, newState.disciplineScore + 5);

          const peak = Math.max(...newState.equityCurve.map(p => p.equity));
          updateEquityCurve(newState.kbumBalance, peak);

          if (detectVolumeSpike(indicators.volume)) {
            indicatorUsed = 'Volume';
          }

          break;

        case 'walk-away':
          outcomeMessage = getRandomLine(NARRATOR_LINES.walkAway);
          if (newState.position) {
            newState.kbumBalance += newState.unrealizedPnL;
            newState.position = null;
          }
          newState.sessionEnded = true;
          newState.isSessionActive = false;
          newState.disciplineScore = Math.min(100, newState.disciplineScore + 15);
          break;

        case 'taunt-market':
          outcomeMessage = getRandomLine(NARRATOR_LINES.tauntMarket);
          newState.emotionalStress = Math.min(100, newState.emotionalStress + 15);
          newState.impulsiveActions += 1;

          if (Math.random() > 0.7 && newState.position) {
            const chaos = Math.random() > 0.5 ? 500 : -500;
            newState.kbumBalance += chaos * newState.riskAmplifier;
            outcomeMessage = chaos > 0 ? 'Chaos rewarded.' : 'Chaos punished.';
            indicatorUsed = 'Volume';
          }
          break;
      }

      addMessage(outcomeMessage);
      if (indicatorUsed) {
        setTimeout(() => showIndicatorLabel(indicatorUsed!), 400);
      }

      setTimeout(() => {
        const contextualLines =
          newState.emotionalStress > 75 ? NARRATOR_LINES.extremeStress :
          newState.emotionalStress > 50 ? NARRATOR_LINES.highStress :
          newState.emotionalStress > 25 ? NARRATOR_LINES.moderateStress :
          NARRATOR_LINES.lowStress;
        addMessage(getRandomLine(contextualLines));
      }, 1200);

      evolveMarket();
      triggerGlow(null, newState.riskAmplifier);

      return newState;
    });
  }, [marketState, playerState, addMessage, showIndicatorLabel, evolveMarket, triggerGlow, updateEquityCurve]);

  const setRiskAmplifier = useCallback((amplifier: RiskAmplifier) => {
    setPlayerState(prev => ({ ...prev, riskAmplifier: amplifier }));
    const lines = amplifier === 1 ? ['Safe mode.'] : amplifier === 10 ? ['Leverage active.'] : amplifier === 50 ? ['High risk.'] : ['Insanity.'];
    addMessage(getRandomLine(lines));
  }, [addMessage]);

  const endSession = useCallback(() => {
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    if (priceTimerRef.current) clearInterval(priceTimerRef.current);

    setPlayerState(prev => {
      let finalBalance = prev.kbumBalance;
      if (prev.position) {
        finalBalance += prev.unrealizedPnL;
      }

      const review: SessionReview = {
        discipline: prev.disciplineScore,
        impulse: prev.impulsiveActions,
        timing: prev.timingQuality,
        exposureControl: 100 - prev.maxDrawdown,
        emotionalPressure: prev.emotionalStress,
        riskAmplifierUsage: prev.riskAmplifier,
        equityCurve: prev.equityCurve,
        finalBalance,
        maxDrawdown: prev.maxDrawdown,
        totalTrades: prev.tradeCount,
      };

      setSessionReview(review);

      return {
        ...prev,
        kbumBalance: finalBalance,
        position: null,
        sessionEnded: true,
        isSessionActive: false,
      };
    });
  }, []);

  const restart = useCallback(() => {
    setMarketState(getInitialMarketState());
    setPlayerState(getInitialPlayerState());
    setSessionReview(null);
  }, []);

  return {
    marketState,
    playerState,
    sessionReview,
    actions: {
      executeAction,
      setRiskAmplifier,
      endSession,
      restart,
    },
  };
};
