// === 타입 ===

interface DartListItem {
  corp_name: string;
  corp_code: string;
  stock_code?: string;
  report_nm: string;
  rcept_no: string;
  rcept_dt: string;
}

interface DartListResponse {
  status: string;
  message: string;
  total_count?: number;
  list?: DartListItem[];
}

interface DartGroup {
  title?: string;
  list?: Record<string, string>[];
}

interface DartDetailResponse {
  status: string;
  message: string;
  group?: DartGroup[];
}

export type Tone = "sage" | "clay" | "neutral";

export interface SubscriptionItem {
  name: string;
  corp_code: string;
  sector: string;
  date: string;
  dday: string;
  ddayUrgent: boolean;
  priceRange: string;
  finalPrice: string;
  competition: string;
  underwriter: string;
  stage: string;
  aiText: string;
  aiTone: Tone;
  aiDetail: string;
}

export interface IPOListResult {
  success: boolean;
  message: string;
  subscriptions: SubscriptionItem[];
}

// === 헬퍼 ===

function stagePriority(reportName: string): number {
  if (reportName.includes("[기재정정]투자설명서")) return 5;
  if (reportName.includes("투자설명서")) return 4;
  if (reportName.includes("[발행조건확정]")) return 3;
  if (reportName.includes("[기재정정]증권신고서")) return 2;
  if (reportName.includes("[첨부정정]증권신고서")) return 2;
  if (reportName.includes("증권신고서")) return 1;
  return 0;
}

function isIPOCandidate(item: DartListItem): boolean {
  const isNonListed = !item.stock_code || item.stock_code.trim() === "";
  if (!isNonListed) return false;
  if (item.corp_name.includes("기업인수목적")) return false;
  if (!item.report_nm.includes("증권신고서") && !item.report_nm.includes("투자설명서")) return false;
  return true;
}

