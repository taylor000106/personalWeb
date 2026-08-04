import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const key = `test-ok-${Date.now()}-${Math.random()}`;
    const first = rateLimit({ key, limit: 3, windowMs: 60_000 });
    const second = rateLimit({ key, limit: 3, windowMs: 60_000 });
    expect(first).toEqual({ ok: true, remaining: 2 });
    expect(second).toEqual({ ok: true, remaining: 1 });
  });

  it("blocks when limit is exceeded", () => {
    const key = `test-block-${Date.now()}-${Math.random()}`;
    rateLimit({ key, limit: 2, windowMs: 60_000 });
    rateLimit({ key, limit: 2, windowMs: 60_000 });
    const blocked = rateLimit({ key, limit: 2, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfterSec).toBeGreaterThanOrEqual(1);
    }
  });

  it("resets after the window expires", () => {
    const key = `test-reset-${Date.now()}-${Math.random()}`;
    rateLimit({ key, limit: 1, windowMs: 1 });
    const blocked = rateLimit({ key, limit: 1, windowMs: 1 });
    expect(blocked.ok).toBe(false);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const again = rateLimit({ key, limit: 1, windowMs: 60_000 });
        expect(again).toEqual({ ok: true, remaining: 0 });
        resolve();
      }, 5);
    });
  });
});
