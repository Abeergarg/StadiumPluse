/* ================================================================
   StadiumPulse — Shared TypeScript Types
   Single source of truth for all cross-component types.
   ================================================================ */

// ── Navigation ─────────────────────────────────────────────────
export type TabId =
  | 'overview'
  | 'crowd'
  | 'navigation'
  | 'food'
  | 'assistant'
  | 'emergency'
  | 'stadium3d'
  | 'ticket';

export interface NavItem {
  readonly id: TabId;
  readonly icon: string;
  readonly label: string;
}

export interface MobNavItem {
  readonly id: TabId;
  readonly icon: string;
  readonly label: string;
}

// ── Food / Cart ─────────────────────────────────────────────────
export interface MenuItem {
  readonly name: string;
  readonly price: number;
}

export interface CartItem extends MenuItem {
  readonly id: string; // unique per line for removal
}

// ── AI Chat ─────────────────────────────────────────────────────
export type ChatRole = 'bot' | 'usr';

export interface ChatMessage {
  readonly r: ChatRole;
  readonly t: string;
}

// ── Crowd / Stadium ─────────────────────────────────────────────
export interface ZoneBadge {
  readonly zone: string;
  readonly pct: string;
  readonly color: string;
}

// ── Tickets ─────────────────────────────────────────────────────
export interface TicketInfo {
  readonly fanName: string;
  readonly ticketId: string;
}

// ── Google Analytics ────────────────────────────────────────────
export type GtagParams = Record<string, string | number | boolean | undefined>;

// Augment the global Window interface so `window.gtag` is typed everywhere
declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
