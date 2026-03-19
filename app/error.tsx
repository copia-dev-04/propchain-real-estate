'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[PropChain] Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6">
      {/* Fine grid */}
      <div className="absolute inset-0 pattern-grid-fine opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6), transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          <AlertTriangle className="w-8 h-8" style={{ color: '#818cf8' }} />
        </div>

        {/* Error code */}
        <p
          className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
          style={{ color: 'rgba(99,102,241,0.6)' }}
        >
          Something went wrong
        </p>

        <h1 className="font-outfit font-black text-3xl text-white tracking-tight mb-3">
          Unexpected Error
        </h1>

        <p className="text-white/40 text-sm font-outfit leading-relaxed mb-2">
          An unexpected error occurred. Our team has been notified.
        </p>

        {error.digest && (
          <p className="text-white/20 text-xs font-mono mb-8">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 font-outfit font-bold text-sm text-obsidian-950 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F0CA2A)' }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 font-outfit font-semibold text-sm text-white/70 hover:text-white rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Home className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
