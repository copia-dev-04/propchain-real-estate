'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layouts/Navbar';
import { useAuthStore } from '@/store/authStore';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

const passwordRules = [
  { label: '8+ characters', test: (p: string) => p.length >= 8 },
  { label: 'Uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Number', test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [agreed, setAgreed]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]         = useState('');

  const { setFirebaseUser } = useAuthStore();

  // Handle redirect result on page load (mobile Google sign-in flow)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { auth } = await import('@/lib/firebase');
        const { getRedirectResult } = await import('firebase/auth');
        const result = await getRedirectResult(auth);
        if (result && !cancelled) {
          setFirebaseUser(result.user);
          window.location.href = '/dashboard';
        }
      } catch {
        // No redirect result pending — safe to ignore
      }
    })();
    return () => { cancelled = true; };
  }, [setFirebaseUser]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError('Please accept the terms to continue.'); return; }
    setError('');
    setLoading(true);
    try {
      const { auth } = await import('@/lib/firebase');
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });
      setFirebaseUser(cred.user);
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use 8+ characters with uppercase and numbers.');
      } else if (code === 'auth/invalid-api-key' || code === 'auth/configuration-not-found') {
        setError('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* in Vercel environment variables.');
      } else if (code === 'auth/network-request-failed') {
        setError('Network error. Check your connection and try again.');
      } else {
        setError(`Registration failed (${code ?? 'unknown'}). Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const { auth } = await import('@/lib/firebase');
      const { GoogleAuthProvider, signInWithPopup, signInWithRedirect } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile) {
        await signInWithRedirect(auth, provider);
        return;
      }
      const cred = await signInWithPopup(auth, provider);
      setFirebaseUser(cred.user);
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code !== 'auth/popup-closed-by-user') setError('Google sign in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const passwordStrength = passwordRules.filter(r => r.test(password)).length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-950 flex items-center justify-center px-4 pt-24 pb-12">
        <div className="absolute inset-0 pattern-grid-fine opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, rgba(212,175,55,0.2) 60%, transparent 80%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl rotate-45"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #6366f1 100%)', padding: '2px' }}>
                  <div className="w-full h-full rounded-[9px] bg-obsidian-950 flex items-center justify-center -rotate-45">
                    <span className="font-outfit font-black text-sm"
                      style={{ background: 'linear-gradient(135deg, #D4AF37, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      PC
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-outfit font-black text-xl text-white">Prop<span className="text-gradient-gold">Chain</span></span>
            </a>
            <h1 className="font-outfit font-black text-3xl text-white tracking-tight">Create your account</h1>
            <p className="text-white/40 text-sm mt-2">Start investing in Dubai real estate from AED 500</p>
          </div>

          <div className="rounded-3xl p-8"
            style={{ background: 'rgba(8,8,25,0.8)', backdropFilter: 'blur(32px)', border: '1px solid rgba(99,102,241,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-5 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
              </motion.div>
            )}

            {/* Google */}
            <button onClick={handleGoogle} disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-outfit font-semibold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 mb-5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              {googleLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-white/25 text-xs font-bold uppercase tracking-widest">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full name */}
              <div>
                <label htmlFor="fullName" className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(99,102,241,0.5)' }} />
                  <input id="fullName" type="text" required
                    value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder="John Smith"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl font-outfit text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="reg-email" className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(99,102,241,0.5)' }} />
                  <input id="reg-email" type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl font-outfit text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                </div>
              </div>

              {/* Password + strength */}
              <div>
                <label htmlFor="reg-password" className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(99,102,241,0.5)' }} />
                  <input id="reg-password" type={showPass ? 'text' : 'password'} required
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl font-outfit text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength bar */}
                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-300"
                          style={{ background: i < passwordStrength ? (passwordStrength === 3 ? '#D4AF37' : passwordStrength === 2 ? '#818cf8' : '#ef4444') : 'rgba(255,255,255,0.06)' }} />
                      ))}
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {passwordRules.map(r => (
                        <div key={r.label} className="flex items-center gap-1 text-[10px] font-semibold"
                          style={{ color: r.test(password) ? '#D4AF37' : 'rgba(255,255,255,0.25)' }}>
                          <CheckCircle2 className="w-3 h-3" />{r.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <button type="button" onClick={() => setAgreed(!agreed)}
                  className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all"
                  style={{ background: agreed ? 'linear-gradient(135deg,#D4AF37,#818cf8)' : 'rgba(255,255,255,0.05)', border: agreed ? 'none' : '1px solid rgba(255,255,255,0.15)' }}
                  aria-checked={agreed} role="checkbox">
                  {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-obsidian-950" />}
                </button>
                <p className="text-white/35 text-xs leading-relaxed">
                  I agree to PropChain&apos;s{' '}
                  <a href="/terms" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>.
                  I understand that investing involves risk.
                </p>
              </div>

              <button type="submit" disabled={loading || !agreed}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-outfit font-black text-sm text-obsidian-950 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0CA2A 60%, #818cf8 100%)', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-obsidian-950/30 border-t-obsidian-950 rounded-full animate-spin" />
                ) : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            Already have an account?{' '}
            <a href="/signin" className="font-bold text-gold-400 hover:text-gold-300 transition-colors">Sign in</a>
          </p>
        </motion.div>
      </main>
    </>
  );
}
