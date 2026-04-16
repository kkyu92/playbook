import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_FILE = path.join(
  process.cwd(),
  "src",
  "generated",
  "content-manifest.json"
);

// NOTE: src/lib/schema.ts의 CATEGORIES와 동기화 유지 필요.
// 이 파일은 .mjs라 .ts에서 import 불가 → 수동 동기화.
// 카테고리 추가 시 schema.ts + CATEGORY_LABELS(아래) 3곳 모두 업데이트.
const CATEGORIES = [
  "prompt-engineering",
  "context-engineering",
  "harness-engineering",
  "agents",
  "evaluation",
  "infrastructure",
  "frontend-ai",
  "project-ops",
  "data-engineering",
];

const REQUIRED_FIELDS = ["title", "category", "date", "tags", "description"];

function findMdxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (item.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

function validateFrontmatter(data, filePath) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (data.category && !CATEGORIES.includes(data.category)) {
    errors.push(
      `Invalid category "${data.category}". Must be one of: ${CATEGORIES.join(", ")}`
    );
  }

  if (
    data.confidence !== undefined &&
    (typeof data.confidence !== "number" || data.confidence < 1 || data.confidence > 5)
  ) {
    errors.push(`Confidence must be a number between 1 and 5, got: ${data.confidence}`);
  }

  if (errors.length > 0) {
    console.error(`\n❌ Validation errors in ${filePath}:`);
    errors.forEach((e) => console.error(`   - ${e}`));
    return false;
  }
  return true;
}

