import { useEffect, useRef } from 'react';

interface VolumeChartProps {
  volumes: number[];
  width: number;
  height: number;
}

export const VolumeChart = ({ volumes, width, height }: VolumeChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || volumes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 5, right: 60, bottom: 5, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxVolume = Math.max(...volumes);
    const barWidth = Math.max(2, chartWidth / volumes.length - 1);
    const barSpacing = chartWidth / volumes.length;

    volumes.forEach((volume, i) => {
      const x = padding.left + i * barSpacing;
      const barHeight = (volume / maxVolume) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      ctx.fillStyle = '#6B7280';
      ctx.fillRect(x + (barSpacing - barWidth) / 2, y, barWidth, barHeight);
    });

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('VOLUME', padding.left + 5, padding.top + 10);
  }, [volumes, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="bg-[#0B0D10] border border-[#2A2C30]"
    />
  );
};
