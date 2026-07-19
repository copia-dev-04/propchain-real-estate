'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Lock } from 'lucide-react';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="cta-heading"
      style={{ background: 'linear-gradient(160deg, #04040f 0%, #0a0820 40%, #080616 70%, #020617 100%)' }}
    >
      {/* Fine grid */}
      <div className="absolute inset-0 pattern-grid-fine opacity-50 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)' }} />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(212,175,55,0.4), transparent)' }} />

      <div className="container-xl relative z-10 py-28">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#D4AF37' }} />
              <span className="section-label-gold">Limited Allocation Open</span>
            </div>

            {/* Headline */}
            <h2
              id="cta-heading"
              className="font-outfit font-black text-5xl md:text-6xl xl:text-7xl text-white leading-[0.92] tracking-tighter mb-8"
            >
              Build your{' '}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #F0CA2A 0%, #D4AF37 30%, #818cf8 70%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                property empire
              </span>
              <br />
              from AED 500.
            </h2>

            <p className="text-white/45 text-base font-outfit leading-relaxed mb-10 max-w-md">
              Join 2,400+ investors already earning from Dubai&apos;s premium real estate market. VARA-licensed, blockchain-settled, instantly liquid.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'AED 50M+', label: 'Funded', color: '#D4AF37' },
                { value: '8.5%', label: 'Avg Yield', color: '#818cf8' },
                { value: '2,400+', label: 'Investors', color: '#D4AF37' },
              ].map((stat) => (
                <div key={stat.label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="font-black text-2xl stat-value mb-0.5" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Compliance row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {['VARA Licensed', 'SCA Regulated', 'ISO 27001'].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3" style={{ color: 'rgba(99,102,241,0.6)' }} />
                  <span className="text-white/30 text-xs font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Sign-up Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-3xl p-8 xl:p-10"
              style={{
                background: 'rgba(8, 8, 25, 0.7)',
                backdropFilter: 'blur(32px)',
                border: '1px solid rgba(99,102,241,0.15)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Form header */}
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
                  style={{ color: 'rgba(99,102,241,0.7)' }}>
                  Start Investing
                </p>
                <h3 className="font-outfit font-black text-2xl text-white leading-tight">
                  Get early access to{' '}
                  <span className="text-gradient-gold">premium assets</span>
                </h3>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 rounded-2xl px-6 py-5"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-white font-black">You&apos;re on the list!</p>
                    <p className="text-white/50 text-sm">We&apos;ll be in touch within 24 hours.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Get started with PropChain" className="space-y-4">
                  <div>
                    <label htmlFor="cta-email" className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2">
                      Email Address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-5 py-3.5 font-outfit text-sm text-white placeholder-white/20 rounded-xl outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(99,102,241,0.5)';
                        e.target.style.background = 'rgba(99,102,241,0.06)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 font-outfit font-black text-sm text-obsidian-950 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F0CA2A 60%, #818cf8 100%)',
                      boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
                    }}
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              )}

              {/* Trust micro-copy */}
              <div className="mt-6 pt-5 border-t space-y-2.5"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {[
                  { icon: TrendingUp, text: 'No minimum commitment — invest from AED 500' },
                  { icon: Lock, text: 'Bank-grade 256-bit AES encryption' },
                  { icon: Shield, text: 'VARA License #VA-2024-001 — fully regulated' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(99,102,241,0.6)' }} />
                    <span className="text-white/35 text-xs font-outfit">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
