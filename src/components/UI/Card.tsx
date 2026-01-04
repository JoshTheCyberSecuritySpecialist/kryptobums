import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  accentColor?: 'green' | 'blue' | 'red';
}

export const Card = ({ children, className = '', accentColor = 'green' }: CardProps) => {
  const accentColors = {
    green: 'border-[#00FF9C]',
    blue: 'border-[#3B82F6]',
    red: 'border-[#FF3B3B]',
  };

  return (
    <div
      className={`
        bg-[#14161A] border-2 ${accentColors[accentColor]}
        rounded-lg p-6
        transition-all duration-300
        hover:shadow-[0_0_15px_rgba(0,255,156,0.2)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
