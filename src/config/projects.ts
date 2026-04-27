export interface ProjectConfig {
  name: string;
  repo: string; // owner/repo
  url: string; // production URL
  description: string;
}

export const PROJECTS: ProjectConfig[] = [
  {
    name: "MoneyBall",
    repo: "kkyu92/moneyballscore",
    url: "https://moneyballscore.vercel.app",
    description: "KBO 세이버메트릭스 승부예측 엔진",
  },
  {
    name: "Blog Autopilot",
    repo: "kkyu92/blog-autopilot",
    url: "https://github.com/kkyu92/blog-autopilot",
    description: "키워드 트렌드 기반 블로그 자동화 (6 niches, Claude API + Blogger v3)",
  },
];
