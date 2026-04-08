import { useState, useEffect, useRef } from "react";
import { FIELD_LABELS, FIELD_NAMES } from "../../constants/cronFields";

export default function CronInput({
  expression,
  validation,
  description,
  onChange,
}) {
  const [localValue, setLocalValue] = useState(expression);
  const [activeField, setActiveField] = useState(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(expression);
  }, [expression]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  const handleSelect = () => {
    if (!inputRef.current) return;
    const pos = inputRef.current.selectionStart;
    const before = localValue.slice(0, pos);
    const spaceCount = (before.match(/ /g) || []).length;
    setActiveField(Math.min(spaceCount, 4));
  };

  const handleBlur = () => setActiveField(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const fields = localValue.split(/\s+/);

  return (
    <div className="theme-card rounded-xl p-4 sm:p-6 space-y-4">
      {/* 라벨 + 복사 */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium theme-text-secondary">
          크론 표현식
        </label>
        <button
          onClick={handleCopy}
          className="text-xs theme-text-muted hover:theme-text-secondary transition-colors flex items-center gap-1"
        >
          {copied ? (
            <span style={{ color: "var(--accent-green)" }}>✓ 복사됨</span>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              복사
            </>
          )}
        </button>
      </div>

      {/* 입력 */}
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        onSelect={handleSelect}
        onBlur={handleBlur}
        className={`w-full rounded-lg px-4 py-3 text-lg sm:text-xl font-mono tracking-widest transition-colors theme-input ${
          !validation.valid ? "border-red-500/50 focus:border-red-500" : ""
        }`}
        style={
          !validation.valid
            ? { color: "var(--accent-red)" }
            : { color: "var(--accent-blue)" }
        }
        placeholder="* * * * *"
        spellCheck={false}
        autoComplete="off"
      />

      {/* 필드 레이블 */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {FIELD_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => {
              if (!inputRef.current) return;
              const parts = localValue.split(/\s+/);
              let pos = 0;
              for (let j = 0; j < i; j++) {
                pos += (parts[j] || "*").length + 1;
              }
              inputRef.current.focus();
              inputRef.current.setSelectionRange(
                pos,
                pos + (parts[i] || "*").length,
              );
              setActiveField(i);
            }}
            className={`text-center py-2 rounded-lg transition-all cursor-pointer ${
              activeField === i
                ? "theme-highlight"
                : "theme-toggle-inactive border border-transparent"
            }`}
          >
            <span
              className={`text-xs sm:text-sm font-mono block ${
                activeField === i ? "theme-accent-blue" : "theme-text-muted"
              }`}
            >
              {fields[i] || "*"}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] block mt-0.5 ${
                activeField === i ? "theme-accent-blue" : "theme-text-dim"
              }`}
            >
              {FIELD_LABELS[name].split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* 자연어 설명 */}
      <div className="pt-1">
        {validation.valid ? (
          <div className="flex items-start gap-2">
            <span
              className="mt-0.5 shrink-0"
              style={{ color: "var(--accent-green)" }}
            >
              ✅
            </span>
            <p className="text-sm" style={{ color: "var(--accent-green)" }}>
              {description}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {validation.errors.map((err, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--accent-red)" }}
                >
                  ❌
                </span>
                <p className="text-sm" style={{ color: "var(--accent-red)" }}>
                  {err}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
