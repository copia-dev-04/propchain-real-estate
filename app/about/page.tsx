'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Target, Eye, Heart, Shield, Zap, Users } from 'lucide-react';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';

const team = [
  {
    name: 'Omar Al-Farsi',
    title: 'Chief Executive Officer',
    bio: '15+ years in UAE real estate. Former MD at Emaar Properties. MBA from INSEAD.',
    initials: 'OA',
    gradient: 'from-gold-600 to-gold-800',
    linkedin: '#',
  },
  {
    name: 'Dr. Priya Menon',
    title: 'Chief Technology Officer',
    bio: 'Blockchain architect. Ex-Consensys. PhD in Distributed Systems from MIT.',
    initials: 'PM',
    gradient: 'from-teal-600 to-teal-800',
    linkedin: '#',
  },
  {
    name: 'James Whitfield',
    title: 'Head of Real Estate',
    bio: '20+ years in MENA property markets. Former Director at Knight Frank Dubai.',
    initials: 'JW',
    gradient: 'from-navy-500 to-navy-700',
    linkedin: '#',
  },
  {
    name: 'Fatima Al-Zahra',
    title: 'Head of Legal & Compliance',
    bio: 'VARA regulatory expert. Previously led compliance at a top UAE digital bank.',
    initials: 'FA',
    gradient: 'from-purple-600 to-purple-800',
    linkedin: '#',
  },
];

const timeline = [
  {
    year: '2022',
    title: 'Founded in Dubai',
    description:
      'PropChain was incorporated in Dubai with a mission to democratize UAE real estate investment through blockchain technology.',
  },
  {
    year: '2023',
    title: 'VARA License Obtained',
    description:
      'Became one of the first UAE platforms to receive full VARA licensing for tokenized real estate securities. Closed $3M seed round.',
  },
  {
    year: '2023',
    title: 'First Property Tokenized',
    description:
      'Successfully tokenized a landmark AED 4.5M Palm Jumeirah villa, with 300+ investors participating in the first 48 hours.',
  },
  {
    year: '2024',
    title: 'AED 50M Milestone',
    description:
      'Reached AED 50M+ in total tokenized real estate assets. Secondary market launched, enabling 24/7 token trading for investors.',
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6" aria-hidden="true" />,
    title: 'Accessibility',
    description: 'We believe premium real estate investment should be accessible to everyone, not just the ultra-wealthy.',
  },
  {
    icon: <Eye className="w-6 h-6" aria-hidden="true" />,
    title: 'Transparency',
    description: 'Every fee, every return, every decision — fully disclosed and verifiable on-chain.',
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: 'Security',
    description: 'Bank-grade security with full regulatory compliance. Your investment is protected at every level.',
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden="true" />,
    title: 'Innovation',
    description: 'Pioneering the intersection of real estate, blockchain, and DeFi for the UAE market.',
  },
  {
    icon: <Heart className="w-6 h-6" aria-hidden="true" />,
    title: 'Investor First',
    description: 'Every product decision starts with: how does this benefit our investors?',
  },
  {
    icon: <Users className="w-6 h-6" aria-hidden="true" />,
    title: 'Community',
    description: 'Building a community of informed, empowered real estate investors across the UAE and GCC.',
  },
];

const pressItems = [
  { outlet: 'Gulf News', headline: 'PropChain reaches AED 50M in tokenized real estate' },
  { outlet: 'Arabian Business', headline: 'How PropChain is disrupting UAE real estate investment' },
  { outlet: 'Khaleej Times', headline: 'VARA-licensed platform democratizes Dubai property ownership' },
  { outlet: 'Forbes Middle East', headline: 'The startup making Dubai real estate accessible from AED 500' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-gradient-hero pt-32 pb-20" aria-labelledby="about-heading">
          <div className="container-xl text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-6">
                Our Story
              </span>
              <h1
                id="about-heading"
                className="font-display text-5xl md:text-6xl text-white font-semibold mb-6"
              >
                Democratizing{' '}
                <span className="text-gold-500">UAE Real Estate</span>
              </h1>
              <p className="font-body text-white/70 text-lg leading-relaxed">
                We founded PropChain with a single belief: that every investor in the UAE deserves
                access to the same premium real estate opportunities that were previously reserved
                for the ultra-wealthy. Through blockchain technology and regulatory innovation,
                we&apos;re making that vision a reality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="container-xl max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-navy-700 font-semibold mb-6">
                Our Mission
              </h2>
              <p className="font-body text-gray-600 text-xl leading-relaxed">
                To unlock Dubai&apos;s world-class real estate market for every investor — from
                first-time buyers to seasoned portfolio managers — through secure, transparent,
                and regulated blockchain-based fractional ownership.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-[#F8F7F4]" aria-labelledby="team-heading">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 id="team-heading" className="font-display text-4xl text-navy-700 font-semibold mb-4">
                Leadership Team
              </h2>
              <p className="text-gray-500 font-body text-lg max-w-xl mx-auto">
                Backed by decades of combined experience in UAE real estate, blockchain, and finance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 text-center hover:shadow-card-hover transition-shadow"
                >
                  {/* Avatar */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4`}
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-2xl font-display">{member.initials}</span>
                  </div>

                  <h3 className="font-display text-xl text-navy-700 font-semibold mb-1">{member.name}</h3>
                  <p className="text-gold-600 text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-gray-500 text-sm font-body leading-relaxed mb-4">{member.bio}</p>

                  <a
                    href={member.linkedin}
                    aria-label={`${member.name} on LinkedIn`}
                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-teal-600 transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-navy-700" aria-labelledby="timeline-heading">
          <div className="container-xl max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 id="timeline-heading" className="font-display text-4xl text-white font-semibold mb-4">
                Our Journey
              </h2>
              <p className="text-white/60 font-body text-lg">
                From concept to UAE&apos;s leading real estate tokenization platform.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-500/20" aria-hidden="true" />
              <div className="space-y-8">
                {timeline.map((event, i) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="relative z-10 w-16 shrink-0 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-gold-500 border-4 border-navy-700 shadow-glow-sm" aria-hidden="true" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1">
                      <span className="text-gold-500 font-bold text-sm">{event.year}</span>
                      <h3 className="font-display text-xl text-white font-semibold mt-1 mb-2">{event.title}</h3>
                      <p className="text-white/60 font-body text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white" aria-labelledby="values-heading">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 id="values-heading" className="font-display text-4xl text-navy-700 font-semibold mb-4">
                Our Values
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border-2 border-transparent hover:border-gold-500/20 hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-navy-700 flex items-center justify-center mb-4 transition-all">
                    {value.icon}
                  </div>
                  <h3 className="font-display text-xl text-navy-700 font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm font-body leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="py-20 bg-[#F8F7F4]" aria-labelledby="press-heading">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 id="press-heading" className="font-display text-4xl text-navy-700 font-semibold mb-4">
                In the Press
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pressItems.map((item, i) => (
                <motion.div
                  key={item.outlet}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card flex items-start gap-4 hover:shadow-card-hover transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-700 flex items-center justify-center shrink-0">
                    <span className="text-gold-500 font-bold text-xs">{item.outlet.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-gold-600 text-xs font-semibold uppercase tracking-wider mb-1">{item.outlet}</p>
                    <p className="text-navy-700 font-semibold font-body leading-snug">{item.headline}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
