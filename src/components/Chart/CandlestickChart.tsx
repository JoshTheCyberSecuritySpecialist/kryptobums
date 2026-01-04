import { useEffect, useRef } from 'react';
import { Candle } from '../../utils/priceGenerator';
import { IndicatorData } from '../../utils/indicators';

interface CandlestickChartProps {
  candles: Candle[];
  indicators: IndicatorData;
  showSMA20: boolean;
  showSMA50: boolean;
  showBB: boolean;
  width: number;
  height: number;
  currentPrice?: number;
}

export const CandlestickChart = ({
  candles,
  indicators,
  showSMA20,
  showSMA50,
  showBB,
  width,
  height,
  currentPrice,
}: CandlestickChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 60, bottom: 30, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const allPrices = candles.flatMap(c => [c.high, c.low]);
    const maxPrice = Math.max(...allPrices);
    const minPrice = Math.min(...allPrices);
    const priceRange = maxPrice - minPrice;

    const candleWidth = Math.max(2, chartWidth / candles.length - 2);
    const candleSpacing = chartWidth / candles.length;

    const priceToY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
    };

    ctx.strokeStyle = '#2A2C30';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(price.toFixed(2), width - padding.right + 5, y + 3);
    }

    if (showBB && indicators.bb) {
      ctx.strokeStyle = '#6B7280';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);

      [indicators.bb.upper, indicators.bb.middle, indicators.bb.lower].forEach(band => {
        ctx.beginPath();
        band.forEach((value, i) => {
          if (isNaN(value)) return;
          const x = padding.left + i * candleSpacing + candleSpacing / 2;
          const y = priceToY(value);
          if (i === 0 || isNaN(band[i - 1])) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    if (showSMA20) {
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      indicators.sma20.forEach((value, i) => {
        if (isNaN(value)) return;
        const x = padding.left + i * candleSpacing + candleSpacing / 2;
        const y = priceToY(value);
        if (i === 0 || isNaN(indicators.sma20[i - 1])) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    if (showSMA50) {
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      indicators.sma50.forEach((value, i) => {
        if (isNaN(value)) return;
        const x = padding.left + i * candleSpacing + candleSpacing / 2;
        const y = priceToY(value);
        if (i === 0 || isNaN(indicators.sma50[i - 1])) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    candles.forEach((candle, i) => {
      const x = padding.left + i * candleSpacing;
      const centerX = x + candleSpacing / 2;

      const openY = priceToY(candle.open);
      const closeY = priceToY(candle.close);
      const highY = priceToY(candle.high);
      const lowY = priceToY(candle.low);

      const isGreen = candle.close >= candle.open;
      ctx.strokeStyle = isGreen ? '#00FF9C' : '#FF4444';
      ctx.fillStyle = isGreen ? '#00FF9C' : '#FF4444';

      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.stroke();

      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY);

      if (bodyHeight < 1) {
        ctx.fillRect(x + (candleSpacing - candleWidth) / 2, bodyTop, candleWidth, 1);
      } else {
        ctx.fillRect(x + (candleSpacing - candleWidth) / 2, bodyTop, candleWidth, bodyHeight);
      }
    });

    if (currentPrice !== undefined) {
      const y = priceToY(currentPrice);
      ctx.strokeStyle = '#00FF9C';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#00FF9C';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(currentPrice.toFixed(2), width - padding.right + 5, y - 5);
    }
  }, [candles, indicators, showSMA20, showSMA50, showBB, width, height, currentPrice]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-[#0B0D10] border border-[#2A2C30]"
    />
  );
};
