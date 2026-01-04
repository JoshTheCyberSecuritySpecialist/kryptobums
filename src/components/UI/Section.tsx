import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Section = ({ children, title, subtitle, className = '' }: SectionProps) => {
  return (
    <section className={`py-12 px-4 md:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="mb-8 text-center">
            <h2 className="text-[#00FF9C] mb-2">{title}</h2>
            {subtitle && (
              <p className="text-[#9CA3AF] text-lg">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
