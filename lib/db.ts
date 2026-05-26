import { createClient } from "@supabase/supabase-js";
import type { IPOAnalysis } from "@/lib/llm";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 모듈 레벨에서 클라이언트 한 번만 생성 (재사용)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const TABLE = "ipo_analysis_cache";

/**
 * 캐시에서 LLM 분석 결과 조회.
 * 캐시 없거나 에러 시 null 반환 (페이지는 LLM 재호출로 계속 작동).
 */
export async function getCachedAnalysis(rceptNo: string): Promise<IPOAnalysis | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("analysis")
      .eq("rcept_no", rceptNo)
      .maybeSingle();

    if (error) {
      console.error(`[db] getCachedAnalysis 에러 (${rceptNo}):`, error.message);
      return null;
    }

    if (!data) return null;

    return data.analysis as IPOAnalysis;
  } catch (err) {
    console.error(`[db] getCachedAnalysis 예외 (${rceptNo}):`, err);
    return null;
  }
}

/**
 * LLM 분석 결과를 캐시에 저장 (있으면 덮어쓰기).
 * 실패해도 페이지 계속 작동하도록 에러만 로그.
 */
export async function setCachedAnalysis(
  rceptNo: string,
  corpName: string,
  analysis: IPOAnalysis
): Promise<void> {
  try {
    const { error } = await supabase.from(TABLE).upsert(
      {
        rcept_no: rceptNo,
        corp_name: corpName,
        analysis: analysis,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "rcept_no" }
    );

    if (error) {
      console.error(`[db] setCachedAnalysis 에러 (${rceptNo}):`, error.message);
    }
  } catch (err) {
    console.error(`[db] setCachedAnalysis 예외 (${rceptNo}):`, err);
  }
}