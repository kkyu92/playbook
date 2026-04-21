import { describe, it, expect } from "vitest";
import {
  validateConnections,
  syncBidirectional,
  MAX_CONNECTIONS,
} from "../lib/bidirectional-sync.mjs";

function makeEntry(slug, connections = [], last_verified = null) {
  return {
    slug,
    frontmatter: { connections: [...connections], last_verified },
  };
}

describe("validateConnections", () => {
  it("manifest 에 없는 slug 제거", () => {
    const result = validateConnections(["a/x", "b/y", "c/z"], ["a/x", "c/z"]);
    expect(result).toEqual(["a/x", "c/z"]);
  });

  it("중복 제거", () => {
    const result = validateConnections(["a/x", "a/x", "b/y"], ["a/x", "b/y"]);
    expect(result).toEqual(["a/x", "b/y"]);
  });

  it("모두 유효 → 그대로", () => {
    const result = validateConnections(["a/x", "b/y"], ["a/x", "b/y", "c/z"]);
    expect(result).toEqual(["a/x", "b/y"]);
  });

  it("모두 invalid → 빈 배열", () => {
    const result = validateConnections(["x/unknown"], ["a/x"]);
    expect(result).toEqual([]);
  });
});

describe("syncBidirectional — 정방향/역방향", () => {
  it("새 entry 추가 시 target 에 역방향 연결", () => {
    const existing = [makeEntry("a/x"), makeEntry("b/y")];
    const newEntry = makeEntry("c/new", ["a/x", "b/y"]);
    const { updatedEntries, evictions } = syncBidirectional(newEntry, existing);
    expect(evictions).toHaveLength(0);
    expect(updatedEntries.find((e) => e.slug === "a/x").frontmatter.connections).toContain("c/new");
    expect(updatedEntries.find((e) => e.slug === "b/y").frontmatter.connections).toContain("c/new");
  });

  it("target 이 manifest 에 없으면 skip (방어적)", () => {
    const existing = [makeEntry("a/x")];
    const newEntry = makeEntry("c/new", ["a/x", "x/missing"]);
    const { evictions } = syncBidirectional(newEntry, existing);
    expect(evictions).toHaveLength(0);
    expect(existing[0].frontmatter.connections).toEqual(["c/new"]);
  });

  it("이미 연결된 경우 중복 추가 방지", () => {
    const existing = [makeEntry("a/x", ["c/new"])]; // 이미 역방향
    const newEntry = makeEntry("c/new", ["a/x"]);
    syncBidirectional(newEntry, existing);
    const conns = existing[0].frontmatter.connections;
    expect(conns.filter((s) => s === "c/new")).toHaveLength(1);
  });
});

describe("syncBidirectional — cap 15 축출", () => {
  it("cap 초과 시 last_verified 오래된 것 축출", () => {
    // target 에 14개 연결 + newEntry 추가 → 15 (OK)
    // target 에 15개 연결 + newEntry 추가 → 16 → 1개 축출
    const olderSlug = "old/a";
    const newerSlug = "new/b";
    const others = Array(13).fill(0).map((_, i) => makeEntry(`other/x${i}`, [], "2026-04-10"));

    const target = makeEntry("target/t", [olderSlug, newerSlug, ...others.map((e) => e.slug)], "2026-04-10");
    const existing = [
      target,
      makeEntry(olderSlug, ["target/t"], "2026-01-01"), // 가장 오래됨
      makeEntry(newerSlug, ["target/t"], "2026-04-15"),
      ...others,
    ];
    // 현재 target.connections = 15. newEntry 추가 시 16 → 1 축출 필요.

    const newEntry = makeEntry("c/new", ["target/t"]);
    const { evictions } = syncBidirectional(newEntry, existing);
    expect(evictions).toHaveLength(1);
    expect(evictions[0].from).toBe("target/t");
    expect(evictions[0].evicted).toBe(olderSlug);

    // target 의 connections 에 newEntry 포함, olderSlug 제거
    expect(target.frontmatter.connections).toContain("c/new");
    expect(target.frontmatter.connections).not.toContain(olderSlug);
  });

  it("축출된 반대편에서도 target 제거 (dangling 방지)", () => {
    const olderSlug = "old/a";
    const others = Array(14).fill(0).map((_, i) => makeEntry(`other/x${i}`, [], "2026-04-10"));

    const target = makeEntry("target/t", [olderSlug, ...others.map((e) => e.slug)], "2026-04-10");
    const olderEntry = makeEntry(olderSlug, ["target/t"], "2026-01-01");
    const existing = [target, olderEntry, ...others];

    const newEntry = makeEntry("c/new", ["target/t"]);
    syncBidirectional(newEntry, existing);

    // olderEntry.connections 에 target/t 가 제거됐어야
    expect(olderEntry.frontmatter.connections).not.toContain("target/t");
  });

  it("newSlug 는 축출 대상에서 보호 (항상 남음)", () => {
    // target 에 MAX_CONNECTIONS 개 + newEntry. newEntry 가 먼저 축출되면 안됨.
    const others = Array(MAX_CONNECTIONS).fill(0).map((_, i) => makeEntry(`other/x${i}`, [], "2020-01-01"));
    const target = makeEntry("target/t", others.map((e) => e.slug), "2026-04-10");
    const existing = [target, ...others];

    const newEntry = makeEntry("c/new", ["target/t"]);
    const { evictions } = syncBidirectional(newEntry, existing);

    expect(target.frontmatter.connections).toContain("c/new");
    expect(evictions[0].evicted).not.toBe("c/new");
  });
});
