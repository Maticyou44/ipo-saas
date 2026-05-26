import JSZip from "jszip";
import { NextResponse } from "next/server";

function fmtDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function cleanXmlToText(xml: string): string {
  return xml
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET(request: Request) {
  const apiKey = process.env.DART_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ success: false, error: "환경변수 DART_API_KEY 없음" });
  }

  const { searchParams } = new URL(request.url);
  const rceptNo = searchParams.get("rcept_no");

  if (!rceptNo) {
    const today = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);

    const listUrl = `https://opendart.fss.or.kr/api/list.json?crtfc_key=${apiKey}&pblntf_detail_ty=C001&bgn_de=${fmtDate(sixtyDaysAgo)}&end_de=${fmtDate(today)}&page_count=100`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();

    type DartListItem = { corp_name: string; report_nm: string; rcept_no: string; stock_code: string };
    const candidates = (listData.list || [])
      .filter((item: DartListItem) => !item.stock_code || item.stock_code.trim() === "")
      .filter((item: DartListItem) => !item.corp_name.includes("기업인수목적"))
      .filter((item: DartListItem) => item.report_nm.includes("증권신고서") || item.report_nm.includes("투자설명서"))
      .slice(0, 20)
      .map((item: DartListItem) => ({
        name: item.corp_name,
        report: item.report_nm,
        rcept_no: item.rcept_no,
        test_url: `/api/dart-doc-test?rcept_no=${item.rcept_no}`,
      }));

    return NextResponse.json({
      message: "아래 rcept_no 중 하나를 ?rcept_no=... 로 전달하세요. test_url 클릭하면 바로 테스트.",
      dart_status: listData.status,
      dart_message: listData.message,
      raw_count: (listData.list || []).length,
      filtered_count: candidates.length,
      candidates,
    });
  }

  try {
    const url = `https://opendart.fss.or.kr/api/document.xml?crtfc_key=${apiKey}&rcept_no=${rceptNo}`;
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `DART 응답 오류: ${response.status}`,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    const files: {
      name: string;
      raw_size_chars: number;
      cleaned_size_chars: number;
      raw_sample: string;
      cleaned_sample: string;
    }[] = [];

    for (const filename of Object.keys(zip.files)) {
      const file = zip.files[filename];
      if (file.dir) continue;

      const bytes = await file.async("uint8array");
      const decoder = new TextDecoder("utf-8");
      const text = decoder.decode(bytes);
      const cleaned = cleanXmlToText(text);

      files.push({
        name: filename,
        raw_size_chars: text.length,
        cleaned_size_chars: cleaned.length,
        raw_sample: text.substring(0, 300),
        cleaned_sample: cleaned.substring(0, 800),
      });
    }

    return NextResponse.json({
      success: true,
      rcept_no: rceptNo,
      file_count: files.length,
      files,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "알 수 없는 에러";
    return NextResponse.json({ success: false, error: message });
  }
}