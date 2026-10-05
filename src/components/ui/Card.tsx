import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: 'cyan' | 'indigo' | 'emerald' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glow = 'none',
  onClick,
}) => {
  const glowStyles = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    indigo: 'hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    none: 'hover:border-slate-600/80',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-6 transition-all duration-300 ${
        hoverEffect ? `hover:-translate-y-1 ${glowStyles[glow]}` : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
