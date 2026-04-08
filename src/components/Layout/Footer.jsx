export default function Footer() {
  return (
    <footer className="theme-border border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm theme-text-muted">
        <p>
          Made with 🥤 and 💙 by{" "}
          <a
            href="https://github.com/Dev-2A"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-accent-blue hover:underline transition-colors"
          >
            Dev-2A
          </a>
        </p>
        <p className="mt-1 theme-text-dim">
          "개발자가 자주 쓰지만 매번 헷갈리는 문법을 시각화하는 도구" 시리즈
        </p>
      </div>
    </footer>
  );
}
