'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Building2, Wallet, Bell, ArrowRight,
  ChevronRight, Shield, Clock, Layers, BarChart3, LogOut, User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────────────
interface Holding {
  id: string;
  name: string;
  location: string;
  type: string;
  tokens: number;
  valueAED: number;
  yieldPct: number;
  changeDay: number;
  funded: number;
}

interface TxItem {
  id: string;
  type: 'PURCHASE' | 'DIVIDEND' | 'SALE';
  property: string;
  amount: number;
  date: string;
}

// ── Mock data (replace with API calls once backend is connected) ───────────────
const HOLDINGS: Holding[] = [
  { id: '1', name: 'Marina Crescent Tower', location: 'Dubai Marina', type: 'Residential', tokens: 240, valueAED: 120_000, yieldPct: 8.4, changeDay: 0.32, funded: 91 },
  { id: '2', name: 'DIFC Gate Office', location: 'DIFC', type: 'Commercial', tokens: 80, valueAED: 64_000, yieldPct: 9.1, changeDay: -0.12, funded: 78 },
  { id: '3', name: 'Palm Jumeirah Villa', location: 'Palm Jumeirah', type: 'Luxury', tokens: 60, valueAED: 42_500, yieldPct: 6.8, changeDay: 0.07, funded: 65 },
];

const TRANSACTIONS: TxItem[] = [
  { id: 't1', type: 'PURCHASE', property: 'Marina Crescent Tower', amount: 25_000, date: '2025-03-18' },
  { id: 't2', type: 'DIVIDEND', property: 'DIFC Gate Office', amount: 1_280, date: '2025-03-15' },
  { id: 't3', type: 'PURCHASE', property: 'Palm Jumeirah Villa', amount: 12_500, date: '2025-03-10' },
  { id: 't4', type: 'DIVIDEND', property: 'Marina Crescent Tower', amount: 2_040, date: '2025-03-01' },
  { id: 't5', type: 'SALE', property: 'Business Bay Tower', amount: 8_750, date: '2025-02-22' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, up }: { label: string; value: string; sub: string; up?: boolean }) {
  return (
    <div className="rounded-2xl p-5"
      style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
      <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
      <p className="font-outfit font-black text-2xl text-white mb-1">{value}</p>
      <div className="flex items-center gap-1.5">
        {up !== undefined && (up
          ? <TrendingUp className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
          : <TrendingDown className="w-3.5 h-3.5 text-red-400" />)}
        <span className="text-[11px]" style={{ color: up ? '#D4AF37' : up === false ? '#f87171' : 'rgba(255,255,255,0.35)' }}>{sub}</span>
      </div>
    </div>
  );
}

