export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        <p>
          Made with 🥤 and 💙 by{" "}
          <a
            href="https://github.com/Dev-2A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Dev-2A
          </a>
        </p>
        <p className="mt-1 text-gray-700">
          "개발자가 자주 쓰지만 매번 헷갈리는 문법을 시각화하는 도구" 시리즈
        </p>
      </div>
    </footer>
  );
}
