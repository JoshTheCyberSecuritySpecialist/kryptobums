import { IndicatorLabel as IndicatorLabelType } from '../../types/marketGame';

interface IndicatorLabelProps {
  label: IndicatorLabelType | null;
}

export const IndicatorLabel = ({ label }: IndicatorLabelProps) => {
  if (!label) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
      <div className="bg-black/90 border border-[#00FF9C] px-4 py-2 animate-fade-in">
        <div className="text-[#00FF9C] font-mono text-sm uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};
