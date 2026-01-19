'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, ChevronRight, Shield, Link2,
  BarChart3, Globe, Scale, Cpu, ArrowLeft
} from 'lucide-react';

// ── TOC data ───────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'executive', number: '01', title: 'Executive Summary', icon: FileText },
  { id: 'market',    number: '02', title: 'Market Opportunity', icon: BarChart3 },
  { id: 'technology',number: '03', title: 'Technology Stack', icon: Cpu },
  { id: 'tokenomics',number: '04', title: 'Tokenomics', icon: Link2 },
  { id: 'compliance',number: '05', title: 'Compliance & Legal', icon: Scale },
  { id: 'security',  number: '06', title: 'Security Framework', icon: Shield },
  { id: 'roadmap',   number: '07', title: 'Roadmap', icon: Globe },
];

// ── Content blocks ─────────────────────────────────────────────────────────────
const CONTENT: Record<string, { heading: string; body: React.ReactNode }> = {
  executive: {
    heading: 'Executive Summary',
    body: (
      <>
        <p>PropChain is a regulated fractional real estate investment platform built on the Dubai Land Department&apos;s tokenisation framework. We enable accredited and retail investors globally to acquire fractional ownership in institutional-grade Dubai real estate assets starting from AED 500.</p>
        <p>Dubai&apos;s real estate market recorded AED 634 billion in transaction volume in 2024 — yet access remains gatekept by capital requirements in excess of AED 1 million for direct ownership. PropChain closes this gap by issuing on-chain digital tokens that represent legally-registered fractional title over verified properties.</p>
        <p>Each investment is structured as a Special Purpose Vehicle (SPV) registered with the UAE Ministry of Economy. Investors receive proportional rental income, capital appreciation exposure, and on-chain proof of ownership verified against Dubai Land Department records.</p>
      </>
    ),
  },
  market: {
    heading: 'Market Opportunity',
    body: (
      <>
        <p>Dubai&apos;s residential and commercial real estate market grew 19.6% year-on-year in 2024, driven by sustained population growth, Golden Visa programme inflows, and the UAE&apos;s position as a regional financial hub. Average gross yields in premium submarkets — Marina, DIFC, Downtown, Palm Jumeirah — range from 6.2% to 9.8% net of service charges.</p>
        <h4 style={{ color: '#D4AF37' }} className="font-outfit font-black text-lg mt-6 mb-3">Target Market Sizing</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          {[
            { label: 'Total Addressable Market', value: 'AED 634B', sub: 'Dubai RE transaction volume 2024' },
            { label: 'Serviceable Market', value: 'AED 48B', sub: 'Tokenisable institutional assets' },
            { label: 'Initial Target', value: 'AED 1.2B', sub: 'Year 3 AUM target' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="font-outfit font-black text-xl mb-1" style={{ color: '#818cf8' }}>{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.sub}</p>
            </div>
          ))}
        </div>
        <p>The global real estate tokenisation market is projected to reach USD 4 trillion by 2035 (Boston Consulting Group, 2024). PropChain is positioned as the premier gateway for this capital entering the UAE.</p>
      </>
    ),
  },
  technology: {
    heading: 'Technology Stack',
    body: (
      <>
        <p>PropChain&apos;s platform is built on a permissioned EVM-compatible blockchain layer with smart contract architecture audited by CertiK. The system separates on-chain token registry from off-chain KYC/AML compliance records, enabling regulatory compliance without exposing investor data on-chain.</p>
        <h4 style={{ color: '#D4AF37' }} className="font-outfit font-black text-lg mt-6 mb-3">Architecture Layers</h4>
        <div className="space-y-3 my-4">
          {[
            { layer: 'Settlement Layer', desc: 'ERC-1400 security tokens with transfer restrictions enforcing KYC whitelist and DFSA secondary market rules' },
            { layer: 'Identity Layer', desc: 'Zero-knowledge proof identity attestations — investors prove compliance status without revealing personal data' },
            { layer: 'Oracle Layer', desc: 'Chainlink-powered DLD property value feeds for real-time on-chain NAV calculations' },
            { layer: 'Application Layer', desc: 'Next.js frontend + NestJS API with Firebase Auth, hosted on GCP Cloud Run' },
          ].map(l => (
            <div key={l.layer} className="flex gap-4 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: '#6366f1' }} />
              </div>
              <div>
                <p className="font-bold text-sm text-white mb-1">{l.layer}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{l.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  tokenomics: {
    heading: 'Tokenomics',
    body: (
      <>
        <p>Each property is independently tokenised as a discrete issuance. Tokens are property-specific — they represent fractional equity in the underlying SPV, not a platform utility token. This structure eliminates platform-wide systemic risk and ensures investor exposure is directly correlated to the specific asset.</p>
        <h4 style={{ color: '#D4AF37' }} className="font-outfit font-black text-lg mt-6 mb-3">Token Economics</h4>
        <div className="grid grid-cols-2 gap-4 my-4">
          {[
            { label: 'Minimum Token Price', value: 'AED 500' },
            { label: 'Maximum Tokens per Property', value: '10,000' },
            { label: 'Management Fee', value: '1.5% p.a.' },
            { label: 'Performance Fee', value: '15% above 8% hurdle' },
            { label: 'Dividend Frequency', value: 'Quarterly' },
            { label: 'Lock-up Period', value: '12 months' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span className="text-xs font-black text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  compliance: {
    heading: 'Compliance & Legal',
    body: (
      <>
        <p>PropChain operates under a regulatory sandbox license issued by the Dubai Financial Services Authority (DFSA) with a pathway to full DFSA Operator authorization under the Investment Token framework. All properties are onboarded via SPVs registered with the UAE Ministry of Economy and title registered with Dubai Land Department.</p>
        <h4 style={{ color: '#D4AF37' }} className="font-outfit font-black text-lg mt-6 mb-3">Regulatory Framework</h4>
        <div className="space-y-2 my-4">
          {[
            'DFSA Investment Token Framework — Part 2A, Markets Law DIFC No. 1 of 2012',
            'UAE Federal Decree-Law No. 20 of 2018 (AML/CFT) — full compliance',
            'FATF Travel Rule implementation for transfers above AED 3,500',
            'Dubai Land Department Real Estate Tokenisation Framework (2024)',
            'GDPR-equivalent DIFC Data Protection Law No. 5 of 2020',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-xl"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}>
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  security: {
    heading: 'Security Framework',
    body: (
      <>
        <p>All smart contracts undergo dual audits before deployment — one internal review and one by an independent Big 4 blockchain security firm. Investor funds are held in regulated escrow accounts at Emirates NBD until SPV formation is complete. No platform funds are co-mingled with investor capital.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { title: 'Multi-sig Treasury', desc: '3-of-5 multisig for all SPV disbursements above AED 50K' },
            { title: 'Cold Storage', desc: 'Private keys for platform treasury held in HSM vaults' },
            { title: 'Real-time Monitoring', desc: 'Chainalysis KYT integration for all on-chain transfers' },
            { title: 'Penetration Testing', desc: 'Quarterly red team exercises by certified CREST team' },
          ].map(s => (
            <div key={s.title} className="p-4 rounded-2xl"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <p className="font-bold text-sm text-white mb-1">{s.title}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  roadmap: {
    heading: 'Roadmap',
    body: (
      <>
        <p>PropChain&apos;s development is structured in four phases, aligning product milestones with regulatory approvals and capital deployment targets.</p>
        <div className="space-y-4 mt-6">
          {[
            { quarter: 'Q2 2025', title: 'Foundation', items: ['DFSA sandbox license granted', 'First 3 property listings live', 'KYC onboarding open globally'], done: true },
            { quarter: 'Q3 2025', title: 'Growth', items: ['10 properties, AED 50M AUM', 'Secondary market trading', 'iOS and Android apps'], done: true },
            { quarter: 'Q4 2025', title: 'Scale', items: ['DFSA full operator authorization', 'AED 200M AUM milestone', 'Abu Dhabi & RAK expansion'], done: false },
            { quarter: 'Q2 2026', title: 'Institutional', items: ['Institutional feeder funds', 'REIT tokenisation products', 'GCC cross-border listings'], done: false },
          ].map((phase, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ background: phase.done ? 'linear-gradient(135deg,#D4AF37,#818cf8)' : 'rgba(255,255,255,0.1)', border: phase.done ? 'none' : '1px solid rgba(255,255,255,0.2)' }} />
                {i < 3 && <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.08)' }} />}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg"
                    style={{ background: phase.done ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.04)', border: phase.done ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(255,255,255,0.06)', color: phase.done ? '#D4AF37' : 'rgba(255,255,255,0.3)' }}>
                    {phase.quarter}
                  </span>
                  <p className="font-bold text-sm text-white">{phase.title}</p>
                </div>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: phase.done ? '#D4AF37' : 'rgba(255,255,255,0.2)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
};

// ── Page ───────────────────────────────────────────────────────────────────────
export default function WhitepaperPage() {
  const [active, setActive] = useState('executive');
  const current = CONTENT[active];

  return (
    <div className="min-h-screen bg-obsidian-950">
      <div className="fixed inset-0 pattern-grid-fine opacity-20 pointer-events-none" />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(4,4,15,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(99,102,241,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </a>
            <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <span className="font-outfit font-black text-base text-white">Whitepaper</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg hidden sm:inline"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>v2.1</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #818cf8 100%)', color: '#000' }}>
            <Download className="w-3.5 h-3.5" />Download PDF
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(212,175,55,0.7)' }}>PropChain · Technical & Investment Whitepaper</p>
          <h1 className="font-outfit font-black text-4xl text-white mb-3">
            Tokenising Dubai&apos;s{' '}
            <span style={{ background: 'linear-gradient(135deg, #D4AF37, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Real Estate
            </span>
          </h1>
          <p className="text-white/40 max-w-2xl">The definitive reference for investors, regulators, and partners on PropChain&apos;s architecture, tokenomics, and compliance framework.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* TOC sidebar */}
          <motion.aside initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl p-4"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest px-3 mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Contents</p>
              <nav className="space-y-1">
                {SECTIONS.map(s => {
                  const isActive = active === s.id;
                  return (
                    <button key={s.id} onClick={() => setActive(s.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                      style={isActive
                        ? { background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(99,102,241,0.1))', border: '1px solid rgba(212,175,55,0.2)' }
                        : { background: 'transparent', border: '1px solid transparent' }}>
                      <span className="text-[9px] font-black" style={{ color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.2)' }}>{s.number}</span>
                      <span className="text-sm font-semibold leading-tight" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}>{s.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.aside>

          {/* Content area */}
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3 rounded-3xl p-8"
            style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              {SECTIONS.find(s => s.id === active)?.number}
            </p>
            <h2 className="font-outfit font-black text-2xl text-white mb-6">{current.heading}</h2>
            <div className="prose-custom space-y-4 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {current.body}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {(() => {
                const idx = SECTIONS.findIndex(s => s.id === active);
                const prev = SECTIONS[idx - 1];
                const next = SECTIONS[idx + 1];
                return (
                  <>
                    <div>
                      {prev && (
                        <button onClick={() => setActive(prev.id)}
                          className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.4)' }}>
                          ← {prev.title}
                        </button>
                      )}
                    </div>
                    <div>
                      {next && (
                        <button onClick={() => setActive(next.id)}
                          className="flex items-center gap-2 text-sm font-bold transition-colors"
                          style={{ color: '#818cf8' }}>
                          {next.title} →
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
