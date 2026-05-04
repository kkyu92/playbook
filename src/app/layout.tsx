import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MobileNav } from "@/components/mobile-nav";
import { SearchDialog } from "@/components/search-dialog";
import { GraphSearchProvider } from "@/contexts/graph-search-context";
import { getManifest } from "@/lib/content";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://playbook-virid-xi.vercel.app";

export const metadata: Metadata = {
  title: { default: "Playbook Hub", template: "%s — Playbook Hub" },
  description:
    "개인 지식 허브 + 프로젝트 관제탑 — AI 에이전트 활용 패턴을 엔트리로 누적",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Playbook Hub",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // searchEntries는 모든 페이지의 Header → SearchTrigger → SearchDialog가 사용
  // root layout에서 한 번만 로드해서 글로벌 dialog에 주입 (wiki/홈 개별 mount 제거)
  const manifest = getManifest();
  const searchEntries = manifest.entries.map((e) => ({
    slug: e.slug,
    title: e.frontmatter.title,
    category: e.frontmatter.category,
    description: e.frontmatter.description,
    tags: e.frontmatter.tags,
  }));

  return (
    <html lang="ko" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        {/* Font preconnect */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* RSS */}
        <link rel="alternate" type="application/rss+xml" title="Playbook Hub" href="/feed.xml" />
        {/* Satoshi — display font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
        {/* Pretendard — body font (Korean optimized) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* JetBrains Mono = next/font/google (root className 으로 변수 주입) */}
      </head>
      <body className="min-h-screen antialiased pb-14 lg:pb-0">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <GraphSearchProvider>
            {children}
            <MobileNav />
            <SearchDialog entries={searchEntries} />
          </GraphSearchProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
