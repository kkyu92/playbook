import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifyPassword, createToken, verifyToken } from "@/lib/auth";

const TEST_PASSWORD = "testpassword123";
const TEST_SECRET = "testsecretatleast16chars";

beforeEach(() => {
  vi.stubEnv("ADMIN_PASSWORD", TEST_PASSWORD);
  vi.stubEnv("ADMIN_SECRET", TEST_SECRET);
});

describe("verifyPassword", () => {
  it("올바른 비밀번호를 승인한다", async () => {
    expect(await verifyPassword(TEST_PASSWORD)).toBe(true);
  });

  it("잘못된 비밀번호를 거부한다", async () => {
    expect(await verifyPassword("wrongpassword")).toBe(false);
  });

  it("빈 문자열을 거부한다", async () => {
    expect(await verifyPassword("")).toBe(false);
  });
});

describe("createToken + verifyToken", () => {
  it("생성한 토큰을 즉시 검증한다", async () => {
    const token = await createToken();
    expect(await verifyToken(token)).toBe(true);
  });

  it("토큰 형식이 timestamp.signature 형태다", async () => {
    const token = await createToken();
    const parts = token.split(".");
    expect(parts).toHaveLength(2);
    expect(Number(parts[0])).toBeGreaterThan(0);
    expect(parts[1]).toMatch(/^[0-9a-f]+$/);
  });

  it("변조된 signature를 거부한다", async () => {
    const token = await createToken();
    const [timestamp] = token.split(".");
    const tampered = `${timestamp}.aaaa0000bbbb1111cccc2222dddd3333eeee4444ffff5555aaaa6666bbbb7777`;
    expect(await verifyToken(tampered)).toBe(false);
  });

  it("변조된 timestamp를 거부한다", async () => {
    const token = await createToken();
    const [, sig] = token.split(".");
    const tampered = `${Date.now() - 1000}.${sig}`;
    expect(await verifyToken(tampered)).toBe(false);
  });

  it("만료된 토큰(8일 전)을 거부한다", async () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(TEST_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`admin:${eightDaysAgo}`),
    );
    const sig = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const expiredToken = `${eightDaysAgo}.${sig}`;
    expect(await verifyToken(expiredToken)).toBe(false);
  });

  it("형식이 잘못된 토큰을 거부한다", async () => {
    expect(await verifyToken("notavalidtoken")).toBe(false);
    expect(await verifyToken("")).toBe(false);
    expect(await verifyToken(".")).toBe(false);
  });
});
