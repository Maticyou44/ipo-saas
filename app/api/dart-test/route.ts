import { NextResponse } from "next/server";

interface DartListItem {
  corp_name: string;
  report_nm: string;
  rcept_dt: string;
  rcept_no: string;
  stock_code?: string;
}

interface DartListResponse {
  status: string;
  message: string;
  total_count?: number;
  list?: DartListItem[];
}

export async function GET() {
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        message: "환경변수 DART_API_KEY가 설정되지 않았습니다. .env.local 파일을 확인하고 개발 서버를 재시작하세요.",
      },
      { status: 500 }
    );
  }

  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const fmt = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, "");

    const url = `https://opendart.fss.or.kr/api/list.json?crtfc_key=${apiKey}&bgn_de=${fmt(thirtyDaysAgo)}&end_de=${fmt(today)}&pblntf_detail_ty=C001&page_count=20`;

    const response = await fetch(url);
    const data: DartListResponse = await response.json();

    if (data.status === "000") {
      return NextResponse.json({
        success: true,
        message: `최근 30일 증권신고서(지분증권) 총 ${data.total_count}건 중 ${(data.list ?? []).length}건 표시`,
        list: (data.list ?? []).map((item) => ({
          회사명: item.corp_name,
          종목코드: item.stock_code && item.stock_code.trim() !== "" ? item.stock_code : "(비상장)",
          공시명: item.report_nm,
          접수번호: item.rcept_no,
          접수일자: item.rcept_dt,
        })),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `DART API 응답 에러. status: ${data.status}, message: ${data.message}`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "API 호출 자체 실패",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}