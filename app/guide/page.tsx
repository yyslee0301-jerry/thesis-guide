"use client";
import { useState } from "react";
import { guideSteps } from "@/lib/thesis-data";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  green: "bg-green-100 text-green-700 border-green-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

const dotColor: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState<string | null>(guideSteps[0].id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = guideSteps.find((s) => s.id === activeStep);

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <div className="bg-white border-b border-gray-100 px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">단계별 논문 작성 가이드</h1>
        <p className="text-gray-500">각 단계를 클릭하면 자세한 가이드를 확인할 수 있어요</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
        {/* Step list */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {guideSteps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id === activeStep ? null : step.id)}
                className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-colors border-b border-gray-50 last:border-0 ${
                  activeStep === step.id ? "bg-indigo-50" : "hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl">{step.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium">STEP {String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={`font-semibold text-sm ${activeStep === step.id ? "text-indigo-700" : "text-gray-800"}`}>
                    {step.title}
                  </div>
                </div>
                {activeStep === step.id ? (
                  <ChevronUp className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step detail */}
        <div className="flex-1 min-w-0">
          {activeData ? (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{activeData.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{activeData.title}</h2>
                </div>
                <p className="text-gray-500">{activeData.summary}</p>
              </div>

              {/* Sub-steps */}
              {activeData.steps.map((sub, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-0.5 ${dotColor[activeData.color]} flex items-center justify-center text-white text-xs font-bold`}>
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-gray-900">{sub.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 ml-9">{sub.content}</p>
                  {sub.example && (
                    <div className={`ml-9 rounded-xl border p-4 ${colorMap[activeData.color]}`}>
                      <div className="text-xs font-semibold mb-2 opacity-70 uppercase tracking-wide">예시</div>
                      <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{sub.example}</pre>
                    </div>
                  )}
                </div>
              ))}

              {/* Checklist */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">이 단계 체크리스트</h3>
                <div className="space-y-3">
                  {activeData.checklist.map((item, idx) => {
                    const key = `${activeData.id}-${idx}`;
                    return (
                      <button
                        key={key}
                        onClick={() => toggleCheck(key)}
                        className="w-full flex items-start gap-3 text-left group"
                      >
                        {checked[key] ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-gray-400" />
                        )}
                        <span className={`text-sm ${checked[key] ? "text-gray-400 line-through" : "text-gray-700"}`}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-4xl mb-4">👆</div>
              <p className="text-gray-500">왼쪽에서 단계를 선택하면 자세한 내용이 표시돼요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