function TxBadge({ type }: { type: TxItem['type'] }) {
  const map = {
    PURCHASE: { label: 'Buy', color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
    DIVIDEND: { label: 'Yield', color: 'rgba(212,175,55,0.12)', border: 'rgba(212,175,55,0.3)', text: '#D4AF37' },
    SALE: { label: 'Sell', color: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: '#fca5a5' },
  };
  const s = map[type];
  return (
    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg"
      style={{ background: s.color, border: `1px solid ${s.border}`, color: s.text }}>
      {s.label}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { firebaseUser, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !firebaseUser) {
      router.push('/signin');
    }
  }, [firebaseUser, isLoading, router]);

  if (isLoading || !firebaseUser) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  const totalValue = HOLDINGS.reduce((s, h) => s + h.valueAED, 0);
  const totalYield = HOLDINGS.reduce((s, h) => s + (h.valueAED * h.yieldPct) / 100, 0);
  const displayName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Investor';

  const handleLogout = async () => {
    const { auth } = await import('@/lib/firebase');
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-obsidian-950">
      {/* Background */}
      <div className="fixed inset-0 pattern-grid-fine opacity-20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)' }} />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(4,4,15,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(99,102,241,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg rotate-45"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #6366f1 100%)', padding: '1.5px' }}>
                <div className="w-full h-full rounded-[6px] bg-obsidian-950 flex items-center justify-center -rotate-45">
                  <span className="font-outfit font-black text-[10px]"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    PC
                  </span>
                </div>
              </div>
            </div>
            <span className="font-outfit font-black text-base text-white">Prop<span className="text-gradient-gold">Chain</span></span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: '/dashboard', label: 'Overview' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/properties', label: 'Properties' },
            ].map(link => (
              <a key={link.href} href={link.href}
                className="text-sm font-semibold transition-colors"
                style={{ color: link.href === '/dashboard' ? '#D4AF37' : 'rgba(255,255,255,0.45)' }}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg transition-colors hover:bg-white/5">
              <Bell className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </button>
            <button onClick={() => setNavOpen(!navOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <User className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
              <span className="text-xs font-bold text-white hidden sm:block">{displayName.split(' ')[0]}</span>
            </button>
            {navOpen && (
              <div className="absolute top-16 right-4 rounded-2xl py-2 z-50"
                style={{ background: 'rgba(8,8,25,0.98)', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', minWidth: 180 }}>
                <div className="px-4 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-bold text-white">{displayName}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{firebaseUser.email}</p>
                </div>
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5 transition-colors">
                  <LogOut className="w-4 h-4" />Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(212,175,55,0.7)' }}>Dashboard</p>
          <h1 className="font-outfit font-black text-3xl text-white">Good morning, {displayName.split(' ')[0]}.</h1>
          <p className="text-white/35 text-sm mt-1">Here&apos;s your portfolio at a glance.</p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Portfolio Value" value={`AED ${(totalValue / 1000).toFixed(0)}K`} sub="+2.4% this month" up={true} />
          <StatCard label="Annual Yield" value={`AED ${(totalYield / 1000).toFixed(1)}K`} sub="8.4% avg. net yield" up={true} />
          <StatCard label="Properties" value={`${HOLDINGS.length}`} sub="Across Dubai" />
          <StatCard label="KYC Status" value="Verified" sub="Full access unlocked" up={true} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Holdings */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }}
            className="lg:col-span-2 rounded-3xl p-6"
            style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Holdings</p>
                <h2 className="font-outfit font-black text-lg text-white">Your Properties</h2>
              </div>
              <a href="/portfolio" className="flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-indigo-300"
                style={{ color: '#818cf8' }}>
                View all <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="space-y-3">
              {HOLDINGS.map((h, i) => (
                <motion.div key={h.id}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:border-indigo-500/20 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Building2 className="w-4.5 h-4.5" style={{ color: '#818cf8' }} />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-outfit font-bold text-sm text-white truncate">{h.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{h.location} · {h.type}</p>
                  </div>
                  {/* Tokens */}
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="text-xs font-bold" style={{ color: '#D4AF37' }}>{h.tokens} tokens</p>
                    <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>AED {h.valueAED.toLocaleString()}</p>
                  </div>
                  {/* Yield */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black" style={{ color: h.changeDay >= 0 ? '#D4AF37' : '#f87171' }}>
                      {h.changeDay >= 0 ? '+' : ''}{h.changeDay}%
                    </p>
                    <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{h.yieldPct}% yield</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick actions */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              className="rounded-3xl p-5"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Quick Actions</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Browse Properties', href: '/properties', icon: Layers, accent: '#818cf8' },
                  { label: 'View Portfolio', href: '/portfolio', icon: BarChart3, accent: '#D4AF37' },
                  { label: 'Add Funds', href: '#', icon: Wallet, accent: '#818cf8' },
                ].map(a => (
                  <a key={a.label} href={a.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <a.icon className="w-4 h-4 flex-shrink-0" style={{ color: a.accent }} />
                    <span className="text-sm font-semibold text-white flex-1">{a.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* KYC banner */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
              className="rounded-3xl p-5"
              style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(99,102,241,0.08) 100%)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <p className="font-bold text-sm text-white mb-1">KYC Verified</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Your identity is verified. You have full access to all investment products.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
              className="rounded-3xl p-5"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Recent Activity</p>
              <div className="space-y-3">
                {TRANSACTIONS.slice(0, 3).map(tx => (
                  <div key={tx.id} className="flex items-center gap-3">
                    <TxBadge type={tx.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{tx.property}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-2.5 h-2.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{tx.date}</span>
                      </div>
                    </div>
                    <p className="text-xs font-black flex-shrink-0"
                      style={{ color: tx.type === 'DIVIDEND' ? '#D4AF37' : tx.type === 'SALE' ? '#f87171' : '#818cf8' }}>
                      {tx.type === 'DIVIDEND' ? '+' : tx.type === 'SALE' ? '-' : ''}AED {tx.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Click-outside to close dropdown */}
      {navOpen && <div className="fixed inset-0 z-30" onClick={() => setNavOpen(false)} />}
    </div>
  );
}
