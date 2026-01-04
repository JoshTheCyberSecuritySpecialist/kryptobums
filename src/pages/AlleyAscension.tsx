import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAlleyGame } from '../hooks/useAlleyGame';
import { useMarketGame } from '../hooks/useMarketGame';
import { GameStats } from '../components/AlleyGame/GameStats';
import { MessageLog } from '../components/AlleyGame/MessageLog';
import { Inventory } from '../components/AlleyGame/Inventory';
import { ActionButtons } from '../components/AlleyGame/ActionButtons';
import { SceneDisplay } from '../components/AlleyGame/SceneDisplay';
import { CombatDisplay } from '../components/AlleyGame/CombatDisplay';
import { GameOverScreen } from '../components/AlleyGame/GameOverScreen';
import { InteractiveBum } from '../components/AlleyGame/InteractiveBum';
import { MarketStats } from '../components/Market/MarketStats';
import { MarketActionButtons } from '../components/Market/MarketActionButtons';
import { RiskAmplifierSelector } from '../components/Market/RiskAmplifierSelector';
import { MarketPhaseDisplay } from '../components/Market/MarketPhaseDisplay';
import { SessionReviewScreen } from '../components/Market/SessionReviewScreen';
import { IndicatorLabel } from '../components/Market/IndicatorLabel';
import { CandlestickChart } from '../components/Chart/CandlestickChart';
import { RSIChart } from '../components/Chart/RSIChart';
import { VolumeChart } from '../components/Chart/VolumeChart';
import { ChartControls } from '../components/Chart/ChartControls';
import { calculateIndicators } from '../utils/indicators';

type GameMode = 'alley' | 'market';

