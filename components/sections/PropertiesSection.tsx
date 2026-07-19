'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, Map } from 'lucide-react';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { Property } from '@/lib/data/properties';
import { properties as fallbackProperties } from '@/lib/data/properties';
import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/api';

export function PropertiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bannerY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => API.properties.getAll(),
  });

  const properties = propertiesData?.data || fallbackProperties;

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-obsidian-950 relative overflow-hidden" 
      aria-labelledby="properties-heading"
    >
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-xl relative z-10 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs">Selection 2026</span>
            </motion.div>
            
            <motion.h2
              id="properties-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8"
            >
              Elite <span className="text-gradient-gold">UAE Portfolio</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
            >
              Handpicked premium Dubai properties with institutional-grade financials and audited yield projections.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6"
          >
             <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="w-12 h-12 rounded-full border-2 border-obsidian-950 bg-obsidian-900 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${idx+10}/100/100`} alt="investor" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-obsidian-950 bg-gold-500 flex items-center justify-center text-obsidian-950 font-bold text-xs ring-4 ring-gold-500/20">
                  +12k
                </div>
             </div>
             <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Trusted by 12,000+ <br/> Institutional Investors</p>
          </motion.div>
        </div>

        {/* Clean Symetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-white/50">Loading elite properties...</div>
          ) : (
            properties.map((property: Property, idx: number) => (
              <div key={property.id} className="h-full">
                <PropertyCard property={property} index={idx} />
              </div>
            ))
          )}

          {/* Special CTA Card */}
          <motion.div 
            className="group flex flex-col justify-center items-center p-12 glass-dark rounded-[32px] border border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent text-center h-full min-h-[400px]"
          >
            <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-gold-500/20 transition-colors">
              <Building2 className="w-10 h-10 text-gold-500" />
            </div>
            <h3 className="text-white text-3xl font-extrabold tracking-tight mb-4">Market <br/> Full View</h3>
            <p className="text-white/50 mb-8 max-w-[200px]">Unlock our complete database of UAE real estate assets.</p>
            <a 
              href="/properties" 
              className="flex items-center gap-2 text-gold-500 font-bold hover:text-white transition-colors"
            >
              Browse Full Map
              <Map className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          style={{ y: bannerY }}
          className="mt-32 p-12 lg:p-20 glass-dark border border-white/5 rounded-[48px] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Experience <br/> <span className="text-gradient-gold">Digital Ownership</span></h3>
              <p className="text-white/60 text-lg font-medium">Join PropChain today and start earning dividends from Dubai’s most strategic landmarks.</p>
            </div>
            <a href="/register" className="btn-primary whitespace-nowrap px-12 h-20 text-xl">
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PropertiesSection;
