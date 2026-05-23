import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPO 인사이트 — 한국 공모주, 조용히 깊이",
  description:
    "IPO 일정, 균등배정 전략, 증권신고서 요약 — 개인투자자를 위한 정직한 정보.",
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