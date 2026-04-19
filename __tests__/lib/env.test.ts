/**
 * Unit tests for src/lib/env.ts
 * Tests: isFirebaseConfigured, isGAConfigured, isMapsConfigured
 */

// We must set env vars BEFORE importing env.ts (module-level code runs once)
describe('env helpers', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('isFirebaseConfigured returns false when keys are placeholders', async () => {
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'your-api-key';
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'your-project.firebaseapp.com';

    const { isFirebaseConfigured } = await import('@/lib/env');
    expect(isFirebaseConfigured()).toBe(false);
  });

  it('isFirebaseConfigured returns false when keys are empty', async () => {
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = '';
    const { isFirebaseConfigured } = await import('@/lib/env');
    expect(isFirebaseConfigured()).toBe(false);
  });

  it('isFirebaseConfigured returns true when all keys are real values', async () => {
    const realKeys = {
      NEXT_PUBLIC_FIREBASE_API_KEY:            'AIzaSyAbcDef1234',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:        'myapp.firebaseapp.com',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID:         'myapp-prod',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:     'myapp-prod.appspot.com',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:'123456789',
      NEXT_PUBLIC_FIREBASE_APP_ID:             '1:123456789:web:abc',
    };
    Object.assign(process.env, realKeys);

    const { isFirebaseConfigured } = await import('@/lib/env');
    expect(isFirebaseConfigured()).toBe(true);
  });

  it('isGAConfigured returns false for placeholder GA ID', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    const { isGAConfigured } = await import('@/lib/env');
    expect(isGAConfigured()).toBe(false);
  });

  it('isGAConfigured returns true for real GA ID', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-AB12CD34EF';
    const { isGAConfigured } = await import('@/lib/env');
    expect(isGAConfigured()).toBe(true);
  });

  it('isMapsConfigured returns false for placeholder key', async () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'your-maps-api-key';
    const { isMapsConfigured } = await import('@/lib/env');
    expect(isMapsConfigured()).toBe(false);
  });

  it('isMapsConfigured returns true for real key', async () => {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 'AIzaSyRealKey123456';
    const { isMapsConfigured } = await import('@/lib/env');
    expect(isMapsConfigured()).toBe(true);
  });
});
