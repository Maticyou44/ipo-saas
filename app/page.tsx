type Tone = "sage" | "clay" | "neutral";

const subscriptions = [
  { name: "회사명 A", sector: "코스닥 · 반도체", date: "05.27 - 05.28", dday: "D-3", ddayUrgent: true, priceRange: "28,000 ~ 32,000", finalPrice: "32,000", competition: "1,420 : 1", underwriter: "한국투자증권", aiText: "공모가 5% 할인 · 락업 58%", aiTone: "sage" as Tone, aiDetail: "비교기업(N=4) 평균 PER 18.4 대비 본 종목 17.5로 약 5% 할인 영역. 의무보유 확약 58%로 업종 평균 42% 대비 높음 — 상장일 매물 부담 적을 가능성." },
  { name: "회사명 B", sector: "코스피 · 바이오", date: "05.30 - 05.31", dday: "D-7", ddayUrgent: true, priceRange: "42,000 ~ 48,000", finalPrice: "48,000", competition: "980 : 1", underwriter: "미래에셋증권", aiText: "임상 3상 변동성 · 고평가", aiTone: "clay" as Tone, aiDetail: "비교기업 평균 PER 22 대비 본 종목 35로 약 60% 프리미엄. 핵심 파이프라인 임상 3상 결과 26년 4분기 발표 예정 — 상장 직후 변동성 클 가능성." },
  { name: "회사명 C", sector: "코스닥 · 소비재", date: "06.05 - 06.06", dday: "D-12", ddayUrgent: false, priceRange: "18,000 ~ 21,000", finalPrice: "미정", competition: "미정", underwriter: "NH투자증권", aiText: "수요예측 진행 중", aiTone: "neutral" as Tone, aiDetail: "06.02-06.03 기관 수요예측 진행 중. 결과에 따라 공모가 확정 (밴드 18,000~21,000원). 수요예측 결과 발표 후 분석 업데이트 예정." },
];

const listings = [
  { name: "상장예정 X", date: "2026.05.28", dday: "D-4", ddayUrgent: true, finalPrice: "26,000", competition: "1,892 : 1", lockup: "42.3 %", market: "코스닥", aiText: "수요예측 흥행", aiTone: "sage" as Tone, aiDetail: "기관 수요예측 경쟁률 1,892:1로 동기간 평균(540:1) 대비 약 3.5배. 가격 밴드 상단 초과 110% 확정 — 기관 수요 강한 흥행 신호." },
  { name: "상장예정 Y", date: "2026.06.04", dday: "D-11", ddayUrgent: false, finalPrice: "15,500", competition: "2,345 : 1", lockup: "58.1 %", market: "코스닥", aiText: "락업 58% · 매물 적음", aiTone: "sage" as Tone, aiDetail: "의무보유 확약 58.1%, 업종 평균 42% 대비 +16%p. 6개월 락업 비중 높음 — 상장일 매도 가능 물량 제한적." },
  { name: "상장예정 Z", date: "2026.06.18", dday: "D-25", ddayUrgent: false, finalPrice: "38,000", competition: "756 : 1", lockup: "31.7 %", market: "코스피", aiText: "락업 낮음 · 매물 우려", aiTone: "clay" as Tone, aiDetail: "의무보유 확약 31.7%로 업종 평균(42%) 대비 -10%p. 1개월 락업 비중 65% — 상장 1개월 후 매물 부담 우려." },
];

const lockups = [
  { name: "종목명 X", date: "2026.05.30", dday: "D-6", ddayUrgent: true, period: "3개월", shares: "1,240,000", ratio: "8.2 %", burden: "보통", burdenTone: "neutral" as Tone },
  { name: "종목명 Y", date: "2026.06.12", dday: "D-19", ddayUrgent: false, period: "6개월", shares: "3,580,000", ratio: "15.4 %", burden: "높음", burdenTone: "clay" as Tone },
  { name: "종목명 Z", date: "2026.06.28", dday: "D-35", ddayUrgent: false, period: "1년", shares: "8,920,000", ratio: "22.1 %", burden: "매우 높음", burdenTone: "clay" as Tone },
];

