import { useEffect, useRef } from 'react';
import { EquityPoint } from '../../types/marketGame';

interface EquityCurveChartProps {
  equityCurve: EquityPoint[];
  width: number;
  height: number;
}

export const EquityCurveChart = ({ equityCurve, width, height }: EquityCurveChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || equityCurve.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 60, bottom: 30, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const allEquities = equityCurve.map(p => p.equity);
    const maxEquity = Math.max(...allEquities);
    const minEquity = Math.min(...allEquities);
    const equityRange = maxEquity - minEquity || 1;

    const equityToY = (equity: number) => {
      return padding.top + chartHeight - ((equity - minEquity) / equityRange) * chartHeight;
    };

    ctx.strokeStyle = '#2A2C30';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const equity = maxEquity - (equityRange / 5) * i;
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`$${equity.toFixed(0)}`, width - padding.right + 5, y + 3);
    }

    const startingEquity = equityCurve[0].equity;
    const startingY = equityToY(startingEquity);
    ctx.strokeStyle = '#6B7280';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, startingY);
    ctx.lineTo(width - padding.right, startingY);
    ctx.stroke();
    ctx.setLineDash([]);

    const currentEquity = equityCurve[equityCurve.length - 1].equity;
    const isProfit = currentEquity >= startingEquity;

    ctx.strokeStyle = isProfit ? '#00FF9C' : '#FF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const spacing = chartWidth / (equityCurve.length - 1 || 1);

    equityCurve.forEach((point, i) => {
      const x = padding.left + i * spacing;
      const y = equityToY(point.equity);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('EQUITY CURVE', padding.left + 5, padding.top + 12);

    ctx.fillStyle = isProfit ? '#00FF9C' : '#FF4444';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'right';
    const pnl = currentEquity - startingEquity;
    const pnlPercent = ((pnl / startingEquity) * 100).toFixed(2);
    ctx.fillText(`${pnl >= 0 ? '+' : ''}$${pnl.toFixed(0)} (${pnlPercent}%)`, width - padding.right - 5, padding.top + 12);
  }, [equityCurve, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-[#0B0D10] border border-[#2A2C30]"
    />
  );
};
