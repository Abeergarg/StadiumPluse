'use client';

import { useState, useRef, useCallback } from 'react';
import { FEATURES, DEMO_CHAT_MSGS, DEMO_CHAT_SUGGESTIONS, DEMO_CHAT_BOT } from '@/lib/constants';

// ── Feature card demos ─────────────────────────────────────
function FeatureDemos({ demo }: { demo: string }) {
  switch (demo) {
    case 'heatmap': return (
      <>
        <div className="hm-grid">
          {[['North','32%','hm-l'],['Center','94%','hm-h'],['South','67%','hm-m'],
            ['East','58%','hm-m'],['VIP','41%','hm-l'],['West','89%','hm-h']].map(([z,p,c])=>(
            <div key={z} className={`hm-cell ${c}`}>{z}<br />{p}</div>
          ))}
        </div>
        <div className="hm-leg"><span>🟢 Low</span><span>🟡 Moderate</span><span>🔴 High</span></div>
      </>
    );
    case 'nav': return (
      <div className="nav-steps">
        <div className="nav-step">📍 Gate B Entrance</div>
        <div className="nav-step nav-step-a">➡️ Corridor 3 (optimal)</div>
        <div className="nav-step nav-step-ok">✅ Seat M24 — 3 min</div>
      </div>
    );
    case 'wait': return (
      <div className="wt-rows">
        {[['Gate A','18%','2 min'],['Concession B','60%','12 min'],['Restroom','35%','4 min'],['Gate C','45%','8 min']].map(([l,w,t])=>(
          <div key={l} className="wt-row">
            <span style={{ minWidth:96,color:'var(--t3)',fontWeight:600,fontSize:'.75rem' }}>{l}</span>
            <div className="wt-bar"><div className="wt-fill" style={{ width:w }} /></div>
            <span className="wt-t">{t}</span>
          </div>
        ))}
      </div>
    );
    case 'alerts': return (
      <div className="adl">
        <div className="adl-w">⚠️ Gate C closing at 19:00 — use Gate B</div>
        <div className="adl-i">💡 Best food window: next 12 mins</div>
        <div className="adl-ok">✅ Seat M24 confirmed &amp; accessible</div>
      </div>
    );
    case 'order': return (
      <div className="order-demo">
        {[['🌮 Loaded Nachos','₹320'],['☕ Cold Brew','₹180'],['🍔 Veggie Burger','₹260']].map(([n,p])=>(
          <div key={n as string} className="order-row">
            <span className="order-name">{n}</span>
            <span className="order-price">{p}</span>
            <button className="btn-add">+ Add</button>
          </div>
        ))}
        <div className="order-sum">
          <span>3 items · ₹760</span>
          <button className="btn-checkout">Pay via GPay →</button>
        </div>
      </div>
    );
    case 'emergency': return (
      <div>
        <div className="emer-s"><span className="emer-dot" />All exits clear</div>
        <div className="emer-ex">
          <div>🚪 Exit A — 40m South (primary)</div>
          <div>🚪 Exit C — 65m East (secondary)</div>
          <div>🏥 Medical — Level 2, Gate B</div>
        </div>
      </div>
    );
    default: return null;
  }
}