export const AlleyAscension = () => {
  const [gameMode, setGameMode] = useState<GameMode>('alley');
  const [showSMA20, setShowSMA20] = useState(true);
  const [showSMA50, setShowSMA50] = useState(true);
  const [showBB, setShowBB] = useState(true);

  const alleyGame = useAlleyGame();
  const marketGame = useMarketGame();

  const ModeSelector = () => (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setGameMode('alley')}
        className={`px-6 py-3 font-bold uppercase text-sm tracking-wider border-2 transition-all
                   ${gameMode === 'alley'
                     ? 'bg-[#00FF9C] text-black border-[#00FF9C]'
                     : 'bg-[#14161A] text-gray-400 border-[#00FF9C]/30 hover:border-[#00FF9C]/60'}`}
        style={{ borderRadius: '4px' }}
      >
        Alley Ascension
      </button>
      <button
        onClick={() => setGameMode('market')}
        className={`px-6 py-3 font-bold uppercase text-sm tracking-wider border-2 transition-all
                   ${gameMode === 'market'
                     ? 'bg-[#00FF9C] text-black border-[#00FF9C]'
                     : 'bg-[#14161A] text-gray-400 border-[#00FF9C]/30 hover:border-[#00FF9C]/60'}`}
        style={{ borderRadius: '4px' }}
      >
        Street Market
      </button>
    </div>
  );

  if (gameMode === 'alley') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B0D10] via-[#14161A] to-[#0B0D10] py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-6">
            <h1
              className="text-4xl md:text-6xl font-black text-[#00FF9C] tracking-tight mb-2"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 156, 0.5)',
                transform: 'scaleY(1.1)',
              }}
            >
              ALLEY ASCENSION
            </h1>
            <p className="text-sm md:text-base text-[#9CA3AF] font-mono italic">
              A KryptoBums Experience
            </p>
          </div>

          <ModeSelector />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SceneDisplay scene={alleyGame.gameState.currentScene} />

              <InteractiveBum
                onInteract={alleyGame.actions.handleBumInteraction}
                health={alleyGame.gameState.health}
                rage={alleyGame.gameState.rage}
                rageMode={alleyGame.gameState.rageMode}
                isInCombat={!!alleyGame.gameState.currentEnemy}
              />

              {alleyGame.gameState.currentEnemy && alleyGame.gameState.enemyHealth && alleyGame.gameState.enemyMaxHealth && (
                <CombatDisplay
                  enemy={alleyGame.gameState.currentEnemy}
                  enemyHealth={alleyGame.gameState.enemyHealth}
                  enemyMaxHealth={alleyGame.gameState.enemyMaxHealth}
                />
              )}

              <MessageLog messages={alleyGame.gameState.messageLog} />

              <ActionButtons
                onAction={alleyGame.actions.handleAction}
                disabled={!alleyGame.gameState.isAlive}
                inCombat={!!alleyGame.gameState.currentEnemy}
              />

              {!alleyGame.gameState.currentEnemy && alleyGame.gameState.isAlive && !alleyGame.gameState.hasWon && (
                <button
                  onClick={alleyGame.actions.nextScene}
                  className="w-full bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-bold py-4 px-6
                             uppercase text-sm tracking-wider border-2 border-[#00FF9C]
                             transition-all hover:scale-105 active:scale-95
                             shadow-lg hover:shadow-[#00FF9C]/50
                             flex items-center justify-center gap-2"
                  style={{ transform: 'rotate(0.3deg)' }}
                >
                  Move to Next Location
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              <GameStats
                health={alleyGame.gameState.health}
                maxHealth={alleyGame.gameState.maxHealth}
                rage={alleyGame.gameState.rage}
                luck={alleyGame.gameState.luck}
                xp={alleyGame.gameState.xp}
                rageMode={alleyGame.gameState.rageMode}
              />

              <Inventory items={alleyGame.gameState.inventory} />

              <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 p-4 text-xs text-gray-400 font-mono space-y-2">
                <p className="text-[#00FF9C] font-bold uppercase mb-2">How to Play:</p>
                <p>• Click the bum for... something</p>
                <p>• Fight enemies or try talking</p>
                <p>• Do something stupid for chaos</p>
                <p>• Reach the Rooftop to win</p>
                <p>• Rage Mode activates at 80+ rage</p>
                <p>• Luck affects hit chance</p>
                <p className="text-yellow-400 mt-3 italic">Jank is a feature.</p>
              </div>
            </div>
          </div>
        </div>

        {(!alleyGame.gameState.isAlive || alleyGame.gameState.hasWon) && (
          <GameOverScreen
            isWin={alleyGame.gameState.hasWon}
            xp={alleyGame.gameState.xp}
            onRestart={alleyGame.actions.restart}
          />
        )}
      </div>
    );
  }

  const indicators = calculateIndicators(marketGame.playerState.priceData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0D10] via-[#14161A] to-[#0B0D10] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6">
          <h1
            className="text-4xl md:text-6xl font-black text-[#00FF9C] tracking-tight mb-2"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 156, 0.5)',
              transform: 'scaleY(1.1)',
            }}
          >
            STREET MARKET
          </h1>
          <p className="text-sm md:text-base text-[#9CA3AF] font-mono italic">
            A KryptoBums Experience
          </p>
        </div>

        <ModeSelector />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <MarketPhaseDisplay phase={marketGame.marketState.phase} />
              <ChartControls
                showSMA20={showSMA20}
                showSMA50={showSMA50}
                showBB={showBB}
                onToggleSMA20={() => setShowSMA20(!showSMA20)}
                onToggleSMA50={() => setShowSMA50(!showSMA50)}
                onToggleBB={() => setShowBB(!showBB)}
              />
            </div>

            <CandlestickChart
              candles={marketGame.playerState.priceData}
              indicators={indicators}
              showSMA20={showSMA20}
              showSMA50={showSMA50}
              showBB={showBB}
              width={900}
              height={400}
              currentPrice={marketGame.playerState.currentPrice}
            />

            <div className="grid grid-cols-2 gap-4">
              <RSIChart rsi={indicators.rsi} width={440} height={120} />
              <VolumeChart volumes={indicators.volume} width={440} height={120} />
            </div>

            <MessageLog messages={marketGame.playerState.messageLog} />
          </div>

          <div className="space-y-6">
            <MarketStats playerState={marketGame.playerState} />

            <RiskAmplifierSelector
              current={marketGame.playerState.riskAmplifier}
              onChange={marketGame.actions.setRiskAmplifier}
              disabled={!marketGame.playerState.isSessionActive || marketGame.playerState.sessionEnded || !!marketGame.playerState.position}
            />

            <div className="bg-[#14161A] border-2 border-[#00FF9C]/30 p-4">
              <div className="text-sm font-bold text-[#00FF9C] uppercase tracking-wider mb-3">
                Actions
              </div>
              <MarketActionButtons
                onAction={marketGame.actions.executeAction}
                disabled={!marketGame.playerState.isSessionActive || marketGame.playerState.sessionEnded}
                glowButton={marketGame.playerState.glowButton}
              />
            </div>

            {marketGame.playerState.isSessionActive && !marketGame.playerState.sessionEnded && marketGame.marketState.phase === 'close' && (
              <button
                onClick={marketGame.actions.endSession}
                className="w-full bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-bold py-4 px-6
                           uppercase text-sm tracking-wider border-2 border-[#00FF9C]
                           transition-all hover:scale-105 active:scale-95
                           shadow-lg hover:shadow-[#00FF9C]/50"
                style={{ borderRadius: '4px' }}
              >
                Review Session
              </button>
            )}
          </div>
        </div>
      </div>

      <IndicatorLabel label={marketGame.playerState.indicatorLabel} />

      {marketGame.sessionReview && (
        <SessionReviewScreen
          review={marketGame.sessionReview}
          onRestart={marketGame.actions.restart}
        />
      )}
    </div>
  );
};
