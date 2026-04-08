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
    <div className="theme-card rounded-xl p-5">
      <h3 className="text-sm font-semibold theme-text-secondary mb-4 flex items-center gap-2">
        <span>⚡</span> 프리셋 예제
      </h3>

      <div className="flex flex-wrap gap-1 mb-4">
        {PRESETS.map((group) => (
          <button
            key={group.category}
            onClick={() => setActiveCategory(group.category)}
            className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
              activeCategory === group.category
                ? "theme-tab-active"
                : "theme-tab-inactive"
            }`}
          >
            {group.category}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {activePreset?.items.map((preset) => {
          const isApplied = lastApplied === preset.expr;
          return (
            <button
              key={preset.expr}
              onClick={() => handleSelect(preset)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all border ${
                isApplied
                  ? "theme-success border-green-500/30"
                  : "theme-bg-primary border-transparent hover:theme-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${isApplied ? "" : "theme-text-primary"}`}
                >
                  {preset.label}
                </span>
                {isApplied ? (
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--accent-green)" }}
                  >
                    ✓ 적용됨
                  </span>
                ) : (
                  <code className="text-[10px] font-mono theme-accent-blue opacity-70">
                    {preset.expr}
                  </code>
                )}
              </div>
              <p className="text-[11px] theme-text-dim mt-0.5">{preset.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
