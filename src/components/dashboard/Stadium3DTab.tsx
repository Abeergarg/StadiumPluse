'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';

const Stadium3D = dynamic(() => import('@/components/Stadium3D'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg,#eef2ff,#e0f2fe)',
        borderRadius: 18,
        border: '1px solid rgba(99,102,241,.18)',
      }}
      role="img"
      aria-label="Loading interactive 3D stadium"
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '.9rem' }}>Loading Stadium Model…</p>
      </div>
    </div>
  ),
});

/* ================================================================
   Stadium3DTab — Wrapped stadium component for dashboard
   ================================================================ */
const Stadium3DTab = memo(function Stadium3DTab() {
  return (
    <div className="db-card" style={{ height: 'calc(100vh - 120px)', minHeight: 460, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--bd2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)' }}>
        <h2 className="db-ct" style={{ marginBottom: 0 }}>🏟️ 3D Stadium Explorer</h2>
        <span className="badge b-b" style={{ fontSize: '.7rem' }}>Interactive</span>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <Stadium3D />
      </div>
    </div>
  );
});

export default Stadium3DTab;
