import { useEffect, useRef } from 'react';

interface RSIChartProps {
  rsi: number[];
  width: number;
  height: number;
}

export const RSIChart = ({ rsi, width, height }: RSIChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || rsi.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 10, right: 60, bottom: 20, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    ctx.strokeStyle = '#2A2C30';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(width - padding.right, padding.top);
    ctx.moveTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(width - padding.right, padding.top + chartHeight);
    ctx.stroke();

    ctx.strokeStyle = '#6B7280';
    ctx.setLineDash([2, 2]);
    [30, 50, 70].forEach(level => {
      const y = padding.top + chartHeight - (level / 100) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = level === 50 ? '#6B7280' : '#9CA3AF';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(level.toString(), width - padding.right + 5, y + 3);
    });
    ctx.setLineDash([]);

    ctx.strokeStyle = '#A855F7';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const spacing = chartWidth / rsi.length;

    rsi.forEach((value, i) => {
      if (isNaN(value)) return;

      const x = padding.left + i * spacing + spacing / 2;
      const y = padding.top + chartHeight - (value / 100) * chartHeight;

      if (i === 0 || isNaN(rsi[i - 1])) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('RSI (14)', padding.left + 5, padding.top + 10);

    const lastRSI = rsi[rsi.length - 1];
    if (!isNaN(lastRSI)) {
      ctx.fillStyle = lastRSI > 70 ? '#FF4444' : lastRSI < 30 ? '#00FF9C' : '#A855F7';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(lastRSI.toFixed(1), width - padding.right - 5, padding.top + 10);
    }
  }, [rsi, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-[#0B0D10] border border-[#2A2C30]"
    />
  );
};
