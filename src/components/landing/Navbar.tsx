'use client';

/* ================================================================
   Navbar — Landing Page Navigation
   Extracted from HeroSection for proper separation of concerns.
   Handles scroll-detection for the frosted glass backdrop.
   ================================================================ */
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = ['Features', 'Assistant', 'Live Crowd', 'How It Works', 'About'] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`nav${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" aria-label="StadiumIQ — home">
          <span style={{ fontSize: '1.35rem' }} aria-hidden="true">🏟️</span>
          <span className="nav-logo-text">StadiumIQ</span>
          <span className="nav-badge" aria-label="Live status">LIVE</span>
        </a>

        <ul className="nav-links" role="list">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a href={`#${label.replace(/ /g, '').toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <span className="live-pill" aria-hidden="true">
            <span className="live-dot" />Live
          </span>
          <Link
            href="/login"
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '.83rem' }}
          >
            🎟️ Enter Stadium
          </Link>
        </div>

        <button
          className="nav-ham"
          aria-label="Open mobile menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
