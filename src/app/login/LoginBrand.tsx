'use client';

import Link from 'next/link';

/* ================================================================
   LoginBrand — Left-side branding panel (hidden on mobile)
   ================================================================ */
export default function LoginBrand() {
  return (
    <div className="login-brand fade-up d1">
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 10 }} aria-hidden="true">🏟️</div>
        <Link
          href="/"
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '.8rem', fontWeight: 700, color: 'var(--p)', letterSpacing: '.06em', textTransform: 'uppercase' }}
          aria-label="Back to StadiumIQ home"
        >
          ← StadiumIQ
        </Link>
      </div>

      <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: 13 }}>
        Your match day<br />
        <span className="gradient-text">starts here.</span>
      </h1>
      <p style={{ color: 'var(--t3)', fontSize: '.9rem', lineHeight: 1.8, marginBottom: 22 }}>
        Enter your ticket to access real-time navigation, food ordering, AI assistant, and crowd alerts.
      </p>

      <ul className="login-brand-feats" aria-label="Platform features" style={{ listStyle: 'none', padding: 0 }}>
        {[
          ['🧭', 'Smart Navigation to Seat'],
          ['🤖', 'AI Assistant – Ask Anything'],
          ['🍔', 'Order Food from Seat'],
          ['🚨', 'Emergency Routing & SOS'],
          ['📡', 'Live Crowd Density Map'],
        ].map(([icon, text]) => (
          <li key={text as string} className="lbf">
            <span className="lbf-ico" aria-hidden="true">{icon}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 28, background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.18)', borderRadius: 10, padding: '10px 14px', fontSize: '.74rem', color: 'var(--t3)' }}>
        <strong style={{ color: 'var(--p)' }}>💡 Demo mode</strong><br />
        Use any ticket ID (e.g. <code style={{ color: 'var(--p-d)' }}>TKT-2026</code>) and phone number.
        The OTP will be displayed on the next screen.
      </div>
    </div>
  );
}
