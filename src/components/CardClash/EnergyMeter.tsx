import { Zap } from 'lucide-react';

interface EnergyMeterProps {
  current: number;
  max: number;
}

export const EnergyMeter = ({ current, max }: EnergyMeterProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#14161A] border-2 border-[#00FF9C] rounded-lg">
      <Zap className="w-6 h-6 text-[#00FF9C]" />
      <div className="flex-1">
        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider font-bold mb-1">Energy</p>
        <div className="flex gap-1">
          {Array.from({ length: max }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-3 rounded-full transition-all duration-300 ${
                i < current
                  ? 'bg-gradient-to-r from-[#00FF9C] to-[#4ADE80] shadow-lg shadow-[#00FF9C]/50'
                  : 'bg-[#374151]'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-[#00FF9C] font-black text-2xl">
        {current}/{max}
      </div>
    </div>
  );
};
