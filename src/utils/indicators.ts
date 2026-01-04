import { Candle } from './priceGenerator';

export interface IndicatorData {
  sma20: number[];
  sma50: number[];
  bb: { upper: number[]; middle: number[]; lower: number[] };
  rsi: number[];
  volume: number[];
}

export const calculateSMA = (data: number[], period: number): number[] => {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }

    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j];
    }
    result.push(sum / period);
  }

  return result;
};

export const calculateBollingerBands = (
  data: number[],
  period: number,
  stdDev: number
): { upper: number[]; middle: number[]; lower: number[] } => {
  const middle = calculateSMA(data, period);
  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push(NaN);
      lower.push(NaN);
      continue;
    }

    let sumSquares = 0;
    for (let j = 0; j < period; j++) {
      const diff = data[i - j] - middle[i];
      sumSquares += diff * diff;
    }

    const variance = sumSquares / period;
    const std = Math.sqrt(variance);

    upper.push(middle[i] + std * stdDev);
    lower.push(middle[i] - std * stdDev);
  }

  return { upper, middle, lower };
};

export const calculateRSI = (data: number[], period: number = 14): number[] => {
  const result: number[] = [];
  const changes: number[] = [];

  for (let i = 1; i < data.length; i++) {
    changes.push(data[i] - data[i - 1]);
  }

  for (let i = 0; i < changes.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }

    let avgGain = 0;
    let avgLoss = 0;

    for (let j = 0; j < period; j++) {
      const change = changes[i - j];
      if (change > 0) {
        avgGain += change;
      } else {
        avgLoss += Math.abs(change);
      }
    }

    avgGain /= period;
    avgLoss /= period;

    if (avgLoss === 0) {
      result.push(100);
      continue;
    }

    const rs = avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);
    result.push(rsi);
  }

  result.unshift(NaN);

  return result;
};

export const calculateIndicators = (candles: Candle[]): IndicatorData => {
  const closes = candles.map(c => c.close);
  const volumes = candles.map(c => c.volume);

  return {
    sma20: calculateSMA(closes, 20),
    sma50: calculateSMA(closes, 50),
    bb: calculateBollingerBands(closes, 20, 2),
    rsi: calculateRSI(closes, 14),
    volume: volumes,
  };
};

export const detectBollingerSqueeze = (bb: { upper: number[]; lower: number[] }): boolean => {
  const lastIndex = bb.upper.length - 1;
  if (lastIndex < 20) return false;

  const currentWidth = bb.upper[lastIndex] - bb.lower[lastIndex];
  const avgWidth =
    bb.upper
      .slice(lastIndex - 20, lastIndex)
      .reduce((sum, val, i) => sum + (val - bb.lower[lastIndex - 20 + i]), 0) / 20;

  return currentWidth < avgWidth * 0.7;
};

export const detectMovingAverageCross = (
  sma20: number[],
  sma50: number[]
): 'bullish' | 'bearish' | null => {
  const len = sma20.length;
  if (len < 2 || isNaN(sma20[len - 1]) || isNaN(sma50[len - 1])) return null;

  const currentDiff = sma20[len - 1] - sma50[len - 1];
  const prevDiff = sma20[len - 2] - sma50[len - 2];

  if (prevDiff < 0 && currentDiff > 0) return 'bullish';
  if (prevDiff > 0 && currentDiff < 0) return 'bearish';

  return null;
};

export const detectRSIExtreme = (rsi: number[]): 'overbought' | 'oversold' | null => {
  const lastRSI = rsi[rsi.length - 1];
  if (isNaN(lastRSI)) return null;

  if (lastRSI > 70) return 'overbought';
  if (lastRSI < 30) return 'oversold';

  return null;
};

export const detectVolumeSpike = (volumes: number[]): boolean => {
  const len = volumes.length;
  if (len < 20) return false;

  const currentVol = volumes[len - 1];
  const avgVol = volumes.slice(len - 20, len - 1).reduce((a, b) => a + b, 0) / 19;

  return currentVol > avgVol * 2;
};
