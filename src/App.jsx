import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CronInput from "./components/Builder/CronInput";
import CronBuilder from "./components/Builder/CronBuilder";
import DescriptionPanel from "./components/Preview/DescriptionPanel";
import ExecutionPreview from "./components/Preview/ExecutionPreview";
import PresetPanel from "./components/Preset/PresetPanel";
import { useCron } from "./hooks/useCron";

function App() {
  const cron = useCron("0 9 * * 1");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* 크론 표현식 입력 */}
        <CronInput
          expression={cron.expression}
          validation={cron.validation}
          description={cron.description}
          onChange={cron.setExpression}
        />

        {/* 메인 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* 왼쪽: GUI 빌더 */}
          <div className="lg:col-span-2">
            <CronBuilder fields={cron.fields} onFieldChange={cron.setField} />
          </div>

          {/* 오른쪽: 설명 + 미리보기 + 프리셋 */}
          <div className="space-y-4">
            <DescriptionPanel
              expression={cron.expression}
              description={cron.description}
              validation={cron.validation}
            />
            <ExecutionPreview
              nextExecutions={cron.nextExecutions}
              validation={cron.validation}
            />
            <PresetPanel onSelect={cron.setExpression} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
