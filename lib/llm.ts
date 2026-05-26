import Anthropic from "@anthropic-ai/sdk";

export type Tone = "sage" | "clay" | "neutral";

export interface IPOAnalysis {
  price_range: string;
  final_price: string;
  competition_ratio: string;
  lockup_ratio: string;
  market: string;
  sector: string;
  ai_evaluation: string;
  ai_tone: Tone;
  ai_detail: string;
}

const SYSTEM_PROMPT = `당신은 한국 IPO(공모주) 분석 전문가입니다. DART 전자공시 시스템에서 가져온 증권신고서 또는 투자설명서 원문을 분석하여, 일반 투자자에게 도움이 되는 정보를 추출합니다.

자본시장법 준수: "사세요", "팔세요", "추천합니다", "투자하세요" 같은 직접적인 투자 권유 표현은 금지. 단, 신고서에 기재된 객관적 사실(공모가 확정 위치, 수요예측 경쟁률, 의무보유확약 비율, 모집 규모 변경 등)을 시장 표준 기준에 따라 분류·표시하는 것은 정보 제공의 영역으로 허용됩니다. 객관적 사실 분류를 의견 표현으로 오해하지 마세요. 신고서에 명시된 숫자와 사실에 충실하세요.`;

const EXTRACTION_INSTRUCTIONS = `아래 신고서에서 다음 정보를 추출하여 JSON으로만 응답하세요. 마크다운 코드 블록(\`\`\`) 없이 순수 JSON만 출력하세요.

JSON 스키마:
{
  "price_range": "희망 공모가 밴드 (예: '19,000 ~ 21,500'). 못 찾으면 '정보 없음'",
  "final_price": "확정 공모가 (예: '21,500'). 미확정이면 '미확정'",
  "competition_ratio": "기관 수요예측 경쟁률 (예: '850.5:1'). 못 찾으면 '정보 없음'",
  "lockup_ratio": "기관 의무보유확약 비율 (예: '12.5%'). 못 찾으면 '정보 없음'",
  "market": "코스닥 / 코스피 / 기타 중 하나. 못 찾으면 '정보 없음'",
  "sector": "회사가 속한 산업 (예: '반도체', '바이오', '소비재', '플랫폼/IT'). 한 단어로",
  "ai_evaluation": "12자 이내. 신고서에서 확인된 가장 두드러진 사실 1개. 아래 톤 분류 기준에 부합하는 사실이면 그것을 우선",
  "ai_tone": "sage | clay | neutral 중 하나. 아래 분류 기준 참고",
  "ai_detail": "ai_evaluation 근거 2-3문장. 신고서에 명시된 구체 숫자/사실만 인용"
}

[ai_tone 분류 기준 — 의견이 아닌 시장 표준 사실 분류]

sage(흥행 신호): 다음 중 하나라도 신고서에서 명확히 확인되면 선택
- 확정공모가가 희망 공모가 밴드 상단 이상에서 결정
- 기관 수요예측 경쟁률 700:1 이상
- 기관 의무보유확약 비율 25% 이상

clay(위험 신호): 다음 중 하나라도 신고서에서 명확히 확인되면 선택
- 확정공모가가 희망 공모가 밴드 하단 이하에서 결정 (또는 밴드 미달)
- 기관 수요예측 경쟁률 100:1 미만
- 기관 의무보유확약 비율 10% 미만
- 정정 사유로 모집 규모 축소가 명시

neutral: 위 신호들이 신고서에서 확인되지 않을 때

[ai_evaluation 표현 예시 — 사실 위주]
sage 케이스: "공모가 상단 확정", "수요예측 950:1 흥행", "확약 비율 32% 견조"
clay 케이스: "공모가 하단 결정", "기관 수요 미달", "확약 비율 6% 낮음"
neutral 케이스: "공모가 결정 대기", "수요예측 단계", "초기 공모 단계"

금지 표현: "저평가 매력", "고평가 우려", "투자 매력적", "리스크 높음", "주가 상승 기대", "청약 권장" 같은 주관적 판단어/예측/권유

원칙:
- 데이터가 명확히 보일 때만 채우세요. 추측 금지
- 못 찾는 필드는 "정보 없음"
- 숫자는 천 단위 콤마 (예: 19,000)
- ai_tone은 위 기준에 명확히 부합하는 데이터가 신고서 텍스트 안에 있을 때만 sage/clay 선택. 그 외엔 neutral`;

export async function analyzeIPOFiling(corpName: string, filingText: string): Promise<IPOAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("환경변수 ANTHROPIC_API_KEY 없음");
  }

  const MAX_TEXT_LENGTH = 7000;
  const truncatedText = filingText.length > MAX_TEXT_LENGTH
    ? filingText.substring(0, MAX_TEXT_LENGTH)
    : filingText;

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `${EXTRACTION_INSTRUCTIONS}\n\n회사명: ${corpName}\n\n신고서 본문:\n${truncatedText}`,
      },
    ],
  });

  const responseText = message.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("")
    .trim();

  let jsonText = responseText;
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(jsonText) as IPOAnalysis;
  return parsed;
}