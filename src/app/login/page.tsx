'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginBrand from './LoginBrand';
import LoginForm  from './LoginForm';
import OtpVerify  from './OtpVerify';

type Step = 'ticket' | 'otp' | 'success';

/* Generate a 6-digit demo OTP */
const genOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

/* ================================================================
   LoginPage — Orchestrates the 3-step login flow:
     1. Ticket / Name / Phone entry  (LoginForm)
     2. OTP verification             (OtpVerify)
     3. Success redirect             (inline)
   Sub-components handle their own UI; this page holds shared state.
   ================================================================ */
export default function LoginPage() {
  const router = useRouter();

  /* ── Shared form state ───────────────────────────────────────── */
  const [step, setStep]             = useState<Step>('ticket');
  const [ticketId, setTicketId]     = useState('');
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [otp, setOtp]               = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGenOtp]   = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [resendIn, setResendIn]     = useState(0);
  const [sentBanner, setSentBanner] = useState(false);

  /* Attempt throttle: max 5 OTP attempts */
  const attempts = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Countdown timer for resend button */
  useEffect(() => {
    if (resendIn <= 0) return;
    timerRef.current = setInterval(() => {
      setResendIn((x) => {
        if (x <= 1) { clearInterval(timerRef.current!); return 0; }
        return x - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resendIn]);

  /* ── Step 1: Send OTP ─────────────────────────────────────── */
  const handleSendOtp = async () => {
    setError('');
    if (!ticketId.trim())  { setError('Please enter your ticket ID.'); return; }
    if (!name.trim())      { setError('Please enter your name.'); return; }
    if (phone.length < 10) { setError('Please enter a valid 10-digit phone number.'); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const code = genOtp();
    setGenOtp(code);
    console.log(`[DEV] OTP for +91${phone}: ${code}`);

    setLoading(false);
    setSentBanner(true);
    setResendIn(30);
    setStep('otp');
    attempts.current = 0;
    setTimeout(() => setSentBanner(false), 4000);
  };

  /* ── OTP input handler ─────────────────────────────────────── */
  const handleOtpChange = (i: number, val: string) => {
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError('');
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) setOtp(pasted.split(''));
    e.preventDefault();
  };

  /* ── Step 2: Verify OTP ────────────────────────────────────── */
  const handleVerify = async () => {
    setError('');
    const entered = otp.join('');
    if (entered.length < 6) { setError('Please enter the complete 6-digit OTP.'); return; }

    /* Throttle: max 5 attempts */
    attempts.current += 1;
    if (attempts.current > 5) {
      setError('Too many attempts. Please refresh and try again.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    if (entered !== generatedOtp) {
      setLoading(false);
      setError(`Incorrect OTP. ${5 - attempts.current} attempt${5 - attempts.current !== 1 ? 's' : ''} remaining.`);
      setOtp(['', '', '', '', '', '']);
      return;
    }

    /* Persist to sessionStorage for dashboard */
    sessionStorage.setItem('stadiumiq_name',   name    || 'Fan');
    sessionStorage.setItem('stadiumiq_ticket', ticketId || 'TKT-2026');

    setLoading(false);
    setStep('success');
    setTimeout(() => router.push('/dashboard'), 1800);
  };

  /* ── Resend OTP ────────────────────────────────────────────── */
  const handleResend = async () => {
    if (resendIn > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const code = genOtp();
    setGenOtp(code);
    console.log(`[DEV] Resent OTP: ${code}`);
    setLoading(false);
    setSentBanner(true);
    setOtp(['', '', '', '', '', '']);
    setError('');
    attempts.current = 0;
    setResendIn(30);
    setTimeout(() => setSentBanner(false), 4000);
  };

  return (
    <div className="login-page">
      {/* Ambient background layer */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(99,102,241,.06),rgba(6,182,212,.04),rgba(139,92,246,.04))', pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <div className="login-wrap">
        {/* Left brand panel */}
        <LoginBrand />

        {/* Right form card */}
        <div className="login-card fade-up d2">

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }} role="status" aria-live="polite">
              <div style={{ fontSize: '3.5rem', marginBottom: 14 }} aria-hidden="true">✅</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--t1)', marginBottom: 9 }}>
                You&apos;re in!
              </h2>
              <p style={{ color: 'var(--t3)', fontSize: '.9rem', lineHeight: 1.75 }}>
                Welcome, <strong style={{ color: 'var(--t1)' }}>{name}</strong>!<br />
                Taking you to your Stadium Dashboard…
              </p>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 7 }} aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="td" style={{ animation: `typing 1.2s ${i * 0.2}s infinite`, width: 9, height: 9 }} />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Ticket form ── */}
          {step === 'ticket' && (
            <LoginForm
              ticketId={ticketId}
              name={name}
              phone={phone}
              loading={loading}
              error={error}
              onTicketChange={setTicketId}
              onNameChange={setName}
              onPhoneChange={setPhone}
              onSubmit={handleSendOtp}
            />
          )}

          {/* ── STEP 2: OTP verify ── */}
          {step === 'otp' && (
            <OtpVerify
              phone={phone}
              otp={otp}
              generatedOtp={generatedOtp}
              loading={loading}
              error={error}
              resendIn={resendIn}
              sentBanner={sentBanner}
              onOtpChange={handleOtpChange}
              onOtpPaste={handleOtpPaste}
              onVerify={handleVerify}
              onResend={handleResend}
              onBack={() => { setStep('ticket'); setError(''); setOtp(['', '', '', '', '', '']); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
