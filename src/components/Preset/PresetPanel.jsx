import { useState } from "react";
import { PRESETS } from "../../constants/presets";

export default function PresetPanel({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState(PRESETS[0].category);
  const [lastApplied, setLastApplied] = useState(null);

  const activePreset = PRESETS.find((p) => p.category === activeCategory);

  const handleSelect = (preset) => {
    onSelect(preset.expr);
    setLastApplied(preset.expr);
    setTimeout(() => setLastApplied(null), 1200);
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <span>⚡</span> 프리셋 예제
      </h3>

      {/* 카테고리 탭 */}
      <div className="flex flex-wrap gap-1 mb-4">
        {PRESETS.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
              activeCategory === group.category
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-500 hover:text-gray-300"
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      {/* 프리셋 목록 */}
      <div className="space-y-1.5">
        {activePreset?.items.map((preset) => {
          const isApplied = lastApplied === preset.expr;

          return (
            <button
              key={preset.expr}
              onClick={() => handleSelect(preset)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                isApplied
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-gray-950 border border-transparent hover:border-gray-700 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${
                    isApplied ? "text-green-400" : "text-gray-300"
                  }`}
                >
                  {preset.label}
                </span>
                {isApplied ? (
                  <span className="text-[10px] text-green-400">✓ 적용됨</span>
                ) : (
                  <code className="text-[10px] font-mono text-blue-400/70">
                    {preset.expr}
                  </code>
                )}
              </div>
              <p className="text-[11px] text-gray-600 mt-0.5">{preset.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
