'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Wallet,
  UserCheck,
  TrendingUp,
  ChevronDown,
  Play,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { cn } from '@/lib/utils/cn';

const steps = [
  {
    number: 1,
    icon: <Search className="w-8 h-8" aria-hidden="true" />,
    title: 'Browse Curated Properties',
    shortDesc: 'Explore vetted Dubai properties with full due diligence.',
    fullDesc:
      'Our dedicated real estate team evaluates hundreds of properties each quarter. Only those meeting our strict criteria — prime locations, strong rental yields, reputable developers, and compelling risk-return profiles — make it onto the platform. Every listing comes with full due diligence reports, independent valuations, financial projections, and transparent fee disclosures. There are no hidden fees and no surprises.',
    steps: [
      'Browse our curated selection of 6+ live properties',
      'Filter by type, location, yield, and minimum investment',
      'Review due diligence reports and financial projections',
      'Compare properties to build your ideal portfolio',
    ],
  },
  {
    number: 2,
    icon: <Wallet className="w-8 h-8" aria-hidden="true" />,
    title: 'Choose Your Investment Amount',
    shortDesc: 'Invest from as little as AED 500 across one or more properties.',
    fullDesc:
      'Each AED 1,000 you invest equals one property token, representing your fractional ownership stake. You can start with just AED 500 and diversify across multiple properties to spread risk. Tokens are issued on a regulated blockchain, ensuring transparent, immutable records of your ownership. Fund your investment wallet instantly via bank transfer, credit card, or approved cryptocurrency.',
    steps: [
      'Select your investment amount (from AED 500)',
      'Choose single or multi-property diversification',
      'Fund your wallet via bank transfer, card, or crypto',
      'Review and confirm your investment allocation',
    ],
  },
  {
    number: 3,
    icon: <UserCheck className="w-8 h-8" aria-hidden="true" />,
    title: 'Complete Digital KYC',
    shortDesc: 'AI-powered identity verification in just 5 minutes.',
    fullDesc:
      'Our streamlined KYC process is powered by industry-leading AI technology. Simply scan your Emirates ID or passport, take a quick selfie for facial recognition, and answer a few questions about your investment experience. Our system verifies your identity in real-time. Full compliance with UAE AML/KYC regulations, VARA requirements, and international FATF standards. Your personal data is encrypted and stored exclusively in UAE data centers.',
    steps: [
      'Scan your Emirates ID or international passport',
      'Complete facial recognition verification (30 seconds)',
      'Answer investor suitability questions',
      'Receive instant approval and start investing',
    ],
  },
  {
    number: 4,
    icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />,
    title: 'Earn Returns & Trade Anytime',
    shortDesc: 'Receive quarterly dividends and trade on our secondary market.',
    fullDesc:
      'Once invested, you start earning immediately. Rental income is collected by our professional property management partners, calculated proportionally to your token holding, and automatically distributed to your PropChain wallet every quarter. You can reinvest dividends or withdraw to your bank account at any time. Our secondary marketplace allows you to list your tokens for sale at any time, providing liquidity that traditional real estate simply cannot offer.',
    steps: [
      'Monitor your portfolio in real-time on your dashboard',
      'Receive quarterly rental income dividends automatically',
      'Track capital appreciation as property values grow',
      'Trade tokens on the secondary market for instant liquidity',
    ],
  },
];

