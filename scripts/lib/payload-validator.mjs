// Phase 4a D4 — worker-lesson dispatch subtype validation
//
// 워커가 자기 정책 commit (`policy:` / `feedback:` / `memory:` prefix) 도
// 기존 worker-lesson 채널로 dispatch. payload metadata `subtype` 로 구분.
// 새 event_type 추가 X (codex finding #2 정합).

const VALID_SUBTYPES = new Set(['self-policy']);

/**
 * client_payload 의 subtype + fingerprint 검증.
 * subtype 미정의 시 = 기존 lesson (backward-compat).
 *
 * @param {object} payload - client_payload
 * @returns {{valid: boolean, subtype: string|null, fingerprint: string|null, errors: string[], warnings: string[]}}
 */
export function validateLessonPayload(payload) {
  const errors = [];
  const warnings = [];

  const subtype = payload?.subtype;
  if (subtype !== undefined && subtype !== '' && !VALID_SUBTYPES.has(subtype)) {
    errors.push(
      `unknown subtype: ${subtype} (allowed: ${[...VALID_SUBTYPES].join(', ')})`,
    );
  }

  const fingerprint = payload?.fingerprint;
  if (subtype === 'self-policy' && (!fingerprint || fingerprint === '')) {
    warnings.push(
      'self-policy missing fingerprint (commit SHA recommended for traceability)',
    );
  }

  return {
    valid: errors.length === 0,
    subtype: subtype || null,
    fingerprint: fingerprint || null,
    errors,
    warnings,
  };
}

export function isKnownSubtype(subtype) {
  return VALID_SUBTYPES.has(subtype);
}

export function listValidSubtypes() {
  return [...VALID_SUBTYPES];
}
