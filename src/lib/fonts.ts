import { Inter, JetBrains_Mono } from "next/font/google";

// Dashboard 전용 폰트 스택 — next/font/google 로 self-host.
// 이유: AI slop 방지 (시스템 fallback 만 쓰면 generic monospace/sans 티남).
// variable 로 노출하여 CSS module 에서 var(--font-dashboard-sans) 로 참조.

export const dashboardSans = Inter({
  subsets: ["latin"],
  variable: "--font-dashboard-sans",
  display: "swap",
});

export const dashboardMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-dashboard-mono",
  display: "swap",
});
