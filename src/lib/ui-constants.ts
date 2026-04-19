/* ================================================================
   StadiumPulse — UI Constants (Navigation)
   Navigation items used in dashboard sidebar and mobile nav.
   ================================================================ */
import type { NavItem, MobNavItem } from '@/types';

/** Full list of dashboard tabs — used in sidebar nav */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'overview',   icon: '📊', label: 'Overview'   },
  { id: 'crowd',      icon: '🌊', label: 'Live Crowd' },
  { id: 'navigation', icon: '🧭', label: 'Navigate'   },
  { id: 'food',       icon: '🍔', label: 'Order Food' },
  { id: 'assistant',  icon: '🤖', label: 'Assistant'  },
  { id: 'emergency',  icon: '🚨', label: 'Emergency'  },
  { id: 'stadium3d',  icon: '🏟️', label: 'Stadium 3D' },
  { id: 'ticket',     icon: '🎟️', label: 'My Ticket'  },
] as const;

/** Curated 5-item subset for mobile bottom bar */
export const MOB_NAV_ITEMS: readonly MobNavItem[] = [
  { id: 'overview',  icon: '📊', label: 'Home'    },
  { id: 'crowd',     icon: '🌊', label: 'Crowd'   },
  { id: 'food',      icon: '🍔', label: 'Order'   },
  { id: 'assistant', icon: '🤖', label: 'AI Chat' },
  { id: 'emergency', icon: '🚨', label: 'SOS'     },
] as const;
