import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider
    transition-all duration-200 ease-in-out
    transform hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variants = {
    primary: `
      bg-[#00FF9C] text-[#0B0D10]
      hover:shadow-[0_0_20px_rgba(0,255,156,0.5)]
      disabled:hover:shadow-none
    `,
    secondary: `
      bg-[#3B82F6] text-white
      hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
      disabled:hover:shadow-none
    `,
    danger: `
      bg-[#FF3B3B] text-white
      hover:shadow-[0_0_20px_rgba(255,59,59,0.5)]
      disabled:hover:shadow-none
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
