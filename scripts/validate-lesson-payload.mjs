#!/usr/bin/env node
// Phase 4a D4 — auto-ingest.yml 가 호출하는 thin CLI wrapper.
// payload-validator.mjs 의 validateLessonPayload 를 lesson dispatch 의 subtype/fingerprint 검증에 사용.
//
// Usage: node scripts/validate-lesson-payload.mjs <subtype> <fingerprint>
// Output: JSON result on stdout
// Exit:   0 = valid, 1 = invalid (errors → workflow warning + subtype 무시)

import { validateLessonPayload } from "./lib/payload-validator.mjs";

const subtype = process.argv[2] ?? "";
const fingerprint = process.argv[3] ?? "";

const r = validateLessonPayload({ subtype, fingerprint });
console.log(JSON.stringify(r));
process.exit(r.valid ? 0 : 1);
