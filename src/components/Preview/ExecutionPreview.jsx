import { useState } from "react";
import { formatDate, formatInterval } from "../../utils/cronSchedule";

const COUNT_OPTIONS = [5, 10, 20];

export default function ExecutionPreview({ nextExecutions, validation }) {
  const [count, setCount] = useState(10);

  const displayed = nextExecutions.slice(0, count);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <span>📋</span> 다음 실행 시간
        </h3>
        <div className="flex gap-1 bg-gray-950 rounded-lg p-0.5">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                count === n
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {n}회
            </button>
          ))}
        </div>
      </div>

      {/* 유효하지 않은 경우 */}
      {!validation.valid && (
        <p className="text-sm text-gray-600 py-4 text-center">
          유효한 표현식을 입력하면 실행 시간이 표시됩니다
        </p>
      )}

      {/* 실행 결과 없음 */}
      {validation.valid && displayed.length === 0 && (
        <p className="text-sm text-gray-600 py-4 text-center">
          실행 예정 시간을 계산할 수 없습니다
        </p>
      )}

      {/* 실행 시간 목록 */}
      {validation.valid && displayed.length > 0 && (
        <div className="space-y-1 max-h-100 overflow-y-auto pr-1 custom-scrollbar">
          {displayed.map((date, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                i === 0
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "hover:bg-gray-800/50"
              }`}
            >
              {/* 순번 */}
              <span
                className={`text-[11px] font-mono w-5 shrink-0 text-center ${
                  i === 0 ? "text-blue-400" : "text-gray-600"
                }`}
              >
                {i + 1}
              </span>

              {/* 날짜/시간 */}
              <span
                className={`text-xs font-mono flex-1 ${
                  i === 0 ? "text-blue-300" : "text-gray-400"
                }`}
              >
                {formatDate(date)}
              </span>

              {/* 상대 시간 */}
              <span
                className={`text-[11px] shrink-0 ${
                  i === 0 ? "text-blue-400/70" : "text-gray-600"
                }`}
              >
                {formatInterval(date)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 다음 실행까지 남은 시간 강조 */}
      {validation.valid && displayed.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <p className="text-[11px] text-gray-600">
            ⏳ 다음 실행까지{" "}
            <span className="text-blue-400">
              {formatInterval(displayed[0])}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
