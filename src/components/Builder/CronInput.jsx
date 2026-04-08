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
  const inputRef = useRef(null);

  // 외부에서 expression이 변경되면 (GUI 조작) localValue도 갱신
  useEffect(() => {
    setLocalValue(expression);
  }, [expression]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  // 커서 위치 기반으로 어떤 필드에 있는지 감지
  const handleSelect = () => {
    if (!inputRef.current) return;
    const pos = inputRef.current.selectionStart;
    const before = localValue.slice(0, pos);
    const spaceCount = (before.match(/ /g) || []).length;
    setActiveField(Math.min(spaceCount, 4));
  };

  const handleBlur = () => setActiveField(null);

  const fields = localValue.split(/\s+/);

  // 클립보드 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
      {/* 라벨 + 복사 버튼 */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-400">크론 표현식</label>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-400">복사됨</span>
            </>
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

      {/* 입력 필드 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onSelect={handleSelect}
          onBlur={handleBlur}
          className={`w-full bg-gray-950 border rounded-lg px-4 py-3 text-xl font-mono tracking-widest focus:outline-none focus:ring-1 transition-colors ${
            !validation.valid
              ? "border-red-500/50 text-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-700 text-blue-400 focus:border-blue-500 focus:ring-blue-500"
          }`}
          placeholder="* * * * *"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* 각 필드 레이블 (활성 필드 하이라이트) */}
      <div className="grid grid-cols-5 gap-2">
        {FIELD_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => {
              // 해당 필드 위치로 커서 이동
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
                ? "bg-blue-500/10 border border-blue-500/30"
                : "bg-gray-950 border border-transparent hover:border-gray-700"
            }`}
          >
            <span
              className={`text-sm font-mono block ${
                activeField === i ? "text-blue-400" : "text-gray-500"
              }`}
            >
              {fields[i] || "*"}
            </span>
            <span
              className={`text-[10px] block mt-0.5 ${
                activeField === i ? "text-blue-400/70" : "text-gray-600"
              }`}
            >
              {FIELD_LABELS[name]}
            </span>
          </button>
        ))}
      </div>

      {/* 자연어 설명 + 유효성 메시지 */}
      <div className="pt-1">
        {validation.valid ? (
          <div className="flex items-start gap-2">
            <span className="text-green-400 mt-0.5 shrink-0">✅</span>
            <p className="text-sm text-green-400/90">{description}</p>
          </div>
        ) : (
          <div className="space-y-1">
            {validation.errors.map((err, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5 shrink-0">❌</span>
                <p className="text-sm text-red-400/90">{err}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
