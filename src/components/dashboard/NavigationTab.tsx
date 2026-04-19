'use client';

import { memo, useEffect, useRef } from 'react';
import { encodeForUrl } from '@/lib/sanitize';
import { env, isMapsConfigured } from '@/lib/env';
import { useGoogleAnalytics } from '@/lib/hooks';

/* ================================================================
   NavigationTab — Google Maps JS API + Indoor route steps
   Falls back to embed iframe when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   is not configured.
   ================================================================ */

const STADIUM_LAT = 28.6369;
const STADIUM_LNG = 77.2359;
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6892889226!2d77.23538917550498!3d28.63686727565814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5c2eda8b31%3A0x9a05e71f9d0bd7b4!2sArun+Jaitley+Stadium!5e0!3m2!1sen!2sin!4v1700000000000';

const DIRECTIONS_URL = `https://maps.google.com/?q=${encodeForUrl('Arun Jaitley Stadium Delhi')}`;

/** Google Maps JS API interactive map */
function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useGoogleAnalytics();

  useEffect(() => {
    if (!mapRef.current || !isMapsConfigured()) return;

    const loadMap = async () => {
      try {
        // New functional API (Loader class is deprecated in v2)
        const { setOptions, importLibrary } = await import('@googlemaps/js-api-loader');

        setOptions({
          key:       env.maps.apiKey,
          v:         'weekly',
          libraries: ['maps', 'marker'],
        });

        const { Map }                 = await importLibrary('maps');
        const { AdvancedMarkerElement } = await importLibrary('marker');

        const map = new Map(mapRef.current!, {
          center:           { lat: STADIUM_LAT, lng: STADIUM_LNG },
          zoom:             16,
          mapId:            'STADIUM_PULSE_MAP',
          mapTypeControl:   false,
          fullscreenControl: false,
          streetViewControl: false,
        });

        const markerEl = document.createElement('div');
        markerEl.innerHTML = '<div style="font-size:2rem;filter:drop-shadow(0 2px 6px rgba(99,102,241,.5))">🏟️</div>';

        new AdvancedMarkerElement({
          map,
          position: { lat: STADIUM_LAT, lng: STADIUM_LNG },
          title:    'Arun Jaitley Stadium — Entry Gate B',
          content:  markerEl,
        });

        trackEvent('maps_view', { venue: 'Arun Jaitley Stadium' });
      } catch {
        // SDK failed to load — EmbedMap fallback renders automatically
      }
    };

    loadMap();
  }, [trackEvent]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: 260, background: 'var(--bg)' }}
      aria-label="Interactive Google Map showing Arun Jaitley Stadium"
      role="application"
    />
  );
}

/** Fallback embed when Maps API key is absent */
function EmbedMap() {
  return (
    <iframe
      src={MAPS_EMBED_URL}
      width="100%"
      height="260"
      style={{ border: 0, display: 'block' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Arun Jaitley Stadium location on Google Maps"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

const NavigationTab = memo(function NavigationTab() {
  const { trackEvent } = useGoogleAnalytics();

  return (
    <div className="db-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Route to seat */}
        <div className="db-card">
          <h2 className="db-ct">🧭 Route to Seat M24</h2>
          <p style={{ color: 'var(--t3)', fontSize: '.83rem', marginBottom: 14 }}>Section M · Row 4 · Level 2</p>
          <ol aria-label="Step-by-step route to your seat" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['📍', 'Gate B Entrance',            'var(--p)'],
              ['➡️', 'Corridor 3 (shortest path)', 'var(--acc)'],
              ['⬆️', 'Lift A to Level 2',           'var(--t3)'],
              ['✅', 'Seat M24 — Arrive!',           'var(--ok)'],
            ].map(([icon, text, color], idx) => (
              <li key={idx} className="route-step">
                <span aria-hidden="true">{icon}</span>
                <span style={{ color, fontWeight: 600 }}>{text}</span>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge b-g">~3 min walk</span>
            <span className="badge b-g">Gate B: 3 min wait</span>
            <span className="badge b-y">Elevator: 1 min</span>
          </div>
        </div>

        {/* Transit options */}
        <div className="db-card">
          <h2 className="db-ct">🚇 Transit Options</h2>
          <ul aria-label="Transit options to the stadium" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['🚇', 'Metro', 'ITO Station · Blue Line · 0.8 km'],
              ['🚌', 'Bus',   'Routes 505, 620, 723 · Gate A'],
              ['🚗', 'Taxi',  'Pickup: Gate D exit ramp'],
              ['🚶', 'Walk',  '5 min from metro station'],
            ].map(([ico, type, detail]) => (
              <li key={type as string} style={{ display:'flex', gap:12, padding:'9px 0', borderBottom:'1px solid var(--bd2)', alignItems:'flex-start' }}>
                <span aria-hidden="true" style={{ fontSize:'1.2rem', padding:5, background:'var(--p-xl)', borderRadius:7, flexShrink:0 }}>{ico}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:'.85rem', color:'var(--t1)' }}>{type}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--t3)', marginTop:2 }}>{detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Map panel */}
      <div className="db-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--bd2)' }}>
          <h2 className="db-ct" style={{ marginBottom: 0 }}>🗺️ Venue Map</h2>
        </div>

        {isMapsConfigured() ? <InteractiveMap /> : <EmbedMap />}

        <div style={{ padding: '12px 16px' }}>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => trackEvent('maps_directions_click', { venue: 'Arun Jaitley Stadium' })}
            aria-label="Open full directions to Arun Jaitley Stadium in Google Maps (opens new tab)"
          >
            📍 Get Full Directions →
          </a>
        </div>
      </div>
    </div>
  );
});

export default NavigationTab;