function main() {
  console.log("📦 Generating content manifest...");

  const mdxFiles = findMdxFiles(CONTENT_DIR);

  if (mdxFiles.length === 0) {
    console.log("   No MDX files found. Writing empty manifest.");
    const emptyManifest = { entries: [], graph: { nodes: [], edges: [] } };
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emptyManifest, null, 2));
    return;
  }

  const entries = [];
  let hasErrors = false;

  for (const filePath of mdxFiles) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const relativePath = path.relative(CONTENT_DIR, filePath);
    const slug = relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/");

    if (!validateFrontmatter(data, relativePath)) {
      hasErrors = true;
      continue;
    }

    // Defaults
    data.confidence = data.confidence || 1;
    data.connections = data.connections || [];
    data.status = data.status || "draft";
    data.type = data.type || "entry";
    data.tags = data.tags || [];

    entries.push({ slug, frontmatter: data });
  }

  if (hasErrors) {
    process.exit(1);
  }

  // Build graph
  const allSlugs = new Set(entries.map((e) => e.slug));
  const nodes = entries
    .filter((e) => e.frontmatter.status !== "draft" || process.env.NODE_ENV !== "production")
    .map((e) => ({
      id: e.slug,
      label: e.frontmatter.title,
      category: e.frontmatter.category,
      confidence: e.frontmatter.confidence,
      description: e.frontmatter.description,
    }));

  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = [];
  const danglingConnections = [];

  for (const entry of entries) {
    if (!nodeIds.has(entry.slug)) continue; // draft 등 필터된 엔트리는 edge도 스킵
    for (const target of entry.frontmatter.connections) {
      if (nodeIds.has(target)) {
        edges.push({ source: entry.slug, target });
      } else if (allSlugs.has(target)) {
        // 노드는 있지만 필터됨 (draft) — edge 스킵
      } else {
        danglingConnections.push({ from: entry.slug, to: target });
      }
    }
  }

  if (danglingConnections.length > 0) {
    console.warn("\n⚠️  Dangling connections (referenced but not found):");
    danglingConnections.forEach((d) =>
      console.warn(`   ${d.from} → ${d.to}`)
    );
    // Add gray placeholder nodes for dangling connections
    const danglingTargets = new Set(danglingConnections.map((d) => d.to));
    for (const target of danglingTargets) {
      nodes.push({
        id: target,
        label: target.split("/").pop().replace(/-/g, " "),
        category: "infrastructure",
        confidence: 0,
        description: "아직 작성되지 않은 엔트리",
      });
      // Still add the edge
      for (const d of danglingConnections.filter((x) => x.to === target)) {
        edges.push({ source: d.from, target });
      }
    }
  }

  // ── Roadmap nodes from topic-pool.json ──
  // Add unwritten topics as "roadmap" nodes (hollow circles in the graph)
  const topicPoolPath = path.join(process.cwd(), "scripts", "topic-pool.json");
  if (fs.existsSync(topicPoolPath)) {
    const topicPool = JSON.parse(fs.readFileSync(topicPoolPath, "utf-8"));
    const existingSlugs = new Set(entries.map((e) => e.slug));

    for (const [category, topics] of Object.entries(topicPool)) {
      for (const slug of topics) {
        // Skip if an MDX already exists for this topic (any category subfolder)
        const alreadyExists = [...existingSlugs].some(
          (s) => s === `${category}/${slug}` || s.endsWith(`/${slug}`)
        );
        if (alreadyExists) continue;

        const roadmapId = `roadmap/${category}/${slug}`;
        // Avoid duplicates if the node was already added (e.g. dangling)
        if (nodeIds.has(roadmapId)) continue;

        const label = slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        nodes.push({
          id: roadmapId,
          label,
          category,
          confidence: 0,
          type: "roadmap",
          description: "Planned topic",
        });
        nodeIds.add(roadmapId);

        // Connect to existing nodes in the same category
        for (const existingNode of nodes) {
          if (
            existingNode.id !== roadmapId &&
            existingNode.category === category &&
            existingNode.type !== "roadmap"
          ) {
            edges.push({ source: existingNode.id, target: roadmapId });
          }
        }

        // Connect roadmap nodes in the same category to each other (first one found)
        for (const existingNode of nodes) {
          if (
            existingNode.id !== roadmapId &&
            existingNode.category === category &&
            existingNode.type === "roadmap"
          ) {
            edges.push({ source: existingNode.id, target: roadmapId });
            break; // Only one intra-roadmap edge to keep graph tidy
          }
        }
      }
    }
    console.log(`   📍 Roadmap nodes added from topic-pool.json`);
  }

  // Add placeholder nodes for empty categories (shown as grey in graph)
  const categoriesWithEntries = new Set(entries.map((e) => e.frontmatter.category));
  const CATEGORY_LABELS = {
    "prompt-engineering": "Prompt Engineering",
    "context-engineering": "Context Engineering",
    "harness-engineering": "Harness Engineering",
    agents: "Agents",
    evaluation: "Evaluation",
    infrastructure: "Infrastructure",
    "frontend-ai": "Frontend + AI",
    "project-ops": "Project Ops",
    "data-engineering": "Data Engineering",
  };
  const categoriesWithRoadmap = new Set(
    nodes.filter((n) => n.type === "roadmap").map((n) => n.category)
  );
  for (const cat of CATEGORIES) {
    if (!categoriesWithEntries.has(cat) && !categoriesWithRoadmap.has(cat)) {
      const nodeId = `__empty__${cat}`;
      nodes.push({
        id: nodeId,
        label: CATEGORY_LABELS[cat] || cat,
        category: cat,
        confidence: 0,
        description: "Coming Soon",
      });
    }
  }

  // Calculate streak
  const dates = [...new Set(entries.map((e) => e.frontmatter.date))].sort().reverse();
  let currentStreak = 0;
  let longestStreak = 0;

  if (dates.length > 0) {
    // Current streak: count consecutive days backwards from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateSet = new Set(dates);

    // Check from today backwards
    let checkDate = new Date(today);
    // If today has no entry, start from most recent entry date
    const todayStr = checkDate.toISOString().split("T")[0];
    if (!dateSet.has(todayStr)) {
      checkDate = new Date(dates[0]);
      checkDate.setHours(0, 0, 0, 0);
    }

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (dateSet.has(dateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Longest streak: scan all dates
    let streak = 1;
    const sortedDates = [...dates].sort();
    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        longestStreak = Math.max(longestStreak, streak);
        streak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, streak);
  }

  // Build dailyEntries map (date → count) for heatmap
  const dailyEntries = {};
  for (const entry of entries) {
    const d = entry.frontmatter.date;
    dailyEntries[d] = (dailyEntries[d] || 0) + 1;
  }

  // Calculate stats
  const categoryStats = {};
  for (const cat of CATEGORIES) {
    const catEntries = entries.filter((e) => e.frontmatter.category === cat);
    categoryStats[cat] = {
      count: catEntries.length,
      avgConfidence: catEntries.length > 0
        ? +(catEntries.reduce((s, e) => s + e.frontmatter.confidence, 0) / catEntries.length).toFixed(1)
        : 0,
      complete: catEntries.filter((e) => e.frontmatter.status === "complete").length,
    };
  }

  // Weekly stats (last 4 weeks)
  const weeklyStats = [];
  const now = new Date();
  for (let w = 0; w < 4; w++) {
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - w * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 7);
    const startStr = weekStart.toISOString().split("T")[0];
    const endStr = weekEnd.toISOString().split("T")[0];
    const weekEntries = entries.filter((e) => e.frontmatter.date >= startStr && e.frontmatter.date <= endStr);
    weeklyStats.push({
      week: w === 0 ? "이번 주" : `${w}주 전`,
      count: weekEntries.length,
      startDate: startStr,
      endDate: endStr,
    });
  }

  // Recent entries (last 5)
  const recentEntries = [...entries]
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
    .slice(0, 5)
    .map((e) => ({ slug: e.slug, title: e.frontmatter.title, date: e.frontmatter.date, category: e.frontmatter.category }));

  const roadmapCount = nodes.filter((n) => n.type === "roadmap").length;

  const manifest = {
    entries: entries.map((e) => ({ slug: e.slug, frontmatter: e.frontmatter })),
    graph: { nodes, edges },
    streak: {
      current: currentStreak,
      longest: longestStreak,
      lastActiveDate: dates[0] || null,
    },
    dailyEntries,
    stats: {
      totalEntries: entries.length,
      totalComplete: entries.filter((e) => e.frontmatter.status === "complete").length,
      avgConfidence: entries.length > 0
        ? +(entries.reduce((s, e) => s + e.frontmatter.confidence, 0) / entries.length).toFixed(1)
        : 0,
      categoryStats,
      weeklyStats,
      recentEntries,
      roadmapCount,
    },
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(
    `✅ Manifest generated: ${entries.length} entries, ${nodes.length} nodes, ${edges.length} edges`
  );

  // ── Generate INDEX.md ──
  generateIndex(entries, edges, CATEGORY_LABELS);
}

