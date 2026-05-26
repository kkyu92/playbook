// E5 모델 임베딩 설정 — embed-content.mjs 와 search.mjs 공유
// 상수 변경 시 pnpm embed-content 재실행 필수 (version mismatch → search exit 1)
export const EMBEDDING_MODEL = "Xenova/multilingual-e5-small";
export const PASSAGE_PREFIX = "passage: ";
export const QUERY_PREFIX = "query: ";
// role 명시 형식: 역할-접두사 swap 버그를 version 비교로 즉시 감지
export const EMBEDDING_VERSION = `${EMBEDDING_MODEL}|passage=${PASSAGE_PREFIX.trim()}|query=${QUERY_PREFIX.trim()}`;
