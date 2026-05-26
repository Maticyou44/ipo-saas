import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // 환경변수 진단 (민감정보 노출 없이)
  const diagnostic = {
    SUPABASE_URL_exists: !!url,
    SUPABASE_URL_length: url?.length ?? 0,
    SUPABASE_URL_preview: url ? `${url.slice(0, 35)}...${url.slice(-15)}` : null,
    SUPABASE_URL_endsWithSlash: url?.endsWith("/") ?? false,
    SUPABASE_URL_startsWithQuote: url?.startsWith('"') || url?.startsWith("'") || false,
    SUPABASE_URL_hasWhitespace: url ? /\s/.test(url) : false,
    SUPABASE_SERVICE_ROLE_KEY_exists: !!key,
    SUPABASE_SERVICE_ROLE_KEY_length: key?.length ?? 0,
    SUPABASE_SERVICE_ROLE_KEY_startsWith: key?.slice(0, 10) ?? null,
  };

  if (!url || !key) {
    return NextResponse.json({
      ok: false,
      message: "환경변수가 없음",
      diagnostic,
    });
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from("ipo_analysis_cache")
      .select("rcept_no, corp_name, updated_at")
      .limit(5);

    if (error) {
      return NextResponse.json({
        ok: false,
        message: "Supabase 쿼리 실패",
        errorMessage: error.message,
        errorCode: error.code,
        errorDetails: error.details,
        errorHint: error.hint,
        diagnostic,
      });
    }

    return NextResponse.json({
      ok: true,
      message: "연결 성공",
      rowCount: data?.length ?? 0,
      rows: data,
      diagnostic,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: "예외 발생",
      error: e instanceof Error ? e.message : String(e),
      diagnostic,
    });
  }
}