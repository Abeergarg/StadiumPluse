'use client';

import { memo } from 'react';
import { useGoogleAnalytics } from '@/lib/hooks';
import { env } from '@/lib/env';

/* ================================================================
   EmergencyTab — SOS integration
   Sends GA4 event and routes to Google Meet SOS room.
   ================================================================ */
const EmergencyTab = memo(function EmergencyTab() {
  const { trackEvent } = useGoogleAnalytics();

  const handleSOS = () => {
    trackEvent('sos_trigger', { location: 'Seat M24' });
    
    // Open fixed Meet room
    window.open(env.meet.sosUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="db-grid">
      <div className="db-card" style={{ border: '1px solid rgba(220,38,38,.2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--err)', zIndex: 1 }} />
        <div style={{ background: 'var(--err-l)', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 16, position: 'relative' }}>
          🚨
          <div style={{ position: 'absolute', inset: -4, border: '1px solid var(--err)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite' }} />
        </div>
        <h2 className="db-ct" style={{ fontSize: '1.4rem' }}>Emergency SOS</h2>
        <p style={{ color: 'var(--t3)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: 24 }}>
          Tap the button below to immediately open a priority video call with stadium security command. Your location (Seat M24) will be automatically shared.
        </p>

        <button
          onClick={handleSOS}
          aria-label="Trigger SOS Video Call with Security"
          style={{
            background: 'var(--err)', color: '#fff', border: 'none', borderRadius: 12, padding: '16px 24px', width: '100%', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 8px 24px rgba(220,38,38,.3)', transition: 'transform 0.2s ease',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.3rem' }} aria-hidden="true">📹</span> Meet Security
        </button>

        <div style={{ marginTop: 18, fontSize: '.78rem', color: 'var(--t4)', textAlign: 'center' }}>
          * False alarms may result in eviction from the venue.
        </div>
      </div>

      <div className="db-card">
        <h2 className="db-ct">🏃 Evacuation Route</h2>
        <div style={{ background: 'rgba(5,150,105,.08)', border: '1px solid rgba(5,150,105,.2)', borderRadius: 12, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: '2rem' }} aria-hidden="true">✅</div>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--ok)', fontSize: '1.05rem', marginBottom: 4 }}>All Exits Clear</div>
            <div style={{ fontSize: '.8rem', color: 'var(--t3)' }}>No current emergencies in the venue.</div>
          </div>
        </div>

        <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--t2)', marginBottom: 12 }}>Your Assigned Escape Path</h3>
        <ol aria-label="Emergency evacuation path" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            ['🚪', 'Leave Seat M24 towards Corridor 3'],
            ['⬇️', 'Take Stairs B down to Level 1'],
            ['🏃', 'Exit through Gate A (North)'],
            ['📍', 'Assemble in Zone 2 Parking'],
          ].map(([ico, text]) => (
            <li key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '.84rem', padding: '10px 14px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--bd2)' }}>
              <span style={{ fontSize: '1.1rem' }} aria-hidden="true">{ico}</span>
              <span style={{ fontWeight: 600, color: 'var(--t1)' }}>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
});

export default EmergencyTab;
