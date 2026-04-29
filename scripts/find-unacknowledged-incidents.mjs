#!/usr/bin/env node
// Phase 4a D5 — incident-followup.yml 가 호출하는 thin CLI wrapper.
// 입력 JSON 파일 (incidents, lessons) → unacknowledged incidents (reminderDays 기준) JSON 출력.
//
// Usage: node scripts/find-unacknowledged-incidents.mjs <incidents.json> <lessons.json> <out.json> [reminderDays=3]

import fs from "node:fs";
import { findUnacknowledgedIncidents } from "./lib/incident-correlation.mjs";

const [, , incidentsPath, lessonsPath, outPath, reminderDaysArg] = process.argv;

if (!incidentsPath || !lessonsPath || !outPath) {
  console.error(
    "Usage: node scripts/find-unacknowledged-incidents.mjs <incidents.json> <lessons.json> <out.json> [reminderDays=3]",
  );
  process.exit(2);
}

const reminderDays = Number.parseInt(reminderDaysArg ?? "3", 10);

const incidents = JSON.parse(fs.readFileSync(incidentsPath, "utf8"));
const lessons = JSON.parse(fs.readFileSync(lessonsPath, "utf8"));

const result = findUnacknowledgedIncidents(
  incidents,
  lessons,
  new Date(),
  reminderDays,
);

fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
console.log(
  `Unacknowledged incidents (${reminderDays}+ days, no lesson): ${result.length}`,
);
