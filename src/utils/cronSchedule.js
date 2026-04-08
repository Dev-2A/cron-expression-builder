import { CronExpressionParser } from "cron-parser";

/**
 * 다음 N회 실행 시간을 계산
 * @param {string} expr - 크론 표현식
 * @param {number} count - 몇 회 미리볼지
 * @returns {Date[]}
 */
export function getNextExecutions(expr, count = 10) {
  try {
    const interval = CronExpressionParser.parse(expr, {
      currentDate: new Date(),
      tz: "Asia/Seoul",
    });

    const dates = [];
    for (let i = 0; i < count; i++) {
      dates.push(interval.next().toDate());
    }
    return dates;
  } catch (e) {
    // v4 이전 API fallback
    try {
      const mod = require("cron-parser");
      const fn = mod.parseExpression || mod.default?.parseExpression;
      if (fn) {
        const interval = fn(expr, {
          currentDate: new Date(),
          tz: "Asia/Seoul",
        });
        const dates = [];
        for (let i = 0; i < count; i++) {
          dates.push(interval.next().toDate());
        }
        return dates;
      }
    } catch {
      /* ignore */
    }
    return [];
  }
}

/**
 * Date → "2026-04-07 (월) 09:00:00" 형태로 포맷
 */
export function formatDate(date) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const day = days[date.getDay()];
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");

  return `${y}-${m}-${d} (${day}) ${h}:${min}:${s}`;
}

/**
 * 두 Date 사이의 간격을 사람이 읽기 쉬운 문자열로 변환
 */
export function formatInterval(date) {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();

  if (diffMs < 0) return "이미 지남";

  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay}일 ${diffHour % 24}시간 후`;
  if (diffHour > 0) return `${diffHour}시간 ${diffMin % 60}분 후`;
  return `${diffMin}분 후`;
}
