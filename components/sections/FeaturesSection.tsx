'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coins, RefreshCw, Zap, Shield, UserCheck, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Feature {
  num: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  accentType: 'gold' | 'indigo';
}

const features: Feature[] = [
  {
    num: '01',
    icon: <Coins className="w-6 h-6" aria-hidden="true" />,
    title: 'Ultra-Low Entry',
    description:
      'Start your Dubai real estate portfolio from AED 500. No large capital, no legacy barriers — just fractional ownership at scale.',
    accentType: 'gold',
  },
  {
    num: '02',
    icon: <RefreshCw className="w-6 h-6" aria-hidden="true" />,
    title: '24/7 Token Trading',
    description:
      'Blockchain-settled secondary market with instant T+0 clearing. Buy and sell property tokens at any hour, on any day.',
    accentType: 'indigo',
  },
  {
    num: '03',
    icon: <Zap className="w-6 h-6" aria-hidden="true" />,
    title: 'Automated Dividends',
    description:
      'Quarterly rental income calculated on-chain and distributed directly to your wallet. Zero manual reconciliation.',
    accentType: 'gold',
  },
  {
    num: '04',
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: 'VARA Compliant',
    description:
      "Fully regulated by Dubai's Virtual Assets Regulatory Authority with SCA oversight — the gold standard for UAE investors.",
    accentType: 'indigo',
  },
  {
    num: '05',
    icon: <UserCheck className="w-6 h-6" aria-hidden="true" />,
    title: 'Instant KYC',
    description:
      'AI-powered identity verification clears you for investment in under 5 minutes. Enterprise-grade AML screening included.',
    accentType: 'gold',
  },
  {
    num: '06',
    icon: <BarChart3 className="w-6 h-6" aria-hidden="true" />,
    title: 'Full Transparency',
    description:
      'On-chain ownership records, real-time NAV reporting, and quarterly audited financials give you institutional-grade visibility.',
    accentType: 'indigo',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #05051a 50%, #020617 100%)' }}
      aria-labelledby="features-heading"
    >
      {/* Fine grid overlay */}
      <div className="absolute inset-0 pattern-grid-fine opacity-60 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.06)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(212,175,55,0.05)' }} />

      <div className="container-xl relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          {/* Overline */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent" />
            <span className="section-label">Why PropChain</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="features-heading"
              className="font-outfit font-black text-4xl md:text-5xl xl:text-6xl text-white leading-[1.05] tracking-tighter max-w-2xl"
            >
              Built for the{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #818cf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                institutional
              </span>
              {' '}investor.
            </h2>

            <p className="text-white/40 text-sm font-outfit leading-relaxed max-w-xs lg:text-right">
              Every feature engineered for sophisticated UAE investors — from regulatory compliance to real-time portfolio analytics.
            </p>
          </div>

          {/* Separator */}
          <div className="mt-10 h-px w-full"
            style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.3), rgba(212,175,55,0.2), transparent)' }} />
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(99,102,241,0.08)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-8 xl:p-10 transition-all duration-500"
              style={{ background: '#020617' }}
            >
              {/* Hover bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: feature.accentType === 'gold'
                    ? 'radial-gradient(ellipse at 0% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)',
                }} />

              {/* Number label */}
              <p className="feature-number mb-5"
                style={{ color: feature.accentType === 'gold' ? 'rgba(212,175,55,0.4)' : 'rgba(99,102,241,0.4)' }}>
                {feature.num}
              </p>

              {/* Icon */}
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500',
                  'group-hover:scale-110'
                )}
                style={{
                  background: feature.accentType === 'gold'
                    ? 'rgba(212,175,55,0.1)'
                    : 'rgba(99,102,241,0.1)',
                  color: feature.accentType === 'gold' ? '#D4AF37' : '#818cf8',
                  border: `1px solid ${feature.accentType === 'gold' ? 'rgba(212,175,55,0.2)' : 'rgba(99,102,241,0.2)'}`,
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="font-outfit font-black text-lg text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-outfit">
                {feature.description}
              </p>

              {/* Bottom accent line (on hover) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{
                  background: feature.accentType === 'gold'
                    ? 'linear-gradient(90deg, #D4AF37, transparent)'
                    : 'linear-gradient(90deg, #6366f1, transparent)',
                }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: 'AED 500', label: 'Minimum Investment' },
            { value: 'T+0', label: 'Settlement Speed' },
            { value: '< 5 min', label: 'KYC Verification' },
            { value: 'ISO 27001', label: 'Security Certified' },
          ].map((item) => (
            <div key={item.label}
              className="rounded-xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-black text-xl text-white stat-value mb-1">{item.value}</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
