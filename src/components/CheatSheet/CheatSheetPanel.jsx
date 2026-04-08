import { useState } from "react";
import { CHEATSHEET, FIELD_ORDER_DIAGRAM } from "../../constants/cheatsheet";

export default function CheatSheetPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="theme-card rounded-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left rounded-xl transition-colors"
      >
        <h3 className="text-sm font-semibold theme-text-secondary flex items-center gap-2">
          <span>📖</span> 크론 치트시트
        </h3>
        <svg
          className={`w-4 h-4 theme-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-5">
          <FieldDiagram />
          <div className="flex flex-wrap gap-1">
            {CHEATSHEET.map((section, i) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(i)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                  activeSection === i
                    ? "theme-tab-active"
                    : "theme-tab-inactive"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
          <CheatSheetTable section={CHEATSHEET[activeSection]} />
        </div>
      )}
    </div>
  );
}

function FieldDiagram() {
  const colors = [
    "text-blue-400",
    "text-green-400",
    "text-yellow-400",
    "text-purple-400",
    "text-pink-400",
  ];
  return (
    <div className="theme-bg-primary rounded-lg p-4">
      <p className="text-[11px] theme-text-muted mb-3 text-center">
        크론 표현식 구조
      </p>
      <div className="flex items-center justify-center gap-1 font-mono text-sm">
        {colors.map((c, i) => (
          <span key={i}>
            <span className={c}>*</span>
            {i < 4 && <span className="theme-text-dim mx-0.5"> </span>}
          </span>
        ))}
      </div>
      <div className="flex items-start justify-center gap-1 mt-2">
        {FIELD_ORDER_DIAGRAM.map((field, i) => (
          <div
            key={field.label}
            className="flex flex-col items-center"
            style={{ width: "4.5rem" }}
          >
            <span className="theme-text-dim text-xs">│</span>
            <span className={`text-[10px] font-medium ${colors[i]}`}>
              {field.label}
            </span>
            <span className="text-[9px] theme-text-dim">{field.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheatSheetTable({ section }) {
  const hasExample = section.rows.some((r) => r.example);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="theme-border border-b">
            <th className="text-left py-2 pr-3 theme-text-muted font-medium">
              기호
            </th>
            <th className="text-left py-2 pr-3 theme-text-muted font-medium">
              의미
            </th>
            {hasExample && (
              <th className="text-left py-2 pr-3 theme-text-muted font-medium">
                예시
              </th>
            )}
            <th className="text-left py-2 theme-text-muted font-medium">
              설명
            </th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i} className="theme-border border-b border-opacity-50">
              <td className="py-2 pr-3">
                <code className="theme-badge font-mono px-1.5 py-0.5 rounded">
                  {row.symbol}
                </code>
              </td>
              <td className="py-2 pr-3 theme-text-secondary">{row.meaning}</td>
              {hasExample && (
                <td className="py-2 pr-3">
                  {row.example && (
                    <code className="font-mono text-[11px] theme-text-primary">
                      {row.example}
                    </code>
                  )}
                </td>
              )}
              <td className="py-2 theme-text-muted">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
