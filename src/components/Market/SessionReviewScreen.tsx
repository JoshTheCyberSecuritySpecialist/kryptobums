import { SessionReview } from '../../types/marketGame';
import { EquityCurveChart } from '../Chart/EquityCurveChart';

interface SessionReviewScreenProps {
  review: SessionReview;
  onRestart: () => void;
}

export const SessionReviewScreen = ({ review, onRestart }: SessionReviewScreenProps) => {
  const getQualityLabel = (value: number) => {
    if (value < 25) return 'Poor';
    if (value < 50) return 'Weak';
    if (value < 75) return 'Moderate';
    return 'Strong';
  };

  const MetricRow = ({ label, value }: { label: string; value: number | string }) => (
    <div className="flex justify-between items-center py-2 border-b border-[#2A2C30]">
      <span className="text-gray-400 font-mono text-sm uppercase">{label}</span>
      <span className="text-[#00FF9C] font-bold">{value}</span>
    </div>
  );

  const pnl = review.finalBalance - review.equityCurve[0].equity;
  const isProfit = pnl >= 0;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="bg-[#14161A] border-2 border-[#00FF9C] max-w-4xl w-full p-6 space-y-6 my-8">
        <h2 className="text-3xl font-black text-[#00FF9C] uppercase tracking-tight text-center">
          Session Review
        </h2>

        <div className={`text-center p-4 border-2 ${isProfit ? 'border-[#00FF9C]' : 'border-[#FF4444]'}`}>
          <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Final Balance</div>
          <div className={`text-4xl font-black font-mono ${isProfit ? 'text-[#00FF9C]' : 'text-[#FF4444]'}`}>
            ${review.finalBalance.toFixed(2)}
          </div>
          <div className={`text-xl font-bold font-mono mt-1 ${isProfit ? 'text-[#00FF9C]' : 'text-[#FF4444]'}`}>
            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({((pnl / review.equityCurve[0].equity) * 100).toFixed(2)}%)
          </div>
        </div>

        <EquityCurveChart equityCurve={review.equityCurve} width={800} height={200} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <MetricRow label="Discipline" value={getQualityLabel(review.discipline)} />
            <MetricRow label="Timing Quality" value={getQualityLabel(review.timing)} />
            <MetricRow label="Exposure Control" value={getQualityLabel(review.exposureControl)} />
          </div>
          <div className="space-y-1">
            <MetricRow label="Impulse Actions" value={review.impulse} />
            <MetricRow label="Total Trades" value={review.totalTrades} />
            <MetricRow label="Max Drawdown" value={`${review.maxDrawdown.toFixed(1)}%`} />
          </div>
        </div>

        <div className="text-center border-t border-[#2A2C30] pt-4">
          <div className="text-xs text-gray-400 uppercase mb-2">Leverage Used</div>
          <div className="text-2xl font-black text-[#00FF9C]">{review.riskAmplifierUsage}×</div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-bold py-4 px-6
                     uppercase text-sm tracking-wider border-2 border-[#00FF9C]
                     transition-all hover:scale-105 active:scale-95"
          style={{ borderRadius: '4px' }}
        >
          New Session
        </button>
      </div>
    </div>
  );
};
