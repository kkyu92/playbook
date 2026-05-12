/**
 * Gemini client helper.
 * - Multi-key support: GEMINI_API_KEY (primary) + GEMINI_API_KEY_FALLBACK
 *   + GEMINI_API_KEY_FALLBACK_2 + GEMINI_API_KEY_FALLBACK_3 (최대 4개 계정)
 * - gemini-2.5-flash 단일 모델 사용
 *   (과거 2.0-flash fallback 제거 — 2026-04 신규 계정은 2.0-flash free tier quota 0
 *    할당받음. Google 의 legacy 모델 sunset 정책. 구식 모델 유지 = 신규 키 호환성 손실.)
 * - 5회 retry, exponential backoff (10s → 30s → 60s → 120s)
 * - responseSchema 기반 JSON 강제 (Zod retry loop 대체)
 * - Daily quota 감지 시 즉시 다음 key 전환 (backoff 낭비 차단)
 *
 * prompt injection 방어: callers 가 RSS/external body 포함 시
 * <<<BEGIN_EXTERNAL>>>...<<<END_EXTERNAL>>> delimiter + system role 명시.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = "gemini-2.5-flash";
const BACKOFFS = [10, 30, 60, 120];

/**
 * 등록된 key 순서대로 client 객체 배열 생성.
 * Primary 없으면 throw. Fallback key 들은 있는 만큼 로드.
 * 중복 값 (복붙 실수 방어) 은 skip.
 *
 * 지원 env: GEMINI_API_KEY, GEMINI_API_KEY_FALLBACK, _FALLBACK_2, _FALLBACK_3
 */
let _clients = null;
function buildClients() {
  if (_clients) return _clients;
  const primary = process.env.GEMINI_API_KEY;
  if (!primary) throw new Error("GEMINI_API_KEY not set");

  const clients = [{ label: "primary", client: new GoogleGenerativeAI(primary) }];
  const seen = new Set([primary]);

  const candidates = [
    ["fallback", process.env.GEMINI_API_KEY_FALLBACK],
    ["fallback_2", process.env.GEMINI_API_KEY_FALLBACK_2],
    ["fallback_3", process.env.GEMINI_API_KEY_FALLBACK_3],
  ];
  for (const [label, value] of candidates) {
    if (value && !seen.has(value)) {
      clients.push({ label, client: new GoogleGenerativeAI(value) });
      seen.add(value);
    }
  }
  _clients = clients;
  return _clients;
}


/**
 * Daily quota 소진 여부 감지.
 * Per-minute quota (backoff 후 복구) 와 구분 — 전자만 즉시 fallback 전환.
 *
 * 힌트:
 *   - `limit: 0` 리터럴 (Google 이 daily cap 소진 시 이 형태로 응답)
 *   - `PerDay` (quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier)
 */
export function isDailyQuotaError(err) {
  const msg = String(err?.message || err);
  return /limit:\s*0/.test(msg) || /PerDay/i.test(msg);
}

/**
 * Gemini 호출 + retry + JSON parse. Key/Model fallback 내장.
 *
 * 전환 우선순위:
 *   1. Daily quota 감지 → 즉시 다음 key 전환 (backoff skip)
 *   2. Attempt 4 (마지막) 실패 → 다음 key 전환, 없으면 throw
 *   3. 그 외 → backoff 후 재시도
 *
 * @param {object} opts
 * @param {string} opts.prompt
 * @param {object} [opts.responseSchema] — Gemini responseSchema (JSON 강제)
 * @param {(text: string) => any} [opts.parse] — responseSchema 없을 때 파싱 함수
 * @param {(parsed: any) => boolean | string} [opts.validate] — 파싱 후 추가 검증
 * @returns {Promise<any>}
 */
export async function generateStructured({ prompt, responseSchema, parse, validate }) {
  const clients = buildClients();
  let lastErr;

  for (let keyIdx = 0; keyIdx < clients.length; keyIdx++) {
    const { client, label } = clients[keyIdx];
    const hasMoreKeys = keyIdx < clients.length - 1;

    const config = { model: MODEL };
    if (responseSchema) {
      config.generationConfig = {
        responseMimeType: "application/json",
        responseSchema,
      };
    }
    const model = client.getGenerativeModel(config);

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();

        if (!responseSchema) {
          text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
        }

        const parsed = parse ? parse(text) : JSON.parse(text);

        if (validate) {
          const v = validate(parsed);
          if (v !== true) {
            throw new Error(`Validation failed: ${typeof v === "string" ? v : "invalid"}`);
          }
        }

        return parsed;
      } catch (err) {
        lastErr = err;
        console.warn(`⚠️  [${label}] Attempt ${attempt + 1} (${MODEL}) failed: ${(err.message || "").slice(0, 300)}`);

        // Daily quota 감지 → 즉시 다음 key 전환 (backoff 무의미)
        if (hasMoreKeys && isDailyQuotaError(err)) {
          console.log(`   🔑 [${label}] daily quota 소진 → fallback key 로 전환`);
          break;
        }

        // 마지막 attempt 처리
        if (attempt === 4) {
          if (hasMoreKeys) {
            console.log(`   🔑 [${label}] 5 attempts 소진 → fallback key 로 전환`);
            break;
          }
          throw new Error(`All ${clients.length} keys exhausted (model: ${MODEL}) — ${err.message}`);
        }

        const wait = BACKOFFS[attempt];
        console.log(`   ⏳ ${wait}s 대기 후 재시도...`);
        await new Promise((r) => setTimeout(r, wait * 1000));
      }
    }
  }

  throw new Error(`All keys exhausted — ${lastErr?.message || "unknown"}`);
}

/**
 * RSS body 처럼 외부 입력을 포함하는 프롬프트를 안전하게 감쌈.
 * prompt injection 방어 — LLM 이 body 속 명령을 지시로 오인하지 않도록.
 */
export function wrapExternalContent(content, label = "RSS") {
  return `<<<BEGIN_${label}>>>\n${content}\n<<<END_${label}>>>`;
}
