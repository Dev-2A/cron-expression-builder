import { FIELD_NAMES, FIELD_LABELS } from "../../constants/cronFields";
import { describeField } from "../../utils/cronDescriptor";

const FIELD_ICONS = {
  minute: "⏱️",
  hour: "🕐",
  dayOfMonth: "📅",
  month: "🗓️",
  dayOfWeek: "📆",
};

export default function DescriptionPanel({
  expression,
  description,
  validation,
}) {
  const fields = expression.trim().split(/\s+/);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <span>💬</span> 자연어 설명
      </h3>

      {/* 전체 요약 */}
      <div
        className={`rounded-lg p-3 mb-4 text-sm ${
          validation.valid
            ? "bg-blue-500/10 border border-blue-500/20 text-blue-300"
            : "bg-red-500/10 border border-red-500/20 text-red-300"
        }`}
      >
        {validation.valid ? description : "유효하지 않은 크론 표현식입니다"}
      </div>

      {/* 필드별 분해 설명 */}
      {validation.valid && (
        <div className="space-y-2">
          {FIELD_NAMES.map((name, i) => {
            const fieldValue = fields[i] || "*";
            const fieldDesc = describeField(name, fieldValue);

            return (
              <div
                key={name}
                className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-sm shrink-0">{FIELD_ICONS[name]}</span>
                <span className="text-xs text-gray-500 w-20 shrink-0">
                  {FIELD_LABELS[name].split(" ")[0]}
                </span>
                <code className="text-xs font-mono text-blue-400 bg-gray-950 px-1.5 py-0.5 rounded w-14 text-center shrink-0">
                  {fieldValue}
                </code>
                <span className="text-xs text-gray-400">{fieldDesc}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* 표현식 읽는 순서 팁 */}
      {validation.valid && (
        <div className="mt-4 pt-3 border-t border-gray-800">
          <p className="text-[11px] text-gray-600 leading-relaxed">
            💡 읽는 순서:{" "}
            <span className="text-gray-500">분 → 시 → 일 → 월 → 요일</span>
          </p>
        </div>
      )}
    </div>
  );
}
