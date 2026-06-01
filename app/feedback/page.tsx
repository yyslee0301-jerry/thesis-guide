"use client";
import { useState } from "react";
import { Send, Loader2, AlertCircle, Sparkles } from "lucide-react";

const sections = ["서론", "이론적 배경", "연구 방법", "연구 결과", "논의", "결론", "초록", "기타"];

export default function FeedbackPage() {
  const [text, setText] = useState("");
  const [section, setSection] = useState("서론");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!text.trim() || text.trim().length < 20) {
      setError("최소 20자 이상 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, section }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFeedback(data.feedback);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="bg-white border-b border-gray-100 px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 논문 피드백</h1>
        <p className="text-gray-500">작성한 내용을 붙여 넣으면 Claude AI가 학술적 표현과 논리에 대한 피드백을 드려요</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Section selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">어떤 섹션인가요?</label>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  section === s
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Text input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            논문 내용을 여기에 붙여 넣어주세요
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`여기에 ${section} 내용을 붙여 넣어주세요...\n\n예시: 본 연구는 비대면 수업이 대학원생의 학업 자기효능감에 미치는 영향을 분석하고자 한다. 코로나19 이후 교육 환경이 빠르게 변화함에 따라...`}
            rows={10}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">{text.length}자 입력됨</span>
            <button
              onClick={submit}
              disabled={loading || !text.trim()}
              className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  피드백 받기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Feedback result */}
        {feedback && (
          <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <h2 className="font-bold text-gray-900">AI 피드백 결과</h2>
              <span className="ml-auto text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                {section}
              </span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap prose-academic">
              {feedback}
            </div>
          </div>
        )}

        {/* Info box */}
        {!feedback && !loading && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="font-semibold text-blue-800 mb-2 text-sm">이런 피드백을 받을 수 있어요</div>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>학술적 문체가 적절한지</li>
              <li>논리 흐름이 자연스러운지</li>
              <li>더 학술적인 표현으로 바꾸는 예시</li>
              <li>개선할 수 있는 구체적인 부분</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
