import { useState } from "react";
import { formatDate, formatInterval } from "../../utils/cronSchedule";

const COUNT_OPTIONS = [5, 10, 20];

export default function ExecutionPreview({ nextExecutions, validation }) {
  const [count, setCount] = useState(10);
  const displayed = nextExecutions.slice(0, count);

  return (
    <div className="theme-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold theme-text-secondary flex items-center gap-2">
          <span>📋</span> 다음 실행 시간
        </h3>
        <div className="flex gap-1 theme-bg-primary rounded-lg p-0.5">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                count === n ? "theme-tab-active" : "theme-tab-inactive"
              }`}
            >
              {n}회
            </button>
          ))}
        </div>
      </div>

      {!validation.valid && (
        <p className="text-sm theme-text-dim py-4 text-center">
          유효한 표현식을 입력하면 실행 시간이 표시됩니다
        </p>
      )}

      {validation.valid && displayed.length === 0 && (
        <p className="text-sm theme-text-dim py-4 text-center">
          실행 예정 시간을 계산할 수 없습니다
        </p>
      )}

      {validation.valid && displayed.length > 0 && (
        <div className="space-y-1 max-h-100 overflow-y-auto pr-1 custom-scrollbar">
          {displayed.map((date, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 sm:gap-3 py-2 px-2 sm:px-3 rounded-lg transition-colors ${
                i === 0 ? "theme-highlight" : ""
              }`}
            >
              <span
                className={`text-[11px] font-mono w-5 shrink-0 text-center ${
                  i === 0 ? "theme-accent-blue" : "theme-text-dim"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`text-[11px] sm:text-xs font-mono flex-1 ${
                  i === 0 ? "theme-accent-blue" : "theme-text-secondary"
                }`}
              >
                {formatDate(date)}
              </span>
              <span
                className={`text-[10px] shrink-0 hidden sm:inline ${
                  i === 0 ? "theme-accent-blue" : "theme-text-dim"
                }`}
              >
                {formatInterval(date)}
              </span>
            </div>
          ))}
        </div>
      )}

      {validation.valid && displayed.length > 0 && (
        <div className="mt-3 pt-3 theme-border border-t">
          <p className="text-[11px] theme-text-dim">
            ⏳ 다음 실행까지{" "}
            <span className="theme-accent-blue">
              {formatInterval(displayed[0])}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
