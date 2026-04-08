import { useState } from "react";

export default function ShareButton({ expression, validation }) {
  const [state, setState] = useState("idle"); // idle | copied | error

  const handleShare = async () => {
    if (!validation.valid) return;

    const url = new URL(window.location.href);
    url.searchParams.set("expr", expression);
    const shareUrl = url.toString();

    try {
      await navigator.clipboard.writeText(shareUrl);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      // clipboard API 실패 시 fallback
      try {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setState("copied");
        setTimeout(() => setState("idle"), 2000);
      } catch {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={!validation.valid}
      className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
        state === "copied"
          ? "bg-green-500/10 text-green-400 border border-green-500/30"
          : state === "error"
            ? "bg-red-500/10 text-red-400 border border-red-500/30"
            : validation.valid
              ? "bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 border border-transparent"
              : "bg-gray-800/50 text-gray-600 cursor-not-allowed border border-transparent"
      }`}
    >
      {state === "copied" ? (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          URL 복사됨!
        </>
      ) : state === "error" ? (
        <>복사 실패</>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          공유 URL 복사
        </>
      )}
    </button>
  );
}
