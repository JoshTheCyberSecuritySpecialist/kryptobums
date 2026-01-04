import { PlayerProfile, AIDecision } from '../../types/ai';

interface AIDebugPanelProps {
  playerProfile: PlayerProfile;
  lastAIDecision: AIDecision | null;
  isVisible: boolean;
  onToggle: () => void;
}

export const AIDebugPanel = ({ playerProfile, lastAIDecision, isVisible, onToggle }: AIDebugPanelProps) => {
  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 bg-[#0B0D10] border-2 border-[#00FF9C] px-3 py-2 rounded text-[#00FF9C] text-xs font-mono hover:bg-[#00FF9C] hover:text-[#0B0D10] transition-colors z-50"
      >
        AI DEBUG
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-[#0B0D10]/95 border-2 border-[#00FF9C] rounded-lg p-4 w-80 max-h-96 overflow-y-auto z-50 font-mono text-xs">
      <div className="flex justify-between items-center mb-3 border-b border-[#00FF9C]/30 pb-2">
        <h3 className="text-[#00FF9C] font-bold uppercase">AI Debug Panel</h3>
        <button
          onClick={onToggle}
          className="text-[#00FF9C] hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-[#00FF9C] font-semibold mb-1">Player Profile</h4>
          <div className="text-[#9CA3AF] space-y-1">
            <div>Recent Actions: {playerProfile.recentActions.length > 0 ? playerProfile.recentActions.slice(-3).join(', ') : 'None'}</div>
            <div>Hit Accuracy: {(playerProfile.hitAccuracy * 100).toFixed(0)}%</div>
            <div>Dodges Used: {playerProfile.dodgesUsed}</div>
            <div>Items Used: {playerProfile.itemsUsed.length}</div>
          </div>
        </div>

        {lastAIDecision && (
          <>
            <div className="border-t border-[#00FF9C]/30 pt-3">
              <h4 className="text-[#00FF9C] font-semibold mb-1">AI Decision</h4>
              <div className="text-[#9CA3AF] space-y-1">
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="text-[#00FF9C]">{lastAIDecision.playerStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Action:</span>
                  <span className="text-[#00FF9C] font-bold">{lastAIDecision.decision}</span>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="text-[#00FF9C]">{(lastAIDecision.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#00FF9C]/30 pt-3">
              <h4 className="text-[#00FF9C] font-semibold mb-1">Reasoning</h4>
              <p className="text-[#9CA3AF] text-xs leading-relaxed">
                {lastAIDecision.reasoning}
              </p>
            </div>
          </>
        )}

        {!lastAIDecision && (
          <div className="border-t border-[#00FF9C]/30 pt-3">
            <p className="text-[#9CA3AF] text-xs italic">
              Waiting for AI decision...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
