import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, FileText, MessageSquare } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    href: "/guide",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "단계별 작성 가이드",
    desc: "주제 선정부터 최종 제출까지 5단계로 논문 쓰는 법을 배워요. 각 단계마다 구체적인 예시와 체크리스트를 제공해요.",
  },
  {
    icon: Lightbulb,
    href: "/expressions",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "학술 표현 사전",
    desc: "서론, 인용, 결과 제시, 논의까지 상황별 학술 표현을 바로 가져다 쓸 수 있어요.",
  },
  {
    icon: FileText,
    href: "/templates",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "논문 템플릿",
    desc: "실증 연구, 문헌 연구, 사례 연구 등 연구 방법별 논문 구조 템플릿을 확인하세요.",
  },
  {
    icon: MessageSquare,
    href: "/feedback",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "AI 피드백",
    desc: "작성한 단락이나 문장을 붙여 넣으면 Claude AI가 학술적 표현과 논리 구조에 대한 피드백을 드려요.",
  },
];

const steps = [
  { num: "01", title: "주제 선정", desc: "좁고 명확한 연구 질문 설정" },
  { num: "02", title: "문헌 검토", desc: "선행 연구 분석 & Gap 발견" },
  { num: "03", title: "논문 구조", desc: "섹션별 역할과 작성 순서" },
  { num: "04", title: "학술 글쓰기", desc: "학술 문체와 인용 방법" },
  { num: "05", title: "수정 & 제출", desc: "퇴고 전략과 제출 체크리스트" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">
            대학원생을 위한 논문 작성 가이드
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            논문, 어디서부터
            <br />
            시작해야 할지 모르겠죠?
          </h1>
          <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
            주제 선정부터 최종 제출까지, 논문 쓰는 법을 몰라도 괜찮아요.
            <br />
            단계별로 차근차근 안내해 드릴게요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guide"
              className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition flex items-center justify-center gap-2"
            >
              지금 시작하기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/feedback"
              className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition border border-white/20"
            >
              AI 피드백 받기
            </Link>
          </div>
        </div>
      </section>

      {/* Steps overview */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">논문 작성 5단계</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                  {s.num}
                </div>
                <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">무엇을 도와드릴 수 있나요?</h2>
          <p className="text-center text-gray-500 mb-12">논문 작성의 모든 과정을 함께해요</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.href}
                  href={f.href}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all card-hover border border-gray-100"
                >
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-indigo-600 text-sm font-medium">
                    바로 가기 <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-50 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">지금 바로 첫 단계부터 시작해요</h2>
          <p className="text-gray-500 mb-8">주제 선정, 문헌 검토, 논문 구조 — 하나씩 따라가면 할 수 있어요.</p>
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition"
          >
            단계별 가이드 시작 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-8 px-4 text-center text-sm text-gray-400">
        논문 가이드 — 대학원생을 위한 학술 논문 작성 도우미
      </footer>
    </div>
  );
}
