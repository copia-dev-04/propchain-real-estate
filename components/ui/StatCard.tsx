import React from 'react';
import { cn } from '@/lib/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gold';
}

export function StatCard({
  value,
  label,
  trend,
  trendValue,
  icon,
  className,
  variant = 'default',
}: StatCardProps) {
  const variantClasses = {
    default: 'bg-white border border-gray-100 text-navy-700',
    dark: 'bg-navy-700 border border-white/10 text-white',
    gold: 'bg-gradient-gold text-navy-700',
  };

  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up'
      ? 'text-emerald-500'
      : trend === 'down'
      ? 'text-red-500'
      : 'text-gray-400';

  return (
    <div
      className={cn(
        'rounded-2xl p-6 shadow-card',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={cn(
              'text-3xl font-bold font-display',
              variant === 'dark' ? 'text-gold-500' : 'text-navy-700'
            )}
          >
            {value}
          </p>
          <p
            className={cn(
              'mt-1 text-sm font-body',
              variant === 'dark' ? 'text-gray-400' : 'text-gray-500'
            )}
          >
            {label}
          </p>
        </div>
        {icon && (
          <div
            className={cn(
              'p-2.5 rounded-xl',
              variant === 'dark' ? 'bg-white/10' : 'bg-gold-500/10'
            )}
          >
            {icon}
          </div>
        )}
      </div>
      {trend && trendValue && (
        <div className={cn('mt-3 flex items-center gap-1 text-sm', trendColor)}>
          <TrendIcon className="w-4 h-4" aria-hidden="true" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

export default StatCard;
