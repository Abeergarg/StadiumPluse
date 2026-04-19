'use client';

/* ================================================================
   HeroSection — Landing Page Hero + Stadium 3D Preview
   Navbar has been extracted to Navbar.tsx.
   ================================================================ */
import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCounter } from '@/lib/hooks';
import { TICKER_ITEMS, ZONE_BADGES } from '@/lib/domain-data';
import Navbar from './Navbar';

const Stadium3D = dynamic(() => import('@/components/Stadium3D'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 440,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg,#eef2ff,#e0f2fe)',
        borderRadius: 18,
        border: '1px solid rgba(99,102,241,.18)',
        boxShadow: '0 8px 40px rgba(99,102,241,.1)',
      }}
      role="img"
      aria-label="Loading 3D Stadium model"
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>🏟️</div>
        <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '.9rem' }}>Rendering 3D Stadium…</p>
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 10 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="td" style={{ animation: `typing 1.2s ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const fans   = useCounter(41230, 800);
  const pct    = useCounter(94, 900);
  const events = useCounter(320, 1000);

  // Kick off scroll-reveal for this page (handled by parent via useReveal in page.tsx)
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />

      {/* ── Hero section ── */}
      <section id="hero" className="hero" aria-labelledby="hero-heading">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge fade-up d1" aria-hidden="true">
            <span className="h-dot" />
            AI-Powered Stadium Experience · PromptWars 2026
          </div>

          <h1 id="hero-heading" className="hero-title fade-up d2">
            Elevate Your<br />
            <span className="gradient-text">Match Day.</span>
          </h1>

          <p className="hero-sub fade-up d3">
            Real-time crowd flow, zero wait times, AI-powered navigation —
            StadiumIQ makes every event extraordinary for 50,000+ fans.
          </p>

          <div className="hero-actions fade-up d4">
            <Link href="/login" className="btn btn-primary btn-lg">🎟️ Enter with Ticket</Link>
            <a href="#features" className="btn btn-ghost btn-lg">Explore Features →</a>
          </div>

          <div className="hero-stats fade-up d5" role="group" aria-label="Live statistics">
            <div>
              <div className="stat-val" aria-live="polite">{fans.toLocaleString()}</div>
              <div className="stat-lbl">Live fans tracked</div>
            </div>
            <div className="stat-div" aria-hidden="true" />
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span className="stat-val" aria-live="polite">{pct}</span>
                <span className="stat-suf" aria-hidden="true">%</span>
              </div>
              <div className="stat-lbl">Wait reduction</div>
            </div>
            <div className="stat-div" aria-hidden="true" />
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span className="stat-val" aria-live="polite">{events}</span>
                <span className="stat-suf" aria-hidden="true">+</span>
              </div>
              <div className="stat-lbl">Events powered</div>
            </div>
          </div>
        </div>

        {/* Live status card */}
        <div className="hero-visual" aria-label="Live stadium status card" role="complementary">
          <div className="h-card">
            <div className="h-card-top">
              <span className="live-dot" aria-hidden="true" />
              <span>LIVE · Match Day</span>
              <span className="h-card-time" aria-label="Current time">18:42</span>
            </div>
            <div className="h-venue">🏟️ Feroz Shah Kotla Ground</div>
            <div className="h-cap-row">
              <span>Stadium Capacity</span>
              <span className="h-cap-pct">78%</span>
            </div>
            <div className="h-bar" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} aria-label="Stadium capacity 78%">
              <div className="h-bar-fill" style={{ width: '78%' }} />
            </div>
            <div className="h-ms-row">
              <div className="h-ms"><span aria-hidden="true">👥</span><div><div className="h-ms-val">41,230</div><div className="h-ms-lbl">Fans inside</div></div></div>
              <div className="h-ms"><span aria-hidden="true">🚗</span><div><div className="h-ms-val">P3: 18 left</div><div className="h-ms-lbl">Parking</div></div></div>
            </div>
            <div className="h-gates" role="group" aria-label="Gate wait times">
              <div className="h-gate g-ok"><span>Gate A</span><span>2 min</span></div>
              <div className="h-gate g-ok"><span>Gate B</span><span>3 min</span></div>
              <div className="h-gate g-md"><span>Gate C</span><span>8 min</span></div>
              <div className="h-gate g-hi"><span>Gate D</span><span>15 min</span></div>
            </div>
            <div className="h-alert" role="alert">⚠️ North Stand 89% — redirect to East entrance</div>
          </div>
        </div>
      </section>

      {/* ── Live ticker ── */}
      <div className="ticker" aria-hidden="true" aria-label="Live stadium updates ticker">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* ── 3D Stadium preview ── */}
      <section id="stadium" className="stadium-s" aria-labelledby="stadium-heading">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag" aria-hidden="true">🏟️ Live Venue</span>
            <h2 id="stadium-heading" className="s-title">
              Interactive Stadium<br /><span className="gradient-text">3D Preview</span>
            </h2>
            <p className="s-sub">
              Drag to rotate · scroll to zoom · crowd density overlaid live from IoT sensors.
            </p>
          </div>
          <div className="reveal">
            <Stadium3D />
          </div>
          <div className="zone-badges reveal" role="group" aria-label="Zone crowd density">
            {ZONE_BADGES.map(({ zone, pct: p, color }) => (
              <div
                key={zone}
                className="zb"
                style={{ background: `${color}18`, border: `1px solid ${color}42`, color }}
                aria-label={`${zone} zone: ${p} capacity`}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} aria-hidden="true" />
                {zone} · {p}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }} className="reveal">
            <Link href="/login" className="btn btn-primary btn-lg">🎟️ Enter Stadium with Ticket</Link>
          </div>
        </div>
      </section>
    </>
  );
}
