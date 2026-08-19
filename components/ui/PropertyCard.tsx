'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, ShieldCheck, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import type { Property } from '@/lib/data/properties';

interface PropertyCardProps {
  property: Property;
  className?: string;
  index?: number;
}

function FundingRing({ funded, size = 68 }: { funded: number; size?: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (funded / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 72 72">
        {/* Track */}
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
        {/* Indigo fill ring */}
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="4"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute font-outfit font-black text-[10px]"
        style={{ color: '#D4AF37' }}>{funded}%</span>
    </div>
  );
}

export function PropertyCard({ property, className, index = 0 }: PropertyCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('group perspective-1000 w-full', className)}
    >
      {/* Gradient border wrapper */}
      <div
        className="rounded-[32px] p-px transition-all duration-700"
        style={{
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.5) 0%, rgba(99,102,241,0.5) 100%)',
            zIndex: -1,
          }}
        />

        <article
          className="relative h-full rounded-[31px] overflow-hidden transition-all duration-700"
          style={{
            background: 'linear-gradient(160deg, #0a0a18 0%, #06060f 100%)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-108"
              style={{ filter: 'saturate(1.4) contrast(1.1)' }}
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(6,6,15,0.95) 100%)' }} />

            {/* Type badge */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-obsidian-950"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F0CA2A)' }}
              >
                {property.type}
              </span>
              {property.status === 'coming-soon' && (
                <span
                  className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full text-white/80"
                  style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  Coming Soon
                </span>
              )}
            </div>

            {/* On-chain badge */}
            <div className="absolute top-4 right-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
                title="Tokenized on-chain"
              >
                <Link2 className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
              </div>
            </div>

            {/* Yield + ring row at bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="rounded-xl px-3.5 py-2"
                style={{ background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.15)' }}>
                <p className="font-black text-lg leading-none stat-value"
                  style={{ color: '#D4AF37' }}>{property.annualYield}%</p>
                <p className="text-[9px] uppercase font-bold tracking-widest mt-0.5 text-white/30">Annual Yield</p>
              </div>
              <FundingRing funded={property.funded} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-5">
            {/* Property name + location */}
            <div>
              <h3 className="font-serif italic text-xl text-white group-hover:text-gold-400 transition-colors leading-tight mb-1">
                {property.name}
              </h3>
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-medium">
                <MapPin className="w-3 h-3" style={{ color: 'rgba(99,102,241,0.7)' }} />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Funding progress */}
            <div>
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2">
                <span className="text-white/30">Funding Progress</span>
                <span style={{ color: '#D4AF37' }}>{property.funded}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${property.funded}%` }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #D4AF37)' }}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.1)' }}
              >
                <p className="text-[9px] font-black text-white/25 uppercase tracking-widest mb-1">Min. Invest</p>
                <p className="text-white font-black text-sm stat-value">AED {property.minInvestment.toLocaleString()}</p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}
              >
                <p className="text-[9px] font-black text-white/25 uppercase tracking-widest mb-1">Property Value</p>
                <p className="text-white font-black text-sm stat-value">AED {(property.totalValue / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
                style={{ color: 'rgba(99,102,241,0.8)' }}>
                <ShieldCheck className="w-3.5 h-3.5" />
                VARA Verified
              </div>
              <a
                href={`/properties/${property.id}`}
                className="flex items-center gap-1.5 text-white/60 font-black text-xs group/btn hover:text-gold-400 transition-colors"
              >
                View Asset
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Premium sheen on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.025) 50%, transparent 80%)',
              transform: 'skewX(-10deg)',
            }}
          />
        </article>
      </div>
    </motion.div>
  );
}

export default PropertyCard;
