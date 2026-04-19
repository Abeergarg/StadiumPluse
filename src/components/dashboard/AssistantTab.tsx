'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { useGoogleAnalytics } from '@/lib/hooks';
import { sanitizeText } from '@/lib/sanitize';
import { BOT_REPLIES } from '@/lib/domain-data';
import type { ChatMessage } from '@/types';

/* ================================================================
   AssistantTab — AI Chat with auto-scroll and sanitisation
   ================================================================ */
const AssistantTab = memo(function AssistantTab() {
  const { trackEvent } = useGoogleAnalytics();
  const endRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { r: 'bot', t: 'Hi! I am StadiumIQ AI. I know exactly where you are and what is happening in the stadium. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const rawInput = sanitizeText(input);
    if (!rawInput.trim()) return;

    const userMsg = rawInput.trim();
    setMessages((p) => [...p, { r: 'usr', t: userMsg }]);
    setInput('');
    setIsTyping(true);
    trackEvent('ai_chat_query', { query_length: userMsg.length });

    // Mock AI response logic
    setTimeout(() => {
      setIsTyping(false);
      const lw = userMsg.toLowerCase();
      let reply = "I'm not sure about that. Try asking about wait times, food, parking, or emergency routes.";
      
      for (const [key, val] of Object.entries(BOT_REPLIES)) {
        if (lw.includes(key)) {
          reply = val;
          break;
        }
      }
      
      setMessages((p) => [...p, { r: 'bot', t: reply }]);
    }, 900);
  };

  return (
    <div className="db-card" style={{ height: 'calc(100vh - 180px)', minHeight: 460, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--bd2)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--p),var(--p-d))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(99,102,241,.25)' }} aria-hidden="true">🤖</div>
        <div>
          <h2 className="db-ct" style={{ marginBottom: 0 }}>Stadium Assistant</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.73rem', color: 'var(--t3)', marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} aria-hidden="true" />
            Online · Context aware
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        role="log" 
        aria-label="Chat messages" 
        style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14, background: 'rgba(99,102,241,.02)' }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.r === 'usr' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
            {m.r === 'bot' && <div style={{ fontSize: '1.1rem', marginBottom: 4 }} aria-hidden="true">🤖</div>}
            <div
              className={`msg ${m.r === 'usr' ? 'usr-msg' : 'bot-msg'}`}
              style={{
                background: m.r === 'usr' ? 'var(--p)' : 'var(--bg)',
                color: m.r === 'usr' ? '#fff' : 'var(--t1)',
                padding: '10px 14px', borderRadius: 16, border: m.r === 'usr' ? 'none' : '1px solid var(--bd2)',
                borderBottomLeftRadius: m.r === 'bot' ? 4 : 16, borderBottomRightRadius: m.r === 'usr' ? 4 : 16,
                maxWidth: '82%', fontSize: '.88rem', lineHeight: 1.5,
                boxShadow: m.r === 'bot' ? '0 2px 8px rgba(0,0,0,.03)' : '0 4px 12px rgba(99,102,241,.25)',
              }}
            >
              {m.t}
            </div>
            {m.r === 'usr' && <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--p-d)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.5rem', marginBottom: 4 }} aria-hidden="true">JD</div>}
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} aria-label="Assistant is typing" aria-live="polite">
            <div style={{ fontSize: '1.1rem' }} aria-hidden="true">🤖</div>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--bd2)', padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: 4, display: 'flex', gap: 5 }}>
              {[0, 1, 2].map((i) => <div key={i} className="td" style={{ animation: `typing 1.2s ${i * 0.2}s infinite` }} aria-hidden="true" />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: 16, background: 'var(--bg)', borderTop: '1px solid var(--bd2)' }}>
        <div style={{ position: 'relative' }}>
          <input
            className="form-input"
            style={{ paddingRight: 48, borderRadius: 24, boxShadow: '0 2px 12px rgba(0,0,0,.04)', background: '#fff' }}
            placeholder="e.g. Where is the nearest restroom?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            aria-label="Chat input message"
          />
          <button
            className="btn-send"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            style={{
              position: 'absolute', right: 6, top: 6, width: 32, height: 32,
              background: input.trim() && !isTyping ? 'var(--p)' : 'var(--p-xl)',
              color: input.trim() && !isTyping ? '#fff' : 'var(--t4)',
              border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && !isTyping ? 'pointer' : 'default', transition: 'all 0.2s ease',
            }}
          >
            ↑
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }} className="hide-scroll">
          {['Wait times', 'Food window', 'Parking', 'Emergency'].map((chip) => (
            <button
              key={chip}
              onClick={() => { setInput(chip); setTimeout(() => document.querySelector('.btn-send')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))); }}
              style={{ background: 'var(--p-xl)', color: 'var(--p-d)', padding: '6px 12px', borderRadius: 16, fontSize: '.72rem', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default AssistantTab;
