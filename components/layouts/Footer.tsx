'use client';

import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram, Send, ArrowRight, Shield, Link2 } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Browse Properties', href: '/properties' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Secondary Market', href: '/market' },
    { label: 'Portfolio Dashboard', href: '/dashboard' },
    { label: 'Referral Program', href: '/referral' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Risk Disclosure', href: '/risk' },
    { label: 'VARA License', href: '/vara-license' },
    { label: 'Whitepaper', href: '/whitepaper' },
  ],
};

const socialLinks = [
  { label: 'Twitter / X', href: 'https://twitter.com/propchainAE', icon: <Twitter className="w-4 h-4" /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/propchain-ae', icon: <Linkedin className="w-4 h-4" /> },
  { label: 'Instagram', href: 'https://instagram.com/propchainAE', icon: <Instagram className="w-4 h-4" /> },
  { label: 'Telegram', href: 'https://t.me/propchainAE', icon: <Send className="w-4 h-4" /> },
];

const licenseBadges = [
  { label: 'VARA Licensed', sub: 'Virtual Assets Regulatory Authority' },
  { label: 'SCA Regulated', sub: 'Securities and Commodities Authority' },
  { label: 'UAE Central Bank', sub: 'Compliant Platform' },
  { label: 'ISO 27001', sub: 'Certified Security' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #030318 60%, #02020e 100%)' }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Top gradient border — signature brand moment */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #6366f1 25%, #D4AF37 50%, #6366f1 75%, transparent 100%)' }} />

      {/* Fine grid overlay */}
      <div className="absolute inset-0 pattern-grid-fine opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 blur-[120px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, rgba(212,175,55,0.3) 50%, transparent 70%)' }} />

      {/* Main content */}
      <div className="container-xl py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group" aria-label="PropChain – Home">
              <div className="relative w-9 h-9 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-lg rotate-45 group-hover:rotate-[55deg] transition-all duration-500"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #6366f1 100%)', padding: '1.5px' }}
                >
                  <div className="w-full h-full rounded-[6px] bg-obsidian-950 flex items-center justify-center -rotate-45 group-hover:-rotate-[55deg] transition-all duration-500">
                    <span
                      className="font-outfit font-black text-[13px] leading-none"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      PC
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-outfit font-black text-lg text-white tracking-tight leading-none">
                  Prop<span className="text-gradient-gold">Chain</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5"
                  style={{ color: 'rgba(99,102,241,0.6)' }}>
                  Real Estate Protocol
                </span>
              </div>
            </a>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-outfit">
              Own premium Dubai properties from AED 500. Blockchain-settled fractional ownership with instant liquidity and automated dividends. VARA-licensed.
            </p>

            {/* On-chain indicator */}
            <div className="flex items-center gap-2 text-xs"
              style={{ color: 'rgba(99,102,241,0.6)' }}>
              <Link2 className="w-3.5 h-3.5" />
              <span className="font-bold">Powered by blockchain infrastructure</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-3">
                Investment Insights
              </p>
              {subscribed ? (
                <p className="text-indigo-400 text-sm flex items-center gap-2 font-semibold">
                  <Shield className="w-4 h-4" />
                  Subscribed successfully.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2" aria-label="Newsletter subscription">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 min-w-0 px-4 py-2.5 text-sm text-white placeholder-white/20 rounded-lg outline-none transition-colors font-outfit"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-lg shrink-0 text-obsidian-950 font-black text-sm transition-all"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F0CA2A)' }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-white/25 mb-5">
                {category}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm font-outfit transition-colors duration-200 hover:text-gold-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* License badges */}
        <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[9px] text-white/25 uppercase tracking-[0.2em] font-black mb-5 text-center">
            Regulated &amp; Certified
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {licenseBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-xl p-3 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.15)' }}
                >
                  <Shield className="w-3.5 h-3.5" style={{ color: '#D4AF37' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-black leading-tight">{badge.label}</p>
                  <p className="text-white/25 text-[10px] mt-0.5 truncate">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-xl py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px]"
          style={{ color: 'rgba(255,255,255,0.25)' }}>
          <p className="font-outfit">
            &copy; {new Date().getFullYear()} PropChain FZCO. All rights reserved. VARA License #VA-2024-001.
          </p>
          <p className="text-center font-outfit">
            Investing involves risk. Past performance is not indicative of future results.{' '}
            <a href="/risk" style={{ color: 'rgba(212,175,55,0.5)' }}
              className="hover:text-gold-400 transition-colors">
              Risk Disclosure
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
