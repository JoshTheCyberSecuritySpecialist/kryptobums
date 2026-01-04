export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PriceGeneratorConfig {
  basePrice: number;
  volatility: number;
  trendBias: number;
  timeframe: number;
  numCandles: number;
}

export const generatePriceData = (config: PriceGeneratorConfig): Candle[] => {
  const candles: Candle[] = [];
  let currentPrice = config.basePrice;
  let currentTime = Date.now() - (config.numCandles * config.timeframe);

  for (let i = 0; i < config.numCandles; i++) {
    const open = currentPrice;

    const volatilityFactor = config.volatility * (0.5 + Math.random());
    const trendComponent = config.trendBias * (Math.random() - 0.3);
    const randomWalk = (Math.random() - 0.5) * volatilityFactor;

    const priceChange = trendComponent + randomWalk;
    let close = open + priceChange;

    const wickRange = volatilityFactor * 1.5;
    const highWick = Math.random() * wickRange;
    const lowWick = Math.random() * wickRange;

    const high = Math.max(open, close) + highWick;
    const low = Math.min(open, close) - lowWick;

    const volume = 1000000 + Math.random() * 5000000;

    candles.push({
      time: currentTime,
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
    currentTime += config.timeframe;
  }

  return candles;
};

export const generateRealisticSession = (phase: string): Candle[] => {
  const baseConfig: PriceGeneratorConfig = {
    basePrice: 100,
    volatility: 0.5,
    trendBias: 0,
    timeframe: 60000,
    numCandles: 120,
  };

  switch (phase) {
    case 'pre-market':
      return generatePriceData({
        ...baseConfig,
        volatility: 0.3,
        trendBias: 0.05,
        numCandles: 15,
      });
    case 'open':
      return generatePriceData({
        ...baseConfig,
        volatility: 1.2,
        trendBias: 0.2,
        numCandles: 15,
      });
    case 'expansion':
      return generatePriceData({
        ...baseConfig,
        volatility: 0.8,
        trendBias: 0.15,
        numCandles: 15,
      });
    case 'midday-chop':
      return generatePriceData({
        ...baseConfig,
        volatility: 0.3,
        trendBias: 0,
        numCandles: 20,
      });
    case 'trend-continuation':
      return generatePriceData({
        ...baseConfig,
        volatility: 0.6,
        trendBias: 0.25,
        numCandles: 15,
      });
    case 'reversal-window':
      return generatePriceData({
        ...baseConfig,
        volatility: 1.0,
        trendBias: -0.3,
        numCandles: 15,
      });
    case 'power-hour':
      return generatePriceData({
        ...baseConfig,
        volatility: 1.1,
        trendBias: 0.2,
        numCandles: 15,
      });
    case 'close':
      return generatePriceData({
        ...baseConfig,
        volatility: 0.5,
        trendBias: -0.1,
        numCandles: 10,
      });
    default:
      return generatePriceData(baseConfig);
  }
};

export const addFakeBreakout = (candles: Candle[]): Candle[] => {
  if (candles.length < 5) return candles;

  const breakoutIndex = Math.floor(candles.length * 0.6);
  const newCandles = [...candles];

  for (let i = breakoutIndex; i < breakoutIndex + 3 && i < newCandles.length; i++) {
    const candle = newCandles[i];
    const spike = candle.close * 0.05;
    newCandles[i] = {
      ...candle,
      high: candle.high + spike,
      close: candle.close + spike * 0.3,
    };
  }

  for (let i = breakoutIndex + 3; i < breakoutIndex + 6 && i < newCandles.length; i++) {
    const candle = newCandles[i];
    const drop = candle.close * 0.07;
    newCandles[i] = {
      ...candle,
      low: candle.low - drop,
      close: candle.close - drop * 0.5,
    };
  }

  return newCandles;
};

export const addVolatilitySpike = (candles: Candle[]): Candle[] => {
  if (candles.length < 3) return candles;

  const spikeIndex = Math.floor(candles.length * 0.7);
  const newCandles = [...candles];

  for (let i = spikeIndex; i < spikeIndex + 5 && i < newCandles.length; i++) {
    const candle = newCandles[i];
    const mult = 2.5;
    const range = candle.high - candle.low;
    newCandles[i] = {
      ...candle,
      high: candle.high + range * mult * Math.random(),
      low: candle.low - range * mult * Math.random(),
    };
  }

  return newCandles;
};
