import { ReactNode } from 'react';

interface TutorialHighlightProps {
  children: ReactNode;
  active: boolean;
}

export const TutorialHighlight = ({ children, active }: TutorialHighlightProps) => {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="absolute -inset-2 bg-[#00FF9C]/20 border-2 border-[#00FF9C] rounded-lg animate-pulse pointer-events-none z-40" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
