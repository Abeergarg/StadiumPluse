'use client';

import { useRef } from 'react';

interface OtpVerifyProps {
  phone: string;
  otp: string[];
  generatedOtp: string;
  loading: boolean;
  error: string;
  resendIn: number;
  sentBanner: boolean;
  onOtpChange: (i: number, val: string) => void;
  onOtpPaste: (e: React.ClipboardEvent) => void;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

/* ================================================================
   OtpVerify — Step 2: 6-digit OTP digit entry + verify
   ================================================================ */
export default function OtpVerify({
  phone, otp, generatedOtp, loading, error, resendIn, sentBanner,
  onOtpChange, onOtpPaste, onVerify, onResend, onBack,
}: OtpVerifyProps) {
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft'  && i > 0) otpRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(-1);
    onOtpChange(i, v);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  return (
    <section aria-labelledby="otp-heading">
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'var(--p)', fontWeight: 700, fontSize: '.8rem', cursor: 'pointer', marginBottom: 10, padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          aria-label="Go back to ticket details"
        >
          ← Back
        </button>
        <div style={{ fontSize: '1.7rem', marginBottom: 8 }} aria-hidden="true">📱</div>
        <h2
          id="otp-heading"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.3rem', fontWeight: 800, color: 'var(--t1)', marginBottom: 5 }}
        >
          Verify Your Number
        </h2>
        <p style={{ color: 'var(--t3)', fontSize: '.83rem' }}>
          Enter the 6-digit OTP sent to <strong style={{ color: 'var(--t1)' }}>+91 {phone}</strong>
        </p>
      </div>

      {/* OTP sent confirmation banner */}
      {sentBanner && (
        <div className="sent-banner" role="status" aria-live="polite">
          ✅ OTP sent! Check your phone.
          <div style={{ marginTop: 8, fontSize: '1.2rem', fontWeight: 800, color: 'var(--p)' }}>
            DEMO OTP: {generatedOtp}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ background: 'var(--err-l)', border: '1px solid rgba(220,38,38,.22)', borderRadius: 9, padding: '9px 13px', fontSize: '.8rem', color: 'var(--err)', marginBottom: 14, fontWeight: 600 }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* OTP boxes */}
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend className="sr-only">Enter the 6-digit OTP</legend>
        <div
          className="otp-wrap"
          onPaste={onOtpPaste}
          role="group"
          aria-label="OTP digit inputs"
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { otpRefs.current[i] = el; }}
              className={`otp-box${digit ? ' filled' : ''}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              aria-label={`OTP digit ${i + 1} of 6`}
            />
          ))}
        </div>
      </fieldset>

      {/* Resend */}
      <div className="otp-resend" aria-live="polite">
        {resendIn > 0
          ? `Resend OTP in ${resendIn}s`
          : <><span>Didn&apos;t receive it? </span><button onClick={onResend} disabled={loading}>Resend OTP</button></>
        }
      </div>

      <button
        className="login-btn"
        onClick={onVerify}
        disabled={loading || otp.join('').length < 6}
        aria-busy={loading}
      >
        {loading ? '⏳ Verifying…' : '✅ Verify & Enter Stadium →'}
      </button>

      {/* Dev hint — shows the generated OTP for demo */}
      <div style={{ marginTop: 14, background: 'rgba(99,102,241,.07)', borderRadius: 8, padding: '8px 12px', fontSize: '.85rem', color: 'var(--t1)', textAlign: 'center', fontWeight: 'bold' }}>
        🔧 Demo Mode: Your OTP is {generatedOtp}
      </div>
    </section>
  );
}
