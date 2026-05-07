// Quiz state persistence (client-side, localStorage)
// Stores per-entry quiz attempts and a global attempt log used by dashboard.

const STATE_PREFIX = "quiz:state:";
const LOG_KEY = "quiz:attempts";
const REVIEW_KEY = "quiz:reviews";

// Spaced repetition intervals (days). Index = current step.
// Step advances on score >= 80%, holds on >= 50%, resets to 0 below.
const SRS_INTERVALS = [1, 3, 7, 14, 30, 60];

export interface QuizState {
  selections: Record<number, number | null>;
  submitted: boolean;
  lastAttemptAt: string;
  score: number;
  total: number;
}

export interface QuizAttempt {
  slug: string;
  category: string;
  score: number;
  total: number;
  at: string; // ISO timestamp
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadQuizState(slug: string): QuizState | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STATE_PREFIX + slug);
    if (!raw) return null;
    return JSON.parse(raw) as QuizState;
  } catch (err) {
    console.warn(
      `[quiz-storage] loadQuizState slug=${slug} failed:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

export function saveQuizState(slug: string, state: QuizState | null): void {
  if (!isBrowser()) return;
  try {
    if (state === null) {
      localStorage.removeItem(STATE_PREFIX + slug);
    } else {
      localStorage.setItem(STATE_PREFIX + slug, JSON.stringify(state));
    }
  } catch (err) {
    console.warn(
      `[quiz-storage] saveQuizState slug=${slug} failed (quota?):`,
      err instanceof Error ? err.message : err
    );
  }
}

function loadAttempts(): QuizAttempt[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as QuizAttempt[];
  } catch (err) {
    console.warn(
      `[quiz-storage] loadAttempts parse failed:`,
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export function recordQuizAttempt(attempt: QuizAttempt): void {
  if (!isBrowser()) return;
  try {
    const log = loadAttempts();
    log.push(attempt);
    // Cap log size to keep localStorage usage bounded
    const trimmed = log.slice(-500);
    localStorage.setItem(LOG_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.warn(
      `[quiz-storage] recordQuizAttempt slug=${attempt.slug} write failed (quota?):`,
      err instanceof Error ? err.message : err
    );
  }
  // Update SRS schedule based on this attempt
  updateReviewSchedule(attempt);
}

// ── Spaced Repetition ───────────────────────────────────────────

interface ReviewItem {
  slug: string;
  category: string;
  step: number; // index into SRS_INTERVALS
  lastReviewedAt: string; // ISO
  nextReviewAt: string; // ISO
  lastScore: number;
  lastTotal: number;
}

type ReviewMap = Record<string, ReviewItem>;

function loadReviews(): ReviewMap {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(REVIEW_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as ReviewMap;
  } catch (err) {
    console.warn(
      `[quiz-storage] loadReviews parse failed:`,
      err instanceof Error ? err.message : err
    );
    return {};
  }
}

function saveReviews(map: ReviewMap): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn(
      `[quiz-storage] saveReviews write failed (quota?):`,
      err instanceof Error ? err.message : err
    );
  }
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function updateReviewSchedule(attempt: QuizAttempt): void {
  if (!isBrowser()) return;
  const reviews = loadReviews();
  const prev = reviews[attempt.slug];
  const accuracy = attempt.total > 0 ? attempt.score / attempt.total : 0;

  let step = prev?.step ?? 0;
  if (accuracy >= 0.8) {
    step = Math.min(step + 1, SRS_INTERVALS.length - 1);
  } else if (accuracy >= 0.5) {
    // hold step (review again at same interval)
  } else {
    step = 0;
  }

  const intervalDays = SRS_INTERVALS[step];
  reviews[attempt.slug] = {
    slug: attempt.slug,
    category: attempt.category,
    step,
    lastReviewedAt: attempt.at,
    nextReviewAt: addDays(attempt.at, intervalDays),
    lastScore: attempt.score,
    lastTotal: attempt.total,
  };
  saveReviews(reviews);
}