function dedupeByCompany(items: DartListItem[]): DartListItem[] {
  const map = new Map<string, DartListItem>();
  for (const item of items) {
    const existing = map.get(item.corp_name);
    if (!existing || stagePriority(item.report_nm) > stagePriority(existing.report_nm)) {
      map.set(item.corp_name, item);
    }
  }
  return Array.from(map.values());
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

async function getIPODetail(corpCode: string, apiKey: string): Promise<Record<string, Record<string, string>[]> | null> {
  const today = new Date();
  const ninetyDaysAgo = new Date(today);
  ninetyDaysAgo.setDate(today.getDate() - 90);

  const url = `https://opendart.fss.or.kr/api/estkRs.json?crtfc_key=${apiKey}&corp_code=${corpCode}&bgn_de=${fmtDate(ninetyDaysAgo)}&end_de=${fmtDate(today)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data: DartDetailResponse = await res.json();
    if (data.status !== "000") return null;

    const grouped: Record<string, Record<string, string>[]> = {};
    for (const g of data.group ?? []) {
      if (g.title) grouped[g.title] = g.list ?? [];
    }
    return grouped;
  } catch {
    return null;
  }
}

function parseSubscriptionDate(sbd: string): { start: Date; display: string } | null {
  const match = sbd.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*~\s*(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (!match) return null;

  const [, sy, sm, sd, , em, ed] = match;
  const start = new Date(Number(sy), Number(sm) - 1, Number(sd));
  return {
    start,
    display: `${sm.padStart(2, "0")}.${sd.padStart(2, "0")} - ${em.padStart(2, "0")}.${ed.padStart(2, "0")}`,
  };
}

function calcDday(start: Date): { dday: string; urgent: boolean; ddayNum: number } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startCopy = new Date(start);
  startCopy.setHours(0, 0, 0, 0);

  const diffDays = Math.floor((startCopy.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { dday: "진행/완료", urgent: true, ddayNum: -1 };
  if (diffDays === 0) return { dday: "D-day", urgent: true, ddayNum: 0 };
  return { dday: `D-${diffDays}`, urgent: diffDays <= 7, ddayNum: diffDays };
}

function extractUnderwriters(list: Record<string, string>[]): string {
  const reps = list.filter((item) => item.actsen === "대표").map((item) => item.actnmn);
  if (reps.length === 0) {
    return list.map((item) => item.actnmn).filter(Boolean).join(", ") || "정보 없음";
  }
  return reps.join(", ");
}

// 임시 AI 평가 — 향후 LLM 분석으로 교체 예정
function generateTemporaryAI(date: string, ddayNum: number, finalPrice: string, underwriter: string): { aiText: string; aiTone: Tone; aiDetail: string } {
  if (ddayNum >= 0 && ddayNum <= 3) {
    return {
      aiText: "청약 임박",
      aiTone: "clay",
      aiDetail: `청약 ${date} (D-${ddayNum}). 공모가 ${finalPrice}원 확정. 주관사 ${underwriter}. 청약 의사 결정이 필요한 시점.`,
    };
  }
  if (ddayNum >= 4 && ddayNum <= 14) {
    return {
      aiText: "청약 2주 이내",
      aiTone: "sage",
      aiDetail: `청약 ${date} (D-${ddayNum}). 공모가 ${finalPrice}원. 수요예측 결과와 락업 비율 확인 권장. (AI 상세 분석 향후 추가 예정)`,
    };
  }
  return {
    aiText: "수요예측 단계",
    aiTone: "neutral",
    aiDetail: `청약 ${date}. 공모가 ${finalPrice}원. 수요예측 진행 중 또는 임박. AI 상세 분석 향후 추가 예정.`,
  };
}

function mapToSubscriptionItem(corpName: string, corpCode: string, reportName: string, detail: Record<string, Record<string, string>[]>): SubscriptionItem | null {
  const general = detail["일반사항"]?.[0];
  const security = detail["증권의종류"]?.[0];
  const underwriters = detail["인수인정보"] ?? [];

  if (!general || !security) return null;

  const dateInfo = parseSubscriptionDate(general.sbd ?? "");
  if (!dateInfo) return null;

  const ddayInfo = calcDday(dateInfo.start);
  const finalPrice = security.slprc ?? "정보 없음";
  const underwriter = extractUnderwriters(underwriters);
  const ai = generateTemporaryAI(dateInfo.display, ddayInfo.ddayNum, finalPrice, underwriter);

  return {
    name: corpName,
    corp_code: corpCode,
    sector: "정보 없음",
    date: dateInfo.display,
    dday: ddayInfo.dday,
    ddayUrgent: ddayInfo.urgent,
    priceRange: "정보 없음",
    finalPrice,
    competition: "정보 없음",
    underwriter,
    stage: reportName,
    ...ai,
  };
}

// === 메인 export 함수 ===

export async function getIPOList(): Promise<IPOListResult> {
  const apiKey = process.env.DART_API_KEY;

  if (!apiKey) {
    return { success: false, message: "환경변수 DART_API_KEY 없음", subscriptions: [] };
  }

  try {
    const today = new Date();
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(today.getDate() - 60);

    const url = `https://opendart.fss.or.kr/api/list.json?crtfc_key=${apiKey}&bgn_de=${fmtDate(sixtyDaysAgo)}&end_de=${fmtDate(today)}&pblntf_detail_ty=C001&page_count=100`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data: DartListResponse = await response.json();

    if (data.status !== "000") {
      return {
        success: false,
        message: `DART API 에러. status: ${data.status}, message: ${data.message}`,
        subscriptions: [],
      };
    }

    const allItems = data.list ?? [];
    const candidates = dedupeByCompany(allItems.filter(isIPOCandidate));

    const detailPromises = candidates.map((c) => getIPODetail(c.corp_code, apiKey));
    const details = await Promise.all(detailPromises);

    const subscriptions: SubscriptionItem[] = [];
    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];
      const d = details[i];
      if (!d) continue;
      const item = mapToSubscriptionItem(c.corp_name, c.corp_code, c.report_nm, d);
      if (item) subscriptions.push(item);
    }

    subscriptions.sort((a, b) => {
      const aNum = a.dday.startsWith("D-") ? Number(a.dday.slice(2)) : -1;
      const bNum = b.dday.startsWith("D-") ? Number(b.dday.slice(2)) : -1;
      return aNum - bNum;
    });

    return {
      success: true,
      message: `IPO 청약 일정 ${subscriptions.length}건`,
      subscriptions,
    };
  } catch (error) {
    return {
      success: false,
      message: `API 호출 실패: ${String(error)}`,
      subscriptions: [],
    };
  }
}