// ── AI chat panel ──────────────────────────────────────────
function DemoChatPanel() {
  const [msgs, setMsgs]     = useState([...DEMO_CHAT_MSGS]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const chatEnd             = useRef<HTMLDivElement>(null);

  const send = useCallback((text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setMsgs((p) => [...p, { r: 'usr', t: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = DEMO_CHAT_BOT[msg] || `Checking live data for "${msg}"… Gate B is fastest entry now.`;
      setMsgs((p) => [...p, { r: 'bot', t: reply }]);
      chatEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1100);
  }, [input]);

  return (
    <div className="chatbox reveal">
      <div className="chat-hd">
        <span className="chat-av">🤖</span>
        <div>
          <div className="chat-name">StadiumIQ Assistant</div>
          <div className="chat-st"><span className="live-dot" />Online · Real-time</div>
        </div>
        <span style={{ marginLeft:'auto',fontSize:'.76rem',fontWeight:800,color:'var(--warning)' }}>⭐ 4.9</span>
      </div>
      <div className="chat-msgs">
        {msgs.map((m, i) => (
          <div key={i} className={`msg msg-${m.r === 'bot' ? 'bot' : 'usr'}`}>
            <div className="bubble">{m.t}</div>
          </div>
        ))}
        {typing && (
          <div className="msg msg-bot">
            <div className="bubble">
              <div className="typing"><div className="td" /><div className="td" /><div className="td" /></div>
            </div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>
      <div className="chat-sug">
        {DEMO_CHAT_SUGGESTIONS.map((s) => (
          <button key={s} className="sug-btn" onClick={() => send(s)}>{s}</button>
        ))}
      </div>
      <div className="chat-in">
        <input className="chat-input" placeholder="Ask anything about the stadium…" value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} aria-label="Chat input" />
        <button className="chat-send" onClick={() => send()}>➤</button>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────
export default function FeatureSections() {
  return (
    <>
      {/* Features grid */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag">Platform Features</span>
            <h2 className="s-title">Everything You Need<br /><span className="gradient-text">at the Game</span></h2>
            <p className="s-sub">Intelligent tools from entry to exit — powered by Google Cloud, Gemini AI, and IoT sensors.</p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`feat-card reveal${f.wide ? ' feat-wide' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`feat-icon ${f.cls}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <FeatureDemos demo={f.demo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="howitworks" className="how-s">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag">Pipeline</span>
            <h2 className="s-title">From IoT to fan experience<br /><span className="gradient-text">in 30 seconds</span></h2>
          </div>
          <div className="how-steps">
            {[
              { n:'01',i:'📡',t:'IoT Collection', d:'Bluetooth beacons, pressure sensors & cameras across all zones.' },
              { n:'02',i:'🤖',t:'AI Processing',  d:'ML models predict wait times, detect congestion, generate routes.' },
              { n:'03',i:'☁️',t:'Cloud & APIs',   d:'Google Cloud WebSockets stream updates every 30 seconds.' },
              { n:'04',i:'📱',t:'Fan Experience', d:'Real-time chat, alerts, navigation & ordering at your fingertips.' },
            ].map((s, i, a) => (
              <div key={s.n} style={{ display: 'contents' }}>
                <div className="how-step reveal">
                  <div className="how-num">STEP {s.n}</div>
                  <span className="how-icon">{s.i}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
                {i < a.length - 1 && <div className="how-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant demo */}
      <section id="assistant" className="asst-s">
        <div className="container">
          <div className="asst-wrap">
            <div className="reveal">
              <span className="s-tag">AI Assistant</span>
              <h2 className="s-title">Ask StadiumIQ<br /><span className="gradient-text">Anything</span></h2>
              <p className="s-sub">Powered by Gemini AI — knows your stadium live. Ask in plain English.</p>
              <div className="asst-feats">
                {[
                  { i:'🗣️',t:'Natural Language',  d:'Ask anything in plain English. No menus to navigate.' },
                  { i:'⚡', t:'Real-Time Answers', d:'Live IoT data refreshed every 30 seconds.' },
                  { i:'🗺️',t:'Context-Aware',     d:'Navigation adapts to your live location inside the venue.' },
                ].map((f) => (
                  <div key={f.t} className="af">
                    <span className="af-ico">{f.i}</span>
                    <div><strong>{f.t}</strong><span> — {f.d}</span></div>
                  </div>
                ))}
              </div>
              <div className="tech-pills">
                {['Google Cloud','Gemini AI','Firebase','IoT Sensors','WebSockets'].map((t) => (
                  <span key={t} className="tp">{t}</span>
                ))}
              </div>
            </div>
            <DemoChatPanel />
          </div>
        </div>
      </section>

      {/* Live crowd monitor */}
      <section id="livecrowd" className="crowd-s">
        <div className="container">
          <div className="s-head reveal">
            <span className="s-tag">Live Monitor</span>
            <h2 className="s-title">Real-Time<br /><span className="gradient-text">Stadium Monitor</span></h2>
            <p className="s-sub">Live IoT data across all zones, updated every 30 seconds.</p>
          </div>
          <div className="crowd-grid">
            <div className="reveal">
              <div className="smap">
                <div className="zone" id="zn"><div className="zone-fill" style={{ height:'35%',background:'linear-gradient(to top,rgba(52,211,153,.28),transparent)' }}/><span className="zone-lbl">NORTH · 35%</span></div>
                <div className="zone" id="zw"><div className="zone-fill" style={{ height:'60%',background:'linear-gradient(to top,rgba(251,191,36,.3),transparent)' }}/><span className="zone-lbl">WEST · 60%</span></div>
                <div className="zpitch"><span className="zpitch-ico">⚽</span><span className="zpitch-lbl">PITCH</span></div>
                <div className="zone" id="ze"><div className="zone-fill" style={{ height:'89%',background:'linear-gradient(to top,rgba(248,113,113,.35),transparent)' }}/><span className="zone-lbl">EAST · 89% 🔴</span></div>
                <div className="zone" id="zs"><div className="zone-fill" style={{ height:'67%',background:'linear-gradient(to top,rgba(251,191,36,.28),transparent)' }}/><span className="zone-lbl">SOUTH · 67%</span></div>
              </div>
              <div className="smap-leg">
                <span className="leg-item leg-l">Low &lt;50%</span>
                <span className="leg-item leg-m">Moderate 50–80%</span>
                <span className="leg-item leg-h">High &gt;80%</span>
              </div>
            </div>
            <div className="cd-panels reveal">
              <div className="cd-panel">
                <h4>🚪 Gate Status</h4>
                <div className="gate-list">
                  {[['Gate A','Open','b-g'],['Gate B','Open','b-g'],['Gate C','Busy','b-y'],['Gate D','Congested','b-r']].map(([g,s,c])=>(
                    <div key={g} className="gate-row"><span>{g}</span><span className={`badge ${c}`}>{s}</span></div>
                  ))}
                </div>
              </div>
              <div className="cd-panel">
                <h4>⏱ Wait Times</h4>
                <div className="wait-rows">
                  {[['Gate A','12%','wb','2 min'],['Concession B','60%','wb wb-m','12 min'],['Restrooms','35%','wb','4 min'],['Gate D','85%','wb wb-h','15 min']].map(([l,w,c,t])=>(
                    <div key={l} className="wait-row">
                      <span style={{ minWidth:104 }}>{l}</span>
                      <div className="wb-wrap"><div className={c as string} style={{ width:w as string }} /></div>
                      <span className="wt">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cd-panel">
                <h4>⚡ Live Alerts <span className="a-badge">3</span></h4>
                <div className="al-list">
                  <div className="al al-w">⚠️ North Stand 89% — redirect to East</div>
                  <div className="al al-i">💡 Best food window: next 8 mins</div>
                  <div className="al al-s">✅ Emergency exits verified clear</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
