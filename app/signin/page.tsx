'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
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

export default function SignInPage() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { auth } = await import('@/lib/firebase');
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setFirebaseUser(cred.user);
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (msg === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else if (msg === 'auth/invalid-api-key' || msg === 'auth/configuration-not-found') {
        setError('Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* in Vercel environment variables.');
      } else if (msg === 'auth/network-request-failed') {
        setError('Network error. Check your connection and try again.');
      } else {
        setError(`Sign in failed (${msg ?? 'unknown'}). Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const { auth } = await import('@/lib/firebase');
      const { GoogleAuthProvider, signInWithPopup, signInWithRedirect } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      // Use redirect on mobile (popups are blocked); popup on desktop
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (isMobile) {
        await signInWithRedirect(auth, provider);
        // Page will reload — result handled in useEffect above
        return;
      }
      const cred = await signInWithPopup(auth, provider);
      setFirebaseUser(cred.user);
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg !== 'auth/popup-closed-by-user') {
        setError('Google sign in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-obsidian-950 flex items-center justify-center px-4 pt-24 pb-12">
        {/* Background effects */}
        <div className="absolute inset-0 pattern-grid-fine opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, rgba(212,175,55,0.2) 60%, transparent 80%)' }} />

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
              <span className="font-outfit font-black text-xl text-white">
                Prop<span className="text-gradient-gold">Chain</span>
              </span>
            </a>
            <h1 className="font-outfit font-black text-3xl text-white tracking-tight">Welcome back</h1>
            <p className="text-white/40 text-sm mt-2">Sign in to your investor account</p>
          </div>

          {/* Card */}
          <div className="rounded-3xl p-8"
            style={{ background: 'rgba(8,8,25,0.8)', backdropFilter: 'blur(32px)', border: '1px solid rgba(99,102,241,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-5 text-sm"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Google SSO */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-outfit font-semibold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 mb-5"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : <GoogleIcon />}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-white/25 text-xs font-bold uppercase tracking-widest">or</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(99,102,241,0.5)' }} />
                  <input
                    id="email" type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl font-outfit text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs font-semibold" style={{ color: 'rgba(99,102,241,0.7)' }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(99,102,241,0.5)' }} />
                  <input
                    id="password" type={showPass ? 'text' : 'password'} required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl font-outfit text-sm text-white placeholder-white/20 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: 'rgba(255,255,255,0.3)' }} aria-label="Toggle password visibility">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-outfit font-black text-sm text-obsidian-950 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F0CA2A 60%, #818cf8 100%)', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-obsidian-950/30 border-t-obsidian-950 rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-white/30 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <a href="/register" className="font-bold text-gold-400 hover:text-gold-300 transition-colors">
              Create account
            </a>
          </p>
        </motion.div>
      </main>
    </>
  );
}
