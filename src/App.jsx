import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import CronInput from "./components/Builder/CronInput";
import CronBuilder from "./components/Builder/CronBuilder";
import DescriptionPanel from "./components/Preview/DescriptionPanel";
import ExecutionPreview from "./components/Preview/ExecutionPreview";
import PresetPanel from "./components/Preset/PresetPanel";
import CheatSheetPanel from "./components/CheatSheet/CheatSheetPanel";
import { useCron } from "./hooks/useCron";
import { useTheme } from "./hooks/useTheme";

function App() {
  const cron = useCron("0 9 * * 1");
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col transition-colors"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <Header
        expression={cron.expression}
        validation={cron.validation}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 sm:py-8">
        <CronInput
          expression={cron.expression}
          validation={cron.validation}
          description={cron.description}
          onChange={cron.setExpression}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="lg:col-span-2 space-y-4">
            <CronBuilder fields={cron.fields} onFieldChange={cron.setField} />
            <CheatSheetPanel />
          </div>

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
