import { useState } from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CronInput from "./components/Builder/CronInput";

function App() {
  const [expression, setExpression] = useState("* * * * *");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* 크론 표현식 입력 */}
        <CronInput expression={expression} onChange={setExpression} />

        {/* 이후 단계에서 채울 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* 왼쪽: GUI 빌더 (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-gray-500 text-sm">
              🔧 GUI 빌더 영역 (Step 4~5에서 구현)
            </div>
          </div>

          {/* 오른쪽: 미리보기 + 프리셋 (1/3) */}
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-gray-500 text-sm">
              📋 실행 시간 미리보기 (Step 8에서 구현)
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 text-gray-500 text-sm">
              ⚡ 프리셋 (Step 9에서 구현)
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
