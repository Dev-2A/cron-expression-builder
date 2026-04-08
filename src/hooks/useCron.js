import { useState, useMemo } from "react";
import { parseExpression, buildExpression } from "../utils/cronParser";
import { validateExpression } from "../utils/cronValidator";
import { getNextExecutions } from "../utils/cronSchedule";
import { describeExpression } from "../utils/cronDescriptor";

export function useCron(initialExpr = "* * * * *") {
  const [expression, setExpression] = useState(initialExpr);

  const fields = useMemo(() => parseExpression(expression), [expression]);

  const validation = useMemo(
    () => validateExpression(expression),
    [expression],
  );

  const description = useMemo(() => {
    if (!validation.valid) return "유효하지 않은 크론 표현식입니다";
    return describeExpression(expression);
  }, [expression, validation.valid]);

  const nextExecutions = useMemo(() => {
    if (!validation.valid) return [];
    return getNextExecutions(expression, 10);
  }, [expression, validation.valid]);

  /** 전체 표현식을 직접 변경 */
  const setExpressionDirect = (expr) => {
    setExpression(expr);
  };

  /** 개별 필드를 변경하면 전체 표현식 재조합 */
  const setField = (fieldName, value) => {
    const newFields = { ...fields, [fieldName]: value };
    setExpression(buildExpression(newFields));
  };

  return {
    expression,
    fields,
    validation,
    description,
    nextExecutions,
    setExpression: setExpressionDirect,
    setField,
  };
}
