import { NextResponse } from "next/server";

interface DartGroup {
  title?: string;
  list?: Record<string, string>[];
}

interface DartDetailResponse {
  status: string;
  message: string;
  group?: DartGroup[];
}

export async function GET(request: Request) {
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: "환경변수 DART_API_KEY 없음" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const corpCode = url.searchParams.get("corp_code");

  if (!corpCode) {
    return NextResponse.json(
      {
        success: false,
        message: "corp_code 파라미터가 필요합니다. 예: /api/ipo/detail?corp_code=01755259",
      },
      { status: 400 }
    );
  }

  try {
    const today = new Date();
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(today.getDate() - 90);

    const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");

    const apiUrl = `https://opendart.fss.or.kr/api/estkRs.json?crtfc_key=${apiKey}&corp_code=${corpCode}&bgn_de=${fmt(ninetyDaysAgo)}&end_de=${fmt(today)}`;

    const response = await fetch(apiUrl);
    const data: DartDetailResponse = await response.json();

    if (data.status !== "000") {
      return NextResponse.json({
        success: false,
        message: `DART API 에러. status: ${data.status}, message: ${data.message}`,
      });
    }

    // group을 title 기준으로 정리
    const grouped: Record<string, Record<string, string>[]> = {};
    for (const g of data.group ?? []) {
      if (g.title) {
        grouped[g.title] = g.list ?? [];
      }
    }

    return NextResponse.json({
      success: true,
      corp_code: corpCode,
      group_titles: Object.keys(grouped),
      data: grouped,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "API 호출 실패", detail: String(error) },
      { status: 500 }
    );
  }
}