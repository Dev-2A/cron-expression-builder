import { useState } from "react";
import { CHEATSHEET, FIELD_ORDER_DIAGRAM } from "../../constants/cheatsheet";

export default function CheatSheetPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      {/* 토글 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/30 transition-colors rounded-xl"
      >
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <span>📖</span> 크론 치트시트
        </h3>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {/* 접히는 본문 */}
      {isOpen && (
        <div className="px-5 pb-5 space-y-5">
          {/* 필드 순서 다이어그램 */}
          <FieldDiagram />

          {/* 섹션 탭 */}
          <div className="flex flex-wrap gap-1">
            {CHEATSHEET.map((section, i) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(i)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                  activeSection === i
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-500 hover:text-gray-300"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* 활성 섹션 테이블 */}
          <CheatSheetTable section={CHEATSHEET[activeSection]} />
        </div>
      )}
    </div>
  );
}

/* ─── 필드 순서 다이어그램 ─── */
function FieldDiagram() {
  return (
    <div className="bg-gray-950 rounded-lg p-4">
      <p className="text-[11px] text-gray-500 mb-3 text-center">
        크론 표현식 구조
      </p>
      <div className="flex items-center justify-center gap-1 font-mono text-sm">
        <span className="text-blue-400">*</span>
        <span className="text-gray-700 mx-0.5"> </span>
        <span className="text-green-400">*</span>
        <span className="text-gray-700 mx-0.5"> </span>
        <span className="text-yellow-400">*</span>
        <span className="text-gray-700 mx-0.5"> </span>
        <span className="text-purple-400">*</span>
        <span className="text-gray-700 mx-0.5"> </span>
        <span className="text-pink-400">*</span>
      </div>
      <div className="flex items-start justify-center gap-1 mt-2">
        {FIELD_ORDER_DIAGRAM.map((field, i) => {
          const colors = [
            "text-blue-400",
            "text-green-400",
            "text-yellow-400",
            "text-purple-400",
            "text-pink-400",
          ];
          return (
            <div
              key={field.label}
              className="flex flex-col items-center"
              style={{ width: "4.5rem" }}
            >
              <span className="text-gray-700 text-xs">│</span>
              <span className={`text-[10px] font-medium ${colors[i]}`}>
                {field.label}
              </span>
              <span className="text-[9px] text-gray-600">{field.range}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── 치트시트 테이블 ─── */
function CheatSheetTable({ section }) {
  const hasExample = section.rows.some((r) => r.example);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-2 pr-3 text-gray-500 font-medium">
              기호
            </th>
            <th className="text-left py-2 pr-3 text-gray-500 font-medium">
              의미
            </th>
            {hasExample && (
              <th className="text-left py-2 pr-3 text-gray-500 font-medium">
                예시
              </th>
            )}
            <th className="text-left py-2 text-gray-500 font-medium">설명</th>
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
            >
              <td className="py-2 pr-3">
                <code className="text-blue-400 font-mono bg-blue-400/10 px-1.5 py-0.5 rounded">
                  {row.symbol}
                </code>
              </td>
              <td className="py-2 pr-3 text-gray-400">{row.meaning}</td>
              {hasExample && (
                <td className="py-2 pr-3">
                  {row.example && (
                    <code className="text-gray-300 font-mono text-[11px]">
                      {row.example}
                    </code>
                  )}
                </td>
              )}
              <td className="py-2 text-gray-500">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
