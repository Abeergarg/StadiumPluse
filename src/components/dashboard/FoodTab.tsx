'use client';

import { useState, memo } from 'react';
import { MENU_ITEMS } from '@/lib/domain-data';
import { useGoogleAnalytics } from '@/lib/hooks';
import type { CartItem } from '@/types';

/* ================================================================
   FoodTab — Menu browsing, cart, GPay, and GA4 event tracking
   ================================================================ */
const FoodTab = memo(function FoodTab() {
  const { trackEvent } = useGoogleAnalytics();
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartTotal       = cart.reduce((s, i) => s + i.price, 0);

  const addToCart = (item: typeof MENU_ITEMS[number]) => {
    const cartItem: CartItem = { ...item, id: `${item.name}-${Date.now()}` };
    setCart((p) => [...p, cartItem]);
    trackEvent('add_to_cart', { item_name: item.name, value: item.price, currency: 'INR' });
  };

  const removeFromCart = (id: string) => setCart((p) => p.filter((i) => i.id !== id));

  const handleGPay = () => {
    trackEvent('begin_checkout', { value: cartTotal, currency: 'INR', items: cart.length });
    alert(`Google Pay initiated!\n\nTotal: ₹${cartTotal}\n${cart.map((i) => `• ${i.name}  ₹${i.price}`).join('\n')}`);
  };

  return (
    <div className="db-grid">
      {/* ── Menu ── */}
      <section aria-label="Food menu">
        <div className="db-card">
          <h2 className="db-ct">🍔 Menu · Seat M24 Delivery</h2>
          <ul aria-label="Available menu items" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {MENU_ITEMS.map((item) => (
              <li
                key={item.name}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--bg)', borderRadius:10, padding:'11px 14px', border:'1px solid var(--bd2)' }}
              >
                <div>
                  <div style={{ fontWeight:700, fontSize:'.88rem', color:'var(--t1)' }}>{item.name}</div>
                  <div style={{ fontSize:'.73rem', color:'var(--t3)', marginTop:2 }}>8–12 min delivery</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                  <span style={{ fontWeight:800, color:'var(--p-d)', fontFamily:"'Space Grotesk',sans-serif" }}>₹{item.price}</span>
                  <button
                    className="btn-add"
                    onClick={() => addToCart(item)}
                    aria-label={`Add ${item.name} to cart — ₹${item.price}`}
                  >
                    + Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Cart + status ── */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <section aria-label="Your order" aria-live="polite">
          <div className="db-card">
            <h2 className="db-ct">🛒 Your Order ({cart.length})</h2>
            {cart.length === 0 ? (
              <p style={{ textAlign:'center', color:'var(--t3)', padding:'20px 0', fontSize:'.86rem' }}>
                Add items from the menu 🍴
              </p>
            ) : (
              <>
                <ul aria-label="Cart items" style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:7, marginBottom:14 }}>
                  {cart.map((item) => (
                    <li key={item.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'.84rem', padding:'6px 0', borderBottom:'1px solid var(--bd2)' }}>
                      <span style={{ fontWeight:600, color:'var(--t2)' }}>{item.name}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                        <span style={{ fontWeight:700, color:'var(--t1)' }}>₹{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          style={{ background:'var(--err-l)', border:'1px solid rgba(220,38,38,.2)', color:'var(--err)', borderRadius:'50%', width:22, height:22, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:'.8rem' }}
                        >×</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', justifyContent:'space-between', fontWeight:800, fontSize:'.93rem', padding:'10px 0', borderTop:'2px solid var(--bd2)', marginBottom:14 }}>
                  <span>Total ({cart.length} items)</span>
                  <span style={{ color:'var(--p-d)', fontFamily:"'Space Grotesk',sans-serif" }}>₹{cartTotal}</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                  <button
                    className="btn btn-primary"
                    style={{ justifyContent:'center' }}
                    onClick={() => alert('UPI QR code would appear here. Connect your payment provider.')}
                    aria-label="Pay via UPI"
                  >
                    💳 Pay via UPI
                  </button>
                  <button
                    className="gpay-btn"
                    onClick={handleGPay}
                    aria-label={`Pay ₹${cartTotal} via Google Pay`}
                  >
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:'1rem', color:'#4285f4' }}>G</span>
                    <span style={{ fontWeight:700, color:'#fff' }}>Pay</span>
                    &nbsp;· ₹{cartTotal}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <div className="db-card">
          <h2 className="db-ct">📦 Order Status</h2>
          <ol aria-label="Order preparation steps" style={{ listStyle:'none', padding:0, margin:0 }}>
            {['Order received','Being prepared','On the way','Delivered to M24'].map((step, i) => (
              <li
                key={step}
                aria-label={i < 2 ? `${step} — completed` : step}
                style={{ display:'flex', alignItems:'center', gap:11, fontSize:'.83rem', padding:'7px 0', borderBottom:'1px solid var(--bd2)' }}
              >
                <div style={{ width:22, height:22, borderRadius:'50%', background: i < 2 ? 'var(--ok)' : 'var(--p-xl)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}
                  aria-hidden="true">
                  <span style={{ fontSize:'.66rem', color: i < 2 ? '#fff' : 'var(--t4)', fontWeight:800 }}>{i < 2 ? '✓' : i + 1}</span>
                </div>
                <span style={{ color: i < 2 ? 'var(--ok)' : 'var(--t3)', fontWeight: i < 2 ? 700 : 500 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
});

export default FoodTab;
