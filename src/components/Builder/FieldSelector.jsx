import { useState, useEffect } from "react";
import { FIELD_RANGES, FIELD_TYPES } from "../../constants/cronFields";
import { parseFieldValue, buildFieldValue } from "../../utils/cronParser";

export default function FieldSelector({ fieldName, label, value, onChange }) {
  const range = FIELD_RANGES[fieldName];
  const [parsed, setParsed] = useState(() => parseFieldValue(value));

  // 외부에서 value가 변경되면 (양방향 동기화) parsed도 갱신
  useEffect(() => {
    setParsed(parseFieldValue(value));
  }, [value]);

  // parsed가 변경되면 부모에게 문자열 값 전달
  const updateField = (newParsed) => {
    setParsed(newParsed);
    onChange(buildFieldValue(newParsed));
  };

  const handleTypeChange = (type) => {
    switch (type) {
      case FIELD_TYPES.EVERY:
        updateField({ type });
        break;
      case FIELD_TYPES.SPECIFIC:
        updateField({ type, values: [range.min] });
        break;
      case FIELD_TYPES.RANGE:
        updateField({
          type,
          start: range.min,
          end: Math.min(range.min + 5, range.max),
        });
        break;
      case FIELD_TYPES.STEP:
        updateField({
          type,
          start: "*",
          step: range.fieldName === "munute" ? 5 : 1,
        });
        break;
      default:
        updateField({ type: FIELD_TYPES.EVERY });
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      {/* 필드 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">{label}</h3>
        <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
          {value}
        </span>
      </div>

      {/* 타입 선택 탭 */}
      <div className="flex gap-1 mb-4 bg-gray-950 rounded-lg p-1">
        {Object.entries({
          [FIELD_TYPES.EVERY]: "매번",
          [FIELD_TYPES.SPECIFIC]: "특정 값",
          [FIELD_TYPES.RANGE]: "범위",
          [FIELD_TYPES.STEP]: "간격",
        }).map(([type, typeLabel]) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${
              parsed.type === type
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {typeLabel}
          </button>
        ))}
      </div>

      {/* 타입별 입력 UI */}
      <div className="min-h-15">
        {parsed.type === FIELD_TYPES.EVERY && (
          <p className="text-sm text-gray-500 py-2">
            모든 {range.label} 값에서 실행 (
            <code className="text-blue-400">*</code>)
          </p>
        )}

        {parsed.type === FIELD_TYPES.SPECIFIC && (
          <SpecificInput
            range={range}
            values={parsed.values || []}
            onChange={(values) => updateField({ ...parsed, values })}
          />
        )}

        {parsed.type === FIELD_TYPES.RANGE && (
          <RangeInput
            range={range}
            start={parsed.start ?? range.min}
            end={parsed.end ?? range.max}
            onChange={(start, end) => updateField({ ...parsed, start, end })}
          />
        )}

        {parsed.type === FIELD_TYPES.STEP && (
          <StepInput
            range={range}
            start={parsed.start ?? "*"}
            step={parsed.step ?? 1}
            onChange={(start, step) => updateField({ ...parsed, start, step })}
          />
        )}
      </div>
    </div>
  );
}

/* ─── 특정 값 선택 (토글 버튼 그리드) ─── */
function SpecificInput({ range, values, onChange }) {
  const allValues = Array.from(
    { length: range.max - range.min + 1 },
    (_, i) => range.min + i,
  );

  const toggle = (num) => {
    if (values.includes(num)) {
      const next = values.filter((v) => v !== num);
      onChange(next.length > 0 ? next : [range.min]);
    } else {
      onChange([...values, num]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {allValues.map((num) => (
        <button
          key={num}
          onClick={() => toggle(num)}
          className={`w-9 h-8 text-xs rounded-md font-mono transition-colors ${
            values.includes(num)
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700"
          }`}
        >
          {String(num).padStart(2, "0")}
        </button>
      ))}
    </div>
  );
}

/* ─── 범위 선택 (start ~ end) ─── */
function RangeInput({ range, start, end, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <label className="text-xs text-gray-500 mb-1 block">시작</label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={start}
          onChange={(e) => onChange(Number(e.target.value), end)}
          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-blue-500"
        />
      </div>
      <span className="text-gray-600 mt-5">~</span>
      <div className="flex-1">
        <label className="text-xs text-gray-500 mb-1 block">종료</label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={end}
          onChange={(e) => onChange(start, Number(e.target.value))}
          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}

/* ─── 간격 선택 (* /5, 1-10/2) ─── */
function StepInput({ range, start, step, onChange }) {
  const isAll = start === "*";

  return (
    <div className="space-y-3">
      {/* 시작점 토글 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(isAll ? String(range.min) : "*", step)}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${
            isAll
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-500 hover:text-gray-300"
          }`}
        >
          처음부터
        </button>
        <button
          onClick={() => onChange(isAll ? String(range.min) : "*", step)}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${
            !isAll
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-500 hover:text-gray-300"
          }`}
        >
          시작값 지정
        </button>
      </div>

      <div className="flex items-center gap-3">
        {!isAll && (
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">시작값</label>
            <input
              type="number"
              min={range.min}
              max={range.max}
              value={Number(start) || range.min}
              onChange={(e) => onChange(e.target.value, step)}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">
            매 {step}
            {range.label}마다
          </label>
          <input
            type="number"
            min={1}
            max={range.max}
            value={step}
            onChange={(e) => onChange(start, Number(e.target.value))}
            className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
