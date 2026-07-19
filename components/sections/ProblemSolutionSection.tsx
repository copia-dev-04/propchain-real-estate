'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

interface ComparisonItem {
  text: string;
}

const oldWay: ComparisonItem[] = [
  { text: 'High minimums – AED 500K+ required' },
  { text: 'Capital locked for years' },
  { text: 'Opaque, hidden fees' },
  { text: 'Complex legal paperwork' },
  { text: 'Limited market access' },
  { text: 'Manual dividend collection' },
];

const newWay: ComparisonItem[] = [
  { text: 'Start investing from just AED 500' },
  { text: 'Trade your tokens anytime, 24/7' },
  { text: '0.5% transparent platform fee' },
  { text: '5-minute digital KYC process' },
  { text: 'Access Dubai\'s best properties' },
  { text: 'Automated quarterly dividends' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProblemSolutionSection() {
  return (
    <section
      className="py-24 bg-[#F8F7F4] overflow-hidden"
      aria-labelledby="problem-solution-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 text-teal-600 text-sm font-semibold mb-4">
            The PropChain Difference
          </span>
          <h2
            id="problem-solution-heading"
            className="font-display text-4xl md:text-5xl text-navy-700 font-semibold"
          >
            Real estate investing,{' '}
            <span className="text-gold-500">reimagined</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto font-body">
            We&apos;ve eliminated every barrier that kept ordinary investors from accessing
            Dubai&apos;s premium real estate market.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
          {/* Old Way */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Traditional Way
                </p>
                <h3 className="font-display text-xl text-gray-700 font-semibold">
                  Old Real Estate
                </h3>
              </div>
            </div>

            <ul className="space-y-3" role="list">
              {oldWay.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-gray-500 font-body text-sm"
                >
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </span>
                  <span className="line-through decoration-red-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <div className="hidden md:flex w-14 h-14 rounded-full bg-navy-700 border-4 border-gold-500 items-center justify-center shadow-glow">
              <ArrowRight className="w-6 h-6 text-gold-500" />
            </div>
            <div className="md:hidden w-10 h-10 rounded-full bg-navy-700 border-4 border-gold-500 flex items-center justify-center shadow-glow rotate-90">
              <ArrowRight className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-xs font-bold text-navy-700 uppercase tracking-wider hidden md:block">
              PropChain
            </p>
          </motion.div>

          {/* New Way */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            className="bg-navy-700 rounded-3xl p-8 border-2 border-gold-500/30 shadow-card-hover relative overflow-hidden"
          >
            {/* Glow accent */}
            <div
              className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-gold-500" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-500/70">
                  PropChain Way
                </p>
                <h3 className="font-display text-xl text-white font-semibold">Our Platform</h3>
              </div>
            </div>

            <ul className="relative space-y-3" role="list">
              {newWay.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-white/80 font-body text-sm"
                >
                  <span
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Check className="w-3 h-3 text-gold-400" />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/properties"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold px-8 py-4 rounded-xl shadow-glow-sm hover:shadow-glow transition-all"
          >
            Start Investing Today
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <p className="mt-3 text-gray-400 text-sm">
            No minimum commitment • Cancel anytime • VARA Licensed
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSolutionSection;
