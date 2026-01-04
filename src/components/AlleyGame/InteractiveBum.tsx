import { useState, useEffect } from 'react';
import { BUM_DIALOGUE } from '../../data/bumDialogue';

type CharacterState = 'normal' | 'injured' | 'critical';

interface InteractiveBumProps {
  onInteract: () => void;
  health: number;
  rage: number;
  rageMode: boolean;
  isInCombat: boolean;
}

export const InteractiveBum = ({ onInteract, health, rage, rageMode, isInCombat }: InteractiveBumProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [whisper, setWhisper] = useState<string>('');
  const [flash, setFlash] = useState<'damage' | 'rage' | 'luck' | null>(null);
  const [damageShake, setDamageShake] = useState(false);
  const [prevHealth, setPrevHealth] = useState(health);
  const [characterState, setCharacterState] = useState<CharacterState>('normal');
  const [isSafeZone, setIsSafeZone] = useState(false);

  useEffect(() => {
    if (health < prevHealth) {
      setFlash('damage');
      setDamageShake(true);
      setTimeout(() => setFlash(null), 300);
      setTimeout(() => setDamageShake(false), 400);
    }
    setPrevHealth(health);
  }, [health, prevHealth]);

  useEffect(() => {
    if (health > 75) {
      setCharacterState('normal');
    } else if (health >= 40) {
      setCharacterState('injured');
    } else {
      setCharacterState('critical');
    }
  }, [health]);

  useEffect(() => {
    setIsSafeZone(!isInCombat);
  }, [isInCombat]);

  useEffect(() => {
    if (rageMode) {
      setFlash('rage');
      setTimeout(() => setFlash(null), 500);
    }
  }, [rageMode]);

  const getCharacterImage = () => {
    switch (characterState) {
      case 'normal':
        return '/assets/bum/base.png';
      case 'injured':
        return '/assets/bum/black_eye.png';
      case 'critical':
        return '/assets/bum/gunshot.png';
      default:
        return '/assets/bum/base.png';
    }
  };

  const handleClick = () => {
    const contextualReactions = [
      "You see me chillin', don't poke the beast.",
      "I been worse than this. Probably.",
      "Man… that couch was safer.",
      ...BUM_DIALOGUE.bumMutters,
    ];
    const reaction = contextualReactions[Math.floor(Math.random() * contextualReactions.length)];
    setWhisper(reaction);
    setTimeout(() => setWhisper(''), 3000);
    onInteract();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (Math.random() > 0.6) {
      const whispers = [
        '...not again...',
        '...the charts...',
        '...I can smell fear...',
        '...why me...',
        '...hodl...',
        '...that couch...',
      ];
      setWhisper(whispers[Math.floor(Math.random() * whispers.length)]);
      setTimeout(() => setWhisper(''), 2000);
    }
  };

  const getFlashColor = () => {
    switch (flash) {
      case 'damage': return 'rgba(239, 68, 68, 0.5)';
      case 'rage': return 'rgba(249, 115, 22, 0.5)';
      case 'luck': return 'rgba(0, 255, 156, 0.5)';
      default: return 'transparent';
    }
  };

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '360px', maxHeight: '45vh' }}
    >
      {whisper && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2
                      bg-black/90 border border-[#00FF9C] px-4 py-2 rounded
                      text-[#00FF9C] text-xs font-mono whitespace-nowrap
                      animate-fadeIn z-50"
          style={{
            animation: 'fadeIn 0.3s ease-out, float 2s ease-in-out infinite',
          }}
        >
          {whisper}
        </div>
      )}

      <div
        className="relative cursor-pointer group h-full flex items-center justify-center"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          filter: flash ? `drop-shadow(0 0 20px ${getFlashColor()})` : 'none',
        }}
      >
        <div
          className={`absolute inset-0 transition-all duration-300
                      ${isHovering ? 'animate-pulse' : ''}`}
          style={{
            background: rageMode
              ? 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)'
              : health < 30
              ? 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,255,156,0.1) 0%, transparent 70%)',
            transform: isHovering ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        <div className="relative z-10 h-full flex items-center justify-center">
          {isSafeZone && (
            <img
              src="/assets/bum/couch.png"
              alt="Couch"
              className="absolute"
              style={{
                bottom: '10%',
                maxHeight: '60%',
                width: 'auto',
                objectFit: 'contain',
                zIndex: 1,
                imageRendering: 'crisp-edges',
              }}
            />
          )}

          <img
            src={getCharacterImage()}
            alt="KryptoBum"
            className={`relative transition-all duration-200
                        ${damageShake ? 'animate-shake' : characterState === 'critical' ? 'animate-heavy-breathe' : 'animate-breathe'}`}
            style={{
              maxHeight: '100%',
              width: 'auto',
              objectFit: 'contain',
              transform: isHovering ? 'scale(1.05)' : 'scale(1)',
              imageRendering: 'crisp-edges',
              zIndex: 10,
            }}
          />

          {rageMode && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: '0 0 40px rgba(249, 115, 22, 0.6)',
                animation: 'pulse 1s infinite',
                zIndex: 5,
              }}
            />
          )}
        </div>

        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                      text-xs font-mono text-gray-500 whitespace-nowrap
                      group-hover:text-[#00FF9C] transition-colors z-20"
        >
          {isHovering ? (characterState === 'critical' ? 'help...' : 'click me') : ''}
        </div>

        {characterState === 'critical' && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        text-red-500 text-xs font-mono opacity-50 animate-pulse z-20"
          >
            [CRITICAL]
          </div>
        )}
      </div>
    </div>
  );
};
