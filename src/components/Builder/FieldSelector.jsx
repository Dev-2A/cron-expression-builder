import { useState, useEffect } from "react";
import {
  FIELD_RANGES,
  FIELD_TYPES,
  MONTH_NAMES,
  DAY_NAMES,
} from "../../constants/cronFields";
import { parseFieldValue, buildFieldValue } from "../../utils/cronParser";

function getDisplayLabel(fieldName, num) {
  if (fieldName === "month") return MONTH_NAMES[num] || String(num);
  if (fieldName === "dayOfWeek") return DAY_NAMES[num] || String(num);
  return String(num).padStart(2, "0");
}

export default function FieldSelector({ fieldName, label, value, onChange }) {
  const range = FIELD_RANGES[fieldName];
  const [parsed, setParsed] = useState(() => parseFieldValue(value));

  useEffect(() => {
    setParsed(parseFieldValue(value));
  }, [value]);

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
      case FIELD_TYPES.STEP: {
        const defaultStep =
          fieldName === "minute" ? 5 : fieldName === "hour" ? 2 : 1;
        updateField({ type, start: "*", step: defaultStep });
        break;
      }
      default:
        updateField({ type: FIELD_TYPES.EVERY });
    }
  };

  return (
    <div className="theme-card rounded-xl p-4 sm:p-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold theme-text-secondary">{label}</h3>
        <span className="text-xs font-mono theme-badge px-2 py-0.5 rounded">
          {value}
        </span>
      </div>

      {/* 타입 탭 */}
      <div className="flex gap-1 mb-4 theme-bg-primary rounded-lg p-1">
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
              parsed.type === type ? "theme-tab-active" : "theme-tab-inactive"
            }`}
          >
            {typeLabel}
          </button>
        ))}
      </div>

      {/* 타입별 UI */}
      <div className="min-h-15">
        {parsed.type === FIELD_TYPES.EVERY && (
          <p className="text-sm theme-text-muted py-2">
            모든 {range.label} 값에서 실행 (
            <code className="theme-accent-blue">*</code>)
          </p>
        )}

        {parsed.type === FIELD_TYPES.SPECIFIC && (
          <SpecificInput
            fieldName={fieldName}
            range={range}
            values={parsed.values || []}
            onChange={(values) => updateField({ ...parsed, values })}
          />
        )}

        {parsed.type === FIELD_TYPES.RANGE && (
          <RangeInput
            fieldName={fieldName}
            range={range}
            start={parsed.start ?? range.min}
            end={parsed.end ?? range.max}
            onChange={(s, e) => updateField({ ...parsed, start: s, end: e })}
          />
        )}

        {parsed.type === FIELD_TYPES.STEP && (
          <StepInput
            range={range}
            start={parsed.start ?? "*"}
            step={parsed.step ?? 1}
            onChange={(s, st) => updateField({ ...parsed, start: s, step: st })}
          />
        )}
      </div>
    </div>
  );
}

function SpecificInput({ fieldName, range, values, onChange }) {
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
  const isWide = fieldName === "month" || fieldName === "dayOfWeek";

  return (
    <div className={`flex flex-wrap gap-1.5 ${isWide ? "gap-2" : ""}`}>
      {allValues.map((num) => (
        <button
          key={num}
          onClick={() => toggle(num)}
          className={`h-8 text-xs rounded-md font-mono transition-colors ${
            isWide ? "px-3 min-w-12" : "w-9"
          } ${values.includes(num) ? "theme-toggle-active" : "theme-toggle-inactive"}`}
        >
          {getDisplayLabel(fieldName, num)}
        </button>
      ))}
    </div>
  );
}

function RangeInput({ fieldName, range, start, end, onChange }) {
  const useSelect = fieldName === "month" || fieldName === "dayOfWeek";
  const allValues = Array.from(
    { length: range.max - range.min + 1 },
    (_, i) => range.min + i,
  );

  if (useSelect) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs theme-text-muted mb-1 block">시작</label>
          <select
            value={start}
            onChange={(e) => onChange(Number(e.target.value), end)}
            className="w-full rounded-lg px-3 py-2 text-sm theme-input"
          >
            {allValues.map((num) => (
              <option key={num} value={num}>
                {getDisplayLabel(fieldName, num)}
              </option>
            ))}
          </select>
        </div>
        <span className="theme-text-dim mt-5">~</span>
        <div className="flex-1">
          <label className="text-xs theme-text-muted mb-1 block">종료</label>
          <select
            value={end}
            onChange={(e) => onChange(start, Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 text-sm theme-input"
          >
            {allValues.map((num) => (
              <option key={num} value={num}>
                {getDisplayLabel(fieldName, num)}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <label className="text-xs theme-text-muted mb-1 block">시작</label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={start}
          onChange={(e) => onChange(Number(e.target.value), end)}
          className="w-full rounded-lg px-3 py-2 text-sm font-mono theme-input"
        />
      </div>
      <span className="theme-text-dim mt-5">~</span>
      <div className="flex-1">
        <label className="text-xs theme-text-muted mb-1 block">종료</label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={end}
          onChange={(e) => onChange(start, Number(e.target.value))}
          className="w-full rounded-lg px-3 py-2 text-sm font-mono theme-input"
        />
      </div>
    </div>
  );
}

function StepInput({ range, start, step, onChange }) {
  const isAll = start === "*";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange("*", step)}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${isAll ? "theme-toggle-active" : "theme-toggle-inactive"}`}
        >
          처음부터
        </button>
        <button
          onClick={() => onChange(String(range.min), step)}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${!isAll ? "theme-toggle-active" : "theme-toggle-inactive"}`}
        >
          시작값 지정
        </button>
      </div>
      <div className="flex items-center gap-3">
        {!isAll && (
          <div className="flex-1">
            <label className="text-xs theme-text-muted mb-1 block">
              시작값
            </label>
            <input
              type="number"
              min={range.min}
              max={range.max}
              value={Number(start) || range.min}
              onChange={(e) => onChange(e.target.value, step)}
              className="w-full rounded-lg px-3 py-2 text-sm font-mono theme-input"
            />
          </div>
        )}
        <div className="flex-1">
          <label className="text-xs theme-text-muted mb-1 block">
            매 {step}
            {range.label}마다
          </label>
          <input
            type="number"
            min={1}
            max={range.max}
            value={step}
            onChange={(e) => onChange(start, Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 text-sm font-mono theme-input"
          />
        </div>
      </div>
    </div>
  );
}
