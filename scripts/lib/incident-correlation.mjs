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

  return incidents.filter((inc) => {
    const fp = extractFingerprint(inc.title);
    if (!fp) return false;
    if (lessonFingerprints.has(fp)) return false;

    const createdAt = new Date(inc.createdAt);
    if (createdAt > reminderCutoff) return false;

    return true;
  });
}
