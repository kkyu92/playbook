/**
 * Mermaid 다이어그램 자동 수정 + 검증 로직.
 *
 * CLI 엔트리인 scripts/validate-content.mjs에서 import한다.
 * 테스트 가능하도록 별도 모듈로 분리됨 (scripts/__tests__/mermaid-fix.test.mjs).
 *
 * ⚠️ 이 모듈을 수정할 때는 반드시 회귀 테스트를 먼저 돌려야 함:
 *     npx vitest run scripts/__tests__/
 *
 * 과거에 두 가지 버그가 있었음:
 *
 * 1) 슬라이싱 오프셋 어긋남 — 호출 측에서 `content`(frontmatter 제거본) 기준으로
 *    mermaid 블록 위치를 찾아 `raw`(frontmatter 포함)에 적용했던 버그. 이제 호출 측은
 *    반드시 `raw` 기준으로 indexOf 해야 함.
 *
 * 2) 정규식 누적 매치 — `[A-Z]\d*\[([^\[\]]*\(...)\]` 가 이미 따옴표가 붙은 라벨에도
 *    매치해서 매 실행마다 따옴표가 중첩되던 버그. negative lookahead `(?!")` +
 *    라벨 문자 클래스에서 `"` 제외로 수정됨.
 */

const CYLINDER_SHAPE_RE = /^\(.*\)$/;

/**
 * Mermaid 코드 블록을 받아 자동 수정 + 유효성 검증.
 *
 * @param {string} code - mermaid 코드 블록 본문 (``` 제외)
 * @param {string} [filename] - (로깅용, 현재 미사용)
 * @returns {{ fixed: string, autoFixed: boolean, errors: Array<{line:number,message:string}> }}
 */
export function fixAndValidateMermaid(code, _filename) {
  let fixed = code;
  const errors = [];

  // AUTO-FIX #1: 노드 라벨의 괄호를 따옴표로 감싸기
  // 패턴: A[label (with parens)] → A["label (with parens)"]
  // ⚠️ 이미 따옴표가 있는 라벨은 건너뛰어야 함 (negative lookahead `(?!")`).
  //    안 그러면 매 실행마다 따옴표가 누적: D["x"] → D[""x""] → D["""x"""] ...
  // ⚠️ (?<!\w): 다중 문자 ID 내부 대문자 오매칭 방지 (예: DB[(x)] 에서 B 매칭 차단).
  // ⚠️ (?!\([\w"]): 실린더 shape [(text)] / [("text")] 은 유효 Mermaid 문법 — 건너뜀.
  fixed = fixed.replace(
    /(?<!\w)([A-Z]\d*)\[(?!")(?!\([\w"])([^\[\]"]*\([^\[\]"]*\)[^\[\]"]*)\]/g,
    '$1["$2"]',
  );

  // AUTO-FIX #2: subgraph 공백 bare id → quoted
  // 패턴: `subgraph Data Flow` → `subgraph "Data Flow"`
  // Skip: 이미 quoted, id + bracket label, 공백 없는 id, bracket/brace 포함
  fixed = fixed
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s*)subgraph\s+(.+?)\s*$/);
      if (!m) return line;
      const indent = m[1];
      const rest = m[2];
      if (/^".+"$/.test(rest)) return line; // 이미 quoted
      if (/^[\w-]+$/.test(rest)) return line; // id only (공백 없음)
      if (/^[\w-]+\s*\[".+"\]$/.test(rest)) return line; // valid id ["label"] form

      // AUTO-FIX #2b: invalid id (공백/특수문자) + bracket label
      // 패턴: `subgraph Orchestration & Automation ["MLOps Platform"]`
      // → `subgraph orchestration_automation ["Orchestration & Automation — MLOps Platform"]`
      // Mermaid id 는 \w+ 만 허용 → invalid id 부분을 normalize 하고 label 에 양쪽 정보 결합.
      // 5번째 재발 (2026-04-26 PR #39) 후 추가.
      const bracketMatch = rest.match(/^(.+?)\s*\["([^"]+)"\]\s*$/);
      if (bracketMatch) {
        const idPart = bracketMatch[1].trim();
        const labelPart = bracketMatch[2];
        // valid id 형식이면 위 분기에서 이미 통과 — 여기 도달하면 invalid
        if (idPart && !/^[\w-]+$/.test(idPart)) {
          const normalizedId =
            idPart
              .toLowerCase()
              .replace(/[^\w]+/g, "_")
              .replace(/^_|_$/g, "") || "group";
          return `${indent}subgraph ${normalizedId} ["${idPart} — ${labelPart}"]`;
        }
      }

      if (/\s/.test(rest) && !/[\[\]{}]/.test(rest)) {
        return `${indent}subgraph "${rest}"`;
      }
      return line;
    })
    .join("\n");

  const fixedLines = fixed.split("\n");
  const fixedContent = fixed;

  // 수정 후 유효성 검증 (auto-fix 여부와 무관하게 항상 실행)
  fixedLines.forEach((line, i) => {
    const trimmed = line.trim();
    const lineNum = i + 1;

    // 1. subgraph 검증
    const subgraphMatch = trimmed.match(/^subgraph\s+(.+)$/);
    if (subgraphMatch) {
      const rest = subgraphMatch[1];
      const bracketLabelForm = /^\w+\s*\[".+"\]\s*$/;
      const quotedForm = /^".+"\s*$/;
      const idOnlyForm = /^[\w-]+\s*$/;
      if (
        !bracketLabelForm.test(rest) &&
        !quotedForm.test(rest) &&
        !idOnlyForm.test(rest)
      ) {
        if (/[()\[\]{}:;&]/.test(rest) || /\s/.test(rest)) {
          errors.push({
            line: lineNum,
            message: `subgraph 형식 오류: "${rest}". 유효 형식: "subgraph id", 'subgraph id ["label"]', 'subgraph "name"'`,
          });
        }
      }
    }

    // 2. 노드 라벨 검증 (자동 수정 후 남은 문제)
    const nodeBracketMatches = trimmed.matchAll(/\[([^\]]+)\]/g);
    for (const m of nodeBracketMatches) {
      const label = m[1];
      // Mermaid cylinder shape [(text)] or [("text")] — valid syntax, skip
      const isCylinderShape = CYLINDER_SHAPE_RE.test(label);
      if (/[()]/.test(label) && !label.startsWith('"') && !label.endsWith('"') && !isCylinderShape) {
        errors.push({
          line: lineNum,
          message: `노드 라벨에 괄호 사용: "${label}". 수정: ["${label}"]`,
        });
      }
    }

    // 3. 화살표 라벨 검증
    const arrowLabelMatch = trimmed.match(/\|([^|]+)\|/);
    if (arrowLabelMatch && /[()]/.test(arrowLabelMatch[1])) {
      errors.push({
        line: lineNum,
        message: `화살표 라벨에 괄호: "${arrowLabelMatch[1]}". 괄호 제거하거나 따옴표 사용`,
      });
    }
  });

  return { fixed: fixedContent, autoFixed: fixedContent !== code, errors };
}
