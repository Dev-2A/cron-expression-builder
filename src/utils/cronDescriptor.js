import cronstrue from "cronstrue/i18n";
import { MONTH_NAMES, DAY_NAMES } from "../constants/cronFields";

/**
 * 크론 표현식 → 한국어 자연어 설명 (전체)
 */
export function describeExpression(expr) {
  try {
    return cronstrue.toString(expr, {
      locale: "ko",
      use24HourTimeFormat: true,
      verbose: true,
    });
  } catch {
    return "유효하지 않은 크론 표현식입니다";
  }
}

/**
 * 단일 필드 값 → 한국어 설명
 */
export function describeField(fieldName, value) {
  if (value === "*") return "매번";

  // 스텝
  if (value.includes("/")) {
    const [base, step] = value.split("/");
    const unit = getUnit(fieldName);
    if (base === "*") return `매 ${step}${unit}마다`;
    if (base.includes("-")) {
      const [s, e] = base.split("-");
      return `${formatValue(fieldName, s)}부터 ${formatValue(fieldName, e)}까지, ${step}${unit}마다`;
    }
    return `${formatValue(fieldName, base)}부터 매 ${step}${unit}마다`;
  }

  // 범위
  if (value.includes("-") && !value.includes(",")) {
    const [start, end] = value.split("-");
    return `${formatValue(fieldName, start)}부터 ${formatValue(fieldName, end)}까지`;
  }

  // 특정 값
  const parts = value.split(",");
  if (parts.length === 1) return formatValue(fieldName, parts[0]);
  if (parts.length <= 5) {
    const labels = parts.map((p) => formatValue(fieldName, p));
    return labels.join(", ");
  }
  return `${parts.length}개 선택됨`;
}

function getUnit(fieldName) {
  const units = {
    minute: "분",
    hour: "시간",
    dayOfMonth: "일",
    month: "개월",
    dayOfWeek: "일",
  };
  return units[fieldName] || "";
}

function formatValue(fieldName, val) {
  const num = Number(val);
  switch (fieldName) {
    case "minute":
      return `${num}분`;
    case "hour":
      return `${num}시`;
    case "dayOfMonth":
      return `${num}일`;
    case "month":
      return MONTH_NAMES[num] || `${num}월`;
    case "dayOfWeek":
      return `${DAY_NAMES[num] || num}요일`;
    default:
      return String(val);
  }
}
