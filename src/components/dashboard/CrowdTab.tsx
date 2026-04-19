'use client';

import { memo } from 'react';

/* ================================================================
   CrowdTab — Real-time density by zone + wait times
   ================================================================ */
const CrowdTab = memo(function CrowdTab() {
  return (
    <div>
      <div className="db-card" style={{ marginBottom: 16 }}>
        <h2 className="db-ct">🌊 Real-Time Density by Zone</h2>
        <div
          role="list"
          aria-label="Zone crowd density"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 11 }}
        >
          {[
            ['North Stand', '35%', 'var(--ok)'],
            ['East Wing',   '89%', 'var(--err)'],
            ['West Stand',  '60%', 'var(--warn)'],
            ['South End',   '67%', 'var(--warn)'],
            ['VIP Lounge',  '41%', 'var(--ok)'],
            ['Center Field','94%', 'var(--err)'],
          ].map(([z, p, c]) => (
            <div
              key={z}
              role="listitem"
              aria-label={`${z}: ${p} occupied`}
              style={{ background:`${c}12`, border:`1px solid ${c}28`, borderRadius:12, padding:'14px 16px' }}
            >
              <div style={{ fontWeight:700, fontSize:'.83rem', marginBottom:7, color:'var(--t2)' }}>{z}</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'1.55rem', fontWeight:900, color:c }}
                aria-live="polite">{p}</div>
              <div style={{ background:'rgba(0,0,0,.06)', borderRadius:100, height:5, marginTop:7, overflow:'hidden' }}
                role="progressbar" aria-valuenow={parseInt(p)} aria-valuemin={0} aria-valuemax={100}>
                <div style={{ width:p, height:'100%', background:c, borderRadius:100, transition:'width 1s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="db-card">
        <h2 className="db-ct">⏱ Wait Times</h2>
        <div className="wait-rows" role="list" aria-label="Location wait times">
          {[
            ['Gate A',        '12%', 'wb',        '2 min'],
            ['Concession B',  '60%', 'wb wb-m',   '12 min'],
            ['Restrooms (S)', '35%', 'wb',         '4 min'],
            ['Gate D',        '85%', 'wb wb-h',   '15 min'],
          ].map(([l, w, c, t]) => (
            <div key={l} className="wait-row" role="listitem" aria-label={`${l}: ${t} wait`}>
              <span style={{ minWidth: 110, color: 'var(--t2)' }}>{l}</span>
              <div className="wb-wrap">
                <div
                  className={c}
                  style={{ width: w }}
                  role="progressbar"
                  aria-valuenow={parseInt(w)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${parseInt(w)}% full`}
                />
              </div>
              <span className="wt" aria-hidden="true">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CrowdTab;