const faqs = [
  {
    q: 'What is real estate tokenization?',
    a: 'Real estate tokenization converts property ownership rights into digital tokens on a blockchain. Each token represents a fraction of the property. This allows investors to own a percentage of high-value real estate with a small capital outlay, while enjoying all the benefits: rental income, capital appreciation, and liquidity.',
  },
  {
    q: 'How are returns calculated and distributed?',
    a: 'Returns come from two sources: rental income (distributed quarterly) and capital appreciation (realized when tokens are sold at a higher price). Rental income is collected by our management partners, net of property costs, and automatically distributed proportionally to token holders. You can monitor all income in real-time on your dashboard.',
  },
  {
    q: 'Is PropChain licensed and regulated?',
    a: "Yes. PropChain holds a full Virtual Assets Service Provider (VASP) license from the UAE's Virtual Assets Regulatory Authority (VARA), and operates under oversight of the Securities and Commodities Authority (SCA). We are one of the few fully licensed real estate tokenization platforms in the UAE.",
  },
  {
    q: 'How does the KYC process work?',
    a: 'Our AI-powered KYC takes approximately 5 minutes. You\'ll need a valid Emirates ID or passport, a smartphone camera, and a few minutes of your time. The process involves document scanning, facial recognition, and investor suitability questions. Approval is typically instant. You only need to complete KYC once.',
  },
  {
    q: 'What is the secondary market?',
    a: 'The PropChain secondary market is a peer-to-peer trading platform where investors can buy and sell property tokens at any time. This gives you liquidity that traditional real estate lacks — you don\'t need to wait for a property sale to exit your investment. Trading is 24/7 with near-instant settlement via blockchain.',
  },
  {
    q: 'What happens if a property doesn\'t generate the projected yield?',
    a: 'We set conservative, evidence-based yield projections based on comparable properties, current rental market data, and independent valuations. While we cannot guarantee specific returns, we publish full due diligence reports and update investors with quarterly performance reports. If rental income falls, dividends adjust proportionally — full transparency at all times.',
  },
  {
    q: 'What are the fees?',
    a: 'PropChain charges a transparent 0.5% platform fee on investments and a 0.5% fee on secondary market trades. There are no hidden charges. Annual management fees for the underlying properties (typically 8-10% of rental income) are deducted before dividend distribution and are fully disclosed in each property\'s prospectus.',
  },
  {
    q: 'What is the minimum and maximum investment?',
    a: "The minimum investment is AED 500 per transaction. There is no maximum investment limit — sophisticated investors and family offices regularly invest AED 1M+ through the platform. You can invest across multiple properties to diversify. Note that certain high-value opportunities may have professional investor requirements under UAE securities regulations.",
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-gradient-hero pt-32 pb-20" aria-labelledby="hiw-heading">
          <div className="container-xl text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-6">
                Getting Started
              </span>
              <h1
                id="hiw-heading"
                className="font-display text-5xl md:text-6xl text-white font-semibold mb-6"
              >
                How{' '}
                <span className="text-gold-500">PropChain</span>{' '}
                Works
              </h1>
              <p className="font-body text-white/70 text-lg leading-relaxed">
                From browsing to earning — get invested in premium Dubai real estate in as little as
                15 minutes. Here&apos;s exactly how it works.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Detailed steps */}
        <section className="py-20 bg-[#F8F7F4]" aria-labelledby="steps-heading">
          <div className="container-xl max-w-5xl mx-auto">
            <h2 id="steps-heading" className="sr-only">Investment Process Steps</h2>
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={cn(
                    'grid md:grid-cols-2 gap-8 items-center',
                    i % 2 === 1 && 'md:grid-flow-dense'
                  )}
                >
                  {/* Text */}
                  <div className={cn(i % 2 === 1 && 'md:col-start-2')}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center text-navy-700 font-display font-bold text-2xl shadow-glow-sm">
                        {step.number}
                      </div>
                      <div>
                        <p className="text-gold-600 text-xs font-semibold uppercase tracking-wider">Step {step.number}</p>
                        <h3 className="font-display text-2xl text-navy-700 font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 font-body leading-relaxed mb-6">{step.fullDesc}</p>
                    <ul className="space-y-2">
                      {step.steps.map((s) => (
                        <li key={s} className="flex items-start gap-3 text-gray-600 text-sm font-body">
                          <span className="w-5 h-5 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual card */}
                  <div className={cn(i % 2 === 1 && 'md:col-start-1 md:row-start-1')}>
                    <div className="bg-navy-700 rounded-3xl p-8 flex flex-col items-center justify-center h-64 relative overflow-hidden">
                      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden="true" />
                      <div className="relative z-10 w-20 h-20 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-4">
                        {step.icon}
                      </div>
                      <p className="relative z-10 text-white font-display text-xl font-semibold text-center">{step.shortDesc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video placeholder */}
        <section className="py-20 bg-navy-700" aria-labelledby="video-heading">
          <div className="container-xl max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 id="video-heading" className="font-display text-4xl text-white font-semibold mb-4">
                See It In Action
              </h2>
              <p className="text-white/60 font-body mb-10">
                Watch our 3-minute platform walkthrough to see how easy it is to get started.
              </p>
              <div className="relative bg-navy-800 rounded-3xl overflow-hidden border border-white/10 aspect-video flex items-center justify-center group cursor-pointer hover:border-gold-500/40 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-teal-500/5" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:scale-105 transition-all shadow-glow">
                    <Play className="w-8 h-8 text-gold-500 group-hover:text-navy-700 fill-current ml-1" aria-hidden="true" />
                  </div>
                  <p className="text-white/60 text-sm font-body">Platform Walkthrough · 3 min</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-[#F8F7F4]" aria-labelledby="faq-heading">
          <div className="container-xl max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 id="faq-heading" className="font-display text-4xl text-navy-700 font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 font-body">
                Everything you need to know about real estate tokenization and PropChain.
              </p>
            </motion.div>

            <div className="space-y-3" role="list">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  role="listitem"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-navy-700 font-body pr-4">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200',
                        openFaq === i && 'rotate-180 text-gold-500'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                          <p className="text-gray-600 font-body text-sm leading-relaxed pt-4">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-navy-700" aria-labelledby="hiw-cta-heading">
          <div className="container-xl text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                id="hiw-cta-heading"
                className="font-display text-4xl text-white font-semibold mb-4"
              >
                Ready to start investing?
              </h2>
              <p className="text-white/70 font-body text-lg mb-8">
                Join thousands of UAE investors already earning from Dubai&apos;s finest properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-700 font-semibold px-8 py-4 rounded-xl shadow-glow hover:shadow-glow transition-all"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all"
                >
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  Create Free Account
                </a>
              </div>
              <p className="mt-4 text-white/40 text-sm">
                Takes less than 15 minutes · VARA Licensed · No minimum commitment
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
