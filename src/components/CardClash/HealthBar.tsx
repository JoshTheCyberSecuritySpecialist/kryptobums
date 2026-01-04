import { Heart, Shield } from 'lucide-react';

interface HealthBarProps {
  current: number;
  max: number;
  block?: number;
  label: string;
}

export const HealthBar = ({ current, max, block = 0, label }: HealthBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[#E5E7EB] font-bold text-sm uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-3">
          {block > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-[#3B82F6]/20 border border-[#3B82F6] rounded">
              <Shield className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[#3B82F6] font-black text-sm">{block}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Heart className="w-5 h-5 text-[#FF3B3B]" />
            <span className="text-[#E5E7EB] font-black text-lg">{current}/{max}</span>
          </div>
        </div>
      </div>
      <div className="h-6 bg-[#14161A] border-2 border-[#374151] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            percentage > 50
              ? 'bg-gradient-to-r from-[#00FF9C] to-[#4ADE80]'
              : percentage > 25
                ? 'bg-gradient-to-r from-[#FCD34D] to-[#FBBF24]'
                : 'bg-gradient-to-r from-[#FF3B3B] to-[#FF6B6B]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
