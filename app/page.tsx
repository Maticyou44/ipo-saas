export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 헤더 */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">IPO 인사이트</h1>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          🚀 곧 출시 예정
        </span>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          한국 공모주, <br />
          더 똑똑하게 청약하세요
        </h2>
        <p className="mt-6 text-lg text-slate-600">
          IPO 일정부터 증권신고서 AI 요약까지, <br />
          개인투자자를 위한 모든 정보를 한 곳에서
        </p>

        {/* 이메일 가입 폼 (지금은 디자인만) */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            className="w-full max-w-xs rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button className="w-full max-w-xs rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto">
            출시 알림 받기
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          스팸은 절대 보내지 않습니다 · 언제든 구독 취소 가능
        </p>
      </section>

      {/* 기능 소개 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="text-center text-2xl font-bold text-slate-900">
          제공 예정 기능
        </h3>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">📅</div>
            <h4 className="mt-4 font-semibold text-slate-900">
              IPO 청약 일정 캘린더
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              상장 예정 종목과 청약일을 한눈에. 이메일 알림까지 무료로.
            </p>
            <span className="mt-3 inline-block text-xs font-medium text-emerald-600">
              무료
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">🧮</div>
            <h4 className="mt-4 font-semibold text-slate-900">
              균등배정 청약 계산기
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              예산을 입력하면 증권사별 최적 분산 전략을 계산해드려요.
            </p>
            <span className="mt-3 inline-block text-xs font-medium text-emerald-600">
              무료
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-2xl">🤖</div>
            <h4 className="mt-4 font-semibold text-slate-900">
              증권신고서 AI 요약
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              수백 페이지 신고서를 AI가 핵심만 요약. 공모가 적정성 분석까지.
            </p>
            <span className="mt-3 inline-block text-xs font-medium text-blue-600">
              월 9,900원
            </span>
          </div>
        </div>
      </section>

      {/* 면책 조항 */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-xl bg-slate-100 p-6 text-center text-sm text-slate-600">
          ⚠️ 본 서비스는 정보 제공을 목적으로 하며, 투자 자문이나 권유가 아닙니다.
          모든 투자 결정과 결과의 책임은 투자자 본인에게 있습니다.
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 IPO 인사이트
        </div>
      </footer>
    </main>
  );
}