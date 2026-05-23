import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPO 인사이트 — 한국 공모주의 모든 정보",
  description:
    "IPO 일정, 균등배정 계산기, 증권신고서 AI 요약까지. 개인투자자를 위한 IPO 분석 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}