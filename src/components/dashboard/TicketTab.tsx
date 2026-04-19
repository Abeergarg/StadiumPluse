'use client';

import { memo, useEffect, useState } from 'react';

/* ================================================================
   TicketTab — Digital ticket representation
   Bugs fixed:
   - Duplicate `color` style prop on Seat value (TypeScript error)
   - QR absolute-positioned children had no positioned parent
   - Hardcoded "John Doe" — now reads from sessionStorage
   - Math.random() in render causes hydration mismatch — moved to useMemo
   ================================================================ */

/** Deterministic QR cell pattern seeded from ticketId */
function buildQrCells(seed: string): boolean[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return Array.from({ length: 25 }, (_, i) => ((hash >> (i % 32)) & 1) === 1);
}

const TicketTab = memo(function TicketTab() {
  const [fanName, setFanName]   = useState('John Doe');
  const [ticketId, setTicketId] = useState('TKT-2026-A1B2');

  // Read real values written by login flow
  useEffect(() => {
    const n = sessionStorage.getItem('stadiumiq_name');
    const t = sessionStorage.getItem('stadiumiq_ticket');
    if (n) setFanName(n);
    if (t) setTicketId(t);
  }, []);

  // Deterministic QR — avoids hydration mismatch from Math.random()
  const qrCells = buildQrCells(ticketId);

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <div
        className="db-card"
        style={{ overflow: 'hidden', padding: 0, border: 'none', boxShadow: '0 12px 40px rgba(0,0,0,.08)' }}
        role="region"
        aria-label="Digital ticket"
      >
        {/* ── Ticket Header ── */}
        <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e1b4b)', color: '#fff', padding: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top right, rgba(99,102,241,.2), transparent 60%)', pointerEvents: 'none' }} aria-hidden="true" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--p-l)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                World Cup 2026
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.6rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                Final Match
              </h2>
              <div style={{ fontSize: '.85rem', color: '#cbd5e1', marginTop: 4 }}>Arun Jaitley Stadium, Delhi</div>
            </div>
            <div
              style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', padding: '6px 12px', borderRadius: 8, fontSize: '.75rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}
              aria-label="Match date: October 24"
            >
              OCT 24
            </div>
          </div>
        </div>

        {/* ── Perforated divider ── */}
        <div style={{ height: 20, background: 'var(--bg)', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }} aria-hidden="true">
          <div style={{ position: 'absolute', left: -10, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,.06)' }} />
          <div style={{ width: '100%', borderTop: '2px dashed #e2e8f0' }} />
          <div style={{ position: 'absolute', right: -10, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,.06)' }} />
        </div>

        {/* ── Ticket Details ── */}
        <div style={{ background: 'var(--bg)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Gate / Section / Seat grid */}
          <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, margin: 0 }}>
            {[
              { label: 'Gate',    value: 'B',    accent: false },
              { label: 'Section', value: 'M',    accent: false },
              { label: 'Seat',    value: '24',   accent: true  },
            ].map(({ label, value, accent }) => (
              <div key={label}>
                <dt style={{ fontSize: '.7rem', color: 'var(--t4)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                  {label}
                </dt>
                <dd style={{ fontSize: '1.4rem', fontWeight: 800, color: accent ? 'var(--p-d)' : 'var(--t1)', margin: 0 }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Ticket ID + QR code */}
          <div style={{ borderTop: '1px solid var(--bd2)', paddingTop: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.75rem', color: 'var(--t4)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>
                Ticket ID
              </div>
              <div
                style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--t2)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '.05em' }}
                aria-label={`Ticket ID: ${ticketId}`}
              >
                {ticketId}
              </div>
              <div style={{ fontSize: '.8rem', color: 'var(--t3)', marginTop: 8 }}>{fanName}</div>
            </div>

            {/* Mock QR Code — deterministic from ticketId, no absolute children */}
            <div
              style={{
                width: 80, height: 80,
                background: '#fff',
                border: '1px solid var(--bd2)',
                borderRadius: 8,
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridTemplateRows: 'repeat(5, 1fr)',
                gap: 2,
                padding: 6,
              }}
              aria-label="QR code for ticket entry"
              role="img"
            >
              {qrCells.map((filled, i) => (
                <div
                  key={i}
                  style={{
                    background: filled ? '#0f172a' : 'transparent',
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--ok-l)', border: '1px solid rgba(5,150,105,.22)', borderRadius: 10, padding: '10px 14px' }}
            role="status"
            aria-live="polite"
          >
            <span aria-hidden="true" style={{ fontSize: '1rem' }}>✅</span>
            <div>
              <div style={{ fontSize: '.78rem', fontWeight: 800, color: 'var(--ok)' }}>Valid · Seat Entry Confirmed</div>
              <div style={{ fontSize: '.72rem', color: 'var(--t3)', marginTop: 2 }}>Present this ticket at Gate B turnstile</div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: 18, fontSize: '.83rem', color: 'var(--t3)' }}>
        Scan at the Gate B turnstile for entry
      </p>
    </div>
  );
});

export default TicketTab;
