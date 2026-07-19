'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wallet, UserCheck, TrendingUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Search className="w-6 h-6" aria-hidden="true" />,
    title: 'Browse Curated Properties',
    description: 'Explore our vetted selection of premium Dubai properties across all districts.',
    detail:
      'Our expert team evaluates hundreds of properties each quarter, selecting only those that meet our strict criteria: prime locations, strong rental demand, reputable developers, and compelling yield projections. Every property comes with full due diligence reports, financial projections, and transparent fee disclosures.',
  },
  {
    number: 2,
    icon: <Wallet className="w-6 h-6" aria-hidden="true" />,
    title: 'Choose Your Amount',
    description: 'Invest from as little as AED 500 across one or multiple properties.',
    detail:
      'Each AED 1,000 invested equals one property token, representing fractional ownership. You can diversify across multiple properties to spread risk. Tokens are issued on a regulated blockchain, ensuring transparent, immutable records of your ownership. Top up your investment wallet instantly via bank transfer, credit card, or crypto.',
  },
  {
    number: 3,
    icon: <UserCheck className="w-6 h-6" aria-hidden="true" />,
    title: 'Complete Digital KYC',
    description: 'AI-powered identity verification takes just 5 minutes to complete.',
    detail:
      'Our streamlined KYC process is powered by industry-leading AI. Simply scan your Emirates ID or passport, take a selfie, and our system verifies your identity instantly. Full compliance with UAE AML/KYC regulations, VARA requirements, and international standards. Your data is encrypted and stored securely in UAE data centers.',
  },
  {
    number: 4,
    icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
    title: 'Earn & Trade Anytime',
    description: 'Receive quarterly rental dividends and trade tokens on our secondary market.',
    detail:
      'Rental income is collected, managed, and automatically distributed to token holders every quarter. You can also list your tokens on our secondary marketplace for instant liquidity — no need to wait for a buyer. Track your portfolio performance, dividend history, and property valuations in real-time through your dashboard.',
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const toggleStep = (n: number) => {
    setActiveStep((prev) => (prev === n ? null : n));
  };

  return (
    <section
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-1.5 text-gold-600 text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="font-display text-4xl md:text-5xl text-navy-700 font-semibold"
          >
            Start earning in{' '}
            <span className="text-gold-500">4 simple steps</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto font-body">
            From browsing to earning — our streamlined process gets you invested in premium
            Dubai real estate faster than you&apos;d believe.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Step numbers + connecting lines */}
          <div className="relative flex justify-between items-center mb-12 px-8">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100 mx-16" aria-hidden="true">
              <motion.div
                className="h-full bg-gold-500 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.button
                key={step.number}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                onClick={() => toggleStep(step.number)}
                aria-expanded={activeStep === step.number}
                aria-label={`Step ${step.number}: ${step.title}`}
                className={cn(
                  'relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-2xl transition-all duration-300',
                  activeStep === step.number
                    ? 'bg-gold-500 text-navy-700 shadow-glow scale-110'
                    : 'bg-navy-700 text-gold-500 border-2 border-gold-500/40 hover:border-gold-500 hover:shadow-glow-sm'
                )}
              >
                {step.number}
              </motion.button>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                className={cn(
                  'rounded-2xl p-6 cursor-pointer border-2 transition-all duration-300',
                  activeStep === step.number
                    ? 'bg-navy-700 border-gold-500 shadow-card-hover'
                    : 'bg-gray-50 border-transparent hover:border-gold-500/30 hover:bg-white'
                )}
                onClick={() => toggleStep(step.number)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleStep(step.number)}
                aria-expanded={activeStep === step.number}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                    activeStep === step.number ? 'bg-gold-500/20 text-gold-500' : 'bg-navy-700/10 text-navy-700'
                  )}
                >
                  {step.icon}
                </div>
                <h3
                  className={cn(
                    'font-display text-xl font-semibold mb-2',
                    activeStep === step.number ? 'text-white' : 'text-navy-700'
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    'font-body text-sm leading-relaxed',
                    activeStep === step.number ? 'text-white/70' : 'text-gray-500'
                  )}
                >
                  {step.description}
                </p>

                {/* Expanded detail */}
                <AnimatePresence>
                  {activeStep === step.number && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pt-4 border-t border-white/10 text-white/60 text-sm font-body leading-relaxed">
                        {step.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <div
                  className="absolute left-7 top-14 bottom-0 w-0.5 bg-gold-500/20"
                  aria-hidden="true"
                />
              )}

              <button
                onClick={() => toggleStep(step.number)}
                aria-expanded={activeStep === step.number}
                className="w-full flex items-start gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-2xl"
              >
                <div
                  className={cn(
                    'shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl transition-all z-10 relative',
                    activeStep === step.number
                      ? 'bg-gold-500 text-navy-700 shadow-glow'
                      : 'bg-navy-700 text-gold-500 border-2 border-gold-500/40'
                  )}
                >
                  {step.number}
                </div>

                <div
                  className={cn(
                    'flex-1 rounded-2xl p-5 border-2 transition-all',
                    activeStep === step.number
                      ? 'bg-navy-700 border-gold-500'
                      : 'bg-gray-50 border-transparent'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center mb-2',
                          activeStep === step.number ? 'text-gold-500' : 'text-navy-700'
                        )}
                      >
                        {step.icon}
                      </div>
                      <h3
                        className={cn(
                          'font-display text-lg font-semibold',
                          activeStep === step.number ? 'text-white' : 'text-navy-700'
                        )}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          'text-sm mt-1 font-body',
                          activeStep === step.number ? 'text-white/70' : 'text-gray-500'
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 transition-transform shrink-0 ml-3',
                        activeStep === step.number
                          ? 'rotate-180 text-gold-500'
                          : 'text-gray-400'
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <AnimatePresence>
                    {activeStep === step.number && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-white/10 text-white/60 text-sm font-body leading-relaxed overflow-hidden"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
