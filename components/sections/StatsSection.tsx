'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Wallet, Trophy } from 'lucide-react';

const stats = [
  {
    num: '01',
    label: 'Total Assets Funded',
    value: 'AED 50M+',
    description: 'Premier properties tokenized and funded on the PropChain protocol.',
    icon: Wallet,
    accentType: 'gold' as const,
    colSpan: 'lg:col-span-2',
  },
  {
    num: '02',
    label: 'Annual Yield',
    value: '8.5%',
    description: 'Average returns across our active investor portfolio.',
    icon: TrendingUp,
    accentType: 'indigo' as const,
    colSpan: 'lg:col-span-1',
  },
  {
    num: '03',
    label: 'Global Investors',
    value: '2,400+',
    description: 'Verified investors from 45+ countries accessing UAE real estate.',
    icon: Users,
    accentType: 'gold' as const,
    colSpan: 'lg:col-span-1',
  },
  {
    num: '04',
    label: 'Market Authority',
    value: 'VARA',
    description: 'Fully licensed by Dubai\'s Virtual Asset Regulatory Authority.',
    icon: Trophy,
    accentType: 'indigo' as const,
    colSpan: 'lg:col-span-2',
  },
];

export function StatsSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #03031a 50%, #020617 100%)' }}
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 pattern-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), rgba(212,175,55,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), rgba(99,102,241,0.15), transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] blur-[130px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)' }} />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            <span className="section-label-gold">Institutional Power</span>
          </div>
          <h2 className="font-outfit font-black text-4xl md:text-5xl text-white tracking-tighter">
            Market{' '}
            <span style={{
              background: 'linear-gradient(135deg, #D4AF37, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Statistics
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={stat.colSpan}
            >
              <div
                className="group h-full relative p-7 xl:p-8 rounded-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
                style={{
                  background: 'rgba(8, 8, 24, 0.8)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    stat.accentType === 'gold' ? 'rgba(212,175,55,0.2)' : 'rgba(99,102,241,0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                {/* Hover background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: stat.accentType === 'gold'
                      ? 'radial-gradient(ellipse at top right, rgba(212,175,55,0.06) 0%, transparent 60%)'
                      : 'radial-gradient(ellipse at top right, rgba(99,102,241,0.07) 0%, transparent 60%)',
                  }}
                />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Icon + number row */}
                  <div className="flex justify-between items-start">
                    <div
                      className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: stat.accentType === 'gold' ? 'rgba(212,175,55,0.1)' : 'rgba(99,102,241,0.1)',
                        border: `1px solid ${stat.accentType === 'gold' ? 'rgba(212,175,55,0.15)' : 'rgba(99,102,241,0.15)'}`,
                      }}
                    >
                      <stat.icon
                        className="w-6 h-6"
                        style={{ color: stat.accentType === 'gold' ? '#D4AF37' : '#818cf8' }}
                      />
                    </div>
                    <span className="feature-number"
                      style={{ color: stat.accentType === 'gold' ? 'rgba(212,175,55,0.3)' : 'rgba(99,102,241,0.3)' }}>
                      {stat.num}
                    </span>
                  </div>

                  {/* Value + label */}
                  <div>
                    <h3 className="text-white/30 font-black uppercase tracking-[0.15em] text-[9px] mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-white text-4xl md:text-5xl font-black tracking-tighter mb-3 stat-value">
                      {stat.value}
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed max-w-[280px] font-outfit">
                      {stat.description}
                    </p>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="mt-6 flex items-end gap-1 h-10 relative z-10">
                  {[35, 55, 42, 68, 52, 80, 62, 88, 72, 100].map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 + idx * 0.04, ease: 'easeOut' }}
                      className="flex-1 rounded-sm origin-bottom transition-colors duration-300"
                      style={{
                        height: `${height * 0.38}px`,
                        background: stat.accentType === 'gold'
                          ? `rgba(212,175,55,${0.08 + (height / 100) * 0.2})`
                          : `rgba(99,102,241,${0.1 + (height / 100) * 0.25})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
