// Phase 4a D5 — fingerprint-based correlation between incident and lesson Issues
//
// auto-ingest.yml 가 Issue title 에 `[fp:abc12345]` 박제 → incident-followup.yml
// 가 같은 fingerprint 의 lesson 존재 여부 매칭. 3일 후에도 없으면 워커 reminder.

const FP_PATTERN = /\[fp:([a-z0-9-]+)\]/;
const DEFAULT_REMINDER_DAYS = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Issue title 에서 fingerprint 추출.
 * @param {string} title
 * @returns {string|null}
 */
export function extractFingerprint(title) {
  if (!title) return null;
  const m = title.match(FP_PATTERN);
  return m ? m[1] : null;
}

/**
 * 미해결 (lesson 없는) incident 식별.
 *
 * @param {Array<{number: number, title: string, createdAt: string}>} incidents
 * @param {Array<{number: number, title: string, createdAt: string}>} lessons
 * @param {Date} now - reference time
 * @param {number} reminderDays - days after incident before reminder fires
 * @returns {Array} unacknowledged incidents (fingerprint extractable + 미해결 + 기간 충족)
 */
export function findUnacknowledgedIncidents(
  incidents,
  lessons,
  now,
  reminderDays = DEFAULT_REMINDER_DAYS,
) {
  const lessonFingerprints = new Set(
    lessons.map((l) => extractFingerprint(l.title)).filter(Boolean),
  );

  const reminderCutoff = new Date(now.getTime() - reminderDays * MS_PER_DAY);

  const filtered = incidents.filter((inc) => {
    const fp = extractFingerprint(inc.title);
    if (!fp) return false;
    if (lessonFingerprints.has(fp)) return false;

    const createdAt = new Date(inc.createdAt);
    if (createdAt > reminderCutoff) return false;

    return true;
  });

  // 같은 fp 의 incident 가 hub 에 여러 건 박혀있어도 reminder 는 1건만 — 가장 오래된 incident 유지.
  // gh API eventual consistency 로 workflow loop 의 dedup 검사가 같은 cron run 안에서 무력화되는 결함 차단.
  const oldestByFp = new Map();
  for (const inc of filtered) {
    const fp = extractFingerprint(inc.title);
    const existing = oldestByFp.get(fp);
    if (!existing || new Date(inc.createdAt) < new Date(existing.createdAt)) {
      oldestByFp.set(fp, inc);
    }
  }
  return Array.from(oldestByFp.values());
}
