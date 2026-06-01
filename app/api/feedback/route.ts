import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { text, section } = await req.json();

  if (!text || text.trim().length < 10) {
    return NextResponse.json({ error: "텍스트를 입력해주세요." }, { status: 400 });
  }

  const systemPrompt = `당신은 대학원생의 학술 논문 작성을 도와주는 전문 멘토입니다.
논문을 아직 써본 적 없는 초보 대학원생을 대상으로, 친절하고 구체적인 피드백을 제공합니다.

피드백은 다음 항목으로 구성하세요:
1. **전반적인 평가** (2-3문장으로 긍정적인 부분 먼저)
2. **개선이 필요한 부분** (구체적으로 2-4가지)
3. **수정 예시** (원문의 일부를 더 학술적으로 바꾸는 예시 1-2개)
4. **한 줄 격려**

한국어로 답변하고, 위압적이지 않게 격려하는 톤을 유지하세요.
학술 논문 특유의 표현법, 논리 구조, 인용 방식에 초점을 맞춰주세요.`;

  const userPrompt = `아래는 대학원생이 작성한 논문의 ${section || "일부"} 내용입니다. 피드백을 부탁드립니다.

---
${text}
---`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    return NextResponse.json({ feedback: content.text });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json({ error: "AI 피드백을 가져오는 데 실패했습니다." }, { status: 500 });
  }
}
