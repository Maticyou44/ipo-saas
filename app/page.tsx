export default function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-baseline gap-3">
            <a href="/" className="text-base font-medium text-ink">IPO 인사이트</a>
            <span className="hidden text-xs text-mist sm:block">한국 공모주 일정 · AI 분석</span>
          </div>
          <nav className="flex gap-5 text-sm text-slate">
            <a href="#subscription" className="hover:text-ink">청약</a>
            <a href="#listing" className="hover:text-ink">상장 예정</a>
            <a href="#lockup" className="hover:text-ink">락업 해제</a>
            <a href="#analysis" className="hover:text-ink">AI 분석</a>
            <a href="/calculator" className="hover:text-ink">계산기</a>
          </nav>
        </div>
      </header>

      <section id="subscription">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-2xl font-medium text-ink">청약 일정</h2>
              <p className="mt-1 text-sm text-slate">진행 중이거나 임박한 공모주 청약</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-mist">2026.05.24 기준</p>
              <p className="font-mono text-xs text-slate">3건</p>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">기업명</th>
                  <th className="py-3 text-left font-normal">청약일</th>
                  <th className="py-3 text-right font-normal">희망 공모가</th>
                  <th className="py-3 text-right font-normal">확정 공모가</th>
                  <th className="py-3 text-right font-normal">경쟁률</th>
                  <th className="py-3 text-left font-normal">주관사</th>
                  <th className="py-3 text-left font-normal">AI 한 줄</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-linen hover:bg-sand/60">
                  <td className="py-4"><div className="font-sans font-medium text-ink">회사명 A</div><div className="font-sans text-xs text-mist">코스닥 · 반도체</div></td>
                  <td className="py-4"><div className="text-ink">05.27 - 05.28</div><div className="text-xs font-medium text-clay">D-3</div></td>
                  <td className="py-4 text-right text-slate">28,000 ~ 32,000</td>
                  <td className="py-4 text-right text-ink">32,000</td>
                  <td className="py-4 text-right text-ink">1,420 : 1</td>
                  <td className="py-4 font-sans text-slate">한국투자증권</td>
                  <td className="py-4 font-sans text-xs text-slate">비교기업 대비 5% 할인</td>
                </tr>
                <tr className="border-b border-linen hover:bg-sand/60">
                  <td className="py-4"><div className="font-sans font-medium text-ink">회사명 B</div><div className="font-sans text-xs text-mist">코스피 · 바이오</div></td>
                  <td className="py-4"><div className="text-ink">05.30 - 05.31</div><div className="text-xs font-medium text-clay">D-7</div></td>
                  <td className="py-4 text-right text-slate">42,000 ~ 48,000</td>
                  <td className="py-4 text-right text-ink">48,000</td>
                  <td className="py-4 text-right text-ink">980 : 1</td>
                  <td className="py-4 font-sans text-slate">미래에셋증권</td>
                  <td className="py-4 font-sans text-xs text-slate">임상 3상 변동성 주의</td>
                </tr>
                <tr className="hover:bg-sand/60">
                  <td className="py-4"><div className="font-sans font-medium text-ink">회사명 C</div><div className="font-sans text-xs text-mist">코스닥 · 소비재</div></td>
                  <td className="py-4"><div className="text-ink">06.05 - 06.06</div><div className="text-xs text-mist">D-12</div></td>
                  <td className="py-4 text-right text-slate">18,000 ~ 21,000</td>
                  <td className="py-4 text-right text-mist">미정</td>
                  <td className="py-4 text-right text-mist">미정</td>
                  <td className="py-4 font-sans text-slate">NH투자증권</td>
                  <td className="py-4 font-sans text-xs text-slate">수요예측 진행 중</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-xs text-mist">데모 데이터. 실데이터는 DART · KIND 연동 후 제공</p>
        </div>
      </section>

      <section id="listing" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-2xl font-medium text-ink">상장 예정</h2>
              <p className="mt-1 text-sm text-slate">청약을 마치고 상장을 기다리는 종목</p>
            </div>
            <p className="font-mono text-xs text-slate">3건</p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">기업명</th>
                  <th className="py-3 text-left font-normal">상장일</th>
                  <th className="py-3 text-right font-normal">확정 공모가</th>
                  <th className="py-3 text-right font-normal">최종 경쟁률</th>
                  <th className="py-3 text-right font-normal">의무보유 비율</th>
                  <th className="py-3 text-left font-normal">시장</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-linen hover:bg-ivory">
                  <td className="py-4 font-sans font-medium text-ink">상장예정 X</td>
                  <td className="py-4"><div className="text-ink">2026.05.28</div><div className="text-xs font-medium text-clay">D-4</div></td>
                  <td className="py-4 text-right text-ink">26,000</td>
                  <td className="py-4 text-right text-ink">1,892 : 1</td>
                  <td className="py-4 text-right text-ink">42.3 %</td>
                  <td className="py-4 font-sans text-slate">코스닥</td>
                </tr>
                <tr className="border-b border-linen hover:bg-ivory">
                  <td className="py-4 font-sans font-medium text-ink">상장예정 Y</td>
                  <td className="py-4"><div className="text-ink">2026.06.04</div><div className="text-xs text-mist">D-11</div></td>
                  <td className="py-4 text-right text-ink">15,500</td>
                  <td className="py-4 text-right text-ink">2,345 : 1</td>
                  <td className="py-4 text-right text-ink">58.1 %</td>
                  <td className="py-4 font-sans text-slate">코스닥</td>
                </tr>
                <tr className="hover:bg-ivory">
                  <td className="py-4 font-sans font-medium text-ink">상장예정 Z</td>
                  <td className="py-4"><div className="text-ink">2026.06.18</div><div className="text-xs text-mist">D-25</div></td>
                  <td className="py-4 text-right text-ink">38,000</td>
                  <td className="py-4 text-right text-ink">756 : 1</td>
                  <td className="py-4 text-right text-ink">31.7 %</td>
                  <td className="py-4 font-sans text-slate">코스피</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="lockup" className="border-t border-ink">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-2xl font-medium text-ink">락업 해제 일정</h2>
              <p className="mt-1 text-sm text-slate">의무보유확약 해제일 · 잠재 매물 신호</p>
            </div>
            <p className="font-mono text-xs text-slate">3건</p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-linen text-xs uppercase tracking-wider text-mist">
                  <th className="py-3 text-left font-normal">종목</th>
                  <th className="py-3 text-left font-normal">해제일</th>
                  <th className="py-3 text-left font-normal">보유 기간</th>
                  <th className="py-3 text-right font-normal">해제 주식수</th>
                  <th className="py-3 text-right font-normal">유통주식 대비</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-linen hover:bg-sand/60">
                  <td className="py-4 font-sans font-medium text-ink">종목명 X</td>
                  <td className="py-4"><div className="text-ink">2026.05.30</div><div className="text-xs font-medium text-clay">D-6</div></td>
                  <td className="py-4 font-sans text-slate">3개월</td>
                  <td className="py-4 text-right text-ink">1,240,000</td>
                  <td className="py-4 text-right text-ink">8.2 %</td>
                </tr>
                <tr className="border-b border-linen hover:bg-sand/60">
                  <td className="py-4 font-sans font-medium text-ink">종목명 Y</td>
                  <td className="py-4"><div className="text-ink">2026.06.12</div><div className="text-xs text-mist">D-19</div></td>
                  <td className="py-4 font-sans text-slate">6개월</td>
                  <td className="py-4 text-right text-ink">3,580,000</td>
                  <td className="py-4 text-right text-ink">15.4 %</td>
                </tr>
                <tr className="hover:bg-sand/60">
                  <td className="py-4 font-sans font-medium text-ink">종목명 Z</td>
                  <td className="py-4"><div className="text-ink">2026.06.28</div><div className="text-xs text-mist">D-35</div></td>
                  <td className="py-4 font-sans text-slate">1년</td>
                  <td className="py-4 text-right text-ink">8,920,000</td>
                  <td className="py-4 text-right text-ink">22.1 %</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="analysis" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-2xl font-medium text-ink">AI 분석 미리보기</h2>
              <p className="mt-1 text-sm text-slate">증권신고서 자동 요약 샘플 · 회사명 A 기준</p>
            </div>
            <p className="font-mono text-xs text-amber">Pro · 월 9,900원</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-mist">사업 핵심</p>
              <div className="mt-2 border-t border-ink pt-3">
                <p className="text-base font-medium text-ink">시스템 반도체 후공정 외주</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">삼성전자·SK하이닉스 향 매출 78% 의존. 22년 흑자 전환, 23년 영업이익률 14.2%. 주력 제품은 메모리 패키징.</p>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-mist">공모가 적정성</p>
              <div className="mt-2 border-t border-sage pt-3">
                <p className="text-base font-medium text-sage">비교기업 대비 5% 할인</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">동종업계(N=4) 평균 PER 18.4 / PBR 2.1. 본 종목 공모가 기준 PER 17.5 / PBR 1.9. 밴드 하단 적용 시 약 5% 할인.</p>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-mist">핵심 리스크</p>
              <div className="mt-2 border-t border-clay pt-3">
                <p className="text-base font-medium text-clay">고객 집중도 + 환율 노출</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">매출 78%가 상위 2개사 의존. 미달러 매출 63%로 환율 직접 노출. 23년 4분기 가동률 67%로 전년비 11%p 하락.</p>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-linen pt-6 text-sm text-slate"><span className="font-medium text-ink">Pro 추가 제공:</span> 비교기업 5년 재무 추이 차트 · 락업 비율 분석 · 청약 경쟁률 예측 · 상장 후 30일 주가 시뮬레이션</p>
        </div>
      </section>

      <section id="tools" className="border-t border-ink">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div>
              <h2 className="text-2xl font-medium text-ink">부가 도구</h2>
              <p className="mt-1 text-sm text-slate">청약 전 활용할 수 있는 무료 도구</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <a href="/calculator" className="block border border-ink p-5 hover:bg-sand/60">
              <p className="font-mono text-xs uppercase tracking-wider text-sage">Free</p>
              <h3 className="mt-2 text-base font-medium text-ink">균등배정 계산기</h3>
              <p className="mt-1 text-sm text-slate">청약 예산으로 가능한 주식 수 계산</p>
              <p className="mt-4 text-sm text-midnight">사용하기 →</p>
            </a>
            <div className="border border-linen p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-sage">Free</p>
              <h3 className="mt-2 text-base font-medium text-ink">청약일 이메일 알림</h3>
              <p className="mt-1 text-sm text-slate">관심 종목 청약 시작일 메일 발송</p>
              <p className="mt-4 font-mono text-sm text-mist">준비 중</p>
            </div>
            <div className="border border-linen p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-amber">Pro</p>
              <h3 className="mt-2 text-base font-medium text-ink">증권신고서 AI 분석</h3>
              <p className="mt-1 text-sm text-slate">사업 핵심 · 적정성 · 리스크 자동 분석</p>
              <p className="mt-4 font-mono text-sm text-mist">월 9,900원</p>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="border-t border-ink bg-sand/30">
        <div className="mx-auto max-w-[1280px] px-6 py-8">
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
        <div className="mx-auto max-w-[1280px] px-6 py-6">
          <p className="text-xs leading-relaxed text-mist">본 서비스는 정보 제공을 목적으로 하며, 자본시장법상 투자자문이나 투자권유에 해당하지 않습니다. 모든 투자 결정과 결과의 책임은 투자자 본인에게 있습니다.</p>
          <p className="mt-3 font-mono text-xs text-mist">© 2026 IPO 인사이트</p>
        </div>
      </footer>
    </div>
  );
}