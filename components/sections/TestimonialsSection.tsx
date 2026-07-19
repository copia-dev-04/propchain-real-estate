'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  name: string;
  city: string;
  investmentAmount: string;
  quote: string;
  rating: number;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  return: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed Al-Rashidi',
    city: 'Dubai',
    investmentAmount: 'AED 25,000 invested',
    quote:
      "I invested AED 25,000 across 3 properties and have already received my second dividend payment. PropChain makes luxury real estate accessible to everyone. The platform is incredibly intuitive and the transparency is remarkable.",
    rating: 5,
    initials: 'AA',
    gradientFrom: 'from-gold-600',
    gradientTo: 'to-gold-800',
    return: '8.4% return',
  },
  {
    name: 'Sarah Chen',
    city: 'Abu Dhabi',
    investmentAmount: 'AED 50,000 invested',
    quote:
      "The transparency is unmatched. I can track my investment in real-time and see exactly where my rental income comes from. Earned 8.7% last year — better than any savings account or traditional fund I've tried.",
    rating: 5,
    initials: 'SC',
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-teal-800',
    return: '8.7% return',
  },
  {
    name: 'Khalid Mansour',
    city: 'Sharjah',
    investmentAmount: 'AED 5,000 invested',
    quote:
      "Started with just AED 1,000 to test the platform. Now I have a portfolio of 5 properties worth AED 5,000. The onboarding was seamless, KYC took 4 minutes, and my first dividend arrived exactly as scheduled. This is the future of real estate investing.",
    rating: 5,
    initials: 'KM',
    gradientFrom: 'from-navy-500',
    gradientTo: 'to-navy-700',
    return: '9.1% return',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-gold-500 text-gold-500"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section
      className="py-24 bg-[#F8F7F4] overflow-hidden"
      aria-labelledby="testimonials-heading"
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
            Investor Stories
          </span>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl md:text-5xl text-navy-700 font-semibold"
          >
            2,400+ investors{' '}
            <span className="text-gold-500">already earning</span>
          </h2>
        </motion.div>

        {/* Desktop 3-grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card flex flex-col"
            >
              <Quote
                className="w-8 h-8 text-gold-500/30 mb-4"
                aria-hidden="true"
              />
              <p className="font-body text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center shrink-0',
                    t.gradientFrom,
                    t.gradientTo
                  )}
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-sm">{t.initials}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-700 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.city}</p>
                  <StarRating rating={t.rating} />
                </div>

                <div className="bg-gold-500/10 rounded-lg px-3 py-1.5 text-right shrink-0">
                  <p className="text-gold-600 font-bold text-xs">{t.return}</p>
                  <p className="text-gray-400 text-xs">{t.investmentAmount}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card"
            >
              <Quote className="w-8 h-8 text-gold-500/30 mb-4" aria-hidden="true" />
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center shrink-0',
                    testimonials[activeIndex].gradientFrom,
                    testimonials[activeIndex].gradientTo
                  )}
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-sm">{testimonials[activeIndex].initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-700 text-sm">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-400 text-xs">{testimonials[activeIndex].city}</p>
                  <StarRating rating={testimonials[activeIndex].rating} />
                </div>
                <div className="bg-gold-500/10 rounded-lg px-3 py-1.5 text-right shrink-0">
                  <p className="text-gold-600 font-bold text-xs">{testimonials[activeIndex].return}</p>
                  <p className="text-gray-400 text-xs">{testimonials[activeIndex].investmentAmount}</p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Mobile controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border-2 border-navy-700/20 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    i === activeIndex ? 'bg-gold-500 w-6' : 'bg-gray-300'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border-2 border-navy-700/20 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
