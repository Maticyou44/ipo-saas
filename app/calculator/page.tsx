"use client";

import { useState } from "react";

export default function CalculatorPage() {
  const [budget, setBudget] = useState<number | "">(10000000);
  const [offerPrice, setOfferPrice] = useState<number | "">(50000);
  const [minUnit, setMinUnit] = useState<number | "">(10);
  const [depositRate, setDepositRate] = useState<number | "">(50);

  const b = typeof budget === "number" ? budget : 0;
  const p = typeof offerPrice === "number" ? offerPrice : 0;
  const u = typeof minUnit === "number" && minUnit > 0 ? minUnit : 10;
  const r = typeof depositRate === "number" ? depositRate / 100 : 0.5;

  const perShareDeposit = p * r;
  const maxShares = perShareDeposit > 0 ? Math.floor(b / perShareDeposit / u) * u : 0;
  const totalDeposit = Math.floor(maxShares * perShareDeposit);
  const remainingBudget = b - totalDeposit;
  const hasMinimum = maxShares >= u;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="border-b border-ink">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="/" className="text-base font-medium text-ink">IPO 인사이트</a>
          <a href="/" className="font-mono text-xs text-slate transition hover:text-ink">← 홈으로</a>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-[920px] px-4 py-12 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-wider text-mist">Tool · 무료</p>
          <h1 className="mt-4 text-3xl font-medium leading-tight text-ink md:mt-6 md:text-4xl">균등배정 청약 계산기</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate md:mt-6 md:text-base">청약 예산과 공모 정보를 입력하면 청약 가능 주식 수와 필요한 증거금을 계산해드립니다.</p>
        </div>
      </section>

      <section className="border-y border-linen bg-sand/40">
        <div className="mx-auto grid max-w-[920px] gap-10 px-4 py-12 md:grid-cols-2 md:gap-16 md:px-8 md:py-16">
          <div className="space-y-6 md:space-y-8">
            <p className="font-mono text-xs uppercase tracking-wider text-mist">Input · 입력</p>

            <div>
              <label className="block text-sm font-medium text-ink">청약 가능 예산</label>
              <div className="mt-3 flex items-baseline gap-2 border-b border-ink/30 pb-2">
                <input type="number" inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value === "" ? "" : Number(e.target.value))} className="w-full min-w-0 bg-transparent font-mono text-2xl text-ink outline-none placeholder:text-mist" placeholder="10000000" />
                <span className="font-mono text-sm text-slate">원</span>
              </div>
              <p className="mt-2 font-mono text-xs text-mist">{typeof budget === "number" ? budget.toLocaleString() + " 원" : "—"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">공모가 (1주당)</label>
              <div className="mt-3 flex items-baseline gap-2 border-b border-ink/30 pb-2">
                <input type="number" inputMode="numeric" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value === "" ? "" : Number(e.target.value))} className="w-full min-w-0 bg-transparent font-mono text-2xl text-ink outline-none placeholder:text-mist" placeholder="50000" />
                <span className="font-mono text-sm text-slate">원</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-ink">최소 청약 단위</label>
                <div className="mt-3 flex items-baseline gap-2 border-b border-ink/30 pb-2">
                  <input type="number" inputMode="numeric" value={minUnit} onChange={(e) => setMinUnit(e.target.value === "" ? "" : Number(e.target.value))} className="w-full min-w-0 bg-transparent font-mono text-xl text-ink outline-none" placeholder="10" />
                  <span className="font-mono text-sm text-slate">주</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">청약증거금률</label>
                <div className="mt-3 flex items-baseline gap-2 border-b border-ink/30 pb-2">
                  <input type="number" inputMode="numeric" value={depositRate} onChange={(e) => setDepositRate(e.target.value === "" ? "" : Number(e.target.value))} className="w-full min-w-0 bg-transparent font-mono text-xl text-ink outline-none" placeholder="50" />
                  <span className="font-mono text-sm text-slate">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-linen pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <p className="font-mono text-xs uppercase tracking-wider text-mist">Output · 결과</p>

            <div className="border-b border-linen pb-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate">최대 청약 가능 주식 수</p>
              <p className="mt-3 font-mono text-3xl text-ink md:text-4xl">{maxShares.toLocaleString()}<span className="ml-2 font-sans text-base text-slate">주</span></p>
            </div>

            <div className="border-b border-linen pb-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate">필요한 청약증거금</p>
              <p className="mt-3 font-mono text-2xl text-ink">{totalDeposit.toLocaleString()}<span className="ml-2 font-sans text-sm text-slate">원</span></p>
              <p className="mt-2 font-mono text-xs text-mist">예산 대비 {b > 0 ? Math.round(totalDeposit / b * 100) : 0}% · 잔여 {remainingBudget.toLocaleString()}원</p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-slate">청약 가능 여부</p>
              <div className="mt-3">
                <span className={"inline-block px-3 py-1.5 text-sm font-medium " + (hasMinimum ? "bg-sage-bg text-sage" : "bg-clay-bg text-clay")}>{hasMinimum ? "최소 단위 청약 가능" : "예산 부족"}</span>
              </div>
              {hasMinimum ? <p className="mt-3 text-xs leading-relaxed text-slate">최소 {u}주 청약 시 균등배정 추첨 대상에 포함됩니다. 청약자가 많으면 추첨, 적으면 1주씩 배정됩니다.</p> : <p className="mt-3 text-xs leading-relaxed text-slate">최소 청약 단위 {u}주에 필요한 증거금이 {(u * perShareDeposit).toLocaleString()}원입니다.</p>}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[920px] px-4 py-12 md:px-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-wider text-mist">Notes · 알아두면 좋은 정보</p>
          <div className="mt-6 space-y-6 border-l-2 border-linen pl-6 md:mt-8">
            <div>
              <h3 className="text-base font-medium text-ink">균등배정이란</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">2021년 도입된 룰. 최소 청약 단위만 신청해도 추첨 대상이 됩니다. 청약자가 많으면 일부만 1주 배정, 적으면 모두 동일 주식 수 배정. 큰 자금이 무조건 유리하지는 않습니다.</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-ink">청약증거금이란</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">청약 시 공모가의 일부(보통 50%)를 미리 예치하는 금액. 배정 결과에 따라 환불받습니다. 환불일은 보통 청약 종료일로부터 2영업일 후.</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-ink">분산 청약은 가능할까</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">한 IPO는 보통 한 사람당 한 증권사에서만 청약 가능합니다. 단, 공동주관사가 여러 곳일 때 분산 가능한 경우도 있으니 증권신고서를 확인하세요.</p>
            </div>
          </div>
          <p className="mt-10 border-l-2 border-linen pl-6 text-xs leading-relaxed text-slate md:mt-12">본 계산기는 정보 제공용입니다. 실제 청약 결과는 청약 경쟁률에 따라 달라지며, 본 계산이 청약 권유나 투자 자문에 해당하지 않습니다.</p>
        </div>
      </section>
    </div>
  );
}