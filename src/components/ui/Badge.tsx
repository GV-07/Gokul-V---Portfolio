import React, { ReactNode } from 'react';

export type BadgeVariant = 'cyan' | 'indigo' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  icon,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm transition-colors ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
