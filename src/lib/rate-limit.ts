import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const REDIS_URL = process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN;

let upstashLimiter: Ratelimit | null = null;
if (REDIS_URL && REDIS_TOKEN) {
  upstashLimiter = new Ratelimit({
    redis: new Redis({ url: REDIS_URL, token: REDIS_TOKEN }),
    limiter: Ratelimit.slidingWindow(MAX_ATTEMPTS, "15 m"),
    analytics: true,
    prefix: "playbook:auth",
  });
} else if (process.env.NODE_ENV === "production") {
  // Serverless multi-instance 우회 가능 — Marketplace 통해 Upstash Redis 연동 필요
  console.warn("[rate-limit] KV not configured — falling back to in-memory (per-instance bypass possible)");
}

const inMemoryAttempts = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  retryAfter?: number;
}> {
  if (upstashLimiter) {
    const { success, reset } = await upstashLimiter.limit(ip);
    if (success) return { allowed: true };
    return { allowed: false, retryAfter: Math.ceil((reset - Date.now()) / 1000) };
  }

  const now = Date.now();
  const entry = inMemoryAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    inMemoryAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  entry.count++;
  if (entry.count > MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true };
}
