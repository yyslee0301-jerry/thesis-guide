"use client";
import { useState } from "react";
import { templates } from "@/lib/thesis-data";
import { ChevronRight } from "lucide-react";

export default function TemplatesPage() {
  const [active, setActive] = useState<string>(templates[0].id);
  const template = templates.find((t) => t.id === active)!;

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="bg-white border-b border-gray-100 px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">논문 템플릿</h1>
        <p className="text-gray-500">연구 방법에 따른 논문 구조를 확인하고 자신의 논문에 적용해보세요</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Tab selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 text-left p-4 rounded-2xl border transition-all ${
                active === t.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-100 hover:border-indigo-200 hover:shadow-sm"
              }`}
            >
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="font-bold text-sm">{t.title}</div>
              <div className={`text-xs mt-1 ${active === t.id ? "text-indigo-100" : "text-gray-400"}`}>
                {t.field}
              </div>
            </button>
          ))}
        </div>

        {/* Template detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
            <span className="text-4xl">{template.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{template.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{template.description}</p>
              <span className="inline-block mt-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">
                {template.field}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4">논문 구성 섹션</h3>
          <div className="space-y-3">
            {template.sections.map((sec, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex-shrink-0 w-7 h-7 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm">{sec.name}</div>
                  {sec.tip && (
                    <div className="flex items-center gap-1 mt-1">
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{sec.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips box */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-semibold text-amber-800 mb-1">이렇게 사용하세요</div>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                <li>이 구조를 기반으로 각 섹션의 분량 계획을 세워보세요</li>
                <li>지도교수님이나 투고 학술지의 형식 요구사항을 먼저 확인하세요</li>
                <li>섹션 순서와 이름은 학교/학회마다 다를 수 있어요</li>
                <li>글쓰기 순서는 보통 방법론 → 결과 → 논의 → 서론 → 초록 순으로 해요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
