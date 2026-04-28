/**
 * 공통 LLM 생성 + validation + autoFix + retry 패턴.
 *
 * 4건 누적 (mermaid #2/#2b, post-gen-validation, model-tier-quota) 후
 * `generate-lesson.mjs` 의 retry 루프를 추출한 모듈.
 *
 * 설계 원칙 (docs/solutions/llm-generation/_compiled-truth.md 메타 패턴):
 * - LLM output 은 "에이전트" 가 아니라 "외부 입력" → validation 필수
 * - 재생성 시 구체적 에러 주입 → 같은 실수 반복 방지
 * - detect-only → auto-fix 승격 (3회 재발 시)
 * - fail-loud > silent broken
 *
 * 사용처:
 * - scripts/generate-lesson.mjs (현재)
 * - 향후 auto-cross-update-shadow, auto-PR 등 — 같은 패턴 상속
 */

/**
 * @typedef {(prompt: string) => Promise<any>} Generator
 *   prompt 를 받아 payload 반환 (Gemini, OpenAI 등 어떤 backend 든).
 *
 * @typedef {(payload: any) => string[] | Promise<string[]>} Validator
 *   payload 검증. issue 메시지 배열 반환 (빈 배열이면 통과).
 *
 * @typedef {(payload: any) => { autoFixed: boolean, issues: string[] }} AutoFixer
 *   payload 를 in-place mutate 가능. autoFixed = true 면 변경 적용된 것.
 *   issues = autoFix 후에도 남은 에러 (다음 retry 의 prompt 주입에 사용).
 */

const DEFAULT_MAX_ATTEMPTS = 3;

/**
 * 기본 prompt builder — base prompt 끝에 이전 issues 를 구체적으로 주입.
 *
 * @param {string} base
 * @param {string[]} issues
 * @returns {string}
 */
function defaultPromptBuilder(base, issues) {
  if (issues.length === 0) return base;
  return `${base}\n\n---\n\n이전 응답 문제. 반드시 수정:\n${issues.map((i) => `- ${i}`).join("\n")}`;
}

/**
 * 생성 + validate + autoFix + retry 통합 루프.
 *
 * @param {object} opts
 * @param {string} opts.basePrompt
 * @param {Generator} opts.generate
 * @param {Validator[]} [opts.validators=[]]
 * @param {AutoFixer[]} [opts.autoFixers=[]]
 * @param {number} [opts.maxAttempts=3]
 * @param {(base: string, issues: string[]) => string} [opts.promptBuilder]
 * @returns {Promise<any>} 검증 통과한 payload
 * @throws {Error} maxAttempts 회 모두 실패 시 마지막 issues 합쳐서 throw
 */
export async function generateWithValidation({
  basePrompt,
  generate,
  validators = [],
  autoFixers = [],
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  promptBuilder = defaultPromptBuilder,
}) {
  let lastIssues = [];
  let payload;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const prompt = promptBuilder(basePrompt, attempt === 0 ? [] : lastIssues);
    payload = await generate(prompt);

    const issues = [];

    // AutoFix 단계 (validator 전에 — autoFix 가 issue 를 미리 줄임)
    for (const fixer of autoFixers) {
      const result = fixer(payload);
      if (result?.issues?.length) issues.push(...result.issues);
    }

    // Validator 단계
    for (const validator of validators) {
      const validatorIssues = await validator(payload);
      if (Array.isArray(validatorIssues) && validatorIssues.length > 0) {
        issues.push(...validatorIssues);
      }
    }

    if (issues.length === 0) {
      if (attempt > 0) console.log(`✅ Validation 통과 (재생성 ${attempt}회 후)`);
      return payload;
    }

    lastIssues = issues;
    console.warn(`⚠️  Validation 실패 (${attempt + 1}/${maxAttempts}):`);
    issues.forEach((i) => console.warn(`   - ${i}`));
  }

  throw new Error(`Validation ${maxAttempts}회 실패: ${lastIssues.join(", ")}`);
}
