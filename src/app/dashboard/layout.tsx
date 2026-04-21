import type { ReactNode } from "react";
import { dashboardSans, dashboardMono } from "@/lib/fonts";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${dashboardSans.variable} ${dashboardMono.variable}`}>
      {children}
    </div>
  );
}
