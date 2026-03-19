export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Animated logo mark */}
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-xl rotate-45 animate-spin"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #6366f1 100%)',
              padding: '2px',
              animationDuration: '1.5s',
            }}
          >
            <div className="w-full h-full rounded-[9px] bg-obsidian-950" />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center font-outfit font-black text-sm"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PC
          </div>
        </div>

        {/* Loading bar */}
        <div
          className="w-32 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="h-full rounded-full animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, #6366f1, transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        <p
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          PropChain
        </p>
      </div>
    </div>
  );
}