function generateIndex(entries, edges, CATEGORY_LABELS) {
  const INDEX_FILE = path.join(process.cwd(), "INDEX.md");
  const topicPoolPath = path.join(process.cwd(), "scripts", "topic-pool.json");

  const now = new Date().toISOString();
  const lines = [];

  lines.push(`# Playbook Wiki Index`);
  lines.push(`Updated: ${now}`);
  lines.push("");

  // ── Entries by category ──
  lines.push(`## 엔트리 (${entries.length}개)`);
  lines.push("");

  // Group entries by category
  const byCategory = {};
  for (const e of entries) {
    const cat = e.frontmatter.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(e);
  }

  for (const cat of CATEGORIES) {
    const catEntries = byCategory[cat];
    if (!catEntries || catEntries.length === 0) continue;
    const label = CATEGORY_LABELS[cat] || cat;
    lines.push(`### ${label}`);
    for (const e of catEntries) {
      const conf = e.frontmatter.confidence || 1;
      const status = e.frontmatter.status || "draft";
      lines.push(`- [${e.frontmatter.title}](wiki/${e.slug}) — confidence: ${conf}, status: ${status}`);
    }
    lines.push("");
  }

  // ── Cross-references ──
  lines.push(`## 교차 참조 (connections 기반)`);
  const seen = new Set();
  for (const edge of edges) {
    // Skip roadmap/placeholder edges
    if (edge.source.startsWith("roadmap/") || edge.target.startsWith("roadmap/")) continue;
    if (edge.source.startsWith("__empty__") || edge.target.startsWith("__empty__")) continue;
    const key = [edge.source, edge.target].sort().join(" <-> ");
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`- ${edge.source} ↔ ${edge.target}`);
  }
  if (seen.size === 0) {
    lines.push("- (아직 교차 참조 없음)");
  }
  lines.push("");

  // ── Unwritten topics from topic-pool ──
  if (fs.existsSync(topicPoolPath)) {
    const topicPool = JSON.parse(fs.readFileSync(topicPoolPath, "utf-8"));
    const existingSlugs = new Set(entries.map((e) => e.slug));
    const unwritten = [];

    for (const [category, topics] of Object.entries(topicPool)) {
      for (const slug of topics) {
        const alreadyExists = [...existingSlugs].some(
          (s) => s === `${category}/${slug}` || s.endsWith(`/${slug}`)
        );
        if (!alreadyExists) {
          const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          unwritten.push({ category, title });
        }
      }
    }

    lines.push(`## 미작성 주제 (topic-pool 기반, ${unwritten.length}개)`);
    for (const t of unwritten) {
      lines.push(`- [${t.category}] ${t.title}`);
    }
    lines.push("");
  }

  fs.writeFileSync(INDEX_FILE, lines.join("\n"));
  console.log(`📋 INDEX.md generated: ${entries.length} entries indexed`);
}

main();