function toneClass(tone: Tone) {
  if (tone === "sage") return "bg-sage-bg text-sage";
  if (tone === "clay") return "bg-clay-bg text-clay";
  return "bg-linen text-slate";
}

function ddayClass(urgent: boolean) {
  return urgent ? "bg-clay-bg text-clay" : "bg-linen text-slate";
}

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex items-baseline gap-3">
              <a href="/" className="text-base font-medium text-ink">IPO 인사이트</a>
              <span className="hidden text-xs text-mist sm:block">한국 공모주 일정 · AI 분석</span>
            </div>
            <nav className="flex gap-4 overflow-x-auto text-sm text-slate sm:gap-5">
              <a href="#subscription" className="shrink-0 hover:text-ink">청약</a>
              <a href="#listing" className="shrink-0 hover:text-ink">상장 예정</a>
              <a href="#lockup" className="shrink-0 hover:text-ink">락업 해제</a>
              <a href="#analysis" className="shrink-0 hover:text-ink">AI 분석</a>
              <a href="/calculator" className="shrink-0 hover:text-ink">계산기</a>
            </nav>
          </div>
        </div>
      </header>

      {/* 청약 일정 */}
      <section id="subscription">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-xl font-medium text-ink md:text-2xl">청약 일정</h2>
              <p className="mt-1 text-xs text-slate md:text-sm">진행 중이거나 임박한 공모주 청약</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-mist">2026.05.24 기준</p>
              <p className="font-mono text-xs text-slate">3건</p>
            </div>
          </div>

          {/* 모바일 카드 */}
          <div className="mt-6 grid gap-3 md:hidden">
            {subscriptions.map((item) => (
              <article key={item.name} className="border border-linen bg-ivory p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 text-xs text-mist">{item.sector}</p>
                  </div>
                  <span className={"shrink-0 px-2 py-0.5 font-mono text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</span>
                </div>
                <div className="mt-4 space-y-2 border-t border-linen pt-4 text-sm">
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">청약일</span><span className="font-mono text-ink">{item.date}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">희망 공모가</span><span className="font-mono text-slate">{item.priceRange}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">확정 공모가</span><span className={item.finalPrice === "미정" ? "font-mono text-mist" : "font-mono text-ink"}>{item.finalPrice}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">경쟁률</span><span className={item.competition === "미정" ? "font-mono text-mist" : "font-mono text-ink"}>{item.competition}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">주관사</span><span className="text-slate">{item.underwriter}</span></div>
                </div>
                <div className="mt-4 border-t border-linen pt-4">
                  <p className="text-xs text-mist">AI 한 줄 평가</p>
                  <span className={"mt-2 inline-block px-2 py-1 text-xs font-medium " + toneClass(item.aiTone)}>{item.aiText}</span>
                  <p className="mt-3 text-xs leading-relaxed text-slate">{item.aiDetail}</p>
                </div>
              </article>
            ))}
          </div>

          {/* 데스크탑 테이블 */}
          <div className="mt-6 hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">기업명</th>
                  <th className="py-3 text-left font-normal">청약일</th>
                  <th className="py-3 text-right font-normal">희망 공모가</th>
                  <th className="py-3 text-right font-normal">확정 공모가</th>
                  <th className="py-3 text-right font-normal">경쟁률</th>
                  <th className="py-3 text-left font-normal">주관사</th>
                  <th className="py-3 text-left font-normal">AI 한 줄 평가</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {subscriptions.map((item, idx) => (
                  <tr key={item.name} className={(idx < subscriptions.length - 1 ? "border-b border-linen " : "") + "hover:bg-sand/60"}>
                    <td className="py-4">
                      <div className="font-sans font-medium text-ink">{item.name}</div>
                      <div className="font-sans text-xs text-mist">{item.sector}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-ink">{item.date}</div>
                      <div className={"mt-1 inline-block px-1.5 py-0.5 text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</div>
                    </td>
                    <td className="py-4 text-right text-slate">{item.priceRange}</td>
                    <td className={"py-4 text-right " + (item.finalPrice === "미정" ? "text-mist" : "text-ink")}>{item.finalPrice}</td>
                    <td className={"py-4 text-right " + (item.competition === "미정" ? "text-mist" : "text-ink")}>{item.competition}</td>
                    <td className="py-4 font-sans text-slate">{item.underwriter}</td>
                    <td className="py-4">
                      <span className="group relative inline-block">
                        <span className={"inline-block cursor-help px-2 py-1 font-sans text-xs font-medium " + toneClass(item.aiTone)}>{item.aiText}</span>
                        <span className="invisible absolute bottom-full right-0 z-20 mb-2 w-72 border border-ink bg-ivory p-3 font-sans text-xs leading-relaxed text-slate opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">{item.aiDetail}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-mono text-xs text-mist">데모 데이터. 실데이터는 DART · KIND 연동 후 제공</p>
        </div>
      </section>

      {/* 상장 예정 */}
      <section id="listing" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-xl font-medium text-ink md:text-2xl">상장 예정</h2>
              <p className="mt-1 text-xs text-slate md:text-sm">청약을 마치고 상장을 기다리는 종목</p>
            </div>
            <p className="font-mono text-xs text-slate">3건</p>
          </div>

          {/* 모바일 카드 */}
          <div className="mt-6 grid gap-3 md:hidden">
            {listings.map((item) => (
              <article key={item.name} className="border border-linen bg-ivory p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 text-xs text-mist">{item.market}</p>
                  </div>
                  <span className={"shrink-0 px-2 py-0.5 font-mono text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</span>
                </div>
                <div className="mt-4 space-y-2 border-t border-linen pt-4 text-sm">
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">상장일</span><span className="font-mono text-ink">{item.date}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">확정 공모가</span><span className="font-mono text-ink">{item.finalPrice}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">최종 경쟁률</span><span className="font-mono text-ink">{item.competition}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">의무보유 비율</span><span className="font-mono text-ink">{item.lockup}</span></div>
                </div>
                <div className="mt-4 border-t border-linen pt-4">
                  <p className="text-xs text-mist">AI 한 줄 평가</p>
                  <span className={"mt-2 inline-block px-2 py-1 text-xs font-medium " + toneClass(item.aiTone)}>{item.aiText}</span>
                  <p className="mt-3 text-xs leading-relaxed text-slate">{item.aiDetail}</p>
                </div>
              </article>
            ))}
          </div>

          {/* 데스크탑 테이블 */}
          <div className="mt-6 hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">기업명</th>
                  <th className="py-3 text-left font-normal">상장일</th>
                  <th className="py-3 text-right font-normal">확정 공모가</th>
                  <th className="py-3 text-right font-normal">최종 경쟁률</th>
                  <th className="py-3 text-right font-normal">의무보유 비율</th>
                  <th className="py-3 text-left font-normal">시장</th>
                  <th className="py-3 text-left font-normal">AI 한 줄 평가</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {listings.map((item, idx) => (
                  <tr key={item.name} className={(idx < listings.length - 1 ? "border-b border-linen " : "") + "hover:bg-ivory"}>
                    <td className="py-4 font-sans font-medium text-ink">{item.name}</td>
                    <td className="py-4">
                      <div className="text-ink">{item.date}</div>
                      <div className={"mt-1 inline-block px-1.5 py-0.5 text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</div>
                    </td>
                    <td className="py-4 text-right text-ink">{item.finalPrice}</td>
                    <td className="py-4 text-right text-ink">{item.competition}</td>
                    <td className="py-4 text-right text-ink">{item.lockup}</td>
                    <td className="py-4 font-sans text-slate">{item.market}</td>
                    <td className="py-4">
                      <span className="group relative inline-block">
                        <span className={"inline-block cursor-help px-2 py-1 font-sans text-xs font-medium " + toneClass(item.aiTone)}>{item.aiText}</span>
                        <span className="invisible absolute bottom-full right-0 z-20 mb-2 w-72 border border-ink bg-ivory p-3 font-sans text-xs leading-relaxed text-slate opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">{item.aiDetail}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 락업 해제 */}
      <section id="lockup" className="border-t border-ink">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-xl font-medium text-ink md:text-2xl">락업 해제 일정</h2>
              <p className="mt-1 text-xs text-slate md:text-sm">의무보유확약 해제일 · 잠재 매물 신호</p>
            </div>
            <p className="font-mono text-xs text-slate">3건</p>
          </div>

          {/* 모바일 카드 */}
          <div className="mt-6 grid gap-3 md:hidden">
            {lockups.map((item) => (
              <article key={item.name} className="border border-linen bg-ivory p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 text-xs text-mist">보유 {item.period}</p>
                  </div>
                  <span className={"shrink-0 px-2 py-0.5 font-mono text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</span>
                </div>
                <div className="mt-4 space-y-2 border-t border-linen pt-4 text-sm">
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">해제일</span><span className="font-mono text-ink">{item.date}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">해제 주식수</span><span className="font-mono text-ink">{item.shares}</span></div>
                  <div className="flex items-baseline justify-between gap-3"><span className="text-mist">유통주식 대비</span><span className="font-mono text-ink">{item.ratio}</span></div>
                </div>
                <div className="mt-4 border-t border-linen pt-4">
                  <p className="text-xs text-mist">매물 부담</p>
                  <span className={"mt-2 inline-block px-2 py-1 text-xs font-medium " + toneClass(item.burdenTone)}>{item.burden}</span>
                </div>
              </article>
            ))}
          </div>

          {/* 데스크탑 테이블 */}
          <div className="mt-6 hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">종목</th>
                  <th className="py-3 text-left font-normal">해제일</th>
                  <th className="py-3 text-left font-normal">보유 기간</th>
                  <th className="py-3 text-right font-normal">해제 주식수</th>
                  <th className="py-3 text-right font-normal">유통주식 대비</th>
                  <th className="py-3 text-left font-normal">매물 부담</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {lockups.map((item, idx) => (
                  <tr key={item.name} className={(idx < lockups.length - 1 ? "border-b border-linen " : "") + "hover:bg-sand/60"}>
                    <td className="py-4 font-sans font-medium text-ink">{item.name}</td>
                    <td className="py-4">
                      <div className="text-ink">{item.date}</div>
                      <div className={"mt-1 inline-block px-1.5 py-0.5 text-xs font-medium " + ddayClass(item.ddayUrgent)}>{item.dday}</div>
                    </td>
                    <td className="py-4 font-sans text-slate">{item.period}</td>
                    <td className="py-4 text-right text-ink">{item.shares}</td>
                    <td className="py-4 text-right text-ink">{item.ratio}</td>
                    <td className="py-4"><span className={"inline-block px-2 py-1 font-sans text-xs font-medium " + toneClass(item.burdenTone)}>{item.burden}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI 분석 미리보기 */}
      <section id="analysis" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-xl font-medium text-ink md:text-2xl">AI 분석 미리보기</h2>
              <p className="mt-1 text-xs text-slate md:text-sm">증권신고서 자동 요약 · 회사명 A 기준</p>
            </div>
            <p className="font-mono text-xs text-amber">Pro · 월 9,900원</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border border-ink bg-ivory p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-mist">사업 핵심</p>
              <p className="mt-3 text-base font-medium text-ink">시스템 반도체 후공정 외주</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">삼성전자·SK하이닉스 향 매출 78% 의존. 22년 흑자 전환, 23년 영업이익률 14.2%.</p>
            </div>
            <div className="border-2 border-sage bg-sage-bg p-5">
              <p className="font-mono text-xs uppercase tracking-wider font-medium text-sage">공모가 적정성</p>
              <p className="mt-3 text-base font-medium text-sage">비교기업 대비 5% 할인</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">동종업계(N=4) 평균 PER 18.4 / PBR 2.1. 본 종목 PER 17.5 / PBR 1.9. 밴드 하단 적용 시 약 5% 할인 영역.</p>
            </div>
            <div className="border-2 border-clay bg-clay-bg p-5">
              <p className="font-mono text-xs uppercase tracking-wider font-medium text-clay">핵심 리스크</p>
              <p className="mt-3 text-base font-medium text-clay">고객 집중도 + 환율 노출</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">매출 78%가 상위 2개사 의존. 미달러 매출 63%로 환율 직접 노출. 23년 4분기 가동률 67%로 전년비 11%p 하락.</p>
            </div>
          </div>
          <p className="mt-6 border-t border-linen pt-4 text-sm text-slate"><span className="font-medium text-ink">Pro 추가 제공:</span> 비교기업 5년 재무 추이 차트 · 락업 비율 분석 · 청약 경쟁률 예측 · 상장 후 30일 주가 시뮬레이션</p>
        </div>
      </section>

      {/* 부가 도구 */}
      <section id="tools" className="border-t border-ink">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 md:py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-xl font-medium text-ink md:text-2xl">부가 도구</h2>
              <p className="mt-1 text-xs text-slate md:text-sm">청약 전 활용할 수 있는 무료 도구</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <a href="/calculator" className="block border border-ink p-5 hover:bg-sand/60">
              <p className="font-mono text-xs uppercase tracking-wider font-medium text-sage">Free</p>
              <h3 className="mt-2 text-base font-medium text-ink">균등배정 계산기</h3>
              <p className="mt-1 text-sm text-slate">청약 예산으로 가능한 주식 수 계산</p>
              <p className="mt-4 text-sm text-midnight">사용하기 →</p>
            </a>
            <div className="border border-linen p-5">
              <p className="font-mono text-xs uppercase tracking-wider font-medium text-sage">Free</p>
              <h3 className="mt-2 text-base font-medium text-ink">청약일 이메일 알림</h3>
              <p className="mt-1 text-sm text-slate">관심 종목 청약 시작일 메일 발송</p>
              <p className="mt-4 font-mono text-sm text-mist">준비 중</p>
            </div>
            <div className="border border-linen p-5">
              <p className="font-mono text-xs uppercase tracking-wider font-medium text-amber">Pro</p>
              <h3 className="mt-2 text-base font-medium text-ink">증권신고서 AI 분석</h3>
              <p className="mt-1 text-sm text-slate">사업 핵심 · 적정성 · 리스크 자동 분석</p>
              <p className="mt-4 font-mono text-sm text-mist">월 9,900원</p>
            </div>
          </div>
        </div>
      </section>

      {/* 뉴스레터 */}
      <section id="newsletter" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-medium text-ink">매주 월요일, 한 주 IPO 한 줄 요약</h3>
              <p className="mt-1 text-sm text-slate">5분 분량 · 광고 없음 · 언제든 취소</p>
            </div>
            <div className="flex gap-2 md:w-80">
              <input type="email" placeholder="이메일 주소" className="flex-1 border border-ink bg-ivory px-3 py-2 text-sm text-ink placeholder:text-mist focus:outline-none" />
              <button type="button" className="border border-ink bg-ink px-4 py-2 text-sm font-medium text-ivory hover:bg-midnight">구독</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink">
        <div className="mx-auto max-w-[1280px] px-4 py-6 md:px-6">
          <p className="text-xs leading-relaxed text-mist">본 서비스는 정보 제공을 목적으로 하며, 자본시장법상 투자자문이나 투자권유에 해당하지 않습니다. 모든 투자 결정과 결과의 책임은 투자자 본인에게 있습니다.</p>
          <p className="mt-3 font-mono text-xs text-mist">© 2026 IPO 인사이트</p>
        </div>
      </footer>
    </div>
  );
}