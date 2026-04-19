import Link from 'next/link';

export default function Footer() {
  const NAV_LINKS = ['Features', 'Assistant', 'Live Crowd', 'Maps', 'About'];
  const TECH_STACK = ['Next.js 16', 'React 19', 'Google Cloud', 'Gemini AI', 'Firebase', 'Three.js', 'IoT Sensors', 'WebSockets', 'Google Maps', 'GPay API', 'TypeScript'];

  return (
    <>
      {/* ── Maps ── */}
      <section id="maps" className="maps-s">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag">Location</span>
            <h2 className="s-title">Find Your<br /><span className="gradient-text">Stadium</span></h2>
            <p className="s-sub">Google Maps with real-time directions, parking zones, and transit options.</p>
          </div>
          <div className="maps-wrap">
            <div className="map-frame reveal">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6892889226!2d77.23538917550498!3d28.63686727565814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5c2eda8b31%3A0x9a05e71f9d0bd7b4!2sArun+Jaitley+Stadium!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%" height="420" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Arun Jaitley Stadium map"
              />
            </div>
            <div className="mi-list reveal">
              {[
                { i: '📍', l: 'Venue',   v: 'Arun Jaitley Stadium, Delhi' },
                { i: '🚇', l: 'Metro',   v: 'ITO Station · 0.8 km' },
                { i: '🚗', l: 'Parking', v: 'P1–P4 · 1,200+ spots' },
                { i: '🚌', l: 'Bus',     v: 'Routes 505, 620, 723' },
              ].map((m) => (
                <div key={m.l} className="mi-card">
                  <span className="mi-ico">{m.i}</span>
                  <div><div className="mi-lbl">{m.l}</div><div className="mi-val">{m.v}</div></div>
                </div>
              ))}
              <a href="https://maps.google.com/?q=Arun+Jaitley+Stadium+Delhi" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center', textAlign: 'center' }}>
                📍 Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="about-s">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag">Built for PromptWars 2026</span>
            <h2 className="s-title">Intelligent experiences for<br /><span className="gradient-text">every fan, at every game</span></h2>
          </div>
          <div className="ag">
            {[
              { i: '❌', t: 'The Problem',  d: 'Crowd congestion, long queues, poor navigation, and slow emergency response degrade the fan experience.' },
              { i: '✅', t: 'Our Solution', d: 'AI platform with real-time heatmaps, smart navigation, predictive wait times, and a conversational assistant.' },
              { i: '⚙️',t: 'How It Works', d: 'IoT sensors + Google Cloud AI process crowd data live. NLP queries deliver instant guidance.' },
              { i: '📊', t: 'Impact',       d: '94% wait reduction. Better emergency response. 50,000+ fans coordinated simultaneously.' },
            ].map((c) => (
              <div key={c.t} className="a-card reveal">
                <span className="a-icon">{c.i}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>

          <div className="challenge-card reveal">
            <div>
              <div className="ch-label">🏆 Challenge Submission</div>
              <h3 className="ch-title">Prompt War Virtual Challenge</h3>
              <p className="ch-desc">
                StadiumIQ is our submission to the <strong style={{ color: 'var(--t1)' }}>Prompt War Virtual Challenge</strong> organized by{' '}
                <strong style={{ color: 'var(--t1)' }}>Google</strong> &amp; <strong style={{ color: 'var(--t1)' }}>Hack2Skill</strong> — built entirely by AI using{' '}
                <strong style={{ color: 'var(--primary-l)' }}>Google Anti-Gravity</strong>.
              </p>
            </div>
            <div className="ch-stats">
              {[
                ['🤖', 'Built by',     'Google Anti-Gravity'],
                ['🌐', 'Challenge by', 'Google × Hack2Skill'],
                ['🏟️','Domain',        'Physical Event Experience'],
                ['⚡', 'Stack',        'Next.js · Gemini · Firebase'],
              ].map(([ico, lbl, val]) => (
                <div key={lbl} className="ch-stat">
                  <span className="ch-stat-ico">{ico}</span>
                  <div><div className="ch-stat-lbl">{lbl}</div><div className="ch-stat-val">{val}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="ts-row reveal">
            <span className="ts-lbl">Tech Stack:</span>
            <div className="ts-tags">
              {TECH_STACK.map((t) => <span key={t} className="ts-tag">{t}</span>)}
            </div>
          </div>

          <div className="metrics reveal">
            {[
              { v: '94%',  l: 'Wait Time Reduction', w: '94%'  },
              { v: '50K+', l: 'Fans Simultaneous',   w: '100%' },
              { v: '30s',  l: 'IoT Refresh Rate',    w: '50%'  },
              { v: '4.9★', l: 'Fan Satisfaction',    w: '98%'  },
            ].map((m) => (
              <div key={m.v} className="mc">
                <div className="mc-val">{m.v}</div>
                <div className="mc-lbl">{m.l}</div>
                <div className="mc-bar"><div className="mc-fill" style={{ width: m.w }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand reveal">
          <div className="footer-brand-name">StadiumIQ</div>
          <p>AI-powered crowd management &amp; fan experience — making every match day extraordinary.</p>
          <div className="footer-brand-cta">
            <Link href="/login" className="btn btn-primary btn-lg">🎟️ Enter Stadium →</Link>
          </div>
        </div>
        <div className="footer-main">
          <div>
            <div className="footer-logo">🏟️ StadiumIQ</div>
            <p className="footer-desc">AI-powered crowd management and fan experience platform for large sporting events.</p>
          </div>
          <div className="footer-links">
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.replace(/ /g, '').toLowerCase()}`}>{l}</a>
            ))}
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="footer-hw">
            🏆 PromptWars 2026<br />
            <span style={{ color: 'var(--t4)', fontSize: '.7rem' }}>Built 100% by AI · Anti-Gravity</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 StadiumIQ · Built with Anti-Gravity AI</span>
          <span>Google Cloud · Gemini · Firebase · GPay</span>
        </div>
      </footer>
    </>
  );
}
