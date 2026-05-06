import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const CATEGORY_COLORS: Record<string, string> = {
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

const CATEGORY_LABELS: Record<string, string> = {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Playbook Hub";
  const category = searchParams.get("category") || "";
  const accentColor = CATEGORY_COLORS[category] || "#06b6d4";
  const categoryLabel = CATEGORY_LABELS[category] || "";

  let font: ArrayBuffer | undefined;
  try {
    const fontRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
    );
    const css = await fontRes.text();
    const fontUrlMatch = css.match(/url\(([^)]+)\)/);
    if (fontUrlMatch) {
      const fontDataRes = await fetch(fontUrlMatch[1]);
      font = await fontDataRes.arrayBuffer();
    }
  } catch (err) {
    console.warn(
      "[og] Google Fonts fetch failed (system font fallback):",
      err,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "#0a0f1a",
          fontFamily: font ? "Noto Sans KR" : "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: accentColor,
          }}
        />

        {/* Top: Category badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {categoryLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "20px",
                background: `${accentColor}20`,
                color: accentColor,
                fontSize: "20px",
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: accentColor,
                }}
              />
              {categoryLabel}
            </div>
          )}
        </div>

        {/* Center: Title */}
        <div
          style={{
            fontSize: title.length > 30 ? "42px" : "52px",
            fontWeight: 700,
            color: "#d0dbe8",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Bottom: Site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "#8899aa", fontSize: "22px", fontWeight: 700 }}>
            Playbook Hub
          </div>
          <div style={{ color: "#8899aa", fontSize: "18px" }}>
            playbook-virid-xi.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(font
        ? {
            fonts: [
              {
                name: "Noto Sans KR",
                data: font,
                weight: 700 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    }
  );
}
