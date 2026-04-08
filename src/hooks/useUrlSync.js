import { useEffect, useRef } from "react";

/**
 * 크론 표현식을 URL 쿼리 파라미터 (?expr=...) 와 동기화
 * - 페이지 로드 시 URL에서 초기값 읽기
 * - 표현식 변경 시 URL 갱신 (pushState 없이 replaceState)
 */

const PARAM_KEY = "expr";

/** URL에서 크론 표현식 읽기 */
export function getExprFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PARAM_KEY);
  if (!raw) return null;

  // URL에서는 공백이 + 또는 %20 → 디코딩
  const decoded = decodeURIComponent(raw).replace(/\+/g, " ");

  // 기본 형식 체크 (5개 필드)
  const parts = decoded.trim().split(/\s+/);
  if (parts.length === 5) return decoded.trim();

  return null;
}

/** 표현식이 변경될 때 URL 갱신 */
export function useUrlSync(expression, validation) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 첫 렌더에서는 URL을 갱신하지 않음 (URL → state 방향만)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!validation.valid) return;

    const url = new URL(window.location.href);
    url.searchParams.set(PARAM_KEY, expression);
    window.history.replaceState(null, "", url.toString());
  }, [expression, validation.valid]);
}
