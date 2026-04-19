/**
 * Unit tests for src/lib/hooks.ts
 * Tests: useCounter, useLiveCount, useGoogleAnalytics
 */
import { renderHook, act } from '@testing-library/react';
import { useCounter, useLiveCount, useGoogleAnalytics } from '@/lib/hooks';

// ── useCounter ────────────────────────────────────────────────────
describe('useCounter', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('starts at 0', () => {
    const { result } = renderHook(() => useCounter(100));
    expect(result.current).toBe(0);
  });

  it('animates toward the target value after delay', async () => {
    const { result } = renderHook(() => useCounter(500, 0));

    // Trigger rAF loop (fake timers need requestAnimationFrame to be invoked)
    await act(async () => {
      // advance past the delay (0ms) and simulate rAF ticks via setTimeout
      jest.advanceTimersByTime(2000);
    });

    // Value should have advanced toward target
    expect(result.current).toBeGreaterThan(0);
  });

  it('cleans up on unmount without throwing', () => {
    const { unmount } = renderHook(() => useCounter(200, 0));
    expect(() => unmount()).not.toThrow();
  });
});

// ── useLiveCount ──────────────────────────────────────────────────
describe('useLiveCount', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns the base value initially', () => {
    const { result } = renderHook(() => useLiveCount(500, 50));
    expect(result.current).toBe(500);
  });

  it('fluctuates after 5s', () => {
    const { result } = renderHook(() => useLiveCount(500, 100));

    act(() => { jest.advanceTimersByTime(5001); });

    // Value should be in range [450, 550]
    expect(result.current).toBeGreaterThanOrEqual(450);
    expect(result.current).toBeLessThanOrEqual(550);
  });

  it('cleans up interval on unmount', () => {
    const clearSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useLiveCount(100, 10));
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});

// ── useGoogleAnalytics ────────────────────────────────────────────
describe('useGoogleAnalytics', () => {
  it('returns a trackEvent function', () => {
    const { result } = renderHook(() => useGoogleAnalytics());
    expect(typeof result.current.trackEvent).toBe('function');
  });

  it('calls window.gtag when available', () => {
    const mockGtag = jest.fn();
    (window as unknown as { gtag: typeof mockGtag }).gtag = mockGtag;

    const { result } = renderHook(() => useGoogleAnalytics());
    act(() => {
      result.current.trackEvent('test_event', { value: 42 });
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'test_event', { value: 42 });
  });

  it('does not throw when gtag is not defined', () => {
    // Remove gtag from window
    const w = window as unknown as Record<string, unknown>;
    delete w.gtag;

    const { result } = renderHook(() => useGoogleAnalytics());
    expect(() => {
      act(() => {
        result.current.trackEvent('safe_event');
      });
    }).not.toThrow();
  });
});
