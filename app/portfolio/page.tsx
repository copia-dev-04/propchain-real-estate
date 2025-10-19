'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2, TrendingUp, TrendingDown, ArrowLeft, BarChart3,
  Download, Filter, ChevronDown, Clock, ArrowUpRight, ArrowDownRight, Minus
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
  tokenPrice: number;
  valueAED: number;
  costBasis: number;
  yieldPct: number;
  yieldEarned: number;
  changeDay: number;
  changeTotal: number;
  funded: number;
  status: 'ACTIVE' | 'EXITED' | 'PENDING';
}

interface TxItem {
  id: string;
  type: 'PURCHASE' | 'DIVIDEND' | 'SALE' | 'TRANSFER';
  property: string;
  tokens?: number;
  amount: number;
  date: string;
  hash?: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const HOLDINGS: Holding[] = [
  { id: '1', name: 'Marina Crescent Tower', location: 'Dubai Marina', type: 'Residential', tokens: 240, tokenPrice: 500, valueAED: 120_000, costBasis: 110_000, yieldPct: 8.4, yieldEarned: 3_280, changeDay: 0.32, changeTotal: 9.09, funded: 91, status: 'ACTIVE' },
  { id: '2', name: 'DIFC Gate Office', location: 'DIFC', type: 'Commercial', tokens: 80, tokenPrice: 800, valueAED: 64_000, costBasis: 61_500, yieldPct: 9.1, yieldEarned: 2_140, changeDay: -0.12, changeTotal: 4.07, funded: 78, status: 'ACTIVE' },
  { id: '3', name: 'Palm Jumeirah Villa', location: 'Palm Jumeirah', type: 'Luxury', tokens: 60, tokenPrice: 708, valueAED: 42_500, costBasis: 40_000, yieldPct: 6.8, yieldEarned: 980, changeDay: 0.07, changeTotal: 6.25, funded: 65, status: 'ACTIVE' },
  { id: '4', name: 'Business Bay Tower', location: 'Business Bay', type: 'Commercial', tokens: 0, tokenPrice: 620, valueAED: 0, costBasis: 8_200, yieldPct: 7.2, yieldEarned: 340, changeDay: 0, changeTotal: 6.71, funded: 100, status: 'EXITED' },
];

const TRANSACTIONS: TxItem[] = [
  { id: 't1', type: 'PURCHASE', property: 'Marina Crescent Tower', tokens: 50, amount: 25_000, date: '2025-03-18', hash: '0x3f9a...c12b' },
  { id: 't2', type: 'DIVIDEND', property: 'DIFC Gate Office', amount: 1_280, date: '2025-03-15' },
  { id: 't3', type: 'PURCHASE', property: 'Palm Jumeirah Villa', tokens: 25, amount: 12_500, date: '2025-03-10', hash: '0x7d2e...881f' },
  { id: 't4', type: 'DIVIDEND', property: 'Marina Crescent Tower', amount: 2_040, date: '2025-03-01' },
  { id: 't5', type: 'SALE', property: 'Business Bay Tower', tokens: 14, amount: 8_750, date: '2025-02-22', hash: '0xa1b3...f440' },
  { id: 't6', type: 'PURCHASE', property: 'DIFC Gate Office', tokens: 40, amount: 31_000, date: '2025-02-14', hash: '0x8c77...2d91' },
  { id: 't7', type: 'DIVIDEND', property: 'Palm Jumeirah Villa', amount: 980, date: '2025-02-01' },
  { id: 't8', type: 'DIVIDEND', property: 'Business Bay Tower', amount: 340, date: '2025-01-15' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function typeColor(type: TxItem['type']) {
  const m = { PURCHASE: '#818cf8', DIVIDEND: '#D4AF37', SALE: '#f87171', TRANSFER: 'rgba(255,255,255,0.5)' };
  return m[type];
}

function typeBg(type: TxItem['type']) {
  const m = { PURCHASE: 'rgba(99,102,241,0.1)', DIVIDEND: 'rgba(212,175,55,0.1)', SALE: 'rgba(239,68,68,0.08)', TRANSFER: 'rgba(255,255,255,0.04)' };
  return m[type];
}

function typeBorder(type: TxItem['type']) {
  const m = { PURCHASE: 'rgba(99,102,241,0.25)', DIVIDEND: 'rgba(212,175,55,0.25)', SALE: 'rgba(239,68,68,0.2)', TRANSFER: 'rgba(255,255,255,0.1)' };
  return m[type];
}

function typeLabel(type: TxItem['type']) {
  return { PURCHASE: 'Buy', DIVIDEND: 'Yield', SALE: 'Sell', TRANSFER: 'Transfer' }[type];
}

function typePrefix(type: TxItem['type']) {
  return { PURCHASE: '', DIVIDEND: '+', SALE: '-', TRANSFER: '' }[type];
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { firebaseUser, isLoading } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<'holdings' | 'transactions'>('holdings');
  const [txFilter, setTxFilter] = useState<'ALL' | TxItem['type']>('ALL');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!isLoading && !firebaseUser) router.push('/signin');
  }, [firebaseUser, isLoading, router]);

