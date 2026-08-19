import React from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'gold' | 'teal' | 'navy' | 'success' | 'warning' | 'danger' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-gold-500/15 text-gold-600 border border-gold-500/30',
  teal: 'bg-teal-500/15 text-teal-600 border border-teal-500/30',
  navy: 'bg-navy-700/10 text-navy-700 border border-navy-700/20',
  success: 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30',
  warning: 'bg-amber-500/15 text-amber-700 border border-amber-500/30',
  danger: 'bg-red-500/15 text-red-700 border border-red-500/30',
  gray: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
};

export function Badge({
  variant = 'gold',
  children,
  className,
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full font-body tracking-wide uppercase',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
