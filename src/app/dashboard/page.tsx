'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { NAV_ITEMS, MOB_NAV_ITEMS } from '@/lib/constants';
import OverviewTab   from '@/components/dashboard/OverviewTab';
import CrowdTab      from '@/components/dashboard/CrowdTab';
import NavigationTab from '@/components/dashboard/NavigationTab';
import FoodTab       from '@/components/dashboard/FoodTab';
import AssistantTab  from '@/components/dashboard/AssistantTab';
import EmergencyTab  from '@/components/dashboard/EmergencyTab';
import Stadium3DTab  from '@/components/dashboard/Stadium3DTab';
import TicketTab     from '@/components/dashboard/TicketTab';

// ── Tab routing ────────────────────────────────────────────
type TabId = typeof NAV_ITEMS[number]['id'];

function renderTab(tab: TabId) {
  switch (tab) {
    case 'overview':   return <OverviewTab />;
    case 'crowd':      return <CrowdTab />;
    case 'navigation': return <NavigationTab />;
    case 'food':       return <FoodTab />;
    case 'assistant':  return <AssistantTab />;
    case 'emergency':  return <EmergencyTab />;
    case 'stadium3d':  return <Stadium3DTab />;
    case 'ticket':     return <TicketTab />;
    default:           return null;
  }
}

// ── Page ───────────────────────────────────────────────────
export default function DashboardPage() {
  const [active, setActive]   = useState<TabId>('overview');
  const [fanName, setFanName] = useState('Fan');
  const [ticketId, setTicketId] = useState('TK-89244');

  useEffect(() => {
    setFanName(sessionStorage.getItem('stadiumiq_name')   || 'Fan');
    setTicketId(sessionStorage.getItem('stadiumiq_ticket') || 'TK-89244');
  }, []);

  const activeNav = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="db-layout">
      {/* ── Desktop Sidebar ── */}
      <aside className="db-side">
        <div className="db-logo-w">
          <div className="db-logo">
            <span style={{ fontSize: '1.25rem' }}>🏟️</span>
            <span className="db-logo-t">StadiumIQ</span>
            <span className="nav-badge">LIVE</span>
          </div>
        </div>

        <nav className="db-nav" role="tablist" aria-orientation="vertical">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={active === item.id}
              aria-controls="db-tab-panel"
              id={`tab-${item.id}`}
              className={`db-item${active === item.id ? ' db-active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <span className="db-ico" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="db-ftr">
          <div className="db-ticket">
            <div style={{ fontSize: '.7rem', fontWeight: 800, color: 'var(--p-d)', marginBottom: 3 }}>🎟️ Your Ticket</div>
            <div style={{ fontSize: '.8rem',  fontWeight: 700, color: 'var(--t1)' }}>{fanName}</div>
            <div style={{ fontSize: '.73rem', color: 'var(--t3)' }}>Seat M24 · {ticketId}</div>
          </div>
          <Link href="/" className="db-item" style={{ color: 'var(--t3)' }}>
            <span className="db-ico">🏠</span>Back to Home
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="db-main">
        <div className="db-hdr">
          <div>
            <h1 className="db-ttl">{activeNav?.icon} {activeNav?.label}</h1>
            <p className="db-sub">Match Day · Feroz Shah Kotla · Kick-off in 22 mins</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="live-pill"><span className="live-dot" />Live</span>
            <div style={{ background: 'var(--white)', border: '1px solid var(--bd2)', borderRadius: 9, padding: '7px 13px', fontSize: '.8rem', fontWeight: 700, color: 'var(--t3)' }}>
              🕐 18:38
            </div>
          </div>
        </div>

        <div
          id="db-tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          {renderTab(active)}
        </div>
      </main>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="mob-nav">
        <div className="mob-nav-inner">
          {MOB_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`mob-nav-item${active === item.id ? ' active' : ''}`}
              onClick={() => setActive(item.id as TabId)}
              aria-label={item.label}
            >
              <span className="mnav-ico">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
