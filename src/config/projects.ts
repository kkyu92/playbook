export interface ProjectConfig {
  name: string;
  repo: string; // owner/repo
  url: string; // production URL
  description: string;
}

export const PROJECTS: ProjectConfig[] = [
  {
    name: "MoneyBall",
    repo: "kkyu92/moneyball-ecosystem",
    url: "https://moneyballscore.vercel.app",
    description: "KBO 세이버메트릭스 승부예측 엔진",
  },
  // 새 프로젝트 추가 시 여기에 추가
];
