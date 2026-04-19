/* ================================================================
   StadiumPulse — Environment Variable Validation
   Validates and exports all env vars with proper typing.
   Warns loudly in dev when placeholder values are detected.
   ================================================================ */

const PLACEHOLDER_PATTERN = /^(your-|demo-|G-XXXX|XXXXX)/i;

/** Keys that MUST be real values for Firebase Auth to work */
const FIREBASE_REQUIRED = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

function getValue(key: string): string {
  return process.env[key] ?? '';
}

// ── Dev-time validation (only runs on server) ──────────────────
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  const unset = FIREBASE_REQUIRED.filter((k) => {
    const v = getValue(k);
    return !v || PLACEHOLDER_PATTERN.test(v);
  });
  if (unset.length > 0) {
    console.warn(
      `\n⚠️  [StadiumPulse] Missing or placeholder environment variables:\n` +
        unset.map((k) => `   • ${k}`).join('\n') +
        `\n\n   Add real values to .env.local\n`
    );
  }
}

// ── Typed environment config ────────────────────────────────────
export const env = {
  firebase: {
    apiKey:            getValue('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain:        getValue('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId:         getValue('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket:     getValue('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getValue('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId:             getValue('NEXT_PUBLIC_FIREBASE_APP_ID'),
    measurementId:     getValue('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
  },
  ga: {
    measurementId: getValue('NEXT_PUBLIC_GA_MEASUREMENT_ID'),
  },
  maps: {
    apiKey: getValue('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY'),
  },
  meet: {
    sosUrl:
      getValue('NEXT_PUBLIC_GOOGLE_MEET_SOS_URL') ||
      'https://meet.google.com/stadium-sos',
  },
} as const;

/** Returns true when all Firebase config values are real (non-placeholder). */
export function isFirebaseConfigured(): boolean {
  return FIREBASE_REQUIRED.every((k) => {
    const v = getValue(k);
    return v.length > 0 && !PLACEHOLDER_PATTERN.test(v);
  });
}

/** Returns true when a real GA Measurement ID is present. */
export function isGAConfigured(): boolean {
  const id = env.ga.measurementId;
  return id.length > 0 && !PLACEHOLDER_PATTERN.test(id);
}

/** Returns true when a real Maps API key is present. */
export function isMapsConfigured(): boolean {
  const k = env.maps.apiKey;
  return k.length > 0 && !PLACEHOLDER_PATTERN.test(k);
}
