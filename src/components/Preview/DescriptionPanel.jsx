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
    <div className="theme-card rounded-xl p-5">
      <h3 className="text-sm font-semibold theme-text-secondary mb-4 flex items-center gap-2">
        <span>💬</span> 자연어 설명
      </h3>

      <div
        className={`rounded-lg p-3 mb-4 text-sm border ${
          validation.valid ? "theme-highlight" : "theme-error border-red-500/20"
        }`}
      >
        {validation.valid ? description : "유효하지 않은 크론 표현식입니다"}
      </div>

      {validation.valid && (
        <div className="space-y-2">
          {FIELD_NAMES.map((name, i) => {
            const fieldValue = fields[i] || "*";
            const fieldDesc = describeField(name, fieldValue);
            return (
              <div
                key={name}
                className="flex items-center gap-3 py-1.5 px-2 rounded-lg transition-colors"
                style={{ "--hover-bg": "var(--bg-hover)" }}
              >
                <span className="text-sm shrink-0">{FIELD_ICONS[name]}</span>
                <span className="text-xs theme-text-muted w-12 sm:w-20 shrink-0">
                  {FIELD_LABELS[name].split(" ")[0]}
                </span>
                <code className="text-xs font-mono theme-badge px-1.5 py-0.5 rounded w-14 text-center shrink-0">
                  {fieldValue}
                </code>
                <span className="text-xs theme-text-secondary">
                  {fieldDesc}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {validation.valid && (
        <div className="mt-4 pt-3 theme-border border-t">
          <p className="text-[11px] theme-text-dim">
            💡 읽는 순서:{" "}
            <span className="theme-text-muted">분 → 시 → 일 → 월 → 요일</span>
          </p>
        </div>
      )}
    </div>
  );
}
