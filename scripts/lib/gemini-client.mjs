/**
 * Gemini client helper.
 * - 2.5-flash → 2.0-flash fallback (quota 0 인 경우도 있지만 실제 503 대응)
 * - 5회 retry, exponential backoff (10s → 30s → 60s → 120s)
 * - responseSchema 기반 JSON 강제 지원 (Zod retry loop 대체)
 *
 * prompt injection 방어: callers 가 RSS/external body 포함 시
 * <<<BEGIN_EXTERNAL>>>...<<<END_EXTERNAL>>> delimiter + system role 명시 할 것.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
const BACKOFFS = [10, 30, 60, 120];

export function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set");
  }
  return new GoogleGenerativeAI(apiKey);
}

/**
 * Gemini 호출 + retry + JSON parse.
 *
 * @param {object} opts
 * @param {string} opts.prompt
 * @param {object} [opts.responseSchema] — Gemini responseSchema (JSON 강제)
 * @param {(text: string) => any} [opts.parse] — responseSchema 없을 때 파싱 함수. default = JSON.parse (마크다운 펜스 제거).
 * @param {(parsed: any) => boolean | string} [opts.validate] — 파싱 후 추가 검증. false 또는 string 리턴 시 retry.
 * @returns {Promise<any>}
 */
export async function generateStructured({ prompt, responseSchema, parse, validate }) {
  const client = getClient();
  let modelIdx = 0;

  const makeModel = (idx) => {
    const config = { model: MODELS[idx] };
    if (responseSchema) {
      config.generationConfig = {
        responseMimeType: "application/json",
        responseSchema,
      };
    }
    return client.getGenerativeModel(config);
  };

  let model = makeModel(modelIdx);

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();

      if (!responseSchema) {
        // Strip markdown fences
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
      console.warn(`⚠️  Attempt ${attempt + 1} (${MODELS[modelIdx]}) failed: ${err.message}`);
      // 2번째 실패부터 모델 전환 (2.5 전역 장애 대응)
      if (attempt === 1 && modelIdx < MODELS.length - 1) {
        modelIdx++;
        model = makeModel(modelIdx);
        console.log(`   🔄 모델 전환: ${MODELS[modelIdx]}`);
      }
      if (attempt === 4) {
        throw new Error(`All 5 retries failed across models: ${MODELS.join(", ")} — ${err.message}`);
      }
      const wait = BACKOFFS[attempt];
      console.log(`   ⏳ ${wait}s 대기 후 재시도...`);
      await new Promise((r) => setTimeout(r, wait * 1000));
    }
  }
}

/**
 * RSS body 처럼 외부 입력을 포함하는 프롬프트를 안전하게 감쌈.
 * prompt injection 방어 — LLM 이 body 속 명령을 지시로 오인하지 않도록.
 */
export function wrapExternalContent(content, label = "RSS") {
  return `<<<BEGIN_${label}>>>\n${content}\n<<<END_${label}>>>`;
}
