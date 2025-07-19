'use client';

import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, useInView, MotionValue } from 'framer-motion';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface UseCountUpReturn {
  displayValue: MotionValue<string>;
  ref: React.RefObject<HTMLDivElement>;
}

export function useCountUp({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
}: UseCountUpOptions): UseCountUpReturn {
  const ref = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const displayValue = useTransform(count, (v) => {
    const formatted =
      decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString('en-AE');
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, count, target, duration]);

  return { displayValue, ref };
}
