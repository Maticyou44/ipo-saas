export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-linen">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-6">
          <a href="/" className="font-serif text-xl text-ink">IPO 인사이트</a>
          <nav className="flex gap-8 text-sm text-ink-slate">
            <a href="/calendar" className="hover:text-ink">캘린더</a>
            <a href="/calculator" className="hover:text-ink">계산기</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-6 py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-mist">Korean IPO Almanac · 2026</p>
        <h1 className="mt-6 font-serif text-5xl leading-tight tracking-tight text-ink">
          한국 공모주의 모든 것을, 단정한 시선으로.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-slate">
          IPO 일정부터 증권신고서 AI 요약까지. 개인투자자를 위한 정확하고 절제된 정보, 한 곳에서.
        </p>
      </section>

      <section className="border-t border-linen">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="mb-16 flex items-end justify-between border-b border-linen pb-6">
            <h2 className="font-serif text-3xl text-ink">무료 도구</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-mist">Tools · Free</span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <a href="/calendar" className="block border border-linen p-8 transition hover:border-ink-slate">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">01 · Calendar</p>
              <h3 className="mt-6 font-serif text-xl text-ink">IPO 청약 일정</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">상장 예정 종목과 청약일을 한눈에. 놓치지 않도록 이메일로 알려드립니다.</p>
            </a>
            <a href="/calculator" className="block border border-linen p-8 transition hover:border-ink-slate">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">02 · Calculator</p>
              <h3 className="mt-6 font-serif text-xl text-ink">균등배정 계산기</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">예산을 입력하면 증권사별 최적 분산 전략을 안내합니다.</p>
            </a>
            <a href="#newsletter" className="block border border-linen p-8 transition hover:border-ink-slate">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">03 · Alerts</p>
              <h3 className="mt-6 font-serif text-xl text-ink">이메일 알림</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">관심 종목의 청약 시작과 락업 해제 시점을 정확히 알려드립니다.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-linen bg-sand">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="mb-16 flex items-end justify-between border-b border-linen pb-6">
            <h2 className="font-serif text-3xl text-ink">심층 분석</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-mist">Premium · ₩9,900/월</span>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-linen bg-ivory p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">AI Brief</p>
              <h3 className="mt-6 font-serif text-xl text-ink">증권신고서 AI 요약</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">수백 페이지 신고서의 핵심을 5분 안에 파악합니다.</p>
            </div>
            <div className="border border-linen bg-ivory p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">Lockup</p>
              <h3 className="mt-6 font-serif text-xl text-ink">락업 해제 캘린더</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">의무보유확약 해제일을 사전에 파악합니다.</p>
            </div>
            <div className="border border-linen bg-ivory p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-mist">Valuation</p>
              <h3 className="mt-6 font-serif text-xl text-ink">공모가 적정성 분석</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-slate">비교기업 지표 기반의 공모가 위치 분석.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-midnight">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-amber">Newsletter</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-ivory">매주 월요일, 한 주의 IPO를 정리해 보내드립니다.</h2>
            <p className="mt-6 text-base leading-relaxed text-mist">상장 예정 종목, 청약 일정, 시장 동향. 한 통의 메일로.</p>
            <form className="mt-12 flex flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="이메일 주소" className="flex-1 border border-ink-slate bg-transparent px-5 py-4 text-ivory placeholder:text-mist focus:border-amber focus:outline-none" />
              <button type="submit" className="border border-amber bg-amber px-8 py-4 text-sm font-medium tracking-wide text-midnight transition hover:bg-transparent hover:text-amber">구독 신청</button>
            </form>
            <p className="mt-4 text-xs text-mist">스팸 없음 · 언제든 구독 취소 가능</p>
          </div>
        </div>
      </section>

      <section className="border-t border-linen">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-center text-xs leading-relaxed text-mist">본 서비스는 정보 제공을 목적으로 하며, 투자 자문이나 권유가 아닙니다. 모든 투자 결정과 그에 따른 결과는 투자자 본인의 책임입니다. 과거 데이터가 미래의 수익을 보장하지 않습니다.</p>
        </div>
      </section>

      <footer className="border-t border-linen">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <p className="font-serif text-sm text-ink">IPO 인사이트</p>
          <p className="font-mono text-xs text-mist">© 2026 · Korean IPO Almanac</p>
        </div>
      </footer>
    </main>
  );
}