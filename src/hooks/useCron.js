import { useState, useMemo } from "react";
import { parseExpression, buildExpression } from "../utils/cronParser";
import { validateExpression } from "../utils/cronValidator";
import { getNextExecutions } from "../utils/cronSchedule";
import { describeExpression } from "../utils/cronDescriptor";
import { getExprFromUrl, useUrlSync } from "./useUrlSync";

export function useCron(initialExpr = "* * * * *") {
  // URL에 표현식이 있으면 그걸 초기값으로 사용
  const [expression, setExpression] = useState(() => {
    return getExprFromUrl() || initialExpr;
  });

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
    return getNextExecutions(expression, 20);
  }, [expression, validation.valid]);

  // URL 동기화
  useUrlSync(expression, validation);

  const setExpressionDirect = (expr) => {
    setExpression(expr);
  };

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
