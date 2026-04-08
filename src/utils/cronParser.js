import {
  FIELD_NAMES,
  FIELD_RANGES,
  FIELD_TYPES,
} from "../constants/cronFields";

/**
 * 크론 표현식 문자열 → 필드별 객체로 파싱
 * "0 9 * * 1" → { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1" }
 */
export function parseExpression(expr) {
  const parts = expr.trim().split(/\s+/);
  const result = {};

  FIELD_NAMES.forEach((name, i) => {
    result[name] = parts[i] || "*";
  });

  return result;
}

/**
 * 필드별 객체 → 크론 표현식 문자열로 조합
 */
export function buildExpression(fields) {
  return FIELD_NAMES.map((name) => fields[name] || "*").join(" ");
}

/**
 * 단일 필드 값의 타입을 판별
 * "*" → EVERY, "1,3,5" → SPECIFIC, "1-5" → RANGE, "* / 5" → STEP, "1-10/2" → STEP
 */
export function detectFieldType(value) {
  if (value === "*") return FIELD_TYPES.EVERY;
  if (value.includes("/")) return FIELD_TYPES.STEP;
  if (value.includes("-") && !value.includes(",")) return FIELD_TYPES.RANGE;
  if (value.includes(",") || /^\d+$/.test(value)) return FIELD_TYPES.SPECIFIC;
  return FIELD_TYPES.EVERY;
}

/**
 * 단일 필드 값을 구조화된 객체로 파싱
 * "*"      → { type: "every" }
 * "1,3,5"  → { type: "specific", values: [1, 3, 5] }
 * "1-5"    → { type: "range", start: 1, end: 5 }
 * "* / 5"    → { type: "step", start: "*", step: 5 }
 * "1-10/2" → { type: "step", start: "1-10", step: 2 }
 */
export function parseFieldValue(value) {
  const type = detectFieldType(value);

  switch (type) {
    case FIELD_TYPES.EVERY:
      return { type };

    case FIELD_TYPES.SPECIFIC: {
      const values = value
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n));
      return { type, values };
    }

    case FIELD_TYPES.RANGE: {
      const [start, end] = value.split("-").map(Number);
      return { type, start, end };
    }

    case FIELD_TYPES.STEP: {
      const [base, step] = value.split("/");
      return { type, start: base, step: Number(step) };
    }

    default:
      return { type: FIELD_TYPES.EVERY };
  }
}

/**
 * 구조화된 객체 → 단일 필드 값 문자열로 빌드
 */
export function buildFieldValue(parsed) {
  switch (parsed.type) {
    case FIELD_TYPES.EVERY:
      return "*";

    case FIELD_TYPES.SPECIFIC:
      return (parsed.values || []).sort((a, b) => a - b).join(",");

    case FIELD_TYPES.RANGE:
      return `${parsed.start}-${parsed.end}`;

    case FIELD_TYPES.STEP:
      return `${parsed.start || "*"}/${parsed.step}`;

    default:
      return "*";
  }
}
