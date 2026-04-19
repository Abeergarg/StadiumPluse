/* ================================================================
   StadiumPulse — Firebase Initialisation
   Singleton pattern — initialises once, reuses across hot reloads.
   ================================================================ */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import { env, isFirebaseConfigured } from '@/lib/env';

const firebaseConfig = {
  apiKey:            env.firebase.apiKey,
  authDomain:        env.firebase.authDomain,
  projectId:         env.firebase.projectId,
  storageBucket:     env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId:             env.firebase.appId,
  measurementId:     env.firebase.measurementId,
};

// Singleton: reuse existing app across Next.js hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db   = getFirestore(app);

/** Lazily initialises Firebase Analytics. Returns null when unsupported or unconfigured. */
let analyticsInstance: Analytics | null = null;

export const getAnalyticsInstance = async (): Promise<Analytics | null> => {
  if (!isFirebaseConfigured()) return null;
  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (supported) {
    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
  }
  return null;
};

export { isFirebaseConfigured };
export default app;
