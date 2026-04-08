import { FIELD_NAMES, FIELD_RANGES } from "../constants/cronFields";

/**
 * 단일 필드 값 유효성 검증
 * @returns {{ valid: boolean, error?: string }}
 */
function validateField(fieldName, value) {
  const range = FIELD_RANGES[fieldName];
  if (!range) return { valid: false, error: `알 수 없는 필드: ${fieldName}` };

  // 모든 값 (*)
  if (value === "*") return { valid: true };

  // 스텝 (* /5, 1-10/2)
  if (value.includes("/")) {
    const [base, stepStr] = value.split("/");
    const step = Number(stepStr);

    if (isNaN(step) || step < 1) {
      return {
        valid: false,
        error: `${range.label}: 스텝 값이 올바르지 않습니다`,
      };
    }

    if (base !== "*") {
      // "1-10/2" 형태
      if (base.includes("-")) {
        const rangeResult = validateRange(fieldName, base, range);
        if (!rangeResult.valid) return rangeResult;
      } else {
        const num = Number(base);
        if (isNaN(num) || num < range.min || num > range.max) {
          return {
            valid: false,
            error: `${range.label}: 시작값이 ${range.min}~${range.max} 범위를 벗어났습니다`,
          };
        }
      }
    }

    return { valid: true };
  }

  // 범위 (1-5)
  if (value.includes("-") && !value.includes(",")) {
    return validateRange(fieldName, value, range);
  }

  // 특정 값 (1,3,5 또는 단일 숫자)
  const parts = value.split(",");
  for (const part of parts) {
    const num = Number(part.trim());
    if (isNaN(num) || num < range.min || num > range.max) {
      return {
        valid: false,
        error: `${range.label}: ${part.trim()} 값이 ${range.min}~${range.max} 범위를 벗어났습니다`,
      };
    }
  }

  return { valid: true };
}

function validateRange(fieldName, value, range) {
  const [startStr, endStr] = value.split("-");
  const start = Number(startStr);
  const end = Number(endStr);

  if (isNaN(start) || isNaN(end)) {
    return { valid: false, error: `${range.label}: 범위 값이 숫자가 아닙니다` };
  }
  if (
    start < range.min ||
    start > range.max ||
    end < range.min ||
    end > range.max
  ) {
    return {
      valid: false,
      error: `${range.label}: ${range.min}~${range.max} 범위를 벗어났습니다`,
    };
  }
  if (start > end) {
    return {
      valid: false,
      error: `${range.label}: 시작값이 종료값보다 큽니다`,
    };
  }

  return { valid: true };
}

/**
 * 전체 크론 표현식 유효성 검증
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateExpression(expr) {
  const parts = expr.trim().split(/\s+/);
  const errors = [];

  if (parts.length !== 5) {
    return {
      valid: false,
      errors: [
        `크론 표현식은 공백으로 구분된 5개의 필드가 필요합니다 (현재 ${parts.length}개)`,
      ],
    };
  }

  FIELD_NAMES.forEach((name, i) => {
    const result = validateField(name, parts[i]);
    if (!result.valid) {
      errors.push(result.error);
    }
  });

  return { valid: errors.length === 0, errors };
}
