/* ================================================================
   StadiumPulse — Domain Data (Mock / Seed)
   All application-domain static data: menu, bot replies, features,
   zone information, landing chat demo, and live ticker items.
   ================================================================ */
import type { MenuItem, ChatMessage, ZoneBadge } from '@/types';

// ── Food menu ──────────────────────────────────────────────────
export const MENU_ITEMS: readonly MenuItem[] = [
  { name: '🌮 Loaded Nachos',  price: 320 },
  { name: '☕ Cold Brew',       price: 180 },
  { name: '🍔 Veggie Burger',   price: 260 },
  { name: '🍟 Masala Fries',    price: 140 },
  { name: '🥤 Mango Smoothie',  price: 120 },
  { name: '🌯 Paneer Wrap',     price: 200 },
] as const;

// ── Dashboard AI chatbot replies ───────────────────────────────
export const BOT_REPLIES: Readonly<Record<string, string>> = {
  'wait times': '⏱ Gate A: 2 min 🟢 | Gate C: 8 min 🟡 | Concession B: 12 min 🟡 | Restrooms: 4 min 🟢',
  food:         '🍔 Concession D (East Wing) — only 4 min wait! Try loaded nachos ⭐',
  parking:      '🚗 P3 Zone (West) has 18 spots. Navigate via Exit 7.',
  emergency:    '🚨 Exit A: 40m South via Corridor 2. Exit C: clear. Medical: Level 2 Gate B.',
  restroom:     '🚻 Section L Corridor (3 min) or Section N East (1 min 🟢)',
  seat:         '📍 Seat M24 — Section M, Row 4. Take Corridor 3 from Gate B. ~3 min walk.',
};

// ── Landing page chat demo ─────────────────────────────────────
export const DEMO_CHAT_MSGS: readonly ChatMessage[] = [
  { r: 'bot', t: "Hi! I'm StadiumIQ AI 🤖 I know your stadium inside out. How can I help today?" },
  { r: 'usr', t: "What's the fastest route to my seat?" },
  { r: 'bot', t: '📍 Gate B → Corridor 3 → Section M, Row 4, Seat 12. ~3 min walk. Gate B: 2 min wait 🟢' },
  { r: 'usr', t: 'Are there food stalls nearby with short wait times?' },
  { r: 'bot', t: '🍔 Concession D (East Wing) — only 4 min wait! Try loaded nachos ⭐ Or Kiosk G near Gate B — 2 min 🟢' },
  { r: 'usr', t: 'How crowded is the North Stand?' },
  { r: 'bot', t: '⚠️ North Stand is at 89% capacity. I recommend Gate B → East corridor instead — 32% 🟢. Your ETA to seat unchanged: ~4 mins.' },
  { r: 'usr', t: 'What happens in an emergency?' },
  { r: 'bot', t: '🚨 Stay calm. Nearest exit from Seat M24: Exit A, 40m South via Corridor 2 🟢. Medical Bay: Level 2, Gate B. Tap SOS in dashboard — security alerted instantly.' },
] as const;

export const DEMO_CHAT_SUGGESTIONS: readonly string[] = [
  'Wait times?', 'Best food now?', 'Park my car', 'Emergency exit?', 'Restrooms?',
];

export const DEMO_CHAT_BOT: Readonly<Record<string, string>> = {
  'Wait times?':     '⏱ Gate A: 2 min 🟢 | Gate C: 8 min 🟡 | Concession B: 12 min 🟡 | Restrooms: 4 min 🟢',
  'Best food now?':  '🍔 Concession D (East) — 4 min wait! Try loaded nachos ⭐',
  'Park my car':     '🚗 P3 Zone (West) has 18 spots. Navigate via Exit 7.',
  'Emergency exit?': '🚨 Exit A: 40m South via Corridor 2. Exit C clear 🟢',
  'Restrooms?':      '🚻 Section L Corridor (3 min) or Section N East (1 min 🟢)',
};

// ── Live ticker items ──────────────────────────────────────────
export const TICKER_ITEMS: readonly string[] = [
  '🟢 Gate A — Open · 2 min',
  '🟡 Gate C — Busy · 8 min',
  '🔴 North Stand — 94% capacity',
  '🍔 Concession B — 12 min wait',
  '🚗 Parking P3 — 18 spots left',
  '⚽ Kick-off in 22 minutes',
  '🟢 Gate D — Open · 1 min',
  '🛡️ Emergency exits — All clear',
  '🤖 AI guiding 4,210+ fans',
  '🟡 South Restrooms — 6 min wait',
];

// ── Shared zone badges (crowd density) ────────────────────────
export const ZONE_BADGES: readonly ZoneBadge[] = [
  { zone: 'North',  pct: '35%', color: '#34d399' },
  { zone: 'East',   pct: '89%', color: '#f87171' },
  { zone: 'West',   pct: '60%', color: '#fbbf24' },
  { zone: 'South',  pct: '67%', color: '#fbbf24' },
  { zone: 'VIP',    pct: '41%', color: '#34d399' },
  { zone: 'Center', pct: '94%', color: '#f87171' },
];

// ── Feature cards (landing page) ───────────────────────────────
export const FEATURES = [
  { icon: '🌊', cls: 'fi-ind', title: 'Live Crowd Flow',      desc: 'Real-time heatmaps across every zone. AI predicts congestion 10 mins ahead.', wide: true,  demo: 'heatmap'   },
  { icon: '🧭', cls: 'fi-cyn', title: 'Smart Navigation',     desc: 'Indoor turn-by-turn via Bluetooth beacons. Fastest path updated live.',         wide: false, demo: 'nav'       },
  { icon: '⏱',  cls: 'fi-grn', title: 'Wait Time Prediction', desc: 'AI refreshes wait times every 30 seconds from IoT sensors.',                    wide: false, demo: 'wait'      },
  { icon: '🔔', cls: 'fi-amb', title: 'Smart Alerts',         desc: 'Proactive alerts for gate changes, food windows, crowd peaks.',                  wide: false, demo: 'alerts'    },
  { icon: '🍔', cls: 'fi-vlt', title: 'Order From Seat',      desc: 'Browse, order, pay via GPay — delivered to your seat. Avg 8–12 min.',            wide: false, demo: 'order'     },
  { icon: '🚨', cls: 'fi-ros', title: 'Emergency Routing',    desc: 'Instant evacuation routes. All exits AI-monitored with priority routing.',       wide: false, demo: 'emergency' },
] as const;
