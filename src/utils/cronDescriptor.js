import cronstrue from "cronstrue/i18n";

/**
 * 크론 표현식 → 한국어 자연어 설명
 * @param {string} expr - 크론 표현식
 * @returns {string}
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
