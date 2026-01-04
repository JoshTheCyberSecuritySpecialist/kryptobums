import { PlayerMarketState } from '../../types/marketGame';

interface MarketStatsProps {
  playerState: PlayerMarketState;
}

export const MarketStats = ({ playerState }: MarketStatsProps) => {
  const StatRow = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <div className="flex justify-between items-center py-1 border-b border-[#2A2C30]/50">
      <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold font-mono ${color || 'text-white'}`}>{value}</span>
    </div>
  );

  const totalEquity = playerState.kbumBalance + playerState.unrealizedPnL;
  const pnlColor = playerState.unrealizedPnL >= 0 ? 'text-[#00FF9C]' : 'text-[#FF4444]';

  return (
    <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 p-4 space-y-3">
      <div className="text-sm font-bold text-[#00FF9C] uppercase tracking-wider mb-3">
        Account
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Balance</div>
          <div className="text-2xl font-black text-white font-mono">
            ${playerState.kbumBalance.toFixed(2)}
          </div>
        </div>

        {playerState.position && (
          <>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Unrealized P/L</div>
              <div className={`text-xl font-black font-mono ${pnlColor}`}>
                {playerState.unrealizedPnL >= 0 ? '+' : ''}${playerState.unrealizedPnL.toFixed(2)}
              </div>
            </div>

            <div className="pt-2 border-t border-[#2A2C30]">
              <StatRow label="Entry Price" value={`$${playerState.position.entryPrice.toFixed(2)}`} />
              <StatRow label="Position Size" value={`$${playerState.position.size.toFixed(0)}`} />
              <StatRow label="Leverage" value={`${playerState.position.leverage}×`} />
              <StatRow label="Exposure" value={`${playerState.exposure.toFixed(1)}%`} />
            </div>
          </>
        )}

        {!playerState.position && (
          <div className="text-center py-4 text-gray-500 text-sm font-mono">
            No Position
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-[#2A2C30]">
        <StatRow label="Total Equity" value={`$${totalEquity.toFixed(2)}`} color="text-[#00FF9C]" />
        <StatRow label="Current Price" value={`$${playerState.currentPrice.toFixed(2)}`} />
        <StatRow label="Trades" value={playerState.tradeCount.toString()} />
      </div>
    </div>
  );
};
