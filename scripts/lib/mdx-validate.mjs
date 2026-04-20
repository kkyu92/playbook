/**
 * MDX 본문 검증 로직.
 *
 * CLI 엔트리인 scripts/validate-content.mjs 와 LLM 생성 파이프라인인
 * scripts/generate-lesson.mjs 양쪽에서 재사용됨.
 *
 * A2 Phase 1 축: LLM 출력이 "prompt constraint 를 준수한다" 고 가정하면 안 됨.
 * 생성 직후 검증 + 재생성 루프로 fail-loud.
 */

import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

/**
 * AI 생성 콘텐츠에서 반복되는 JSX 파싱 함정 탐지.
 * - 본문 텍스트의 {중괄호} → JSX expression 으로 파싱
 * - 본문 텍스트의 <숫자 → JSX 태그 시작으로 파싱
 * - HTML void 태그 self-closing 누락 (<br>, <hr>, <img>)
 */
export function detectJsxTraps(content) {
  const warnings = [];
  const lines = content.split("\n");
  let inCodeBlock = false;
  let inFrontmatter = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    if (i === 0 && line.trim() === "---") { inFrontmatter = true; continue; }
    if (inFrontmatter && line.trim() === "---") { inFrontmatter = false; continue; }
    if (inFrontmatter) continue;

    if (line.trim().startsWith("```")) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;

    const withoutInlineCode = line.replace(/`[^`]+`/g, "");

    const curlyMatch = withoutInlineCode.match(/\{[^}]*[a-zA-Z가-힣][^}]*\}/);
    if (curlyMatch) {
      warnings.push({
        line: lineNum,
        message: `{중괄호} JSX 파싱 위험: "${curlyMatch[0]}" → 인라인 코드(\`)로 감싸거나 괄호()로 교체`,
      });
    }

    const angleBracketNum = withoutInlineCode.match(/<(\d)/);
    if (angleBracketNum) {
      warnings.push({
        line: lineNum,
        message: `<${angleBracketNum[1]} JSX 태그 파싱 위험 → "< ${angleBracketNum[1]}" (공백) 또는 인라인 코드로 감싸기`,
      });
    }

    const voidTag = withoutInlineCode.match(/<(br|hr|img)(?:\s[^>]*)?(?<!\/)>/i);
    if (voidTag) {
      warnings.push({
        line: lineNum,
        message: `<${voidTag[1]}> self-closing 누락 → <${voidTag[1]} /> 로 변경`,
      });
    }
  }
  return warnings;
}

/**
 * MDX 콘텐츠 전체 검증 — JSX 함정 탐지 + 실제 컴파일 시도.
 *
 * @param {string} rawOrBody - frontmatter 포함 MDX 또는 본문만. matter() 가 둘 다 처리.
 * @returns {Promise<{valid: boolean, compileError: string|null, jsxWarnings: Array<{line: number, message: string}>}>}
 */
export async function validateMdxContent(rawOrBody) {
  const { content } = matter(rawOrBody);
  const jsxWarnings = detectJsxTraps(content);

  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
    return { valid: true, compileError: null, jsxWarnings };
  } catch (err) {
    return { valid: false, compileError: err.message, jsxWarnings };
  }
}