  if (isLoading || !firebaseUser) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  const activeHoldings = HOLDINGS.filter(h => h.status === 'ACTIVE');
  const exitedHoldings = HOLDINGS.filter(h => h.status === 'EXITED');
  const totalValue = activeHoldings.reduce((s, h) => s + h.valueAED, 0);
  const totalCost  = HOLDINGS.reduce((s, h) => s + h.costBasis, 0);
  const totalYield = HOLDINGS.reduce((s, h) => s + h.yieldEarned, 0);
  const totalPnl   = totalValue - totalCost;

  const filteredTx = txFilter === 'ALL' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === txFilter);

  return (
    <div className="min-h-screen bg-obsidian-950">
      <div className="fixed inset-0 pattern-grid-fine opacity-20 pointer-events-none" />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(4,4,15,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(99,102,241,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </a>
            <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="font-outfit font-black text-base text-white">Portfolio</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
            style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>
            <Download className="w-3.5 h-3.5" />Export
          </button>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary strip */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Portfolio Value', value: `AED ${(totalValue / 1000).toFixed(0)}K`, icon: BarChart3, accent: '#818cf8' },
            { label: 'Total P&L', value: `${totalPnl >= 0 ? '+' : ''}AED ${(totalPnl / 1000).toFixed(1)}K`, icon: totalPnl >= 0 ? TrendingUp : TrendingDown, accent: totalPnl >= 0 ? '#D4AF37' : '#f87171' },
            { label: 'Yield Earned', value: `AED ${(totalYield / 1000).toFixed(1)}K`, icon: ArrowUpRight, accent: '#D4AF37' },
            { label: 'Properties', value: `${activeHoldings.length} active`, icon: Building2, accent: '#818cf8' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.accent }} />
              </div>
              <p className="font-outfit font-black text-xl" style={{ color: s.accent }}>{s.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tab toggle */}
        <div className="flex items-center gap-2 mb-6">
          {(['holdings', 'transactions'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all"
              style={tab === t
                ? { background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(99,102,241,0.15) 100%)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }
                : { background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
              {t}
            </button>
          ))}
        </div>

        {/* Holdings tab */}
        {tab === 'holdings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="rounded-3xl overflow-hidden"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              {/* Table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-widest"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
                <div className="col-span-4">Property</div>
                <div className="col-span-2 text-right">Tokens</div>
                <div className="col-span-2 text-right">Value</div>
                <div className="col-span-2 text-right">Yield</div>
                <div className="col-span-2 text-right">Total Return</div>
              </div>

              {/* Active */}
              {activeHoldings.map((h, i) => (
                <motion.div key={h.id}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-5 transition-colors cursor-pointer hover:bg-white/[0.015]"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {/* Name */}
                  <div className="col-span-2 md:col-span-4 flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      <Building2 className="w-4 h-4" style={{ color: '#818cf8' }} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white leading-tight">{h.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{h.location} · {h.type}</p>
                    </div>
                  </div>
                  {/* Tokens */}
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                    <div>
                      <p className="text-sm font-bold text-white">{h.tokens}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>@ AED {h.tokenPrice}</p>
                    </div>
                  </div>
                  {/* Value */}
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">AED {h.valueAED.toLocaleString()}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Cost AED {h.costBasis.toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Yield */}
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-end">
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: '#D4AF37' }}>{h.yieldPct}%</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>+AED {h.yieldEarned.toLocaleString()}</p>
                    </div>
                  </div>
                  {/* Return */}
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-end gap-1.5">
                    {h.changeTotal > 0
                      ? <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      : h.changeTotal < 0
                        ? <ArrowDownRight className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />
                        : <Minus className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />}
                    <p className="text-sm font-black"
                      style={{ color: h.changeTotal > 0 ? '#D4AF37' : h.changeTotal < 0 ? '#f87171' : 'rgba(255,255,255,0.5)' }}>
                      {h.changeTotal > 0 ? '+' : ''}{h.changeTotal.toFixed(2)}%
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Exited section */}
              {exitedHoldings.length > 0 && (
                <>
                  <div className="px-6 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Exited Positions</p>
                  </div>
                  {exitedHoldings.map(h => (
                    <div key={h.id} className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6 py-5 opacity-40"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <div className="col-span-2 md:col-span-4 flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <Building2 className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{h.name}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Exited · {h.location}</p>
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-8 flex items-center md:justify-end">
                        <p className="text-sm font-bold" style={{ color: '#D4AF37' }}>+{h.changeTotal.toFixed(2)}% total return</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Transactions tab */}
        {tab === 'transactions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Filter */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <button onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                  <Filter className="w-3.5 h-3.5" />
                  {txFilter === 'ALL' ? 'All Types' : txFilter}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showFilter && (
                  <div className="absolute top-full mt-2 left-0 rounded-2xl py-2 z-10"
                    style={{ background: 'rgba(8,8,25,0.98)', border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', minWidth: 140 }}>
                    {(['ALL', 'PURCHASE', 'DIVIDEND', 'SALE'] as const).map(f => (
                      <button key={f} onClick={() => { setTxFilter(f); setShowFilter(false); }}
                        className="w-full text-left px-4 py-2 text-xs font-bold transition-colors hover:bg-white/5"
                        style={{ color: txFilter === f ? '#D4AF37' : 'rgba(255,255,255,0.5)' }}>
                        {f === 'ALL' ? 'All Types' : f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{filteredTx.length} transactions</p>
            </div>

            <div className="rounded-3xl overflow-hidden"
              style={{ background: 'rgba(8,8,25,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
              {filteredTx.map((tx, i) => (
                <motion.div key={tx.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-4 transition-colors"
                  style={{ borderBottom: i < filteredTx.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  {/* Badge */}
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg flex-shrink-0"
                    style={{ background: typeBg(tx.type), border: `1px solid ${typeBorder(tx.type)}`, color: typeColor(tx.type) }}>
                    {typeLabel(tx.type)}
                  </span>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{tx.property}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{tx.date}</span>
                      </div>
                      {tx.hash && (
                        <span className="text-[10px] font-mono hidden sm:block" style={{ color: 'rgba(99,102,241,0.5)' }}>{tx.hash}</span>
                      )}
                      {tx.tokens && (
                        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{tx.tokens} tokens</span>
                      )}
                    </div>
                  </div>
                  {/* Amount */}
                  <p className="text-sm font-black flex-shrink-0" style={{ color: typeColor(tx.type) }}>
                    {typePrefix(tx.type)}AED {tx.amount.toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
