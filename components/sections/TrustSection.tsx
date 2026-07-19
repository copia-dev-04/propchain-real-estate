'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, FileCheck, CheckCircle2 } from 'lucide-react';

const partners = [
  { name: 'Emaar', tagline: 'Properties' },
  { name: 'DAMAC', tagline: 'Real Estate' },
  { name: 'Nakheel', tagline: 'Developer' },
  { name: 'Meraas', tagline: 'Holding' },
];

const licenseBadges = [
  { icon: <Shield className="w-5 h-5" aria-hidden="true" />, label: 'VARA Licensed', color: 'text-gold-500' },
  { icon: <FileCheck className="w-5 h-5" aria-hidden="true" />, label: 'SCA Regulated', color: 'text-teal-500' },
  { icon: <CheckCircle2 className="w-5 h-5" aria-hidden="true" />, label: 'UAE Central Bank', color: 'text-blue-400' },
  { icon: <Shield className="w-5 h-5" aria-hidden="true" />, label: 'ISO 27001 Certified', color: 'text-emerald-400' },
];

const securityFeatures = [
  {
    icon: <Lock className="w-5 h-5" aria-hidden="true" />,
    title: '256-bit Encryption',
    description: 'Bank-grade SSL/TLS encryption for all data in transit and at rest.',
  },
  {
    icon: <Key className="w-5 h-5" aria-hidden="true" />,
    title: 'Cold Storage',
    description: '95% of digital assets stored in offline hardware wallets.',
  },
  {
    icon: <Shield className="w-5 h-5" aria-hidden="true" />,
    title: 'Multi-Sig Wallets',
    description: 'All transactions require multiple cryptographic signatures.',
  },
  {
    icon: <FileCheck className="w-5 h-5" aria-hidden="true" />,
    title: 'Regular Audits',
    description: 'Quarterly third-party security and financial audits.',
  },
];

export function TrustSection() {
  return (
    <section className="py-24 bg-navy-700 overflow-hidden" aria-labelledby="trust-heading">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-4">
            Backed by the Best
          </span>
          <h2
            id="trust-heading"
            className="font-display text-4xl md:text-5xl text-white font-semibold"
          >
            Backed by UAE&apos;s{' '}
            <span className="text-gold-500">Premier Partners</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto font-body">
            We work exclusively with the UAE&apos;s most prestigious real estate developers and
            maintain full regulatory compliance across all operations.
          </p>
        </motion.div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/40 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-default"
            >
              <p className="font-display text-3xl font-bold text-white/40 group-hover:text-gold-500 transition-colors duration-300">
                {partner.name}
              </p>
              <p className="text-white/30 text-xs mt-1 group-hover:text-white/50 transition-colors">
                {partner.tagline}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* License badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          aria-label="Regulatory licenses"
        >
          {licenseBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${badge.color}`}>
                {badge.icon}
              </div>
              <p className="text-white font-semibold text-sm">{badge.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="flex-1">
              <h3 className="font-display text-2xl text-white font-semibold mb-2">
                Bank-Grade Security
              </h3>
              <p className="text-white/60 font-body">
                AED 50M+ in transactions with zero security incidents since launch.
              </p>
            </div>
            <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl px-5 py-3 text-center">
              <p className="text-gold-500 font-bold text-2xl">0</p>
              <p className="text-white/60 text-xs mt-0.5">Security Incidents</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/15 flex items-center justify-center text-gold-500 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{feature.title}</p>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustSection;
