import { X, ArrowRight, RotateCcw } from 'lucide-react';
import bobbyImage from '../../assets/crackhead_bobb_y.png';
import { Button } from '../UI/Button';

interface TutorialDialogueProps {
  title: string;
  message: string;
  explanation?: string;
  onNext?: () => void;
  onSkip?: () => void;
  onReplay?: () => void;
  showNext?: boolean;
  showSkip?: boolean;
  showReplay?: boolean;
  nextLabel?: string;
}

export const TutorialDialogue = ({
  title,
  message,
  explanation,
  onNext,
  onSkip,
  onReplay,
  showNext = true,
  showSkip = true,
  showReplay = false,
  nextLabel = 'Got it'
}: TutorialDialogueProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-full px-4 pointer-events-none">
      <div className="bg-[#14161A] border-4 border-[#00FF9C] rounded-lg shadow-2xl shadow-[#00FF9C]/30 overflow-hidden pointer-events-auto">
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg border-2 border-[#00FF9C] overflow-hidden bg-[#1F2937]">
              <img
                src={bobbyImage}
                alt="Super Crackhead Bobby"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[#00FF9C] text-xs font-black text-center mt-2 uppercase tracking-wider">
              Bobby
            </p>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#00FF9C] text-xl font-black uppercase tracking-tight">
                {title}
              </h3>
              {showSkip && onSkip && (
                <button
                  onClick={onSkip}
                  className="text-[#6B7280] hover:text-[#FF3B3B] transition-colors"
                  aria-label="Skip tutorial"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-[#E5E7EB] text-lg leading-relaxed mb-2 whitespace-pre-line">
              {message}
            </p>

            {explanation && (
              <p className="text-[#9CA3AF] text-sm leading-relaxed mt-3 border-t border-[#374151] pt-3">
                {explanation}
              </p>
            )}

            <div className="flex items-center gap-3 mt-4">
              {showNext && onNext && (
                <Button
                  onClick={onNext}
                  accentColor="green"
                  className="px-4 py-2"
                >
                  {nextLabel}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {showReplay && onReplay && (
                <Button
                  onClick={onReplay}
                  accentColor="blue"
                  className="px-4 py-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay Tutorial
                </Button>
              )}

              {showSkip && onSkip && (
                <button
                  onClick={onSkip}
                  className="text-[#9CA3AF] hover:text-[#E5E7EB] text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Skip Tutorial
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
