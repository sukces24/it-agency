import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimits } from './rate-limit';

describe('rate-limit: checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it('allows the first 5 requests from the same IP within 60 minutes', () => {
    const ip = '192.168.1.1';
    const start = 1000000;

    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip, start + i * 1000)).toBe(true);
    }
  });

  it('rejects the 6th request from the same IP within the window', () => {
    const ip = '10.0.0.1';
    const start = 1000000;

    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, start + i * 1000);
    }

    expect(checkRateLimit(ip, start + 5000)).toBe(false);
  });

  it('resets the counter after the 60-minute window expires', () => {
    const ip = '172.16.0.1';
    const start = 1000000;
    const windowMs = 60 * 60 * 1000;

    // Use up all 5 requests
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, start + i * 1000);
    }

    // 6th request within window → rejected
    expect(checkRateLimit(ip, start + 59 * 60 * 1000)).toBe(false);

    // Request after window expires → allowed (new window opens)
    expect(checkRateLimit(ip, start + windowMs)).toBe(true);
  });

  it('tracks different IPs independently', () => {
    const start = 1000000;

    // Exhaust limit for IP A
    for (let i = 0; i < 5; i++) {
      checkRateLimit('A', start + i);
    }
    expect(checkRateLimit('A', start + 100)).toBe(false);

    // IP B should still be allowed
    expect(checkRateLimit('B', start + 100)).toBe(true);
  });

  it('uses Date.now() by default when now is not provided', () => {
    const ip = '127.0.0.1';
    // Just ensure it doesn't throw and returns true for the first call
    expect(checkRateLimit(ip)).toBe(true);
  });

  it('allows exactly 5 requests after a window reset', () => {
    const ip = '10.10.10.10';
    const start = 0;
    const windowMs = 60 * 60 * 1000;

    // First window: 5 allowed, 6th rejected
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, start + i);
    }
    expect(checkRateLimit(ip, start + 10)).toBe(false);

    // Second window: 5 allowed again
    const secondWindowStart = start + windowMs;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip, secondWindowStart + i)).toBe(true);
    }
    // 6th in second window → rejected
    expect(checkRateLimit(ip, secondWindowStart + 10)).toBe(false);
  });
});
