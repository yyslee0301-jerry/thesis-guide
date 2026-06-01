"use client";
import { useState } from "react";
import { expressions } from "@/lib/thesis-data";
import { Copy, Check } from "lucide-react";

const categoryColor: Record<string, { bg: string; badge: string; dot: string }> = {
  "서론 표현": { bg: "bg-blue-50", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  "선행 연구 인용": { bg: "bg-purple-50", badge: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
  "결과 제시": { bg: "bg-green-50", badge: "bg-green-100 text-green-700", dot: "bg-green-400" },
  "논의 & 해석": { bg: "bg-orange-50", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  "접속 표현": { bg: "bg-gray-50", badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="ml-auto flex-shrink-0 p-1.5 rounded-lg hover:bg-white/80 text-gray-400 hover:text-gray-600 transition"
      title="복사"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function ExpressionsPage() {
  const [active, setActive] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = expressions.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.korean.includes(search) ||
        item.example.includes(search)
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="bg-white border-b border-gray-100 px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">학술 표현 사전</h1>
        <p className="text-gray-500 mb-6">상황별 학술 표현을 클릭하면 예시 문장과 함께 볼 수 있어요</p>
        <input
          type="text"
          placeholder="표현 검색 (예: 시사한다, 나타났다...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {filtered.map((cat) => {
          const colors = categoryColor[cat.category] ?? categoryColor["접속 표현"];
          return (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
                <h2 className="font-bold text-gray-800 text-lg">{cat.category}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                  {cat.items.length}개
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item, idx) => {
                  const key = `${cat.category}-${idx}`;
                  const isOpen = active === key;
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => setActive(isOpen ? null : key)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left"
                      >
                        <span className="font-semibold text-gray-800 text-sm flex-1">{item.korean}</span>
                        <span className="text-gray-400 text-xs">{isOpen ? "▲" : "▼"}</span>
                      </button>
                      {isOpen && (
                        <div className={`px-4 pb-4 ${colors.bg} border-t border-gray-100`}>
                          <div className="text-xs text-gray-500 font-semibold mt-3 mb-1.5 uppercase tracking-wide">예시 문장</div>
                          <div className="flex items-start gap-2">
                            <p className="text-sm text-gray-700 leading-relaxed flex-1">{item.example}</p>
                            <CopyButton text={item.example} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500">검색 결과가 없어요. 다른 키워드로 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
