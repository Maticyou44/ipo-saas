import JSZip from "jszip";
import { NextResponse } from "next/server";
import { analyzeIPOFiling } from "@/lib/llm";

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
  const corpName = searchParams.get("name") || "테스트 회사";

  if (!rceptNo) {
    return NextResponse.json({
      success: false,
      error: "사용법: /api/llm-analyze-test?rcept_no=20260522000577&name=피스피스스튜디오",
    });
  }

  try {
    const url = `https://opendart.fss.or.kr/api/document.xml?crtfc_key=${apiKey}&rcept_no=${rceptNo}`;
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ success: false, error: `DART 응답 오류: ${response.status}` });
    }

    const arrayBuffer = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    let combinedText = "";
    for (const filename of Object.keys(zip.files)) {
      const file = zip.files[filename];
      if (file.dir) continue;
      const bytes = await file.async("uint8array");
      const decoder = new TextDecoder("utf-8");
      combinedText += cleanXmlToText(decoder.decode(bytes)) + "\n\n";
    }

    const startTime = Date.now();
    const analysis = await analyzeIPOFiling(corpName, combinedText);
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      rcept_no: rceptNo,
      corp_name: corpName,
      text_length: combinedText.length,
      truncated_to: 50000,
      llm_duration_ms: durationMs,
      analysis,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "알 수 없는 에러";
    return NextResponse.json({ success: false, error: message });
  }
}