export default function Home() {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      {/* ─── 헤더 ─── */}
      <header className="border-b border-linen">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-6">
          <a href="/" className="font-serif text-xl text-ink">
            IPO 인사이트
          </a>
          <nav className="hidden gap-8 text-sm text-slate md:flex">
            <a href="#stocks" className="transition hover:text-ink">종목</a>
            <a href="#tools" className="transition hover:text-ink">도구</a>
            <a href="#calendar" className="transition hover:text-ink">캘린더</a>
            <a href="#newsletter" className="transition hover:text-ink">뉴스레터</a>
          </nav>
        </div>
      </header>

      {/* ─── 히어로: 오늘의 인사이트 ─── */}
      <section className="border-b border-linen">
        <div className="mx-auto max-w-[1280px] px-8 py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
            Insight Almanac · 2026
          </p>
          <h1 className="mt-8 max-w-3xl font-serif text-5xl leading-[1.2] text-ink sm:text-6xl">
            한국 공모주,<br />조용히 깊이 들여다보다
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate">
            IPO 일정, 균등배정 전략, 증권신고서의 행간 ─
            정보를 늘리지 않고, 결정에 필요한 것만 정직하게 보여드립니다.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            
              href="/calculator"
              className="border border-midnight bg-midnight px-6 py-3 text-sm text-ivory transition hover:bg-ink"
            >
              균등배정 계산기 →
            </a>
            
              href="#newsletter"
              className="border border-ink px-6 py-3 text-sm text-ink transition hover:border-midnight hover:text-midnight"
            >
              뉴스레터 구독
            </a>
          </div>
        </div>
      </section>

      {/* ─── 이번 주 IPO (데이터 연동 전 미리보기) ─── */}
      <section id="stocks" className="border-b border-linen">
        <div className="mx-auto max-w-[1280px] px-8 py-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
                Section 01
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ink">이번 주 IPO</h2>
            </div>
            <span className="font-mono text-xs text-mist">데이터 연동 예정</span>
          </div>

          <div className="mt-12 grid gap-px bg-linen md:grid-cols-3">
            {[
              { d: "D-3", market: "코스닥 · 반도체" },
              { d: "D-7", market: "코스피 · 바이오" },
              { d: "D-12", market: "코스닥 · 소비재" },
            ].map((item, i) => (
              <div key={i} className="bg-ivory p-8 transition hover:bg-sand">
                <p className="font-mono text-xs text-mist">청약 {item.d}</p>
                <h3 className="mt-6 font-serif text-xl text-ink">
                  ─ 회사명
                </h3>
                <p className="mt-2 text-sm text-slate">{item.market}</p>
                <dl className="mt-8 space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-linen pb-2">
                    <dt className="text-mist">공모가</dt>
                    <dd className="text-ink">─ 원</dd>
                  </div>
                  <div className="flex justify-between border-b border-linen pb-2">
                    <dt className="text-mist">청약일</dt>
                    <dd className="text-ink">─ · ─</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-mist">주관사</dt>
                    <dd className="text-ink">─</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 정보 제공 도구 ─── */}
      <section id="tools" className="border-b border-linen bg-sand/40">
        <div className="mx-auto max-w-[1280px] px-8 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
            Section 02
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink">정보 제공 도구</h2>

          <div className="mt-12 grid gap-px bg-linen md:grid-cols-3">
            
              href="/calculator"
              className="group block bg-ivory p-8 transition hover:bg-sand"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-sage">
                Free
              </p>
              <h3 className="mt-6 font-serif text-xl text-ink">
                균등배정 청약 계산기
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                예산을 입력하면 증권사별 최적 분산 전략과 예상 균등배정 주식 수를 계산해드립니다.
              </p>
              <p className="mt-8 text-sm text-midnight transition group-hover:translate-x-1">
                사용하기 →
              </p>
            </a>

            <div className="bg-ivory p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-sage">
                Free
              </p>
              <h3 className="mt-6 font-serif text-xl text-ink">
                IPO 청약 일정 캘린더
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                상장 예정 종목과 청약일, 환불일을 한눈에 ─ 이메일 알림까지 무료로.
              </p>
              <p className="mt-8 font-mono text-xs text-mist">준비 중</p>
            </div>

            <div className="bg-ivory p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-amber">
                Pro · 월 9,900원
              </p>
              <h3 className="mt-6 font-serif text-xl text-ink">
                증권신고서 AI 요약
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate">
                수백 페이지 신고서를 AI가 핵심만 발췌. 공모가 적정성과 비교기업 분석까지.
              </p>
              <p className="mt-8 font-mono text-xs text-mist">준비 중</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 뉴스레터 ─── */}
      <section id="newsletter" className="bg-midnight">
        <div className="mx-auto max-w-[1280px] px-8 py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Newsletter
              </p>
              <h2 className="mt-3 font-serif text-3xl text-ivory leading-[1.3]">
                매주 월요일 아침,<br />이번 주 IPO 한 줄 정리
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
                과장 없이, 광고 없이. 이번 주에 알아둘 만한 공모주 일정과
                해석을 5분 분량으로 정리해 보내드립니다.
              </p>
            </div>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full border border-mist/40 bg-transparent px-4 py-3 text-ivory placeholder:text-mist focus:border-amber focus:outline-none"
              />
              <button
                type="button"
                className="w-full border border-amber bg-amber px-6 py-3 text-sm text-midnight transition hover:bg-transparent hover:text-amber"
              >
                구독하기
              </button>
              <p className="font-mono text-xs text-mist">
                언제든 구독 취소 가능 · 스팸 발송 없음
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 푸터 + 면책 ─── */}
      <footer>
        <div className="mx-auto max-w-[1280px] px-8 py-16">
          <div className="border-l-2 border-linen pl-6">
            <p className="max-w-3xl text-xs leading-relaxed text-slate">
              본 서비스는 정보 제공을 목적으로 하며, 자본시장법상 투자자문이나
              투자권유에 해당하지 않습니다. 모든 투자 결정과 그 결과의 책임은
              투자자 본인에게 있습니다. 게재된 데이터는 공시 자료와 공개된
              정보를 정리한 것이며, 정확성을 보증하지 않습니다.
            </p>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-linen pt-8 md:flex-row md:items-center">
            <p className="font-serif text-sm text-ink">IPO 인사이트</p>
            <p className="font-mono text-xs text-mist">
              © 2026 · 한국 공모주 분석 서비스
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}