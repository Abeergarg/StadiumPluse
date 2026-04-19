'use client';

import { memo } from 'react';
import { useLiveCount, useGoogleAnalytics } from '@/lib/hooks';

/* ================================================================
   OverviewTab — Live statistics + crowd mini-map + gate status
   GA4: fires 'tab_view' on mount for analytics dashboards.
   ================================================================ */
const OverviewTab = memo(function OverviewTab() {
  const { trackEvent } = useGoogleAnalytics();

  const fans    = useLiveCount(41230, 400);
  const avgWait = useLiveCount(4, 2);
  const parking = useLiveCount(138, 20);
  const alerts  = useLiveCount(3, 1);

  const absAlerts  = Math.abs(alerts);
  const absAvgWait = Math.abs(avgWait);

  return (
    <div>
      {/* ── Stat cards ── */}
      <section aria-label="Live statistics" className="db-stats">
        {[
          { i: '👥', bg: 'rgba(99,102,241,.1)',  lbl: 'Fans Inside',   val: fans.toLocaleString(),         ch: '+2.1K · 30min',    up: true  },
          { i: '⏱',  bg: 'rgba(6,182,212,.1)',   lbl: 'Avg Wait',      val: `${absAvgWait} min`,           ch: '↓67% vs baseline', up: true  },
          { i: '🚗', bg: 'rgba(245,158,11,.1)',  lbl: 'Parking Left',  val: parking.toString(),            ch: 'P3 Zone — fast',   up: false },
          { i: '⚠️', bg: 'rgba(220,38,38,.1)',   lbl: 'Live Alerts',   val: absAlerts.toString(),          ch: '1 critical · 2 info', up: false },
        ].map((s) => (
          <article key={s.lbl} className="db-stat" aria-label={`${s.lbl}: ${s.val}`}>
            <div className="dsi" style={{ background: s.bg }} aria-hidden="true">{s.i}</div>
            <div className="ds-lbl">{s.lbl}</div>
            <div className="ds-val" aria-live="polite">{s.val}</div>
            <div className={`ds-ch ${s.up ? 'ch-up' : 'ch-dn'}`} aria-label={s.ch}>{s.ch}</div>
          </article>
        ))}
      </section>

      <div className="db-grid">
        {/* ── Crowd mini-map ── */}
        <div className="db-card">
          <h2 className="db-ct">🌊 Live Crowd Map</h2>
          <div
            role="img"
            aria-label="Stadium crowd density map: North 35%, East 89%, West 60%, South 67%"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto auto', gap: 7, minHeight: 200 }}
          >
            {[
              { id: 'n', label: 'NORTH · 35%', col: '1/-1', row: 1, fill: 'rgba(5,150,105,.22)',  pct: '35%' },
              { id: 'w', label: 'WEST · 60%',  col: '1',    row: 2, fill: 'rgba(217,119,6,.28)',  pct: '60%' },
              { id: 'c', label: null,           col: '2',    row: 2, fill: null,                  pct: null  },
              { id: 'e', label: 'EAST · 89%🔴', col: '3',   row: 2, fill: 'rgba(220,38,38,.3)',  pct: '89%' },
              { id: 's', label: 'SOUTH · 67%', col: '1/-1', row: 3, fill: 'rgba(217,119,6,.26)',  pct: '67%' },
            ].map((z) => (
              <div
                key={z.id}
                style={{
                  gridColumn: z.col, gridRow: String(z.row),
                  background: 'var(--bg)', border: '1px solid var(--bd2)', borderRadius: 8,
                  padding: '8px 7px', fontSize: '.69rem', fontWeight: 700, color: 'var(--t3)',
                  position: 'relative', overflow: 'hidden',
                  minHeight: z.id === 'n' || z.id === 's' ? 44 : 72,
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                }}
              >
                {z.pct && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: z.pct,
                    background: `linear-gradient(to top,${z.fill},transparent)`,
                    transition: 'height 1s ease',
                  }} />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{z.id === 'c' ? '⚽' : z.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Gate status + alerts ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="db-card">
            <h2 className="db-ct">🚪 Gate Status</h2>
            <div role="list">
              {[['Gate A','Open · 2 min','b-g'],['Gate B','Open · 3 min','b-g'],['Gate C','Busy · 8 min','b-y'],['Gate D','15 min wait','b-r']].map(([g,s,c]) => (
                <div key={g} className="gate-row" role="listitem">
                  <span>{g}</span>
                  <span className={`badge ${c}`} aria-label={`${g}: ${s}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="db-card">
            <h2 className="db-ct">
              ⚡ Live Alerts <span className="a-badge" aria-label={`${absAlerts} active alerts`}>{absAlerts}</span>
            </h2>
            <div className="al-list" role="log" aria-live="polite" aria-label="Live alerts">
              <div className="al al-w" role="alert">⚠️ North Stand 89% — redirect to East</div>
              <div className="al al-i">💡 Best food window: next 8 mins</div>
              <div className="al al-s">✅ Emergency exits verified clear</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default OverviewTab;
