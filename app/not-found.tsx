import React from 'react';

export const metadata = {
  title: '404 – Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6">
      {/* Fine grid */}
      <div className="absolute inset-0 pattern-grid-fine opacity-30 pointer-events-none" />

      {/* Dual glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.5) 0%, rgba(99,102,241,0.3) 60%, transparent 80%)' }}
      />

      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Large 404 background text */}
        <div
          className="font-outfit font-black select-none pointer-events-none leading-none mb-0"
          style={{
            fontSize: 'clamp(120px, 20vw, 220px)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(99,102,241,0.06))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>

        <div style={{ marginTop: '-2rem' }}>
          <p
            className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            style={{ color: 'rgba(99,102,241,0.6)' }}
          >
            Page Not Found
          </p>

          <h1 className="font-outfit font-black text-3xl md:text-4xl text-white tracking-tight mb-4">
            This property doesn&apos;t exist.
          </h1>

          <p className="text-white/40 text-sm font-outfit leading-relaxed max-w-sm mx-auto mb-10">
            The page you&apos;re looking for has moved, been removed, or never existed. Let&apos;s get you back to browsing Dubai&apos;s finest assets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/properties"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-outfit font-bold text-sm text-obsidian-950 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F0CA2A 60%, #818cf8)' }}
            >
              Browse Properties
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-outfit font-semibold text-sm text-white/70 hover:text-white rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
