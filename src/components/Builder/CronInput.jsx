import { FIELD_LABELS, FIELD_NAMES } from "../../constants/cronFields";

export default function CronInput({ expression, onChange }) {
  const fields = expression.split(" ");

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      {/* 전체 표현식 입력 */}
      <label className="block text-sm font-medium text-gray-400 mb-2">
        크론 표현식
      </label>
      <input
        type="text"
        value={expression}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-lg font-mono text-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        placeholder="* * * * *"
        spellCheck={false}
      />

      {/* 각 필드 레이블 */}
      <div className="grid grid-cols-5 gap-2 mt-3">
        {FIELD_NAMES.map((name, i) => (
          <div key={name} className="text-center">
            <span className="text-xs text-gray-600 font-mono">
              {fields[i] || "*"}
            </span>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {FIELD_LABELS[name]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
