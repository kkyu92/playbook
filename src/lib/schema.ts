import { z } from "zod";

export const CATEGORIES = [
  "prompt-engineering",
  "context-engineering",
  "harness-engineering",
  "agents",
  "evaluation",
  "infrastructure",
  "frontend-ai",
  "project-ops",
  "data-engineering",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<string, string> = {
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

// 시리즈(frontmatter `series` 필드) 라벨/아이콘. 사이드바 sub-group 헤더에 사용.
// 새 시리즈 추가 시 여기에 한 줄 추가하면 사이드바가 자동으로 그룹화한다.
export const SERIES_LABELS: Record<string, { label: string; icon: string }> = {
  "playbook-journal": { label: "Playbook Journal", icon: "📓" },
};

export const CATEGORY_COLORS: Record<string, string> = {
  "prompt-engineering": "#ffd700",
  "context-engineering": "#00bfff",
  "harness-engineering": "#ff4757",
  agents: "#00ff88",
  evaluation: "#ccff00",
  infrastructure: "#708090",
  "frontend-ai": "#ffa07a",
  "project-ops": "#ff6348",
  "data-engineering": "#ff69b4",
};

// 사이드바용 카테고리 그룹. 엔트리 수가 늘어나면서 10 카테고리가 한꺼번에 펼쳐지면
// 시각적으로 힘들어서 상위 그룹(서브메뉴)으로 묶는다. 그룹 자체도 접이식.
export const CATEGORY_GROUPS: Array<{
  key: string;
  label: string;
  categories: Category[];
}> = [
  {
    key: "methodology",
    label: "AI 엔지니어링 방법론",
    categories: ["prompt-engineering", "context-engineering", "harness-engineering"],
  },
  {
    key: "system",
    label: "시스템 & 에이전트",
    categories: ["agents", "evaluation"],
  },
  {
    key: "ops",
    label: "운영 & 인프라",
    categories: ["project-ops", "infrastructure", "data-engineering"],
  },
  {
    key: "applications",
    label: "응용",
    categories: ["frontend-ai"],
  },
];

export const quizQuestionSchema = z.object({
  question: z.string(),
  choices: z.array(z.string()).min(2),
  answer: z.number().int().min(0),
  explanation: z.string().optional(),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export const frontmatterSchema = z.object({
  title: z.string(),
  category: z.enum(CATEGORIES),
  date: z.string(),
  tags: z.array(z.string()),
  confidence: z.number().min(1).max(5).default(1),
  connections: z.array(z.string()).default([]),
  status: z.enum(["draft", "in-progress", "complete"]).default("draft"),
  description: z.string(),
  type: z.enum(["entry", "til"]).default("entry"),
  series: z.string().optional(),
  quiz: z.array(quizQuestionSchema).optional(),
  workers: z.array(z.string()).default([]),
  raw_source: z.string().optional(), // auto-ingest 가 박은 raw 파일 경로 — weekly-triage 가 grep 기준으로 사용
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface WikiEntry {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export interface ContentManifest {
  entries: Array<{
    slug: string;
    frontmatter: Frontmatter;
  }>;
  graph: {
    nodes: Array<{
      id: string;
      label: string;
      category: string;
      confidence: number;
      description: string;
      type?: "roadmap";
    }>;
    edges: Array<{
      source: string;
      target: string;
    }>;
  };
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
  };
  dailyEntries: Record<string, number>;
  stats: {
    totalEntries: number;
    totalComplete: number;
    avgConfidence: number;
    categoryStats: Record<string, { count: number; avgConfidence: number; complete: number }>;
    weeklyStats: Array<{ week: string; count: number; startDate: string; endDate: string }>;
    recentEntries: Array<{ slug: string; title: string; date: string; category: string }>;
    roadmapCount: number;
  };
}
